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
  language: "xml" | "css" | "html";
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
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 gap-1 px-2 text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
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
      <button
        onClick={() => onFormatChange("css")}
        className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
          outputFormat === "css"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        Pure CSS
      </button>
      <button
        onClick={() => onFormatChange("tailwind")}
        className={`rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
          outputFormat === "tailwind"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        Tailwind
      </button>
    </div>
  );

  return (
    <div className="flex h-full min-h-[300px] flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
        <h2 className="text-sm font-semibold">Generated Code</h2>
        <div className="flex gap-1">
          <button
            onClick={() => setUseBase64(true)}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              useBase64
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Base64
          </button>
          <button
            onClick={() => setUseBase64(false)}
            className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              !useBase64
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            File
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col divide-y">
        {!useBase64 && (
          <CodeSection title="SVG" code={generatedCode.svg} language="xml" />
        )}
        <CodeSection title="CSS" code={generatedCode.css} language="css" headerContent={formatToggle} />
        <CodeSection title="HTML" code={generatedCode.html} language="html" />
      </div>
    </div>
  );
}
