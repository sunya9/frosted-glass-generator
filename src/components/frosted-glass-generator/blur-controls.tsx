import type { BlurConfig } from "@/lib/frosted-glass";
import { BLUR_LIMITS } from "@/lib/frosted-glass";
import { Label } from "@/components/ui/label";
import { SliderControl } from "./slider-control";

interface BlurControlsProps {
  blur: BlurConfig;
  onChange: (updates: Partial<BlurConfig>) => void;
}

export function BlurControls({ blur, onChange }: BlurControlsProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Backdrop Blur</Label>

      <div className="space-y-4 pl-1">
        <SliderControl
          label="Blur Amount"
          value={blur.amount}
          min={BLUR_LIMITS.amount.min}
          max={BLUR_LIMITS.amount.max}
          step={BLUR_LIMITS.amount.step}
          unit="px"
          onChange={(amount) => onChange({ amount })}
        />
      </div>
    </div>
  );
}
