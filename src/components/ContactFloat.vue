<template>
  <div class="fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-6">
    <div
      v-if="open"
      id="contact-float-panel"
      class="mb-3 w-64 sm:w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/15 dark:border-white/10 dark:bg-gray-950"
    >
      <div class="border-b border-gray-100 px-4 py-3 dark:border-white/10">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-bold theme-text-primary">联系我们</p>
          <button
            type="button"
            class="rounded-lg p-1.5 theme-text-muted transition hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label="关闭"
            @click="open = false"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div class="space-y-2 p-3">
        <a
          :href="telegramServiceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-2.5 text-sm transition hover:bg-sky-100/80 dark:border-sky-500/20 dark:bg-sky-500/10 dark:hover:bg-sky-500/15"
        >
          <span class="font-medium theme-text-primary">📨 TG 联系客服</span>
          <ArrowTopRightOnSquareIcon class="h-4 w-4 theme-text-muted" />
        </a>

        <a
          :href="CONTACTS.telegramChannel"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-xl border border-cyan-200 bg-cyan-50/80 px-3 py-2.5 text-sm transition hover:bg-cyan-100/80 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/15"
        >
          <span class="font-medium theme-text-primary">📢 TG 公告频道</span>
          <ArrowTopRightOnSquareIcon class="h-4 w-4 theme-text-muted" />
        </a>

        <div class="rounded-xl border border-gray-100 px-3 py-2.5 dark:border-white/10">
          <div class="flex items-center justify-between gap-2">
            <span class="text-sm font-medium theme-text-primary">💬 QQ 群 {{ CONTACTS.qqGroup }}</span>
            <button
              type="button"
              class="rounded-md px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/15"
              @click="copyQQ"
            >{{ copied ? '已复制' : '复制' }}</button>
          </div>
          <p class="mt-1.5 text-xs theme-text-muted">验证答案：<span class="font-medium theme-text-primary">{{ CONTACTS.qqGroupVerifyAnswer }}</span></p>
        </div>

        <a
          v-if="supportEmail"
          :href="`mailto:${supportEmail}`"
          class="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2.5 text-sm transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
        >
          <span class="text-sm font-medium theme-text-primary truncate">{{ supportEmail }}</span>
          <EnvelopeIcon class="h-4 w-4 flex-shrink-0 theme-text-muted" />
        </a>
      </div>
    </div>

    <button
      type="button"
      class="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2.5 sm:px-4 sm:py-3 text-sm font-bold text-white shadow-xl shadow-blue-900/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      :aria-expanded="open"
      aria-controls="contact-float-panel"
      @click="open = !open"
    >
      <ChatBubbleLeftRightIcon class="h-5 w-5" />
      <span class="hidden sm:inline">联系客服</span>
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
import { CONTACTS } from '../constants/contact'

const appStore = useAppStore()

const open = ref(false)
const copied = ref(false)

const telegramServiceUrl = computed(() => {
  const value = appStore.config?.contact?.telegram
  return typeof value === 'string' && value.trim() ? value.trim() : CONTACTS.telegramService
})

const supportEmail = computed(() => {
  const value = appStore.config?.contact?.email
  return typeof value === 'string' && value.trim() ? value.trim() : ''
})

const copyQQ = async () => {
  try {
    await navigator.clipboard.writeText(CONTACTS.qqGroup)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard not available, no-op
  }
}
</script>
