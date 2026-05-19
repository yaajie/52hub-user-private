<template>
  <section class="mb-10">
    <div class="flex items-center gap-3">
      <span class="h-7 w-1.5 rounded-full" :style="{ background: accent }"></span>
      <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">{{ title }}</h2>
    </div>
    <div class="mt-4 grid gap-4" :class="gridClass">
      <HubResourceCard
        v-for="item in items"
        :key="`${title}-${item.name}`"
        :name="item.name"
        :url="item.url"
        :desc="item.desc"
        :accent="accent"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HubResourceCard from './HubResourceCard.vue'

const props = withDefaults(defineProps<{
  title: string
  items: Array<{ name: string; url: string; desc: string }>
  accent?: string
}>(), {
  accent: '#6366f1',
})

// 按卡片数量动态选 grid，避免 md 3+1 孤儿
const gridClass = computed(() => {
  const n = props.items.length
  if (n === 1) return 'grid-cols-1 max-w-md mx-auto'
  if (n === 2) return 'grid-cols-1 sm:grid-cols-2'
  if (n === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'  // sm/md 2+2，lg 一行
  // 3 / 5 / 6 / 其他 → 默认 3 列
  return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
})
</script>
