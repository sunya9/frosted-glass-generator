/**
 * Generate OG image and Apple Touch Icon using Playwright.
 *
 * Usage:
 *   pnpm exec tsx scripts/generate-og-image.ts
 *
 * Prerequisites:
 *   - Dev server running: pnpm dev
 *   - Playwright installed: pnpm add -D playwright
 */
import { chromium } from "playwright";

const DEV_SERVER_URL = process.env.DEV_SERVER_URL || "http://localhost:5173";

async function generateImages() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Generate OG image (1200x630 at 2x = 2400x1260 for sharp rendering)
  console.log("Generating OG image...");
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(`${DEV_SERVER_URL}/og-preview.html`);
  await page.waitForLoadState("networkidle");
  await page.screenshot({
    path: "public/og-image.png",
    type: "png",
  });
  console.log("  -> public/og-image.png");

  // Generate Apple Touch Icon (180x180 at 2x = 360x360)
  // We'll use the favicon SVG rendered at 90x90 CSS pixels (180x180 actual)
  console.log("Generating Apple Touch Icon...");
  await page.setViewportSize({ width: 90, height: 90 });

  // Create a simple page with the favicon SVG
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          background: transparent;
        }
        img {
          width: 90px;
          height: 90px;
        }
      </style>
    </head>
    <body>
      <img src="${DEV_SERVER_URL}/favicon.svg" />
    </body>
    </html>
  `);
  await page.waitForLoadState("networkidle");
  await page.screenshot({
    path: "public/apple-touch-icon.png",
    type: "png",
  });
  console.log("  -> public/apple-touch-icon.png");

  await browser.close();
  console.log("Done!");
}

generateImages().catch(console.error);
