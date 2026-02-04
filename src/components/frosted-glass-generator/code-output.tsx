import { useState, useMemo } from "react";
import type { FrostedGlassConfig, OutputFormat } from "@/lib/frosted-glass";
import { generateCss, generateTailwind } from "@/lib/frosted-glass";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Check, Copy } from "lucide-react";

interface CodeOutputProps {
  config: FrostedGlassConfig;
  outputFormat: OutputFormat;
  onFormatChange: (format: OutputFormat) => void;
}

function CodeSection({
  title,
  code,
  language,
  headerContent,
}: {
  title: string;
  code: string;
  language: "postcss" | "css" | "html" | "xml";
  headerContent?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b bg-muted/30 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {title}
          </span>
          {headerContent}
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="size-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <CodeBlock code={code} lang={language} />
      </div>
    </div>
  );
}

export function CodeOutput({
  config,
  outputFormat,
  onFormatChange,
}: CodeOutputProps) {
  const [useBase64, setUseBase64] = useState(true);

  const generatedCode = useMemo(() => {
    if (outputFormat === "css") {
      return generateCss(config, useBase64);
    }
    return generateTailwind(config, useBase64);
  }, [config, outputFormat, useBase64]);

  const formatToggle = (
    <div className="flex gap-1">
      <Button
        variant={outputFormat === "css" ? "default" : "secondary"}
        size="xs"
        onClick={() => onFormatChange("css")}
      >
        Pure CSS
      </Button>
      <Button
        variant={outputFormat === "tailwind" ? "default" : "secondary"}
        size="xs"
        onClick={() => onFormatChange("tailwind")}
      >
        Tailwind
      </Button>
    </div>
  );

  return (
    <div className="flex h-full min-h-[300px] flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
        <h2 className="text-sm font-semibold">Generated Code</h2>
        <div className="flex gap-1">
          <Button
            variant={useBase64 ? "default" : "secondary"}
            size="xs"
            onClick={() => setUseBase64(true)}
          >
            Base64
          </Button>
          <Button
            variant={!useBase64 ? "default" : "secondary"}
            size="xs"
            onClick={() => setUseBase64(false)}
          >
            File
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col divide-y">
        {!useBase64 && (
          <CodeSection title="SVG" code={generatedCode.svg} language="xml" />
        )}
        <CodeSection
          title="CSS"
          code={generatedCode.css}
          language={outputFormat === "css" ? "css" : "postcss"}
          headerContent={formatToggle}
        />
        <CodeSection title="HTML" code={generatedCode.html} language="html" />
      </div>
    </div>
  );
}
