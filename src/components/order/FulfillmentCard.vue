<template>
  <!-- compact：子订单交付卡（小号按钮/图标、mt-3、max-h-48、payload 回退带守卫、空态提示） -->
  <div v-if="variant === 'compact'" class="mt-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-semibold theme-text-primary">{{
        t('orderDetail.childFulfillmentTitle') }}</h3>
      <button v-if="fulfillment?.status === 'delivered'"
        class="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        :class="copied ? 'bg-[var(--ui-success)] text-white' : 'theme-btn-primary'"
        @click="emit('copy', fulfillment)">
        <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        {{ copied ? t('orderDetail.fulfillmentCopied') : t('orderDetail.fulfillmentCopy') }}
      </button>
    </div>
    <div v-if="fulfillment">
      <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentType') }}：{{
        fulfillmentTypeLabelText(fulfillment.type) }}</div>
      <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentStatus') }}：{{
        fulfillmentStatusLabelText(fulfillment.status) }}</div>
      <div v-if="isFulfillmentTruncated(fulfillment)" class="mt-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentTotalLines', { count: fulfillment.payload_line_count }) }}</span>
          <button class="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg theme-btn-primary transition-colors shadow-sm disabled:opacity-50"
            :disabled="downloading"
            @click="emit('download', orderNo)">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
            {{ downloading ? t('orderDetail.fulfillmentDownloading') : t('orderDetail.fulfillmentDownload') }}
          </button>
        </div>
        <div class="mb-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          {{ t('orderDetail.fulfillmentTruncatedHint') }}
        </div>
        <div class="theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden max-h-48 overflow-y-auto">{{ fulfillment.payload }}</div>
      </div>
      <div v-else-if="fulfillmentDeliveryLines(fulfillment).length"
        class="mt-3 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary space-y-1 break-all overflow-hidden">
        <div v-for="(line, index) in fulfillmentDeliveryLines(fulfillment)" :key="lineKey(index)">{{ line }}</div>
      </div>
      <div v-else-if="fulfillment.payload"
        class="mt-3 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden">
        {{ fulfillment.payload }}
      </div>
    </div>
    <div v-else class="text-sm theme-text-muted">{{ t('orderDetail.childFulfillmentEmpty') }}</div>
  </div>
  <!-- standard：独立交付卡（会员/游客独立卡、游客主交付卡） -->
  <div v-else class="theme-panel rounded-2xl p-6">
    <!-- 传入 title（含空串）即启用带标题版头（游客主交付卡）；不传用简单版头 -->
    <div v-if="hasTitledHeader" class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
      <div>
        <h2 class="text-lg font-bold">{{ t('orderDetail.fulfillmentTitle') }}</h2>
        <p v-if="title" class="mt-1 text-xs theme-text-muted">{{ title }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button v-if="isFulfillmentTruncated(fulfillment)"
          class="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg theme-btn-primary transition-colors shadow-sm disabled:opacity-50"
          :disabled="downloading"
          @click="emit('download', orderNo)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
          {{ downloading ? t('orderDetail.fulfillmentDownloading') : t('orderDetail.fulfillmentDownload') }}
        </button>
        <button v-if="fulfillment.status === 'delivered' && !isFulfillmentTruncated(fulfillment)"
          class="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          :class="copied ? 'bg-[var(--ui-success)] text-white' : 'theme-btn-primary'"
          @click="emit('copy', fulfillment)">
          <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          {{ copied ? t('orderDetail.fulfillmentCopied') : t('orderDetail.fulfillmentCopy') }}
        </button>
      </div>
    </div>
    <div v-else class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold">{{ t('orderDetail.fulfillmentTitle') }}</h2>
      <div class="flex items-center gap-2">
        <button v-if="isFulfillmentTruncated(fulfillment)"
          class="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg theme-btn-primary transition-colors shadow-sm disabled:opacity-50"
          :disabled="downloading"
          @click="emit('download', orderNo)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
          {{ downloading ? t('orderDetail.fulfillmentDownloading') : t('orderDetail.fulfillmentDownload') }}
        </button>
        <button v-if="fulfillment.status === 'delivered' && !isFulfillmentTruncated(fulfillment)"
          class="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          :class="copied ? 'bg-[var(--ui-success)] text-white' : 'theme-btn-primary'"
          @click="emit('copy', fulfillment)">
          <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          {{ copied ? t('orderDetail.fulfillmentCopied') : t('orderDetail.fulfillmentCopy') }}
        </button>
      </div>
    </div>
    <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentType') }}：{{
      fulfillmentTypeLabelText(fulfillment.type) }}</div>
    <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentStatus') }}：{{
      fulfillmentStatusLabelText(fulfillment.status) }}</div>
    <div v-if="isFulfillmentTruncated(fulfillment)" class="mt-4">
      <div class="text-sm theme-text-muted mb-2">{{ t('orderDetail.fulfillmentTotalLines', { count: fulfillment.payload_line_count }) }}</div>
      <div class="mb-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
        {{ t('orderDetail.fulfillmentTruncatedHint') }}
      </div>
      <div class="theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden max-h-64 overflow-y-auto">{{ fulfillment.payload }}</div>
    </div>
    <div v-else-if="fulfillmentDeliveryLines(fulfillment).length"
      class="mt-4 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary space-y-1 break-all overflow-hidden">
      <div v-for="(line, index) in fulfillmentDeliveryLines(fulfillment)" :key="lineKey(index)">{{ line }}</div>
    </div>
    <div v-else
      class="mt-4 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden">
      {{ fulfillment.payload }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { fulfillmentStatusLabel, fulfillmentTypeLabel } from '../../utils/fulfillment'
import { fulfillmentDeliveryLines } from '../../utils/orderDisplay'

const props = withDefaults(defineProps<{
  fulfillment: any
  orderNo: string
  copied: boolean
  downloading: boolean
  title?: string
  variant?: 'standard' | 'compact'
  lineKeyPrefix?: string
}>(), {
  variant: 'standard',
})

const emit = defineEmits<{
  (e: 'copy', fulfillment: any): void
  (e: 'download', orderNo: string): void
}>()

const { t } = useI18n()

const hasTitledHeader = computed(() => props.title !== undefined)

const isFulfillmentTruncated = (fulfillment: any) => {
  return fulfillment?.payload_line_count > 100
}

const fulfillmentTypeLabelText = (type: string) => fulfillmentTypeLabel(t, type, 'orderDetail')

const fulfillmentStatusLabelText = (status: string) => fulfillmentStatusLabel(t, status, 'orderDetail')

const lineKey = (index: number) => `${props.lineKeyPrefix || `fulfillment-${props.orderNo || 'order'}`}-${index}`
</script>
