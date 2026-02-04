import type { BackgroundConfig } from "@/lib/frosted-glass";
import { BACKGROUND_LIMITS } from "@/lib/frosted-glass";
import { Label } from "@/components/ui/label";
import { SliderControl } from "./slider-control";
import { ColorInput } from "./color-input";

interface BackgroundControlsProps {
  background: BackgroundConfig;
  onChange: (updates: Partial<BackgroundConfig>) => void;
}

export function BackgroundControls({
  background,
  onChange,
}: BackgroundControlsProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Background</Label>

      <div className="space-y-4 pl-1">
        <ColorInput
          label="Color"
          value={background.color}
          onChange={(color) => onChange({ color })}
        />

        <SliderControl
          label="Opacity"
          value={background.opacity}
          min={BACKGROUND_LIMITS.opacity.min}
          max={BACKGROUND_LIMITS.opacity.max}
          step={BACKGROUND_LIMITS.opacity.step}
          onChange={(opacity) => onChange({ opacity })}
        />
      </div>
    </div>
  );
}
