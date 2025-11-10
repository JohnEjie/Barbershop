"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "./utils";

/* ------------------------------ Theme Mapping ------------------------------ */
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

/* ------------------------------ Container ------------------------------ */
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/* ------------------------------ Chart Style ------------------------------ */
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, cfg]) => cfg.theme || cfg.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, cfg]) => {
    const color =
      cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

/* ------------------------------ Tooltip ------------------------------ */
const ChartTooltip = RechartsPrimitive.Tooltip;

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  labelFormatter?: (value: any, payload?: any) => React.ReactNode;
  formatter?: (
    value: any,
    name: string,
    item: any,
    index: number,
    payload: any
  ) => React.ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
  labelClassName?: string;
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter: _formatter, // ✅ safely aliased
  color,
  nameKey,
  labelKey,
}: TooltipContentProps) {
  const { config } = useChart();

  // ✅ Safe guard
  if (!active || !payload || payload.length === 0) return null;

  const [first] = payload;

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel) return null;
    const key = `${labelKey || first?.dataKey || first?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, first, key);
    const value =
      typeof label === "string"
        ? config[label as keyof typeof config]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    return value ? (
      <div className={cn("font-medium", labelClassName)}>{value}</div>
    ) : null;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {tooltipLabel}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div
              key={item.dataKey || index}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2",
                indicator === "dot" && "items-center"
              )}
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px]",
                    indicator === "dot" && "h-2.5 w-2.5",
                    indicator === "line" && "w-1 h-3",
                    indicator === "dashed" &&
                      "w-0 border-[1.5px] border-dashed bg-transparent"
                  )}
                  style={{
                    backgroundColor: indicatorColor,
                    borderColor: indicatorColor,
                  }}
                />
              )}
              <div className="flex flex-1 justify-between leading-none items-center">
                <span className="text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
                {item.value !== undefined && (
                  <span className="text-foreground font-mono font-medium tabular-nums">
                    {Number(item.value).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Legend ------------------------------ */
const ChartLegend = RechartsPrimitive.Legend;

interface LegendContentProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: any[];
  verticalAlign?: "top" | "middle" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
}

function ChartLegendContent({
  className,
  hideIcon = false,
  payload = [],
  verticalAlign = "bottom",
  nameKey,
}: LegendContentProps) {
  const { config } = useChart();
  if (!payload || payload.length === 0) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item, index) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return (
          <div
            key={index}
            className="flex items-center gap-1.5 text-xs [&>svg]:h-3 [&>svg]:w-3"
          >
            {!hideIcon && (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{itemConfig?.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------ Helpers ------------------------------ */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  const payloadPayload = payload?.payload ?? {};
  const configKey =
    typeof payloadPayload[key] === "string"
      ? payloadPayload[key]
      : payload[key] ?? key;
  return config[configKey as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
