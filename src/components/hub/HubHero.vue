<template>
  <header
    class="relative mb-10 overflow-hidden rounded-2xl border theme-border theme-panel px-5 py-7 sm:px-8 sm:py-10"
    :style="heroStyle"
  >
    <div class="pointer-events-none absolute inset-0 opacity-70 hub-hero-noise"></div>
    <div class="relative max-w-3xl">
      <h1 class="text-3xl font-bold theme-text-primary sm:text-4xl">{{ title }}</h1>
      <p class="mt-3 text-sm leading-relaxed theme-text-secondary sm:text-base">{{ subtitle }}</p>
      <div v-if="ctaPrimary || ctaSecondary" class="mt-6 flex flex-wrap gap-3">
        <router-link
          v-if="ctaPrimary"
          :to="ctaPrimary.to"
          class="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          :style="{ background: accentGradient || accent }"
        >
          {{ ctaPrimary.label }}
        </router-link>
        <router-link
          v-if="ctaSecondary"
          :to="ctaSecondary.to"
          class="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold theme-text-primary transition-colors hover:theme-surface-strong"
          :style="{ borderColor: accent }"
        >
          {{ ctaSecondary.label }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  accent?: string
  accentGradient?: string
  title: string
  subtitle: string
  ctaPrimary?: { label: string; to: string }
  ctaSecondary?: { label: string; to: string }
}>(), {
  accent: '#6366f1',
})

const heroStyle = computed(() => ({
  background: `linear-gradient(135deg, ${props.accent}1F 0%, transparent 58%)`,
}))
</script>

<style scoped>
.hub-hero-noise {
  background-image:
    radial-gradient(circle at 20% 15%, rgba(255, 255, 255, 0.2), transparent 24%),
    radial-gradient(circle at 82% 26%, rgba(255, 255, 255, 0.12), transparent 28%);
}
</style>
