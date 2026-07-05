<template>
  <header
    class="relative mb-10 overflow-hidden rounded-2xl border theme-border theme-panel px-5 py-7 sm:px-8 sm:py-10"
    :style="heroStyle"
  >
    <div class="pointer-events-none absolute inset-0 opacity-70 hub-hero-noise"></div>
    <div class="relative max-w-3xl">
      <div class="mb-4 inline-flex items-center gap-2 rounded-full border theme-border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] theme-text-secondary">
        <span class="h-1.5 w-1.5 rounded-full" :style="{ background: accent, boxShadow: `0 0 10px ${accent}` }"></span>
        AIKAITONG · AI HUB
      </div>
      <div class="flex items-center gap-3 sm:gap-4">
        <img v-if="logo" :src="logo" alt="" class="h-12 w-12 shrink-0 object-contain drop-shadow-md sm:h-14 sm:w-14 lg:h-[3.75rem] lg:w-[3.75rem]" />
        <h1 class="text-3xl font-black leading-tight tracking-tight theme-text-primary sm:text-4xl lg:text-5xl">{{ title }}</h1>
      </div>
        <p class="mt-4 max-w-2xl text-sm leading-relaxed theme-text-secondary sm:text-base">{{ subtitle }}</p>
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
  logo?: string
  ctaPrimary?: { label: string; to: string }
  ctaSecondary?: { label: string; to: string }
}>(), {
  accent: '#d9480f',
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
