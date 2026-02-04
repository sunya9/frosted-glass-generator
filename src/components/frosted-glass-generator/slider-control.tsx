import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange,
}: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-muted-foreground">
          {value}
          {unit}
        </span>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={(newValue) => {
          onChange(Array.isArray(newValue) ? newValue[0] : newValue);
        }}
      />
    </div>
  );
}
