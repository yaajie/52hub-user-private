<template>
  <section v-if="columns.length && rows.length" class="mb-10">
    <div class="flex items-center gap-3">
      <span class="h-7 w-1.5 rounded-full" :style="{ background: accent }"></span>
      <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">{{ title }}</h2>
    </div>
    <div class="mt-4 overflow-x-auto rounded-2xl border theme-border theme-panel">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="border-b theme-border theme-surface-soft">
            <th
              v-for="(column, ci) in columns"
              :key="column"
              class="px-4 py-3 text-left font-semibold theme-text-primary"
              :class="ci === 0 ? 'whitespace-nowrap' : ''"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="border-b theme-border last:border-b-0 transition-colors hover:bg-[var(--ui-bg-soft)]"
          >
            <td
              v-for="(cell, cellIndex) in row.cells"
              :key="`${rowIndex}-${cellIndex}`"
              class="px-4 py-3"
              :class="cellIndex === 0 ? 'font-semibold theme-text-primary whitespace-nowrap' : 'theme-text-secondary'"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  columns: string[]
  rows: Array<{ cells: string[] }>
  accent?: string
}>(), {
  title: '模型对比',
  accent: '#d9480f',
})
</script>
