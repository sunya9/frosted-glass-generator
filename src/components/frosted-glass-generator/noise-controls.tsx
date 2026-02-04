import type { NoiseConfig } from "@/lib/frosted-glass";
import { NOISE_LIMITS } from "@/lib/frosted-glass";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { SliderControl } from "./slider-control";

interface NoiseControlsProps {
  noise: NoiseConfig;
  onChange: (updates: Partial<NoiseConfig>) => void;
}

export function NoiseControls({ noise, onChange }: NoiseControlsProps) {
  const randomizeSeed = () => {
    const newSeed = Math.floor(Math.random() * 1000);
    onChange({ seed: newSeed });
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Noise (feTurbulence)</Label>

      <div className="space-y-3 pl-1">
        <SliderControl
          label="Base Frequency"
          value={noise.baseFrequency}
          min={NOISE_LIMITS.baseFrequency.min}
          max={NOISE_LIMITS.baseFrequency.max}
          step={NOISE_LIMITS.baseFrequency.step}
          onChange={(value) => onChange({ baseFrequency: value })}
        />

        <SliderControl
          label="Octaves"
          value={noise.numOctaves}
          min={NOISE_LIMITS.numOctaves.min}
          max={NOISE_LIMITS.numOctaves.max}
          step={NOISE_LIMITS.numOctaves.step}
          onChange={(value) => onChange({ numOctaves: value })}
        />

        <SliderControl
          label="Opacity"
          value={noise.opacity}
          min={NOISE_LIMITS.opacity.min}
          max={NOISE_LIMITS.opacity.max}
          step={NOISE_LIMITS.opacity.step}
          onChange={(value) => onChange({ opacity: value })}
        />

        <div className="flex items-center justify-between">
          <Label className="text-xs text-muted-foreground">Seed</Label>
          <Button variant="outline" size="sm" onClick={randomizeSeed}>
            <Shuffle className="mr-1.5 h-3 w-3" />
            Randomize
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Type</Label>
          <div className="flex gap-2">
            <Button
              variant={noise.type === "fractalNoise" ? "default" : "secondary"}
              size="xs"
              onClick={() => onChange({ type: "fractalNoise" })}
            >
              Fractal Noise
            </Button>
            <Button
              variant={noise.type === "turbulence" ? "default" : "secondary"}
              size="xs"
              onClick={() => onChange({ type: "turbulence" })}
            >
              Turbulence
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
