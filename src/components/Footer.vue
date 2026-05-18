<template>
  <footer
    class="relative theme-panel-strong theme-text-secondary border-t theme-border overflow-hidden">
    <div class="container mx-auto px-4 py-16 relative">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-16">
        <!-- Brand · 4 列布局下 brand 与其它列等宽对齐 -->
        <div class="col-span-2 md:col-span-1 space-y-5">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 theme-btn-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-black text-sm">{{ brandInitial }}</span>
            </div>
            <h3 class="theme-text-primary text-xl font-bold tracking-tight">{{ brandSiteName }}</h3>
          </div>
          <!-- 前端硬编码短 slogan（忽略后台 site_description 的长描述，避免破坏 footer 对齐） -->
          <p class="text-sm leading-relaxed theme-text-muted">
            AI 工具资源中心 · 教程 + 官方直充
          </p>
          <div class="space-y-2.5 text-sm">
            <a :href="telegramServiceUrl" target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 theme-link-muted hover:theme-text-primary transition-colors">
              <svg class="w-4 h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
              <span>TG 客服 @HUB52service</span>
            </a>
            <a :href="CONTACTS.telegramChannel" target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 theme-link-muted hover:theme-text-primary transition-colors">
              <svg class="w-4 h-4 text-cyan-500 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
              </svg>
              <span>TG 频道 @Hub52Notice</span>
            </a>
            <router-link to="/notice/announcement-channel"
              class="flex items-center gap-2 theme-link-muted hover:theme-text-primary transition-colors">
              <IconQQ class="w-4 h-4 text-[#1AB6FF] shrink-0" />
              <span>QQ 群 1105879333</span>
            </router-link>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="theme-text-primary font-bold mb-6 tracking-wide">{{ t('footer.quickLinks') }}</h4>
          <ul class="space-y-3 text-sm">
            <li v-for="item in quickLinks" :key="item.path">
              <router-link :to="item.path" class="theme-link-muted transition-colors flex items-center gap-2 group">
                <svg class="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="item.icon" />
                </svg>
                {{ t(item.label) }}
              </router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="theme-text-primary font-bold mb-6 tracking-wide">AI 资源</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <router-link to="/claude-hub" class="theme-link-muted transition-colors">Claude 资源</router-link>
            </li>
            <li>
              <router-link to="/chatgpt-hub" class="theme-link-muted transition-colors">ChatGPT 资源</router-link>
            </li>
            <li>
              <router-link to="/openai-hub" class="theme-link-muted transition-colors">OpenAI 全产品</router-link>
            </li>
            <li>
              <router-link to="/gemini-hub" class="theme-link-muted transition-colors">Gemini 资源</router-link>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="theme-text-primary font-bold mb-6 tracking-wide">在线工具</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <router-link to="/tools" class="theme-link-muted transition-colors">工具集合</router-link>
            </li>
          </ul>
          <ul class="mt-4 space-y-2 text-xs theme-text-muted">
            <li>IP 检测</li>
            <li>服务状态</li>
            <li>DNS / 隐私</li>
            <li>礼品卡 / 接码</li>
            <li>域名查询</li>
          </ul>
        </div>

      </div>

      <!-- Copyright -->
      <div
        class="border-t theme-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs theme-text-muted">
        <div class="space-y-1 text-center md:text-left">
          <p>&copy; {{ currentYear }} {{ brandSiteName }}. {{ t('footer.rights') }}</p>
        </div>
        <div class="flex flex-col items-center gap-2 md:items-end">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center md:justify-end">
            <router-link to="/privacy" class="hover:text-gray-900 dark:hover:text-gray-400">{{ t('footer.privacy') || 'Privacy Policy' }}</router-link>
            <router-link to="/terms" class="hover:text-gray-900 dark:hover:text-gray-400">{{ t('footer.terms') || 'Terms of Service' }}</router-link>
          </div>
          <div v-if="footerLinks.length" class="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center md:justify-end">
            <a
              v-for="link in footerLinks"
              :key="link.name"
              :href="link.url || 'javascript:void(0)'"
              :target="link.url ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="hover:text-gray-900 dark:hover:text-gray-400"
            >{{ link.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../stores/app'
import { CONTACTS } from '../constants/contact'
import IconQQ from './icons/IconQQ.vue'

const { t } = useI18n()
const appStore = useAppStore()

const config = computed(() => appStore.config)
const telegramServiceUrl = computed(() => {
  const value = config.value?.contact?.telegram
  return typeof value === 'string' && value.trim() ? value.trim() : CONTACTS.telegramService
})

const brandSiteName = computed(() => {
  const siteName = config.value?.brand?.site_name
  return typeof siteName === 'string' && siteName.trim() ? siteName.trim() : '52HUB'
})

// P1-O 视觉收尾：Footer 不再渲染后台 site_description（长描述破坏 4 列对齐），
// 改用前端硬编码短 slogan。后台 site_description 仍用于 index.html SEO meta。

const brandInitial = computed(() => {
  return brandSiteName.value.charAt(0).toUpperCase()
})

const isListMode = computed(() => config.value?.template_mode === 'list')
const navConfig = computed(() => config.value?.nav_config as { builtin?: Record<string, boolean> } | undefined)

const quickLinks = computed(() => {
  const items = [
    { path: '/', label: 'nav.home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1' },
  ]
  if (!isListMode.value) {
    items.push({ path: '/products', label: 'nav.products', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
  }
  const builtin = navConfig.value?.builtin
  if (!builtin || builtin.blog !== false) {
    items.push({ path: '/blog', label: 'nav.blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2' })
  }
  if (!builtin || builtin.about !== false) {
    items.push({ path: '/about', label: 'nav.about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
  }
  // 公告：Navbar 已隐藏，但 Footer 保留可访问入口（搜索引擎已收录）
  if (!builtin || builtin.notice !== false) {
    items.push({ path: '/notice', label: 'nav.notice', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' })
  }
  return items
})

const footerLinks = computed(() => {
  const links = config.value?.footer_links
  if (!Array.isArray(links)) return []
  return links.filter((item: any) => item && typeof item.name === 'string' && item.name.trim())
})

const currentYear = new Date().getFullYear()
</script>
