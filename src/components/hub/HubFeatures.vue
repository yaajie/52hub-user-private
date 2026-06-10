<template>
  <section v-if="items.length" class="mb-12">
    <div class="flex items-center gap-3">
      <span class="h-7 w-1.5 rounded-full" :style="{ background: accent }"></span>
      <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">{{ title }}</h2>
    </div>
    <p v-if="desc" class="mt-2 max-w-2xl text-sm leading-relaxed theme-text-secondary">{{ desc }}</p>

    <div class="mt-5 grid gap-4" :class="gridClass">
      <article
        v-for="(item, i) in items"
        :key="item.title"
        class="hub-feature group relative overflow-hidden rounded-2xl border theme-border theme-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:theme-surface-strong"
        :style="{ '--feat-accent': accent }"
      >
        <span class="hub-feature-bar" aria-hidden="true"></span>
        <div class="flex items-center gap-3">
          <span
            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold"
            :style="{ backgroundColor: `${accent}1A`, color: accent }"
          >
            <component :is="item.icon" v-if="item.icon" class="h-5 w-5" />
            <span v-else>{{ String(i + 1).padStart(2, '0') }}</span>
          </span>
          <h3 class="text-base font-semibold leading-snug theme-text-primary">{{ item.title }}</h3>
        </div>
        <p class="mt-3 text-sm leading-relaxed theme-text-secondary">{{ item.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

const props = withDefaults(defineProps<{
  title: string
  desc?: string
  items: Array<{ title: string; desc: string; icon?: Component }>
  accent?: string
}>(), {
  accent: '#d9480f',
})

const gridClass = computed(() => {
  const n = props.items.length
  if (n <= 2) return 'grid-cols-1 sm:grid-cols-2'
  if (n === 4) return 'grid-cols-1 sm:grid-cols-2'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
})
</script>

<style scoped>
.hub-feature-bar {
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--feat-accent);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.hub-feature:hover .hub-feature-bar {
  opacity: 0.9;
}
</style>
