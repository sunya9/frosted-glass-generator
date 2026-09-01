#!/bin/bash
# Post-edit hook: runs typecheck, lint, and format on edited files
# Failures go to stderr with exit 2 so they are fed back to Claude

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[ -z "$FILE_PATH" ] && exit 0

# Skip files outside the project (e.g. scratchpad)
case "$FILE_PATH" in "$CLAUDE_PROJECT_DIR"/*) ;; *) exit 0 ;; esac

# Only process TypeScript/JavaScript files
case "$FILE_PATH" in *.ts | *.tsx | *.js | *.jsx) ;; *) exit 0 ;; esac

cd "$CLAUDE_PROJECT_DIR" || exit 0

ERRORS=""

# tsc -b is required: the solution-style tsconfig makes plain tsc --noEmit check nothing
OUT=$(pnpm exec tsc -b --noEmit 2>&1) || ERRORS="[typecheck]
$OUT
"

OUT=$(pnpm lint:fix "$FILE_PATH" 2>&1) || ERRORS="$ERRORS[lint]
$OUT
"

pnpm format "$FILE_PATH" > /dev/null 2>&1

if [ -n "$ERRORS" ]; then
  printf '%s' "$ERRORS" >&2
  exit 2
fi
exit 0
