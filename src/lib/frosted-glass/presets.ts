import type { Preset, PresetName } from "./types";

export const PRESETS: Preset[] = [
  {
    name: "light-frost",
    label: "Light Frost",
    config: {
      noise: {
        baseFrequency: 0.4,
        numOctaves: 2,
        seed: 0,
        type: "fractalNoise",
        opacity: 0.1,
      },
      background: {
        color: "#ffffff",
        opacity: 0.2,
      },
      blur: {
        amount: 8,
      },
      border: {
        width: 1,
        color: "#ffffff",
        opacity: 0.3,
        radius: 12,
      },
      shadow: {
        enabled: true,
        x: 0,
        y: 2,
        blur: 20,
        spread: 0,
        color: "#000000",
        opacity: 0.08,
      },
    },
  },
  {
    name: "heavy-frost",
    label: "Heavy Frost",
    config: {
      noise: {
        baseFrequency: 0.8,
        numOctaves: 4,
        seed: 42,
        type: "fractalNoise",
        opacity: 0.5,
      },
      background: {
        color: "#ffffff",
        opacity: 0.1,
      },
      blur: {
        amount: 20,
      },
      border: {
        width: 1,
        color: "#ffffff",
        opacity: 0.25,
        radius: 20,
      },
      shadow: {
        enabled: true,
        x: 0,
        y: 8,
        blur: 40,
        spread: 0,
        color: "#000000",
        opacity: 0.15,
      },
    },
  },
  {
    name: "subtle-glass",
    label: "Subtle Glass",
    config: {
      noise: {
        baseFrequency: 0.3,
        numOctaves: 2,
        seed: 100,
        type: "fractalNoise",
        opacity: 0.08,
      },
      background: {
        color: "#ffffff",
        opacity: 0.1,
      },
      blur: {
        amount: 6,
      },
      border: {
        width: 0,
        color: "#ffffff",
        opacity: 0,
        radius: 8,
      },
      shadow: {
        enabled: false,
        x: 0,
        y: 0,
        blur: 0,
        spread: 0,
        color: "#000000",
        opacity: 0,
      },
    },
  },
  {
    name: "vibrant",
    label: "Vibrant",
    config: {
      noise: {
        baseFrequency: 0.5,
        numOctaves: 3,
        seed: 200,
        type: "fractalNoise",
        opacity: 0.12,
      },
      background: {
        color: "#8b5cf6",
        opacity: 0.3,
      },
      blur: {
        amount: 16,
      },
      border: {
        width: 1,
        color: "#a78bfa",
        opacity: 0.4,
        radius: 24,
      },
      shadow: {
        enabled: true,
        x: 0,
        y: 4,
        blur: 30,
        spread: 0,
        color: "#8b5cf6",
        opacity: 0.2,
      },
    },
  },
  {
    name: "dark-glass",
    label: "Dark Glass",
    config: {
      noise: {
        baseFrequency: 0.6,
        numOctaves: 3,
        seed: 300,
        type: "fractalNoise",
        opacity: 0.15,
      },
      background: {
        color: "#1a1a2e",
        opacity: 0.6,
      },
      blur: {
        amount: 14,
      },
      border: {
        width: 1,
        color: "#ffffff",
        opacity: 0.1,
        radius: 16,
      },
      shadow: {
        enabled: true,
        x: 0,
        y: 6,
        blur: 35,
        spread: 0,
        color: "#000000",
        opacity: 0.25,
      },
    },
  },
];

export function getPresetByName(name: string): Preset | undefined {
  return PRESETS.find((preset) => preset.name === name);
}

/**
 * Find the preset that matches the current config (excluding outputFormat and svgMethod)
 */
export function findMatchingPreset(
  config: Omit<Preset["config"], never>,
): PresetName | null {
  for (const preset of PRESETS) {
    if (isConfigMatchingPreset(config, preset.config)) {
      return preset.name;
    }
  }
  return null;
}

function isConfigMatchingPreset(
  config: Omit<Preset["config"], never>,
  presetConfig: Preset["config"],
): boolean {
  // Compare noise (seed is excluded as it's expected to vary)
  if (
    config.noise.baseFrequency !== presetConfig.noise.baseFrequency ||
    config.noise.numOctaves !== presetConfig.noise.numOctaves ||
    config.noise.type !== presetConfig.noise.type ||
    config.noise.opacity !== presetConfig.noise.opacity
  ) {
    return false;
  }

  // Compare background
  if (
    config.background.color !== presetConfig.background.color ||
    config.background.opacity !== presetConfig.background.opacity
  ) {
    return false;
  }

  // Compare blur
  if (config.blur.amount !== presetConfig.blur.amount) {
    return false;
  }

  // Compare border
  if (
    config.border.width !== presetConfig.border.width ||
    config.border.color !== presetConfig.border.color ||
    config.border.opacity !== presetConfig.border.opacity ||
    config.border.radius !== presetConfig.border.radius
  ) {
    return false;
  }

  // Compare shadow
  if (
    config.shadow.enabled !== presetConfig.shadow.enabled ||
    config.shadow.x !== presetConfig.shadow.x ||
    config.shadow.y !== presetConfig.shadow.y ||
    config.shadow.blur !== presetConfig.shadow.blur ||
    config.shadow.spread !== presetConfig.shadow.spread ||
    config.shadow.color !== presetConfig.shadow.color ||
    config.shadow.opacity !== presetConfig.shadow.opacity
  ) {
    return false;
  }

  return true;
}
