<template>
  <HubLayout
    accent="#6366f1"
    :hero="hero"
    :sections="sections"
    :cta="ctaCards"
    :related="related"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HubLayout from '../components/hub/HubLayout.vue'

const hero = {
  title: 'OpenAI 资源中心',
  subtitle: 'OpenAI 全产品矩阵、开发者资源与订阅直充入口',
}

const sections = [
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
  { url: '/products/chatgpt-plus', fallbackName: 'ChatGPT Plus', fallbackDesc: '日常稳定使用，适合多数用户。' },
  { url: '/products/chatgpt-pro-5x', fallbackName: 'ChatGPT Pro 5x', fallbackDesc: '更高额度，适合高频工作流。' },
  { url: '/products/chatgpt-pro-20x', fallbackName: 'ChatGPT Pro 20x', fallbackDesc: '超高用量，适合重度自动化与代理场景。' },
]

const related = {
  title: '相关阅读',
  desc: '关于 ChatGPT 订阅本身的对比、防封、付款攻略，单独整理在 ChatGPT 资源页；Sora / DALL-E / Codex 等 OpenAI 其它产品的实战内容会随博客逐步补充。',
  items: [
    { to: '/chatgpt-hub', text: 'ChatGPT 资源中心（订阅 / 防封 / 付款）' },
    { to: '/claude-hub', text: 'Claude 资源中心' },
    { to: '/blog/chatgpt-codex-vs-claude-code', text: 'ChatGPT Codex vs Claude Code' },
    { to: '/blog/sora-veo-hailuo-video-subscription', text: 'Sora / Veo / Hailuo 视频订阅怎么买' },
    { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
    { to: '/blog', text: '全部 AI 工具教程' },
    { to: '/tools', text: '在线工具集合' },
    { to: '/products', text: '订阅直充与账号商品' },
  ],
}

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
