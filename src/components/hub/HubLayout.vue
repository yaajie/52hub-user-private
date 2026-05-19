<template>
  <div class="min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <HubHero
        :accent="accent"
        :accent-gradient="accentGradient"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :cta-primary="hero.ctaPrimary"
        :cta-secondary="hero.ctaSecondary"
      />

      <HubSection
        v-for="section in sections"
        :key="section.title"
        :title="section.title"
        :items="section.items"
        :accent="accent"
      />

      <HubModelTable
        v-if="modelTable"
        :title="modelTable.title"
        :columns="modelTable.columns"
        :rows="modelTable.rows"
      />

      <HubFaq :items="faq" />

      <section v-if="cta.length" class="mb-10">
        <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">订阅直充</h2>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <HubCtaCard
            v-for="card in cta"
            :key="card.fallbackName"
            :slug="card.slug"
            :url="card.url"
            :fallback-name="card.fallbackName"
            :fallback-desc="card.fallbackDesc"
            :accent="accent"
          />
        </div>
      </section>
    </div>

    <HubRelatedList
      :title="related.title"
      :desc="related.desc"
      :items="related.items"
    />
  </div>
</template>

<script setup lang="ts">
import HubCtaCard from './HubCtaCard.vue'
import HubFaq from './HubFaq.vue'
import HubHero from './HubHero.vue'
import HubModelTable from './HubModelTable.vue'
import HubRelatedList from './HubRelatedList.vue'
import HubSection from './HubSection.vue'

withDefaults(defineProps<{
  accent?: string
  accentGradient?: string
  hero: {
    title: string
    subtitle: string
    ctaPrimary?: { label: string; to: string }
    ctaSecondary?: { label: string; to: string }
  }
  sections: Array<{
    title: string
    items: Array<{ name: string; url: string; desc: string }>
  }>
  modelTable?: {
    title?: string
    columns: string[]
    rows: Array<{ cells: string[] }>
  }
  faq?: Array<{ q: string; a: string }>
  cta: Array<{
    slug?: string
    url: string
    fallbackName: string
    fallbackDesc: string
  }>
  related: {
    title?: string
    desc?: string
    items: Array<{ to: string; text: string }>
  }
}>(), {
  accent: '#6366f1',
  faq: () => [],
})
</script>
