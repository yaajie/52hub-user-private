<template>
  <HubLayout
    :accent="accent"
    :accent-gradient="accentGradient"
    :hero="hero"
    :sections="sections"
    :model-table="modelTable"
    :faq="faq"
    :cta="ctaCards"
    :related="related"
    og-image="/og/gemini-hub.png"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HubLayout from '../components/hub/HubLayout.vue'

const accent = '#4285F4' // Google 蓝
const accentGradient = 'linear-gradient(135deg, #4285F4, #9333EA)' // 蓝紫渐变

const hero = {
  title: 'Gemini 资源中心',
  subtitle: 'Google Gemini 对话、AI Studio、Vertex AI、NotebookLM、Imagen、Veo 全产品矩阵与订阅直充入口。',
  ctaPrimary: { label: '看 Pro vs Advanced', to: '/blog/gemini-pro-vs-advanced' },
  ctaSecondary: { label: '查看 Gemini 商品', to: '/categories/gemini' },
}

const sections = [
  {
    title: '官方入口',
    items: [
      { name: 'Gemini', url: 'https://gemini.google.com/', desc: 'Gemini 对话界面' },
      { name: 'Google AI Studio', url: 'https://aistudio.google.com/', desc: '开发者控制台 / API key 申请' },
      { name: 'Vertex AI', url: 'https://cloud.google.com/vertex-ai', desc: '企业级 AI 平台（Google Cloud）' },
      { name: 'NotebookLM', url: 'https://notebooklm.google/', desc: 'Gemini 驱动的笔记 / 研究工具' },
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
      { name: 'AI IP 环境检测', url: '/tools/ip', desc: '使用 Gemini / AI Studio / API 前先检测当前出口环境' },
      { name: 'Gemini API 文档', url: 'https://ai.google.dev/gemini-api/docs', desc: '完整 API 文档' },
      { name: 'Cookbook', url: 'https://github.com/google-gemini/cookbook', desc: '示例代码集（GitHub）' },
      { name: 'API 定价', url: 'https://ai.google.dev/gemini-api/docs/pricing', desc: '免费 tier + 付费定价' },
      { name: 'Google Cloud Status', url: 'https://status.cloud.google.com/', desc: '系统状态（含 Gemini API）' },
    ],
  },
  {
    title: '实用教程（站内）',
    items: [
      { name: 'Gemini Pro vs Advanced 怎么选', url: '/blog/gemini-pro-vs-advanced', desc: '订阅档位对比与决策' },
      { name: 'Sora / Veo / Hailuo 视频订阅', url: '/blog/sora-veo-hailuo-video-subscription', desc: '视频生成订阅对比，含 Veo' },
      { name: '如何挑靠谱的 AI 订阅店家', url: '/blog/how-to-pick-ai-subscription-store', desc: '避坑指南 / 售后判断' },
      { name: '查看全部 AI 教程', url: '/blog', desc: '52HUB 博客全部教程（Gemini 专题持续更新）' },
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

const faq = [
  {
    q: 'Gemini 免费版和 Google One AI Premium 差别是什么？',
    a: '免费版只能用 Flash 模型，额度有限；Premium（$19.99/月）解锁 Pro 模型 + 2TB 云存储 + 长上下文支持 + Gemini 集成进 Gmail / Docs。普通用户用免费版够，重度用户买 Premium。',
  },
  {
    q: 'Gemini 在中国能用吗？',
    a: 'gemini.google.com 不能直连，需要海外 IP；AI Studio 部分地区可访问，但同样建议走稳定海外节点。Gemini API 在中国可以付费用（但 Google 不支持中国大陆信用卡，需要海外支付方式）。',
  },
  {
    q: 'Gemini 和 ChatGPT / Claude 比，强在哪里？',
    a: '强在长上下文（1M+ token，能塞整本书）+ 多模态（视频理解 / 文档分析）+ 价格便宜。弱在对话自然度和编程能力略逊 Claude / ChatGPT。适合做研究 / 长文档分析的人。',
  },
  {
    q: 'Gemini API 怎么收费，免费 tier 够开发用吗？',
    a: 'Gemini API 有免费 tier（每天有限制的请求次数），开发测试完全够用。付费按 token 计费，价格普遍比 OpenAI 和 Anthropic 便宜 30-50%。生产环境用建议升级付费 tier。',
  },
  {
    q: 'Veo 视频生成普通用户能用吗？',
    a: '当前 Veo 在 Gemini Advanced（Premium）订阅里可以用，每月有限额度生成。免费版用户暂时不能用。想做视频生成，Premium 是性价比最高的选择，比 Sora Pro 便宜得多。',
  },
]

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
    { to: '/tools/ip', text: 'AI IP 环境检测' },
    { to: '/blog', text: 'AI 工具教程合集' },
    { to: '/products', text: '订阅直充与账号商品' },
  ],
}

const pageTitle = 'Gemini 资源中心 · Google AI 全产品 · AI Studio · NotebookLM · Pro 直充 - 52HUB'
const pageDesc = '52HUB Gemini 资源中心：Google Gemini 对话、AI Studio 开发者控制台、Vertex AI 企业平台、NotebookLM 研究工具、Imagen 图像、Veo 视频生成，Pro 与 Advanced 订阅档位对比，API 免费 tier 与定价，Gemini 商品订阅直充入口。'

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDesc },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDesc },
    { property: 'og:url', content: 'https://52hub.org/gemini-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/gemini-hub' },
  ],
})
</script>
