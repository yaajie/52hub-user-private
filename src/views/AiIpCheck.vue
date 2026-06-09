<template>
  <div class="ai-ip-check-page theme-page min-h-screen pt-24 pb-16">
    <div class="mx-auto w-full max-w-6xl px-4">
      <!-- Hero / 产品化检测控制台 -->
      <header class="hero-shell mb-6 overflow-hidden rounded-[1.75rem] border theme-border">
        <div class="hero-inner product-hero-grid">
          <div class="hero-copy">
            <div class="hero-badge">
              <span class="hero-dot"></span>
              <span class="font-mono text-xs tracking-wider">52HUB · AI IP CHECK</span>
            </div>
            <h1 class="mt-5 max-w-3xl text-3xl font-black leading-tight theme-text-primary sm:text-5xl">
              AI IP 环境检测
            </h1>
            <p class="mt-4 max-w-3xl text-sm leading-7 theme-text-secondary sm:text-base">
              面向 ChatGPT、Claude Code、Gemini、Codex 等 AI 使用场景，检测当前出口是否适合作为登录、开发调用和新号操作环境。
            </p>

            <form class="search-console mt-7" @submit.prevent="runManualCheck">
              <input
                v-model.trim="manualIp"
                class="console-input"
                placeholder="输入 IPv4 / IPv6 查询指定 IP"
                spellcheck="false"
              />
              <button class="theme-btn-primary console-btn" type="submit" :disabled="loading">
                查询
              </button>
              <button class="theme-btn-neutral console-btn current-env-btn" type="button" :disabled="loading" @click="checkCurrentIp">
                当前环境
              </button>
            </form>

            <div v-if="turnstileEnabled" class="mt-4 max-w-md rounded-xl border theme-border theme-panel-muted p-3">
              <TurnstileCaptcha
                ref="turnstileRef"
                v-model="turnstileToken"
                :site-key="turnstileSiteKey"
              />
            </div>

            <p class="mt-3 text-xs leading-6 theme-text-muted">
              {{ dailyLimitNote }}
            </p>
            <p class="mt-3 rounded-xl border p-3 text-xs leading-6" style="border-color:rgba(245,158,11,.35);background:rgba(245,158,11,.07);text-wrap:pretty">
              <strong class="theme-text-primary">检测结果仅供参考，不保证账号永不风控。</strong><span class="theme-text-secondary">别只看「住宅 / 机房」标签：多人共用的「机场」住宅 IP 看着干净却最易被关联封号；而大厂独享机房反而相对更稳。</span>
            </p>
          </div>

          <aside :class="['passport-card', bannerTone]">
            <div class="passport-topline">
              <span>AI Network Passport</span>
              <strong>{{ result ? 'live report' : currentIpLoading ? 'detecting' : 'ready' }}</strong>
            </div>
            <div class="passport-score">
              <button
                v-if="!result"
                class="score-orbit score-action"
                type="button"
                :disabled="loading || currentIpLoading"
                @click="checkCurrentIp"
              >
                <div class="score-orbit-inner">
                  <span>--</span>
                  <small>{{ verdictLabel }}</small>
                </div>
              </button>
              <div v-else class="score-orbit">
                <div class="score-orbit-inner">
                  <span>{{ score }}</span>
                  <small>{{ verdictLabel }}</small>
                </div>
              </div>
            </div>
            <div class="passport-meta">
              <span>当前出口 IP</span>
              <strong class="font-mono">{{ displayIp || '检测中' }}</strong>
              <small v-if="result && displayLocationText !== '未知'">{{ displayLocationText }}</small>
              <button
                v-else
                class="passport-action"
                type="button"
                :disabled="loading || currentIpLoading"
                @click="checkCurrentIp"
              >
                {{ loading ? '检测中' : '生成完整报告' }}
              </button>
            </div>
          </aside>
        </div>
      </header>

      <!-- 错误提示 -->
      <section v-if="errorMessage" class="theme-alert-danger mb-6 rounded-2xl border px-5 py-4 text-sm">
        {{ errorMessage }}
      </section>

      <!-- 加载骨架 -->
      <section v-if="loading" class="theme-panel mb-6 flex flex-col items-center justify-center rounded-2xl border p-10">
        <div class="scan-anim">
          <span class="scan-ring"></span>
          <span class="scan-ring scan-ring-2"></span>
          <span class="scan-core"></span>
          <span class="scan-sweep"></span>
        </div>
        <p class="mt-6 text-sm theme-text-secondary">正在检测 IP 环境…… 综合多个专业风险库分析中</p>
      </section>

      <template v-else-if="result">
        <section class="theme-panel rounded-2xl border p-5">
          <div class="section-kicker">Findings</div>
          <h2 class="text-lg font-bold theme-text-primary">发现问题</h2>
          <p class="mt-1 text-xs theme-text-secondary">按检测信号逐条列出，红色为高风险项。</p>
          <div class="mt-4 space-y-3">
            <div
              v-for="(f, i) in riskFindings"
              :key="i"
              class="flex gap-3 rounded-xl border p-4"
              :style="findingStyle(f.level)"
            >
              <span class="mt-0.5 shrink-0 text-base" :style="`color:${findingColor(f.level)}`">{{ f.level === 'ok' ? '✓' : '●' }}</span>
              <div>
                <strong class="block text-sm theme-text-primary">{{ f.title }}</strong>
                <p class="mt-1 text-sm leading-6 theme-text-secondary">{{ f.detail }}</p>
                <p v-if="f.note" class="mt-2 text-sm font-medium leading-6 theme-text-primary">{{ f.note }}</p>
              </div>
            </div>
          </div>
        </section>

        <section v-if="result.detections" class="theme-panel mt-3 rounded-2xl border p-5">
          <div class="section-kicker">Risk Detections</div>
          <h2 class="text-lg font-bold theme-text-primary">重要检测</h2>
          <p class="mt-1 text-xs theme-text-secondary">代理 / VPN 等检测多为「否」属正常，重点看「使用人数」。</p>
          <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              v-for="d in detectionItems"
              :key="d.label"
              class="rounded-xl border p-3 text-center"
              :style="d.hit ? 'border-color:rgba(239,68,68,.35);background:rgba(239,68,68,.10)' : 'border-color:rgba(34,197,94,.30);background:rgba(34,197,94,.08)'"
            >
              <span class="block text-xs theme-text-secondary">{{ d.label }}</span>
              <strong class="mt-1 block text-sm" :style="d.hit ? 'color:#ef4444' : 'color:#16a34a'">{{ d.hit ? '是' : '否' }}</strong>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              v-for="m in keyMetrics"
              :key="m.label"
              class="rounded-xl border theme-border p-3"
              :style="m.bad ? 'border-color:rgba(239,68,68,.35);background:rgba(239,68,68,.08)' : ''"
            >
              <span class="block text-xs theme-text-secondary">{{ m.label }}</span>
              <strong class="mt-1 block text-sm theme-text-primary" :style="m.bad ? 'color:#ef4444' : ''">{{ m.value }}</strong>
            </div>
          </div>
        </section>

        <p v-else-if="result.data_source === 'free'" class="mt-5 rounded-2xl border theme-border p-4 text-sm leading-7 theme-text-secondary">
          当前为基础数据源，逐项风险检测（代理 / VPN / 黑名单 / 机场共用人数等）暂不可用，可稍后或换网络再检测。
        </p>

        <section class="report-console-grid mt-5">
          <div :class="['verdict-banner', bannerTone]" v-spotlight.border>
            <div class="verdict-copy">
              <span class="verdict-eyebrow">综合判断</span>
              <h2 class="verdict-title">{{ verdictLabel }}</h2>
              <p class="verdict-sub">{{ overallSummary }}</p>
              <p v-if="displayIp" class="verdict-ip"><span class="font-mono">{{ displayIp }}</span><span v-if="displayLocationText !== '未知'"> · {{ displayLocationText }}</span></p>
              <div class="verdict-stats">
                <div>
                  <span>地区支持</span>
                  <strong>{{ result.region_supported ? '通过' : '未通过' }}</strong>
                </div>
                <div>
                  <span>网络类型</span>
                  <strong>{{ networkLabel }}</strong>
                </div>
                <div>
                  <span>时区一致性</span>
                  <strong>{{ timezoneChipText }}</strong>
                </div>
              </div>
              <div v-if="productCards.length" class="product-signal-strip">
                <div class="product-signal-copy">
                  <span>AI 产品可用性</span>
                  <strong>按官方支持地区叠加当前 IP 质量判断</strong>
                </div>
                <div class="product-signal-list">
                  <div v-for="p in productCards" :key="p.key" :class="['product-signal-chip', 'tone-' + p.tone]">
                    <img :class="['product-signal-icon', `brand-icon-${p.iconTone}`]" :src="p.iconSrc" :alt="`${p.name} logo`" loading="lazy" />
                    <span>{{ p.name }}</span>
                    <em>{{ p.status }}</em>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section class="theme-panel result-summary-card rounded-2xl border p-5">
            <div class="section-kicker">Query Result</div>
            <h2 class="text-lg font-bold theme-text-primary">查询结果</h2>
            <div class="result-table compact mt-4">
              <div v-for="item in primaryResultDetails" :key="item.label" class="result-row">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
              </div>
            </div>
          </section>
        </section>

        <section class="theme-panel mt-5 rounded-2xl border p-5">
          <div class="section-kicker">Scenario Matrix</div>
          <h2 class="text-lg font-bold theme-text-primary">分场景建议</h2>
          <div class="mt-4 grid gap-3 md:grid-cols-3">
            <div v-for="item in recommendations" :key="item.title" v-spotlight :class="['recommend-card', 'tone-' + item.tone]">
              <span class="recommend-badge">{{ item.badge }}</span>
              <strong>{{ item.title }}</strong>
              <small>{{ item.desc }}</small>
            </div>
          </div>
        </section>

        <section class="risk-guidance-panel mt-5 rounded-2xl border theme-border p-5">
          <div class="section-kicker">Stable Usage</div>
          <h2 class="text-lg font-bold theme-text-primary">稳定使用 AI 产品的建议</h2>
          <p class="mt-2 max-w-3xl text-sm leading-7 theme-text-secondary">
            IP 环境只是账号风控的一部分。长期使用更看重网络、地区、设备、订阅资料和使用行为是否长期一致。
          </p>
          <div class="risk-guidance-grid mt-4">
            <div>
              <span>环境稳定</span>
              <strong>避免频繁更换 IP、国家地区和浏览器时区，长期固定一个干净出口更稳。</strong>
            </div>
            <div>
              <span>设备登录</span>
              <strong>不要多设备来回登录，也不要多人共用同一个账号，容易触发异常登录。</strong>
            </div>
            <div>
              <span>使用强度</span>
              <strong>避免短时间高频调用、批量注册、批量登录或明显偏离正常用户的操作。</strong>
            </div>
            <div>
              <span>账号资料</span>
              <strong>账号历史风控、异常订阅状态、自行改绑改密、付款资料异常都可能被限制。</strong>
            </div>
            <div>
              <span>API 中转</span>
              <strong>把官方订阅号反代成 API 中转、多人共享使用，属于高风险用法。</strong>
            </div>
            <div>
              <span>内容规则</span>
              <strong>违规内容、绕过平台限制或违反服务条款的使用行为，封号风险无法靠 IP 解决。</strong>
            </div>
          </div>
        </section>

      </template>

      <!-- B: 说明与使用边界（折叠到底部） -->
      <details class="notes-accordion mt-6 rounded-2xl border theme-border" open>
        <summary>
          <span class="font-semibold theme-text-primary">判断说明与使用边界</span>
          <svg class="notes-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </summary>
        <div class="notes-grid">
          <div class="note">
            <h3>怎么看结果</h3>
            <p>同一 IP 在日常登录、开发/API、新号注册/付款下风险不同，需分场景判断。</p>
          </div>
          <div class="note">
            <h3>判断口径</h3>
            <p>机房 IP 不直接判死，住宅 IP 也不是天然更好。地区支持、归属清晰和长期稳定更重要。</p>
          </div>
          <div class="note">
            <h3>使用边界</h3>
            <p>本工具只评估 AI 使用环境风险。账号年龄、付款资料、设备指纹和行为频率也会影响风控。</p>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import api from '../api/client'
import { useRoute } from 'vue-router'
import { useAppStore } from '../stores/app'
import TurnstileCaptcha from '../components/captcha/TurnstileCaptcha.vue'
import claudeLogo from '../assets/ai-products/claude-ai.svg'
import geminiLogo from '../assets/ai-products/google-gemini.svg'
import openaiLogo from '../assets/ai-products/openai.svg'

type AiIpScenario = {
  key: string
  label: string
  level: 'good' | 'caution' | 'avoid' | string
  summary: string
}

type AiIpProduct = {
  key: string
  label: string
  region_supported: boolean
  available: boolean
  verdict: string
  summary: string
  scenarios: AiIpScenario[]
}

type AiIpReport = {
  ip: string
  queried_at: string
  score: number
  verdict: 'excellent' | 'good' | 'caution' | 'avoid' | string
  network_label: string
  provider?: string
  asn?: string
  country?: string
  country_code?: string
  region_supported?: boolean
  products?: AiIpProduct[]
  city?: string
  timezone?: string
  timezone_status?: 'match' | 'mismatch' | 'na' | string
  is_datacenter: boolean
  is_trusted_cloud: boolean
  is_residential?: boolean
  user_count?: number
  data_source?: string
  evaluate?: string
  static_ip_score?: number
  connection_type?: string
  owner?: string
  owner_type?: string
  detections?: {
    public_proxy: boolean
    anonymous_vpn: boolean
    tor: boolean
    blacklist: boolean
    cloud_service: boolean
    attacker: boolean
    abuser: boolean
    hosting: boolean
  }
  risk_signals: string[]
  scenarios: AiIpScenario[]
}

type CurrentIpPreview = {
  ip: string
}

type BrowserIPAPIResponse = {
  ip?: string
}


const manualIp = ref('')
const loading = ref(false)
const currentIpLoading = ref(false)
const currentIp = ref('')
const result = ref<AiIpReport | null>(null)
const errorMessage = ref('')
const turnstileToken = ref('')
const turnstileRef = ref<InstanceType<typeof TurnstileCaptcha> | null>(null)
const appStore = useAppStore()
const route = useRoute()

const trustedCloudKeywords = [
  'oracle', 'amazon', 'aws', 'microsoft', 'azure', 'google', 'gcp',
  'tencent', 'qcloud', 'alibaba', 'aliyun', 'alicloud',
]

const commonCloudKeywords = [
  'digitalocean', 'digital ocean', 'linode', 'akamai', 'vultr', 'ovh',
  'hetzner', 'contabo', 'leaseweb', 'choopa', 'm247', 'cogent',
  'hosting', 'datacenter', 'server', 'cloud',
]

const riskyKeywords = [
  'proxy', 'vpn', 'tor', 'crawler', 'bulletproof', 'trafficforce',
]

const brandAssets = {
  openai: {
    company: 'OpenAI',
    name: 'ChatGPT / Codex',
    iconSrc: openaiLogo,
    iconTone: 'openai',
  },
  claude: {
    company: 'Claude',
    name: 'Claude Code',
    iconSrc: claudeLogo,
    iconTone: 'claude',
  },
  gemini: {
    company: 'Google',
    name: 'Gemini',
    iconSrc: geminiLogo,
    iconTone: 'gemini',
  },
}

const aiIpCheckConfig = computed(() => appStore.config?.ai_ip_check || null)
const turnstileSiteKey = computed(() => String(aiIpCheckConfig.value?.turnstile?.site_key || ''))
// 是否带了放行 token（URL 或已记住）——只读，不写 localStorage，供禁用验证码 / 自动出报告判断
const hasBypassToken = computed(() => {
  const fromUrl = String(route.query.bypass || '').trim()
  if (fromUrl) return fromUrl.toLowerCase() !== 'off'
  try {
    return !!localStorage.getItem('aiip_bypass')
  } catch {
    return false
  }
})
// 公网启用验证码；带放行 token 时本人免验证码（后端同样跳过）
const turnstileEnabled = computed(() => Boolean(aiIpCheckConfig.value?.turnstile?.enabled && turnstileSiteKey.value) && !hasBypassToken.value)
const dailyLimitNote = computed(() => {
  const limit = Number(aiIpCheckConfig.value?.daily_limit || 0)
  return limit > 0 ? `每个访问 IP 每日可免费检测 ${limit} 个不同 IP（重复查询同一 IP 不计次）。` : ''
})

const orgText = computed(() => `${result.value?.provider || ''} ${result.value?.asn || ''}`.toLowerCase())
const isTrustedCloud = computed(() => trustedCloudKeywords.some((kw) => orgText.value.includes(kw)))
const isCommonCloud = computed(() => commonCloudKeywords.some((kw) => orgText.value.includes(kw)))
const isRiskyName = computed(() => riskyKeywords.some((kw) => orgText.value.includes(kw)))

const score = computed(() => {
  return result.value?.score || 0
})

const displayIp = computed(() => result.value?.ip || currentIp.value)

// 档位统一以后端 verdict 为准（excellent/good/caution/avoid），不再前端按分数另算，避免显示和结论矛盾。
const verdictLabel = computed(() => {
  if (!result.value) return '待检测'
  switch (result.value.verdict) {
    case 'excellent': return '优秀'
    case 'good': return '良好'
    case 'caution': return '可用但谨慎'
    case 'avoid': return '不建议'
    default: return '待检测'
  }
})

const bannerTone = computed(() => {
  if (!result.value) return 'tone-idle'
  switch (result.value.verdict) {
    case 'excellent':
    case 'good': return 'tone-good'
    case 'caution': return 'tone-warn'
    default: return 'tone-bad'
  }
})

const overallSummary = computed(() => {
  if (!result.value) return ''
  if (result.value.evaluate) return result.value.evaluate
  if (result.value.network_label === 'mainland_china') {
    return '当前为中国大陆网络，ChatGPT、Claude、Gemini 无法直连，需切换到海外出口后再检测。'
  }
  switch (result.value.verdict) {
    case 'excellent':
    case 'good': return '网络环境整体稳定，适合作为 AI 日常使用与开发调用的出口。'
    case 'caution': return '基本可用但不算理想，建议保持地区稳定并先小范围使用。'
    default: return '综合风险偏高，不建议绑定重要 AI 账号或执行高敏操作。'
  }
})

const locationText = computed(() => {
  const parts = [result.value?.country, result.value?.city].filter(Boolean)
  return parts.length ? parts.join(' · ') : '未知'
})

const countryNameZh: Record<string, string> = {
  CN: '中国大陆',
  HK: '中国香港',
  MO: '中国澳门',
  TW: '中国台湾',
  US: '美国',
  SG: '新加坡',
  JP: '日本',
  KR: '韩国',
  GB: '英国',
  CA: '加拿大',
  AU: '澳大利亚',
  DE: '德国',
  FR: '法国',
  NL: '荷兰',
  IN: '印度',
  TH: '泰国',
  MY: '马来西亚',
  VN: '越南',
}

const cityNameZh: Record<string, string> = {
  ashburn: '阿什本',
  bantian: '深圳坂田',
  taipei: '台北',
  'hong kong': '香港',
  macao: '澳门',
  macau: '澳门',
  singapore: '新加坡',
  tokyo: '东京',
  seoul: '首尔',
  london: '伦敦',
  paris: '巴黎',
  frankfurt: '法兰克福',
  amsterdam: '阿姆斯特丹',
  sydney: '悉尼',
}

const localizedLocationText = computed(() => {
  const code = String(result.value?.country_code || '').toUpperCase()
  const country = countryNameZh[code] || ''
  const cityKey = String(result.value?.city || '').trim().toLowerCase()
  const city = cityNameZh[cityKey] || ''
  const parts = [country, city].filter(Boolean)
  return parts.length ? parts.join(' · ') : ''
})

const displayLocationText = computed(() => {
  const original = locationText.value
  const localized = localizedLocationText.value
  if (!localized) return original
  if (original === '未知') return localized
  return `${localized} (${original.replace(' · ', ' / ')})`
})

const networkLabel = computed(() => {
  if (result.value?.network_label === 'mainland_china') return '中国大陆网络'
  if (result.value?.network_label === 'shared_residential') return '机场/共享住宅'
  if (result.value?.network_label === 'residential') return '住宅/ISP 宽带'
  if (result.value?.network_label === 'trusted_cloud_idc') return '可信云 IDC'
  if (result.value?.network_label === 'datacenter') return '普通云/机房'
  if (result.value?.network_label === 'proxy_or_vpn') return '疑似代理/风险网络'
  if (result.value?.network_label === 'standard_isp') return '住宅/企业/未知非机房'
  if (isRiskyName.value) return '疑似代理/风险网络'
  if (isTrustedCloud.value) return '可信云 IDC'
  if (isCommonCloud.value) return '普通云/机房'
  return '住宅/企业/未知非机房'
})

const riskValueText = computed(() => {
  if (!result.value) return '未知'
  const clean = Math.max(0, Math.min(100, result.value.score))
  return `${100 - clean}% 风险参考`
})

const nativeIpText = computed(() => {
  if (!result.value) return '未知'
  if (result.value.network_label === 'mainland_china') {
    return '主流 AI 服务不可直连使用'
  }
  if (result.value.risk_signals?.some((flag) => flag.includes('proxy') || flag.includes('vpn') || flag.includes('tor'))) {
    return '需结合实际登录稳定性观察'
  }
  return result.value.is_datacenter ? '云服务/机房出口' : '未见明显代理特征'
})

// 发现问题：把检测到的具体风险用大白话逐条讲清楚，重点死磕「机场 / 多人共用」
function findingColor(level: string) {
  if (level === 'critical') return '#ef4444'
  if (level === 'high') return '#f97316'
  if (level === 'medium') return '#f59e0b'
  return '#16a34a'
}
function findingStyle(level: string) {
  const c = findingColor(level)
  const bg =
    level === 'ok'
      ? 'rgba(34,197,94,.07)'
      : level === 'critical'
        ? 'rgba(239,68,68,.08)'
        : level === 'high'
          ? 'rgba(249,115,22,.08)'
          : 'rgba(245,158,11,.08)'
  return `border-color:${c}55;background:${bg}`
}
const riskFindings = computed(() => {
  const r = result.value
  if (!r) return []
  const d = r.detections
  const list: Array<{ level: 'critical' | 'high' | 'medium' | 'ok'; title: string; detail: string; note?: string }> = []

  if (!r.region_supported) {
    list.push({
      level: 'critical',
      title: '当前地区不受支持',
      detail: '该 IP 所在地区不在 ChatGPT / Claude / Gemini 官方支持范围，需更换到受支持地区的出口才能正常使用。',
    })
  }

  const shared = typeof r.user_count === 'number' && r.user_count >= 2
  if (shared) {
    list.push({
      level: 'critical',
      title: `多人共用 IP（检测到约 ${r.user_count} 个使用者）—— 疑似机场`,
      detail:
        '多个用户共用同一出口 IP，是典型的「机场 / 公共代理池」特征。AI 平台会把共用同一 IP 的账号判定为互相关联，极易触发批量封号、登录异常、新号注册被拒。⚠️ 多人共用机场 IP 的封号风险远高于大厂独享机房 IP —— 即使它显示为「住宅」，也强烈不建议用于任何重要 AI 账号。',
    })
  }
  if (d?.public_proxy) list.push({ level: 'critical', title: '公共代理', detail: '出口被标记为公共代理，AI 平台普遍直接封禁，不建议使用。' })
  if (d?.anonymous_vpn) list.push({ level: 'critical', title: '匿名 VPN', detail: '出口为匿名 VPN，登录、注册、付款风控极高。' })
  if (d?.tor) list.push({ level: 'critical', title: 'TOR 出口节点', detail: 'Tor 网络出口，几乎必被风控，禁止用于 AI 账号。' })
  if (d?.blacklist) list.push({ level: 'critical', title: '已列入黑名单', detail: '该 IP 已被列入黑名单，强烈不建议。' })
  if (d?.abuser) list.push({ level: 'high', title: '存在滥用记录', detail: '该 IP 有滥用记录，容易触发风控。' })
  if (d?.attacker) list.push({ level: 'high', title: '存在攻击记录', detail: '该 IP 有网络攻击行为记录，信誉受损。' })

  const hardRisk = !!(d && (d.public_proxy || d.anonymous_vpn || d.tor || d.blacklist || d.abuser || d.attacker))
  if (r.is_datacenter && !shared && !hardRisk) {
    list.push({
      level: 'medium',
      title: '机房 / 云出口（独立）',
      detail:
        '独立机房 / 云 IP：用于 API、Codex、Claude Code 等开发调用一般没问题；但日常登录、新号注册、付款比独立住宅更易触发风控，建议环境长期稳定。',
      note: '提示：AWS / 谷歌 / 阿里云等大厂独享机房 IP，风控远低于多人共用机场 IP。',
    })
  }

  if (list.length === 0) {
    list.push({
      level: 'ok',
      title: '未发现明显风险',
      detail: '未检测到代理 / VPN / 黑名单 / 机场共用等明显问题。仍建议保持网络、地区、设备和账号行为长期稳定 —— 风控不只看 IP。',
    })
  }
  return list
})

// 重要检测宫格（仅 ipjiance 数据源有逐项 flag）
const detectionItems = computed(() => {
  const d = result.value?.detections
  if (!d) return []
  return [
    { label: '公共代理', hit: d.public_proxy },
    { label: '匿名 VPN', hit: d.anonymous_vpn },
    { label: 'TOR 节点', hit: d.tor },
    { label: '黑名单', hit: d.blacklist },
    { label: '云服务', hit: d.cloud_service },
    { label: '机房代理', hit: d.hosting },
    { label: '参与攻击', hit: d.attacker },
    { label: '滥用节点', hit: d.abuser },
  ]
})

// 关键指标：使用人数（机场信号）/ 连接类型 / 静态 IP 分 / 综合评分
const keyMetrics = computed(() => {
  const r = result.value
  if (!r) return []
  const tiles: Array<{ label: string; value: string; bad: boolean }> = []
  if (typeof r.user_count === 'number') {
    tiles.push({ label: '使用人数', value: r.user_count >= 2 ? `${r.user_count}（疑似机场）` : `${r.user_count}`, bad: r.user_count >= 2 })
  }
  if (r.connection_type) tiles.push({ label: '连接类型', value: r.connection_type, bad: false })
  if (typeof r.static_ip_score === 'number' && r.static_ip_score > 0) {
    tiles.push({ label: '静态 IP 分', value: `${r.static_ip_score}`, bad: false })
  }
  tiles.push({ label: '综合评分', value: `${r.score} / 100`, bad: r.score < 65 })
  return tiles
})

const primaryResultDetails = computed(() => {
  if (!result.value) return []
  const rows = [
    { label: 'IP 地址', value: result.value.ip },
    { label: 'IP 位置', value: displayLocationText.value },
    { label: 'ASN', value: result.value.asn || '未知' },
    { label: '归属 / 企业', value: result.value.provider || '未知' },
    { label: 'IP 类型', value: networkLabel.value },
  ]
  if (result.value.data_source === 'ipjiance' && typeof result.value.user_count === 'number') {
    rows.push({
      label: '使用人数',
      value: result.value.user_count >= 2
        ? `${result.value.user_count}（多人共用 / 疑似机场，易被关联）`
        : `${result.value.user_count}（独立性高）`,
    })
  }
  rows.push(
    { label: '风控参考', value: riskValueText.value },
    { label: '出口特征', value: nativeIpText.value },
    { label: 'AI 应用建议', value: verdictLabel.value },
    {
      label: '数据来源',
      value: result.value.data_source === 'ipjiance'
        ? '增强风险库（含机场 / 共用识别）'
        : '基础数据源（机场识别有限）',
    },
  )
  return rows
})

// 时区一致性以后端 timezone_status 为准：match=正常 / mismatch=需修正 / na=不适用（手动查别人 IP 时不比时区）。
const timezoneChipText = computed(() => {
  switch (result.value?.timezone_status) {
    case 'match': return '正常'
    case 'mismatch': return '需修正'
    default: return '不适用'
  }
})

const productCards = computed(() => {
  const products = result.value?.products || []
  return products.map((product) => {
    const brand = brandAssets[product.key as keyof typeof brandAssets] || {
      company: product.label,
      name: product.label,
      iconSrc: openaiLogo,
      iconTone: 'openai',
    }
    let tone: 'good' | 'warn' | 'bad'
    let status: string
    if (!product.region_supported) {
      tone = 'bad'
      status = '该地区不支持'
    } else if (!product.available || product.verdict === 'avoid') {
      tone = 'bad'
      status = '不建议'
    } else if (product.verdict === 'caution') {
      tone = 'warn'
      status = '谨慎可用'
    } else {
      tone = 'good'
      status = '可用'
    }
    const baseCard = {
      key: product.key,
      label: product.label,
      company: brand.company,
      name: brand.name,
      iconSrc: brand.iconSrc,
      iconTone: brand.iconTone,
      tone,
      status,
      summary: product.key === 'openai'
        ? product.summary.replace('ChatGPT', 'ChatGPT / Codex')
        : product.summary,
    }
    return baseCard
  })
})

const recommendations = computed(() => {
  if (!result.value) return []
  return result.value.scenarios.map((scenario) => {
    const tone = scenario.level === 'good' ? 'good' : scenario.level === 'avoid' ? 'bad' : 'warn'
    return {
      title: scenario.label,
      badge: toneLabel(tone),
      tone,
      desc: scenario.summary,
    }
  })
})

function toneLabel(tone: string) {
  if (tone === 'good') return '适合'
  if (tone === 'warn') return '谨慎'
  return '不建议'
}

function normalizeIp(value: string) {
  return value.replace(/^\[|\]$/g, '').trim()
}

function isValidIp(value: string) {
  const ip = normalizeIp(value)
  const ipv4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/
  const ipv6 = /^[0-9a-f:]+$/i
  return ipv4.test(ip) || (ip.includes(':') && ipv6.test(ip) && ip.length >= 3)
}

// 密钥放行 token：首次带 ?bypass=<token> 访问即记住到 localStorage，之后直接用 /tools/ip 就一直不限次。
// 用 ?bypass=off 可在本设备清除。
function resolveBypassToken(): string {
  const fromUrl = String(route.query.bypass || '').trim()
  if (fromUrl) {
    try {
      if (fromUrl.toLowerCase() === 'off') {
        localStorage.removeItem('aiip_bypass')
        return ''
      }
      localStorage.setItem('aiip_bypass', fromUrl)
    } catch { /* localStorage 不可用时忽略 */ }
    return fromUrl.toLowerCase() === 'off' ? '' : fromUrl
  }
  try {
    return localStorage.getItem('aiip_bypass') || ''
  } catch {
    return ''
  }
}

async function fetchIpData(ip?: string, currentMode = false) {
  if (turnstileEnabled.value && !turnstileToken.value) {
    throw new Error('请先完成人机验证。')
  }
  const params: Record<string, string> = {}
  if (ip) params.ip = ip
  // 仅「检测当前出口」时把浏览器时区传给后端参与时区一致性打分；手动查别人 IP 不传（时区比对无意义）。
  if (currentMode) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz) params.tz = tz
  }
  // 密钥放行：URL 带 ?bypass=<token>（或之前记住的）时转发后端，命中即不限次、任意 IP。
  const bypass = resolveBypassToken()
  if (bypass) params.bypass = bypass
  const { data } = await api.get('/public/tools/ai-ip-check', {
    params: Object.keys(params).length ? params : undefined,
    headers: turnstileEnabled.value ? { 'X-Turnstile-Token': turnstileToken.value } : undefined,
  })
  result.value = data.data as AiIpReport
  turnstileRef.value?.reset()
  turnstileToken.value = ''
}

async function fetchCurrentIpPreview() {
  currentIpLoading.value = true
  try {
    currentIp.value = await fetchBrowserExitIp()
  } catch {
    currentIp.value = ''
  } finally {
    currentIpLoading.value = false
  }
}

async function fetchBrowserExitIp() {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      cache: 'no-store',
      credentials: 'omit',
    })
    if (response.ok) {
      const data = await response.json() as BrowserIPAPIResponse
      if (data.ip && isValidIp(data.ip)) {
        return data.ip
      }
    }
  } catch {
    // Fall back to the site-visible IP when the same browser-side IP echo used by /tools is unavailable.
  }
  const { data } = await api.get('/public/tools/ai-ip-check', {
    params: { current: '1' },
  })
  const preview = data.data as CurrentIpPreview
  return preview.ip || ''
}

async function checkCurrentIp() {
  errorMessage.value = ''
  loading.value = true
  try {
    let ip = currentIp.value
    if (!ip || !isValidIp(ip)) {
      ip = await fetchBrowserExitIp()
      currentIp.value = ip
    }
    if (!ip || !isValidIp(ip)) {
      await fetchIpData(undefined, true)
      return
    }
    await fetchIpData(ip, true)
  } catch (error) {
    result.value = null
    errorMessage.value = error instanceof Error ? error.message : '当前 IP 查询失败'
    turnstileRef.value?.reset()
    turnstileToken.value = ''
  } finally {
    loading.value = false
  }
}

async function runManualCheck() {
  const ip = normalizeIp(manualIp.value)
  if (!isValidIp(ip)) {
    errorMessage.value = '请输入有效的 IPv4 或 IPv6 地址。'
    return
  }
  errorMessage.value = ''
  loading.value = true
  try {
    await fetchIpData(ip)
  } catch (error) {
    result.value = null
    errorMessage.value = error instanceof Error ? error.message : 'IP 查询失败'
    turnstileRef.value?.reset()
    turnstileToken.value = ''
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!appStore.config) {
    void appStore.loadConfig()
  }
  // 深链 ?ip=1.2.3.4：预填并（验证码未启用时）自动出报告，便于分享 / 复查（后端有缓存）。
  const deepIp = normalizeIp(String(route.query.ip || ''))
  if (isValidIp(deepIp)) {
    manualIp.value = deepIp
    if (!turnstileEnabled.value) {
      void runManualCheck()
    }
  } else {
    void fetchCurrentIpPreview()
  }
})

useHead({
  title: 'AI IP 环境检测 · ChatGPT / Claude / Codex 使用建议 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB AI IP 环境检测，面向 ChatGPT、Claude Code、Gemini、Codex 等场景评估 IP 地区、ASN、网络风险和浏览器时区。',
    },
    { property: 'og:title', content: 'AI IP 环境检测 - 52HUB' },
    { property: 'og:description', content: '专门面向 AI 产品使用场景的 IP 环境检测：AI 日常登录、AI 开发/API、新号注册分开判断。' },
    { property: 'og:url', content: 'https://52hub.org/tools/ip' },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: 'https://52hub.org/tools/ip' },
  ],
})
</script>

<style scoped>
/* 色调令牌：随主题（亮/暗）自动切换的语义色，统一驱动徽章、卡片、信号、量表 */
.tone-good { --tone: var(--ui-success); --tone-soft: var(--ui-success-soft); }
.tone-warn { --tone: var(--ui-warning); --tone-soft: var(--ui-warning-soft); }
.tone-bad { --tone: var(--ui-danger); --tone-soft: var(--ui-danger-soft); }
.tone-idle { --tone: var(--ui-info); --tone-soft: var(--ui-info-soft); }
.tone-neutral { --tone: var(--ui-text-muted); --tone-soft: var(--ui-bg-soft); }

/* 页面背景：在主题底色之上叠加轻量科技感光晕（不覆盖底色，保证亮/暗都成立） */
.ai-ip-check-page {
  --ui-bg-page: #060913;
  --ui-bg-elevated: #0b1220;
  --ui-bg-soft: #101a2b;
  --ui-bg-muted: #172237;
  --ui-border: rgba(96, 165, 250, 0.22);
  --ui-text-primary: #f8fbff;
  --ui-text-secondary: #c7d2e6;
  --ui-text-muted: #8292aa;
  --ui-accent: #35d6ff;
  --ui-accent-hover: #73e4ff;
  --ui-accent-soft: rgba(53, 214, 255, 0.12);
  --ui-info: #60a5fa;
  --ui-info-soft: rgba(96, 165, 250, 0.14);
  --ui-success: #2dd4bf;
  --ui-success-soft: rgba(45, 212, 191, 0.15);
  --ui-warning: #f59e0b;
  --ui-warning-soft: rgba(245, 158, 11, 0.16);
  --ui-danger: #fb7185;
  --ui-danger-soft: rgba(251, 113, 133, 0.16);
  --ui-text-on-accent: #03131f;
  --ui-focus-ring: rgba(53, 214, 255, 0.24);
  --ui-shadow-1: 0 18px 48px rgba(0, 0, 0, 0.24);
  --ui-shadow-2: 0 32px 90px rgba(0, 0, 0, 0.36);
  color: var(--ui-text-primary);
  background-image:
    linear-gradient(rgba(53, 214, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(53, 214, 255, 0.035) 1px, transparent 1px),
    radial-gradient(circle at 14% 6%, rgba(45, 212, 191, 0.20), transparent 30rem),
    radial-gradient(circle at 86% 10%, rgba(96, 165, 250, 0.22), transparent 28rem),
    linear-gradient(180deg, #07111d 0%, #060913 45%, #05070e 100%);
  background-size: 34px 34px, 34px 34px, auto, auto, auto;
  background-attachment: fixed;
}

:global(html:not(.dark) .ai-ip-check-page) {
  --ui-bg-page: #f5f8fc;
  --ui-bg-elevated: #ffffff;
  --ui-bg-soft: #eef5fb;
  --ui-bg-muted: #dbe8f4;
  --ui-border: rgba(14, 116, 144, 0.18);
  --ui-text-primary: #0f172a;
  --ui-text-secondary: #334155;
  --ui-text-muted: #64748b;
  --ui-accent: #0891b2;
  --ui-accent-hover: #0e7490;
  --ui-accent-soft: rgba(8, 145, 178, 0.10);
  --ui-info: #2563eb;
  --ui-info-soft: rgba(37, 99, 235, 0.10);
  --ui-success: #0f766e;
  --ui-success-soft: rgba(15, 118, 110, 0.10);
  --ui-warning: #d97706;
  --ui-warning-soft: rgba(217, 119, 6, 0.12);
  --ui-danger: #e11d48;
  --ui-danger-soft: rgba(225, 29, 72, 0.10);
  --ui-text-on-accent: #ffffff;
  --ui-focus-ring: rgba(8, 145, 178, 0.18);
  --ui-shadow-1: 0 18px 48px rgba(15, 23, 42, 0.08);
  --ui-shadow-2: 0 28px 72px rgba(15, 23, 42, 0.12);
  background-image:
    linear-gradient(rgba(8, 145, 178, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(8, 145, 178, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 14% 6%, rgba(45, 212, 191, 0.18), transparent 30rem),
    radial-gradient(circle at 86% 10%, rgba(37, 99, 235, 0.12), transparent 28rem),
    linear-gradient(180deg, #f8fbff 0%, #eef6fb 55%, #f8fbff 100%);
}

:global(html:not(.dark) .ai-ip-check-page .hero-shell) {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(239, 248, 252, 0.92)),
    var(--ui-bg-elevated);
}

/* Hero */
.hero-shell {
  position: relative;
  background:
    linear-gradient(135deg, rgba(11, 18, 32, 0.96), rgba(8, 13, 24, 0.92)),
    var(--ui-bg-elevated);
  box-shadow: var(--ui-shadow-2);
}

.hero-shell::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background-image:
    linear-gradient(color-mix(in oklab, var(--ui-accent) 14%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklab, var(--ui-accent) 14%, transparent) 1px, transparent 1px);
  background-size: 38px 38px;
  mask-image: linear-gradient(120deg, black, transparent 80%);
  opacity: 0.5;
}

.hero-inner {
  position: relative;
  padding: 1.5rem;
}

@media (min-width: 640px) {
  .hero-inner {
    padding: 2.25rem;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 32%, transparent);
  background-color: var(--ui-accent-soft);
  color: var(--ui-accent);
  padding: 0.35rem 0.8rem;
}

.hero-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background-color: var(--ui-success);
  box-shadow: 0 0 0 0 color-mix(in oklab, var(--ui-success) 70%, transparent);
  animation: hero-pulse 2s ease-out infinite;
}

@keyframes hero-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--ui-success) 60%, transparent); }
  70% { box-shadow: 0 0 0 8px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

.search-console {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 720px) {
  .search-console {
    grid-template-columns: minmax(0, 1fr) auto auto;
  }
}

.console-input {
  min-height: 3.25rem;
  width: 100%;
  border: 1px solid var(--ui-border);
  border-radius: 0.95rem;
  background-color: var(--ui-bg-page);
  padding: 0 1rem;
  color: var(--ui-text-primary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.console-input::placeholder {
  color: var(--ui-text-muted);
}

.console-input:focus {
  border-color: var(--ui-accent);
  box-shadow: 0 0 0 3px var(--ui-focus-ring);
}

.console-btn {
  min-height: 3.25rem;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.95rem;
  padding: 0 1.4rem;
  font-size: 0.92rem;
  font-weight: 700;
}

/* A: 结论横幅 */
.verdict-banner {
  position: relative;
  display: grid;
  gap: 1.25rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid color-mix(in oklab, var(--tone) 36%, var(--ui-border));
  border-left: 5px solid var(--tone);
  border-radius: 1.5rem;
  padding: 1.5rem;
  background-image:
    linear-gradient(135deg, var(--tone-soft), transparent 62%);
  background-color: var(--ui-bg-elevated);
  box-shadow: var(--ui-shadow-2);
}

@media (min-width: 720px) {
  .verdict-banner {
    grid-template-columns: auto minmax(0, 1fr);
    padding: 1.75rem 2rem;
  }
}

.verdict-gauge {
  display: flex;
  align-items: center;
  justify-content: center;
}

.verdict-eyebrow {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--tone);
}

.scan-anim {
  position: relative;
  width: 132px;
  height: 132px;
}
.scan-ring,
.scan-core,
.scan-sweep {
  position: absolute;
  border-radius: 50%;
}
.scan-ring {
  inset: 0;
  border: 2px solid rgba(20, 184, 166, 0.25);
}
.scan-ring-2 {
  inset: 22px;
  border-color: rgba(20, 184, 166, 0.18);
}
.scan-core {
  inset: 46px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.65), rgba(20, 184, 166, 0));
  animation: scan-pulse 1.5s ease-out infinite;
}
.scan-sweep {
  inset: 0;
  border: 2px solid transparent;
  border-top-color: #14b8a6;
  border-right-color: #14b8a6;
  animation: scan-spin 1.1s linear infinite;
}
@keyframes scan-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes scan-pulse {
  0% {
    transform: scale(0.55);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.55);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.verdict-title {
  margin-top: 0.25rem;
  font-size: clamp(1.6rem, 4vw, 2.25rem);
  font-weight: 900;
  line-height: 1.1;
  color: var(--ui-text-primary);
}

.verdict-sub {
  margin-top: 0.6rem;
  max-width: 42rem;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--ui-text-secondary);
  text-wrap: pretty;
}

.verdict-ip {
  margin-top: 0.6rem;
  font-size: 0.82rem;
  color: var(--ui-text-muted);
  overflow-wrap: anywhere;
}

.verdict-stats {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

@media (min-width: 720px) {
  .verdict-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.verdict-stats div {
  border: 1px solid color-mix(in oklab, var(--tone) 22%, var(--ui-border));
  border-radius: 0.9rem;
  background: color-mix(in oklab, var(--ui-bg-page) 72%, var(--tone-soft) 28%);
  padding: 0.85rem;
}

.verdict-stats span {
  display: block;
  color: var(--ui-text-muted);
  font-size: 0.72rem;
}

.verdict-stats strong {
  display: block;
  margin-top: 0.3rem;
  color: var(--ui-text-primary);
  font-size: 0.95rem;
  overflow-wrap: anywhere;
}

.product-signal-strip {
  display: grid;
  gap: 0.8rem;
  margin-top: 1.05rem;
  border: 1px solid color-mix(in oklab, var(--tone) 22%, var(--ui-border));
  border-radius: 1rem;
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-bg-page) 82%, var(--tone-soft) 18%), transparent),
    color-mix(in oklab, var(--ui-bg-page) 88%, var(--ui-bg-elevated) 12%);
  padding: 0.85rem;
}

@media (min-width: 720px) {
  .product-signal-strip {
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
  }
}

.product-signal-copy span {
  display: block;
  color: var(--tone);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.product-signal-copy strong {
  display: block;
  margin-top: 0.22rem;
  color: var(--ui-text-secondary);
  font-size: 0.82rem;
  line-height: 1.45;
}

.product-signal-list {
  display: grid;
  gap: 0.65rem;
  grid-template-columns: minmax(0, 1fr);
}

.product-signal-chip {
  display: inline-flex;
  width: 100%;
  min-height: 3rem;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  border: 1px solid color-mix(in oklab, var(--tone) 32%, var(--ui-border));
  border-radius: 0.95rem;
  background: color-mix(in oklab, var(--tone-soft) 54%, var(--ui-bg-elevated) 46%);
  color: var(--ui-text-primary);
  padding: 0.52rem 0.75rem;
}

.product-signal-icon {
  display: block;
  width: 1.35rem;
  height: 1.35rem;
  flex: none;
  object-fit: contain;
}

.product-signal-icon.brand-icon-openai,
.product-signal-icon.brand-icon-claude,
.product-signal-icon.brand-icon-gemini {
  width: 1.55rem;
  height: 1.55rem;
}

.product-signal-chip span {
  flex: 1;
  min-width: 0;
  max-width: none;
  overflow-wrap: anywhere;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.25;
}

.product-signal-chip em {
  flex: none;
  border-radius: 999px;
  background: var(--tone-soft);
  color: var(--tone);
  font-size: 0.72rem;
  font-style: normal;
  font-weight: 900;
  padding: 0.16rem 0.45rem;
}

.verdict-chips {
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--tone) 40%, transparent);
  padding: 0.3rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--tone);
  background-color: var(--tone-soft);
}

/* 量表 */
.score-orbit {
  position: relative;
  display: flex;
  width: min(11rem, 46vw);
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background:
    conic-gradient(from 180deg,
      var(--tone),
      color-mix(in oklab, var(--tone) 45%, var(--ui-bg-muted)),
      var(--ui-bg-muted),
      var(--tone));
  box-shadow: 0 0 40px color-mix(in oklab, var(--tone) 30%, transparent);
}

.score-action {
  border: 0;
  cursor: pointer;
  padding: 0;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.score-action:hover:not(:disabled),
.score-action:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 0 52px color-mix(in oklab, var(--tone) 42%, transparent);
  outline: none;
}

.score-action:disabled {
  cursor: not-allowed;
  opacity: 0.68;
}

.score-orbit::after {
  position: absolute;
  inset: 0.55rem;
  border: 1px solid color-mix(in oklab, var(--tone) 28%, transparent);
  border-radius: inherit;
  content: '';
}

.score-orbit-inner {
  position: relative;
  z-index: 1;
  display: flex;
  width: calc(100% - 1.4rem);
  height: calc(100% - 1.4rem);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  background-color: var(--ui-bg-elevated);
}

.score-orbit-inner span {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: clamp(2.4rem, 6vw, 3.4rem);
  font-weight: 900;
  line-height: 1;
  color: var(--ui-text-primary);
}

.score-orbit-inner small {
  margin-top: 0.3rem;
  color: var(--tone);
  font-size: 0.82rem;
  font-weight: 800;
}

/* 分场景建议 */
.recommend-card {
  min-height: 9rem;
  border: 1px solid var(--ui-border);
  border-left: 3px solid var(--tone);
  border-radius: 1.1rem;
  padding: 1rem;
  background-color: var(--ui-bg-page);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.recommend-card strong {
  display: block;
  color: var(--ui-text-primary);
}

.recommend-card small {
  display: block;
  margin-top: 0.35rem;
  color: var(--ui-text-muted);
  line-height: 1.6;
}

.recommend-badge {
  display: inline-flex;
  margin-bottom: 0.8rem;
  border-radius: 999px;
  padding: 0.25rem 0.62rem;
  font-size: 0.74rem;
  font-weight: 800;
  color: var(--tone);
  background-color: var(--tone-soft);
}

/* 综合信号 */
.signal-card {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  min-height: 5.5rem;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  padding: 0.9rem;
  color: var(--ui-text-secondary);
  background-color: var(--ui-bg-page);
}

.signal-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  text-wrap: pretty;
}

.reason-icon {
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 900;
  line-height: 1;
  color: var(--ui-text-on-accent);
  background-color: var(--tone);
}

/* 环境画像 */
.metric-line {
  display: grid;
  gap: 0.25rem;
  border-bottom: 1px solid var(--ui-border);
  padding-bottom: 0.75rem;
}

.metric-line:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.metric-line span {
  color: var(--ui-text-muted);
  font-size: 0.76rem;
}

.metric-line strong {
  color: var(--ui-text-primary);
  font-size: 0.9rem;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

/* 查询结果表 */
.result-table {
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
}

.result-row {
  display: grid;
  gap: 0.35rem;
  border-bottom: 1px solid var(--ui-border);
  background-color: var(--ui-bg-page);
  padding: 0.9rem 1rem;
}

.result-row:nth-child(even) {
  background-color: var(--ui-bg-soft);
}

.result-row:last-child {
  border-bottom: 0;
}

.result-row span {
  color: var(--ui-text-muted);
  font-size: 0.78rem;
}

.result-row strong {
  color: var(--ui-text-primary);
  font-size: 0.95rem;
  line-height: 1.55;
  overflow-wrap: anywhere;
  text-wrap: pretty;
}

@media (min-width: 720px) {
  .result-row {
    grid-template-columns: 10rem minmax(0, 1fr);
    align-items: center;
  }
}

/* B: 说明折叠 */
.notes-accordion {
  background-color: var(--ui-bg-elevated);
  box-shadow: var(--ui-shadow-1);
}

.notes-accordion > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  list-style: none;
  padding: 1rem 1.25rem;
}

.notes-accordion > summary::-webkit-details-marker {
  display: none;
}

.notes-chevron {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--ui-text-muted);
  transition: transform 0.2s ease;
}

.notes-accordion[open] .notes-chevron {
  transform: rotate(180deg);
}

.notes-grid {
  display: grid;
  gap: 1rem;
  padding: 0 1.25rem 1.25rem;
}

@media (min-width: 768px) {
  .notes-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.note h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ui-text-primary);
}

.note p {
  margin-top: 0.5rem;
  font-size: 0.86rem;
  line-height: 1.7;
  color: var(--ui-text-secondary);
  text-wrap: pretty;
}

/* 产品化重构：检测控制台 + 报告护照 */
.product-hero-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 960px) {
  .product-hero-grid {
    grid-template-columns: minmax(0, 1fr) 19rem;
    align-items: stretch;
  }
}

.hero-copy {
  min-width: 0;
}

.passport-card {
  position: relative;
  display: grid;
  min-height: 22rem;
  overflow: hidden;
  border: 1px solid color-mix(in oklab, var(--tone) 36%, var(--ui-border));
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at 50% 22%, color-mix(in oklab, var(--tone) 30%, transparent), transparent 12rem),
    linear-gradient(180deg, color-mix(in oklab, var(--ui-bg-elevated) 88%, var(--tone) 12%), var(--ui-bg-page));
  padding: 1rem;
  box-shadow: 0 24px 80px color-mix(in oklab, var(--tone) 18%, transparent);
}

.passport-card::after {
  position: absolute;
  inset: auto 1rem 1rem;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--tone) 55%, transparent), transparent);
}

.passport-topline,
.passport-meta {
  position: relative;
  z-index: 1;
}

.passport-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--ui-text-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.passport-topline strong {
  border-radius: 999px;
  background: var(--tone-soft);
  color: var(--tone);
  padding: 0.25rem 0.55rem;
}

.passport-score {
  display: flex;
  align-items: center;
  justify-content: center;
}

.passport-score .score-orbit {
  width: min(15rem, 70vw);
  height: min(15rem, 70vw);
}

.passport-meta {
  align-self: end;
  display: grid;
  gap: 0.2rem;
}

.passport-meta span,
.passport-meta small {
  color: var(--ui-text-muted);
}

.passport-meta strong {
  color: var(--ui-text-primary);
  font-size: 1.02rem;
  overflow-wrap: anywhere;
}

.passport-action {
  justify-self: start;
  margin-top: 0.15rem;
  border: 1px solid color-mix(in oklab, var(--tone) 44%, var(--ui-border));
  border-radius: 999px;
  background: color-mix(in oklab, var(--tone) 16%, var(--ui-bg-elevated));
  color: var(--tone);
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1;
  padding: 0.52rem 0.78rem;
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.passport-action:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: color-mix(in oklab, var(--tone) 68%, var(--ui-border));
  background: color-mix(in oklab, var(--tone) 24%, var(--ui-bg-elevated));
}

.passport-action:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.report-console-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 900px) {
  .report-console-grid {
    grid-template-columns: minmax(0, 0.92fr) minmax(20rem, 0.55fr);
    align-items: stretch;
  }
}

.section-kicker {
  margin-bottom: 0.35rem;
  color: var(--ui-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.result-summary-card {
  background:
    linear-gradient(180deg, color-mix(in oklab, var(--ui-bg-elevated) 88%, var(--ui-accent) 12%), var(--ui-bg-elevated));
}

.result-table.compact .result-row {
  padding: 0.72rem 0.85rem;
}

.risk-guidance-panel {
  background:
    radial-gradient(circle at 0 0, color-mix(in oklab, var(--ui-accent) 12%, transparent), transparent 18rem),
    color-mix(in oklab, var(--ui-bg-elevated) 92%, var(--ui-bg-page) 8%);
  box-shadow: var(--ui-shadow-1);
}

.risk-guidance-grid {
  display: grid;
  gap: 0.85rem;
}

@media (min-width: 720px) {
  .risk-guidance-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.risk-guidance-grid div {
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  background: color-mix(in oklab, var(--ui-bg-page) 76%, var(--ui-bg-elevated) 24%);
  padding: 0.9rem;
}

.risk-guidance-grid span {
  display: block;
  color: var(--ui-text-muted);
  font-size: 0.74rem;
  font-weight: 800;
}

.risk-guidance-grid strong {
  display: block;
  margin-top: 0.42rem;
  color: var(--ui-text-secondary);
  font-size: 0.82rem;
  line-height: 1.68;
  text-wrap: pretty;
}

.brand-board {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: 1.35rem;
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-bg-elevated) 86%, var(--ui-accent) 14%), var(--ui-bg-elevated));
  padding: 1.25rem;
  box-shadow: var(--ui-shadow-1);
}

.brand-board::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background-image:
    linear-gradient(color-mix(in oklab, var(--ui-accent) 9%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklab, var(--ui-accent) 9%, transparent) 1px, transparent 1px);
  background-size: 30px 30px;
  mask-image: linear-gradient(110deg, black, transparent 80%);
}

.brand-board-head,
.brand-card-grid {
  position: relative;
  z-index: 1;
}

.brand-board-head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.brand-board-head p {
  max-width: 28rem;
  color: var(--ui-text-muted);
  font-size: 0.86rem;
  line-height: 1.65;
}

.brand-card-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.1rem;
}

@media (min-width: 820px) {
  .brand-card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.brand-card {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1rem;
  min-height: 9.5rem;
  border: 1px solid color-mix(in oklab, var(--tone) 28%, var(--ui-border));
  border-radius: 1.15rem;
  background:
    radial-gradient(circle at 80% 18%, color-mix(in oklab, var(--tone) 18%, transparent), transparent 8rem),
    color-mix(in oklab, var(--ui-bg-page) 72%, var(--ui-bg-elevated) 28%);
  padding: 1rem;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.brand-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklab, var(--tone) 55%, var(--ui-border));
  box-shadow: 0 18px 50px color-mix(in oklab, var(--tone) 12%, transparent);
}

.brand-icon-wrap {
  display: grid;
  width: 4rem;
  height: 4rem;
  place-items: center;
  border-radius: 0;
  background: transparent;
}

.brand-icon {
  display: block;
  width: 3.35rem;
  height: 3.35rem;
  border-radius: 0;
  object-fit: contain;
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.brand-icon-openai {
  filter: invert(1);
}

.brand-icon-claude {
  width: 3.55rem;
  height: 3.55rem;
}

.brand-icon-gemini {
  width: 3.45rem;
  height: 3.45rem;
}

:global(html:not(.dark) .ai-ip-check-page .brand-icon-openai) {
  filter: none;
}

.brand-card-copy {
  min-width: 0;
}

.brand-card-copy span {
  display: block;
  color: var(--ui-text-muted);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.brand-card-copy strong {
  display: block;
  margin-top: 0.15rem;
  color: var(--ui-text-primary);
  font-size: 1.15rem;
}

.brand-card-copy small {
  display: block;
  margin-top: 0.55rem;
  color: var(--ui-text-secondary);
  font-size: 0.82rem;
  line-height: 1.6;
}

.brand-card em {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  border-radius: 999px;
  background: var(--tone-soft);
  color: var(--tone);
  font-size: 0.78rem;
  font-style: normal;
  font-weight: 800;
  padding: 0.28rem 0.72rem;
}

@media (max-width: 719px) {
  .ai-ip-check-page {
    width: 100%;
    max-width: 100vw;
    padding-bottom: 2.5rem;
    overflow-x: hidden;
  }

  .ai-ip-check-page * {
    box-sizing: border-box;
  }

  .ai-ip-check-page > div {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .hero-shell,
  .product-hero-grid,
  .hero-copy,
  .passport-card {
    min-width: 0;
    max-width: 100%;
  }

  .hero-shell {
    border-radius: 1.25rem;
  }

  .hero-inner {
    padding: 1.1rem;
  }

  .hero-copy h1,
  .hero-copy p {
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .hero-copy p {
    display: none;
  }

  .search-console {
    grid-template-columns: minmax(0, 1fr);
  }

  .console-input,
  .console-btn {
    width: 100%;
    min-width: 0;
  }

  .passport-card {
    min-height: 14rem;
  }

  .passport-score .score-orbit {
    width: 10.5rem;
    height: 10.5rem;
  }

  .verdict-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.45rem;
  }

  .verdict-stats div {
    border-radius: 0.78rem;
    padding: 0.6rem 0.5rem;
  }

  .verdict-stats span {
    font-size: 0.66rem;
    line-height: 1.25;
  }

  .verdict-stats strong {
    margin-top: 0.28rem;
    font-size: 0.82rem;
    line-height: 1.25;
  }

  .product-signal-strip {
    margin-top: 0.9rem;
    padding: 0.75rem;
  }

  .product-signal-copy strong {
    font-size: 0.76rem;
  }

  .product-signal-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .product-signal-chip {
    width: 100%;
    justify-content: space-between;
  }

  .product-signal-chip span {
    max-width: none;
  }

  .risk-guidance-panel {
    padding: 1rem;
  }

  .risk-guidance-grid {
    gap: 0.7rem;
  }

  .brand-board {
    padding: 1rem;
  }

  .brand-board-head p,
  .detail-signal-grid {
    display: none;
  }

  .notes-accordion {
    margin-top: 1rem;
    width: calc(100vw - 2rem);
    max-width: 100%;
    overflow: hidden;
  }

  .notes-accordion > summary {
    padding: 0.9rem 1rem;
  }

  .notes-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.85rem;
    max-width: 100%;
    padding: 0 1rem 1rem;
  }

  .note {
    min-width: 0;
    max-width: 100%;
  }

  .note h3,
  .note p {
    overflow-wrap: anywhere;
  }

  .note p {
    font-size: 0.8rem;
    line-height: 1.65;
    max-width: 100%;
    white-space: normal;
    word-break: break-word;
  }

  .brand-card {
    min-height: 8.6rem;
    padding: 0.9rem;
  }

  .brand-icon-wrap {
    width: 3.2rem;
    height: 3.2rem;
  }

  .brand-icon,
  .brand-icon-claude,
  .brand-icon-gemini {
    width: 2.8rem;
    height: 2.8rem;
  }

  .brand-card-copy strong {
    font-size: 1.02rem;
  }

  .brand-card-copy small {
    margin-top: 0.4rem;
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .brand-card em {
    right: 0.8rem;
    bottom: 0.8rem;
  }
}
</style>
