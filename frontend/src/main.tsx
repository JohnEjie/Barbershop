import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/globals.css";
import App from "./App.tsx";

console.log("main.tsx: Starting app initialization");
console.log("main.tsx: Document ready state:", document.readyState);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  console.log("main.tsx: DOM is ready, initializing app");

  try {
    const rootElement = document.getElementById("root");
    console.log("main.tsx: Root element found:", rootElement);

    if (!rootElement) {
      throw new Error("Root element not found");
    }

    rootElement.innerHTML = "";
    console.log("main.tsx: Creating React root and rendering App...");

    try {
      const root = createRoot(rootElement);
      root.render(
        <StrictMode>
          {/* ✅ React Router added here */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>
      );
      console.log("main.tsx: App rendered successfully");
    } catch (renderError) {
      console.error("main.tsx: Error during render:", renderError);
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: monospace; background: #fff; color: #000;">
          <h1>Error: Failed to render App component</h1>
          <pre>${String(renderError)}</pre>
          <p>Check the browser console for more details.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("main.tsx: Failed to render app:", error);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: monospace; background: #fff; color: #000;">
          <h1>Error: Failed to render app</h1>
          <pre>${String(error)}</pre>
          <p>Check the browser console for more details.</p>
        </div>
      `;
    }
  }
}
