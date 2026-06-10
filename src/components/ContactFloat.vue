<template>
  <div
    :class="[
      'fixed right-4 z-40 sm:bottom-24 lg:bottom-6 lg:right-6',
      hideOnMobileToolPage ? 'hidden sm:block' : 'bottom-36',
    ]"
  >
    <div
      v-if="open"
      id="contact-float-panel"
      class="mb-3 w-64 sm:w-72 overflow-hidden rounded-2xl border theme-panel shadow-2xl"
    >
      <div class="border-b theme-border px-4 py-3">
        <div class="flex items-center justify-between gap-3">
          <p class="text-sm font-bold theme-text-primary">联系我们</p>
          <button
            type="button"
            class="rounded-lg p-1.5 theme-text-muted transition hover:bg-[var(--ui-bg-soft)]"
            aria-label="关闭"
            @click="open = false"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div class="space-y-2 p-3">
        <a
          :href="CONTACTS.wechatService"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2.5 text-sm transition hover:bg-emerald-100/80 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/15"
        >
          <span class="font-medium theme-text-primary"><span class="inline-block h-2 w-2 mr-1.5 rounded-full bg-emerald-500 align-middle"></span>企微在线客服</span>
          <ArrowTopRightOnSquareIcon class="h-4 w-4 theme-text-muted" />
        </a>

        <a
          :href="telegramServiceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-xl border border-sky-200 bg-sky-50/80 px-3 py-2.5 text-sm transition hover:bg-sky-100/80 dark:border-sky-500/20 dark:bg-sky-500/10 dark:hover:bg-sky-500/15"
        >
          <span class="font-medium theme-text-primary"><PaperAirplaneIcon class="inline-block h-4 w-4 mr-1 text-sky-500 align-text-bottom" />TG 联系客服</span>
          <ArrowTopRightOnSquareIcon class="h-4 w-4 theme-text-muted" />
        </a>

        <a
          :href="CONTACTS.telegramChannel"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-xl border border-cyan-200 bg-cyan-50/80 px-3 py-2.5 text-sm transition hover:bg-cyan-100/80 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/15"
        >
          <span class="font-medium theme-text-primary"><MegaphoneIcon class="inline-block h-4 w-4 mr-1 text-cyan-500 align-text-bottom" />TG 公告频道</span>
          <ArrowTopRightOnSquareIcon class="h-4 w-4 theme-text-muted" />
        </a>

        <div class="rounded-xl border theme-border px-3 py-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-sm font-medium theme-text-primary"><IconQQ class="inline-block h-4 w-4 mr-1 text-[#1AB6FF] align-text-bottom" />QQ {{ CONTACTS.qq }}</span>
            <button
              type="button"
              class="rounded-md px-2 py-1 text-xs font-medium bg-[var(--ui-bg-soft)] theme-text-secondary transition hover:bg-[var(--ui-bg-muted)]"
              @click="copyQQ"
            >{{ copied ? '已复制' : '复制' }}</button>
          </div>
        </div>

        <a
          v-if="supportEmail"
          :href="`mailto:${supportEmail}`"
          class="flex items-center justify-between rounded-xl border theme-border px-3 py-2.5 text-sm transition hover:bg-[var(--ui-bg-soft)]"
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
import { useRoute } from 'vue-router'
import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import IconQQ from './icons/IconQQ.vue'
import { useAppStore } from '../stores/app'
import { CONTACTS } from '../constants/contact'

const appStore = useAppStore()
const route = useRoute()

const open = ref(false)
const copied = ref(false)
const hideOnMobileToolPage = computed(() => route.path === '/tools/codex-auth')

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
    await navigator.clipboard.writeText(CONTACTS.qq)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // clipboard not available, no-op
  }
}
</script>
