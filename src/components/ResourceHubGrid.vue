<template>
  <section class="resource-hub-grid container mx-auto px-4 pt-6">
    <h2 class="text-xl sm:text-2xl font-semibold theme-text-primary mb-4">AI 资源 &amp; 工具</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <router-link
        v-for="hub in hubs"
        :key="hub.to"
        :to="hub.to"
        class="block theme-panel border theme-border rounded-2xl p-4 sm:p-5 hover:theme-surface-strong transition-colors"
      >
        <div class="flex items-center gap-2 mb-2">
          <span :class="['inline-flex w-8 h-8 items-center justify-center rounded-lg', hub.iconBg]">
            <span class="text-base">{{ hub.emoji }}</span>
          </span>
          <h3 class="text-sm sm:text-base font-semibold theme-text-primary">{{ hub.title }}</h3>
        </div>
        <p class="text-xs sm:text-sm theme-text-muted leading-relaxed">{{ hub.desc }}</p>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
const hubs = [
  { to: '/claude-hub', emoji: '🟠', iconBg: 'bg-orange-500/10', title: 'Claude 资源', desc: '官方入口 / 客户端 / Claude Code / 教程' },
  { to: '/openai-hub', emoji: '🟢', iconBg: 'bg-emerald-500/10', title: 'OpenAI 全产品', desc: 'ChatGPT / Sora / DALL-E / API / Codex' },
  { to: '/gemini-hub', emoji: '🔵', iconBg: 'bg-blue-500/10', title: 'Gemini 资源', desc: 'AI Studio / Vertex / NotebookLM / Veo' },
  { to: '/tools', emoji: '🛠', iconBg: 'bg-purple-500/10', title: '在线工具', desc: 'IP 检测 / 服务状态 / 接码 / 礼品卡' },
]
</script>
