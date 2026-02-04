import type { NoiseConfig } from "./types";

export function generateNoiseSvg(noise: NoiseConfig): string {
  return `<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence
      type="${noise.type}"
      baseFrequency="${noise.baseFrequency}"
      numOctaves="${noise.numOctaves}"
      seed="${noise.seed}"
      stitchTiles="stitch"
    />
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="${noise.opacity}"/>
</svg>`;
}

export function generateNoiseSvgMinified(noise: NoiseConfig): string {
  return `<svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="${noise.type}" baseFrequency="${noise.baseFrequency}" numOctaves="${noise.numOctaves}" seed="${noise.seed}" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="${noise.opacity}"/></svg>`;
}

export function svgToBase64(svg: string): string {
  // For browser compatibility, use btoa with proper encoding
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
}

export function generateNoiseBackgroundUrl(noise: NoiseConfig): string {
  const svg = generateNoiseSvgMinified(noise);
  return `url("${svgToBase64(svg)}")`;
}

// Legacy aliases
export const generateSvgFilter = generateNoiseSvg;
export const generateSvgFilterMinified = generateNoiseSvgMinified;
