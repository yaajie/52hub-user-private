<template>
  <div class="fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-6">
    <div
      v-if="open"
      id="contact-float-panel"
      class="mb-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/15 dark:border-white/10 dark:bg-gray-950"
    >
      <div class="border-b border-gray-100 px-4 py-3 dark:border-white/10">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-bold theme-text-primary">联系 52Hub 客服</p>
            <p class="mt-1 text-xs theme-text-muted">人工发货与订单问题请优先加群咨询</p>
          </div>
          <button
            type="button"
            class="rounded-lg p-2 theme-text-muted transition hover:bg-gray-100 hover:theme-text-primary dark:hover:bg-white/10"
            aria-label="关闭客服面板"
            @click="open = false"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div class="space-y-3 p-4">
        <QQContactCard />

        <a
          v-if="telegramUrl"
          :href="telegramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2 text-sm transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
        >
          <span class="font-medium theme-text-primary">Telegram</span>
          <ArrowTopRightOnSquareIcon class="h-4 w-4 theme-text-muted" />
        </a>

        <a
          v-if="supportEmail"
          :href="`mailto:${supportEmail}`"
          class="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2 text-sm transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
        >
          <span class="font-medium theme-text-primary">{{ supportEmail }}</span>
          <EnvelopeIcon class="h-4 w-4 theme-text-muted" />
        </a>
      </div>
    </div>

    <button
      type="button"
      class="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      :aria-expanded="open"
      aria-controls="contact-float-panel"
      @click="open = !open"
    >
      <ChatBubbleLeftRightIcon class="h-5 w-5" />
      联系客服
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useAppStore } from '../stores/app'
import QQContactCard from './QQContactCard.vue'

const appStore = useAppStore()

const open = ref(false)

const telegramUrl = computed(() => {
  const value = appStore.config?.contact?.telegram
  return typeof value === 'string' && value.trim() ? value.trim() : ''
})

const supportEmail = computed(() => {
  const value = appStore.config?.contact?.email
  return typeof value === 'string' && value.trim() ? value.trim() : ''
})

</script>
