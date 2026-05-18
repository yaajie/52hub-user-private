<template>
  <section class="site-hero relative z-10 pt-24 pb-6">
    <div class="container mx-auto px-4">
      <div class="theme-panel border theme-border rounded-3xl p-8 sm:p-10 md:p-12">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold theme-text-primary leading-tight">
          嗨，我是站长 Jay <span aria-hidden="true">👋</span>
        </h1>
        <p class="mt-4 text-base sm:text-lg theme-text-secondary leading-relaxed max-w-3xl">
          用 ChatGPT / Claude 几年，把踩过的坑都整理在这——<br class="hidden sm:inline" />
          顺便提供 AI 工具的官方订阅直充和账号服务。
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <router-link to="/blog"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl theme-btn-primary text-sm font-medium">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>看资讯</span>
          </router-link>
          <router-link to="/tools"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl theme-surface-soft theme-text-primary text-sm font-medium hover:theme-surface-strong transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>在线工具</span>
          </router-link>
          <router-link to="/products"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl theme-surface-soft theme-text-primary text-sm font-medium hover:theme-surface-strong transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>商品中心</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
