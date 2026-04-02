import { describe, it, expect } from "vitest";
import { highlighterPromise, theme } from "./shiki";

describe("shiki highlighter", () => {
  it("should initialize with the required languages", async () => {
    const highlighter = await highlighterPromise;
    const loadedLangs = highlighter.getLoadedLanguages();
    for (const lang of ["postcss", "css", "html", "xml"]) {
      expect(loadedLangs).toContain(lang);
    }
  });

  it("should initialize with the required theme", async () => {
    const highlighter = await highlighterPromise;
    const loadedThemes = highlighter.getLoadedThemes();
    expect(loadedThemes).toContain("one-light");
  });

  it("should highlight CSS code", async () => {
    const highlighter = await highlighterPromise;
    const html = highlighter.codeToHtml(".foo { color: red; }", {
      lang: "css",
      theme,
    });
    expect(html).toContain("<pre");
    expect(html).toContain("color");
  });
});
