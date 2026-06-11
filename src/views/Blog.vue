<template>
  <div
    class="blog-page min-h-screen theme-page pt-24 pb-16 relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
      <!-- Page Header -->
      <div class="mb-6 mt-4 text-center sm:mb-10 sm:mt-12">
        <h1 class="mb-3 text-3xl font-black tracking-tight theme-text-primary sm:mb-6 sm:text-4xl md:text-6xl">{{ t('nav.blog') }}</h1>
        <p
          class="theme-text-secondary mx-auto max-w-xl text-sm leading-relaxed sm:max-w-2xl sm:text-lg">
          {{ t('blog.subtitle') }}
        </p>
      </div>

      <!-- 分类标签条（2026-06-11 博客体验专项：slug 规则前端分类，与文章页右栏共用 BLOG_CATEGORIES） -->
      <div class="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-12">
        <button
          v-for="cat in categoryTabs"
          :key="cat.key"
          type="button"
          class="rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
          :class="activeCat === cat.key
            ? 'border-transparent bg-[var(--ui-accent)] text-white shadow-sm'
            : 'theme-border theme-panel theme-text-secondary hover:theme-surface-strong'"
          @click="selectCategory(cat.key)"
        >
          {{ cat.label }}
          <span class="ml-1 font-mono text-xs opacity-70">{{ cat.count }}</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="i in 4" :key="i"
          class="theme-surface-muted rounded-2xl h-[300px] animate-pulse border">
        </div>
      </div>

      <!-- Posts Grid -->
      <div v-else-if="pagedPosts.length > 0">
        <div :class="pagedPosts.length === 1
          ? 'max-w-2xl mx-auto'
          : 'grid grid-cols-1 md:grid-cols-2 gap-8'">
          <router-link v-for="post in pagedPosts" :key="post.id" :to="getPostLink(post.slug)"
            v-spotlight
            class="group theme-panel backdrop-blur-xl border rounded-2xl overflow-hidden hover:bg-[var(--ui-bg-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col no-underline"
            :aria-label="getLocalizedText(post.title)">
            <!-- Thumbnail · 保留上传 16:9 原始比例 -->
            <div v-if="post.thumbnail" class="aspect-video overflow-hidden">
              <img :src="getImageUrl(post.thumbnail)" :alt="getLocalizedText(post.title)"
                loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
            </div>

            <div class="p-8 flex flex-col flex-1">
              <div class="flex items-center justify-between mb-6">
                <span class="theme-badge-meta"
                  :class="post.type === 'blog'
                    ? 'theme-badge-accent'
                    : 'theme-badge-info'">
                  {{ post.type === 'blog' ? t('nav.blog') : t('nav.notice') }}
                </span>
                <time v-if="getPostDate(post)" class="text-xs theme-text-muted font-mono">
                  {{ formatDate(getPostDate(post)) }}
                </time>
              </div>

              <h2
                class="text-2xl font-bold mb-4 theme-text-primary transition-colors line-clamp-2 leading-tight">
                {{ getLocalizedText(post.title) }}
              </h2>

              <p class="theme-text-secondary text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                {{ getLocalizedText(post.summary) }}
              </p>

              <div
                class="flex items-center text-sm font-medium theme-text-muted group-hover:text-[var(--ui-text-primary)] transition-colors mt-auto pt-6 border-t theme-border">
                {{ t('blog.readMore') }}
                <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Pagination（前端分页） -->
        <div v-if="totalPages > 1" class="mt-16 flex justify-center">
          <nav
            class="flex items-center space-x-2 theme-panel-soft backdrop-blur-md p-2 rounded-2xl border">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
              class="w-10 h-10 flex items-center justify-center rounded-xl border theme-btn-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span class="px-4 py-2 font-mono theme-text-muted">
              <span class="theme-text-primary font-bold">{{ currentPage }}</span>
              <span class="mx-2 opacity-50">/</span>
              <span>{{ totalPages }}</span>
            </span>

            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
              class="w-10 h-10 flex items-center justify-center rounded-xl border theme-btn-secondary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else
        class="text-center py-20 border theme-border rounded-2xl theme-panel backdrop-blur-sm">
        <svg class="w-20 h-20 mx-auto theme-text-muted mb-6" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p class="theme-text-muted text-lg">
          {{ t('blog.empty') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import { postAPI } from '../api'
import { getImageUrl } from '../utils/image'
import { BLOG_CATEGORIES, matchCategory } from '../utils/blogCategories'

const { t } = useI18n()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

useHead({
  title: '资讯 · AI 工具教程与实战笔记 - AI开通',
  meta: [
    { name: 'description', content: 'AI开通 资讯：Claude / ChatGPT / Gemini 等 AI 工具的订阅对比、注册指南、防封号、排错与编程助手实战笔记。' },
    { property: 'og:title', content: '资讯 · AI 工具教程与实战笔记 - AI开通' },
    { property: 'og:description', content: 'Claude / ChatGPT / Gemini 等 AI 工具的订阅对比、注册指南、防封号、排错与编程助手实战笔记。' },
    { property: 'og:url', content: 'https://aikaitong.com/blog' },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: 'https://aikaitong.com/blog' }],
})

const loading = ref(true)
const allPosts = ref<any[]>([])
const currentPage = ref(1)
const pageSize = 12

// 18 篇量级一次拉全量，分类筛选与分页全部前端完成（gzip 后体积很小，省掉翻页/筛选的网络往返）
const loadPosts = async () => {
  loading.value = true
  try {
    const response = await postAPI.list({ type: 'blog', page: 1, page_size: 100 })
    allPosts.value = response.data.data || []
  } catch (error) {
    console.error('Failed to load posts:', error)
  } finally {
    loading.value = false
  }
}

// 分类：?cat= 同步，便于分享/回退
const activeCat = computed(() => {
  const q = String(route.query.cat || 'all')
  return q === 'all' || BLOG_CATEGORIES.some((c) => c.key === q) ? q : 'all'
})

const categoryTabs = computed(() => {
  const tabs = [{ key: 'all', label: '全部', count: allPosts.value.length }]
  for (const cat of BLOG_CATEGORIES) {
    const count = allPosts.value.filter((p) => matchCategory(p.slug, cat.key)).length
    if (count > 0) tabs.push({ key: cat.key, label: cat.label, count })
  }
  return tabs
})

const filteredPosts = computed(() =>
  allPosts.value.filter((p) => matchCategory(p.slug, activeCat.value)),
)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / pageSize)))

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredPosts.value.slice(start, start + pageSize)
})

const selectCategory = (key: string) => {
  currentPage.value = 1
  router.replace({ query: key === 'all' ? {} : { cat: key } })
}

const getLocalizedText = (jsonData: any) => {
  if (!jsonData) return ''
  const locale = appStore.locale
  return jsonData[locale] || jsonData['zh-CN'] || jsonData['en-US'] || ''
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

const getPostDate = (post: any) => post.published_at || post.created_at || post.updated_at || ''

const getPostLink = (slug: string) => `/blog/${slug}`

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}
</style>
