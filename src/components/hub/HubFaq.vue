<template>
  <section v-if="items.length" class="mb-10">
    <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">常见问题</h2>
    <div class="mt-4 space-y-3">
      <details
        v-for="item in items"
        :key="item.q"
        class="rounded-xl border theme-border theme-panel p-5"
      >
        <summary class="cursor-pointer text-sm font-semibold theme-text-primary sm:text-base">{{ item.q }}</summary>
        <p class="mt-3 text-sm leading-relaxed theme-text-secondary">{{ item.a }}</p>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'

const props = defineProps<{
  items: Array<{ q: string; a: string }>
}>()

const faqSchema = computed(() => {
  if (!props.items.length) return []
  return [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.items.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }),
    },
  ]
})

useHead({ script: faqSchema })
</script>
