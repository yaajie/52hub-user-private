<template>
  <HubLayout
    :accent="accent"
    :hero="hero"
    :sections="sections"
    :model-table="modelTable"
    :faq="faq"
    :cta="ctaCards"
    :related="related"
    og-image="/og/claude-hub.png"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HubLayout from '../components/hub/HubLayout.vue'

const accent = '#D97757' // Anthropic 橙

const hero = {
  title: 'Claude 资源中心',
  subtitle: 'Anthropic 官方入口、Claude.ai / Console / API 文档、Claude Code、订阅档位攻略、Pro / Max 直充入口。',
  ctaPrimary: { label: '看 Pro vs Max 攻略', to: '/blog/claude-pro-vs-max' },
  ctaSecondary: { label: '立即下单 Claude Pro', to: '/products/claude-pro' },
}

const sections = [
  {
    title: '官方入口',
    items: [
      { name: 'Claude.ai', url: 'https://claude.ai/', desc: 'Claude 官方对话界面' },
      { name: 'Anthropic Console', url: 'https://console.anthropic.com/', desc: 'API key 管理 / 用量 / 计费' },
      { name: 'Anthropic API 文档', url: 'https://docs.anthropic.com/', desc: '开发者 API 完整文档' },
      { name: 'Anthropic Status', url: 'https://status.anthropic.com/', desc: '服务状态实时查询' },
    ],
  },
  {
    title: '客户端 & 工具',
    items: [
      { name: 'AI IP 环境检测', url: '/tools/ip', desc: '登录 Claude / Claude Code 或调用 API 前先检测当前出口环境' },
      { name: 'Claude 桌面客户端', url: 'https://claude.ai/download', desc: 'macOS / Windows 官方客户端' },
      { name: 'Claude Code', url: 'https://claude.com/product/claude-code', desc: 'Anthropic AI 智能体（agent）：终端 / IDE / 桌面应用 / 浏览器，Claude Pro·Max 订阅含，不只是写代码' },
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
    ],
  },
]

const modelTable = {
  title: 'Claude 订阅套餐',
  columns: ['套餐', '含 Claude Code', '适用'],
  rows: [
    { cells: ['Pro（约 $20/月）', '含 · 基础用量', '日常对话 / 写作 + 小型代码库短冲刺'] },
    { cells: ['Max 5x（$100/月）', '含 · 5 倍用量', '大型代码库日常使用，性价比高'] },
    { cells: ['Max 20x（$200/月）', '含 · 20 倍用量', '重度 agent 用户，最大模型访问'] },
    { cells: ['Team / Enterprise', '含 · 团队席位', '团队协作 / 企业管控'] },
  ],
}

const faq = [
  {
    q: 'Claude Pro $20 一个月够用吗？',
    a: '看你怎么用。日常聊天、写作、轻度编程 Pro 完全够。如果用 Claude Code 跑大项目或者每天写超过 50 万 token，会经常撞限额，建议直接上 Max 5x。一句话：偶尔用 Pro，每天用 Max。',
  },
  {
    q: 'Claude 在中国能直接用吗？',
    a: '不能。Anthropic 屏蔽中国大陆 IP，需要走稳定的住宅 IP 代理。机房 IP 容易被风控判定为机器人，弹验证码或直接 403。注册环节同样需要海外 IP + 海外手机号或邮箱。',
  },
  {
    q: 'Pro 和 Max 5x / 20x 的差别有多大？',
    a: '按官方说法 Max 5x 是 Pro 的 5 倍额度、Max 20x 是 20 倍。实际体验：Pro 每 5 小时大概能发 45 条 Sonnet；Max 5x 翻 5 倍，Max 20x 几乎全天无限制使用。每天频繁用 Claude Code 的人值得上 Max。',
  },
  {
    q: 'Claude Code 收费吗，需要单独订阅吗？',
    a: 'Claude Code 本身免费下载，但实际调用 Claude 模型按 token 计费——直接消耗你的 Claude Pro / Max 订阅额度，或者你的 Anthropic API key 余额。订阅 Pro 即可用，不需要单买。',
  },
  {
    q: '注册时遇到 "Unable to verify" 或 403 怎么办？',
    a: '90% 是 IP 问题。换一个干净的住宅 IP 重试；还不行换浏览器隐私窗口 + 清 cookie；手机号收不到验证码可以试邮箱注册。封号则只能重新注册，没有申诉渠道。',
  },
]

const ctaCards = [
  { url: '/products/claude-pro', fallbackName: 'Claude Pro', fallbackDesc: '适合稳定日常使用，覆盖主流高频任务。' },
  { url: '/products/claude-max-5x', fallbackName: 'Claude Max 5x', fallbackDesc: '更高额度，适合重度写作与编程场景。' },
  { url: '/products/claude-gift-card', fallbackName: 'Claude 礼品卡兑换号', fallbackDesc: '礼品卡兑换方案，适合多设备和灵活使用。' },
]

const related = {
  title: '相关教程',
  items: [
    { to: '/blog/claude-pro-vs-max', text: 'Claude Pro vs Max · 订阅档位怎么选' },
    { to: '/blog/claude-registration-guide', text: 'Claude 注册指南' },
    { to: '/blog/claude-code-getting-started', text: 'Claude Code 上手指南' },
    { to: '/blog/claude-403-troubleshooting', text: 'Claude 报错 403 排查' },
    { to: '/tools/ip', text: 'AI IP 环境检测' },
    { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
    { to: '/blog/apple-id-overseas-registration-guide', text: 'Apple ID 海外区注册全攻略' },
  ],
}

const pageTitle = 'Claude 资源中心 · Anthropic 官方入口 · Pro / Max 订阅直充 · 注册教程 - 52HUB'
const pageDesc = '52HUB Claude 资源中心：Anthropic 官方入口（Claude.ai / Console / API 文档）、桌面客户端、Claude Code 使用指南、Pro 与 Max 5x / 20x 订阅档位对比、注册全流程、报错 403 排查、订阅直充入口与店家挑选指南，AI 工具站长一站整理。'

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDesc },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDesc },
    { property: 'og:url', content: 'https://52hub.org/claude-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/claude-hub' },
  ],
})
</script>
