import type { FrostedGlassConfig } from "./types";

export const DEFAULT_CONFIG: FrostedGlassConfig = {
  noise: {
    baseFrequency: 0.65,
    numOctaves: 3,
    seed: 0,
    type: "fractalNoise",
    opacity: 0.15,
  },
  background: {
    color: "#ffffff",
    opacity: 0.25,
  },
  blur: {
    amount: 12,
  },
  border: {
    width: 1,
    color: "#ffffff",
    opacity: 0.2,
    radius: 16,
  },
  shadow: {
    enabled: true,
    x: 0,
    y: 4,
    blur: 30,
    spread: 0,
    color: "#000000",
    opacity: 0.1,
  },
  outputFormat: "css",
  svgMethod: "inline",
};

export const NOISE_LIMITS = {
  baseFrequency: { min: 0.01, max: 1, step: 0.01 },
  numOctaves: { min: 1, max: 10, step: 1 },
  seed: { min: 0, max: 1000, step: 1 },
  opacity: { min: 0, max: 0.5, step: 0.01 },
} as const;

export const BLUR_LIMITS = {
  amount: { min: 0, max: 50, step: 1 },
} as const;

export const BORDER_LIMITS = {
  width: { min: 0, max: 5, step: 0.5 },
  opacity: { min: 0, max: 1, step: 0.01 },
  radius: { min: 0, max: 50, step: 1 },
} as const;

export const SHADOW_LIMITS = {
  x: { min: -50, max: 50, step: 1 },
  y: { min: -50, max: 50, step: 1 },
  blur: { min: 0, max: 100, step: 1 },
  spread: { min: -50, max: 50, step: 1 },
  opacity: { min: 0, max: 1, step: 0.01 },
} as const;

export const BACKGROUND_LIMITS = {
  opacity: { min: 0, max: 1, step: 0.01 },
} as const;

export const PREVIEW_IMAGES = [
  "https://picsum.photos/id/1015/1920/1080",
  "https://picsum.photos/id/1018/1920/1080",
  "https://picsum.photos/id/1035/1920/1080",
];

export const PREVIEW_GRADIENTS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
];

export const PREVIEW_SOLIDS = ["#1a1a2e", "#16213e", "#0f3460", "#e94560"];
