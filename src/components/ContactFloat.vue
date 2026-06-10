<template>
  <a
    :href="CONTACTS.wechatService"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="企微在线客服"
    title="企微在线客服"
    :class="[
      'fixed z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#07C160] text-white shadow-lg shadow-emerald-900/25 transition hover:bg-[#06ad56] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300/60',
      'right-3 sm:right-4 lg:h-12 lg:w-12 lg:bottom-6',
      'lg:right-[max(1.5rem,calc((100vw_-_1536px)/2_+_1.5rem))]',
      hideOnMobileToolPage ? 'hidden sm:flex' : 'bottom-20',
    ]"
  >
    <IconWeChat class="h-5 w-5 lg:h-6 lg:w-6" />
  </a>
</template>

<script setup lang="ts">
// PC 端 right 用 max() 锁定在全局 container(2xl=1536px) 右缘外 1.5rem，
// 超宽屏不再跟随视口无限外扩；窄于容器时回退 1.5rem 贴边。
// 移动端 44px 缩小避让内容，停在 MobileBottomNav 上方(bottom-20)。
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconWeChat from './icons/IconWeChat.vue'
import { CONTACTS } from '../constants/contact'

const route = useRoute()
const hideOnMobileToolPage = computed(() => route.path === '/tools/codex-auth')
</script>
