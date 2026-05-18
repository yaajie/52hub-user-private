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

          <!-- 右：服务状态展示卡（mock data，链到真实 status 页） -->
          <div class="status-card theme-panel border theme-border rounded-2xl overflow-hidden">
            <div class="status-titlebar flex items-center justify-between px-5 py-3 border-b theme-border">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 class="text-xs font-mono font-semibold theme-text-primary tracking-wider">SERVICE STATUS</h2>
              </div>
              <span class="text-xs font-mono theme-text-muted">{{ statusTimestamp }}</span>
            </div>
            <ul class="divide-y theme-border">
              <li v-for="svc in serviceStatuses" :key="svc.name" class="flex items-center justify-between px-5 py-3">
                <a :href="svc.statusUrl" target="_blank" rel="noopener noreferrer"
                  class="flex items-center gap-3 text-sm theme-text-primary hover:theme-text-accent transition-colors">
                  <span :class="['w-1.5 h-7 rounded-full', svc.accent]"></span>
                  <span class="font-medium">{{ svc.name }}</span>
                </a>
                <span class="flex items-center gap-2 text-xs font-mono">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span class="theme-text-muted">operational</span>
                </span>
              </li>
            </ul>
            <div class="px-5 py-3 text-[11px] font-mono theme-text-muted border-t theme-border bg-black/5 dark:bg-white/[0.02]">
              <span class="theme-text-accent">›</span> 状态指示为展示性视觉，实时状态请点击各服务名跳转官方页面
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
import { computed } from 'vue'
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

// 顶部服务状态展示卡（mock 数据，链到真实 status 页面）
const serviceStatuses = [
  { name: 'Claude · API',     statusUrl: 'https://status.anthropic.com/',         accent: 'bg-orange-500' },
  { name: 'ChatGPT · API',    statusUrl: 'https://status.openai.com/',            accent: 'bg-emerald-500' },
  { name: 'Gemini · API',     statusUrl: 'https://status.cloud.google.com/',      accent: 'bg-sky-500' },
  { name: 'Apple ID · iCloud',statusUrl: 'https://www.apple.com/support/systemstatus/', accent: 'bg-zinc-500' },
]

const totalTools = computed(() => categories.reduce((sum, c) => sum + c.items.length, 0))

const statusTimestamp = computed(() => {
  const now = new Date()
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  return `${hh}:${mm} sample`
})

const getHost = (url: string) => {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

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
