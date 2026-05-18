<template>
  <div
    class="blog-detail-page min-h-screen theme-page pt-24 pb-16 relative overflow-hidden">
    <div class="container mx-auto px-4 max-w-4xl relative z-10">
      <!-- Loading State -->
      <div v-if="loading" class="animate-pulse space-y-8">
        <div class="h-8 theme-surface-muted rounded w-1/3"></div>
        <div class="space-y-4">
          <div class="h-12 theme-surface-muted rounded w-3/4"></div>
          <div class="h-6 theme-surface-muted rounded w-1/2"></div>
        </div>
        <div class="h-96 theme-surface-muted rounded-3xl"></div>
      </div>

      <!-- Post Content -->
      <article v-else-if="post">
        <!-- Breadcrumb -->
        <nav class="mb-8 flex items-center space-x-2 text-sm theme-text-muted font-medium">
          <router-link to="/" class="theme-link-muted">{{ t('nav.home')
          }}</router-link>
          <span>/</span>
          <router-link :to="backLink" class="theme-link-muted">{{ backText
          }}</router-link>
          <span>/</span>
          <span class="theme-text-primary truncate max-w-[200px]">{{ getLocalizedText(post.title) }}</span>
        </nav>

        <div
          class="theme-panel backdrop-blur-xl border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <!-- Featured Image -->
          <div v-if="post.thumbnail" class="mb-12 relative h-64 md:h-96 rounded-2xl overflow-hidden group">
            <img :src="getImageUrl(post.thumbnail)" :alt="getLocalizedText(post.title)"
              loading="lazy" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/20 dark:bg-black/35"></div>
          </div>

          <!-- Post Header -->
          <header class="mb-12 border-b theme-border pb-12">
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <span class="theme-badge-meta" :class="post.type === 'blog'
                ? 'theme-badge-accent'
                : 'theme-badge-info'">
                {{ post.type === 'blog' ? t('nav.blog') : t('nav.notice') }}
              </span>
              <time v-if="postDate" class="text-sm theme-text-muted font-mono">
                {{ formatDate(postDate) }}
              </time>
            </div>

            <h1 class="text-3xl md:text-5xl font-black theme-text-primary mb-6 leading-tight tracking-tight">
              {{ getLocalizedText(post.title) }}
            </h1>

            <p v-if="post.summary" class="text-xl theme-text-secondary leading-relaxed font-light">
              {{ getLocalizedText(post.summary) }}
            </p>
          </header>

          <!-- Post Content -->
          <div v-html="processHtmlForDisplay(getLocalizedText(post.content))"
            class="prose prose-lg max-w-none dark:prose-invert theme-prose">
          </div>
          <div class="mt-8 pt-6 border-t theme-border">
            <h3 class="text-base font-semibold theme-text-primary mb-3">相关资源</h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <li v-for="link in relatedLinks" :key="link.to">
                <router-link :to="link.to" class="theme-link-muted hover:theme-text-primary transition-colors">→ {{ link.text }}</router-link>
              </li>
            </ul>
          </div>
          <QQContactCard class="mt-12" />

          <!-- Footer -->
          <footer class="mt-16 pt-12 border-t theme-border flex justify-center">
            <router-link :to="backLink"
              class="group inline-flex items-center space-x-3 theme-link-muted px-6 py-3 border theme-btn-secondary rounded-full">
              <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span class="font-medium">{{ backText }}</span>
            </router-link>
          </footer>
        </div>
      </article>

      <!-- Error State -->
      <div v-else
        class="text-center py-24 theme-panel rounded-3xl border backdrop-blur-sm">
        <svg class="w-20 h-20 mx-auto theme-text-muted mb-6" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="theme-text-muted text-xl mb-8">
          {{ t('blogDetail.notFound') }}
        </p>
        <router-link to="/blog"
          class="inline-block theme-btn-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
          {{ t('blogDetail.backToBlog') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../stores/app'
import { postAPI } from '../api'
import { getImageUrl } from '../utils/image'
import { processHtmlForDisplay } from '../utils/content'
import { debounceAsync } from '../utils/debounce'
import QQContactCard from '../components/QQContactCard.vue'

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore()

const loading = ref(true)
const post = ref<any>(null)

const getLocalizedText = (jsonData: any) => {
  if (!jsonData) return ''
  const locale = appStore.locale
  return jsonData[locale] || jsonData['zh-CN'] || jsonData['en-US'] || ''
}

const getSeoText = (value: any) => {
  if (!value) return ''
  if (typeof value === 'object') {
    return value['zh-CN'] || Object.values(value)[0] || ''
  }
  return value
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(appStore.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const postDate = computed(() => {
  if (!post.value) return ''
  return post.value.published_at || post.value.created_at || post.value.updated_at || ''
})

const backLink = computed(() => {
  if (!post.value) return '/blog'
  return post.value.type === 'notice' ? '/notice' : '/blog'
})

const backText = computed(() => {
  if (!post.value) return t('blogDetail.backToBlog')
  return post.value.type === 'notice' ? t('blogDetail.backToNotice') : t('blogDetail.backToBlog')
})

// 按 slug 主题动态选 "相关资源"：Claude 主题优先推 Claude，ChatGPT 同理；
// codex vs claude code 那篇同时关联两者；非博客（通告）/ 未匹配回 fallback 通用四项。
const relatedLinks = computed(() => {
  const slug = (post.value?.slug || '').toLowerCase()
  if (slug.includes('codex')) {
    return [
      { to: '/chatgpt-hub', text: 'ChatGPT 资源中心' },
      { to: '/claude-hub', text: 'Claude 资源中心' },
      { to: '/products/chatgpt-pro-5x', text: 'ChatGPT Pro 5x 直充' },
      { to: '/products/claude-max-5x', text: 'Claude Max 5x 直充' },
    ]
  }
  if (slug.startsWith('claude-')) {
    return [
      { to: '/claude-hub', text: 'Claude 资源中心' },
      { to: '/products/claude-pro', text: 'Claude Pro 直充月卡' },
      { to: '/products/claude-max-5x', text: 'Claude Max 5x 直充月卡' },
      { to: '/tools', text: '在线工具集合' },
    ]
  }
  if (slug.startsWith('chatgpt-')) {
    return [
      { to: '/chatgpt-hub', text: 'ChatGPT 资源中心' },
      { to: '/products/chatgpt-plus', text: 'ChatGPT Plus 直充月卡' },
      { to: '/products/chatgpt-pro-5x', text: 'ChatGPT Pro 5x 直充月卡' },
      { to: '/tools', text: '在线工具集合' },
    ]
  }
  // fallback：公告、未来 Gemini 主题、或其它未匹配 slug
  return [
    { to: '/claude-hub', text: 'Claude 资源中心' },
    { to: '/chatgpt-hub', text: 'ChatGPT 资源中心' },
    { to: '/tools', text: '在线工具集合' },
    { to: '/products', text: 'AI 订阅直充商品' },
  ]
})

const loadPost = async () => {
  loading.value = true
  try {
    const slug = route.params.slug as string
    const response = await postAPI.detail(slug)
    post.value = response.data.data || null
  } catch (error) {
    console.error('Failed to load post:', error)
    post.value = null
  } finally {
    loading.value = false
  }
}

const debouncedLoadPost = debounceAsync(loadPost, 300)

useHead({
  title: computed(() => {
    const p = post.value
    return p ? `${getSeoText(p.title)} - 52HUB` : '52HUB'
  }),
  meta: computed(() => {
    const p = post.value
    if (!p) return []
    const title = getSeoText(p.title)
    const summary = getSeoText(p.summary)
    return [
      { name: 'description', content: summary },
      { property: 'og:title', content: title },
      { property: 'og:description', content: summary },
      { property: 'og:url', content: `https://52hub.org/blog/${p.slug}` },
      { property: 'og:type', content: 'article' },
    ]
  }),
  link: computed(() => {
    const p = post.value
    return p ? [{ rel: 'canonical', href: `https://52hub.org/blog/${p.slug}` }] : []
  }),
})

onMounted(() => {
  loadPost()
})

onUnmounted(() => {
  debouncedLoadPost.cancel()
})
</script>
