<template>
  <section class="rounded-2xl border theme-border theme-panel p-4">
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div class="rounded-xl border border-sky-200 bg-sky-50/80 p-3 dark:border-sky-500/20 dark:bg-sky-500/10">
        <div class="flex items-start gap-2">
          <PaperAirplaneIcon class="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
          <div class="min-w-0">
            <p class="text-sm font-bold theme-text-primary">TG 联系客服</p>
            <p class="mt-1 truncate text-xs font-medium theme-text-secondary">@HUB52service</p>
          </div>
        </div>
        <a
          :href="telegramServiceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          打开 Telegram
        </a>
      </div>

      <div class="rounded-xl border border-cyan-200 bg-cyan-50/80 p-3 dark:border-cyan-500/20 dark:bg-cyan-500/10">
        <div class="flex items-start gap-2">
          <MegaphoneIcon class="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
          <div class="min-w-0">
            <p class="text-sm font-bold theme-text-primary">TG 公告频道</p>
            <p class="mt-1 truncate text-xs font-medium theme-text-secondary">@Hub52Notice</p>
          </div>
        </div>
        <a
          :href="CONTACTS.telegramChannel"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          打开 Telegram
        </a>
      </div>

      <div class="rounded-xl border border-gray-200 bg-gray-50/90 p-3 dark:border-white/10 dark:bg-white/5">
        <div class="flex items-start gap-2">
          <IconQQ class="mt-0.5 h-5 w-5 shrink-0 text-[#1AB6FF]" />
          <div class="min-w-0">
            <p class="text-sm font-bold theme-text-primary">加 QQ 群</p>
            <p class="mt-1 text-xs font-medium theme-text-secondary">{{ CONTACTS.qqGroup }}</p>
          </div>
        </div>
        <button
          type="button"
          class="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
          @click="copyGroupNumber"
        >
          <ClipboardDocumentIcon class="h-4 w-4" />
          {{ copied ? '已复制群号' : '复制群号' }}
        </button>
        <p class="mt-2 text-xs theme-text-secondary">验证答案：<span class="font-medium theme-text-primary">{{ CONTACTS.qqGroupVerifyAnswer }}</span></p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ClipboardDocumentIcon, MegaphoneIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import IconQQ from './icons/IconQQ.vue'
import { useAppStore } from '../stores/app'
import { CONTACTS } from '../constants/contact'

const appStore = useAppStore()
const copied = ref(false)

const telegramServiceUrl = computed(() => {
  const value = appStore.config?.contact?.telegram
  return typeof value === 'string' && value.trim() ? value.trim() : CONTACTS.telegramService
})

const copyGroupNumber = async () => {
  try {
    await navigator.clipboard.writeText(CONTACTS.qqGroup)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}
</script>
