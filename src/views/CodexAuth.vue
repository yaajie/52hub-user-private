<template>
  <div class="codex-auth-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="mb-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="hero-copy-panel interactive-panel relative overflow-hidden rounded-2xl border theme-border theme-panel p-6 sm:p-8">
          <div class="hero-runtime-badge mb-5 inline-flex items-center gap-2 rounded-full border theme-border theme-surface-soft px-3 py-1">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ui-success)] opacity-60"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-[var(--ui-success)]"></span>
            </span>
            <span class="font-mono text-xs theme-text-muted">aikaitong.tools/codex-auth · local</span>
          </div>

          <h1 class="codex-title max-w-3xl text-3xl font-black leading-tight theme-text-primary sm:text-4xl">
            Codex <span :class="['tech-gradient-text', { 'tech-gradient-text-dark': isDarkTheme }]">Auth JSON</span> 本地生成器
          </h1>
          <p class="hero-subcopy mt-4 max-w-2xl text-sm leading-7 theme-text-secondary sm:text-base">
            把已登录 ChatGPT session 转成 Codex CLI 可用的 auth.json，解决登录 Codex 时卡在海外手机号码验证的问题，减少找接码、等验证码的麻烦。全程浏览器本地处理，不上传。
          </p>

          <div class="metric-grid mt-6 grid gap-3 sm:grid-cols-3">
            <div class="metric-tile">
              <span class="metric-k">本地</span>
              <strong>0 上传</strong>
              <small>无后端接收</small>
            </div>
            <div class="metric-tile">
              <span class="metric-k">文件</span>
              <strong>Blob 下载</strong>
              <small>浏览器本地文件</small>
            </div>
            <div class="metric-tile">
              <span class="metric-k">有效期</span>
              <strong>不承诺长期</strong>
              <small>取决于 session 状态</small>
            </div>
          </div>

          <div class="flow-rail mt-6" :style="{ '--flow-progress': pipelineProgress }">
            <div
              v-for="step in pipelineSteps"
              :key="step.key"
              :class="['flow-step', `flow-${step.state}`]"
            >
              <span class="flow-dot"></span>
              <span>{{ step.label }}</span>
              <small>{{ step.detail }}</small>
            </div>
          </div>
        </section>

        <section
          class="visual-panel interactive-panel relative hidden min-h-[380px] overflow-hidden rounded-2xl border theme-border theme-panel lg:block"
          :style="heroPointerStyle"
          @pointermove="trackHeroPointer"
          @pointerleave="resetHeroPointer"
        >
          <div :class="['hero-visual-image', { 'hero-visual-image-dark': isDarkTheme }]" aria-hidden="true"></div>
          <div class="pointer-glow"></div>
          <div class="visual-orbit visual-orbit-one"></div>
          <div class="visual-orbit visual-orbit-two"></div>
          <div :class="['visual-gradient', { 'visual-gradient-dark': isDarkTheme }]"></div>
          <div :class="['visual-mesh', { 'visual-mesh-dark': isDarkTheme }]"></div>
          <div :class="['scan-beam', { 'scan-beam-dark': isDarkTheme }]"></div>

          <div class="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <div class="visual-chip">
              <span class="theme-status-dot" style="--dot: var(--ui-success)"></span>
              <span>local transform</span>
            </div>
            <div class="visual-chip hidden sm:inline-flex">
              <span :class="currentAuthJson ? 'bg-[var(--ui-success)]' : 'bg-amber-400'" class="h-2 w-2 rounded-full"></span>
              <span>{{ currentAuthJson ? 'auth.json ready' : 'waiting input' }}</span>
            </div>
          </div>

          <div class="signal-stack absolute left-4 top-16 hidden w-[min(18rem,calc(100%-2rem))] space-y-2 md:block">
            <div
              v-for="signal in credentialSignals"
              :key="signal.key"
              :class="['signal-row', `signal-${signal.state}`]"
            >
              <span class="signal-led"></span>
              <span class="signal-label">{{ signal.label }}</span>
              <strong>{{ signal.value }}</strong>
            </div>
          </div>

          <div class="visual-console absolute inset-x-4 bottom-4 rounded-2xl p-4 backdrop-blur-md">
            <div class="mb-3 flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-[var(--ui-danger)]"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-[var(--ui-warning)]"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-[var(--ui-success)]"></span>
              </div>
              <span class="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-amber-100/70">browser only</span>
            </div>
            <div class="grid gap-2 font-mono text-xs sm:grid-cols-2">
              <div class="terminal-line">
                <span class="text-amber-300">$</span>
                <span>read session JSON</span>
              </div>
              <div class="terminal-line">
                <span class="text-[var(--ui-success)]">›</span>
                <span>no upload / no storage</span>
              </div>
              <div class="terminal-line">
                <span class="text-amber-300">$</span>
                <span>build auth.json</span>
              </div>
              <div class="terminal-line">
                <span :class="currentAuthJson ? 'text-[var(--ui-success)]' : 'text-amber-300'">›</span>
                <span>{{ currentAuthJson ? 'copy or download' : 'paste to generate' }}</span>
                <span class="terminal-cursor text-amber-300">▍</span>
              </div>
            </div>
          </div>
        </section>
      </header>

      <section
        :class="[
          'boundary-note mb-5 rounded-2xl border border-amber-300/70 bg-amber-50 px-5 py-4 text-[0.95rem] leading-7 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100',
          { 'boundary-note-dark': isDarkTheme },
        ]"
      >
        <strong class="text-amber-950 dark:text-amber-200">边界提示：</strong>
        本工具仅本地生成，不保证长期有效。仅在浏览器本地把 ChatGPT session JSON 转成 Codex auth.json，本站不上传、不保存、不代管凭据。生成结果是否可用取决于 OpenAI session 状态和 Codex 客户端格式。
      </section>

      <div class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.5fr)] xl:items-stretch">
        <section class="interactive-panel rounded-2xl border theme-border theme-panel overflow-hidden">
          <div class="flex flex-col gap-5 border-b theme-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div class="min-w-0">
              <h2 class="text-xl font-bold theme-text-primary sm:text-2xl">粘贴 ChatGPT session JSON</h2>
              <p class="mt-1 text-[0.95rem] theme-text-muted">先在同一浏览器打开 session 端点，复制返回的 JSON 后粘贴到这里。</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="signal in credentialSignals"
                  :key="`field-${signal.key}`"
                  :class="['field-chip', `field-${signal.state}`]"
                >
                  <span class="field-dot"></span>
                  {{ signal.label }} · {{ signal.value }}
                </span>
              </div>
            </div>
            <div class="session-action-stack">
              <p class="session-login-hint">先在同一浏览器登录 ChatGPT 账号，再获取 session JSON。</p>
              <div class="session-action-row">
                <a
                  href="https://chatgpt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="session-link-button secondary"
                >
                  <ArrowTopRightOnSquareIcon class="h-4 w-4" aria-hidden="true" />
                  先登录 ChatGPT
                </a>
                <a
                  href="https://chatgpt.com/api/auth/session"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="session-link-button primary"
                >
                  <ArrowTopRightOnSquareIcon class="h-4 w-4" aria-hidden="true" />
                  获取 session JSON
                </a>
              </div>
            </div>
          </div>

          <div class="p-5 sm:p-6">
            <textarea
              v-model="sessionRaw"
              spellcheck="false"
              autocomplete="off"
              class="min-h-[340px] w-full resize-y rounded-xl border theme-border theme-panel-soft p-5 font-mono text-[0.95rem] leading-7 theme-text-primary outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20"
              placeholder="在此粘贴 ChatGPT session JSON..."
              @input="scheduleParse"
            ></textarea>

            <div class="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div class="flex flex-col gap-2 sm:flex-row">
                <button class="action-button secondary" type="button" @click="pasteFromClipboard">
                  <ClipboardDocumentIcon class="h-4 w-4" aria-hidden="true" />
                  从剪贴板粘贴
                </button>
                <button class="action-button secondary" type="button" @click="loadSampleSession">
                  <SparklesIcon class="h-4 w-4" aria-hidden="true" />
                  示例预览
                </button>
                <button class="action-button secondary" type="button" @click="clearInput">
                  <XMarkIcon class="h-4 w-4" aria-hidden="true" />
                  清空
                </button>
              </div>

              <div :class="['status-pill', statusClass]" role="status" aria-live="polite">
                <span>{{ statusText }}</span>
                <small>{{ parseMessage }}</small>
              </div>
            </div>
          </div>
        </section>

        <aside class="space-y-5 xl:h-full">
          <section class="interactive-panel flex h-full flex-col rounded-2xl border theme-border theme-panel overflow-hidden">
            <div class="flex items-center justify-between gap-4 border-b theme-border px-5 py-5 sm:px-6">
              <div>
                <h2 class="text-xl font-bold theme-text-primary sm:text-2xl">账号识别</h2>
                <p class="mt-1 text-[0.95rem] theme-text-muted">仅展示 session 中可识别的非密钥摘要。</p>
              </div>
              <span class="rounded-full border theme-border theme-surface-soft px-3 py-1 font-mono text-xs theme-text-muted">
                本地识别
              </span>
            </div>
            <div class="account-summary-grid grid flex-1 gap-3 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-1 2xl:grid-cols-2">
              <div class="summary-cell">
                <span>名称</span>
                <strong>{{ displayValue(profile?.name) }}</strong>
              </div>
              <div class="summary-cell">
                <span>邮箱</span>
                <strong>{{ displayValue(profile?.email) }}</strong>
              </div>
              <div class="summary-cell">
                <span>套餐</span>
                <strong>{{ displayValue(profile?.planType) }}</strong>
              </div>
              <div class="summary-cell">
                <span>账号 ID</span>
                <strong class="font-mono text-xs break-all">{{ displayValue(profile?.accountId) }}</strong>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section class="mt-5 rounded-2xl border theme-border theme-panel overflow-hidden">
        <div class="flex flex-col gap-4 border-b theme-border px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-xl font-bold theme-text-primary sm:text-2xl">生成结果</h2>
            <p class="mt-1 text-[0.95rem] theme-text-muted">auth.json 会在下方实时生成，可复制或下载。</p>
          </div>
          <div class="flex flex-col gap-2 sm:flex-row">
            <button class="action-button secondary" type="button" :disabled="!currentAuthJson" @click="copyAuthJson">
              <ClipboardDocumentCheckIcon class="h-4 w-4" aria-hidden="true" />
              复制 auth.json
            </button>
            <button class="action-button primary" type="button" :disabled="!currentAuthJson" @click="downloadAuthJson">
              <ArrowDownTrayIcon class="h-4 w-4" aria-hidden="true" />
              下载 auth.json
            </button>
          </div>
        </div>

        <div v-if="currentAuthJson" class="command-strip mx-5 mt-5">
          <span>下一步</span>
          <code>下载 auth.json 后，按下方“放置路径”复制对应系统路径或命令，把文件放到 Codex 配置目录。</code>
        </div>
        <pre class="json-output whitespace-pre-wrap break-all px-5 py-5 font-mono text-sm leading-7 theme-text-primary sm:px-6">{{ authOutput }}</pre>
        <p v-if="copyStatus" :class="['border-t theme-border px-5 py-3 text-sm', copyStatusType === 'ok' ? 'text-[var(--ui-success)]' : 'text-rose-700 dark:text-rose-300']">
          {{ copyStatus }}
        </p>
      </section>

      <CodexAuthPlacementGuide />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useTheme } from '../utils/theme'
import CodexAuthPlacementGuide from '../components/codex/CodexAuthPlacementGuide.vue'

type LooseSession = Record<string, any>
type SignalState = 'idle' | 'active' | 'ok' | 'warn' | 'error'
type FlowState = 'idle' | 'active' | 'complete' | 'warn' | 'error'

type SessionProfile = {
  name: string
  email: string
  accountId: string
  accessToken: string
  idToken: string
  userId: string
  planType: string
  expiresAt: string
}

const sessionRaw = ref('')
const currentAuthJson = ref('')
const profile = ref<SessionProfile | null>(null)
const statusText = ref('等待输入')
const parseMessage = ref('粘贴 session JSON 后会自动生成 auth.json。')
const statusType = ref<'idle' | 'ok' | 'warn' | 'error'>('idle')
const copyStatus = ref('')
const copyStatusType = ref<'ok' | 'error'>('ok')
const parseTimer = ref<number | null>(null)
const { theme } = useTheme()

const authOutput = computed(() => currentAuthJson.value || '等待生成...')
const statusClass = computed(() => `status-${statusType.value}`)
const rawLength = computed(() => sessionRaw.value.trim().length)
const isDarkTheme = computed(() => theme.value === 'dark')
const heroPointerX = ref(72)
const heroPointerY = ref(34)
const heroPointerActive = ref(false)

const heroPointerStyle = computed(() => ({
  '--hero-pointer-x': `${heroPointerX.value}%`,
  '--hero-pointer-y': `${heroPointerY.value}%`,
  '--hero-pointer-alpha': heroPointerActive.value ? '1' : '0.58',
}))

const credentialSignals = computed(() => {
  const rawReady = rawLength.value > 0
  const nextProfile = profile.value
  const jsonState: SignalState = !rawReady ? 'idle' : statusType.value === 'error' && !nextProfile ? 'error' : 'ok'
  const requiredState = (value: string): SignalState => {
    if (value) return 'ok'
    if (!rawReady) return 'idle'
    if (statusType.value === 'error') return 'error'
    return 'active'
  }

  return [
    {
      key: 'json',
      label: 'JSON',
      value: !rawReady ? '待输入' : jsonState === 'error' ? '格式异常' : '已读取',
      state: jsonState,
    },
    {
      key: 'access',
      label: 'access_token',
      value: nextProfile?.accessToken ? '已识别' : rawReady ? '未识别' : '待扫描',
      state: requiredState(nextProfile?.accessToken || ''),
    },
    {
      key: 'account',
      label: 'account_id',
      value: nextProfile?.accountId ? '已识别' : rawReady ? '未识别' : '待扫描',
      state: requiredState(nextProfile?.accountId || ''),
    },
    {
      key: 'id-token',
      label: 'id_token',
      value: nextProfile?.idToken ? '原始返回' : currentAuthJson.value ? '本地兜底' : '可选',
      state: nextProfile?.idToken ? 'ok' : currentAuthJson.value ? 'warn' : rawReady ? 'active' : 'idle',
    },
  ]
})

const pipelineSteps = computed(() => {
  const rawReady = rawLength.value > 0
  const nextProfile = profile.value
  const hasRequiredFields = Boolean(nextProfile?.accessToken && nextProfile.accountId)

  return [
    {
      key: 'input',
      label: '输入',
      detail: rawReady ? `${rawLength.value} chars` : '等待 JSON',
      state: rawReady ? 'complete' : 'active',
    },
    {
      key: 'parse',
      label: '解析',
      detail: statusType.value === 'error' ? '校验失败' : nextProfile ? '对象可读' : '本地解析',
      state: statusType.value === 'error' ? 'error' : nextProfile ? 'complete' : rawReady ? 'active' : 'idle',
    },
    {
      key: 'extract',
      label: '抽取',
      detail: hasRequiredFields ? '凭据齐全' : 'token / account',
      state: hasRequiredFields ? 'complete' : statusType.value === 'error' ? 'error' : rawReady ? 'active' : 'idle',
    },
    {
      key: 'export',
      label: '导出',
      detail: currentAuthJson.value ? '复制 / 下载' : 'auth.json',
      state: currentAuthJson.value ? (nextProfile?.idToken ? 'complete' : 'warn') : hasRequiredFields ? 'active' : 'idle',
    },
  ] satisfies Array<{ key: string; label: string; detail: string; state: FlowState }>
})

const pipelineProgress = computed(() => {
  const score = pipelineSteps.value.reduce((total, step) => {
    if (step.state === 'complete' || step.state === 'warn') return total + 1
    if (step.state === 'active') return total + 0.45
    if (step.state === 'error') return total + 0.65
    return total
  }, 0)
  return `${Math.max(8, Math.round((score / pipelineSteps.value.length) * 100))}%`
})

const sampleSessionJson = JSON.stringify({
  user: {
    id: 'user_demo_aikaitong',
    name: 'AI开通 Demo',
    email: 'demo@aikaitong.local',
  },
  accessToken: 'sample_access_token_for_local_preview',
  account: {
    id: 'acct_aikaitong_demo',
    plan_type: 'plus',
  },
  expires: '2026-12-31T00:00:00.000Z',
}, null, 2)

function firstNonEmpty(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }
  return ''
}

function safeString(value: unknown) {
  return typeof value === 'string' ? value : ''
}

function displayValue(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : '未返回'
}

function getAccessToken(session: LooseSession) {
  return firstNonEmpty(
    session.accessToken,
    session.access_token,
    session.tokens?.accessToken,
    session.tokens?.access_token,
  )
}

function getIdToken(session: LooseSession) {
  return firstNonEmpty(
    session.idToken,
    session.id_token,
    session.tokens?.idToken,
    session.tokens?.id_token,
    session.token?.idToken,
    session.token?.id_token,
    session.credentials?.id_token,
  )
}

function getAccountId(session: LooseSession) {
  return firstNonEmpty(
    session.account?.id,
    session.account_id,
    session.accountId,
    session.user?.id,
    session.user_id,
    session.userId,
  )
}

function getUserId(session: LooseSession) {
  return firstNonEmpty(
    session.user?.id,
    session.user_id,
    session.userId,
    session.chatgptUserId,
    session.providerSpecificData?.chatgptUserId,
    session.providerSpecificData?.chatgpt_user_id,
  )
}

function getPlanType(session: LooseSession) {
  return firstNonEmpty(
    session.account?.planType,
    session.account?.plan_type,
    session.planType,
    session.plan_type,
    session.providerSpecificData?.chatgptPlanType,
    session.providerSpecificData?.chatgpt_plan_type,
    session.credentials?.plan_type,
  )
}

function getExpiresAt(session: LooseSession) {
  return firstNonEmpty(
    session.expires,
    session.expiresAt,
    session.expired,
    session.expires_at,
  )
}

function sanitizeSession(session: unknown): SessionProfile | null {
  if (!session || typeof session !== 'object' || Array.isArray(session)) {
    return null
  }

  const data = session as LooseSession
  const user = data.user && typeof data.user === 'object' ? data.user : {}

  return {
    name: safeString(user.name),
    email: safeString(user.email),
    accountId: getAccountId(data),
    accessToken: getAccessToken(data),
    idToken: getIdToken(data),
    userId: getUserId(data),
    planType: getPlanType(data),
    expiresAt: getExpiresAt(data),
  }
}

function encodeBase64UrlJson(value: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(value))
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function epochSecondsFromValue(value: string) {
  if (!value) return 0

  const numeric = Number(value)
  if (Number.isFinite(numeric)) {
    return Math.trunc(numeric > 1e11 ? numeric / 1000 : numeric)
  }

  const parsed = Date.parse(value)
  return Number.isFinite(parsed) ? Math.trunc(parsed / 1000) : 0
}

function buildSyntheticIdToken(nextProfile: SessionProfile) {
  if (!nextProfile.accountId) return ''

  const now = Math.trunc(Date.now() / 1000)
  const expires = epochSecondsFromValue(nextProfile.expiresAt) || now + 90 * 24 * 60 * 60
  const authInfo: Record<string, string> = {
    chatgpt_account_id: nextProfile.accountId,
  }

  if (nextProfile.planType) {
    authInfo.chatgpt_plan_type = nextProfile.planType
  }
  if (nextProfile.userId) {
    authInfo.chatgpt_user_id = nextProfile.userId
    authInfo.user_id = nextProfile.userId
  }

  const payload: Record<string, unknown> = {
    iat: now,
    exp: expires,
    'https://api.openai.com/auth': authInfo,
  }

  if (nextProfile.email) {
    payload.email = nextProfile.email
  }

  return `${encodeBase64UrlJson({ alg: 'none', typ: 'JWT', cpa_synthetic: true })}.${encodeBase64UrlJson(payload)}.synthetic`
}

function buildAuthJson(nextProfile: SessionProfile) {
  const idToken = nextProfile.idToken || buildSyntheticIdToken(nextProfile)
  return JSON.stringify({
    auth_mode: 'chatgpt',
    OPENAI_API_KEY: null,
    tokens: {
      id_token: idToken,
      access_token: nextProfile.accessToken,
      refresh_token: '',
      account_id: nextProfile.accountId,
    },
    last_refresh: new Date().toISOString(),
  }, null, 2)
}

function resetState() {
  currentAuthJson.value = ''
  profile.value = null
  statusText.value = '等待输入'
  parseMessage.value = '粘贴 session JSON 后会自动生成 auth.json。'
  statusType.value = 'idle'
  copyStatus.value = ''
}

function trackHeroPointer(event: PointerEvent) {
  const target = event.currentTarget
  if (!(target instanceof HTMLElement)) return

  const rect = target.getBoundingClientRect()
  heroPointerX.value = Math.round(((event.clientX - rect.left) / rect.width) * 100)
  heroPointerY.value = Math.round(((event.clientY - rect.top) / rect.height) * 100)
  heroPointerActive.value = true
}

function resetHeroPointer() {
  heroPointerX.value = 72
  heroPointerY.value = 34
  heroPointerActive.value = false
}

function setError(message: string) {
  currentAuthJson.value = ''
  statusText.value = '无法生成'
  parseMessage.value = message
  statusType.value = 'error'
}

function parseSessionInput() {
  const raw = sessionRaw.value.trim()
  copyStatus.value = ''

  if (!raw) {
    resetState()
    return
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (error) {
    profile.value = null
    setError(error instanceof Error ? error.message : 'JSON 解析失败。')
    return
  }

  const nextProfile = sanitizeSession(parsed)
  profile.value = nextProfile

  if (!nextProfile) {
    setError('没有识别到可用的 session 对象。')
    return
  }

  const missing = [
    !nextProfile.accessToken ? 'access_token' : '',
    !nextProfile.accountId ? 'account_id' : '',
  ].filter(Boolean)

  if (missing.length) {
    setError(`缺少必要字段：${missing.join(' / ')}。请确认复制的是 ChatGPT session JSON。`)
    return
  }

  currentAuthJson.value = buildAuthJson(nextProfile)

  if (nextProfile.idToken) {
    statusText.value = '已生成'
    parseMessage.value = '已在本地生成 auth.json。'
    statusType.value = 'ok'
  } else {
    statusText.value = '已生成'
    parseMessage.value = 'session 未返回 id_token，已用账号信息本地生成兜底 token。'
    statusType.value = 'warn'
  }
}

function scheduleParse() {
  if (parseTimer.value) {
    window.clearTimeout(parseTimer.value)
  }
  parseTimer.value = window.setTimeout(parseSessionInput, 250)
}

async function pasteFromClipboard() {
  try {
    sessionRaw.value = await navigator.clipboard.readText()
    parseSessionInput()
  } catch {
    statusText.value = '剪贴板被拒绝'
    parseMessage.value = '浏览器未允许读取剪贴板，请手动粘贴。'
    statusType.value = 'error'
  }
}

function loadSampleSession() {
  sessionRaw.value = sampleSessionJson
  parseSessionInput()
}

function clearInput() {
  sessionRaw.value = ''
  resetState()
}

async function copyAuthJson() {
  if (!currentAuthJson.value) {
    parseSessionInput()
  }
  if (!currentAuthJson.value) {
    copyStatus.value = '还没有可复制的 auth.json。'
    copyStatusType.value = 'error'
    return
  }

  try {
    await navigator.clipboard.writeText(currentAuthJson.value)
    copyStatus.value = '已复制 auth.json。'
    copyStatusType.value = 'ok'
  } catch {
    copyStatus.value = '复制失败，请手动选中输出内容复制。'
    copyStatusType.value = 'error'
  }
}

function downloadAuthJson() {
  if (!currentAuthJson.value) {
    parseSessionInput()
  }
  if (!currentAuthJson.value) {
    copyStatus.value = '还没有可下载的 auth.json。'
    copyStatusType.value = 'error'
    return
  }

  const blob = new Blob([currentAuthJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'auth.json'
  link.click()
  URL.revokeObjectURL(url)
  copyStatus.value = '已生成下载文件。'
  copyStatusType.value = 'ok'
}

useHead({
  title: 'Codex Auth JSON 本地生成器 · ChatGPT session 转 auth.json - AI开通',
  meta: [
    {
      name: 'description',
      content: 'AI开通 Codex Auth JSON 本地生成器：解决登录 Codex 时卡在海外手机号码验证的问题，减少找接码、等验证码的麻烦；在浏览器本地把 ChatGPT session JSON 转成 Codex CLI 可用的 auth.json，不上传、不保存、不代管凭据。',
    },
    { property: 'og:title', content: 'Codex Auth JSON 本地生成器 · AI开通' },
    { property: 'og:description', content: '解决登录 Codex 时卡在海外手机号码验证的问题，减少找接码、等验证码的麻烦；页面本地转换 auth.json，不上传、不保存、不代管凭据。' },
    { property: 'og:url', content: 'https://aikaitong.com/tools/codex-auth' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://aikaitong.com/images/tools/codex-auth-hero-dark-v3.webp' },
  ],
  link: [
    { rel: 'canonical', href: 'https://aikaitong.com/tools/codex-auth' },
  ],
})
</script>

<style scoped>
.codex-auth-page {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.codex-auth-page::before,
.codex-auth-page::after {
  position: absolute;
  pointer-events: none;
  content: "";
  z-index: 0;
}

.codex-auth-page::before {
  inset: 0;
  background:
    radial-gradient(circle at 13% 8%, color-mix(in oklab, var(--ui-accent) 18%, transparent), transparent 28rem),
    radial-gradient(circle at 86% 16%, color-mix(in srgb, var(--ui-accent) 16%, transparent), transparent 30rem),
    radial-gradient(circle at 56% 104%, rgba(217, 119, 6, 0.12), transparent 28rem);
}

.codex-auth-page::after {
  inset: 0;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(242, 130, 15, 0.6) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242, 130, 15, 0.5) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(180deg, #000 0%, transparent 70%);
}

.codex-auth-page > .container {
  position: relative;
  z-index: 1;
}

.codex-auth-page :is(h1, h2, h3) {
  letter-spacing: 0;
}

.codex-title {
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.hero-subcopy,
.boundary-note {
  overflow-wrap: anywhere;
  text-wrap: pretty;
}

.interactive-panel {
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;
}

.interactive-panel:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 36%, var(--ui-border));
  box-shadow: 0 22px 70px color-mix(in oklab, var(--ui-accent) 15%, transparent);
  transform: translateY(-2px);
}

.hero-copy-panel {
  background:
    radial-gradient(circle at 16% 0%, color-mix(in oklab, var(--ui-accent-soft) 78%, transparent), transparent 20rem),
    radial-gradient(circle at 84% 16%, color-mix(in srgb, var(--ui-accent) 12%, transparent), transparent 18rem),
    color-mix(in oklab, var(--ui-bg-elevated) 94%, transparent);
}

.hero-copy-panel::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.18) 42%, transparent 64%);
  content: "";
  opacity: 0;
  transform: translateX(-38%);
  transition: opacity 220ms ease, transform 520ms ease;
}

.hero-copy-panel:hover::before {
  opacity: 1;
  transform: translateX(38%);
}

.hero-copy-panel > * {
  position: relative;
  z-index: 1;
}

.tech-gradient-text {
  background: linear-gradient(135deg, #f2820f 0%, #d97706 45%, #f59e0b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tech-gradient-text-dark {
  background-image: linear-gradient(135deg, #f2820f 0%, #fbbf24 45%, #f59e0b 100%);
}

.flow-rail {
  --flow-progress: 8%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.55rem;
  overflow: hidden;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-accent-soft) 72%, transparent), transparent),
    color-mix(in oklab, var(--ui-bg-soft) 74%, transparent);
  padding: 0.65rem;
}

.flow-rail::before,
.flow-rail::after {
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  top: 1.68rem;
  height: 1px;
  content: "";
}

.flow-rail::before {
  background: var(--ui-border);
}

.flow-rail::after {
  right: auto;
  width: var(--flow-progress);
  background: linear-gradient(90deg, var(--ui-accent), var(--ui-accent-hover), #d97706);
  box-shadow: 0 0 18px color-mix(in oklab, var(--ui-accent) 50%, transparent);
  transition: width 260ms ease;
}

.flow-step {
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.18rem;
  border: 1px solid var(--ui-border);
  border-radius: 0.75rem;
  background: color-mix(in oklab, var(--ui-bg-elevated) 82%, transparent);
  padding: 0.65rem 0.55rem 0.6rem;
  color: var(--ui-text-secondary);
  transition: border-color 180ms ease, transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
}

.flow-step:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 38%, var(--ui-border));
  box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--ui-accent) 18%, transparent);
  transform: translateY(-1px);
}

.flow-step span:not(.flow-dot) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--ui-text-primary);
}

.flow-step small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.68rem;
  color: var(--ui-text-muted);
}

.flow-dot {
  height: 0.62rem;
  width: 0.62rem;
  border-radius: 999px;
  background: var(--ui-border-strong);
  box-shadow: 0 0 0 4px var(--ui-bg-elevated);
}

.flow-active {
  border-color: color-mix(in oklab, var(--ui-accent) 42%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-accent-soft) 55%, var(--ui-bg-elevated));
}

.flow-active .flow-dot {
  background: var(--ui-accent);
  animation: codex-auth-pulse 1.3s ease-in-out infinite;
}

.flow-complete {
  border-color: color-mix(in oklab, var(--ui-success) 48%, var(--ui-border));
}

.flow-complete .flow-dot {
  background: var(--ui-success);
}

.flow-warn {
  border-color: color-mix(in oklab, var(--ui-warning) 52%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-warning-soft) 58%, var(--ui-bg-elevated));
}

.flow-warn .flow-dot {
  background: var(--ui-warning);
}

.flow-error {
  border-color: color-mix(in oklab, var(--ui-danger) 52%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-danger-soft) 58%, var(--ui-bg-elevated));
}

.flow-error .flow-dot {
  background: var(--ui-danger);
}

.visual-panel {
  --hero-pointer-x: 72%;
  --hero-pointer-y: 34%;
  --hero-pointer-alpha: 0.58;
  background:
    radial-gradient(circle at 72% 24%, rgba(242, 130, 15, 0.14), transparent 34%),
    radial-gradient(circle at 24% 78%, color-mix(in srgb, var(--ui-accent) 10%, transparent), transparent 32%),
    linear-gradient(180deg, rgba(248, 250, 252, 0.18), rgba(255, 255, 255, 0));
  cursor: crosshair;
}

.visual-panel:hover .hero-visual-image {
  transform: scale(1.025);
}

.visual-panel:hover .scan-beam {
  animation-duration: 3.2s;
}

.hero-visual-image {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  background-image: url('/images/tools/codex-auth-hero-light-v2.webp');
  background-position: center;
  background-size: cover;
  opacity: 0.68;
  filter: saturate(0.82) contrast(0.88) brightness(1.08) grayscale(0.04);
  transition: transform 420ms ease, filter 220ms ease, opacity 220ms ease;
}

.hero-visual-image-dark {
  background-image: url('/images/tools/codex-auth-hero-dark-v3.webp');
  opacity: 1;
  filter: saturate(1.08) contrast(1.08) brightness(0.96);
}

.pointer-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: calc(var(--hero-pointer-alpha) * 0.62);
  background:
    radial-gradient(circle at var(--hero-pointer-x) var(--hero-pointer-y), color-mix(in srgb, var(--ui-accent) 34%, transparent), transparent 14rem),
    radial-gradient(circle at calc(var(--hero-pointer-x) + 8%) calc(var(--hero-pointer-y) + 10%), rgba(242, 130, 15, 0.18), transparent 16rem);
  mix-blend-mode: screen;
  transition: opacity 180ms ease;
}

.visual-orbit {
  position: absolute;
  pointer-events: none;
  border: 1px solid color-mix(in srgb, var(--ui-accent) 20%, transparent);
  border-radius: 999px;
  opacity: 0.45;
  transform: rotate(-8deg);
}

.visual-orbit-one {
  right: 14%;
  top: 20%;
  height: 11rem;
  width: 20rem;
  animation: codex-auth-orbit 8s ease-in-out infinite;
}

.visual-orbit-two {
  right: 8%;
  bottom: 21%;
  height: 8rem;
  width: 15rem;
  animation: codex-auth-orbit 9.5s ease-in-out infinite reverse;
}

.visual-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(248, 250, 252, 0.08), rgba(248, 250, 252, 0.1) 70%, rgba(248, 250, 252, 0.24)),
    linear-gradient(90deg, rgba(248, 250, 252, 0.14), rgba(248, 250, 252, 0.04) 44%, rgba(248, 250, 252, 0.2));
}

.visual-gradient-dark {
  background:
    linear-gradient(180deg, rgba(2, 6, 23, 0.02), rgba(2, 6, 23, 0.22) 72%, rgba(2, 6, 23, 0.56)),
    linear-gradient(90deg, rgba(2, 6, 23, 0.16), transparent 48%, rgba(2, 6, 23, 0.12));
}

.visual-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.13;
  background-image:
    linear-gradient(color-mix(in srgb, var(--ui-accent) 22%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--ui-accent) 18%, transparent) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(180deg, transparent, #000 20%, #000 78%, transparent);
}

.visual-mesh-dark {
  opacity: 0.24;
}

.scan-beam {
  position: absolute;
  left: -20%;
  top: 0;
  height: 100%;
  width: 34%;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--ui-accent) 12%, transparent), transparent);
  transform: skewX(-14deg);
  animation: codex-auth-scan 4.8s ease-in-out infinite;
}

.scan-beam-dark {
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--ui-accent) 22%, transparent), transparent);
}

.visual-chip {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 0.45rem;
  border: 1px solid rgba(242, 130, 15, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
  padding: 0.45rem 0.72rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.72rem;
  color: #475569;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(12px);
}

.visual-console {
  border: 1px solid rgba(242, 130, 15, 0.16);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 22px 62px rgba(15, 23, 42, 0.12);
  color: #475569;
}

.signal-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid rgba(242, 130, 15, 0.14);
  border-radius: 0.8rem;
  background: rgba(255, 255, 255, 0.62);
  padding: 0.55rem 0.65rem;
  color: #64748b;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(12px);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.signal-row:hover {
  border-color: rgba(242, 130, 15, 0.28);
  background: rgba(255, 255, 255, 0.76);
  transform: translateX(2px);
}

.signal-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.7rem;
}

.signal-row strong {
  font-size: 0.72rem;
  color: #334155;
}

.signal-led {
  height: 0.55rem;
  width: 0.55rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.8);
}

.signal-ok .signal-led {
  background: var(--ui-success);
  box-shadow: 0 0 18px color-mix(in srgb, var(--ui-success) 68%, transparent);
}

.signal-warn .signal-led,
.signal-active .signal-led {
  background: var(--ui-warning);
  box-shadow: 0 0 18px color-mix(in srgb, var(--ui-warning) 50%, transparent);
}

.signal-error .signal-led {
  background: var(--ui-danger);
  box-shadow: 0 0 18px color-mix(in srgb, var(--ui-danger) 58%, transparent);
}

.terminal-line {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
  color: #475569;
}

.terminal-line span:last-child {
  min-width: 0;
  overflow-wrap: anywhere;
}

.terminal-cursor {
  animation: codex-auth-blink 1s steps(2, start) infinite;
}

:global(.dark .visual-panel) {
  background:
    radial-gradient(circle at 72% 24%, rgba(242, 130, 15, 0.22), transparent 34%),
    radial-gradient(circle at 24% 78%, color-mix(in srgb, var(--ui-accent) 14%, transparent), transparent 32%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0));
}

:global(.dark .hero-visual-image) {
  opacity: 1;
  filter: saturate(0.86) contrast(0.9) brightness(0.88);
}

:global(.dark .visual-chip) {
  border-color: color-mix(in srgb, var(--ui-accent) 22%, transparent);
  background: rgba(2, 6, 23, 0.58);
  color: rgba(248, 250, 252, 0.92);
  box-shadow: 0 18px 44px rgba(2, 6, 23, 0.32);
}

:global(.dark .visual-console) {
  border-color: color-mix(in srgb, var(--ui-accent) 20%, transparent);
  background: rgba(15, 23, 42, 0.68);
  box-shadow: 0 24px 72px rgba(0, 0, 0, 0.34);
  color: rgba(226, 232, 240, 0.92);
}

:global(.dark .signal-row) {
  border-color: color-mix(in srgb, var(--ui-accent) 16%, transparent);
  background: rgba(2, 6, 23, 0.58);
  color: rgba(226, 232, 240, 0.78);
  box-shadow: 0 18px 44px rgba(2, 6, 23, 0.26);
}

:global(.dark .signal-row:hover) {
  border-color: color-mix(in srgb, var(--ui-accent) 32%, transparent);
  background: rgba(2, 6, 23, 0.68);
}

:global(.dark .signal-row strong) {
  color: rgba(248, 250, 252, 0.92);
}

:global(.dark .terminal-line) {
  color: rgba(226, 232, 240, 0.86);
}

.metric-tile,
.summary-cell {
  border: 1px solid var(--ui-border);
  background: color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
  border-radius: 0.875rem;
}

.summary-cell {
  display: flex;
  height: 100%;
  min-height: 6.4rem;
  flex-direction: column;
  justify-content: center;
}

.account-summary-grid {
  grid-auto-rows: minmax(0, 1fr);
}

.metric-tile {
  min-width: 0;
  padding: 1.08rem;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.metric-tile:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 38%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-accent-soft) 42%, var(--ui-bg-soft));
  box-shadow: 0 14px 40px color-mix(in oklab, var(--ui-accent) 12%, transparent);
  transform: translateY(-1px);
}

.metric-tile strong,
.summary-cell strong {
  display: block;
  margin-top: 0.35rem;
  color: var(--ui-text-primary);
  font-size: 1.04rem;
  line-height: 1.35;
}

.metric-tile small,
.summary-cell span {
  color: var(--ui-text-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

.metric-k {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 36%, transparent);
  padding: 0.1rem 0.45rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.76rem;
  font-weight: 900;
  color: var(--ui-accent);
}

.field-chip {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  gap: 0.42rem;
  border: 1px solid var(--ui-border);
  border-radius: 999px;
  background: color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
  padding: 0.34rem 0.68rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--ui-text-secondary);
}

.field-dot {
  height: 0.42rem;
  width: 0.42rem;
  flex: 0 0 auto;
  border-radius: 999px;
  background: var(--ui-border-strong);
}

.field-ok {
  border-color: color-mix(in oklab, var(--ui-success) 44%, var(--ui-border));
  color: var(--ui-success);
}

.field-ok .field-dot {
  background: var(--ui-success);
}

.field-warn,
.field-active {
  border-color: color-mix(in oklab, var(--ui-warning) 44%, var(--ui-border));
  color: var(--ui-warning);
}

.field-warn .field-dot,
.field-active .field-dot {
  background: var(--ui-warning);
}

.field-error {
  border-color: color-mix(in oklab, var(--ui-danger) 44%, var(--ui-border));
  color: var(--ui-danger);
}

.field-error .field-dot {
  background: var(--ui-danger);
}

.summary-cell {
  padding: 1.05rem 1.1rem;
}

.session-action-stack {
  display: flex;
  flex: 1 1 18rem;
  flex-direction: column;
  gap: 0.75rem;
  width: min(100%, 24rem);
  max-width: 24rem;
}

.session-login-hint {
  border: 1px solid color-mix(in oklab, var(--ui-warning) 30%, var(--ui-border));
  border-radius: 0.75rem;
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-warning-soft) 72%, transparent), transparent),
    color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
  padding: 0.68rem 0.82rem;
  color: var(--ui-text-secondary);
  font-size: 0.86rem;
  font-weight: 800;
  line-height: 1.55;
}

.session-action-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.session-link-button {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border-radius: 0.875rem;
  padding: 0.65rem 0.9rem;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 900;
  line-height: 1.25;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}

.session-link-button svg {
  flex: 0 0 auto;
  transition: transform 180ms ease;
}

.session-link-button:hover {
  box-shadow: 0 12px 30px color-mix(in oklab, var(--ui-accent) 13%, transparent);
  transform: translateY(-1px);
}

.session-link-button:hover svg {
  transform: translateX(1px) scale(1.04);
}

.session-link-button.primary {
  border: 1px solid color-mix(in oklab, var(--ui-accent) 50%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-accent-soft) 70%, var(--ui-bg-elevated));
  color: var(--ui-accent);
}

.session-link-button.secondary {
  border: 1px solid color-mix(in oklab, var(--ui-success) 36%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-success-soft) 72%, var(--ui-bg-elevated));
  color: var(--ui-success);
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.75rem;
  border-radius: 0.875rem;
  padding: 0.65rem 1.1rem;
  font-size: 0.92rem;
  font-weight: 700;
  transition: transform 180ms ease, opacity 180ms ease, background 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.action-button svg {
  transition: transform 180ms ease;
}

.action-button:hover:not(:disabled) {
  box-shadow: 0 12px 30px color-mix(in oklab, var(--ui-accent) 13%, transparent);
  transform: translateY(-1px);
}

.action-button:hover:not(:disabled) svg {
  transform: translateX(1px) scale(1.04);
}

.action-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.action-button.primary {
  border: 1px solid rgba(242, 130, 15, 0.55);
  background: linear-gradient(135deg, var(--ui-accent), var(--ui-accent-hover));
  color: white;
}

.action-button.secondary {
  border: 1px solid var(--ui-border);
  background: color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
  color: var(--ui-text-primary);
}

.boundary-note {
  background:
    linear-gradient(135deg, rgba(245, 158, 11, 0.13), rgba(242, 130, 15, 0.06)),
    rgba(255, 251, 235, 0.92);
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.boundary-note:hover {
  border-color: rgba(245, 158, 11, 0.86);
  box-shadow: 0 16px 44px rgba(245, 158, 11, 0.12);
  transform: translateY(-1px);
}

.boundary-note-dark {
  background:
    linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(242, 130, 15, 0.08)),
    rgba(120, 53, 15, 0.16);
}

.status-pill {
  display: flex;
  min-height: 2.75rem;
  flex-direction: column;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--ui-border);
  padding: 0.55rem 1rem;
  font-size: 0.82rem;
}

.status-pill span {
  font-weight: 800;
}

.status-pill small {
  color: var(--ui-text-muted);
}

.status-idle {
  background: color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
}

.status-ok {
  border-color: color-mix(in oklab, var(--ui-success) 45%, transparent);
  background: var(--ui-success-soft);
}

.status-ok span {
  color: var(--ui-success);
}

.status-warn {
  border-color: color-mix(in oklab, var(--ui-warning) 48%, transparent);
  background: var(--ui-warning-soft);
}

.status-warn span {
  color: var(--ui-warning);
}

.status-error {
  border-color: color-mix(in oklab, var(--ui-danger) 48%, transparent);
  background: var(--ui-danger-soft);
}

.status-error span {
  color: var(--ui-danger);
}

.json-output {
  min-height: 240px;
  max-height: 520px;
  overflow: auto;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent),
    rgba(2, 6, 23, 0.18);
}

.command-strip {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.35rem;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 32%, var(--ui-border));
  border-radius: 0.9rem;
  background: color-mix(in oklab, var(--ui-accent-soft) 52%, var(--ui-bg-elevated));
  padding: 0.85rem 1rem;
}

.command-strip span {
  color: var(--ui-text-muted);
  font-size: 0.84rem;
  font-weight: 800;
}

.command-strip code {
  color: var(--ui-text-primary);
  overflow-wrap: anywhere;
  font-size: 0.9rem;
}

@keyframes codex-auth-blink {
  0%, 48% {
    opacity: 1;
  }
  49%, 100% {
    opacity: 0;
  }
}

@keyframes codex-auth-pulse {
  0%, 100% {
    box-shadow: 0 0 0 4px var(--ui-bg-elevated), 0 0 0 transparent;
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 4px var(--ui-bg-elevated), 0 0 22px color-mix(in oklab, var(--ui-accent) 48%, transparent);
    transform: scale(1.12);
  }
}

@keyframes codex-auth-scan {
  0%, 18% {
    transform: translateX(-120%) skewX(-14deg);
  }
  58%, 100% {
    transform: translateX(420%) skewX(-14deg);
  }
}

@keyframes codex-auth-orbit {
  0%, 100% {
    filter: blur(0);
    opacity: 0.28;
    transform: rotate(-8deg) translate3d(0, 0, 0);
  }
  50% {
    filter: blur(0.2px);
    opacity: 0.62;
    transform: rotate(-8deg) translate3d(0.45rem, -0.35rem, 0);
  }
}

@media (hover: none) {
  .interactive-panel:hover,
  .metric-tile:hover,
  .flow-step:hover,
  .boundary-note:hover,
  .session-link-button:hover {
    box-shadow: none;
    transform: none;
  }

  .signal-row:hover {
    transform: none;
  }
}

@media (max-width: 900px) {
  .session-action-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .codex-auth-page {
    padding-top: 5.25rem;
    overflow-x: hidden;
  }

  .codex-auth-page::before {
    background:
      radial-gradient(circle at 20% 2%, color-mix(in oklab, var(--ui-accent) 16%, transparent), transparent 19rem),
      radial-gradient(circle at 90% 34%, color-mix(in srgb, var(--ui-accent) 12%, transparent), transparent 17rem);
  }

  .codex-title {
    font-size: 1.78rem;
    line-height: 1.14;
  }

  .hero-runtime-badge {
    display: none;
  }

  .hero-subcopy {
    margin-top: 0.85rem;
    line-height: 1.72;
  }

  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    margin-top: 1.05rem;
  }

  .metric-grid .metric-tile:nth-child(3) {
    grid-column: 1 / -1;
  }

  .metric-grid .metric-tile {
    min-height: 4.1rem;
    padding: 0.65rem 0.55rem;
  }

  .metric-grid .metric-k {
    padding-inline: 0.36rem;
    font-size: 0.72rem;
  }

  .metric-grid strong {
    margin-top: 0.28rem;
    font-size: 0.94rem;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .metric-grid small {
    display: none;
  }

  .flow-rail {
    display: none;
  }

  .flow-rail::before,
  .flow-rail::after {
    display: none;
  }

  .visual-panel {
    min-height: 286px;
    cursor: default;
  }

  .hero-visual-image {
    background-position: center top;
  }

  .visual-console {
    display: none;
  }

  .visual-chip {
    max-width: 100%;
  }

  .visual-orbit,
  .pointer-glow {
    display: none;
  }

  .metric-tile {
    padding: 0.9rem;
  }

  .status-pill {
    border-radius: 0.875rem;
  }

  .boundary-note {
    font-size: 0.9rem;
    line-height: 1.72;
  }

  .session-action-stack {
    width: 100%;
    max-width: none;
  }

  .session-action-row {
    grid-template-columns: 1fr;
  }

  .session-link-button {
    width: 100%;
  }
}
</style>
