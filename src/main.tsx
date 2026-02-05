import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { OGImage } from "./components/og-image/OGImage.tsx";

const isOGPreview = window.location.pathname === "/og-preview";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{isOGPreview ? <OGImage /> : <App />}</StrictMode>,
);
