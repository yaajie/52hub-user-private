<template>
  <section class="rounded-2xl border theme-border theme-panel p-4">
    <div class="grid grid-cols-1 gap-3">

      <div class="rounded-xl border theme-border bg-[var(--ui-bg-soft)] p-3">
        <div class="flex items-start gap-2">
          <IconWeChat class="mt-0.5 h-5 w-5 shrink-0 text-[#07C160]" />
          <div class="min-w-0">
            <p class="text-sm font-bold theme-text-primary">企微在线客服</p>
            <p class="mt-1 text-xs font-medium theme-text-secondary">点击直接咨询，无需加好友</p>
          </div>
        </div>
        <a
          :href="CONTACTS.wechatService"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          打开在线客服
        </a>
        <div class="mt-3 flex items-center justify-between gap-2 border-t theme-border pt-3">
          <span class="text-xs font-medium theme-text-secondary"><IconQQ class="inline-block h-4 w-4 mr-1 text-[#1AB6FF] align-text-bottom" />QQ {{ CONTACTS.qq }}</span>
          <button
            type="button"
            class="rounded-md px-2 py-1 text-xs font-medium theme-btn-neutral transition"
            @click="copyGroupNumber"
          >{{ copied ? '已复制' : '复制' }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconQQ from './icons/IconQQ.vue'
import IconWeChat from './icons/IconWeChat.vue'
import { CONTACTS } from '../constants/contact'

const copied = ref(false)

const copyGroupNumber = async () => {
  try {
    await navigator.clipboard.writeText(CONTACTS.qq)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}
</script>
