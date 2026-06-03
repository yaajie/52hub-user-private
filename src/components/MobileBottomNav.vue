<template>
  <nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 theme-panel-strong backdrop-blur-xl border-t theme-border theme-safe-bottom">
    <div class="flex items-stretch h-14">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs transition-colors min-h-[44px]"
        :class="isActive(item.path) ? 'theme-text-accent font-semibold' : 'theme-text-muted'"
      >
        <!-- Home -->
        <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <!-- Products -->
        <svg v-else-if="item.icon === 'products'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <!-- Me -->
        <svg v-else-if="item.icon === 'me'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>{{ t(item.label) }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserAuthStore } from '../stores/userAuth'
import { useAppStore } from '../stores/app'

const route = useRoute()
const { t } = useI18n()
const userAuthStore = useUserAuthStore()
const appStore = useAppStore()

const isListMode = computed(() => appStore.config?.template_mode === 'list')

const navItems = computed(() => {
  const items = [
    { path: '/', icon: 'home', label: 'bottomNav.home' },
    ...(!isListMode.value ? [{ path: '/products', icon: 'products', label: 'bottomNav.products' }] : []),
    { path: userAuthStore.isAuthenticated ? '/me' : '/auth/login', icon: 'me', label: 'bottomNav.me' },
  ]
  return items
})

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
