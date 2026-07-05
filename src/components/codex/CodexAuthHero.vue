<template>
  <section class="hero-copy-panel interactive-panel relative overflow-hidden rounded-2xl border theme-border theme-panel p-6 sm:p-8">
    <div class="hero-runtime-badge mb-5 inline-flex items-center gap-2 rounded-full border theme-border theme-surface-soft px-3 py-1">
      <span class="relative flex h-2 w-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ui-success)] opacity-60"></span>
        <span class="relative inline-flex h-2 w-2 rounded-full bg-[var(--ui-success)]"></span>
      </span>
      <span class="font-mono text-xs theme-text-muted">aikaitong.tools/codex-auth · local</span>
    </div>

    <h1 class="codex-title max-w-3xl text-3xl font-black leading-tight theme-text-primary sm:text-4xl">
      Codex <span :class="['tech-gradient-text', { 'tech-gradient-text-dark': isDarkTheme }]">Auth JSON</span> 本地生成器
    </h1>
    <p class="hero-subcopy mt-4 max-w-2xl text-sm leading-7 theme-text-secondary sm:text-base">
      把已登录 ChatGPT session 转成 Codex CLI 可用的 auth.json，解决登录 Codex 时卡在海外手机号码验证的问题，减少找接码、等验证码的麻烦。全程浏览器本地处理，不上传。
    </p>

    <div class="metric-grid mt-6 grid gap-3 sm:grid-cols-3">
      <div class="metric-tile">
        <span class="metric-k">本地</span>
        <strong>0 上传</strong>
        <small>无后端接收</small>
      </div>
      <div class="metric-tile">
        <span class="metric-k">文件</span>
        <strong>Blob 下载</strong>
        <small>浏览器本地文件</small>
      </div>
      <div class="metric-tile">
        <span class="metric-k">有效期</span>
        <strong>不承诺长期</strong>
        <small>取决于 session 状态</small>
      </div>
    </div>

    <div class="flow-rail mt-6" :style="{ '--flow-progress': pipelineProgress }">
      <div
        v-for="step in pipelineSteps"
        :key="step.key"
        :class="['flow-step', `flow-${step.state}`]"
      >
        <span class="flow-dot"></span>
        <span>{{ step.label }}</span>
        <small>{{ step.detail }}</small>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../../utils/theme'

type PipelineStep = {
  key: string
  label: string
  detail: string
  state: string
}

defineProps<{
  pipelineSteps: PipelineStep[]
  pipelineProgress: string
}>()

const { theme } = useTheme()
const isDarkTheme = computed(() => theme.value === 'dark')
</script>

<style scoped>
.codex-title {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.hero-subcopy {
  overflow-wrap: anywhere;
  text-wrap: pretty;
}

.interactive-panel {
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;
}

.interactive-panel:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 36%, var(--ui-border));
  box-shadow: 0 22px 70px color-mix(in oklab, var(--ui-accent) 15%, transparent);
  transform: translateY(-2px);
}

.hero-copy-panel {
  background:
    radial-gradient(circle at 16% 0%, color-mix(in oklab, var(--ui-accent-soft) 78%, transparent), transparent 20rem),
    radial-gradient(circle at 84% 16%, color-mix(in srgb, var(--ui-accent) 12%, transparent), transparent 18rem),
    color-mix(in oklab, var(--ui-bg-elevated) 94%, transparent);
}

.hero-copy-panel::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.18) 42%, transparent 64%);
  content: "";
  opacity: 0;
  transform: translateX(-38%);
  transition: opacity 220ms ease, transform 520ms ease;
}

.hero-copy-panel:hover::before {
  opacity: 1;
  transform: translateX(38%);
}

.hero-copy-panel > * {
  position: relative;
  z-index: 1;
}

.tech-gradient-text {
  background: linear-gradient(135deg, #f2820f 0%, #d97706 45%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tech-gradient-text-dark {
  background-image: linear-gradient(135deg, #f2820f 0%, #fbbf24 45%, #f59e0b 100%);
}

.flow-rail {
  --flow-progress: 8%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.55rem;
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-accent-soft) 72%, transparent), transparent),
    color-mix(in oklab, var(--ui-bg-soft) 74%, transparent);
  padding: 0.65rem;
}

.flow-rail::before,
.flow-rail::after {
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  top: 1.68rem;
  height: 1px;
  content: "";
}

.flow-rail::before {
  background: var(--ui-border);
}

.flow-rail::after {
  right: auto;
  width: var(--flow-progress);
  background: linear-gradient(90deg, var(--ui-accent), var(--ui-accent-hover), #d97706);
  box-shadow: 0 0 18px color-mix(in oklab, var(--ui-accent) 50%, transparent);
  transition: width 260ms ease;
}

.flow-step {
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.18rem;
  border: 1px solid var(--ui-border);
  border-radius: 0.75rem;
  background: color-mix(in oklab, var(--ui-bg-elevated) 82%, transparent);
  padding: 0.65rem 0.55rem 0.6rem;
  color: var(--ui-text-secondary);
  transition: border-color 180ms ease, transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
}

.flow-step:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 38%, var(--ui-border));
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--ui-accent) 18%, transparent);
  transform: translateY(-1px);
}

.flow-step span:not(.flow-dot) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--ui-text-primary);
}

.flow-step small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.68rem;
  color: var(--ui-text-muted);
}

.flow-dot {
  height: 0.62rem;
  width: 0.62rem;
  border-radius: 999px;
  background: var(--ui-border-strong);
  box-shadow: 0 0 0 4px var(--ui-bg-elevated);
}

.flow-active {
  border-color: color-mix(in oklab, var(--ui-accent) 42%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-accent-soft) 55%, var(--ui-bg-elevated));
}

.flow-active .flow-dot {
  background: var(--ui-accent);
  animation: codex-auth-pulse 1.3s ease-in-out infinite;
}

.flow-complete {
  border-color: color-mix(in oklab, var(--ui-success) 48%, var(--ui-border));
}

.flow-complete .flow-dot {
  background: var(--ui-success);
}

.flow-warn {
  border-color: color-mix(in oklab, var(--ui-warning) 52%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-warning-soft) 58%, var(--ui-bg-elevated));
}

.flow-warn .flow-dot {
  background: var(--ui-warning);
}

.flow-error {
  border-color: color-mix(in oklab, var(--ui-danger) 52%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-danger-soft) 58%, var(--ui-bg-elevated));
}

.flow-error .flow-dot {
  background: var(--ui-danger);
}

.metric-tile {
  border: 1px solid var(--ui-border);
  background: color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
  border-radius: 0.875rem;
  min-width: 0;
  padding: 1.08rem;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.metric-tile:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 38%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-accent-soft) 42%, var(--ui-bg-soft));
  box-shadow: 0 14px 40px color-mix(in oklab, var(--ui-accent) 12%, transparent);
  transform: translateY(-1px);
}

.metric-tile strong {
  display: block;
  margin-top: 0.35rem;
  color: var(--ui-text-primary);
  font-size: 1.04rem;
  line-height: 1.35;
}

.metric-tile small {
  color: var(--ui-text-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

.metric-k {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 36%, transparent);
  padding: 0.1rem 0.45rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.76rem;
  font-weight: 900;
  color: var(--ui-accent);
}

@keyframes codex-auth-pulse {
  0%, 100% {
    box-shadow: 0 0 0 4px var(--ui-bg-elevated), 0 0 0 transparent;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 4px var(--ui-bg-elevated), 0 0 22px color-mix(in oklab, var(--ui-accent) 48%, transparent);
    transform: scale(1.12);
  }
}

@media (hover: none) {
  .flow-step:hover,
  .metric-tile:hover {
    box-shadow: none;
    transform: none;
  }
}

@media (max-width: 640px) {
  .codex-title {
    font-size: 1.78rem;
    line-height: 1.14;
  }

  .hero-runtime-badge {
    display: none;
  }

  .hero-subcopy {
    margin-top: 0.85rem;
    line-height: 1.72;
  }

  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    margin-top: 1.05rem;
  }

  .metric-grid .metric-tile:nth-child(3) {
    grid-column: 1 / -1;
  }

  .metric-grid .metric-tile {
    min-height: 4.1rem;
    padding: 0.65rem 0.55rem;
  }

  .metric-grid .metric-k {
    padding-inline: 0.36rem;
    font-size: 0.72rem;
  }

  .metric-grid strong {
    margin-top: 0.28rem;
    font-size: 0.94rem;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .metric-grid small {
    display: none;
  }

  .flow-rail {
    display: none;
  }

  .flow-rail::before,
  .flow-rail::after {
    display: none;
  }

  .metric-tile {
    padding: 0.9rem;
  }
}
</style>
