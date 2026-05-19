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
  title: 'ChatGPT 资源中心',
  subtitle: 'OpenAI 官方入口、客户端、实用教程与订阅直充入口',
}

const sections = [
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

const modelTable = {
  title: '订阅档位参考',
  columns: ['档位', '额度', '适用场景'],
  rows: [
    { cells: ['Free', '基础', '偶尔试用'] },
    { cells: ['Plus', '日常用量', '聊天 / 写作 / 轻度编程'] },
    { cells: ['Pro 5x', 'Plus 的 5 倍', '编程 / 研究 / 高频使用'] },
    { cells: ['Pro 20x', 'Plus 的 20 倍', 'Codex / Agent 重度玩家'] },
  ],
}

const ctaCards = [
  { url: '/products/chatgpt-plus', fallbackName: 'ChatGPT Plus', fallbackDesc: '日常稳定使用，适合多数用户。' },
  { url: '/products/chatgpt-pro-5x', fallbackName: 'ChatGPT Pro 5x', fallbackDesc: '更高额度，适合高频工作流。' },
  { url: '/products/chatgpt-pro-20x', fallbackName: 'ChatGPT Pro 20x', fallbackDesc: '超高用量，适合重度自动化与代理场景。' },
]

const related = {
  title: '相关教程',
  items: [
    { to: '/blog/chatgpt-plus-china-payment-guide', text: '国内付款订阅 ChatGPT Plus 全方法' },
    { to: '/blog/chatgpt-plus-vs-pro-comparison', text: 'ChatGPT Plus vs Pro 对比' },
    { to: '/blog/chatgpt-anti-ban-guide', text: 'ChatGPT 防封号实战指南' },
    { to: '/blog/chatgpt-codex-vs-claude-code', text: 'ChatGPT Codex vs Claude Code' },
    { to: '/blog/sora-veo-hailuo-video-subscription', text: 'Sora / Veo / Hailuo 视频订阅怎么买' },
    { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
    { to: '/blog/apple-id-overseas-registration-guide', text: 'Apple ID 海外区注册全攻略' },
  ],
}

useHead({
  title: 'ChatGPT 资源中心 · 官方入口 / 客户端 / 教程 / 直充 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB ChatGPT 资源汇总：OpenAI 官方入口、客户端下载、订阅档位对比、国内付款方法、降低封号率、Codex 介绍、订阅直充入口。',
    },
    { property: 'og:title', content: 'ChatGPT 资源中心 · 官方入口 / 客户端 / 教程 / 直充 - 52HUB' },
    { property: 'og:description', content: '52HUB ChatGPT 资源汇总：OpenAI 官方入口、客户端下载、订阅档位对比、国内付款方法、降低封号率、Codex 介绍、订阅直充入口。' },
    { property: 'og:url', content: 'https://52hub.org/chatgpt-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/chatgpt-hub' },
  ],
})
</script>
