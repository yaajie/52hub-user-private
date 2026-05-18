<template>
  <div class="openai-hub-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold theme-text-primary">OpenAI 资源中心</h1>
        <p class="mt-3 text-sm sm:text-base theme-text-secondary">OpenAI 全产品矩阵、开发者资源与订阅直充入口</p>
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

    <section class="container mx-auto px-4 pb-12 pt-6">
      <div class="theme-panel border theme-border rounded-2xl p-6 sm:p-8">
        <h2 class="text-lg sm:text-xl font-semibold theme-text-primary mb-4">相关教程</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <li><router-link to="/blog/chatgpt-plus-china-payment-guide" class="theme-link-muted hover:theme-text-primary transition-colors">国内付款订阅 ChatGPT Plus 全方法 →</router-link></li>
          <li><router-link to="/blog/chatgpt-plus-vs-pro-comparison" class="theme-link-muted hover:theme-text-primary transition-colors">ChatGPT Plus vs Pro 对比 →</router-link></li>
          <li><router-link to="/blog/chatgpt-anti-ban-guide" class="theme-link-muted hover:theme-text-primary transition-colors">ChatGPT 防封号实战指南 →</router-link></li>
          <li><router-link to="/blog/chatgpt-codex-vs-claude-code" class="theme-link-muted hover:theme-text-primary transition-colors">ChatGPT Codex vs Claude Code →</router-link></li>
        </ul>
      </div>
    </section>
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
      { name: 'OpenAI 官网', url: 'https://openai.com/', desc: '公司主页 + 全产品总览' },
      { name: 'ChatGPT', url: 'https://chat.openai.com/', desc: '对话界面（Plus / Pro 订阅入口）' },
      { name: 'OpenAI Platform', url: 'https://platform.openai.com/', desc: 'API key / 用量 / 模型管理' },
      { name: 'Sora', url: 'https://sora.com/', desc: 'OpenAI 视频生成模型独立站' },
      { name: 'OpenAI Status', url: 'https://status.openai.com/', desc: '所有服务状态实时查询' },
    ],
  },
  {
    title: '产品矩阵',
    items: [
      { name: 'GPT 模型', url: 'https://platform.openai.com/docs/models', desc: '当前一代旗舰对话与推理模型' },
      { name: 'Codex', url: 'https://chat.openai.com/codex', desc: '代码任务执行（ChatGPT Pro 内）' },
      { name: 'DALL-E', url: 'https://openai.com/dall-e-3', desc: '图像生成模型' },
      { name: 'Sora', url: 'https://sora.com/', desc: '视频生成模型' },
      { name: 'Whisper', url: 'https://github.com/openai/whisper', desc: '开源语音识别模型（GitHub）' },
    ],
  },
  {
    title: '开发者资源',
    items: [
      { name: 'API 文档', url: 'https://platform.openai.com/docs', desc: '完整 API 文档与教程' },
      { name: 'OpenAI Cookbook', url: 'https://github.com/openai/openai-cookbook', desc: '官方示例代码集' },
      { name: 'Playground', url: 'https://platform.openai.com/playground', desc: 'API 实时测试沙箱' },
      { name: 'API 定价', url: 'https://openai.com/api/pricing/', desc: 'Token 计费与模型定价' },
    ],
  },
  {
    title: '实用教程（站内）',
    items: [
      { name: 'ChatGPT Plus / Pro 5x / 20x 怎么选', url: '/blog/chatgpt-plus-vs-pro-comparison', desc: '三档订阅对比' },
      { name: '国内充值 ChatGPT 全方法', url: '/blog/chatgpt-plus-china-payment-guide', desc: '4 种付款路径' },
      { name: 'ChatGPT 账号封号原因 + 降低风控', url: '/blog/chatgpt-anti-ban-guide', desc: '住宅 IP / 习惯 / 自查' },
      { name: 'ChatGPT Codex vs Claude Code', url: '/blog/chatgpt-codex-vs-claude-code', desc: '编程助手对比' },
    ],
  },
]

const ctaCards = [
  { name: 'ChatGPT Plus', url: '/products/chatgpt-plus', desc: '日常稳定使用，适合多数用户。' },
  { name: 'ChatGPT Pro 5x', url: '/products/chatgpt-pro-5x', desc: '更高额度，适合高频工作流。' },
  { name: 'ChatGPT Pro 20x', url: '/products/chatgpt-pro-20x', desc: '超高用量，适合重度自动化与代理场景。' },
]

const isInternalLink = (url: string) => url.startsWith('/')

useHead({
  title: 'OpenAI 资源中心 · ChatGPT / Sora / API / 直充入口 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB OpenAI 全产品资源汇总：ChatGPT 订阅、Sora 视频、DALL-E 图像、API 平台、Codex 编程、Whisper 语音、订阅直充入口。',
    },
    { property: 'og:title', content: 'OpenAI 资源中心 · ChatGPT / Sora / API / 直充入口 - 52HUB' },
    { property: 'og:description', content: '52HUB OpenAI 全产品资源汇总：ChatGPT 订阅、Sora 视频、DALL-E 图像、API 平台、Codex 编程、Whisper 语音、订阅直充入口。' },
    { property: 'og:url', content: 'https://52hub.org/openai-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/openai-hub' },
  ],
})
</script>
