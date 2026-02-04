import { useMemo } from "react";
import type {
  FrostedGlassConfig,
  PreviewBackground,
} from "@/lib/frosted-glass";
import {
  hexToRgba,
  generateNoiseSvgMinified,
  svgToBase64,
  PREVIEW_IMAGES,
  PREVIEW_GRADIENTS,
  PREVIEW_SOLIDS,
} from "@/lib/frosted-glass";
import { Button } from "@/components/ui/button";

interface PreviewPanelProps {
  config: FrostedGlassConfig;
  previewBackground: PreviewBackground;
  previewIndex: number;
  onBackgroundChange: (bg: PreviewBackground) => void;
  onIndexChange: (index: number) => void;
}

interface BackgroundOption {
  type: PreviewBackground;
  index: number;
  style: React.CSSProperties;
}

export function PreviewPanel({
  config,
  previewBackground,
  previewIndex,
  onBackgroundChange,
  onIndexChange,
}: PreviewPanelProps) {
  const { noise, background, blur, border, shadow } = config;

  const allBackgrounds = useMemo((): BackgroundOption[] => {
    const options: BackgroundOption[] = [];

    PREVIEW_IMAGES.forEach((url, i) => {
      options.push({
        type: "image",
        index: i,
        style: {
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      });
    });

    PREVIEW_GRADIENTS.forEach((gradient, i) => {
      options.push({
        type: "gradient",
        index: i,
        style: { backgroundImage: gradient },
      });
    });

    PREVIEW_SOLIDS.forEach((color, i) => {
      options.push({
        type: "solid",
        index: i,
        style: { backgroundColor: color },
      });
    });

    return options;
  }, []);

  const currentBackground = useMemo(() => {
    return allBackgrounds.find(
      (bg) => bg.type === previewBackground && bg.index === previewIndex,
    );
  }, [allBackgrounds, previewBackground, previewIndex]);

  const glassStyle = useMemo(() => {
    const bgColor = hexToRgba(background.color, background.opacity);
    const borderColor = hexToRgba(border.color, border.opacity);
    const shadowColor = hexToRgba(shadow.color, shadow.opacity);
    const noiseSvgUrl = `url("${svgToBase64(generateNoiseSvgMinified(noise))}")`;

    return {
      backgroundImage: noiseSvgUrl,
      backgroundColor: bgColor,
      backgroundSize: "cover",
      backgroundBlendMode: "soft-light" as const,
      backdropFilter: `blur(${blur.amount}px)`,
      border: `${border.width}px solid ${borderColor}`,
      borderRadius: `${border.radius}px`,
      boxShadow: shadow.enabled
        ? `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadowColor}`
        : "none",
    };
  }, [background, blur, border, shadow, noise]);

  const handleSelect = (bg: BackgroundOption) => {
    if (bg.type !== previewBackground) {
      onBackgroundChange(bg.type);
    }
    onIndexChange(bg.index);
  };

  const isSelected = (bg: BackgroundOption) =>
    bg.type === previewBackground && bg.index === previewIndex;

  return (
    <div className="flex h-full flex-col">
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center p-6"
        style={currentBackground?.style}
      >
        <div
          className="flex h-56 w-72 flex-col items-center justify-center overflow-hidden p-6"
          style={glassStyle}
        >
          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold text-white drop-shadow-sm">
              Frosted Glass
            </h3>
            <p className="text-xs text-white/80 drop-shadow-sm">
              Beautiful glassmorphism effect
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t bg-background/80 p-3">
        <div className="flex flex-wrap justify-center gap-2">
          {allBackgrounds.map((bg) => (
            <Button
              key={`${bg.type}-${bg.index}`}
              variant="ghost"
              onClick={() => handleSelect(bg)}
              className={`h-10 w-14 p-0 transition-all ${
                isSelected(bg)
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={bg.style}
              title={`${bg.type} ${bg.index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
