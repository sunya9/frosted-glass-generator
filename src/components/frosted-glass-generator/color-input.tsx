import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { isValidHex, normalizeHex } from "@/lib/frosted-glass";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorInput({ label, value, onChange }: ColorInputProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value;
    if (!hex.startsWith("#")) {
      hex = `#${hex}`;
    }
    if (isValidHex(hex)) {
      onChange(normalizeHex(hex));
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <InputGroup>
        <InputGroupAddon align="inline-start" className="pl-1.5">
          <input
            type="color"
            value={value}
            onChange={handleColorChange}
            className="h-5 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
          />
        </InputGroupAddon>
        <InputGroupInput
          value={value}
          onChange={handleHexChange}
          placeholder="#ffffff"
          className="font-mono text-xs"
        />
      </InputGroup>
    </div>
  );
}
