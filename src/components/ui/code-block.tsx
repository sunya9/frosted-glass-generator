import { use, Suspense } from "react";
import {
  createHighlighter,
  type BundledLanguage,
  type BundledTheme,
  type Highlighter,
} from "shiki/bundle/web";

const langs: BundledLanguage[] = ["postcss", "css", "html", "xml"] as const;

const theme: BundledTheme = "one-light";

interface CodeBlockProps {
  code: string;
  lang: BundledLanguage;
}

const highlighterPromise: Promise<Highlighter> = createHighlighter({
  themes: [theme],
  langs,
});

function CodeBlockInner({ code, lang }: CodeBlockProps) {
  const highlighter = use(highlighterPromise);
  const html = highlighter.codeToHtml(code, { lang, theme });

  return (
    <div
      className="min-h-0 flex-1 overflow-auto text-xs [&_pre]:min-h-full [&_pre]:overflow-auto [&_pre]:p-4 [&_pre]:font-mono"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CodeBlockFallback({ code }: { code: string }) {
  return (
    <pre className="min-h-0 flex-1 overflow-auto bg-white p-4 font-mono text-xs text-gray-700">
      <code>{code}</code>
    </pre>
  );
}

export function CodeBlock(props: CodeBlockProps) {
  return (
    <Suspense fallback={<CodeBlockFallback code={props.code} />}>
      <CodeBlockInner {...props} />
    </Suspense>
  );
}
