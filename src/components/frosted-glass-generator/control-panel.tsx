import type { FrostedGlassConfig } from "@/lib/frosted-glass";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { PresetSelector } from "./preset-selector";
import { NoiseControls } from "./noise-controls";
import { BackgroundControls } from "./background-controls";
import { BlurControls } from "./blur-controls";
import { BorderShadowControls } from "./border-shadow-controls";

interface ControlPanelProps {
  config: FrostedGlassConfig;
  onNoiseChange: (updates: Partial<FrostedGlassConfig["noise"]>) => void;
  onBackgroundChange: (
    updates: Partial<FrostedGlassConfig["background"]>,
  ) => void;
  onBlurChange: (updates: Partial<FrostedGlassConfig["blur"]>) => void;
  onBorderChange: (updates: Partial<FrostedGlassConfig["border"]>) => void;
  onShadowChange: (updates: Partial<FrostedGlassConfig["shadow"]>) => void;
  onPresetSelect: (presetName: string) => void;
  onReset: () => void;
}

export function ControlPanel({
  config,
  onNoiseChange,
  onBackgroundChange,
  onBlurChange,
  onBorderChange,
  onShadowChange,
  onPresetSelect,
  onReset,
}: ControlPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b p-3">
        <h2 className="text-sm font-semibold">Controls</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Reset
        </Button>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3">
        <PresetSelector onSelect={onPresetSelect} />

        <Separator />

        <NoiseControls noise={config.noise} onChange={onNoiseChange} />

        <Separator />

        <BackgroundControls
          background={config.background}
          onChange={onBackgroundChange}
        />

        <Separator />

        <BlurControls blur={config.blur} onChange={onBlurChange} />

        <Separator />

        <BorderShadowControls
          border={config.border}
          shadow={config.shadow}
          onBorderChange={onBorderChange}
          onShadowChange={onShadowChange}
        />
      </div>
    </div>
  );
}
