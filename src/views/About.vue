<template>
  <div class="about-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">

      <!-- ============================================================
        Hero · 通栏品牌说明区，避免浅色模式大黑块抢视觉焦点
      ============================================================ -->
      <section class="about-hero relative mb-10 mt-8 overflow-hidden rounded-3xl border theme-border p-6 sm:p-8 lg:p-10">
        <div class="about-hero-grid absolute inset-0" aria-hidden="true"></div>
        <div class="relative max-w-4xl">
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border theme-border bg-white/72 px-3 py-1 text-xs font-semibold theme-text-secondary shadow-sm backdrop-blur-md dark:bg-white/8">
            <span class="h-2 w-2 rounded-full bg-[var(--ui-accent)] shadow-[0_0_18px_rgba(232,89,12,0.6)]"></span>
            AI开通 RESOURCE DESK
          </div>

          <h1 class="max-w-3xl text-4xl font-black leading-tight tracking-tight theme-text-primary md:text-5xl">
            {{ heroTitle }}
          </h1>
          <p class="mt-5 max-w-3xl text-base leading-8 theme-text-secondary md:text-lg">
            {{ heroSubtitle }}
          </p>
          <div v-if="hasIntroduction" class="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 theme-text-secondary md:text-base">
            {{ introductionText }}
          </div>
        </div>

        <div class="relative mt-8 grid gap-3 sm:grid-cols-3">
          <div class="about-hero-tile">
            <span>AI 资源</span>
            <strong>入口 / 教程 / 排坑</strong>
            <small>把 Claude、Codex、ChatGPT 等 AI 智能体与工具的常用路径集中整理</small>
          </div>
          <div class="about-hero-tile">
            <span>AI 服务</span>
            <strong>代订阅 / 成品号 / API / 账号</strong>
            <small>客户有需要就提供；优先说明交付边界，不把虚拟商品说成永久稳定</small>
          </div>
          <div class="about-hero-tile">
            <span>站点原则</span>
            <strong>少承诺，多验证</strong>
            <small>本地工具不上传，支付信息不经本站后端存储</small>
          </div>
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
            <li class="theme-text-muted text-xs pt-2 border-t theme-border">延迟时可通过订单查询页或企微在线客服跟进。</li>
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
            <a href="https://work.weixin.qq.com/kfid/kfcbbf5731aecc5daeb" target="_blank" rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 theme-surface-soft border theme-border rounded-xl hover:theme-surface-strong transition-colors group">
              <IconWeChat class="w-5 h-5 shrink-0 text-[#07C160]" />
              <div class="flex-1">
                <div class="text-sm font-semibold theme-text-primary">企微在线客服</div>
                <div class="text-xs theme-text-muted">点击直接咨询 · 无需加好友</div>
              </div>
            </a>
            <div class="flex items-center gap-3 p-3 theme-surface-soft border theme-border rounded-xl">
              <svg class="w-5 h-5 text-[#1AB6FF] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 6c2.07 0 3.75 1.68 3.75 3.75S14.07 13.5 12 13.5s-3.75-1.68-3.75-3.75S9.93 6 12 6zM5.25 18.75c0-3 6-4.5 6.75-4.5s6.75 1.5 6.75 4.5v.75H5.25v-.75z" />
              </svg>
              <div class="flex-1">
                <div class="text-sm font-semibold theme-text-primary">QQ 咨询</div>
                <div class="text-xs theme-text-muted">3691445470</div>
              </div>
            </div>
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
import IconWeChat from '../components/icons/IconWeChat.vue'

const { locale } = useI18n()
const appStore = useAppStore()

const aboutConfig = computed(() => appStore.config?.about || null)

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

const heroTitle = computed(() => resolveLocalizedText(aboutConfig.value?.hero?.title) || '关于 AI开通')
const heroSubtitle = computed(() => resolveLocalizedText(aboutConfig.value?.hero?.subtitle) || '站长 Jay 打造的 AI 智能体资源与服务站 · 教程 · 工具 · 代订阅 / 成品号 / API 等服务')
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

useHead({
  title: '关于 AI开通 · 站长 Jay 自述 - AI开通',
  meta: [
    { name: 'description', content: 'AI开通 站长 Jay 自述：玩 ChatGPT / Claude 几年，把买号、订阅、IP 配置踩过的坑整理成站点，既是 AI 实用资源站，也按需提供代订阅、成品号、API 等服务。' },
    { property: 'og:title', content: '关于 AI开通 · 站长 Jay 自述 - AI开通' },
    { property: 'og:description', content: 'AI 工具实用资源站 + 代订阅 / 成品号 / API 等按需服务。站长 Jay 自述创站初衷与服务范围。' },
    { property: 'og:url', content: 'https://aikaitong.com/about' },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: 'https://aikaitong.com/about' }],
})

onMounted(async () => {
  if (!appStore.config) {
    await appStore.loadConfig()
  }
})
</script>

<style scoped>
.about-hero {
  background:
    radial-gradient(circle at 10% 8%, rgba(14, 165, 233, 0.16), transparent 28rem),
    radial-gradient(circle at 92% 18%, rgba(16, 185, 129, 0.11), transparent 24rem),
    linear-gradient(135deg, rgba(255, 255, 255, 0.88), rgba(248, 250, 252, 0.7));
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
}

.about-hero-grid {
  opacity: 0.18;
  background-image:
    linear-gradient(rgba(14, 165, 233, 0.24) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.2) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(135deg, #000, transparent 76%);
}

.about-hero-tile {
  border: 1px solid rgba(14, 165, 233, 0.16);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.66);
  padding: 1rem;
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
}

.about-hero-tile span {
  display: block;
  color: #0f766e;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
}

.about-hero-tile strong {
  display: block;
  margin-top: 0.35rem;
  color: var(--ui-text-primary);
  font-size: 1rem;
}

.about-hero-tile small {
  display: block;
  margin-top: 0.45rem;
  color: var(--ui-text-secondary);
  line-height: 1.65;
}

:global(.dark .about-hero) {
  background:
    radial-gradient(circle at 10% 8%, rgba(14, 165, 233, 0.12), transparent 28rem),
    radial-gradient(circle at 92% 18%, rgba(16, 185, 129, 0.08), transparent 24rem),
    linear-gradient(135deg, rgba(15, 23, 42, 0.72), rgba(2, 6, 23, 0.58));
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.26);
}

:global(.dark .about-hero-grid) {
  opacity: 0.13;
}

:global(.dark .about-hero-tile) {
  border-color: rgba(125, 211, 252, 0.14);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: none;
}

:global(.dark .about-hero-tile span) {
  color: #67e8f9;
}
</style>
