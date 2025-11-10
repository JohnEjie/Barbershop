<<<<<<< HEAD
﻿import { cn } from "./utils";
=======
import { cn } from "./utils";
>>>>>>> origin/main

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
<<<<<<< HEAD




=======
>>>>>>> origin/main
