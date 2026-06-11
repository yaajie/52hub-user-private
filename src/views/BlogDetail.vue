<template>
  <div
    class="blog-detail-page min-h-screen theme-page pt-24 pb-16 relative overflow-hidden">
    <div class="container mx-auto px-4 relative z-10">
      <!-- 2026-06-11 博客体验专项：外层与全站统一 container，主体 1200px 居中，
           正文保持窄栏（~860px）+ 右侧 300px sticky 栏（TOC/分类/最新/CTA），移动端右栏下沉文末 -->
      <div class="mx-auto max-w-[1200px]">
        <!-- Loading State -->
        <div v-if="loading" class="animate-pulse space-y-8">
          <div class="h-8 theme-surface-muted rounded w-1/3"></div>
          <div class="space-y-4">
            <div class="h-12 theme-surface-muted rounded w-3/4"></div>
            <div class="h-6 theme-surface-muted rounded w-1/2"></div>
          </div>
          <div class="h-96 theme-surface-muted rounded-3xl"></div>
        </div>

        <template v-else-if="post">
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

          <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 lg:items-start">
            <!-- 正文列 -->
            <article>
              <div
                class="theme-panel backdrop-blur-xl border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <!-- Featured Image -->
                <div v-if="post.thumbnail" class="mb-12 relative aspect-video rounded-2xl overflow-hidden group">
                  <img :src="getImageUrl(post.thumbnail)" :alt="getLocalizedText(post.title)"
                    loading="lazy" decoding="async" class="w-full h-full object-cover">
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
                <div ref="articleBodyRef" v-html="processHtmlForDisplay(getLocalizedText(post.content))"
                  class="prose prose-lg max-w-none dark:prose-invert theme-prose blog-article-body">
                </div>
                <div class="mt-8 pt-6 border-t theme-border">
                  <h3 class="text-base font-semibold theme-text-primary mb-3">相关资源</h3>
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <li v-for="link in relatedLinks" :key="link.to">
                      <router-link :to="link.to" class="theme-link-muted hover:theme-text-primary transition-colors">→ {{ link.text }}</router-link>
                    </li>
                  </ul>
                </div>

                <!-- 上一篇 / 下一篇（SEO 内链 + 阅读动线） -->
                <nav v-if="prevPost || nextPost" class="mt-10 grid gap-3 sm:grid-cols-2">
                  <router-link v-if="prevPost" :to="`/blog/${prevPost.slug}`"
                    class="group rounded-xl border theme-border theme-surface-soft p-4 transition hover:theme-surface-strong">
                    <span class="text-xs theme-text-muted">← 上一篇</span>
                    <span class="mt-1 block text-sm font-semibold theme-text-primary line-clamp-2">{{ getLocalizedText(prevPost.title) }}</span>
                  </router-link>
                  <span v-else class="hidden sm:block"></span>
                  <router-link v-if="nextPost" :to="`/blog/${nextPost.slug}`"
                    class="group rounded-xl border theme-border theme-surface-soft p-4 text-right transition hover:theme-surface-strong">
                    <span class="text-xs theme-text-muted">下一篇 →</span>
                    <span class="mt-1 block text-sm font-semibold theme-text-primary line-clamp-2">{{ getLocalizedText(nextPost.title) }}</span>
                  </router-link>
                </nav>

                <!-- Footer -->
                <footer class="mt-12 pt-10 border-t theme-border flex justify-center">
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

            <!-- 右侧栏（移动端下沉到正文后；TOC 仅桌面显示） -->
            <aside class="mt-8 lg:mt-0">
              <div class="space-y-5 lg:sticky lg:top-24">
                <!-- 文章目录 -->
                <div v-if="tocItems.length > 1" class="hidden lg:block rounded-2xl border theme-border theme-panel p-5">
                  <h3 class="mb-3 text-sm font-bold theme-text-primary">本文目录</h3>
                  <ul class="space-y-1.5 text-sm">
                    <li v-for="item in tocItems" :key="item.id" :class="item.level === 3 ? 'pl-4' : ''">
                      <a :href="`#${item.id}`" class="block theme-link-muted hover:theme-text-primary transition-colors line-clamp-1"
                        @click.prevent="scrollToHeading(item.id)">{{ item.text }}</a>
                    </li>
                  </ul>
                </div>

                <!-- 分类入口（与列表页共用 BLOG_CATEGORIES） -->
                <div class="rounded-2xl border theme-border theme-panel p-5">
                  <h3 class="mb-3 text-sm font-bold theme-text-primary">文章分类</h3>
                  <div class="flex flex-wrap gap-2">
                    <router-link v-for="cat in BLOG_CATEGORIES" :key="cat.key"
                      :to="{ path: '/blog', query: { cat: cat.key } }"
                      class="rounded-full border theme-border px-3 py-1 text-xs font-medium theme-text-secondary transition-colors hover:theme-surface-strong hover:theme-text-primary">
                      {{ cat.label }}
                    </router-link>
                  </div>
                </div>

                <!-- 最新文章 -->
                <div v-if="latestPosts.length" class="rounded-2xl border theme-border theme-panel p-5">
                  <h3 class="mb-3 text-sm font-bold theme-text-primary">最新文章</h3>
                  <ul class="space-y-3">
                    <li v-for="item in latestPosts" :key="item.slug">
                      <router-link :to="`/blog/${item.slug}`"
                        class="group block">
                        <span class="block text-sm theme-text-secondary group-hover:theme-text-primary transition-colors line-clamp-2 leading-snug">{{ getLocalizedText(item.title) }}</span>
                        <time class="mt-0.5 block text-xs theme-text-muted font-mono">{{ formatDate(item.published_at || item.created_at || '') }}</time>
                      </router-link>
                    </li>
                  </ul>
                </div>

                <!-- 商品 CTA：博客 → 商城导流位 -->
                <router-link to="/products"
                  class="block rounded-2xl border border-transparent bg-gradient-to-br from-[#f7a52b] to-[#e8590c] p-5 text-white shadow-lg transition hover:opacity-95">
                  <p class="text-sm font-bold">AI 会员代订阅 · 一站开通</p>
                  <p class="mt-1 text-xs leading-relaxed text-white/85">ChatGPT / Claude / Gemini 代订阅、代充值、成品号，下单即开通。</p>
                  <span class="mt-3 inline-flex items-center text-xs font-semibold">
                    看看商品
                    <svg class="ml-1 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </router-link>
              </div>
            </aside>
          </div>
        </template>

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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../stores/app'
import { postAPI } from '../api'
import { getImageUrl } from '../utils/image'
import { processHtmlForDisplay } from '../utils/content'
import { BLOG_CATEGORIES } from '../utils/blogCategories'

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore()

const loading = ref(true)
const post = ref<any>(null)
const allPosts = ref<any[]>([])
const articleBodyRef = ref<HTMLElement | null>(null)
const tocItems = ref<{ id: string; text: string; level: number }[]>([])

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

// 按 slug 主题动态选 "相关资源"：Claude/ChatGPT/Gemini/Apple/视频/选店家 各一套。
// codex vs claude code 那篇同时关联两者；非博客（通告）/ 未匹配回 fallback 通用四项。
const relatedLinks = computed(() => {
  const slug = (post.value?.slug || '').toLowerCase()
  if (slug.includes('codex')) {
    return [
      { to: '/codex-hub', text: 'Codex 资源中心' },
      { to: '/claude-hub', text: 'Claude 资源中心' },
      { to: '/products/chatgpt-pro-5x', text: 'ChatGPT Pro 5x 直充' },
      { to: '/products/claude-max-5x', text: 'Claude Max 5x 直充' },
    ]
  }
  if (slug.startsWith('gemini-')) {
    return [
      { to: '/gemini-hub', text: 'Gemini 资源中心' },
      { to: '/blog/sora-veo-hailuo-video-subscription', text: 'Sora / Veo / Hailuo 视频订阅怎么买' },
      { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
      { to: '/products', text: 'AI 订阅 / 成品号 / API 等服务' },
    ]
  }
  if (slug.startsWith('apple-id-')) {
    return [
      { to: '/blog/chatgpt-plus-china-payment-guide', text: '国内付款订阅 ChatGPT Plus 全方法' },
      { to: '/blog/how-to-pick-ai-subscription-store', text: '如何挑靠谱的 AI 订阅店家' },
      { to: '/products', text: 'AI 会员代订阅 / 成品号商品' },
      { to: '/tools', text: '在线工具集合（IP 检测等）' },
    ]
  }
  if (slug.startsWith('sora-') || slug.includes('-video-')) {
    return [
      { to: '/openai-hub', text: 'OpenAI 资源中心（含 Sora）' },
      { to: '/gemini-hub', text: 'Gemini 资源中心（含 Veo）' },
      { to: '/blog/gemini-pro-vs-advanced', text: 'Gemini Pro vs Advanced 怎么选' },
      { to: '/products/chatgpt-pro-5x', text: 'ChatGPT Pro 5x（含 Sora 高额度）' },
    ]
  }
  if (slug.startsWith('how-to-pick-')) {
    return [
      { to: '/blog/apple-id-overseas-registration-guide', text: 'Apple ID 海外区注册全攻略' },
      { to: '/blog/chatgpt-anti-ban-guide', text: 'ChatGPT 账号防封号指南' },
      { to: '/about', text: '关于 AI开通 与站长 Jay' },
      { to: '/products', text: 'AI开通 AI 服务' },
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
      { to: '/openai-hub', text: 'OpenAI / ChatGPT 资源中心' },
      { to: '/products/chatgpt-plus', text: 'ChatGPT Plus 直充月卡' },
      { to: '/products/chatgpt-pro-5x', text: 'ChatGPT Pro 5x 直充月卡' },
      { to: '/tools', text: '在线工具集合' },
    ]
  }
  // fallback：公告或其它未匹配 slug
  return [
    { to: '/claude-hub', text: 'Claude 资源中心' },
    { to: '/codex-hub', text: 'Codex 资源中心' },
    { to: '/tools', text: '在线工具集合' },
    { to: '/products', text: 'AI 订阅 / 成品号 / API 等服务' },
  ]
})

// 右栏「最新文章」+ 上/下一篇 共用一份全量列表（published_at DESC，与接口默认序一致）
const latestPosts = computed(() =>
  allPosts.value.filter((p) => p.slug !== post.value?.slug).slice(0, 5),
)

const currentIndex = computed(() =>
  allPosts.value.findIndex((p) => p.slug === post.value?.slug),
)

// 列表为新→旧：上一篇 = 更新的一篇，下一篇 = 更早的一篇
const prevPost = computed(() =>
  currentIndex.value > 0 ? allPosts.value[currentIndex.value - 1] : null,
)
const nextPost = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < allPosts.value.length - 1
    ? allPosts.value[currentIndex.value + 1]
    : null,
)

// 从渲染后的正文提取 h2/h3 生成目录锚点
const buildToc = () => {
  nextTick(() => {
    const el = articleBodyRef.value
    if (!el) {
      tocItems.value = []
      return
    }
    const headings = el.querySelectorAll('h2, h3')
    tocItems.value = Array.from(headings).map((h, i) => {
      if (!h.id) h.id = `sec-${i}`
      return { id: h.id, text: h.textContent || '', level: h.tagName === 'H3' ? 3 : 2 }
    })
  })
}

const scrollToHeading = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const loadPost = async () => {
  loading.value = true
  try {
    const slug = route.params.slug as string
    const response = await postAPI.detail(slug)
    post.value = response.data.data || null
    buildToc()
  } catch (error) {
    console.error('Failed to load post:', error)
    post.value = null
  } finally {
    loading.value = false
  }
}

const loadAllPosts = async () => {
  try {
    const response = await postAPI.list({ type: 'blog', page: 1, page_size: 100 })
    allPosts.value = response.data.data || []
  } catch (error) {
    console.error('Failed to load post list:', error)
  }
}

// 站内文章间跳转（最新文章/上一篇/下一篇）复用组件实例，必须 watch slug 重载
watch(
  () => route.params.slug,
  (val, old) => {
    if (val && val !== old) {
      loadPost()
      window.scrollTo({ top: 0 })
    }
  },
)

useHead({
  title: computed(() => {
    const p = post.value
    return p ? `${getSeoText(p.title)} - AI开通` : 'AI开通'
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
      { property: 'og:url', content: `https://aikaitong.com/blog/${p.slug}` },
      { property: 'og:type', content: 'article' },
    ]
  }),
  link: computed(() => {
    const p = post.value
    return p ? [{ rel: 'canonical', href: `https://aikaitong.com/blog/${p.slug}` }] : []
  }),
})

onMounted(() => {
  loadPost()
  loadAllPosts()
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

/* 锚点跳转时给 sticky 导航留出高度 */
.blog-article-body :deep(h2),
.blog-article-body :deep(h3) {
  scroll-margin-top: 96px;
}
</style>
