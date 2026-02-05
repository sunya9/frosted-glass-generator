import {
  PRESETS,
  findMatchingPreset,
  type FrostedGlassConfig,
} from "@/lib/frosted-glass";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PresetSelectorProps {
  config: FrostedGlassConfig;
  onSelect: (presetName: string) => void;
}

export function PresetSelector({ config, onSelect }: PresetSelectorProps) {
  const activePreset = findMatchingPreset(config);

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Presets</Label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = activePreset === preset.name;
          return (
            <Button
              key={preset.name}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(preset.name)}
              className="text-xs"
            >
              {preset.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
