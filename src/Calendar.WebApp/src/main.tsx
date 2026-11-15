import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as any);

root.render(
  <StrictMode>
    <>Hello, World!</>
  </StrictMode>,
);
