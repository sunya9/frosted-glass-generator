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
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // Generate OG image (1200x630)
  console.log("Generating OG image...");
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(`${DEV_SERVER_URL}/og-preview.html`);
  await page.waitForLoadState("networkidle");
  await page.screenshot({
    path: "public/og-image.png",
    type: "png",
  });
  console.log("  -> public/og-image.png");

  // Generate Apple Touch Icon (180x180)
  // We'll use the favicon SVG rendered at 180x180
  console.log("Generating Apple Touch Icon...");
  await page.setViewportSize({ width: 180, height: 180 });

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
          width: 180px;
          height: 180px;
          background: transparent;
        }
        img {
          width: 180px;
          height: 180px;
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
