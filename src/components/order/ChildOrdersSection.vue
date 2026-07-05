<template>
  <div class="theme-panel rounded-2xl p-6">
    <h2 class="text-lg font-bold mb-4">{{ t('orderDetail.childOrdersTitle') }}</h2>
    <div class="space-y-4">
      <div v-for="child in children" :key="child.id"
        class="theme-surface-soft border rounded-2xl p-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div class="text-sm theme-text-muted">{{ t('orderDetail.childOrderNo') }}：{{ child.order_no }}</div>
            <div class="text-xs theme-text-muted mt-1">{{ t('orderDetail.childOrderAmount') }}：{{
              formatMoney(child.total_amount, child.currency || parentCurrency) }}</div>
          </div>
          <OrderStatusBadge :status="child.status" />
        </div>
        <div class="mt-4">
          <h3 class="text-sm font-semibold theme-text-primary mb-3">{{ t('orderDetail.childItemsTitle')
            }}</h3>
          <OrderItemsList :items="child.items" :currency="parentCurrency" variant="compact" />
        </div>
        <FulfillmentCard variant="compact"
          :fulfillment="child.fulfillment"
          :order-no="child.order_no || parentOrderNo"
          :line-key-prefix="`child-fulfillment-${child.id}`"
          :copied="fulfillmentCopied"
          :downloading="fulfillmentDownloading"
          @copy="emit('copy-fulfillment', $event)"
          @download="emit('download-fulfillment', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { formatMoney } from '../../utils/orderDisplay'
import OrderStatusBadge from './OrderStatusBadge.vue'
import OrderItemsList from './OrderItemsList.vue'
import FulfillmentCard from './FulfillmentCard.vue'

defineProps<{
  children: any[]
  parentCurrency?: string
  parentOrderNo: string
  fulfillmentCopied: boolean
  fulfillmentDownloading: boolean
}>()

const emit = defineEmits<{
  (e: 'copy-fulfillment', fulfillment: any): void
  (e: 'download-fulfillment', orderNo: string): void
}>()

const { t } = useI18n()
</script>
