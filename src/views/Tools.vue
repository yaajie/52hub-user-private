<template>
  <div class="tools-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">

      <!-- ============================================================
        Hero · 聚焦入口 + 低亮度技术视觉
      ============================================================ -->
      <header class="mb-10 sm:mb-12">
        <div class="tools-hero grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.88fr)]">
          <div class="tools-hero-copy theme-panel border theme-border rounded-2xl p-5 sm:p-7">
            <div class="inline-flex items-center gap-2 rounded-full theme-surface-soft border theme-border px-3 py-1">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ui-success)] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[var(--ui-success)]"></span>
              </span>
              <span class="text-xs font-mono theme-text-muted">tools.aikaitong · live</span>
            </div>
            <h1 class="mt-5 text-3xl sm:text-4xl md:text-5xl font-black theme-text-primary leading-tight">
              AI 工具集合
            </h1>
            <p class="mt-4 max-w-2xl text-sm sm:text-base theme-text-secondary leading-relaxed">
              先检测 ChatGPT、Claude Code、Gemini、Codex 的当前 IP 环境，再处理 Codex 登录辅助、服务状态与 DNS 隐私检测。
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              <span class="tools-stat-chip">
                <span class="font-mono theme-text-primary">{{ totalTools }}</span> 个工具
              </span>
              <span class="tools-stat-chip">
                <span class="font-mono theme-text-primary">{{ categories.length }}</span> 大分类
              </span>
              <span class="tools-stat-chip">站长精选</span>
            </div>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <router-link
                to="/tools/ip"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--ui-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--ui-accent-hover)]"
              >
                AI IP 环境检测
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
              <router-link
                to="/tools/codex-auth"
                class="inline-flex items-center justify-center rounded-lg theme-surface-soft border theme-border px-4 py-2.5 text-sm font-semibold theme-text-primary transition hover:theme-surface-strong"
              >
                解决 Codex 登录验证
              </router-link>
            </div>
          </div>

          <div class="tools-hero-owned hidden sm:flex">
            <OwnedToolsPanel />
          </div>
        </div>

        <div class="diagnostic-strip mt-5 theme-panel border theme-border rounded-2xl p-4 sm:p-5">
          <div class="grid gap-4">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-[0.68rem] uppercase theme-text-muted">network signal</span>
                <span class="inline-flex items-center gap-1.5 rounded-full theme-surface-soft border theme-border px-2.5 py-1 text-[11px] font-mono theme-text-muted">
                  <span class="h-1.5 w-1.5 rounded-full bg-[var(--ui-success)]"></span>
                  live
                </span>
              </div>

              <div v-if="ipLoading" class="mt-3 grid gap-2 sm:grid-cols-3">
                <div class="h-10 rounded-lg theme-skeleton"></div>
                <div class="h-10 rounded-lg theme-skeleton"></div>
                <div class="h-10 rounded-lg theme-skeleton"></div>
              </div>

              <div v-else-if="ipInfo" class="mt-3 grid gap-2 sm:grid-cols-3">
                <div class="diagnostic-pill">
                  <span>当前 IP</span>
                  <strong>{{ ipInfo.ip }}</strong>
                </div>
                <div class="diagnostic-pill">
                  <span>位置 / 运营商</span>
                  <strong class="truncate" :title="`${ipInfo.location} · ${ipInfo.org || '未知'}`">{{ ipInfo.location }}</strong>
                </div>
                <div class="diagnostic-pill">
                  <span>AI 注册风险</span>
                  <strong :class="ipInfo.isDatacenter ? 'text-amber-400' : 'text-[var(--ui-success)]'">
                    {{ ipInfo.isDatacenter ? '机房 IP，谨慎使用' : '普通出口，风险较低' }}
                  </strong>
                </div>
              </div>

              <div v-else class="mt-3 rounded-lg border theme-border theme-surface-soft px-3 py-2 text-sm theme-text-secondary">
                IP 自动查询失败，可使用下方 ping0.cc / IPInfo 手动检测。
              </div>
            </div>

            <div class="browser-chip-grid hidden gap-2 sm:grid sm:grid-cols-4">
              <span class="browser-chip">
                <small>浏览器</small>
                <strong>{{ browserInfo?.browser || '检测中' }}</strong>
              </span>
              <span class="browser-chip">
                <small>系统</small>
                <strong>{{ browserInfo?.os || '检测中' }}</strong>
              </span>
              <span class="browser-chip">
                <small>语言</small>
                <strong>{{ browserInfo?.language || '检测中' }}</strong>
              </span>
              <span class="browser-chip">
                <small>时间</small>
                <strong>{{ liveClock || '—' }}</strong>
              </span>
            </div>
          </div>

          <details class="diagnostic-details mt-4 hidden sm:block">
            <summary class="cursor-pointer select-none font-mono text-xs theme-text-accent">查看完整本地诊断</summary>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <div class="diagnostic-detail-card">
                <h2 class="text-xs font-mono font-semibold theme-text-primary">IP 详情</h2>
                <dl class="mt-3 space-y-2 text-xs">
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">IP</dt>
                    <dd class="font-mono theme-text-primary">{{ ipInfo?.ip || '—' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">位置</dt>
                    <dd class="text-right theme-text-primary">{{ ipInfo?.location || '—' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">运营商</dt>
                    <dd class="text-right theme-text-primary">{{ ipInfo?.org || '—' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">来源</dt>
                    <dd class="theme-text-primary">ipapi.co · 本页不存储</dd>
                  </div>
                </dl>
              </div>
              <div class="diagnostic-detail-card">
                <h2 class="text-xs font-mono font-semibold theme-text-primary">浏览器详情</h2>
                <dl class="mt-3 space-y-2 text-xs">
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">屏幕</dt>
                    <dd class="font-mono theme-text-primary">{{ browserInfo?.screen || '—' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">网络</dt>
                    <dd class="text-right theme-text-primary">{{ browserInfo?.connection || '—' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">设备</dt>
                    <dd class="font-mono theme-text-primary">{{ browserInfo?.platform || '—' }}</dd>
                  </div>
                  <div class="flex justify-between gap-4">
                    <dt class="theme-text-muted">读取方式</dt>
                    <dd class="theme-text-primary">navigator API · 不上传</dd>
                  </div>
                </dl>
              </div>
            </div>
          </details>
        </div>
      </header>

      <!-- ============================================================
        分类工具区 · 每个分类一个 section，accent color 区分
      ============================================================ -->
      <section
        v-for="(category, idx) in categories"
        :key="category.name"
        :id="`tool-section-${idx}`"
        class="mb-12 scroll-mt-28"
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
            <span class="block mt-2 theme-text-primary">› 发现好用的工具？欢迎通过企微在线客服推荐补充。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import OwnedToolsPanel from '../components/OwnedToolsPanel.vue'

const localTools = [
  { name: 'AI IP 环境检测', url: '/tools/ip', desc: '按 ChatGPT / Claude / Codex 等 AI 使用场景判断 IP，不把机房 IP 一刀切判死。' },
  { name: 'Codex Auth JSON 生成器', url: '/tools/codex-auth', desc: '解决登录 Codex 时卡在海外手机号码验证的问题；浏览器本地生成，不上传、不保存。' },
]

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
    description: '判断当前网络出口的类型、信誉、地理位置——影响 ChatGPT / Claude 注册和使用。结果仅供参考，单一工具都有盲区，建议多工具交叉验证；尤其 ipjiance 能识别 ping0 常漏判的「机场 / 共享住宅」IP（看着是住宅、实际登录 AI 易被关联封号）。',
    accent: 'bg-amber-500',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    items: [
      { name: 'AI IP 环境检测', url: '/tools/ip', desc: '站内工具：按 AI 日常登录 / 开发 API / 新号注册分场景判断 IP' },
      { name: 'ipjiance.net', url: 'https://ipjiance.net/', desc: '首选。能识别「机场 / 多人共用」住宅 IP——90% AI 小白最容易踩的坑（看着是住宅、一登录就被封），ping0 测不出' },
      { name: 'ping0.cc', url: 'https://ping0.cc/', desc: 'IP 类型 + 风险值，最知名；但漏判「机场 / 共享住宅」，别只信它显示的"纯净"' },
      { name: 'IPInfo', url: 'https://ipinfo.io/', desc: 'IP 归属地 / ISP / ASN 详情' },
      { name: 'Scamalytics', url: 'https://scamalytics.com/', desc: 'IP 欺诈值评分（低于 30 算干净）' },
      { name: 'BrowserLeaks IP', url: 'https://browserleaks.com/ip', desc: 'IP + WebRTC + 浏览器指纹综合检测' },
    ],
  },
  {
    name: '服务状态',
    description: '当 AI 服务用不了时，先查这里——是平台挂了还是你网络问题',
    accent: 'bg-orange-500',
    iconBg: 'bg-orange-500/10',
    iconText: 'text-orange-400',
    items: [
      { name: 'Anthropic Status', url: 'https://status.anthropic.com/', desc: 'Claude / Claude Code / API 状态' },
      { name: 'OpenAI Status', url: 'https://status.openai.com/', desc: 'ChatGPT / API / Sora 状态' },
      { name: 'Google Cloud Status', url: 'https://status.cloud.google.com/', desc: 'Gemini / Google API 状态' },
      { name: 'Apple System Status', url: 'https://www.apple.com/support/systemstatus/', desc: 'iCloud / App Store / Apple ID 状态' },
      { name: 'Cloudflare Status', url: 'https://www.cloudflarestatus.com/', desc: 'CDN / DNS / Turnstile 状态（很多 AI 站走 CF）' },
      { name: 'Down For Everyone', url: 'https://downforeveryoneorjustme.com/', desc: '通用网站可达性检测' },
    ],
  },
  {
    name: 'DNS / 隐私检测',
    description: '代理是否真的安全？DNS 有没有泄露？这里能查清楚',
    accent: 'bg-amber-600',
    iconBg: 'bg-amber-600/10',
    iconText: 'text-amber-500',
    items: [
      { name: 'DNS Leak Test', url: 'https://dnsleaktest.com/', desc: 'DNS 泄露检测' },
      { name: 'BrowserLeaks WebRTC', url: 'https://browserleaks.com/webrtc', desc: 'WebRTC 泄露真实 IP 检测' },
      { name: 'Whoer.net', url: 'https://whoer.net/', desc: '综合匿名性评分' },
      { name: 'IPLeak', url: 'https://ipleak.net/', desc: '泄露综合检测（含 IPv6 / Flash）' },
      { name: 'AmIUnique', url: 'https://amiunique.org/', desc: '浏览器指纹独特度（你有多容易被识别）' },
      { name: 'CoverYourTracks', url: 'https://coveryourtracks.eff.org/', desc: 'EFF 出品 · 综合反追踪能力评估' },
    ],
  },
  {
    name: '域名 / 备案查询',
    description: '查一个网站可信不可信，备案信息和注册时间最直观',
    accent: 'bg-amber-400',
    iconBg: 'bg-amber-400/10',
    iconText: 'text-amber-300',
    items: [
      { name: 'Whois 查询', url: 'https://whois.chinaz.com/', desc: '域名注册信息、到期时间' },
      { name: 'ICP 备案查询', url: 'https://icp.chinaz.com/', desc: '国内 ICP 备案信息（境外域名查不到正常）' },
      { name: 'BuiltWith', url: 'https://builtwith.com/', desc: '查网站用什么技术栈' },
      { name: 'DNSChecker', url: 'https://dnschecker.org/', desc: '全球 30+ 节点 DNS 解析传播检测' },
      { name: 'VirusTotal', url: 'https://www.virustotal.com/gui/home/url', desc: '70+ 引擎扫描 URL / 域名安全' },
      { name: 'BGP.he.net', url: 'https://bgp.he.net/', desc: 'Hurricane Electric · ASN / 路由 / IPv6 查询' },
    ],
  },
]

const totalTools = computed(() => localTools.length + categories.reduce((sum, c) => sum + c.items.length, 0))

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

// ============================================================
// 浏览器信息（navigator API · 本地读取不上传）
// ============================================================

interface BrowserInfo {
  browser: string
  os: string
  screen: string
  language: string
  connection: string
  platform: string  // 标题栏右上角 chip
}

const browserInfo = ref<BrowserInfo | null>(null)

function parseBrowser(ua: string): string {
  // 顺序敏感：Edge / Opera 必须在 Chrome 之前匹配
  if (/Edg\/(\d+)/i.test(ua)) {
    const m = ua.match(/Edg\/(\d+)/i)
    return `Edge ${m?.[1] || ''}`.trim()
  }
  if (/OPR\/(\d+)|Opera\/(\d+)/i.test(ua)) {
    const m = ua.match(/OPR\/(\d+)|Opera\/(\d+)/i)
    return `Opera ${m?.[1] || m?.[2] || ''}`.trim()
  }
  if (/Firefox\/(\d+)/i.test(ua)) {
    const m = ua.match(/Firefox\/(\d+)/i)
    return `Firefox ${m?.[1] || ''}`.trim()
  }
  if (/Chrome\/(\d+)/i.test(ua) && !/Edg\//i.test(ua)) {
    const m = ua.match(/Chrome\/(\d+)/i)
    return `Chrome ${m?.[1] || ''}`.trim()
  }
  if (/Version\/(\d+).*Safari/i.test(ua)) {
    const m = ua.match(/Version\/(\d+)/i)
    return `Safari ${m?.[1] || ''}`.trim()
  }
  return '未知浏览器'
}

function parseOS(ua: string, platform: string): string {
  if (/iPhone|iPad|iPod/i.test(ua)) {
    const m = ua.match(/OS (\d+[_\d]*)/i)
    return `iOS ${m?.[1]?.replace(/_/g, '.') || ''}`.trim()
  }
  if (/Android (\d+(?:\.\d+)?)/i.test(ua)) {
    const m = ua.match(/Android (\d+(?:\.\d+)?)/i)
    return `Android ${m?.[1] || ''}`.trim()
  }
  if (/Windows NT (\d+\.\d+)/i.test(ua)) {
    const m = ua.match(/Windows NT (\d+\.\d+)/i)
    const ver = m?.[1] || ''
    const map: Record<string, string> = { '10.0': '10/11', '6.3': '8.1', '6.2': '8', '6.1': '7' }
    return `Windows ${map[ver] || ver}`
  }
  if (/Mac OS X (\d+[_\.\d]*)/i.test(ua)) {
    const m = ua.match(/Mac OS X (\d+[_\.\d]*)/i)
    return `macOS ${m?.[1]?.replace(/_/g, '.') || ''}`.trim()
  }
  if (/Linux/i.test(ua)) return 'Linux'
  return platform || '未知系统'
}

function platformLabel(ua: string): string {
  if (/iPhone|iPad|iPod|Android|Mobile/i.test(ua)) return 'mobile'
  if (/Tablet/i.test(ua)) return 'tablet'
  return 'desktop'
}

function languageLabel(): string {
  const lang = (navigator.language || 'unknown').toLowerCase()
  const map: Record<string, string> = {
    'zh-cn': '简体中文 (zh-CN)',
    'zh-tw': '繁体中文 (zh-TW)',
    'zh-hk': '繁体中文 (zh-HK)',
    'zh': '中文 (zh)',
    'en-us': '英文 (en-US)',
    'en-gb': '英文 (en-GB)',
    'en': '英文 (en)',
    'ja': '日文 (ja)',
    'ko': '韩文 (ko)',
  }
  return map[lang] || (navigator.language || 'unknown')
}

function connectionLabel(): string {
  const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  if (!conn) return '未知（浏览器未提供）'
  const type = conn.effectiveType || conn.type || '—'
  const map: Record<string, string> = {
    'slow-2g': '极慢 (slow-2g)',
    '2g': '2G',
    '3g': '3G',
    '4g': '4G / WiFi',
    'wifi': 'WiFi',
    'ethernet': '有线',
    'cellular': '蜂窝网络',
  }
  const label = map[type] || type
  const down = typeof conn.downlink === 'number' ? ` · ${conn.downlink} Mbps` : ''
  return `${label}${down}`
}

function detectBrowserInfo(): BrowserInfo {
  const ua = navigator.userAgent || ''
  const platform = (navigator as any).userAgentData?.platform || navigator.platform || ''
  return {
    browser: parseBrowser(ua),
    os: parseOS(ua, platform),
    screen: typeof window !== 'undefined' && window.screen
      ? `${window.screen.width} × ${window.screen.height} · ${window.devicePixelRatio || 1}x`
      : '未知',
    language: languageLabel(),
    connection: connectionLabel(),
    platform: platformLabel(ua),
  }
}

onMounted(() => {
  tickClock()
  clockTimer = setInterval(tickClock, 1000)
  loadIpInfo()
  // 浏览器信息：本地读取，无 IO，同步赋值即可
  try {
    browserInfo.value = detectBrowserInfo()
  } catch {
    // 不上报错误：失败保持 skeleton，影响仅一张卡
  }
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
})

useHead({
  title: '实用工具集合 · Codex Auth / IP 检测 / 服务状态 / DNS - AI开通',
  meta: [
    {
      name: 'description',
      content: 'AI开通 整理的 AI 工具相关常用资源：解决 Codex 登录时卡在海外手机号码验证的问题，减少找接码、等验证码的麻烦；同时提供 IP 类型与风险检测、Claude/ChatGPT 服务状态、DNS 泄露检测、域名查询。',
    },
    { property: 'og:title', content: '实用工具集合 · Codex Auth / IP 检测 / 服务状态 / DNS - AI开通' },
    { property: 'og:description', content: 'AI开通 整理的 AI 工具入口：解决 Codex 登录时卡在海外手机号码验证的问题，减少找接码、等验证码的麻烦，同时提供 IP 检测、服务状态与 DNS 泄露检测。' },
    { property: 'og:url', content: 'https://aikaitong.com/tools' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://aikaitong.com/tools' },
  ],
})
</script>

<style scoped>
.tools-hero-copy {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--ui-accent) 13%, transparent), transparent 34%),
    linear-gradient(135deg, color-mix(in srgb, var(--ui-accent) 8%, transparent), transparent 48%);
}

.tools-hero-copy::after {
  content: '';
  position: absolute;
  inset: auto -10% -45%;
  height: 70%;
  pointer-events: none;
  background: radial-gradient(circle, color-mix(in srgb, var(--ui-accent) 12%, transparent), transparent 64%);
}

.tools-stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 2rem;
  border: 1px solid var(--ui-border);
  border-radius: 999px;
  padding: 0.42rem 0.75rem;
  color: var(--ui-text-secondary);
  background: color-mix(in srgb, var(--ui-bg-soft) 70%, transparent);
  font-size: 0.78rem;
}

.tools-hero-owned {
  align-items: stretch;
  justify-content: flex-end;
  min-height: 100%;
}

.diagnostic-strip {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--ui-accent) 6%, transparent), transparent 46%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
}

.diagnostic-strip::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--ui-accent), var(--ui-accent-hover));
}

.diagnostic-pill,
.browser-chip,
.diagnostic-detail-card {
  border: 1px solid var(--ui-border);
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--ui-bg-soft) 64%, transparent);
}

.diagnostic-pill {
  min-width: 0;
  padding: 0.7rem 0.8rem;
}

.diagnostic-pill span,
.browser-chip small {
  display: block;
  color: var(--ui-text-muted);
  font-size: 0.68rem;
}

.diagnostic-pill strong,
.browser-chip strong {
  display: block;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-text-primary);
  font-size: 0.82rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.browser-chip {
  min-width: 0;
  padding: 0.62rem 0.7rem;
}

.browser-chip strong {
  font-size: 0.74rem;
}

.diagnostic-detail-card {
  padding: 0.95rem;
}

.diagnostic-details summary::-webkit-details-marker {
  display: none;
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
  background: linear-gradient(180deg, color-mix(in srgb, var(--ui-accent) 80%, transparent), color-mix(in srgb, var(--ui-accent-hover) 40%, transparent));
}
</style>
