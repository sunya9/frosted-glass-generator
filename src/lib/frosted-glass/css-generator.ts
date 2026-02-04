import type { FrostedGlassConfig } from "./types";
import { hexToRgba } from "./color-utils";
import {
  generateNoiseSvg,
  generateNoiseSvgMinified,
  svgToBase64,
} from "./svg-generator";

export interface GeneratedCode {
  svg: string;
  css: string;
  html: string;
}

export function generateCss(
  config: FrostedGlassConfig,
  useBase64: boolean = true,
): GeneratedCode {
  const { noise, background, blur, border, shadow } = config;

  const bgColor = hexToRgba(background.color, background.opacity);
  const borderColor = hexToRgba(border.color, border.opacity);
  const shadowColor = hexToRgba(shadow.color, shadow.opacity);

  const shadowValue = shadow.enabled
    ? `box-shadow: ${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadowColor};`
    : "";

  const noiseSvgBase64 = svgToBase64(generateNoiseSvgMinified(noise));
  const noiseUrl = useBase64 ? `"${noiseSvgBase64}"` : `"noise.svg"`;

  const svg = generateNoiseSvg(noise);

  const cssComment = useBase64 ? "" : '/* Save the SVG as "noise.svg" */\n';

  const css = `${cssComment}.frosted-glass {
  background-image: url(${noiseUrl});
  background-color: ${bgColor};
  background-size: cover;
  background-blend-mode: soft-light;
  backdrop-filter: blur(${blur.amount}px);
  border: ${border.width}px solid ${borderColor};
  border-radius: ${border.radius}px;${shadowValue ? `\n  ${shadowValue}` : ""}
}`;

  const html = `<div class="frosted-glass">
  <h2>Frosted Glass Card</h2>
  <p>Your content goes here.</p>
</div>`;

  return { svg, css, html };
}

export function generateCssVariables(config: FrostedGlassConfig): string {
  const { background, blur, border, shadow } = config;

  return `:root {
  --glass-bg-color: ${background.color};
  --glass-bg-opacity: ${background.opacity};
  --glass-blur: ${blur.amount}px;
  --glass-border-width: ${border.width}px;
  --glass-border-color: ${border.color};
  --glass-border-opacity: ${border.opacity};
  --glass-border-radius: ${border.radius}px;
  --glass-shadow-x: ${shadow.x}px;
  --glass-shadow-y: ${shadow.y}px;
  --glass-shadow-blur: ${shadow.blur}px;
  --glass-shadow-spread: ${shadow.spread}px;
  --glass-shadow-color: ${shadow.color};
  --glass-shadow-opacity: ${shadow.opacity};
}`;
}
