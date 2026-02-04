import { useState, useCallback } from "react";
import { useFrostedGlassState } from "@/hooks/use-frosted-glass-state";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ControlPanel } from "./control-panel";
import { PreviewPanel } from "./preview-panel";
import { CodeOutput } from "./code-output";

const LAYOUT_STORAGE_KEY = "frosted-glass-layout";

function getStoredLayout(): Record<string, number> | undefined {
  try {
    const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : undefined;
  } catch {
    return undefined;
  }
}

export function FrostedGlassGenerator() {
  const {
    config,
    previewBackground,
    previewIndex,
    updateNoise,
    updateBackground,
    updateBlur,
    updateBorder,
    updateShadow,
    setOutputFormat,
    setPreviewBackground,
    setPreviewIndex,
    applyPreset,
    resetToDefault,
  } = useFrostedGlassState();

  const [defaultLayout] = useState(getStoredLayout);

  const handleLayoutChange = useCallback((layout: Record<string, number>) => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layout));
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-12 items-center px-6">
          <h1 className="text-lg font-bold">Frosted Glass Generator</h1>
        </div>
      </header>

      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 flex-1"
        defaultLayout={defaultLayout}
        onLayoutChange={handleLayoutChange}
      >
        <ResizablePanel id="controls" defaultSize={20} minSize="300px">
          <aside className="h-full overflow-y-auto border-r bg-card">
            <ControlPanel
              config={config}
              onNoiseChange={updateNoise}
              onBackgroundChange={updateBackground}
              onBlurChange={updateBlur}
              onBorderChange={updateBorder}
              onShadowChange={updateShadow}
              onPresetSelect={applyPreset}
              onReset={resetToDefault}
            />
          </aside>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel id="preview" defaultSize={45} minSize="200px">
          <div className="h-full overflow-hidden bg-muted/20">
            <PreviewPanel
              config={config}
              previewBackground={previewBackground}
              previewIndex={previewIndex}
              onBackgroundChange={setPreviewBackground}
              onIndexChange={setPreviewIndex}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel id="code" defaultSize={35} minSize="300px">
          <CodeOutput
            config={config}
            outputFormat={config.outputFormat}
            onFormatChange={setOutputFormat}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
