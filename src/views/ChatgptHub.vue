<template>
  <div class="chatgpt-hub-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold theme-text-primary">ChatGPT 资源中心</h1>
        <p class="mt-3 text-sm sm:text-base theme-text-secondary">OpenAI 官方入口、客户端、实用教程与订阅直充入口</p>
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
        <h2 class="text-xl sm:text-2xl font-semibold theme-text-primary">订阅档位参考</h2>
        <div class="mt-4 overflow-x-auto theme-panel border theme-border rounded-2xl">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="border-b theme-border">
                <th class="px-4 py-3 text-left font-semibold theme-text-primary">档位</th>
                <th class="px-4 py-3 text-left font-semibold theme-text-primary">额度</th>
                <th class="px-4 py-3 text-left font-semibold theme-text-primary">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="plan in planComparison" :key="plan.name" class="border-b theme-border last:border-b-0">
                <td class="px-4 py-3 theme-text-primary">{{ plan.name }}</td>
                <td class="px-4 py-3 theme-text-secondary">{{ plan.quota }}</td>
                <td class="px-4 py-3 theme-text-secondary">{{ plan.use }}</td>
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
      { name: 'ChatGPT', url: 'https://chat.openai.com/', desc: 'ChatGPT 官方对话界面' },
      { name: 'OpenAI Platform', url: 'https://platform.openai.com/', desc: 'API key / 用量 / 模型管理' },
      { name: 'OpenAI API 文档', url: 'https://platform.openai.com/docs', desc: '开发者文档' },
      { name: 'OpenAI Status', url: 'https://status.openai.com/', desc: '服务状态实时查询' },
    ],
  },
  {
    title: '客户端 & 工具',
    items: [
      { name: 'ChatGPT 桌面客户端', url: 'https://openai.com/chatgpt/download/', desc: 'macOS / Windows 官方客户端' },
      { name: 'ChatGPT iOS App', url: 'https://apps.apple.com/app/openai-chatgpt/id6448311069', desc: 'iOS App Store（需外区 Apple ID）' },
      { name: 'OpenAI Cookbook', url: 'https://github.com/openai/openai-cookbook', desc: 'API 用法示例集' },
    ],
  },
  {
    title: '实用教程（站内）',
    items: [
      { name: 'ChatGPT Plus / Pro 5x / 20x 怎么选', url: '/blog/chatgpt-plus-vs-pro-comparison', desc: '三档订阅对比，按用量推荐' },
      { name: '国内充值 ChatGPT 全方法', url: '/blog/chatgpt-plus-china-payment-guide', desc: '4 种付款路径对比' },
      { name: 'ChatGPT 账号封号原因 + 降低风控', url: '/blog/chatgpt-anti-ban-guide', desc: '住宅 IP / 使用习惯 / 自查清单' },
      { name: 'ChatGPT Codex vs Claude Code', url: '/blog/chatgpt-codex-vs-claude-code', desc: '两个 AI 编程助手定位对比' },
    ],
  },
]

const planComparison = [
  { name: 'Free', quota: '基础', use: '偶尔试用' },
  { name: 'Plus', quota: '日常用量', use: '聊天 / 写作 / 轻度编程' },
  { name: 'Pro 5x', quota: 'Plus 的 5 倍', use: '编程 / 研究 / 高频使用' },
  { name: 'Pro 20x', quota: 'Plus 的 20 倍', use: 'Codex / Agent 重度玩家' },
]

const ctaCards = [
  { name: 'ChatGPT Plus', url: '/products/chatgpt-plus', desc: '日常稳定使用，适合多数用户。' },
  { name: 'ChatGPT Pro 5x', url: '/products/chatgpt-pro-5x', desc: '更高额度，适合高频工作流。' },
  { name: 'ChatGPT Pro 20x', url: '/products/chatgpt-pro-20x', desc: '超高用量，适合重度自动化与代理场景。' },
]

const isInternalLink = (url: string) => url.startsWith('/')

useHead({
  title: 'ChatGPT 资源中心 · 官方入口 / 客户端 / 教程 / 直充 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB ChatGPT 资源汇总：OpenAI 官方入口、客户端下载、订阅档位对比、国内付款方法、降低封号率、Codex 介绍、订阅直充入口。',
    },
  ],
})
</script>
