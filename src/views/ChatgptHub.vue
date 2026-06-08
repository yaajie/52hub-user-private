<template>
  <HubLayout
    :accent="accent"
    :hero="hero"
    :sections="sections"
    :model-table="modelTable"
    :faq="faq"
    :cta="ctaCards"
    :related="related"
    og-image="/og/chatgpt-hub.png"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HubLayout from '../components/hub/HubLayout.vue'

const accent = '#10A37F' // OpenAI 绿

const hero = {
  title: 'ChatGPT 资源中心',
  subtitle: 'OpenAI 官方入口、客户端下载、订阅档位对比、国内付款方法、降低封号率、Plus / Pro 直充入口。',
  ctaPrimary: { label: '看国内付款方法', to: '/blog/chatgpt-plus-china-payment-guide' },
  ctaSecondary: { label: '立即下单 Plus', to: '/products/chatgpt-plus' },
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
      { name: 'AI IP 环境检测', url: '/tools/ip', desc: '登录、订阅或调用前先检测当前出口是否适合 ChatGPT / Codex' },
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

const faq = [
  {
    q: 'ChatGPT Plus 国内能直接订阅吗？',
    a: '直接订阅不行，需要海外信用卡或海外 Apple ID + 海外礼品卡。国内有 4 种主流付款路径（虚拟卡 / 海外亲友卡 / Apple Gift Card / 充值代付），细节看《国内付款订阅 ChatGPT Plus 全方法》。',
  },
  {
    q: 'Plus / Pro 5x / Pro 20x 怎么选？',
    a: 'Plus（$20）日常聊天写作够用；Pro 5x（$200）适合每天高频用 Codex / 写长文 / 跑分析；Pro 20x（$500）面向重度自动化 / Agent 玩家。普通用户先 Plus，撞限额了再升级，不要一开始就买高档位。',
  },
  {
    q: 'ChatGPT 账号会被封吗？怎么降低风险？',
    a: '会。常见封号原因：机房 IP / 公共代理 / 多人共享账号 / 异常使用频率。降低风险要点：稳定住宅 IP、避免短时间高频请求、不用脚本批量调用、注册信息和实际 IP 国家保持一致。',
  },
  {
    q: '想用 Sora 视频生成必须订阅 Pro 20x 吗？',
    a: '不需要。Sora 现在有独立站点 sora.com，Plus 订阅就能用基础额度，Pro 订阅额度更高。如果你只是偶尔生成视频，Plus 完全够。',
  },
  {
    q: 'Codex 是免费的吗，怎么开通？',
    a: 'Codex 是 ChatGPT Pro 订阅自带的功能，不单独收费。订阅 Pro 后在 chatgpt.com/codex 直接用。Plus 用户不能用 Codex。开发者也可以用 Codex CLI 通过 API key 调用。',
  },
]

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
    { to: '/tools/ip', text: 'AI IP 环境检测' },
    { to: '/blog/sora-veo-hailuo-video-subscription', text: 'Sora / Veo / Hailuo 视频订阅怎么买' },
    { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
  ],
}

const pageTitle = 'ChatGPT 资源中心 · OpenAI 官方入口 · Plus / Pro 订阅直充 · 国内付款 - 52HUB'
const pageDesc = '52HUB ChatGPT 资源中心：OpenAI 官方入口（ChatGPT / Platform / API 文档）、桌面与 iOS 客户端、Plus 与 Pro 5x / 20x 档位对比、国内 4 种付款方法（虚拟卡 / 海外卡 / 礼品卡 / 代充）、降低封号风险攻略、Codex 介绍、订阅直充入口。'

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDesc },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDesc },
    { property: 'og:url', content: 'https://52hub.org/chatgpt-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/chatgpt-hub' },
  ],
})
</script>
