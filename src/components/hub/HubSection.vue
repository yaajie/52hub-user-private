<template>
  <section class="mb-10">
    <div class="flex items-center gap-3">
      <span class="h-7 w-1.5 rounded-full" :style="{ background: accent }"></span>
      <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">{{ title }}</h2>
    </div>
    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
import HubResourceCard from './HubResourceCard.vue'

withDefaults(defineProps<{
  title: string
  items: Array<{ name: string; url: string; desc: string }>
  accent?: string
}>(), {
  accent: '#6366f1',
})
</script>
