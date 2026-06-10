<template>
  <a
    :href="CONTACTS.wechatService"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="企微在线客服"
    title="企微在线客服"
    :class="[
      'fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#07C160] text-white shadow-lg shadow-emerald-900/25 transition hover:bg-[#06ad56] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300/60 sm:bottom-24 lg:bottom-6 lg:right-6',
      hideOnMobileToolPage ? 'hidden sm:flex' : 'bottom-36',
    ]"
  >
    <IconWeChat class="h-6 w-6" />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconWeChat from './icons/IconWeChat.vue'
import { CONTACTS } from '../constants/contact'

const route = useRoute()
const hideOnMobileToolPage = computed(() => route.path === '/tools/codex-auth')
</script>
