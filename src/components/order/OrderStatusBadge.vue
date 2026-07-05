<template>
  <span class="theme-badge px-3 py-1 text-xs font-medium" :class="badgeClass">
    {{ badgeLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { orderStatusClass, orderStatusLabel } from '../../utils/status'

const props = defineProps<{ status: string }>()

const { t } = useI18n()

const badgeClass = computed(() => orderStatusClass(props.status))
const badgeLabel = computed(() => orderStatusLabel(t, props.status))
</script>
