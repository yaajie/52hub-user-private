<template>
  <section
    class="visual-panel interactive-panel relative hidden min-h-[380px] overflow-hidden rounded-2xl border theme-border theme-panel lg:block"
    :style="heroPointerStyle"
    @pointermove="trackHeroPointer"
    @pointerleave="resetHeroPointer"
  >
    <div :class="['hero-visual-image', { 'hero-visual-image-dark': isDarkTheme }]" aria-hidden="true"></div>
    <div class="pointer-glow"></div>
    <div class="visual-orbit visual-orbit-one"></div>
    <div class="visual-orbit visual-orbit-two"></div>
    <div :class="['visual-gradient', { 'visual-gradient-dark': isDarkTheme }]"></div>
    <div :class="['visual-mesh', { 'visual-mesh-dark': isDarkTheme }]"></div>
    <div :class="['scan-beam', { 'scan-beam-dark': isDarkTheme }]"></div>

    <div class="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
      <div class="visual-chip">
        <span class="theme-status-dot" style="--dot: var(--ui-success)"></span>
        <span>local transform</span>
      </div>
      <div class="visual-chip hidden sm:inline-flex">
        <span :class="currentAuthJson ? 'bg-[var(--ui-success)]' : 'bg-amber-400'" class="h-2 w-2 rounded-full"></span>
        <span>{{ currentAuthJson ? 'auth.json ready' : 'waiting input' }}</span>
      </div>
    </div>

    <div class="signal-stack absolute left-4 top-16 hidden w-[min(18rem,calc(100%-2rem))] space-y-2 md:block">
      <div
        v-for="signal in credentialSignals"
        :key="signal.key"
        :class="['signal-row', `signal-${signal.state}`]"
      >
        <span class="signal-led"></span>
        <span class="signal-label">{{ signal.label }}</span>
        <strong>{{ signal.value }}</strong>
      </div>
    </div>

    <div class="visual-console absolute inset-x-4 bottom-4 rounded-2xl p-4 backdrop-blur-md">
      <div class="mb-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="h-2.5 w-2.5 rounded-full bg-[var(--ui-danger)]"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-[var(--ui-warning)]"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-[var(--ui-success)]"></span>
        </div>
        <span class="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-amber-100/70">browser only</span>
      </div>
      <div class="grid gap-2 font-mono text-xs sm:grid-cols-2">
        <div class="terminal-line">
          <span class="text-amber-300">$</span>
          <span>read session JSON</span>
        </div>
        <div class="terminal-line">
          <span class="text-[var(--ui-success)]">›</span>
          <span>no upload / no storage</span>
        </div>
        <div class="terminal-line">
          <span class="text-amber-300">$</span>
          <span>build auth.json</span>
        </div>
        <div class="terminal-line">
          <span :class="currentAuthJson ? 'text-[var(--ui-success)]' : 'text-amber-300'">›</span>
          <span>{{ currentAuthJson ? 'copy or download' : 'paste to generate' }}</span>
          <span class="terminal-cursor text-amber-300">▍</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from '../../utils/theme'

type CredentialSignal = {
  key: string
  label: string
  value: string
  state: string
}

defineProps<{
  currentAuthJson: string
  credentialSignals: CredentialSignal[]
}>()

const { theme } = useTheme()
const isDarkTheme = computed(() => theme.value === 'dark')

const heroPointerX = ref(72)
const heroPointerY = ref(34)
const heroPointerActive = ref(false)

const heroPointerStyle = computed(() => ({
  '--hero-pointer-x': `${heroPointerX.value}%`,
  '--hero-pointer-y': `${heroPointerY.value}%`,
  '--hero-pointer-alpha': heroPointerActive.value ? '1' : '0.58',
}))

function trackHeroPointer(event: PointerEvent) {
  const target = event.currentTarget
  if (!(target instanceof HTMLElement)) return

  const rect = target.getBoundingClientRect()
  heroPointerX.value = Math.round(((event.clientX - rect.left) / rect.width) * 100)
  heroPointerY.value = Math.round(((event.clientY - rect.top) / rect.height) * 100)
  heroPointerActive.value = true
}

function resetHeroPointer() {
  heroPointerX.value = 72
  heroPointerY.value = 34
  heroPointerActive.value = false
}
</script>

<style scoped>
.visual-panel {
  --hero-pointer-x: 72%;
  --hero-pointer-y: 34%;
  --hero-pointer-alpha: 0.58;
  background:
    radial-gradient(circle at 72% 24%, rgba(242, 130, 15, 0.14), transparent 34%),
    radial-gradient(circle at 24% 78%, color-mix(in srgb, var(--ui-accent) 10%, transparent), transparent 32%),
    linear-gradient(180deg, rgba(248, 250, 252, 0.18), rgba(255, 255, 255, 0));
  cursor: crosshair;
}

.visual-panel:hover .hero-visual-image {
  transform: scale(1.025);
}

.visual-panel:hover .scan-beam {
  animation-duration: 3.2s;
}

.hero-visual-image {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: url('/images/tools/codex-auth-hero-light-v2.webp');
  background-position: center;
  background-size: cover;
  opacity: 0.68;
  filter: saturate(0.82) contrast(0.88) brightness(1.08) grayscale(0.04);
  transition: transform 420ms ease, filter 220ms ease, opacity 220ms ease;
}

.hero-visual-image-dark {
  background-image: url('/images/tools/codex-auth-hero-dark-v3.webp');
  opacity: 1;
  filter: saturate(1.08) contrast(1.08) brightness(0.96);
}

.pointer-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: calc(var(--hero-pointer-alpha) * 0.62);
  background:
    radial-gradient(circle at var(--hero-pointer-x) var(--hero-pointer-y), color-mix(in srgb, var(--ui-accent) 34%, transparent), transparent 14rem),
    radial-gradient(circle at calc(var(--hero-pointer-x) + 8%) calc(var(--hero-pointer-y) + 10%), rgba(242, 130, 15, 0.18), transparent 16rem);
  mix-blend-mode: screen;
  transition: opacity 180ms ease;
}

.visual-orbit {
  position: absolute;
  pointer-events: none;
  border: 1px solid color-mix(in srgb, var(--ui-accent) 20%, transparent);
  border-radius: 999px;
  opacity: 0.45;
  transform: rotate(-8deg);
}

.visual-orbit-one {
  right: 14%;
  top: 20%;
  height: 11rem;
  width: 20rem;
  animation: codex-auth-orbit 8s ease-in-out infinite;
}

.visual-orbit-two {
  right: 8%;
  bottom: 21%;
  height: 8rem;
  width: 15rem;
  animation: codex-auth-orbit 9.5s ease-in-out infinite reverse;
}

.visual-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(248, 250, 252, 0.08), rgba(248, 250, 252, 0.1) 70%, rgba(248, 250, 252, 0.24)),
    linear-gradient(90deg, rgba(248, 250, 252, 0.14), rgba(248, 250, 252, 0.04) 44%, rgba(248, 250, 252, 0.2));
}

.visual-gradient-dark {
  background:
    linear-gradient(180deg, rgba(2, 6, 23, 0.02), rgba(2, 6, 23, 0.22) 72%, rgba(2, 6, 23, 0.56)),
    linear-gradient(90deg, rgba(2, 6, 23, 0.16), transparent 48%, rgba(2, 6, 23, 0.12));
}

.visual-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.13;
  background-image:
    linear-gradient(color-mix(in srgb, var(--ui-accent) 22%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--ui-accent) 18%, transparent) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(180deg, transparent, #000 20%, #000 78%, transparent);
}

.visual-mesh-dark {
  opacity: 0.24;
}

.scan-beam {
  position: absolute;
  left: -20%;
  top: 0;
  height: 100%;
  width: 34%;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--ui-accent) 12%, transparent), transparent);
  transform: skewX(-14deg);
  animation: codex-auth-scan 4.8s ease-in-out infinite;
}

.scan-beam-dark {
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--ui-accent) 22%, transparent), transparent);
}

.visual-chip {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid rgba(242, 130, 15, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
  padding: 0.45rem 0.72rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.72rem;
  color: #475569;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(12px);
}

.visual-console {
  border: 1px solid rgba(242, 130, 15, 0.16);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 22px 62px rgba(15, 23, 42, 0.12);
  color: #475569;
}

.signal-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid rgba(242, 130, 15, 0.14);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.62);
  padding: 0.55rem 0.65rem;
  color: #64748b;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(12px);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.signal-row:hover {
  border-color: rgba(242, 130, 15, 0.28);
  background: rgba(255, 255, 255, 0.76);
  transform: translateX(2px);
}

.signal-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.7rem;
}

.signal-row strong {
  font-size: 0.72rem;
  color: #334155;
}

.signal-led {
  height: 0.55rem;
  width: 0.55rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.8);
}

.signal-ok .signal-led {
  background: var(--ui-success);
  box-shadow: 0 0 18px color-mix(in srgb, var(--ui-success) 68%, transparent);
}

.signal-warn .signal-led,
.signal-active .signal-led {
  background: var(--ui-warning);
  box-shadow: 0 0 18px color-mix(in srgb, var(--ui-warning) 50%, transparent);
}

.signal-error .signal-led {
  background: var(--ui-danger);
  box-shadow: 0 0 18px color-mix(in srgb, var(--ui-danger) 58%, transparent);
}

.terminal-line {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
  color: #475569;
}

.terminal-line span:last-child {
  min-width: 0;
  overflow-wrap: anywhere;
}

.terminal-cursor {
  animation: codex-auth-blink 1s steps(2, start) infinite;
}

:global(.dark .visual-panel) {
  background:
    radial-gradient(circle at 72% 24%, rgba(242, 130, 15, 0.22), transparent 34%),
    radial-gradient(circle at 24% 78%, color-mix(in srgb, var(--ui-accent) 14%, transparent), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0));
}

:global(.dark .hero-visual-image) {
  opacity: 1;
  filter: saturate(0.86) contrast(0.9) brightness(0.88);
}

:global(.dark .visual-chip) {
  border-color: color-mix(in srgb, var(--ui-accent) 22%, transparent);
  background: rgba(2, 6, 23, 0.58);
  color: rgba(248, 250, 252, 0.92);
  box-shadow: 0 18px 44px rgba(2, 6, 23, 0.32);
}

:global(.dark .visual-console) {
  border-color: color-mix(in srgb, var(--ui-accent) 20%, transparent);
  background: rgba(15, 23, 42, 0.68);
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.34);
  color: rgba(226, 232, 240, 0.92);
}

:global(.dark .signal-row) {
  border-color: color-mix(in srgb, var(--ui-accent) 16%, transparent);
  background: rgba(2, 6, 23, 0.58);
  color: rgba(226, 232, 240, 0.78);
  box-shadow: 0 18px 44px rgba(2, 6, 23, 0.26);
}

:global(.dark .signal-row:hover) {
  border-color: color-mix(in srgb, var(--ui-accent) 32%, transparent);
  background: rgba(2, 6, 23, 0.68);
}

:global(.dark .signal-row strong) {
  color: rgba(248, 250, 252, 0.92);
}

:global(.dark .terminal-line) {
  color: rgba(226, 232, 240, 0.86);
}

@keyframes codex-auth-blink {
  0%, 48% {
    opacity: 1;
  }
  49%, 100% {
    opacity: 0;
  }
}

@keyframes codex-auth-scan {
  0%, 18% {
    transform: translateX(-120%) skewX(-14deg);
  }
  58%, 100% {
    transform: translateX(420%) skewX(-14deg);
  }
}

@keyframes codex-auth-orbit {
  0%, 100% {
    filter: blur(0);
    opacity: 0.28;
    transform: rotate(-8deg) translate3d(0, 0, 0);
  }
  50% {
    filter: blur(0.2px);
    opacity: 0.62;
    transform: rotate(-8deg) translate3d(0.45rem, -0.35rem, 0);
  }
}

@media (hover: none) {
  .signal-row:hover {
    transform: none;
  }
}

@media (max-width: 640px) {
  .visual-panel {
    min-height: 286px;
    cursor: default;
  }

  .hero-visual-image {
    background-position: center top;
  }

  .visual-console {
    display: none;
  }

  .visual-chip {
    max-width: 100%;
  }

  .visual-orbit,
  .pointer-glow {
    display: none;
  }
}
</style>
