<template>
  <section class="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 dark:border-blue-400/20 dark:bg-blue-400/10">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-start gap-3">
        <UserGroupIcon class="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
        <div>
          <p class="text-sm font-bold theme-text-primary">售前售后咨询请加 QQ 群：{{ qqGroup }}</p>
          <div class="mt-1 space-y-0.5 text-xs theme-text-secondary">
            <p>问题：本群密码是？</p>
            <p>答案：{{ groupAnswer }}</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        @click="copyGroupNumber"
      >
        <ClipboardDocumentIcon class="h-4 w-4" />
        {{ copied ? '已复制群号' : '复制QQ群号' }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ClipboardDocumentIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

const copied = ref(false)
const qqGroup = '1105879333'
const groupAnswer = '52hub'

const copyGroupNumber = async () => {
  try {
    await navigator.clipboard.writeText(qqGroup)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    copied.value = false
  }
}
</script>
