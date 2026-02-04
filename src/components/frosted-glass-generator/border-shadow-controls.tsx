import type { BorderConfig, ShadowConfig } from "@/lib/frosted-glass";
import { BORDER_LIMITS, SHADOW_LIMITS } from "@/lib/frosted-glass";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SliderControl } from "./slider-control";
import { ColorInput } from "./color-input";

interface BorderShadowControlsProps {
  border: BorderConfig;
  shadow: ShadowConfig;
  onBorderChange: (updates: Partial<BorderConfig>) => void;
  onShadowChange: (updates: Partial<ShadowConfig>) => void;
}

export function BorderShadowControls({
  border,
  shadow,
  onBorderChange,
  onShadowChange,
}: BorderShadowControlsProps) {
  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-4">
        <Label className="text-sm font-medium">Border</Label>

        <div className="space-y-4 pl-1">
          <SliderControl
            label="Width"
            value={border.width}
            min={BORDER_LIMITS.width.min}
            max={BORDER_LIMITS.width.max}
            step={BORDER_LIMITS.width.step}
            unit="px"
            onChange={(width) => onBorderChange({ width })}
          />

          <ColorInput
            label="Color"
            value={border.color}
            onChange={(color) => onBorderChange({ color })}
          />

          <SliderControl
            label="Opacity"
            value={border.opacity}
            min={BORDER_LIMITS.opacity.min}
            max={BORDER_LIMITS.opacity.max}
            step={BORDER_LIMITS.opacity.step}
            onChange={(opacity) => onBorderChange({ opacity })}
          />

          <SliderControl
            label="Radius"
            value={border.radius}
            min={BORDER_LIMITS.radius.min}
            max={BORDER_LIMITS.radius.max}
            step={BORDER_LIMITS.radius.step}
            unit="px"
            onChange={(radius) => onBorderChange({ radius })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="shadow-toggle" className="text-sm font-medium">
            Shadow
          </Label>
          <Switch
            id="shadow-toggle"
            checked={shadow.enabled}
            onCheckedChange={(checked) => onShadowChange({ enabled: checked })}
          />
        </div>

        {shadow.enabled && (
          <div className="space-y-4 pl-1">
            <div className="grid grid-cols-2 gap-4">
              <SliderControl
                label="X Offset"
                value={shadow.x}
                min={SHADOW_LIMITS.x.min}
                max={SHADOW_LIMITS.x.max}
                step={SHADOW_LIMITS.x.step}
                unit="px"
                onChange={(x) => onShadowChange({ x })}
              />

              <SliderControl
                label="Y Offset"
                value={shadow.y}
                min={SHADOW_LIMITS.y.min}
                max={SHADOW_LIMITS.y.max}
                step={SHADOW_LIMITS.y.step}
                unit="px"
                onChange={(y) => onShadowChange({ y })}
              />
            </div>

            <SliderControl
              label="Blur"
              value={shadow.blur}
              min={SHADOW_LIMITS.blur.min}
              max={SHADOW_LIMITS.blur.max}
              step={SHADOW_LIMITS.blur.step}
              unit="px"
              onChange={(blur) => onShadowChange({ blur })}
            />

            <SliderControl
              label="Spread"
              value={shadow.spread}
              min={SHADOW_LIMITS.spread.min}
              max={SHADOW_LIMITS.spread.max}
              step={SHADOW_LIMITS.spread.step}
              unit="px"
              onChange={(spread) => onShadowChange({ spread })}
            />

            <ColorInput
              label="Color"
              value={shadow.color}
              onChange={(color) => onShadowChange({ color })}
            />

            <SliderControl
              label="Opacity"
              value={shadow.opacity}
              min={SHADOW_LIMITS.opacity.min}
              max={SHADOW_LIMITS.opacity.max}
              step={SHADOW_LIMITS.opacity.step}
              onChange={(opacity) => onShadowChange({ opacity })}
            />
          </div>
        )}
      </div>
    </div>
  );
}
