<template>
  <div class="gemini-hub-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold theme-text-primary">Gemini 资源中心</h1>
        <p class="mt-3 text-sm sm:text-base theme-text-secondary">Gemini 官方入口、产品矩阵、开发者资源与订阅直充入口</p>
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
      { name: 'Gemini', url: 'https://gemini.google.com/', desc: 'Gemini 对话界面' },
      { name: 'Google AI Studio', url: 'https://aistudio.google.com/', desc: '开发者控制台 / API key 申请' },
      { name: 'Vertex AI', url: 'https://cloud.google.com/vertex-ai', desc: '企业级 AI 平台（Google Cloud）' },
      { name: 'NotebookLM', url: 'https://notebooklm.google/', desc: 'Gemini 驱动的笔记 / 研究工具' },
      { name: 'Google AI', url: 'https://ai.google/', desc: 'Google AI 全产品总览' },
    ],
  },
  {
    title: '产品矩阵',
    items: [
      { name: 'Gemini Free', url: 'https://gemini.google.com/', desc: '免费版（Flash 模型）' },
      { name: 'Google One AI Premium', url: 'https://one.google.com/about/google-ai-features', desc: 'Pro 模型 + 2TB 云存储订阅' },
      { name: 'Imagen', url: 'https://aistudio.google.com/', desc: '图像生成模型（AI Studio 内调用）' },
      { name: 'Veo', url: 'https://deepmind.google/technologies/veo/', desc: '视频生成模型' },
    ],
  },
  {
    title: '开发者资源',
    items: [
      { name: 'Gemini API 文档', url: 'https://ai.google.dev/gemini-api/docs', desc: '完整 API 文档' },
      { name: 'Cookbook', url: 'https://github.com/google-gemini/cookbook', desc: '示例代码集（GitHub）' },
      { name: 'API 定价', url: 'https://ai.google.dev/gemini-api/docs/pricing', desc: '免费 tier + 付费定价' },
      { name: 'Google Cloud Status', url: 'https://status.cloud.google.com/', desc: '系统状态（含 Gemini API）' },
    ],
  },
  {
    title: '实用教程（站内）',
    items: [
      { name: '查看所有 AI 教程', url: '/blog', desc: '52HUB 博客全部教程（Gemini 专题即将补充）' },
    ],
  },
]

const planComparison = [
  { name: 'Gemini Free', quota: 'Flash 模型受限', use: '入门尝鲜' },
  { name: 'Google One AI Premium', quota: 'Pro 模型 + 2TB 云存储', use: '日常 + 长文档处理' },
  { name: 'API 付费', quota: '按 token 计费', use: '开发者 / 接入应用' },
]

const ctaCards = [
  { name: 'Gemini Pro Pixel', url: '/products/gemini-pro-pixel', desc: '订阅直充入口，适合 Gemini 重度用户。' },
  { name: 'Gemini 分类', url: '/categories/gemini', desc: '浏览全部 Gemini 相关商品与服务。' },
  { name: 'Google 全品类', url: '/categories/google', desc: '查看 Google 生态下全部可用品类。' },
]

const isInternalLink = (url: string) => url.startsWith('/')

useHead({
  title: 'Gemini 资源中心 · 官方入口 / AI Studio / API / 直充 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB Gemini 资源汇总：Google Gemini 对话、AI Studio、Vertex AI、NotebookLM、Imagen、Veo、订阅直充入口。',
    },
  ],
})
</script>
