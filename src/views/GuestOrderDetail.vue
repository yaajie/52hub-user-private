<template>
  <div class="min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black theme-text-primary mb-2">{{ t('guestOrderDetail.title') }}</h1>
          <p class="theme-text-muted text-sm">{{ t('guestOrderDetail.subtitle') }}</p>
        </div>
        <router-link to="/guest/orders"
          class="theme-link-muted text-sm transition-colors">{{
            t('guestOrderDetail.backSearch') }}</router-link>
      </div>
      <div v-if="showSupportNotices" class="mb-8 grid gap-4" :class="showManualDeliveryNotice ? 'lg:grid-cols-2' : 'lg:grid-cols-1'">
        <ManualDeliveryNotice v-if="showManualDeliveryNotice" />
        <QQContactCard />
      </div>

      <div v-if="showAuthForm"
        class="theme-panel rounded-2xl p-6 mb-6">
        <h2 class="text-lg font-bold mb-2">{{ t('guestOrderDetail.authTitle') }}</h2>
        <p class="text-xs theme-text-muted mb-4">{{ t('guestOrderDetail.authHint') }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="auth.email" type="email"
            class="form-input-lg"
            :placeholder="t('guestOrders.emailPlaceholder')" />
          <input v-model="auth.order_password" type="password"
            class="form-input-lg"
            :placeholder="t('guestOrders.passwordPlaceholder')" />
        </div>
        <div v-if="authError" class="text-red-400 text-sm mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          {{ authError }}
        </div>
        <div class="mt-4 flex items-center gap-3">
          <button @click="handleAuthSubmit"
            class="px-4 py-2 rounded-lg theme-btn-primary font-bold text-sm">
            {{ t('guestOrderDetail.authSubmit') }}
          </button>
          <button type="button" @click="clearAuth"
            class="text-xs theme-link-muted underline decoration-[var(--ui-border)]">
            {{ t('guestOrderDetail.authClear') }}
          </button>
        </div>
      </div>

      <div v-if="loading"
        class="h-40 theme-surface-muted border rounded-2xl animate-pulse">
      </div>

      <div v-else-if="!order && !showAuthForm"
        class="theme-panel rounded-2xl p-12 text-center">
        <p class="theme-text-muted">{{ t('guestOrderDetail.notFound') }}</p>
      </div>

      <div v-else-if="order" class="space-y-6">
        <div class="theme-panel rounded-2xl p-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div class="text-xs uppercase tracking-wider theme-text-muted">{{ t('orders.orderNo') }}</div>
              <div class="text-sm font-semibold theme-text-primary mt-1">{{ order.order_no }}</div>
              <div class="text-xs theme-text-muted mt-2">{{ t('orderDetail.createdAtLabel') }}：{{ formatDate(order.created_at) }}</div>
              <div v-if="order.paid_at" class="text-xs theme-text-muted mt-1">{{ t('orderDetail.paidAtLabel') }}：{{ formatDate(order.paid_at) }}</div>
            </div>
            <div class="flex flex-col items-start md:items-end gap-2">
              <div class="text-xs uppercase tracking-wider theme-text-muted">{{ t('orderDetail.amountTotal') }}</div>
              <div class="text-lg font-bold theme-text-primary">{{ formatMoney(order.total_amount,
                order.currency) }}</div>
            </div>
            <div class="flex items-center gap-3">
              <OrderStatusBadge :status="order.status" />
              <router-link v-if="order.status === 'pending_payment'" :to="`/pay?guest=1&order_no=${order.order_no}`"
                class="px-4 py-2 rounded-lg theme-btn-primary font-bold text-sm">
                {{ t('orders.payNow') }}
              </router-link>
            </div>
          </div>
        </div>

        <FulfillmentCard v-if="primaryFulfillment"
          :fulfillment="primaryFulfillment"
          :order-no="primaryFulfillmentOrderNo"
          :title="primaryFulfillmentTitle"
          line-key-prefix="primary-fulfillment"
          :copied="fulfillmentCopied"
          :downloading="fulfillmentDownloading"
          @copy="handleCopyFulfillment"
          @download="handleDownloadFulfillment" />

        <div v-if="showAmountCard" class="theme-panel rounded-2xl p-6">
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

        <ChildOrdersSection v-if="showChildOrdersSection"
          :children="order.children"
          :parent-currency="order.currency"
          :parent-order-no="order.order_no"
          :fulfillment-copied="fulfillmentCopied"
          :fulfillment-downloading="fulfillmentDownloading"
          @copy-fulfillment="handleCopyFulfillment"
          @download-fulfillment="handleDownloadFulfillment" />

        <FulfillmentCard v-if="showStandaloneOrderFulfillment"
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
import { guestOrderAPI } from '../api'
import { useAppStore } from '../stores/app'
import { useI18n } from 'vue-i18n'
import { loadGuestAuth, saveGuestAuth, clearGuestAuth } from '../utils/guestAuth'
import { debounceAsync } from '../utils/debounce'
import { copyText } from '../utils/clipboard'
import { amountToCents } from '../utils/money'
import { processHtmlForDisplay } from '../utils/content'
import {
  formatDate,
  formatMoney,
  hasDiscountAmount,
  fulfillmentDeliveryLines,
} from '../utils/orderDisplay'
import { productAPI } from '../api'
import ManualDeliveryNotice from '../components/ManualDeliveryNotice.vue'
import QQContactCard from '../components/QQContactCard.vue'
import OrderStatusBadge from '../components/order/OrderStatusBadge.vue'
import OrderItemsList from '../components/order/OrderItemsList.vue'
import FulfillmentCard from '../components/order/FulfillmentCard.vue'
import ChildOrdersSection from '../components/order/ChildOrdersSection.vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const { t } = useI18n()

const loading = ref(true)
const order = ref<any>(null)
const authError = ref('')
const auth = ref({
  email: '',
  order_password: '',
})
const fulfillmentCopied = ref(false)
const fulfillmentDownloading = ref(false)
let fulfillmentCopiedTimer: ReturnType<typeof setTimeout> | null = null

const handleDownloadFulfillment = async (orderNo: string) => {
  if (fulfillmentDownloading.value) return
  fulfillmentDownloading.value = true
  try {
    const res = await guestOrderAPI.downloadFulfillment(orderNo, {
      email: auth.value.email,
      order_password: auth.value.order_password,
    })
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

const finishedOrderStatuses = ['paid', 'fulfilling', 'partially_delivered', 'delivered', 'completed']
const isFinishedOrder = computed(() => finishedOrderStatuses.includes(String(order.value?.status || '')))

const amountCents = (amount?: string) => amountToCents(amount || '0') ?? 0

const showAmountCard = computed(() => {
  if (!order.value) return false
  const original = amountCents(order.value.original_amount)
  const total = amountCents(order.value.total_amount)
  return original !== total
    || hasDiscountAmount(order.value.discount_amount)
    || hasDiscountAmount(order.value.member_discount_amount)
})

const showTimeCard = computed(() => {
  if (!order.value || isFinishedOrder.value) return false
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

const childOrders = computed(() => (Array.isArray(order.value?.children) ? order.value.children : []))

const firstOrderItemTitle = (items?: any[]) => {
  const list = Array.isArray(items) ? items : []
  for (const item of list) {
    const title = getLocalizedText(item?.title)
    if (title) return title
  }
  return ''
}

const primaryFulfillmentSource = computed(() => {
  if (!order.value) return null
  if (order.value.fulfillment) {
    return {
      fulfillment: order.value.fulfillment,
      orderNo: order.value.order_no,
      title: firstOrderItemTitle(order.value.items),
      source: 'parent',
    }
  }

  if (childOrders.value.length === 1 && childOrders.value[0]?.fulfillment) {
    const child = childOrders.value[0]
    return {
      fulfillment: child.fulfillment,
      orderNo: child.order_no || order.value.order_no,
      title: firstOrderItemTitle(child.items),
      source: 'single-child',
    }
  }
  return null
})

const primaryFulfillment = computed(() => primaryFulfillmentSource.value?.fulfillment || null)
const primaryFulfillmentOrderNo = computed(() => primaryFulfillmentSource.value?.orderNo || order.value?.order_no || '')
const primaryFulfillmentTitle = computed(() => primaryFulfillmentSource.value?.title || '')
const showChildOrdersSection = computed(() => childOrders.value.length > 0 && primaryFulfillmentSource.value?.source !== 'single-child')
const showStandaloneOrderFulfillment = computed(() => Boolean(order.value?.fulfillment) && !primaryFulfillment.value)

const hasManualFulfillment = computed(() => {
  const items = [
    ...(Array.isArray(order.value?.items) ? order.value.items : []),
    ...childOrders.value.flatMap((child: any) => Array.isArray(child?.items) ? child.items : []),
  ]
  return items.some((item: any) => String(item?.fulfillment_type || '').toLowerCase() === 'manual')
})

const showManualDeliveryNotice = computed(() => Boolean(order.value) && hasManualFulfillment.value)
const showSupportNotices = computed(() => Boolean(order.value) && (showManualDeliveryNotice.value || !isFinishedOrder.value))

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

const loadSavedAuth = () => {
  auth.value = loadGuestAuth()
}

const hasAuth = computed(() => Boolean(auth.value.email && auth.value.order_password))
const showAuthForm = computed(() => !hasAuth.value || authError.value !== '')

const loadOrder = async () => {
  loading.value = true
  try {
    if (!hasAuth.value) {
      order.value = null
      authError.value = t('guestOrderDetail.authRequired')
      return
    }
    const response = await guestOrderAPI.detail(String(route.params.order_no || '').trim(), {
      email: auth.value.email,
      order_password: auth.value.order_password,
    })
    order.value = response.data.data
    await ensureProductContent(order.value)
    authError.value = ''
  } catch (error) {
    order.value = null
    fetchedProductContent.value = ''
    authError.value = t('guestOrderDetail.authInvalid')
  } finally {
    loading.value = false
  }
}

const debouncedLoadOrder = debounceAsync(loadOrder, 300)

const getLocalizedText = (jsonData: any) => {
  if (!jsonData) return ''
  const locale = appStore.locale
  return jsonData[locale] || jsonData['zh-CN'] || jsonData['en-US'] || ''
}

onMounted(() => {
  if (!route.params.order_no) {
    router.push('/guest/orders')
    return
  }
  loadSavedAuth()
  loadOrder()
})

const persistAuth = () => {
  saveGuestAuth({
    email: auth.value.email,
    order_password: auth.value.order_password,
  })
}

const handleAuthSubmit = async () => {
  authError.value = ''
  if (!hasAuth.value) {
    authError.value = t('guestOrderDetail.authRequired')
    return
  }
  persistAuth()
  await debouncedLoadOrder()
}

const clearAuth = () => {
  clearGuestAuth()
  auth.value = { email: '', order_password: '' }
  order.value = null
  authError.value = t('guestOrderDetail.authRequired')
}

onUnmounted(() => {
  debouncedLoadOrder.cancel()
})
</script>
