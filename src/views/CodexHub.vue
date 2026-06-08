<template>
  <HubLayout
    :accent="accent"
    :hero="hero"
    :showcase="showcase"
    :features="features"
    :sections="sections"
    :model-table="modelTable"
    :faq="faq"
    :cta="ctaCards"
    :related="related"
    og-image="/og/codex-hub.png"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import {
  BoltIcon, Squares2X2Icon, SparklesIcon, ArrowPathIcon, ShieldCheckIcon, RectangleGroupIcon,
} from '@heroicons/vue/24/outline'
import HubLayout from '../components/hub/HubLayout.vue'
import codexLogo from '../assets/ai-products/codex-logo.webp'

const accent = '#10A37F' // OpenAI 绿（Codex 属 OpenAI）

const hero = {
  title: 'Codex 资源中心',
  subtitle: 'OpenAI Codex 已从写代码工具进化为能自己规划、执行任务的 AI 智能体（agent），主要通过 Codex 官方桌面客户端使用。这里整理官方入口、ChatGPT 订阅门槛、登录环境与上手要点。',
  logo: codexLogo,
  ctaPrimary: { label: '看 Codex vs Claude Code', to: '/blog/chatgpt-codex-vs-claude-code' },
  ctaSecondary: { label: '立即下单 ChatGPT Pro', to: '/products/chatgpt-pro-5x' },
}

const showcase = {
  title: '看 Codex 跑一个任务',
  desc: '你只描述目标，Codex 会自己读代码、改文件、跑测试再交付。下面是它处理一个真实需求的过程示意。',
  points: [
    '桌面应用 / 编辑器 / 终端 / 云端，统一连 ChatGPT 账户',
    '多任务并行，长任务可在后台自动推进',
    '改完自动跑测试、整理改动并提 PR',
  ],
  mockup: {
    title: 'codex · acme-dashboard',
    prompt: '给设置页加一个深色模式开关，记住选择并默认跟随系统',
    steps: [
      { text: '读取代码库结构与依赖' },
      { text: 'Edit  ThemeProvider.tsx', meta: '+18 −2' },
      { text: 'Edit  settings.tsx', meta: '+21 −0' },
      { text: 'Run   npm test', meta: '✓ 12 passed' },
      { text: '完成 · 已提交 PR #112', done: true },
    ],
  },
}

const features = {
  title: 'Codex 能做什么',
  desc: 'Codex 是 OpenAI 的编程智能体——你描述目标，它自己规划、写码、跑测试并交付，而不只是补全代码。',
  items: [
    { title: '端到端任务执行', desc: '从常规 Pull Request 到核心难题，胜任功能开发、复杂重构与代码迁移，依托 OpenAI 前沿编码模型。', icon: BoltIcon },
    { title: '多智能体并行', desc: '桌面应用内置工作树与云端环境，多个智能体跨项目并行推进，把原需数周的开发周期缩短到数天。', icon: Squares2X2Icon },
    { title: '技能（Skills）', desc: '不止写代码——参与代码理解、原型构建、文档编写，并与团队规范保持一致。', icon: SparklesIcon },
    { title: '后台自动化', desc: '无需逐步提示即可长时间自动运行，处理问题分流、告警监控、CI/CD 等日常工作。', icon: ArrowPathIcon },
    { title: '代码审查', desc: 'PR 审查能发现团队容易忽略的漏洞与向后兼容问题，从源头降低交付风险。', icon: ShieldCheckIcon },
    { title: '多入口统一', desc: '桌面应用 / 编辑器(IDE) / 终端(CLI) / 云端，全部通过你的 ChatGPT 账户统一连接。', icon: RectangleGroupIcon },
  ],
}

const sections = [
  {
    title: '官方入口',
    items: [
      { name: 'Codex 官方页', url: 'https://openai.com/codex/', desc: '官方介绍 + 桌面应用下载（macOS / Windows）；编辑器 / 终端 / 云端统一连 ChatGPT 账户' },
      { name: 'Codex（ChatGPT 内）', url: 'https://chatgpt.com/codex', desc: '在 ChatGPT 里调用 Codex 的云端入口' },
      { name: 'OpenAI Platform', url: 'https://platform.openai.com/', desc: 'API key / 用量 / 模型管理' },
      { name: 'OpenAI Status', url: 'https://status.openai.com/', desc: '服务状态实时查询' },
    ],
  },
  {
    title: '上手 & 工具',
    items: [
      { name: 'AI IP 环境检测', url: '/tools/ip', desc: '登录 Codex 桌面端 / 调用 OpenAI API 前先检测当前出口环境' },
      { name: 'Codex CLI（进阶）', url: 'https://github.com/openai/codex', desc: '官方命令行版 Codex，适合终端 / CI / 自动化场景' },
      { name: 'Codex Auth JSON 生成器', url: '/tools/codex-auth', desc: '用 CLI 时把 ChatGPT session 转 auth.json，绕过命令行登录的海外手机验证' },
      { name: 'OpenAI Cookbook', url: 'https://github.com/openai/openai-cookbook', desc: '官方示例代码集' },
    ],
  },
  {
    title: '实用教程（站内）',
    items: [
      { name: 'Codex vs Claude Code 怎么选', url: '/blog/chatgpt-codex-vs-claude-code', desc: '两个 AI 智能体（agent）的定位、订阅门槛与使用方式对比' },
      { name: 'ChatGPT Plus / Pro 5x / 20x 怎么选', url: '/blog/chatgpt-plus-vs-pro-comparison', desc: 'Codex 需要 Pro，按用量挑档位' },
      { name: '国内充值 ChatGPT 全方法', url: '/blog/chatgpt-plus-china-payment-guide', desc: '订阅 Pro 解锁 Codex 的 4 种付款路径' },
      { name: 'ChatGPT 账号封号原因 + 降低风控', url: '/blog/chatgpt-anti-ban-guide', desc: '住宅 IP / 使用习惯 / 自查清单' },
    ],
  },
]

const modelTable = {
  title: '各 ChatGPT 套餐的 Codex 用量',
  columns: ['套餐', 'Codex 用量', '适用'],
  rows: [
    { cells: ['Plus', '含 Codex · 更高用量', '日常用 Codex 跑任务 / 中度编程'] },
    { cells: ['Pro 5x', '含 Codex · 5 倍配额', '每天重度用 Codex 智能体 / 研究'] },
    { cells: ['Pro 20x', '含 Codex · 20 倍 · 最大任务量', 'Codex / Agent 重度自动化'] },
    { cells: ['Business / Enterprise', 'Codex 扩展版 / 即用即付', '团队协作开发'] },
  ],
}

const faq = [
  {
    q: 'Codex 怎么开通，需要单独付费吗？',
    a: 'Codex 已并入 ChatGPT 各付费套餐，不单独收费，用量随档位递增：Plus 起就含 Codex（更高用量），Pro 给到 5 倍 / 20 倍配额与最大任务量，Business / Enterprise 为团队扩展版。订阅后用 ChatGPT 账户登录 Codex 官方桌面应用（macOS / Windows）或编辑器 / 终端 / chatgpt.com/codex 即可，让它像智能体一样自己规划并执行任务。',
  },
  {
    q: 'Codex 和 Claude Code 有什么区别，该用哪个？',
    a: 'Codex 走 ChatGPT Pro 订阅、Claude Code 走 Claude Pro / Max 订阅。两者现在都已从“写代码工具”进化成能规划并自己执行任务的 AI 智能体（agent），主要通过各自的官方桌面客户端使用，也都提供命令行版本。都按订阅额度用、不额外按 token 付费。重度用户常两个都备，细节看《Codex vs Claude Code》。',
  },
  {
    q: '用 Codex CLI 登录卡在海外手机号验证怎么办？',
    a: '桌面客户端用 ChatGPT 账号直接登录，一般不会卡这一步；如果你用命令行版 Codex CLI 卡在手机验证，可以用站内的「Codex Auth JSON 生成器」：在已登录 ChatGPT 的浏览器里取 session，本地生成 auth.json 放到 ~/.codex/auth.json。工具在浏览器本地运行，不上传你的凭据。',
  },
  {
    q: 'Codex 在中国能直接用吗？',
    a: '不能直连。需要稳定的海外住宅 IP，机房 IP 容易触发风控。登录桌面端、订阅或调用前建议先用「AI IP 环境检测」确认当前出口是否干净。',
  },
]

const ctaCards = [
  { url: '/products/chatgpt-pro-5x', fallbackName: 'ChatGPT Pro 5x', fallbackDesc: '解锁 Codex，适合每天用 Codex 编程的高频工作流。' },
  { url: '/products/chatgpt-pro-20x', fallbackName: 'ChatGPT Pro 20x', fallbackDesc: '超高额度，适合 Codex / Agent 重度自动化场景。' },
]

const related = {
  title: '相关教程',
  items: [
    { to: '/blog/chatgpt-codex-vs-claude-code', text: 'Codex vs Claude Code 怎么选' },
    { to: '/tools/codex-auth', text: 'Codex Auth JSON 生成器' },
    { to: '/tools/ip', text: 'AI IP 环境检测' },
    { to: '/blog/chatgpt-plus-vs-pro-comparison', text: 'ChatGPT Plus vs Pro 对比' },
    { to: '/blog/chatgpt-plus-china-payment-guide', text: '国内付款订阅 ChatGPT Pro 全方法' },
    { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
  ],
}

const pageTitle = 'Codex 资源中心 · OpenAI Codex 智能体 · 桌面客户端 · ChatGPT Pro 订阅直充 - 52HUB'
const pageDesc = '52HUB Codex 资源中心：OpenAI Codex 智能体（官方桌面客户端 / ChatGPT 内）入口、ChatGPT Pro 5x / 20x 订阅门槛与 Codex 可用性、登录环境与上手要点、Codex vs Claude Code 选型、订阅直充入口；进阶用户的 Codex CLI 与 Auth JSON 本地工具。'

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDesc },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDesc },
    { property: 'og:url', content: 'https://52hub.org/codex-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/codex-hub' },
  ],
})
</script>
