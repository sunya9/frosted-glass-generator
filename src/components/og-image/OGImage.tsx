/**
 * OG Image component for social sharing preview.
 * Render this at 1200x630 and capture with Playwright.
 *
 * Panel dimensions based on golden ratio (φ = 1.618):
 * - Width: 1200 / φ ≈ 742
 * - Height: 742 / φ ≈ 459
 */
const PHI = 1.618;
const PANEL_WIDTH = Math.round(1200 / PHI); // 742
const PANEL_HEIGHT = Math.round(PANEL_WIDTH / PHI); // 459

export function OGImage() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Frosted Glass Panel */}
      <div
        style={{
          width: PANEL_WIDTH,
          height: PANEL_HEIGHT,
          borderRadius: 24,
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Noise overlay via SVG */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 24,
            pointerEvents: "none",
            mixBlendMode: "soft-light",
            opacity: 0.5,
          }}
        >
          <defs>
            <filter id="ogNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                seed="42"
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.7 0"
              />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#ogNoise)" />
        </svg>

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Frosted Glass
        </h1>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: "white",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            margin: 0,
            marginTop: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Generator
        </h2>
      </div>
    </div>
  );
}
