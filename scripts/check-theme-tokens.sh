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

PATTERN='(gray-[0-9]|slate-[0-9]00)'
# TODO(2026-07-05 视觉批 C 收尾后启用): PATTERN 扩加 emerald|teal|sky|indigo|purple|violet|cyan(现存量 73 处,清完 emerald/sky 等再锁)
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
