import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import theme from "@shikijs/themes/one-light";
export { theme };
export type Lang = "postcss" | "css" | "html" | "xml";

export const highlighterPromise = createHighlighterCore({
  themes: [theme],
  langs: [
    import("@shikijs/langs/css"),
    import("@shikijs/langs/html"),
    import("@shikijs/langs/postcss"),
    import("@shikijs/langs/xml"),
  ],
  engine: createJavaScriptRegexEngine(),
});
