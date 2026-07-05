#!/usr/bin/env bash
# Phase 0 guard: block hardcoded non-brand colors from creeping back into the token system.
# The whole UI runs on --ui-*/theme-* tokens (琥珀 accent + 语义 success/danger/warning).
#
# Banned:
#   1. Raw gray/slate Tailwind utilities (reintroduce the light/dark drift we removed).
#   2. The cool families (emerald/teal/sky/cyan/indigo/purple/violet) as Tailwind classes.
#   3. A blocklist of specific DECORATIVE cool hex values that recurred in legacy hero
#      visuals (CodexAuth / About / Tools / OwnedToolsPanel). Raw cool rgba() is not
#      pattern-banned (would hit white-alpha glass); it was cleaned by hand in batch B.
#
# NOT banned: 品牌琥珀 hex, white/black-alpha glass, neutral slate rgba, and the per-hub
# VENDOR accent hex (#10A37F OpenAI / #D97757 Anthropic / #4285F4 Google / #9333EA Gemini)
# — these are constitution-allowed in the hero identification strip and are intentionally
# excluded from the hex blocklist. style.css excluded on purpose (intentional compat map).
#
# Scope: src/views + src/components + src/utils + src/stores (utils/stores added 2026-07-05
# after alerts.ts shipped an off-token emerald success alert that the old views-only scan missed).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

CLASS_PATTERN='(gray-[0-9]|slate-[0-9]00|emerald-[0-9]|teal-[0-9]|sky-[0-9]|indigo-[0-9]|purple-[0-9]|violet-[0-9]|cyan-[0-9])'
# decorative cool hex (lowercase; grep -i matches both cases). Vendor accents
# #10A37F/#D97757/#4285F4/#9333EA are deliberately absent.
HEX_PATTERN='#(14b8a6|2dd4bf|0d9488|22d3ee|67e8f9|06b6d4|0891b2|38bdf8|0ea5e9|7dd3fc|0284c7|34d399|6ee7b7|10b981|059669|8b5cf6|a78bfa|7c3aed|6366f1|818cf8|4f46e5|a855f7|c084fc)'
SCAN_DIRS="src/views src/components src/utils src/stores"

matches="$(grep -rniE "$CLASS_PATTERN|$HEX_PATTERN" $SCAN_DIRS --include='*.vue' --include='*.ts' || true)"

if [ -n "$matches" ]; then
  echo "✗ theme-token guard: found hardcoded gray/slate/cool utilities or decorative cool hex (use --ui-*/theme-* tokens instead):"
  echo "$matches"
  echo ""
  echo "If a usage is genuinely intentional (e.g. a per-hub vendor accent), migrate it to a token or refactor; do not bypass this guard."
  exit 1
fi

echo "✓ theme-token guard: no hardcoded gray/slate/cool utilities or decorative cool hex in src/views, src/components, src/utils or src/stores"
