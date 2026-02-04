import type { FrostedGlassConfig } from "./types";
import type { GeneratedCode } from "./css-generator";
import { hexToRgba, hexToRgb } from "./color-utils";
import { generateNoiseSvg, generateNoiseSvgMinified, svgToBase64 } from "./svg-generator";

export function generateTailwind(config: FrostedGlassConfig, useBase64: boolean = true): GeneratedCode {
  const { noise, background, blur, border, shadow } = config;

  const bgColor = hexToRgba(background.color, background.opacity);
  const borderColor = hexToRgba(border.color, border.opacity);
  const noiseUrl = useBase64 ? svgToBase64(generateNoiseSvgMinified(noise)) : "noise.svg";

  let shadowValue = "";
  if (shadow.enabled) {
    const { r, g, b } = hexToRgb(shadow.color);
    shadowValue = `\n  box-shadow: ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px rgba(${r}, ${g}, ${b}, ${shadow.opacity});`;
  }

  const svg = generateNoiseSvg(noise);

  const cssComment = useBase64 ? "" : "/* Save the SVG as \"noise.svg\" */\n";

  const css = `${cssComment}@utility frosted-glass {
  background: url("${noiseUrl}"), ${bgColor};
  background-size: cover;
  background-blend-mode: soft-light;
  backdrop-filter: blur(${blur.amount}px);
  border: ${border.width}px solid ${borderColor};
  border-radius: ${border.radius}px;${shadowValue}
}`;

  const html = `<div class="frosted-glass">
  <h2>Frosted Glass Card</h2>
  <p>Your content goes here.</p>
</div>`;

  return { svg, css, html };
}
