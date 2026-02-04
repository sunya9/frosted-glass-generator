# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev          # Start development server
pnpm build        # Type-check and build for production
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm typecheck    # Run TypeScript type checking
pnpm format       # Format code with Prettier
```

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin
- **UI Components**: shadcn/ui (base-ui based)
- **Code Highlighting**: Shiki with React Suspense (`use` hook for caching)
- **Resizable Panels**: react-resizable-panels v4

## Architecture

This is a Frosted Glass CSS Generator - a tool that generates CSS code for glassmorphism effects using SVG feTurbulence noise.

### Core Logic (`src/lib/frosted-glass/`)

- `types.ts` - Type definitions for `FrostedGlassConfig` and related interfaces
- `svg-generator.ts` - Generates SVG with feTurbulence filter for noise texture
- `css-generator.ts` - Generates Pure CSS output with `.frosted-glass` class
- `tailwind-generator.ts` - Generates Tailwind CSS v4 `@utility` directive
- `presets.ts` - Predefined style presets (light-frost, heavy-frost, etc.)
- `constants.ts` - Default config values and preview images (Lorem Picsum)

### Key Patterns

**Noise Generation**: Uses SVG `<feTurbulence type="fractalNoise">` with configurable baseFrequency, numOctaves, and seed. The noise is composited using CSS `background-blend-mode: soft-light` with multiple backgrounds.

**Code Output**: Supports both Base64-embedded SVG and external file reference. CSS output includes vendor-prefixed `backdrop-filter` for Safari.

**State Management**: `useFrostedGlassState` hook manages all configuration state with granular update functions for each config section.

**Syntax Highlighting**: Shiki highlighter is initialized once as a module-level Promise and consumed via React's `use()` hook with Suspense fallback.

## react-resizable-panels v4 API

The library API changed significantly in v4:

- Import: `Group`, `Panel`, `Separator` (not `PanelGroup`, `PanelResizeHandle`)
- Use `orientation` instead of `direction`
- Use `minSize="200px"` (string with CSS units) instead of percentage-only
- No `autoSaveId` - implement persistence manually with `onLayoutChange` + `defaultLayout`
