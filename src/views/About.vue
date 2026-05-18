<template>
  <div
    class="about-page min-h-screen theme-page pt-20 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-16 mt-12">
        <h1 class="text-4xl md:text-6xl font-black mb-6 tracking-tight theme-text-primary">{{ heroTitle }}</h1>
        <p
          class="theme-text-secondary max-w-2xl mx-auto text-lg leading-relaxed border-b theme-border pb-8">
          {{ heroSubtitle }}
        </p>
      </div>

      <div
        class="theme-panel backdrop-blur-xl border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

        <div v-if="hasIntroduction" class="mb-12">
          <p class="theme-text-secondary text-lg leading-relaxed whitespace-pre-line">
            {{ introductionText }}
          </p>
        </div>

        <!-- 发货说明（前端硬编码，融合公告核心信息） -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold theme-text-primary mb-6 flex items-center gap-3">
            <span class="w-1.5 h-8 theme-accent-stick rounded-full"></span>
            发货说明
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 theme-surface-soft rounded-xl border theme-border">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 class="font-semibold theme-text-primary">自动发货</h3>
              </div>
              <p class="text-sm theme-text-secondary leading-relaxed">
                卡密类商品（Apple ID、礼品卡、邮箱、独享号）下单付款后立即在订单页显示卡密，全程无需等待。
              </p>
            </div>
            <div class="p-5 theme-surface-soft rounded-xl border theme-border">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 class="font-semibold theme-text-primary">人工发货</h3>
              </div>
              <p class="text-sm theme-text-secondary leading-relaxed">
                订阅直充类商品下单后联系客服处理，通常 30 分钟内出号；多数订阅 1 小时内可用。延迟时请通过订单查询页或 TG 客服跟进。
              </p>
            </div>
          </div>
        </div>

        <!-- 售后政策（前端硬编码） -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold theme-text-primary mb-6 flex items-center gap-3">
            <span class="w-1.5 h-8 theme-accent-stick rounded-full"></span>
            售后政策
          </h2>
          <ul class="space-y-3 text-sm theme-text-secondary leading-relaxed">
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span><strong class="theme-text-primary">包首登</strong>：账号类商品（Apple ID、邮箱、独享号等）保证首次登录可用，登录失败 24 小时内可退或换号。</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span><strong class="theme-text-primary">24 小时质保</strong>：从发货起 24 小时内，因卡密本身问题导致不可用，免费补发或退款。</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span><strong class="theme-text-primary">虚拟商品一经出库不退换</strong>：质保期外、或用户自行操作导致的账号封禁 / 充值失败 / 误操作不在售后范围。</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span><strong class="theme-text-primary">订阅直充类</strong>：成功充值入账后视为交付完成；OpenAI / Anthropic / Google 等平台的封号 / 风控由平台决定，本站不能保证账号永久可用。</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span><strong class="theme-text-primary">退款渠道</strong>：原路退回到支付账户；如订单使用了余额支付，退款进余额。</span>
            </li>
          </ul>
        </div>

        <!-- 数据与隐私（前端硬编码） -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold theme-text-primary mb-6 flex items-center gap-3">
            <span class="w-1.5 h-8 theme-accent-stick rounded-full"></span>
            数据与隐私
          </h2>
          <ul class="space-y-3 text-sm theme-text-secondary leading-relaxed">
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span>支付不经过本站后端：信用卡 / 支付宝 / 微信信息由对应支付网关直接处理，本站<strong class="theme-text-primary">不接触、不存储</strong>支付卡号或密码。</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span>游客订单密码仅<strong class="theme-text-primary">本地浏览器 24 小时</strong>缓存便于查单，超时自动清除；公用设备建议主动点"清除"。</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 rounded-full theme-accent-stick mt-2 flex-shrink-0"></span>
              <span>站点不收集面部、位置、通讯录等敏感信息；联系方式仅在你主动留单时使用。</span>
            </li>
          </ul>
        </div>

        <div v-if="hasServices" class="mb-12">
          <h2 v-if="servicesTitle" class="text-2xl font-bold theme-text-primary mb-6 flex items-center gap-3">
            <span class="w-1.5 h-8 theme-accent-stick rounded-full"></span>
            {{ servicesTitle }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(service, index) in serviceItems"
              :key="`about-service-${index}`"
              class="flex items-start gap-3 p-4 theme-surface-soft rounded-xl border theme-border transition-colors">
              <svg class="w-6 h-6 theme-text-accent flex-shrink-0 mt-0.5" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="theme-text-secondary">{{ service }}</span>
            </div>
          </div>
        </div>

        <div v-if="hasContact">
          <h2 v-if="contactTitle" class="text-2xl font-bold theme-text-primary mb-6 flex items-center gap-3">
            <span class="w-1.5 h-8 theme-accent-stick rounded-full"></span>
            {{ contactTitle }}
          </h2>
          <p v-if="contactText" class="theme-text-secondary mb-8 whitespace-pre-line">
            {{ contactText }}
          </p>
          <QQContactCard class="mb-6" />
          <div v-if="hasContactLinks" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a v-if="contactConfig?.telegram" :href="contactConfig.telegram" target="_blank" rel="noopener noreferrer"
              class="group flex items-center justify-center space-x-3 theme-surface-soft border theme-border theme-text-secondary px-6 py-4 rounded-xl transition-colors hover:theme-text-primary">
              <svg class="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
              <span class="font-bold">Telegram</span>
            </a>
            <a v-if="contactConfig?.whatsapp" :href="contactConfig.whatsapp" target="_blank" rel="noopener noreferrer"
              class="group flex items-center justify-center space-x-3 theme-surface-soft border theme-border theme-text-secondary px-6 py-4 rounded-xl transition-colors hover:theme-text-primary">
              <svg class="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span class="font-bold">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../stores/app'
import QQContactCard from '../components/QQContactCard.vue'

const { locale } = useI18n()
const appStore = useAppStore()

const aboutConfig = computed(() => appStore.config?.about || null)
const contactConfig = computed(() => appStore.config?.contact || null)

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

const heroTitle = computed(() => resolveLocalizedText(aboutConfig.value?.hero?.title))
const heroSubtitle = computed(() => resolveLocalizedText(aboutConfig.value?.hero?.subtitle))
const introductionText = computed(() => resolveLocalizedText(aboutConfig.value?.introduction))
const servicesTitle = computed(() => resolveLocalizedText(aboutConfig.value?.services?.title))
const contactTitle = computed(() => resolveLocalizedText(aboutConfig.value?.contact?.title))
const contactText = computed(() => resolveLocalizedText(aboutConfig.value?.contact?.text))

const serviceItems = computed(() => {
  const raw = aboutConfig.value?.services?.items
  if (!Array.isArray(raw)) {
    return []
  }

  return raw
    .map((item) => resolveLocalizedText(item))
    .filter((item) => item !== '')
})

const hasIntroduction = computed(() => introductionText.value !== '')
const hasServices = computed(() => servicesTitle.value !== '' || serviceItems.value.length > 0)
const hasContactLinks = computed(() => false)
const hasContact = computed(() => contactTitle.value !== '' || contactText.value !== '' || hasContactLinks.value)

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
