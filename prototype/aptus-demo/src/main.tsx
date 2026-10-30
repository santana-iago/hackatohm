import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { DemoProvider } from "./demo/context";
import "./styles/tokens.css";
import "./styles/global.css";
createRoot(document.getElementById("root")!).render(
  <DemoProvider>
    <App />
  </DemoProvider>,
);
