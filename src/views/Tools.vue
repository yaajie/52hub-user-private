<template>
  <div class="tools-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">

      <!-- ============================================================
        Hero · 监控面板风格（左标题 + 右服务状态展示卡）
      ============================================================ -->
      <header class="mb-14">
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <!-- 左：标题 + meta -->
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full theme-surface-soft border theme-border mb-5">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span class="text-xs font-mono theme-text-muted tracking-tight">tools.52hub · live</span>
            </div>
            <h1 class="text-3xl sm:text-5xl font-black tracking-tight theme-text-primary leading-tight">
              AI 工具集合
            </h1>
            <p class="mt-3 text-base theme-text-secondary leading-relaxed">
              站长精选 · <span class="font-mono theme-text-primary">{{ totalTools }}</span> 个工具 · <span class="font-mono theme-text-primary">{{ categories.length }}</span> 大分类
            </p>
            <p class="mt-4 text-sm theme-text-muted leading-relaxed max-w-md">
              IP 检测 · 服务状态 · DNS 泄露 · 域名查询 · 礼品卡 · 接码平台。<br />
              按用途分类整理，点击直达官方入口。
            </p>
          </div>

          <!-- 右：访客自己的 IP 实时信息卡（ipapi.co 拉数据） -->
          <div class="status-card theme-panel border theme-border rounded-2xl overflow-hidden">
            <div class="status-titlebar flex items-center justify-between px-5 py-3 border-b theme-border">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 class="text-xs font-mono font-semibold theme-text-primary tracking-wider">MY IP · WHOAMI</h2>
              </div>
              <span class="flex items-center gap-1.5 text-xs font-mono theme-text-muted">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                live
              </span>
            </div>
            <div class="px-5 py-4 font-mono text-sm">
              <!-- Loading state -->
              <div v-if="ipLoading" class="space-y-2.5">
                <div class="h-3.5 w-3/4 rounded theme-skeleton"></div>
                <div class="h-3 w-1/2 rounded theme-skeleton"></div>
                <div class="h-3 w-2/3 rounded theme-skeleton"></div>
                <div class="h-3 w-5/12 rounded theme-skeleton"></div>
              </div>
              <!-- IP info -->
              <div v-else-if="ipInfo" class="space-y-2">
                <div class="flex items-baseline gap-2">
                  <span class="text-indigo-400 select-none">$</span>
                  <span class="theme-text-muted">curl ifconfig.me</span>
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <span class="text-emerald-400 select-none">›</span>
                  <span class="text-base sm:text-lg font-semibold theme-text-primary tracking-wider">{{ ipInfo.ip }}</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded theme-surface-soft theme-text-muted border theme-border">{{ ipInfo.version || 'IPv4' }}</span>
                </div>

                <div class="flex items-baseline gap-2 pt-1">
                  <span class="text-indigo-400 select-none">$</span>
                  <span class="theme-text-muted">geo.lookup</span>
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <span class="text-emerald-400 select-none">›</span>
                  <span class="theme-text-primary">{{ ipInfo.location }}</span>
                </div>

                <div v-if="ipInfo.org" class="flex items-baseline gap-2 pt-1">
                  <span class="text-indigo-400 select-none">$</span>
                  <span class="theme-text-muted">isp.org</span>
                </div>
                <div v-if="ipInfo.org" class="flex items-center gap-2 pl-4">
                  <span class="text-emerald-400 select-none">›</span>
                  <span class="theme-text-primary truncate" :title="ipInfo.org">{{ ipInfo.org }}</span>
                </div>

                <div class="flex items-baseline gap-2 pt-1">
                  <span class="text-indigo-400 select-none">$</span>
                  <span class="theme-text-muted">ip.type</span>
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <span class="text-emerald-400 select-none">›</span>
                  <span :class="ipInfo.isDatacenter ? 'text-amber-400' : 'text-emerald-400'">
                    {{ ipInfo.isDatacenter ? 'datacenter ⚠' : 'residential ✓' }}
                  </span>
                  <span v-if="ipInfo.isDatacenter" class="text-[10px] theme-text-muted">机房 IP，注册 AI 服务可能被风控</span>
                </div>

                <div class="flex items-baseline gap-2 pt-1">
                  <span class="text-indigo-400 select-none">$</span>
                  <span class="theme-text-muted">date</span>
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <span class="text-emerald-400 select-none">›</span>
                  <span class="theme-text-primary">{{ liveClock }}</span>
                  <span class="terminal-cursor text-indigo-400">▍</span>
                </div>
              </div>
              <!-- Error fallback -->
              <div v-else class="space-y-2">
                <div class="flex items-baseline gap-2">
                  <span class="text-indigo-400 select-none">$</span>
                  <span class="theme-text-muted">curl ifconfig.me</span>
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <span class="text-rose-400 select-none">!</span>
                  <span class="theme-text-secondary text-xs">查询失败，请点击下方 ping0.cc 等工具手动查 IP</span>
                </div>
                <div class="flex items-center gap-2 pl-4 pt-2">
                  <span class="text-indigo-400 select-none">$</span>
                  <span class="theme-text-muted">date</span>
                </div>
                <div class="flex items-center gap-2 pl-4">
                  <span class="text-emerald-400 select-none">›</span>
                  <span class="theme-text-primary">{{ liveClock }}</span>
                  <span class="terminal-cursor text-indigo-400">▍</span>
                </div>
              </div>
            </div>
            <div class="px-5 py-2.5 text-[11px] font-mono theme-text-muted border-t theme-border bg-black/5 dark:bg-white/[0.02]">
              <span class="theme-text-accent">›</span> 数据来自 ipapi.co · 仅用于本页展示，本站不存储
            </div>
          </div>
        </div>
      </header>

      <!-- ============================================================
        分类工具区 · 每个分类一个 section，accent color 区分
      ============================================================ -->
      <section
        v-for="(category, idx) in categories"
        :key="category.name"
        class="mb-12"
      >
        <div class="flex items-center gap-3 mb-5">
          <span class="font-mono text-xs theme-text-muted">{{ String(idx + 1).padStart(2, '0') }}</span>
          <span :class="['w-1.5 h-7 rounded-full', category.accent]"></span>
          <div class="flex-1">
            <h2 class="text-xl sm:text-2xl font-bold theme-text-primary">{{ category.name }}</h2>
            <p class="mt-1 text-xs sm:text-sm theme-text-muted">{{ category.description }}</p>
          </div>
          <span class="hidden sm:inline-block font-mono text-xs theme-text-muted px-2 py-0.5 rounded theme-surface-soft border theme-border">
            {{ category.items.length }} {{ category.items.length === 1 ? 'tool' : 'tools' }}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <a
            v-for="item in category.items"
            :key="`${category.name}-${item.name}`"
            v-spotlight
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="tool-card group relative block theme-panel border theme-border rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:theme-surface-strong overflow-hidden"
          >
            <div class="flex items-start gap-3">
              <!-- 首字 favicon-style 图标 -->
              <span :class="['flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-bold', category.iconBg, category.iconText]">
                {{ item.name.replace(/[^A-Za-z0-9一-龥]/g, '').charAt(0).toUpperCase() }}
              </span>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold theme-text-primary group-hover:theme-text-accent transition-colors truncate">{{ item.name }}</h3>
                <p class="mt-0.5 text-[11px] font-mono theme-text-muted truncate">{{ getHost(item.url) }}</p>
              </div>
              <svg class="w-3.5 h-3.5 theme-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p class="mt-3 text-xs theme-text-secondary leading-relaxed line-clamp-2">{{ item.desc }}</p>
          </a>
        </div>
      </section>

      <!-- ============================================================
        底部 disclaimer · 代码块风格
      ============================================================ -->
      <div class="mt-12 theme-panel border theme-border rounded-xl p-4 sm:p-5 font-mono text-xs theme-text-muted leading-relaxed">
        <div class="flex items-start gap-3">
          <span class="theme-text-accent shrink-0">$</span>
          <div>
            <span class="theme-text-secondary">cat disclaimer.txt</span><br />
            <span class="block mt-2">本页仅整理公开网络检测工具入口，结果仅供网络诊断参考。</span>
            <span class="block">请遵守当地法律法规和各平台服务条款，本站不提供、不推广任何翻墙工具或非法跨境访问服务。</span>
            <span class="block mt-2 theme-text-primary">› 发现好用的工具？欢迎在 TG 客服 <a :href="telegramServiceUrl" target="_blank" rel="noopener noreferrer" class="theme-text-accent underline">@HUB52service</a> 推荐补充。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useAppStore } from '../stores/app'
import { CONTACTS } from '../constants/contact'

const appStore = useAppStore()
const telegramServiceUrl = computed(() => appStore.config?.contact?.telegram || CONTACTS.telegramService)

type ToolItem = {
  name: string
  url: string
  desc: string
}

type ToolCategory = {
  name: string
  description: string
  accent: string      // 左侧色条
  iconBg: string      // 首字图标背景
  iconText: string    // 首字图标文字色
  items: ToolItem[]
}

const categories: ToolCategory[] = [
  {
    name: 'IP 检测',
    description: '判断当前网络出口的类型、信誉、地理位置——影响 ChatGPT / Claude 注册和使用',
    accent: 'bg-indigo-500',
    iconBg: 'bg-indigo-500/10',
    iconText: 'text-indigo-400',
    items: [
      { name: 'ping0.cc', url: 'https://ping0.cc/', desc: 'IP 类型（住宅 / 机房）+ 风险值评分，最常用' },
      { name: 'IPInfo', url: 'https://ipinfo.io/', desc: 'IP 归属地 / ISP / ASN 详情' },
      { name: 'WhatIsMyIPAddress', url: 'https://whatismyipaddress.com/', desc: '基础 IP 信息 + 黑名单查询' },
      { name: 'Scamalytics', url: 'https://scamalytics.com/', desc: 'IP 欺诈值评分（低于 30 算干净）' },
      { name: 'BrowserLeaks IP', url: 'https://browserleaks.com/ip', desc: 'IP + WebRTC + 浏览器指纹综合检测' },
    ],
  },
  {
    name: '服务状态',
    description: '当 AI 服务用不了时，先查这里——是平台挂了还是你网络问题',
    accent: 'bg-emerald-500',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    items: [
      { name: 'Anthropic Status', url: 'https://status.anthropic.com/', desc: 'Claude / Claude Code / API 状态' },
      { name: 'OpenAI Status', url: 'https://status.openai.com/', desc: 'ChatGPT / API / Sora 状态' },
      { name: 'Google Cloud Status', url: 'https://status.cloud.google.com/', desc: 'Gemini / Google API 状态' },
      { name: 'Apple System Status', url: 'https://www.apple.com/support/systemstatus/', desc: 'iCloud / App Store / Apple ID 状态' },
      { name: 'Down For Everyone', url: 'https://downforeveryoneorjustme.com/', desc: '通用网站可达性检测' },
    ],
  },
  {
    name: 'DNS / 隐私检测',
    description: '代理是否真的安全？DNS 有没有泄露？这里能查清楚',
    accent: 'bg-purple-500',
    iconBg: 'bg-purple-500/10',
    iconText: 'text-purple-400',
    items: [
      { name: 'DNS Leak Test', url: 'https://dnsleaktest.com/', desc: 'DNS 泄露检测' },
      { name: 'BrowserLeaks WebRTC', url: 'https://browserleaks.com/webrtc', desc: 'WebRTC 泄露真实 IP 检测' },
      { name: 'Whoer.net', url: 'https://whoer.net/', desc: '综合匿名性评分' },
      { name: 'IPLeak', url: 'https://ipleak.net/', desc: '泄露综合检测（含 IPv6 / Flash）' },
    ],
  },
  {
    name: '域名 / 备案查询',
    description: '查一个网站可信不可信，备案信息和注册时间最直观',
    accent: 'bg-sky-500',
    iconBg: 'bg-sky-500/10',
    iconText: 'text-sky-400',
    items: [
      { name: 'Whois 查询', url: 'https://whois.chinaz.com/', desc: '域名注册信息、到期时间' },
      { name: 'ICP 备案查询', url: 'https://icp.chinaz.com/', desc: '国内 ICP 备案信息（境外域名查不到正常）' },
      { name: 'BuiltWith', url: 'https://builtwith.com/', desc: '查网站用什么技术栈' },
    ],
  },
  {
    name: '充值卡 / 礼品卡',
    description: 'Apple Gift Card / Visa Gift Card 等海外充值卡的常用入口',
    accent: 'bg-amber-500',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    items: [
      { name: 'Apple 礼品卡（美区）', url: 'https://www.apple.com/shop/buy-giftcard/giftcard', desc: '官方 Apple Gift Card 直购（需海外卡）' },
      { name: '土耳其 Apple Store', url: 'https://www.apple.com/tr/', desc: '土区 App Store 入口（充值便宜）' },
      { name: '尼日利亚 Apple Store', url: 'https://www.apple.com/ng/', desc: '尼区 App Store 入口（部分 AI 订阅在尼区有价格优势）' },
    ],
  },
  {
    name: '接码服务（仅供参考）',
    description: '海外手机号短信接收 · 用于注册各类账号',
    accent: 'bg-rose-500',
    iconBg: 'bg-rose-500/10',
    iconText: 'text-rose-400',
    items: [
      { name: 'HeroSMS', url: 'https://hero-sms.com/', desc: '主流接码平台之一，号源覆盖 180+ 国家' },
      { name: '5sim.net', url: 'https://5sim.net/zh/', desc: '主流接码平台，号源覆盖 130+ 国家，API 简洁文档全' },
    ],
  },
]

const totalTools = computed(() => categories.reduce((sum, c) => sum + c.items.length, 0))

const getHost = (url: string) => {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

// ============================================================
// 访客 IP 信息（ipapi.co 拉取，CSP connect-src 已加白名单）
// ============================================================

interface IpInfo {
  ip: string
  location: string
  org: string
  version: string
  isDatacenter: boolean
}

const ipLoading = ref(true)
const ipInfo = ref<IpInfo | null>(null)

// 简单关键词匹配判断 IP 类型；不追求精确，给用户一个直观提示
const DATACENTER_KEYWORDS = [
  'amazon', 'aws', 'google', 'gcp', 'microsoft', 'azure',
  'digital ocean', 'digitalocean', 'linode', 'vultr', 'oracle', 'hetzner',
  'ovh', 'choopa', 'leaseweb', 'datacamp', 'limestone', 'm247',
  'cogent', 'tencent', 'alibaba', 'aliyun', 'ucloud', 'qcloud',
  'baidu', 'huawei', 'bytedance', 'cloudflare', 'fastly', 'akamai',
  'contabo', 'kamatera', 'racknerd', 'datacenter', 'hosting', 'server',
]

function detectDatacenter(org: string): boolean {
  const lower = org.toLowerCase()
  return DATACENTER_KEYWORDS.some((kw) => lower.includes(kw))
}

async function loadIpInfo() {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 5000)
    const r = await fetch('https://ipapi.co/json/', { signal: ctrl.signal })
    clearTimeout(timer)
    if (!r.ok) throw new Error(`status ${r.status}`)
    const j = await r.json()
    if (j.error) throw new Error(j.reason || 'api error')
    const parts = [j.country_name, j.region, j.city].filter(Boolean)
    ipInfo.value = {
      ip: j.ip || '—',
      location: parts.length ? parts.join(' · ') : '—',
      org: j.org || '',
      version: j.version || 'IPv4',
      isDatacenter: detectDatacenter(j.org || ''),
    }
  } catch {
    ipInfo.value = null
  } finally {
    ipLoading.value = false
  }
}

// 实时时钟（每秒 tick）
const liveClock = ref('')
let clockTimer: ReturnType<typeof setInterval> | null = null

function tickClock() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  liveClock.value = `${date} ${time} ${tz}`
}

onMounted(() => {
  tickClock()
  clockTimer = setInterval(tickClock, 1000)
  loadIpInfo()
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
})

useHead({
  title: '实用工具集合 · IP 检测 / 服务状态 / DNS / 礼品卡 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB 整理的 AI 工具相关常用资源：IP 类型与风险检测、Claude/ChatGPT 服务状态、DNS 泄露检测、域名查询、礼品卡渠道、海外接码平台。',
    },
    { property: 'og:title', content: '实用工具集合 · IP 检测 / 服务状态 / DNS / 礼品卡 - 52HUB' },
    { property: 'og:description', content: '52HUB 整理的 AI 工具相关常用资源：IP 检测、服务状态、DNS 泄露、域名查询、礼品卡渠道、接码平台。' },
    { property: 'og:url', content: 'https://52hub.org/tools' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/tools' },
  ],
})
</script>

<style scoped>
.status-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.0) 100%);
}

.status-titlebar {
  background: rgba(255, 255, 255, 0.03);
}

.terminal-cursor {
  display: inline-block;
  animation: terminal-blink 1.1s steps(2, end) infinite;
}

@keyframes terminal-blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

.tool-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
  background: transparent;
  transition: background 0.3s ease;
}

.tool-card:hover::after {
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.4));
}
</style>
