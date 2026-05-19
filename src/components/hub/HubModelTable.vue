<template>
  <section v-if="columns.length && rows.length" class="mb-10">
    <h2 class="text-xl font-semibold theme-text-primary sm:text-2xl">{{ title }}</h2>
    <div class="mt-4 overflow-x-auto rounded-2xl border theme-border theme-panel">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="border-b theme-border">
            <th
              v-for="column in columns"
              :key="column"
              class="px-4 py-3 text-left font-semibold theme-text-primary"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="border-b theme-border last:border-b-0">
            <td v-for="(cell, cellIndex) in row.cells" :key="`${rowIndex}-${cellIndex}`" class="px-4 py-3 theme-text-secondary">
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
}>(), {
  title: '模型对比',
})
</script>
