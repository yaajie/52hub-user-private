<template>
  <div class="products-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="mb-12 mt-12 text-center">
        <h1 class="text-4xl md:text-5xl font-black mb-4 tracking-tight theme-text-primary">{{ t('nav.products') }}</h1>
        <p class="theme-text-secondary max-w-2xl mx-auto text-lg border-b theme-border pb-8">
          {{ t('products.subtitle') }}
        </p>
      </div>

      <router-link
        to="/tools/ip"
        class="mb-8 flex flex-col gap-3 rounded-2xl border theme-border theme-panel p-4 transition hover:-translate-y-0.5 hover:theme-surface-strong sm:flex-row sm:items-center sm:justify-between sm:p-5"
      >
        <span class="flex min-w-0 items-start gap-3">
          <span class="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/12 text-sky-500">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l7 4v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V7l7-4z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 12l1.6 1.6L15 9.8" />
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-sm font-bold theme-text-primary">购买前先做 AI IP 环境检测</span>
            <span class="mt-1 block text-sm leading-relaxed theme-text-secondary">按 ChatGPT / Claude Code / Gemini 使用场景判断当前出口，减少订阅后才发现环境不适合的情况。</span>
          </span>
        </span>
        <span class="inline-flex shrink-0 items-center justify-center rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white">
          去检测
        </span>
      </router-link>

      <div class="flex flex-col lg:flex-row gap-8">
        <CategorySidebar
          :categories="categoryGroups"
          :selected-category="selectedCategory"
          :expanded-parent-ids="expandedParentIds"
          :show-drawer="showFilterDrawer"
          :show-search="true"
          :search-query="searchQuery"
          @select-category="selectCategory"
          @toggle-parent="toggleParentCategory"
          @update:show-drawer="showFilterDrawer = $event"
          @update:search-query="searchQuery = $event"
          @clear-search="clearSearch"
        />

        <!-- Main Content - Products Grid -->
        <main class="flex-1">
          <!-- Loading Skeleton -->
          <div v-if="loading" class="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="i in 6" :key="i"
              class="theme-panel rounded-2xl border overflow-hidden flex flex-col">
              <div class="aspect-[5/4] theme-skeleton"></div>
              <div class="p-3 md:p-5 space-y-3">
                <div class="h-3 w-16 rounded theme-skeleton"></div>
                <div class="h-5 w-3/4 rounded theme-skeleton"></div>
                <div class="flex gap-2">
                  <div class="h-5 w-14 rounded-full theme-skeleton"></div>
                  <div class="h-5 w-14 rounded-full theme-skeleton"></div>
                </div>
                <div class="h-3 w-full rounded theme-skeleton"></div>
                <div class="h-3 w-2/3 rounded theme-skeleton"></div>
                <div class="border-t theme-border pt-3 flex justify-between items-center">
                  <div class="h-6 w-20 rounded theme-skeleton"></div>
                  <div class="h-4 w-16 rounded theme-skeleton"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-else-if="products.length > 0">
            <div class="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4">
              <ProductCard
                v-for="(product, idx) in products"
                :key="product.id"
                :product="product"
                :index="idx"
                :max-tags="isMobileGrid ? 1 : 2"
                :animation-step="50"
                @click="goToProduct"
                @quick-buy="openQuickBuy"
              />
            </div>

            <PaginationNav
              :current-page="currentPage"
              :total-pages="totalPages"
              @change-page="changePage"
            />
          </div>

          <!-- Empty State -->
          <div v-else
            class="text-center py-20 border theme-panel-soft rounded-2xl backdrop-blur-sm theme-slide-up">
            <svg class="w-20 h-20 mx-auto theme-text-muted mb-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="theme-text-muted text-lg">
              {{ (searchQuery || selectedCategory) ? t('products.emptyFiltered') : t('products.empty') }}
            </p>
            <button
              v-if="searchQuery || selectedCategory"
              class="mt-4 theme-btn-inline-md border theme-btn-secondary font-semibold"
              @click="clearSearch(); selectCategory(null)"
            >
              {{ t('products.clearFilters') }}
            </button>
          </div>
        </main>
      </div>

      <PurchaseTerms />
    </div>

    <ProductQuickBuy
      v-if="quickBuyProduct"
      :product="quickBuyProduct"
      :visible="quickBuyVisible"
      @update:visible="quickBuyVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { useProductList } from '../composables/useProductList'
import ProductCard from '../components/ProductCard.vue'
import ProductQuickBuy from '../components/ProductQuickBuy.vue'
import CategorySidebar from '../components/CategorySidebar.vue'
import PaginationNav from '../components/PaginationNav.vue'
import PurchaseTerms from '../components/PurchaseTerms.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const categorySlug = computed(() => {
  const slug = route.params.slug
  return Array.isArray(slug) ? slug[0] : slug
})
const isCategory = computed(() => !!categorySlug.value)

useHead({
  title: computed(() => isCategory.value
    ? `${categorySlug.value} 分类商品 - AI开通`
    : 'AI 服务 · Claude / ChatGPT / Gemini 代订阅 / 成品号 / API + Apple ID 账号 - AI开通'),
  meta: computed(() => {
    const base = [
      { property: 'og:type', content: 'website' },
    ]
    if (isCategory.value) {
      return [
        ...base,
        { name: 'robots', content: 'noindex,follow' },
        { property: 'og:url', content: `https://aikaitong.com/categories/${categorySlug.value}` },
      ]
    }
    return [
      ...base,
      { name: 'description', content: 'AI开通 AI 服务 · Claude / ChatGPT / Gemini 的代订阅、成品号、API 额度兑换，美区 / 港区 Apple ID 独享账号，礼品卡兑换号。' },
      { property: 'og:title', content: 'AI 服务 · 代订阅 / 成品号 / API + Apple ID 账号 - AI开通' },
      { property: 'og:description', content: 'Claude / ChatGPT / Gemini 代订阅、成品号、API 额度 + Apple ID 账号 + 礼品卡。' },
      { property: 'og:url', content: 'https://aikaitong.com/products' },
    ]
  }),
  link: computed(() => [
    {
      rel: 'canonical',
      href: isCategory.value
        ? `https://aikaitong.com/categories/${categorySlug.value}`
        : 'https://aikaitong.com/products',
    },
  ]),
  script: computed(() => isCategory.value ? [] : [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'AI开通',
      url: 'https://aikaitong.com/products',
      description: 'AI开通 AI 服务 · Claude / ChatGPT / Gemini 代订阅、成品号、API 与 Apple ID 账号等服务。',
    }),
  }]),
})

const {
  loading,
  products,
  selectedCategory,
  searchQuery,
  currentPage,
  totalPages,
  showFilterDrawer,
  expandedParentIds,
  categoryGroups,
  selectCategory,
  toggleParentCategory,
  changePage,
  clearSearch,
  initialize,
  cleanup,
} = useProductList({ pageSize: 12, homeRouteName: 'products' })

const quickBuyProduct = ref<any>(null)
const quickBuyVisible = ref(false)

const openQuickBuy = (product: any) => {
  quickBuyProduct.value = product
  quickBuyVisible.value = true
}

// Detect mobile 2-col grid (< md breakpoint)
const isMobileGrid = ref(window.innerWidth < 768)
const handleResize = () => {
  isMobileGrid.value = window.innerWidth < 768
}

const goToProduct = (slug: string) => {
  router.push(`/products/${slug}`)
}

onMounted(async () => {
  window.addEventListener('resize', handleResize, { passive: true })
  await initialize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  cleanup()
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
</style>
