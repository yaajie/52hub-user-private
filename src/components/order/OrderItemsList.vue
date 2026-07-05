<template>
  <div v-if="items && items.length > 0" :class="variant === 'compact' ? 'space-y-3' : 'space-y-4'">
    <div v-for="(item, idx) in items" :key="idx"
      class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 border-b theme-border pb-3"
      :class="variant === 'compact' ? 'text-sm theme-text-muted' : ''">
      <div class="flex min-w-0 items-start gap-3">
        <div class="h-14 w-14 shrink-0 overflow-hidden rounded-xl border theme-panel transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:h-16 sm:w-16">
          <img
            v-if="orderItemImage(item)"
            :src="orderItemImage(item)"
            :alt="getLocalizedText(item.title)"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
          />
          <div v-else class="flex h-full w-full items-center justify-center theme-text-muted">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <div class="min-w-0">
          <div class="theme-text-primary font-medium">{{ getLocalizedText(item.title) }}</div>
          <div class="text-xs theme-text-muted">{{ t('orderDetail.quantityLabel') }}：{{ item.quantity }}</div>
          <div v-if="orderItemSkuText(item)" class="text-xs theme-text-muted mt-1">{{ t('orderDetail.itemSkuLabel') }}：{{ orderItemSkuText(item) }}</div>
          <div class="text-xs theme-text-muted mt-1">
            {{ t('orderDetail.itemFulfillmentLabel') }}：{{ fulfillmentTypeLabelText(item.fulfillment_type) }}
          </div>
          <div v-if="item.tags && item.tags.length" class="mt-2 flex flex-wrap gap-2">
            <span v-for="(tag, index) in item.tags" :key="index"
              class="px-2 py-0.5 text-[11px] rounded-full theme-surface-muted border theme-text-muted">
              {{ tag }}
            </span>
          </div>
          <div v-if="manualSubmissionRows(item.manual_form_submission, item.manual_form_schema_snapshot).length"
            class="mt-3 rounded-xl border theme-panel p-3 text-xs theme-text-secondary">
            <div class="mb-2 font-semibold theme-text-secondary">{{ t('orderDetail.manualSubmissionTitle') }}</div>
            <div v-for="row in manualSubmissionRows(item.manual_form_submission, item.manual_form_schema_snapshot)" :key="row.key" class="mb-1 last:mb-0">
              <span class="theme-text-primary">{{ row.label }}</span>：{{ row.value }}
            </div>
          </div>
        </div>
      </div>
      <div class="shrink-0 pl-[4.25rem] sm:pl-0 text-left sm:text-right text-sm theme-text-muted space-y-1">
        <div>{{ t('orderDetail.unitPriceLabel') }}：{{ formatMoney(item.unit_price, currency) }}</div>
        <div>{{ t('orderDetail.totalPriceLabel') }}：{{ formatMoney(item.total_price, currency) }}</div>
        <div v-if="hasDiscountAmount(item.coupon_discount_amount)">
          {{ t('orderDetail.couponDiscountLabel') }}：{{ formatMoney(item.coupon_discount_amount, currency)
          }}
        </div>
        <div v-if="hasDiscountAmount(item.promotion_discount_amount)">
          {{ t('orderDetail.promotionDiscountLabel') }}：{{ formatMoney(item.promotion_discount_amount,
          currency) }}
        </div>
        <div v-if="hasDiscountAmount(item.member_discount_amount)" class="text-amber-700 dark:text-amber-400">
          {{ t('orderDetail.memberDiscountLabel') }}：{{ formatMoney(item.member_discount_amount,
          currency) }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-sm theme-text-muted">{{ t('orderDetail.noItems') }}</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../../stores/app'
import { buildSkuDisplayTextFromSnapshot } from '../../utils/sku'
import { fulfillmentTypeLabel } from '../../utils/fulfillment'
import {
  formatMoney,
  hasDiscountAmount,
  orderItemImage,
  formatManualValue,
  normalizeManualSnapshotFields,
  type ManualFormSnapshotField,
} from '../../utils/orderDisplay'

withDefaults(defineProps<{ items: any[]; currency?: string; variant?: 'standard' | 'compact' }>(), {
  variant: 'standard',
})

const appStore = useAppStore()
const { t } = useI18n()

const getLocalizedText = (jsonData: any) => {
  if (!jsonData) return ''
  const locale = appStore.locale
  return jsonData[locale] || jsonData['zh-CN'] || jsonData['en-US'] || ''
}

const fulfillmentTypeLabelText = (type: string) => fulfillmentTypeLabel(t, type, 'orderDetail')

const orderItemSkuText = (item: any) => {
  return buildSkuDisplayTextFromSnapshot(item?.sku_snapshot, {
    locale: appStore.locale,
    fallback: t('productDetail.skuFallback'),
  })
}

const resolveManualFieldLabel = (field: ManualFormSnapshotField) => {
  if (typeof field.label === 'string' && field.label.trim()) return field.label.trim()
  if (field.label && typeof field.label === 'object') {
    const localized = getLocalizedText(field.label)
    if (localized) return localized
  }
  return field.key
}

const manualSubmissionRows = (submission: any, schemaSnapshot?: any) => {
  if (!submission || typeof submission !== 'object') return []
  const entries = Object.entries(submission).filter(([key]) => String(key).trim() !== '')
  if (entries.length === 0) return []

  const valueMap = new Map(entries.map(([key, value]) => [String(key), value] as const))
  const rows: Array<{ key: string; label: string; value: string }> = []

  normalizeManualSnapshotFields(schemaSnapshot).forEach((field) => {
    if (!valueMap.has(field.key)) return
    rows.push({
      key: field.key,
      label: resolveManualFieldLabel(field),
      value: formatManualValue(valueMap.get(field.key)),
    })
    valueMap.delete(field.key)
  })

  valueMap.forEach((value, key) => {
    rows.push({
      key,
      label: key,
      value: formatManualValue(value),
    })
  })

  return rows
}
</script>
