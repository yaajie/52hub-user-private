<template>
  <section class="site-hero relative z-10 pt-24">
    <div class="site-hero-shell relative overflow-hidden border-y theme-border">
      <img
        src="/images/home/52hub-home-ai-console-v1.webp"
        alt=""
        fetchpriority="high"
        decoding="async"
        class="site-hero-image absolute inset-0 h-full w-full object-cover"
      />
      <div class="site-hero-scrim absolute inset-0"></div>
      <div class="site-hero-grid absolute inset-0" aria-hidden="true"></div>
      <div class="site-hero-scan absolute inset-x-0 top-0" aria-hidden="true"></div>

      <div class="container relative mx-auto px-4">
        <div class="grid min-h-[470px] items-center gap-8 py-10 sm:min-h-[500px] sm:py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.72fr)] lg:py-14">
          <div class="site-hero-copy max-w-3xl">
            <div class="mb-5 inline-flex items-center gap-2 rounded-full border theme-border bg-white/78 px-3 py-1 text-xs font-semibold theme-text-secondary shadow-sm backdrop-blur-md dark:bg-white/8">
              <span class="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.75)]"></span>
              52HUB AI RESOURCE OPS
            </div>

            <h1 class="site-hero-title max-w-4xl text-4xl font-black leading-tight theme-text-primary sm:text-5xl lg:text-6xl">
              AI 工具入口、教程与订阅，一站整理
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-8 theme-text-secondary sm:text-lg">
              站长把 Claude、Codex、ChatGPT 等 AI 智能体与工具的官方入口、实用工具，以及代订阅 / 成品号 / API 等服务整理到一处，少走弯路，直接找到能用的方案。
            </p>

            <div class="site-hero-actions mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <router-link to="/tools/ip" class="site-hero-primary inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5">
                <ShieldCheckIcon class="h-5 w-5 shrink-0" />
                <span>AI IP 环境检测</span>
              </router-link>
              <router-link to="/tools/codex-auth" class="site-hero-secondary inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border theme-border px-5 text-sm font-bold theme-text-primary backdrop-blur-md transition hover:-translate-y-0.5 hover:theme-surface-strong">
                <CommandLineIcon class="h-5 w-5 shrink-0 text-sky-500" />
                <span>Codex 登录辅助</span>
              </router-link>
              <router-link to="/blog" class="site-hero-secondary inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border theme-border px-5 text-sm font-bold theme-text-primary backdrop-blur-md transition hover:-translate-y-0.5 hover:theme-surface-strong">
                <BookOpenIcon class="h-5 w-5 shrink-0 text-sky-500" />
                <span>看 AI 教程</span>
              </router-link>
              <router-link to="/products" class="site-hero-secondary inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border theme-border px-5 text-sm font-bold theme-text-primary backdrop-blur-md transition hover:-translate-y-0.5 hover:theme-surface-strong">
                <ShoppingBagIcon class="h-5 w-5 shrink-0 text-emerald-500" />
                <span>AI 服务</span>
              </router-link>
            </div>

            <div class="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">
              <div v-for="signal in signals" :key="signal.label" class="site-signal rounded-xl border theme-border bg-white/72 p-3 shadow-sm backdrop-blur-md dark:bg-white/7">
                <div class="mb-2 flex items-center gap-2">
                  <component :is="signal.icon" class="h-4 w-4" :style="{ color: signal.color }" />
                  <span class="font-mono text-[0.68rem] uppercase tracking-[0.12em] theme-text-muted">{{ signal.code }}</span>
                </div>
                <div class="text-sm font-bold theme-text-primary">{{ signal.label }}</div>
                <div class="mt-1 text-xs leading-relaxed theme-text-secondary">{{ signal.desc }}</div>
              </div>
            </div>
          </div>

          <div class="site-hero-tools hidden lg:flex">
            <OwnedToolsPanel />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import {
  BookOpenIcon,
  CommandLineIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
} from '@heroicons/vue/24/outline'
import OwnedToolsPanel from './OwnedToolsPanel.vue'

type Signal = {
  code: string
  label: string
  desc: string
  color: string
  icon: Component
}

const signals = [
  {
    code: 'AUTH',
    label: 'Codex 登录辅助',
    desc: '减少海外手机验证码卡点',
    color: '#0ea5e9',
    icon: CommandLineIcon,
  },
  {
    code: 'STACK',
    label: 'AI 资源矩阵',
    desc: '官方入口、教程和订阅路径',
    color: '#10b981',
    icon: CpuChipIcon,
  },
  {
    code: 'CHECK',
    label: '网络与服务诊断',
    desc: 'IP、DNS、状态页集中查看',
    color: '#6366f1',
    icon: ShieldCheckIcon,
  },
] satisfies Signal[]
</script>

<style scoped>
.site-hero-shell {
  background: var(--ui-bg-page);
}

.site-hero-image {
  object-position: 64% center;
  opacity: 0.92;
  filter: saturate(0.96) contrast(0.98) brightness(1.02);
}

.site-hero-scrim {
  background:
    linear-gradient(90deg, rgba(248, 250, 252, 0.98) 0%, rgba(248, 250, 252, 0.94) 39%, rgba(248, 250, 252, 0.58) 58%, rgba(248, 250, 252, 0.08) 100%),
    radial-gradient(circle at 16% 12%, rgba(14, 165, 233, 0.18), transparent 32rem),
    radial-gradient(circle at 48% 100%, rgba(16, 185, 129, 0.12), transparent 28rem);
}

.site-hero-grid {
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(14, 165, 233, 0.28) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.24) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.75) 54%, transparent 100%);
}

.site-hero-scan {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.78), rgba(16, 185, 129, 0.58), transparent);
  animation: hero-scan 5.5s ease-in-out infinite;
  opacity: 0.75;
}

.site-hero-title {
  letter-spacing: 0;
  text-wrap: balance;
}

.site-hero-primary {
  background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 58%, #0f766e 100%);
  box-shadow: 0 18px 40px rgba(37, 99, 235, 0.24);
}

.site-hero-secondary {
  background: rgba(255, 255, 255, 0.72);
}

.site-signal {
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.site-signal:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 28%, var(--ui-border));
  box-shadow: 0 16px 36px color-mix(in oklab, var(--ui-accent) 12%, transparent);
  transform: translateY(-2px);
}

.site-hero-tools {
  align-self: end;
  justify-self: end;
  width: min(100%, 460px);
  padding-bottom: 1rem;
}

:global(.dark .site-hero-image) {
  opacity: 0.58;
  filter: saturate(0.9) contrast(1.02) brightness(0.6);
}

:global(.dark .site-hero-scrim) {
  background:
    linear-gradient(90deg, rgba(3, 7, 18, 0.98) 0%, rgba(3, 7, 18, 0.92) 43%, rgba(3, 7, 18, 0.66) 66%, rgba(3, 7, 18, 0.28) 100%),
    radial-gradient(circle at 12% 8%, rgba(14, 165, 233, 0.15), transparent 30rem),
    radial-gradient(circle at 52% 100%, rgba(16, 185, 129, 0.1), transparent 26rem);
}

:global(.dark .site-hero-grid) {
  opacity: 0.16;
}

:global(.dark .site-hero-secondary) {
  background: rgba(255, 255, 255, 0.08);
}

@media (max-width: 1023px) {
  .site-hero-image {
    object-position: 72% center;
    opacity: 0.46;
  }

  .site-hero-scrim {
    background:
      linear-gradient(180deg, rgba(248, 250, 252, 0.96) 0%, rgba(248, 250, 252, 0.91) 58%, rgba(248, 250, 252, 0.78) 100%),
      radial-gradient(circle at 28% 12%, rgba(14, 165, 233, 0.17), transparent 23rem),
      radial-gradient(circle at 74% 76%, rgba(16, 185, 129, 0.12), transparent 22rem);
  }

  .site-hero-grid {
    mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.72) 72%, transparent 100%);
  }

  :global(.dark .site-hero-image) {
    opacity: 0.28;
  }

  :global(.dark .site-hero-scrim) {
    background:
      linear-gradient(180deg, rgba(3, 7, 18, 0.98) 0%, rgba(3, 7, 18, 0.93) 62%, rgba(3, 7, 18, 0.86) 100%),
      radial-gradient(circle at 22% 8%, rgba(14, 165, 233, 0.12), transparent 23rem),
      radial-gradient(circle at 74% 76%, rgba(16, 185, 129, 0.08), transparent 22rem);
  }
}

@media (max-width: 640px) {
  .site-hero-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .site-hero-primary {
    grid-column: 1 / -1;
  }

  .site-hero-title {
    font-size: clamp(2rem, 9.5vw, 3rem);
    line-height: 1.08;
  }
}

@keyframes hero-scan {
  0%,
  100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}
</style>
