<template>
  <HubLayout
    :accent="accent"
    :hero="hero"
    :sections="sections"
    :model-table="modelTable"
    :faq="faq"
    :cta="ctaCards"
    :related="related"
    og-image="/og/openai-hub.png"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HubLayout from '../components/hub/HubLayout.vue'

const accent = '#404040' // 深灰（中性，区别于 ChatGPT 绿）

const hero = {
  title: 'OpenAI 资源中心',
  subtitle: 'ChatGPT / Sora / DALL-E / Codex / API 全产品矩阵导航；订阅类需求直接看 ChatGPT 资源页。',
  ctaPrimary: { label: '查看 ChatGPT 订阅', to: '/chatgpt-hub' },
  ctaSecondary: { label: '全部 AI 教程', to: '/blog' },
}

const sections = [
  {
    title: '官方入口',
    items: [
      { name: 'OpenAI 官网', url: 'https://openai.com/', desc: '公司主页 + 全产品总览' },
      { name: 'ChatGPT', url: 'https://chat.openai.com/', desc: '对话界面（Plus / Pro 订阅入口）' },
      { name: 'OpenAI Platform', url: 'https://platform.openai.com/', desc: 'API key / 用量 / 模型管理' },
      { name: 'OpenAI Status', url: 'https://status.openai.com/', desc: '所有服务状态实时查询' },
    ],
  },
  {
    title: '产品矩阵',
    items: [
      { name: 'GPT 模型', url: 'https://platform.openai.com/docs/models', desc: '当前一代旗舰对话与推理模型' },
      { name: 'Codex', url: 'https://chat.openai.com/codex', desc: '代码任务执行（ChatGPT Pro 内）' },
      { name: 'DALL-E', url: 'https://openai.com/dall-e-3', desc: '图像生成模型' },
      { name: 'Sora', url: 'https://sora.com/', desc: '视频生成模型独立站' },
    ],
  },
  {
    title: 'Codex 工具',
    items: [
      { name: 'AI IP 环境检测', url: '/tools/ip', desc: '登录 ChatGPT / Codex 或调用 OpenAI API 前先检测当前出口' },
      { name: 'Codex Auth JSON 生成器', url: '/tools/codex-auth', desc: 'ChatGPT session 转 Codex CLI auth.json，浏览器本地生成' },
      { name: 'Codex vs Claude Code', url: '/blog/chatgpt-codex-vs-claude-code', desc: '两个 AI 编程助手的定位、订阅门槛和使用方式对比' },
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

const modelTable = {
  title: '模型与产品对比',
  columns: ['模型 / 产品', '定位', '怎么用'],
  rows: [
    { cells: ['GPT-5', '当前旗舰对话推理', '日常对话 / 编程 / 写作首选'] },
    { cells: ['GPT-4o', '多模态（图 / 语音 / 视频）', '看图说话 / 语音对话 / 图像分析'] },
    { cells: ['o3', '推理模型（思维链）', '复杂数学 / 编程 / 长链条思考'] },
    { cells: ['Codex', '代码任务执行', 'ChatGPT Pro 自带 / Codex CLI'] },
    { cells: ['DALL-E 3', '图像生成', 'Plus+ 集成在 ChatGPT 内'] },
    { cells: ['Sora', '视频生成', 'sora.com 独立站，订阅享额度'] },
  ],
}

const faq = [
  {
    q: 'ChatGPT 和 OpenAI API 是一回事吗，订阅 Plus 包含 API 用量吗？',
    a: '不是。ChatGPT 是消费者产品按月订阅；API 是开发者产品按 token 计费，账单完全分开。订阅了 Plus 也不会送 API 额度。开发应用需要单独去 platform.openai.com 充值。',
  },
  {
    q: 'Sora 和 DALL-E 怎么用，需要单独付费吗？',
    a: 'DALL-E 集成在 ChatGPT 里（Plus 以上可用），Sora 在独立站点 sora.com。两个都包含在 ChatGPT 订阅里，按订阅档位享用对应额度，不需要单独付费。开发者需要走 API。',
  },
  {
    q: 'GPT-5 / GPT-4o / o3 怎么选，普通用户应该用哪个？',
    a: 'GPT-5 是当前旗舰，日常对话推理首选；GPT-4o 多模态强（图像/语音/视频理解），适合需要看图说话的场景；o3 是推理模型，复杂数学 / 编程 / 长链条思考更稳。聊天选 GPT-5，做题选 o3。',
  },
  {
    q: '想自己开发应用，是用 API 还是 ChatGPT Plus？',
    a: '一定是 API。Plus 是给人聊天用的，不开放给程序调用；API 才能集成到代码里，按 token 计费更可控。开发期间可以同时用 Plus（自己测）+ API（产品调用）。',
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
    { to: '/tools/ip', text: 'AI IP 环境检测' },
    { to: '/tools/codex-auth', text: 'Codex Auth JSON 本地生成器' },
    { to: '/blog/chatgpt-codex-vs-claude-code', text: 'ChatGPT Codex vs Claude Code' },
    { to: '/blog/sora-veo-hailuo-video-subscription', text: 'Sora / Veo / Hailuo 视频订阅怎么买' },
    { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
    { to: '/blog', text: '全部 AI 工具教程' },
    { to: '/tools', text: '在线工具集合' },
    { to: '/products', text: '订阅直充与账号商品' },
  ],
}

const pageTitle = 'OpenAI 资源中心 · ChatGPT / Sora / DALL-E / Codex / API 全产品矩阵 - 52HUB'
const pageDesc = '52HUB OpenAI 全产品资源中心：ChatGPT 订阅、Sora 视频生成、DALL-E 图像、Codex 编程助手、Codex Auth JSON 本地生成器、Platform API key 管理与定价，GPT-5 / 4o / o3 模型对比，开发者 Cookbook 与 Playground，订阅直充入口。'

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDesc },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDesc },
    { property: 'og:url', content: 'https://52hub.org/openai-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/openai-hub' },
  ],
})
</script>
