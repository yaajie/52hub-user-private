<template>
  <div class="claude-hub-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold theme-text-primary">Claude 资源中心</h1>
        <p class="mt-3 text-sm sm:text-base theme-text-secondary">Anthropic 官方入口、客户端、实用教程与订阅直充入口</p>
      </header>

      <section
        v-for="section in sections"
        :key="section.title"
        class="mb-10"
      >
        <h2 class="text-xl sm:text-2xl font-semibold theme-text-primary">{{ section.title }}</h2>
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <component
            :is="isInternalLink(item.url) ? 'router-link' : 'a'"
            v-for="item in section.items"
            :key="`${section.title}-${item.name}`"
            :to="isInternalLink(item.url) ? item.url : undefined"
            :href="isInternalLink(item.url) ? undefined : item.url"
            :target="isInternalLink(item.url) ? undefined : '_blank'"
            :rel="isInternalLink(item.url) ? undefined : 'noopener noreferrer'"
            class="block theme-panel border theme-border rounded-2xl p-5 transition-colors hover:theme-surface-strong"
          >
            <h3 class="text-base font-semibold theme-text-primary">{{ item.name }}</h3>
            <p class="mt-1 text-xs theme-text-muted">{{ item.url }}</p>
            <p class="mt-2 text-sm theme-text-secondary">{{ item.desc }}</p>
          </component>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="text-xl sm:text-2xl font-semibold theme-text-primary">模型对比</h2>
        <div class="mt-4 overflow-x-auto theme-panel border theme-border rounded-2xl">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="border-b theme-border">
                <th class="px-4 py-3 text-left font-semibold theme-text-primary">模型</th>
                <th class="px-4 py-3 text-left font-semibold theme-text-primary">核心优势</th>
                <th class="px-4 py-3 text-left font-semibold theme-text-primary">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="model in modelComparison" :key="model.name" class="border-b theme-border last:border-b-0">
                <td class="px-4 py-3 theme-text-primary">{{ model.name }}</td>
                <td class="px-4 py-3 theme-text-secondary">{{ model.strength }}</td>
                <td class="px-4 py-3 theme-text-secondary">{{ model.use }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 class="text-xl sm:text-2xl font-semibold theme-text-primary">订阅直充</h2>
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <router-link
            v-for="card in ctaCards"
            :key="card.name"
            :to="card.url"
            class="block theme-panel border theme-border rounded-2xl p-5 transition-colors hover:theme-surface-strong"
          >
            <h3 class="text-base font-semibold theme-text-primary">{{ card.name }}</h3>
            <p class="mt-2 text-sm theme-text-secondary">{{ card.desc }}</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

type HubItem = {
  name: string
  url: string
  desc: string
}

type HubSection = {
  title: string
  items: HubItem[]
}

const sections: HubSection[] = [
  {
    title: '官方入口',
    items: [
      { name: 'Claude.ai', url: 'https://claude.ai/', desc: 'Claude 官方对话界面' },
      { name: 'Anthropic Console', url: 'https://console.anthropic.com/', desc: 'API key 管理 / 用量 / 计费' },
      { name: 'Anthropic API 文档', url: 'https://docs.anthropic.com/', desc: '开发者 API 文档' },
      { name: 'Anthropic Status', url: 'https://status.anthropic.com/', desc: '服务状态实时查询' },
    ],
  },
  {
    title: '客户端 & 工具',
    items: [
      { name: 'Claude 桌面客户端', url: 'https://claude.ai/download', desc: 'macOS / Windows 官方客户端' },
      { name: 'Claude Code', url: 'https://github.com/anthropics/claude-code', desc: '命令行编程助手，GitHub 仓库' },
      { name: 'Anthropic Cookbook', url: 'https://github.com/anthropics/anthropic-cookbook', desc: '官方示例代码集' },
    ],
  },
  {
    title: '实用教程（站内）',
    items: [
      { name: 'Claude Pro / Max 5x / 20x 怎么选', url: '/blog/claude-pro-vs-max', desc: '三档订阅对比，按用量推荐档位' },
      { name: 'Claude 账号注册全流程', url: '/blog/claude-registration-guide', desc: '从零开始注册 Claude，三条路径对比' },
      { name: 'Claude Code 上手指南', url: '/blog/claude-code-getting-started', desc: '判断你是否需要 Claude Code + 上手要点' },
      { name: 'Claude 报错 403 排查', url: '/blog/claude-403-troubleshooting', desc: '403 不同来源的对应方案 + 自查清单' },
      { name: 'ChatGPT Codex vs Claude Code', url: '/blog/chatgpt-codex-vs-claude-code', desc: '两个 AI 编程助手定位对比' },
    ],
  },
]

const modelComparison = [
  { name: 'Claude Opus 4.7', strength: '最强推理 / 长文档处理', use: '复杂编程、研究、长文分析' },
  { name: 'Claude Sonnet 4.7', strength: '速度与智能平衡', use: '日常对话、写作、代码辅助' },
  { name: 'Claude Haiku 4.5', strength: '极速响应 / 低成本', use: '批量任务、实时应用' },
]

const ctaCards = [
  { name: 'Claude Pro', url: '/products/claude-pro', desc: '适合稳定日常使用，覆盖主流高频任务。' },
  { name: 'Claude Max 5x', url: '/products/claude-max-5x', desc: '更高额度，适合重度写作与编程场景。' },
  { name: 'Claude 礼品卡兑换号', url: '/products/claude-gift-card', desc: '礼品卡兑换方案，适合多设备和灵活使用。' },
]

const isInternalLink = (url: string) => url.startsWith('/')

useHead({
  title: 'Claude 资源中心 · 官方入口 / 客户端 / 教程 / 直充 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB Claude 资源汇总：Anthropic 官方入口、Claude.ai / Console / API 文档、桌面客户端、Claude Code、实用教程、模型对比、订阅直充入口。',
    },
  ],
})
</script>
