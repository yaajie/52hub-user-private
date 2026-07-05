<template>
  <div class="min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black theme-text-primary mb-2">{{ t('orderDetail.title') }}</h1>
          <p class="theme-text-muted text-sm">{{ t('orderDetail.subtitle') }}</p>
        </div>
        <router-link to="/me/orders"
          class="theme-link-muted text-sm">{{
            t('orderDetail.backList') }}</router-link>
      </div>

      <div v-if="loading"
        class="h-40 border theme-surface-muted rounded-2xl animate-pulse">
      </div>

      <div v-else-if="!order"
        class="theme-panel rounded-2xl p-12 text-center">
        <svg class="mx-auto h-12 w-12 theme-text-muted opacity-50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p class="theme-text-muted mb-4">{{ t('orderDetail.notFound') }}</p>
        <button
          @click="debouncedLoadOrder()"
          class="inline-flex items-center gap-2 rounded-xl theme-btn-primary px-5 py-2.5 text-sm font-semibold"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ t('errorBoundary.retry') }}
        </button>
      </div>

      <div v-else class="space-y-6">
        <div class="theme-panel rounded-2xl p-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="text-xs uppercase tracking-wider theme-text-muted">{{ t('orders.orderNo') }}</div>
              <div class="text-sm font-semibold theme-text-primary mt-1">{{ order.order_no }}</div>
                <div class="text-xs theme-text-muted mt-2">{{ t('orderDetail.createdAtLabel') }}：{{ formatDate(order.created_at) }}</div>
            </div>
            <div class="flex flex-col items-start md:items-end gap-2">
              <div class="text-xs uppercase tracking-wider theme-text-muted">{{ t('orderDetail.amountTotal') }}</div>
              <div class="text-lg font-bold theme-text-primary">{{ formatMoney(order.total_amount,
                order.currency) }}</div>
            </div>
            <div class="flex items-center gap-3">
              <OrderStatusBadge :status="order.status" />
              <router-link v-if="order.status === 'pending_payment'" :to="`/pay?order_no=${order.order_no}`"
                class="px-4 py-2 rounded-lg theme-btn-primary font-bold text-sm">
                {{ t('orderDetail.payNow') }}
              </router-link>
              <button v-if="order.status === 'pending_payment'" @click="cancelOrder"
                class="px-4 py-2 rounded-lg border theme-btn-danger text-sm">
                {{ t('orderDetail.cancel') }}
              </button>
            </div>
          </div>
        </div>

        <div class="theme-panel rounded-2xl p-6">
          <h2 class="text-lg font-bold mb-4">{{ t('orderDetail.amountTitle') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.amountOriginal') }}</div>
              <div class="theme-text-primary font-mono mt-1">{{ formatMoney(order.original_amount,
                order.currency) }}</div>
            </div>
            <div class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.amountDiscount') }}</div>
              <div class="theme-text-primary font-mono mt-1">{{ formatMoney(order.discount_amount,
                order.currency) }}</div>
            </div>
            <div class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.amountTotal') }}</div>
              <div class="theme-text-primary font-mono mt-1">{{ formatMoney(order.total_amount,
                order.currency) }}</div>
            </div>
            <div v-if="hasAmount(order.wallet_paid_amount)" class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.amountWalletPaid') }}</div>
              <div class="theme-text-primary font-mono mt-1">{{ formatMoney(order.wallet_paid_amount,
                order.currency) }}</div>
            </div>
            <div v-if="hasAmount(order.online_paid_amount)" class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.amountOnlinePaid') }}</div>
              <div class="theme-text-primary font-mono mt-1">{{ formatMoney(order.online_paid_amount,
                order.currency) }}</div>
            </div>
            <div v-if="hasAmount(order.refunded_amount)" class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.amountRefunded') }}</div>
              <div class="theme-text-primary font-mono mt-1">{{ formatMoney(order.refunded_amount,
                order.currency) }}</div>
            </div>
            <div v-if="hasDiscountAmount(order.member_discount_amount)" class="border border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/30 rounded-xl p-4">
              <div class="text-xs text-amber-700 dark:text-amber-400">{{ t('orderDetail.amountMemberDiscount') }}</div>
              <div class="text-amber-700 dark:text-amber-400 font-mono mt-1">{{ formatMoney(order.member_discount_amount,
                order.currency) }}</div>
            </div>
          </div>
        </div>

        <div v-if="showTimeCard" class="theme-panel rounded-2xl p-6">
          <h2 class="text-lg font-bold mb-4">{{ t('orderDetail.timeTitle') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.createdAtLabel') }}</div>
              <div class="theme-text-primary mt-1">{{ formatDate(order.created_at) }}</div>
            </div>
            <div v-if="order.paid_at" class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.paidAtLabel') }}</div>
              <div class="theme-text-primary mt-1">{{ formatDate(order.paid_at) }}</div>
            </div>
            <div v-if="order.expires_at" class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.expiresAtLabel') }}</div>
              <div class="theme-text-primary mt-1">{{ formatDate(order.expires_at) }}</div>
            </div>
            <div v-if="order.canceled_at" class="theme-surface-soft border rounded-xl p-4">
              <div class="text-xs theme-text-muted">{{ t('orderDetail.canceledAtLabel') }}</div>
              <div class="theme-text-primary mt-1">{{ formatDate(order.canceled_at) }}</div>
            </div>
          </div>
        </div>

        <div class="theme-panel rounded-2xl p-6">
          <h2 class="text-lg font-bold mb-4">{{ t('orderDetail.itemsTitle') }}</h2>
          <OrderItemsList :items="order.items" :currency="order.currency" />
        </div>

        <section v-if="productContent" class="theme-panel border theme-border rounded-2xl p-5 sm:p-6">
          <h3 class="text-base font-semibold theme-text-primary mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5.25H7.5A2.25 2.25 0 0 0 5.25 7.5v11.25A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25V7.5A2.25 2.25 0 0 0 16.5 5.25H15m-6 0a2.25 2.25 0 1 1 4.5 0m-4.5 0a2.25 2.25 0 0 0 4.5 0" />
            </svg>
            <span>商品说明</span>
          </h3>
          <article class="prose prose-sm dark:prose-invert max-w-none theme-text-secondary" v-html="productContent"></article>
        </section>

        <ChildOrdersSection v-if="order.children && order.children.length > 0"
          :children="order.children"
          :parent-currency="order.currency"
          :parent-order-no="order.order_no"
          :fulfillment-copied="fulfillmentCopied"
          :fulfillment-downloading="fulfillmentDownloading"
          @copy-fulfillment="handleCopyFulfillment"
          @download-fulfillment="handleDownloadFulfillment" />

        <FulfillmentCard v-if="order.fulfillment"
          :fulfillment="order.fulfillment"
          :order-no="order.order_no"
          :copied="fulfillmentCopied"
          :downloading="fulfillmentDownloading"
          @copy="handleCopyFulfillment"
          @download="handleDownloadFulfillment" />

        <section v-if="deliveryInstructionSections.length" class="theme-panel border theme-border rounded-2xl p-5 sm:p-6">
          <h3 class="text-base font-semibold theme-text-primary mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 theme-text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 6.75v10.5m5.25-5.25H6.75M4.5 5.25A2.25 2.25 0 0 1 6.75 3h10.5a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 17.25 21H6.75a2.25 2.25 0 0 1-2.25-2.25V5.25Z" />
            </svg>
            <span>交付使用说明</span>
          </h3>
          <div class="space-y-4">
            <article
              v-for="section in deliveryInstructionSections"
              :key="section.key"
              class="rounded-xl border theme-border theme-surface-soft p-4"
            >
              <h4 v-if="deliveryInstructionSections.length > 1" class="mb-2 text-sm font-semibold theme-text-primary">{{ section.title }}</h4>
              <div class="prose prose-sm dark:prose-invert max-w-none theme-text-secondary" v-html="section.html"></div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userOrderAPI } from '../api'
import { useAppStore } from '../stores/app'
import { useI18n } from 'vue-i18n'
import { debounceAsync } from '../utils/debounce'
import { copyText } from '../utils/clipboard'
import { processHtmlForDisplay } from '../utils/content'
import {
  formatDate,
  formatMoney,
  hasDiscountAmount,
  hasAmount,
  fulfillmentDeliveryLines,
} from '../utils/orderDisplay'
import { useConfirmDialog } from '../composables/useConfirmDialog'
import { toast } from '../composables/useToast'
import { productAPI } from '../api'
import OrderStatusBadge from '../components/order/OrderStatusBadge.vue'
import OrderItemsList from '../components/order/OrderItemsList.vue'
import FulfillmentCard from '../components/order/FulfillmentCard.vue'
import ChildOrdersSection from '../components/order/ChildOrdersSection.vue'

const route = useRoute()
const router = useRouter()
const { confirm: showConfirm } = useConfirmDialog()
const appStore = useAppStore()
const { t } = useI18n()

const loading = ref(true)
const order = ref<any>(null)
const fulfillmentCopied = ref(false)
let fulfillmentCopiedTimer: ReturnType<typeof setTimeout> | null = null

const fulfillmentDownloading = ref(false)

const handleDownloadFulfillment = async (orderNo: string) => {
  if (fulfillmentDownloading.value) return
  fulfillmentDownloading.value = true
  try {
    const res = await userOrderAPI.downloadFulfillment(orderNo)
    const blob = new Blob([res.data], { type: 'text/plain; charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fulfillment-${orderNo}.txt`
    a.click()
    URL.revokeObjectURL(url)
  } catch {} finally {
    fulfillmentDownloading.value = false
  }
}

const handleCopyFulfillment = async (fulfillment: any) => {
  const lines = fulfillmentDeliveryLines(fulfillment)
  const text = lines.length > 0 ? lines.join('\n') : (fulfillment?.payload || '')
  if (!text) return
  try {
    await copyText(text)
    fulfillmentCopied.value = true
    if (fulfillmentCopiedTimer) clearTimeout(fulfillmentCopiedTimer)
    fulfillmentCopiedTimer = setTimeout(() => { fulfillmentCopied.value = false }, 1500)
  } catch {}
}

const showTimeCard = computed(() => {
  if (!order.value) return false
  return Boolean(order.value.paid_at || order.value.expires_at || order.value.canceled_at)
})

const fetchedProductContent = ref('')
const productContent = computed(() => {
  const fromOrder = getLocalizedText(order.value?.product?.content)
  if (fromOrder) return processHtmlForDisplay(fromOrder)

  const items = Array.isArray(order.value?.items) ? order.value.items : []
  for (const item of items) {
    const itemContent = getLocalizedText(item?.content)
    if (itemContent) return processHtmlForDisplay(itemContent)
  }

  if (fetchedProductContent.value) return processHtmlForDisplay(fetchedProductContent.value)
  return ''
})

const deliveryInstructionSections = computed(() => {
  if (!order.value) return []

  const sections: Array<{ key: string; title: string; html: string }> = []
  const seen = new Set<string>()
  const collect = (items: any[], scope: string) => {
    items.forEach((item, index) => {
      const raw = getLocalizedText(item?.instructions).trim()
      if (!raw || seen.has(raw)) return
      const html = processHtmlForDisplay(raw)
      if (!html.trim()) return
      seen.add(raw)
      sections.push({
        key: `${scope}-${index}`,
        title: getLocalizedText(item?.title) || '商品',
        html,
      })
    })
  }

  collect(Array.isArray(order.value.items) ? order.value.items : [], 'parent')
  ;(Array.isArray(order.value.children) ? order.value.children : []).forEach((child: any, childIndex: number) => {
    collect(Array.isArray(child?.items) ? child.items : [], `child-${childIndex}`)
  })

  return sections
})

const resolveOrderProductSlug = (orderData: any) => {
  const direct = String(orderData?.product?.slug || '').trim()
  if (direct) return direct
  const items = Array.isArray(orderData?.items) ? orderData.items : []
  for (const item of items) {
    const slug = String(item?.slug || item?.product_slug || item?.product?.slug || '').trim()
    if (slug) return slug
  }
  return ''
}

const ensureProductContent = async (orderData: any) => {
  fetchedProductContent.value = ''
  const hasInlineContent = Boolean(getLocalizedText(orderData?.product?.content))
    || (Array.isArray(orderData?.items) && orderData.items.some((item: any) => Boolean(getLocalizedText(item?.content))))
  if (hasInlineContent) return

  const slug = resolveOrderProductSlug(orderData)
  if (!slug) return

  try {
    const response = await productAPI.detail(slug)
    const content = getLocalizedText(response?.data?.data?.content)
    fetchedProductContent.value = content || ''
  } catch {
    fetchedProductContent.value = ''
  }
}

const loadOrder = async () => {
  loading.value = true
  try {
    const response = await userOrderAPI.detail(String(route.params.order_no || '').trim())
    order.value = response.data.data
    await ensureProductContent(order.value)
  } catch (error) {
    order.value = null
    fetchedProductContent.value = ''
  } finally {
    loading.value = false
  }
}

const debouncedLoadOrder = debounceAsync(loadOrder, 300)

const cancelOrder = async () => {
  if (!order.value) return
  const confirmed = await showConfirm({
    title: t('orderDetail.cancel'),
    message: t('orderDetail.cancelConfirm'),
    confirmText: t('common.confirm'),
    cancelText: t('common.cancel'),
    variant: 'danger',
  })
  if (!confirmed) return
  try {
    await userOrderAPI.cancel(order.value.order_no)
    await debouncedLoadOrder()
  } catch {
    toast.error(t('orderDetail.cancelFailed'))
  }
}

const getLocalizedText = (jsonData: any) => {
  if (!jsonData) return ''
  const locale = appStore.locale
  return jsonData[locale] || jsonData['zh-CN'] || jsonData['en-US'] || ''
}

onMounted(() => {
  if (!route.params.order_no) {
    router.push('/me/orders')
    return
  }
  loadOrder()
})

onUnmounted(() => {
  debouncedLoadOrder.cancel()
})
</script>
