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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import HubCtaCard from './HubCtaCard.vue'
import HubFaq from './HubFaq.vue'
import HubHero from './HubHero.vue'
import HubModelTable from './HubModelTable.vue'
import HubRelatedList from './HubRelatedList.vue'
import HubSection from './HubSection.vue'

const props = withDefaults(defineProps<{
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
  ogImage?: string
}>(), {
  accent: '#6366f1',
  faq: () => [],
})

const route = useRoute()
const SITE_ORIGIN = 'https://52hub.org'

// Breadcrumb Schema：首页 → 当前 hub
const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_ORIGIN}/` },
    { '@type': 'ListItem', position: 2, name: props.hero.title, item: `${SITE_ORIGIN}${route.path}` },
  ],
}))

// ItemList Schema：CTA 商品列表，只算 /products/:slug 这种真实商品链接
const productCtas = computed(() =>
  props.cta.filter((c) => {
    const target = c.url || ''
    return target.startsWith('/products/')
  })
)

const itemListSchema = computed(() => {
  if (!productCtas.value.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: productCtas.value.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.fallbackName,
      url: `${SITE_ORIGIN}${c.url}`,
    })),
  }
})

// 注入 Schema 脚本
const schemaScripts = computed(() => {
  const arr: Array<{ type: string; innerHTML: string }> = [
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema.value) },
  ]
  if (itemListSchema.value) {
    arr.push({ type: 'application/ld+json', innerHTML: JSON.stringify(itemListSchema.value) })
  }
  return arr
})

// og:image meta（只有 ogImage 时才注入）
const ogImageMeta = computed(() => {
  if (!props.ogImage) return []
  const fullUrl = props.ogImage.startsWith('http') ? props.ogImage : `${SITE_ORIGIN}${props.ogImage}`
  return [
    { property: 'og:image', content: fullUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: fullUrl },
  ]
})

useHead({
  script: schemaScripts,
  meta: ogImageMeta,
})
</script>
