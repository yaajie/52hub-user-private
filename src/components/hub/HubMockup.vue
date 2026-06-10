<template>
  <div
    class="hub-mockup overflow-hidden rounded-2xl border theme-border shadow-xl"
    :style="{ '--mk-accent': accent }"
  >
    <!-- 窗口标题栏 -->
    <div class="flex items-center gap-2 border-b theme-border bg-[#1b1d21] px-4 py-2.5">
      <span class="h-3 w-3 rounded-full bg-[#ff5f57]"></span>
      <span class="h-3 w-3 rounded-full bg-[#febc2e]"></span>
      <span class="h-3 w-3 rounded-full bg-[#28c840]"></span>
      <span class="ml-3 truncate font-mono text-xs text-zinc-400">{{ title }}</span>
      <span class="ml-auto hidden font-mono text-[0.65rem] uppercase tracking-wider text-zinc-500 sm:inline">agent</span>
    </div>

    <!-- 会话主体（始终深色，像代码区） -->
    <div class="bg-[#0d0e11] px-4 py-4 font-mono text-[13px] leading-relaxed sm:px-5 sm:py-5">
      <!-- 用户请求 -->
      <div class="mb-3 flex items-start gap-2">
        <span class="select-none font-bold" :style="{ color: accent }">▸</span>
        <span class="text-zinc-200">{{ prompt }}</span>
      </div>

      <!-- 智能体动作 -->
      <div class="space-y-2">
        <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2.5">
          <span
            v-if="step.done"
            class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
            :style="{ background: accent }"
          >✓</span>
          <span
            v-else
            class="h-1.5 w-1.5 shrink-0 rounded-full"
            :style="{ background: accent, boxShadow: `0 0 8px ${accent}` }"
          ></span>
          <span :class="step.done ? 'font-medium text-zinc-100' : 'text-zinc-300'">{{ step.text }}</span>
          <span
            v-if="step.meta"
            class="ml-auto shrink-0 rounded-md px-1.5 py-0.5 text-[0.7rem] font-medium"
            :style="{ background: `${accent}1F`, color: accent }"
          >{{ step.meta }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  accent?: string
  title: string
  prompt: string
  steps: Array<{ text: string; meta?: string; done?: boolean }>
}>(), {
  accent: '#d9480f',
})
</script>
