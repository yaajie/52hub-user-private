<template>
  <router-link
    :to="url"
    class="group block rounded-xl border theme-border theme-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:theme-surface-strong"
  >
    <h3 class="text-base font-semibold theme-text-primary">{{ fallbackName }}</h3>
    <p class="mt-2 text-sm leading-relaxed theme-text-secondary">{{ fallbackDesc }}</p>
    <span class="mt-4 inline-flex text-sm font-semibold" :style="{ color: accent }">查看商品 -></span>
  </router-link>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  slug?: string
  url: string
  fallbackName: string
  fallbackDesc: string
  accent?: string
}>(), {
  accent: '#6366f1',
})
</script>
