#!/usr/bin/env bash
# Phase 0 guard: block new hardcoded gray/slate Tailwind utilities from creeping back in.
# Rationale: the whole UI was migrated to the --ui-*/theme-* token system. Raw
# `*-gray-N` / `*-slate-N00` utilities reintroduce the light/dark drift we just removed.
# Scope: Vue components + views only. style.css is excluded on purpose — it holds the
# intentional compat mapping (`.text-gray-900 { color: var(--ui-text-primary) }` etc.).
# Hex colors and white-alpha (glassmorphism / on-image text) are NOT banned: they have
# legitimate design uses. This guard targets the one real regression risk.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PATTERN='(gray-[0-9]|slate-[0-9]00|emerald-[0-9]|teal-[0-9]|sky-[0-9]|indigo-[0-9]|purple-[0-9]|violet-[0-9]|cyan-[0-9])'
SCAN_DIRS="src/views src/components"

matches="$(grep -rnE "$PATTERN" $SCAN_DIRS --include='*.vue' --include='*.ts' || true)"

if [ -n "$matches" ]; then
  echo "✗ theme-token guard: found hardcoded gray/slate utilities (use --ui-*/theme-* tokens instead):"
  echo "$matches"
  echo ""
  echo "If a usage is genuinely intentional, migrate it to a token or refactor; do not bypass this guard."
  exit 1
fi

echo "✓ theme-token guard: no hardcoded gray/slate utilities in src/views or src/components"
