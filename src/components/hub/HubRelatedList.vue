<template>
  <section v-if="items.length" class="container mx-auto px-4 pb-12 pt-6">
    <div class="rounded-2xl border theme-border theme-panel p-6 sm:p-8">
      <h2 class="mb-4 text-lg font-semibold theme-text-primary sm:text-xl">{{ title }}</h2>
      <p v-if="desc" class="mb-4 text-sm leading-relaxed theme-text-secondary">{{ desc }}</p>
      <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <li v-for="item in visibleItems" :key="item.to">
          <router-link :to="item.to" class="theme-link-muted transition-colors hover:theme-text-primary">
            {{ item.text }} ->
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  desc?: string
  items: Array<{ to: string; text: string }>
}>(), {
  title: '相关教程',
})

const visibleItems = computed(() => props.items)
</script>
