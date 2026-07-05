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

        <div v-if="order.children && order.children.length > 0"
          class="theme-panel rounded-2xl p-6">
          <h2 class="text-lg font-bold mb-4">{{ t('orderDetail.childOrdersTitle') }}</h2>
          <div class="space-y-4">
            <div v-for="child in order.children" :key="child.id"
              class="theme-surface-soft border rounded-2xl p-4">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div class="text-sm theme-text-muted">{{ t('orderDetail.childOrderNo') }}：{{ child.order_no }}</div>
                  <div class="text-xs theme-text-muted mt-1">{{ t('orderDetail.childOrderAmount') }}：{{
                    formatMoney(child.total_amount, child.currency || order.currency) }}</div>
                </div>
                <OrderStatusBadge :status="child.status" />
              </div>
              <div class="mt-4">
                <h3 class="text-sm font-semibold theme-text-primary mb-3">{{ t('orderDetail.childItemsTitle')
                  }}</h3>
                <div v-if="child.items && child.items.length" class="space-y-3">
                  <div v-for="(item, cidx) in child.items" :key="cidx"
                    class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 border-b theme-border pb-3 text-sm theme-text-muted">
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
                      <div>{{ t('orderDetail.unitPriceLabel') }}：{{ formatMoney(item.unit_price, order.currency) }}
                      </div>
                      <div>{{ t('orderDetail.totalPriceLabel') }}：{{ formatMoney(item.total_price, order.currency) }}
                      </div>
                      <div v-if="hasDiscountAmount(item.coupon_discount_amount)">
                        {{ t('orderDetail.couponDiscountLabel') }}：{{ formatMoney(item.coupon_discount_amount,
                        order.currency) }}
                      </div>
                      <div v-if="hasDiscountAmount(item.promotion_discount_amount)">
                        {{ t('orderDetail.promotionDiscountLabel') }}：{{ formatMoney(item.promotion_discount_amount,
                        order.currency) }}
                      </div>
                      <div v-if="hasDiscountAmount(item.member_discount_amount)" class="text-amber-700 dark:text-amber-400">
                        {{ t('orderDetail.memberDiscountLabel') }}：{{ formatMoney(item.member_discount_amount,
                        order.currency) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-sm theme-text-muted">{{ t('orderDetail.noItems') }}</div>
              </div>
              <div class="mt-4">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-sm font-semibold theme-text-primary">{{
                    t('orderDetail.childFulfillmentTitle') }}</h3>
                  <button v-if="child.fulfillment?.status === 'delivered'"
                    class="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                    :class="fulfillmentCopied ? 'bg-[var(--ui-success)] text-white' : 'theme-btn-primary'"
                    @click="handleCopyFulfillment(child.fulfillment)">
                    <svg v-if="!fulfillmentCopied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {{ fulfillmentCopied ? t('orderDetail.fulfillmentCopied') : t('orderDetail.fulfillmentCopy') }}
                  </button>
                </div>
                <div v-if="child.fulfillment">
                  <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentType') }}：{{
                    fulfillmentTypeLabelText(child.fulfillment.type) }}</div>
                  <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentStatus') }}：{{
                    fulfillmentStatusLabelText(child.fulfillment.status) }}</div>
                  <div v-if="isFulfillmentTruncated(child.fulfillment)" class="mt-3">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentTotalLines', { count: child.fulfillment.payload_line_count }) }}</span>
                      <button class="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg theme-btn-primary transition-colors shadow-sm disabled:opacity-50"
                        :disabled="fulfillmentDownloading"
                        @click="handleDownloadFulfillment(child.order_no || order.order_no)">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
                        {{ fulfillmentDownloading ? t('orderDetail.fulfillmentDownloading') : t('orderDetail.fulfillmentDownload') }}
                      </button>
                    </div>
                    <div class="mb-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                      {{ t('orderDetail.fulfillmentTruncatedHint') }}
                    </div>
                    <div class="theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden max-h-48 overflow-y-auto">{{ child.fulfillment.payload }}</div>
                  </div>
                  <div v-else-if="fulfillmentDeliveryLines(child.fulfillment).length"
                    class="mt-3 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary space-y-1 break-all overflow-hidden">
                    <div v-for="(line, index) in fulfillmentDeliveryLines(child.fulfillment)" :key="`child-fulfillment-${child.id}-${index}`">{{ line }}</div>
                  </div>
                  <div v-else-if="child.fulfillment.payload"
                    class="mt-3 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden">
                    {{ child.fulfillment.payload }}
                  </div>
                </div>
                <div v-else class="text-sm theme-text-muted">{{ t('orderDetail.childFulfillmentEmpty') }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="order.fulfillment"
          class="theme-panel rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold">{{ t('orderDetail.fulfillmentTitle') }}</h2>
            <div class="flex items-center gap-2">
              <button v-if="isFulfillmentTruncated(order.fulfillment)"
                class="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg theme-btn-primary transition-colors shadow-sm disabled:opacity-50"
                :disabled="fulfillmentDownloading"
                @click="handleDownloadFulfillment(order.order_no)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/></svg>
                {{ fulfillmentDownloading ? t('orderDetail.fulfillmentDownloading') : t('orderDetail.fulfillmentDownload') }}
              </button>
              <button v-if="order.fulfillment.status === 'delivered' && !isFulfillmentTruncated(order.fulfillment)"
                class="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                :class="fulfillmentCopied ? 'bg-[var(--ui-success)] text-white' : 'theme-btn-primary'"
                @click="handleCopyFulfillment(order.fulfillment)">
                <svg v-if="!fulfillmentCopied" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ fulfillmentCopied ? t('orderDetail.fulfillmentCopied') : t('orderDetail.fulfillmentCopy') }}
              </button>
            </div>
          </div>
          <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentType') }}：{{
            fulfillmentTypeLabelText(order.fulfillment.type) }}</div>
          <div class="text-sm theme-text-muted">{{ t('orderDetail.fulfillmentStatus') }}：{{
            fulfillmentStatusLabelText(order.fulfillment.status) }}</div>
          <div v-if="isFulfillmentTruncated(order.fulfillment)" class="mt-4">
            <div class="text-sm theme-text-muted mb-2">{{ t('orderDetail.fulfillmentTotalLines', { count: order.fulfillment.payload_line_count }) }}</div>
            <div class="mb-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
              {{ t('orderDetail.fulfillmentTruncatedHint') }}
            </div>
            <div class="theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden max-h-64 overflow-y-auto">{{ order.fulfillment.payload }}</div>
          </div>
          <div v-else-if="fulfillmentDeliveryLines(order.fulfillment).length"
            class="mt-4 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary space-y-1 break-all overflow-hidden">
            <div v-for="(line, index) in fulfillmentDeliveryLines(order.fulfillment)" :key="`fulfillment-${order.order_no || 'order'}-${index}`">{{ line }}</div>
          </div>
          <div v-else
            class="mt-4 theme-surface-soft border rounded-xl p-4 text-sm theme-text-secondary whitespace-pre-wrap break-all overflow-hidden">
            {{ order.fulfillment.payload }}
          </div>
        </div>

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
import { fulfillmentStatusLabel, fulfillmentTypeLabel } from '../utils/fulfillment'
import { debounceAsync } from '../utils/debounce'
import { copyText } from '../utils/clipboard'
import { buildSkuDisplayTextFromSnapshot } from '../utils/sku'
import { processHtmlForDisplay } from '../utils/content'
import {
  formatDate,
  formatMoney,
  hasDiscountAmount,
  hasAmount,
  orderItemImage,
  formatManualValue,
  normalizeManualSnapshotFields,
  fulfillmentDeliveryLines,
  type ManualFormSnapshotField,
} from '../utils/orderDisplay'
import { useConfirmDialog } from '../composables/useConfirmDialog'
import { toast } from '../composables/useToast'
import { productAPI } from '../api'
import OrderStatusBadge from '../components/order/OrderStatusBadge.vue'
import OrderItemsList from '../components/order/OrderItemsList.vue'

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

const isFulfillmentTruncated = (fulfillment: any) => {
  return fulfillment?.payload_line_count > 100
}

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

const fulfillmentTypeLabelText = (type: string) => fulfillmentTypeLabel(t, type, 'orderDetail')

const fulfillmentStatusLabelText = (status: string) => fulfillmentStatusLabel(t, status, 'orderDetail')

const getLocalizedText = (jsonData: any) => {
  if (!jsonData) return ''
  const locale = appStore.locale
  return jsonData[locale] || jsonData['zh-CN'] || jsonData['en-US'] || ''
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

const orderItemSkuText = (item: any) => {
  return buildSkuDisplayTextFromSnapshot(item?.sku_snapshot, {
    locale: appStore.locale,
    fallback: t('productDetail.skuFallback'),
  })
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
