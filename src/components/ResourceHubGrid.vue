<template>
  <section class="resource-hub-grid container mx-auto px-4 pt-6">
    <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="font-mono text-xs uppercase tracking-[0.18em] theme-text-muted">52hub resource matrix</p>
        <h2 class="mt-1 text-xl font-semibold theme-text-primary sm:text-2xl">AI 资源 &amp; 工具</h2>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      <router-link
        v-for="hub in hubs"
        :key="hub.to"
        v-spotlight.border
        :to="hub.to"
        class="hub-card group relative block min-h-[176px] overflow-hidden rounded-2xl border theme-border theme-panel p-4 transition-all duration-300 hover:-translate-y-1 hover:theme-surface-strong sm:p-5"
        :style="{ '--hub-accent': hub.accent, '--hub-accent-soft': hub.accentSoft }"
      >
        <div class="hub-card-visual mb-4 flex h-20 items-center justify-between rounded-xl border theme-border px-3">
          <component :is="hub.icon" class="h-7 w-7" :style="{ color: hub.accent }" />
          <div class="hub-signal-stack" aria-hidden="true">
            <span v-for="i in 4" :key="`${hub.to}-${i}`" :style="{ width: `${42 + i * 13}px` }"></span>
          </div>
        </div>
        <div class="relative z-10">
          <div class="mb-2 flex items-center justify-between gap-2">
            <h3 class="text-base font-semibold theme-text-primary">{{ hub.title }}</h3>
            <span class="font-mono text-[0.65rem] uppercase theme-text-muted">{{ hub.code }}</span>
          </div>
          <p class="text-sm leading-relaxed theme-text-secondary">{{ hub.desc }}</p>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import {
  BoltIcon,
  CpuChipIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline'

type HubCard = {
  to: string
  code: string
  icon: Component
  accent: string
  accentSoft: string
  title: string
  desc: string
}

const hubs = [
  { to: '/claude-hub', code: 'ANT', icon: BoltIcon, accent: '#D97757', accentSoft: 'rgba(217, 119, 87, 0.15)', title: 'Claude 资源', desc: '官方入口、Claude Code、注册教程和订阅档位集中整理。' },
  { to: '/openai-hub', code: 'OAI', icon: CpuChipIcon, accent: '#10A37F', accentSoft: 'rgba(16, 163, 127, 0.16)', title: 'OpenAI 全产品', desc: 'ChatGPT、Sora、DALL-E、API、Codex 的入口与用法。' },
  { to: '/gemini-hub', code: 'GMI', icon: SparklesIcon, accent: '#4285F4', accentSoft: 'rgba(66, 133, 244, 0.16)', title: 'Gemini 资源', desc: 'AI Studio、Vertex、NotebookLM、Veo 和订阅选择。' },
  { to: '/tools', code: 'TLS', icon: WrenchScrewdriverIcon, accent: '#8B5CF6', accentSoft: 'rgba(139, 92, 246, 0.16)', title: '在线工具', desc: 'AI IP 环境检测、Codex Auth、服务状态、DNS 隐私与接码入口。' },
] satisfies HubCard[]
</script>

<style scoped>
.hub-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, var(--hub-accent-soft), transparent 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent);
  opacity: 0.72;
  transition: opacity 0.3s ease;
}

.hub-card::after {
  content: '';
  position: absolute;
  inset: auto 1rem 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--hub-accent), transparent);
  opacity: 0.55;
  transform: scaleX(0.42);
  transform-origin: left;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hub-card:hover::before {
  opacity: 1;
}

.hub-card:hover::after {
  opacity: 0.9;
  transform: scaleX(1);
}

.hub-card-visual {
  position: relative;
  background:
    linear-gradient(90deg, rgba(148, 163, 184, 0.09) 1px, transparent 1px),
    linear-gradient(180deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 22px 22px;
}

.hub-signal-stack {
  display: grid;
  gap: 0.4rem;
  justify-items: end;
}

.hub-signal-stack span {
  display: block;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--hub-accent));
  opacity: 0.42;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.hub-card:hover .hub-signal-stack span {
  opacity: 0.88;
  transform: translateX(-4px);
}
</style>
