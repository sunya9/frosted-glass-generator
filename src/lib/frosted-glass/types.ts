export interface NoiseConfig {
  baseFrequency: number;
  numOctaves: number;
  seed: number;
  type: "fractalNoise" | "turbulence";
  opacity: number;
}

export interface BackgroundConfig {
  color: string;
  opacity: number;
}

export interface BlurConfig {
  amount: number;
}

export interface BorderConfig {
  width: number;
  color: string;
  opacity: number;
  radius: number;
}

export interface ShadowConfig {
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
}

export type OutputFormat = "css" | "tailwind";
export type SvgMethod = "inline" | "base64";

export interface FrostedGlassConfig {
  noise: NoiseConfig;
  background: BackgroundConfig;
  blur: BlurConfig;
  border: BorderConfig;
  shadow: ShadowConfig;
  outputFormat: OutputFormat;
  svgMethod: SvgMethod;
}

export type PresetName =
  | "light-frost"
  | "heavy-frost"
  | "subtle-glass"
  | "vibrant"
  | "dark-glass";

export interface Preset {
  name: PresetName;
  label: string;
  config: Omit<FrostedGlassConfig, "outputFormat" | "svgMethod">;
}

export type PreviewBackground = "image" | "gradient" | "solid";
