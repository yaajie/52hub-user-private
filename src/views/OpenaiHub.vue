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
    og-image="/og/openai-hub.png"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import {
  CpuChipIcon, SparklesIcon, MagnifyingGlassIcon, PhotoIcon, FilmIcon, Squares2X2Icon,
} from '@heroicons/vue/24/outline'
import HubLayout from '../components/hub/HubLayout.vue'
import openaiLogo from '../assets/ai-products/openai.svg'

const accent = '#10A37F' // OpenAI 绿

const hero = {
  title: 'OpenAI / ChatGPT 资源中心',
  subtitle: 'OpenAI 官方入口、ChatGPT 订阅档位与国内付款、DALL-E 图像 / API 产品导航（Sora 已停服，视频改用替代方案）。Codex 专题单独见 Codex 资源中心。',
  logo: openaiLogo,
  ctaPrimary: { label: '看国内付款方法', to: '/blog/chatgpt-plus-china-payment-guide' },
  ctaSecondary: { label: '立即下单 ChatGPT Plus', to: '/products/chatgpt-plus' },
}

const showcase = {
  title: '看 ChatGPT 跑一次深度研究',
  desc: '你给一个研究问题，ChatGPT 会自己联网搜索、读多个来源、交叉核对，再输出带引用的报告。下面是它处理一个真实问题的过程示意。',
  points: [
    'GPT-5 旗舰推理 + 联网搜索 + 多模态（图 / 语音 / 视频）',
    'Plus / Pro 订阅含，按档位享更高用量与更强模型',
    '桌面 / iOS / 安卓 / 网页，跨端同步对话与记忆',
  ],
  mockup: {
    title: 'chatgpt · deep research',
    prompt: '对比三款 2 千价位扫地机器人，给带来源的选购建议',
    steps: [
      { text: '联网检索 20+ 来源' },
      { text: '提取规格 / 价格 / 真实评测', meta: '3 款' },
      { text: '交叉核对参数与口碑' },
      { text: '输出对比表 + 选购建议', done: true },
    ],
  },
}

const features = {
  title: 'ChatGPT 能做什么',
  desc: 'ChatGPT 是 OpenAI 的旗舰 AI 助手——对话、写作、编程、看图、联网研究、生成图像与视频，一个入口覆盖日常到专业场景。',
  items: [
    { title: 'GPT-5 旗舰推理', desc: '当前一代旗舰对话与推理模型，日常问答、写作、编程一把抓；o 系列推理模型处理数学与长链条思考。', icon: CpuChipIcon },
    { title: '原生多模态', desc: '看图说话、语音对话、读文档、分析截图，文字 / 图像 / 语音 / 视频在一个对话里自由切换。', icon: SparklesIcon },
    { title: '深度研究 / Agent', desc: '给一个研究问题，自己联网搜索、读多源、交叉核对，输出带引用的结构化报告；Agent 模式可代你完成多步任务。', icon: MagnifyingGlassIcon },
    { title: 'DALL·E 图像生成', desc: '在 ChatGPT 里用自然语言生成与编辑图片，Plus 及以上集成可用，做配图 / 海报 / 概念图。', icon: PhotoIcon },
    { title: 'AI 视频（Sora 已停服）', desc: 'OpenAI Sora 已于 2026 年全线停服（App 与 API 下线），ChatGPT 订阅不含视频生成；文生 / 图生视频改用 Veo、可灵、海螺、Runway 等，详见博客对比。', icon: FilmIcon },
    { title: '跨端 + 自定义 GPTs', desc: '桌面 / iOS / 安卓 / 网页对话与记忆同步；可自建或调用 GPTs，把常用流程固化成专属助手。', icon: Squares2X2Icon },
  ],
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
      { name: 'Codex 资源中心', url: '/codex-hub', desc: '站内专题：订阅门槛 / Codex CLI / 登录解法（已独立成页）' },
      { name: 'DALL-E', url: 'https://openai.com/dall-e-3', desc: '图像生成模型' },
      { name: 'AI 视频替代方案', url: '/blog/sora-veo-hailuo-video-subscription', desc: 'Sora 已停服，看 Veo / 可灵 / 海螺 等替代对比' },
    ],
  },
  {
    title: '客户端 & 工具',
    items: [
      { name: 'AI IP 环境检测', url: '/tools/ip', desc: '登录、订阅或调用前先检测当前出口是否适合 ChatGPT' },
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
  title: '模型与产品对比',
  columns: ['模型 / 产品', '定位', '怎么用'],
  rows: [
    { cells: ['GPT-5', '当前旗舰对话推理', '日常对话 / 编程 / 写作首选'] },
    { cells: ['GPT-4o', '多模态（图 / 语音 / 视频）', '看图说话 / 语音对话 / 图像分析'] },
    { cells: ['o3', '推理模型（思维链）', '复杂数学 / 编程 / 长链条思考'] },
    { cells: ['Codex', 'AI 智能体 / 任务执行', 'ChatGPT Pro 自带，详见 Codex 资源中心'] },
    { cells: ['DALL-E 3', '图像生成', 'Plus+ 集成在 ChatGPT 内'] },
    { cells: ['视频生成', 'Sora 已停服', '2026 年已下线，改用 Veo / 可灵 / 海螺 等'] },
  ],
}

const faq = [
  {
    q: 'ChatGPT Plus 国内能直接订阅吗？',
    a: '直接订阅不行，需要海外信用卡或海外 Apple ID + 海外礼品卡。国内有 4 种主流付款路径（虚拟卡 / 海外亲友卡 / Apple Gift Card / 充值代付），细节看《国内付款订阅 ChatGPT Plus 全方法》。',
  },
  {
    q: 'Plus / Pro 5x / Pro 20x 怎么选？',
    a: 'Plus（$20/月）日常聊天写作够用；Pro 5x（$100/月）适合每天高频用 Codex / 写长文 / 跑分析；Pro 20x（$200/月）面向重度自动化 / Agent 玩家。普通用户先 Plus，撞限额了再升级，不要一开始就买高档位。',
  },
  {
    q: 'ChatGPT 账号会被封吗？怎么降低风险？',
    a: '会。常见封号原因：机房 IP / 公共代理 / 多人共享账号 / 异常使用频率。降低风险要点：稳定住宅 IP、避免短时间高频请求、不用脚本批量调用、注册信息和实际 IP 国家保持一致。',
  },
  {
    q: 'ChatGPT 和 OpenAI API 是一回事吗，订阅 Plus 包含 API 用量吗？',
    a: '不是。ChatGPT 是消费者产品按月订阅；API 是开发者产品按 token 计费，账单完全分开。订阅了 Plus 也不会送 API 额度。开发应用需要单独去 platform.openai.com 充值。',
  },
  {
    q: 'ChatGPT 订阅还能用 Sora 视频吗？',
    a: '不能了。OpenAI Sora 已于 2026 年停服（3 月官宣、4 月网页与 App 下线、9 月 API 停），ChatGPT 订阅不含视频生成。图像仍可用 DALL-E（Plus 以上，集成在 ChatGPT 里）；要做视频改用 Veo / 可灵 / 海螺 / Runway，对比见站内博客《Sora 停服后视频订阅怎么选》。',
  },
]

const ctaCards = [
  { url: '/products/chatgpt-plus', fallbackName: 'ChatGPT Plus', fallbackDesc: '日常稳定使用，适合多数用户。' },
  { url: '/products/chatgpt-pro-5x', fallbackName: 'ChatGPT Pro 5x', fallbackDesc: '更高额度，适合高频工作流。' },
  { url: '/products/chatgpt-pro-20x', fallbackName: 'ChatGPT Pro 20x', fallbackDesc: '超高用量，适合重度自动化与代理场景。' },
]

const related = {
  title: '相关阅读',
  desc: 'Codex 的订阅门槛、CLI 与登录解法单独整理在 Codex 资源中心；DALL-E 图像、视频替代方案等实战内容随博客逐步补充。',
  items: [
    { to: '/codex-hub', text: 'Codex 资源中心（订阅 / CLI / 登录解法）' },
    { to: '/claude-hub', text: 'Claude 资源中心' },
    { to: '/tools/ip', text: 'AI IP 环境检测' },
    { to: '/blog/chatgpt-plus-china-payment-guide', text: '国内付款订阅 ChatGPT Plus 全方法' },
    { to: '/blog/sora-veo-hailuo-video-subscription', text: 'Sora 停服后，视频订阅怎么选' },
    { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
    { to: '/blog', text: '全部 AI 工具教程' },
    { to: '/products', text: '订阅直充与账号商品' },
  ],
}

const pageTitle = 'OpenAI / ChatGPT 资源中心 · Plus / Pro 订阅开通 · 国内付款 · DALL-E / API - AI开通'
const pageDesc = 'AI开通 OpenAI / ChatGPT 资源中心：OpenAI 官方入口、ChatGPT Plus / Pro 订阅开通与档位对比、国内 4 种付款方法、降低封号风险攻略、DALL-E 图像与 AI 视频替代方案、Platform API 与定价，GPT-5 / 4o / o3 模型对比；Codex 专题见 Codex 资源中心。'

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDesc },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDesc },
    { property: 'og:url', content: 'https://aikaitong.com/openai-hub' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://aikaitong.com/openai-hub' },
  ],
})
</script>
