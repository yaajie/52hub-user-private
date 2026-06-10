<template>
  <router-link
    :to="targetUrl"
    class="group relative block rounded-xl border theme-border theme-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:theme-surface-strong overflow-hidden"
  >
    <!-- 顶部 accent 装饰 -->
    <span
      class="absolute inset-x-0 top-0 h-1 opacity-70"
      :style="{ background: accent }"
      aria-hidden="true"
    ></span>

    <!-- Loading state -->
    <div v-if="loading" class="space-y-3">
      <div class="h-5 w-3/4 rounded theme-skeleton"></div>
      <div class="h-3 w-1/2 rounded theme-skeleton"></div>
      <div class="h-3 w-2/3 rounded theme-skeleton"></div>
      <div class="h-9 w-32 rounded-lg theme-skeleton mt-3"></div>
    </div>

    <!-- Loaded state (API success) -->
    <div v-else-if="product" class="space-y-3">
      <h3 class="text-base font-semibold theme-text-primary line-clamp-2">{{ displayName }}</h3>

      <!-- Badges row -->
      <div class="flex flex-wrap items-center gap-1.5 text-[11px]">
        <span
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium"
          :class="product.fulfillment_type === 'auto' ? 'theme-badge-info' : 'theme-badge-neutral'"
        >
          <BoltIcon v-if="product.fulfillment_type === 'auto'" class="h-3 w-3" />
          <ChatBubbleLeftRightIcon v-else class="h-3 w-3" />
          {{ product.fulfillment_type === 'auto' ? '自动发货' : '人工交付' }}
        </span>
        <span
          class="inline-flex items-center rounded-full px-2 py-0.5 font-medium"
          :class="getStockBadgeClass(product.stock_status)"
        >
          {{ stockLabel }}
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-1.5">
        <span class="text-2xl font-bold" :style="{ color: accent }">
          {{ formatPrice(product.price_amount, siteCurrency) }}
        </span>
        <span v-if="product.fulfillment_type !== 'auto'" class="text-[11px] theme-text-muted">起</span>
      </div>

      <!-- CTA button -->
      <span
        class="mt-2 inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-opacity group-hover:opacity-90"
        :style="{ background: accent }"
      >
        {{ isSoldOut ? '已售罄 · 查看详情' : '立即下单' }}
        <svg class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>

    <!-- Fallback state (API error / no slug / 404) -->
    <div v-else class="space-y-3">
      <h3 class="text-base font-semibold theme-text-primary">{{ fallbackName }}</h3>
      <p class="text-sm leading-relaxed theme-text-secondary">{{ fallbackDesc }}</p>
      <span
        class="mt-2 inline-flex items-center gap-1 text-sm font-semibold"
        :style="{ color: accent }"
      >
        查看商品
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { productAPI } from '../../api/product'
import { useLocalized, useProductLabels } from '../../composables/useProduct'
import { BoltIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  slug?: string
  url: string
  fallbackName: string
  fallbackDesc: string
  accent?: string
}>(), {
  accent: '#d9480f',
})

const { getLocalizedText, siteCurrency, formatPrice } = useLocalized()
const { getStockBadgeClass } = useProductLabels()

const product = ref<any | null>(null)
const loading = ref(true)

// 优先用 product.slug 跳商品详情，无 product 时回退到 props.url
const targetUrl = computed(() => {
  if (product.value?.slug) return `/products/${product.value.slug}`
  return props.url
})

const displayName = computed(() => {
  if (!product.value) return props.fallbackName
  return getLocalizedText(product.value.title) || props.fallbackName
})

const isSoldOut = computed(() => {
  if (!product.value) return false
  return Boolean(product.value.is_sold_out || product.value.stock_status === 'out_of_stock')
})

const stockLabel = computed(() => {
  if (!product.value) return ''
  const p = product.value
  if (p.is_sold_out || p.stock_status === 'out_of_stock') return '暂时缺货'
  if (p.stock_status === 'unlimited') return '充足库存'
  if (p.stock_status === 'low_stock') {
    const count = Number(p.fulfillment_type === 'manual' ? p.manual_stock_available : p.auto_stock_available)
    if (Number.isFinite(count) && count > 0) return `仅剩 ${count} 件`
    return '库存紧张'
  }
  return '库存充足'
})

onMounted(async () => {
  // 只在 url 是 `/products/:slug` 且有 slug 时尝试拉 API
  // slug 优先从 props.slug 取，否则从 url 末尾解析
  let slug = props.slug
  if (!slug && props.url.startsWith('/products/')) {
    slug = props.url.replace(/^\/products\//, '')
  }
  if (!slug) {
    loading.value = false
    return
  }
  try {
    const r = await productAPI.detail(slug)
    if (r?.data?.status_code === 0 && r.data.data) {
      product.value = r.data.data
    }
  } catch {
    // 静默失败，组件降级为 fallback 显示
  } finally {
    loading.value = false
  }
})
</script>
