import { useState, useCallback } from "react";
import type {
  FrostedGlassConfig,
  NoiseConfig,
  BackgroundConfig,
  BlurConfig,
  BorderConfig,
  ShadowConfig,
  OutputFormat,
  SvgMethod,
  PreviewBackground,
} from "@/lib/frosted-glass/types";
import { DEFAULT_CONFIG } from "@/lib/frosted-glass/constants";
import { PRESETS } from "@/lib/frosted-glass/presets";

export function useFrostedGlassState() {
  const [config, setConfig] = useState<FrostedGlassConfig>(DEFAULT_CONFIG);
  const [previewBackground, setPreviewBackground] =
    useState<PreviewBackground>("image");
  const [previewIndex, setPreviewIndex] = useState(0);

  const updateNoise = useCallback((updates: Partial<NoiseConfig>) => {
    setConfig((prev) => ({
      ...prev,
      noise: { ...prev.noise, ...updates },
    }));
  }, []);

  const updateBackground = useCallback((updates: Partial<BackgroundConfig>) => {
    setConfig((prev) => ({
      ...prev,
      background: { ...prev.background, ...updates },
    }));
  }, []);

  const updateBlur = useCallback((updates: Partial<BlurConfig>) => {
    setConfig((prev) => ({
      ...prev,
      blur: { ...prev.blur, ...updates },
    }));
  }, []);

  const updateBorder = useCallback((updates: Partial<BorderConfig>) => {
    setConfig((prev) => ({
      ...prev,
      border: { ...prev.border, ...updates },
    }));
  }, []);

  const updateShadow = useCallback((updates: Partial<ShadowConfig>) => {
    setConfig((prev) => ({
      ...prev,
      shadow: { ...prev.shadow, ...updates },
    }));
  }, []);

  const setOutputFormat = useCallback((format: OutputFormat) => {
    setConfig((prev) => ({ ...prev, outputFormat: format }));
  }, []);

  const setSvgMethod = useCallback((method: SvgMethod) => {
    setConfig((prev) => ({ ...prev, svgMethod: method }));
  }, []);

  const applyPreset = useCallback((presetName: string) => {
    const preset = PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setConfig((prev) => ({
        ...preset.config,
        outputFormat: prev.outputFormat,
        svgMethod: prev.svgMethod,
      }));
    }
  }, []);

  const resetToDefault = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return {
    config,
    previewBackground,
    previewIndex,
    updateNoise,
    updateBackground,
    updateBlur,
    updateBorder,
    updateShadow,
    setOutputFormat,
    setSvgMethod,
    setPreviewBackground,
    setPreviewIndex,
    applyPreset,
    resetToDefault,
  };
}
