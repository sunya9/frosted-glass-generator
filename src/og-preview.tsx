import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { OGImage } from "./components/og-image/OGImage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OGImage />
  </StrictMode>,
);
