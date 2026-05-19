<template>
  <HubLayout
    accent="#6366f1"
    :hero="hero"
    :sections="sections"
    :model-table="modelTable"
    :cta="ctaCards"
    :related="related"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HubLayout from '../components/hub/HubLayout.vue'

const hero = {
  title: 'Gemini 资源中心',
  subtitle: 'Gemini 官方入口、产品矩阵、开发者资源与订阅直充入口',
}

const sections = [
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

const modelTable = {
  title: '订阅档位参考',
  columns: ['档位', '额度', '适用场景'],
  rows: [
    { cells: ['Gemini Free', 'Flash 模型受限', '入门尝鲜'] },
    { cells: ['Google One AI Premium', 'Pro 模型 + 2TB 云存储', '日常 + 长文档处理'] },
    { cells: ['API 付费', '按 token 计费', '开发者 / 接入应用'] },
  ],
}

const ctaCards = [
  { url: '/products/gemini-pro-pixel', fallbackName: 'Gemini Pro Pixel', fallbackDesc: '订阅直充入口，适合 Gemini 重度用户。' },
  { url: '/categories/gemini', fallbackName: 'Gemini 分类', fallbackDesc: '浏览全部 Gemini 相关商品与服务。' },
  { url: '/categories/google', fallbackName: 'Google 全品类', fallbackDesc: '查看 Google 生态下全部可用品类。' },
]

const related = {
  title: '相关教程',
  items: [
    { to: '/blog/gemini-pro-vs-advanced', text: 'Gemini Pro vs Advanced 怎么选' },
    { to: '/blog/sora-veo-hailuo-video-subscription', text: 'Sora / Veo / Hailuo 视频订阅怎么买' },
    { to: '/claude-hub', text: 'Claude 资源中心' },
    { to: '/openai-hub', text: 'OpenAI 全产品资源' },
    { to: '/blog', text: 'AI 工具教程合集' },
    { to: '/products', text: '订阅直充与账号商品' },
  ],
}

useHead({
  title: 'Gemini 资源中心 · 官方入口 / AI Studio / API / 直充 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB Gemini 资源汇总：Google Gemini 对话、AI Studio、Vertex AI、NotebookLM、Imagen、Veo、订阅直充入口。',
    },
    { property: 'og:title', content: 'Gemini 资源中心 · 官方入口 / AI Studio / API / 直充 - 52HUB' },
    { property: 'og:description', content: '52HUB Gemini 资源汇总：Google Gemini 对话、AI Studio、Vertex AI、NotebookLM、Imagen、Veo、订阅直充入口。' },
    { property: 'og:url', content: 'https://52hub.org/gemini-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/gemini-hub' },
  ],
})
</script>
