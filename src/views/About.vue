<template>
  <div class="about-page min-h-screen theme-page pt-20 pb-16">
    <div class="container mx-auto px-4">

      <!-- ============================================================
        Hero · 2 列 grid（桌面）：左侧站长自述 + 右侧伪终端卡
      ============================================================ -->
      <section class="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 mt-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-black mb-5 tracking-tight theme-text-primary leading-tight">
            {{ heroTitle }}
          </h1>
          <p class="theme-text-secondary text-base md:text-lg leading-relaxed mb-6">
            {{ heroSubtitle }}
          </p>
          <div v-if="hasIntroduction" class="theme-text-secondary text-sm md:text-base leading-relaxed whitespace-pre-line">
            {{ introductionText }}
          </div>
        </div>

        <!-- 伪终端卡：macOS 窗口风格，展示伪命令 + 输出，体现"AI 工具站长"技术感 -->
        <div class="terminal-card rounded-2xl border theme-border overflow-hidden shadow-2xl">
          <!-- 标题栏 -->
          <div class="terminal-titlebar flex items-center gap-2 px-4 py-2.5 border-b theme-border">
            <span class="w-3 h-3 rounded-full bg-rose-500/85"></span>
            <span class="w-3 h-3 rounded-full bg-amber-400/85"></span>
            <span class="w-3 h-3 rounded-full bg-emerald-500/85"></span>
            <span class="ml-3 text-xs font-mono theme-text-muted tracking-tight">~ jay@52hub</span>
          </div>
          <!-- 内容区 -->
          <pre class="terminal-body font-mono text-[12.5px] leading-relaxed px-4 py-4 m-0 whitespace-pre overflow-x-auto"><span class="terminal-prompt">$</span> <span class="terminal-cmd">which-ai</span> claude
<span class="terminal-ok">✓</span> Claude Sonnet 4.7   <span class="terminal-comment"># 长上下文 + 写代码主力</span>
<span class="terminal-ok">✓</span> Claude Opus 4.7     <span class="terminal-comment"># 深度推理 + 长文档分析</span>

<span class="terminal-prompt">$</span> <span class="terminal-cmd">which-ai</span> chatgpt
<span class="terminal-ok">✓</span> ChatGPT Plus        <span class="terminal-comment"># 日常通用 · 价格门槛低</span>
<span class="terminal-ok">✓</span> ChatGPT Pro 5x/20x  <span class="terminal-comment"># Codex + 大额度任务</span>

<span class="terminal-prompt">$</span> <span class="terminal-cmd">which-ai</span> gemini
<span class="terminal-ok">✓</span> Gemini AI Pro       <span class="terminal-comment"># NotebookLM + Veo 视频</span>

<span class="terminal-prompt">$</span> <span class="terminal-cmd">52hub --status</span>
<span class="terminal-info">{{ uptimeText }}</span><span class="terminal-cursor">▍</span></pre>
        </div>
      </section>

      <!-- ============================================================
        3 卡横排：发货说明 / 售后政策 / 数据与隐私
      ============================================================ -->
      <section class="grid md:grid-cols-3 gap-5 mb-16">
        <!-- 发货说明 -->
        <div class="theme-panel border theme-border rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 class="text-lg font-bold theme-text-primary">发货说明</h2>
          </div>
          <ul class="space-y-3 text-sm theme-text-secondary leading-relaxed">
            <li><strong class="theme-text-primary">自动发货</strong>：卡密类商品（Apple ID、礼品卡、邮箱、独享号）下单付款后立即在订单页显示卡密。</li>
            <li><strong class="theme-text-primary">人工发货</strong>：订阅直充类商品下单后联系客服，通常 30 分钟内出号，多数 1 小时内可用。</li>
            <li class="theme-text-muted text-xs pt-2 border-t theme-border">延迟时可通过订单查询页或 TG 客服跟进。</li>
          </ul>
        </div>

        <!-- 售后政策 -->
        <div class="theme-panel border theme-border rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h2 class="text-lg font-bold theme-text-primary">售后政策</h2>
          </div>
          <ul class="space-y-2 text-sm theme-text-secondary leading-relaxed">
            <li><strong class="theme-text-primary">包首登</strong> · 首次登录失败 24h 内可退或换号</li>
            <li><strong class="theme-text-primary">24h 质保</strong> · 卡密本身问题免费补发或退款</li>
            <li><strong class="theme-text-primary">订阅直充</strong> · 成功充值后视为交付完成，平台风控不可保</li>
            <li><strong class="theme-text-primary">退款渠道</strong> · 原路退回 / 退入余额</li>
            <li class="theme-text-muted text-xs pt-2 border-t theme-border">虚拟商品一经出库不退换；用户自行操作导致的封号 / 误操作不在售后范围。</li>
          </ul>
        </div>

        <!-- 数据与隐私 -->
        <div class="theme-panel border theme-border rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-4">
            <svg class="w-5 h-5 theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 class="text-lg font-bold theme-text-primary">数据与隐私</h2>
          </div>
          <ul class="space-y-3 text-sm theme-text-secondary leading-relaxed">
            <li>支付不经本站后端：信用卡 / 支付宝 / 微信信息由对应支付网关直接处理，本站<strong class="theme-text-primary">不接触、不存储</strong>支付卡号。</li>
            <li>游客订单密码仅 <strong class="theme-text-primary">本地浏览器 24h</strong> 缓存，超时自动清除。</li>
            <li>站点不收集面部 / 位置 / 通讯录等敏感信息。</li>
          </ul>
        </div>
      </section>

      <!-- ============================================================
        服务内容 + 联系方式（保留后台配置驱动）
      ============================================================ -->
      <section v-if="hasServices || hasContact" class="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
        <div v-if="hasServices">
          <h2 class="text-2xl font-bold theme-text-primary mb-6 flex items-center gap-3">
            <span class="w-1.5 h-8 theme-accent-stick rounded-full"></span>
            {{ servicesTitle || '服务范围' }}
          </h2>
          <div class="grid grid-cols-1 gap-3">
            <div
              v-for="(service, index) in serviceItems"
              :key="`about-service-${index}`"
              class="flex items-start gap-3 p-4 theme-surface-soft rounded-xl border theme-border">
              <svg class="w-5 h-5 theme-text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="theme-text-secondary text-sm leading-relaxed">{{ service }}</span>
            </div>
          </div>
        </div>

        <div v-if="hasContact">
          <h2 class="text-2xl font-bold theme-text-primary mb-6 flex items-center gap-3">
            <span class="w-1.5 h-8 theme-accent-stick rounded-full"></span>
            {{ contactTitle || '联系方式' }}
          </h2>
          <p v-if="contactText" class="theme-text-secondary mb-5 text-sm leading-relaxed whitespace-pre-line">
            {{ contactText }}
          </p>
          <div class="space-y-3">
            <a :href="telegramUrl" target="_blank" rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 theme-surface-soft border theme-border rounded-xl hover:theme-surface-strong transition-colors group">
              <svg class="w-5 h-5 text-sky-500 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
              <div class="flex-1">
                <div class="text-sm font-semibold theme-text-primary">Telegram 客服</div>
                <div class="text-xs theme-text-muted">@HUB52service · 7×24 接单</div>
              </div>
            </a>
            <router-link to="/notice/announcement-channel"
              class="flex items-center gap-3 p-3 theme-surface-soft border theme-border rounded-xl hover:theme-surface-strong transition-colors group">
              <svg class="w-5 h-5 text-[#1AB6FF] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 6c2.07 0 3.75 1.68 3.75 3.75S14.07 13.5 12 13.5s-3.75-1.68-3.75-3.75S9.93 6 12 6zM5.25 18.75c0-3 6-4.5 6.75-4.5s6.75 1.5 6.75 4.5v.75H5.25v-.75z" />
              </svg>
              <div class="flex-1">
                <div class="text-sm font-semibold theme-text-primary">QQ 群</div>
                <div class="text-xs theme-text-muted">1105879333 · 密码 52hub</div>
              </div>
            </router-link>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../stores/app'
import { CONTACTS } from '../constants/contact'

const { locale } = useI18n()
const appStore = useAppStore()

const aboutConfig = computed(() => appStore.config?.about || null)
const contactConfig = computed(() => appStore.config?.contact || null)

const telegramUrl = computed(() => contactConfig.value?.telegram || CONTACTS.telegramService)

const resolveLocalizedText = (raw: unknown): string => {
  if (!raw || typeof raw !== 'object') {
    return ''
  }
  const record = raw as Record<string, unknown>
  const lang = String(locale.value || appStore.locale || 'zh-CN')
  const candidates = [record[lang], record['zh-CN'], record['zh-TW'], record['en-US']]
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim() !== '') {
      return candidate.trim()
    }
  }
  return ''
}

const heroTitle = computed(() => resolveLocalizedText(aboutConfig.value?.hero?.title) || '关于 52HUB')
const heroSubtitle = computed(() => resolveLocalizedText(aboutConfig.value?.hero?.subtitle) || '站长 Jay 整理的 AI 工具资源中心 + 官方订阅直充与账号代办服务')
const introductionText = computed(() => resolveLocalizedText(aboutConfig.value?.introduction))
const servicesTitle = computed(() => resolveLocalizedText(aboutConfig.value?.services?.title))
const contactTitle = computed(() => resolveLocalizedText(aboutConfig.value?.contact?.title))
const contactText = computed(() => resolveLocalizedText(aboutConfig.value?.contact?.text))

const serviceItems = computed(() => {
  const raw = aboutConfig.value?.services?.items
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => resolveLocalizedText(item))
    .filter((item) => item !== '')
})

const hasIntroduction = computed(() => introductionText.value !== '')
const hasServices = computed(() => servicesTitle.value !== '' || serviceItems.value.length > 0)
const hasContact = computed(() => contactTitle.value !== '' || contactText.value !== '')

// 伪终端：站点运行时长（按 2026-05-07 上线日算）+ 博客数（硬编码 12，更新博客时手动改）
const uptimeText = computed(() => {
  const start = new Date('2026-05-07T00:00:00Z').getTime()
  const days = Math.max(1, Math.floor((Date.now() - start) / 86400000))
  return `storefront up · ${days} days · 12 tutorials live · zero downtime`
})

useHead({
  title: '关于 52HUB · 站长 Jay 自述 - 52HUB',
  meta: [
    { name: 'description', content: '52HUB 站长 Jay 自述：玩 ChatGPT / Claude 几年，把买号、订阅、IP 配置踩过的坑整理成站点，既是 AI 实用资源站，也提供官方订阅直充与账号服务。' },
    { property: 'og:title', content: '关于 52HUB · 站长 Jay 自述 - 52HUB' },
    { property: 'og:description', content: 'AI 工具实用资源站 + 官方订阅直充与账号服务。站长 Jay 自述创站初衷与服务范围。' },
    { property: 'og:url', content: 'https://52hub.org/about' },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: 'https://52hub.org/about' }],
})

onMounted(async () => {
  if (!appStore.config) {
    await appStore.loadConfig()
  }
})
</script>

<style scoped>
.terminal-card {
  background: linear-gradient(180deg, #0d0d12 0%, #0a0a0f 100%);
  font-feature-settings: 'liga' 0;
}

.terminal-titlebar {
  background: rgba(255, 255, 255, 0.03);
}

.terminal-body {
  color: #d4d4d8;
  background: transparent;
}

.terminal-prompt {
  color: #818cf8; /* indigo-400 */
}

.terminal-cmd {
  color: #5eead4; /* teal-300 */
}

.terminal-ok {
  color: #4ade80; /* green-400 */
}

.terminal-comment {
  color: #71717a; /* zinc-500 */
  font-style: italic;
}

.terminal-info {
  color: #fbbf24; /* amber-400 */
}

.terminal-cursor {
  display: inline-block;
  color: #818cf8;
  animation: terminal-blink 1.1s steps(2, end) infinite;
}

@keyframes terminal-blink {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}
</style>
