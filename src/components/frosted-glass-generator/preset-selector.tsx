import { PRESETS } from "@/lib/frosted-glass";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PresetSelectorProps {
  onSelect: (presetName: string) => void;
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Presets</Label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.name}
            variant="outline"
            size="sm"
            onClick={() => onSelect(preset.name)}
            className="text-xs"
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
