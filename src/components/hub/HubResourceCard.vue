<template>
  <component
    :is="isInternal ? 'router-link' : 'a'"
    v-spotlight
    :to="isInternal ? url : undefined"
    :href="isInternal ? undefined : url"
    :target="isInternal ? undefined : '_blank'"
    :rel="isInternal ? undefined : 'noopener noreferrer'"
    class="group relative block overflow-hidden rounded-xl border theme-border theme-panel p-4 transition-all duration-300 hover:-translate-y-0.5 hover:theme-surface-strong"
  >
    <div class="flex items-start gap-3">
      <span
        class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold"
        :style="{ backgroundColor: `${accent}1A`, color: accent }"
      >
        {{ name.charAt(0) }}
      </span>
      <span class="min-w-0 flex-1">
        <span class="block truncate text-base font-semibold theme-text-primary">{{ name }}</span>
        <span class="mt-1 block truncate font-mono text-xs theme-text-muted">{{ host }}</span>
      </span>
      <span class="translate-x-1 text-lg theme-text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">-></span>
    </div>
    <p class="mt-3 text-sm leading-relaxed theme-text-secondary">{{ desc }}</p>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  url: string
  desc: string
  accent?: string
}>(), {
  accent: '#6366f1',
})

const isInternal = computed(() => props.url.startsWith('/'))
const host = computed(() => {
  if (isInternal.value) return props.url
  try {
    return new URL(props.url).hostname.replace(/^www\./, '')
  } catch {
    return props.url
  }
})
</script>
