<template>
  <div class="hub-layout-page relative min-h-screen overflow-hidden theme-page pt-24 pb-16" :style="hubVisualStyle">
    <div class="hub-backdrop" aria-hidden="true">
      <div class="hub-grid-layer"></div>
      <div class="hub-scan-layer"></div>
    </div>

    <div class="container relative z-10 mx-auto px-4">
      <HubHero
        :accent="accent"
        :accent-gradient="accentGradient"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :logo="hero.logo"
        :cta-primary="hero.ctaPrimary"
        :cta-secondary="hero.ctaSecondary"
      />

      <section v-if="showcase" class="mb-12 grid items-center gap-8 lg:grid-cols-2">
        <div>
          <div class="flex items-center gap-3">
            <span class="h-7 w-1.5 rounded-full" :style="{ background: accent }"></span>
            <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">{{ showcase.title }}</h2>
          </div>
          <p class="mt-3 text-sm leading-relaxed theme-text-secondary sm:text-base">{{ showcase.desc }}</p>
          <ul v-if="showcase.points && showcase.points.length" class="mt-5 space-y-2.5">
            <li v-for="p in showcase.points" :key="p" class="flex items-start gap-2.5 text-sm theme-text-secondary">
              <span
                class="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                :style="{ background: accent }"
              >✓</span>
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>
        <HubMockup
          :accent="accent"
          :title="showcase.mockup.title"
          :prompt="showcase.mockup.prompt"
          :steps="showcase.mockup.steps"
        />
      </section>

      <HubFeatures
        v-if="features && features.items.length"
        :title="features.title"
        :desc="features.desc"
        :items="features.items"
        :accent="accent"
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
        :accent="accent"
      />

      <HubFaq :items="faq" />

      <section v-if="cta.length" class="mb-10">
        <div class="flex items-center gap-3">
          <span class="h-7 w-1.5 rounded-full" :style="{ background: accent }"></span>
          <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">立即下单</h2>
        </div>
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

    <div class="relative z-10">
      <HubRelatedList
        :title="related.title"
        :desc="related.desc"
        :items="related.items"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import HubCtaCard from './HubCtaCard.vue'
import HubFaq from './HubFaq.vue'
import HubFeatures from './HubFeatures.vue'
import HubHero from './HubHero.vue'
import HubMockup from './HubMockup.vue'
import HubModelTable from './HubModelTable.vue'
import HubRelatedList from './HubRelatedList.vue'
import HubSection from './HubSection.vue'

const props = withDefaults(defineProps<{
  accent?: string
  accentGradient?: string
  hero: {
    title: string
    subtitle: string
    logo?: string
    ctaPrimary?: { label: string; to: string }
    ctaSecondary?: { label: string; to: string }
  }
  features?: {
    title: string
    desc?: string
    items: Array<{ title: string; desc: string; icon?: Component }>
  }
  showcase?: {
    title: string
    desc: string
    points?: string[]
    mockup: {
      title: string
      prompt: string
      steps: Array<{ text: string; meta?: string; done?: boolean }>
    }
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
const SITE_ORIGIN = 'https://aikaitong.com'
const hubVisualStyle = computed(() => ({
  '--hub-accent': props.accent,
  '--hub-gradient': props.accentGradient || `linear-gradient(135deg, ${props.accent}, rgba(14, 165, 233, 0.55))`,
}))

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

// FAQPage Schema：FAQ 富摘要（faq 内容此前只渲染显示、未结构化输出）
const faqSchema = computed(() => {
  if (!props.faq || !props.faq.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
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
  if (faqSchema.value) {
    arr.push({ type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema.value) })
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

<style scoped>
.hub-backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.hub-grid-layer {
  position: absolute;
  inset: -1px;
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--hub-accent) 11%, transparent) 1px, transparent 1px),
    linear-gradient(180deg, color-mix(in srgb, var(--hub-accent) 9%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.22;
  mask-image: linear-gradient(180deg, black 0%, transparent 46%);
}

.hub-scan-layer {
  position: absolute;
  left: 50%;
  top: 0;
  width: min(720px, 90vw);
  height: 320px;
  transform: translateX(-50%);
  background:
    radial-gradient(ellipse at center top, color-mix(in srgb, var(--hub-accent) 20%, transparent), transparent 64%),
    var(--hub-gradient);
  opacity: 0.11;
  filter: blur(18px);
  mask-image: linear-gradient(180deg, black 0%, transparent 82%);
}
</style>
