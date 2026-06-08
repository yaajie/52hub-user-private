<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { captchaAPI, type CaptchaPayload } from '../../api'

const props = withDefaults(defineProps<{
  modelValue?: CaptchaPayload
  disabled?: boolean
}>(), {
  modelValue: () => ({}),
  disabled: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: CaptchaPayload): void
  (event: 'config-stale'): void
}>()

const loading = ref(false)
const imageBase64 = ref('')
const captchaID = ref(props.modelValue?.captcha_id || '')
const captchaCode = ref(props.modelValue?.captcha_code || '')

const syncModel = () => {
  emit('update:modelValue', {
    captcha_id: captchaID.value,
    captcha_code: captchaCode.value,
  })
}

const refresh = async (clearCode = true) => {
  loading.value = true
  try {
    const res = await captchaAPI.image()
    const data = res.data?.data as { captcha_id?: string; image_base64?: string } | undefined
    captchaID.value = String(data?.captcha_id || '')
    imageBase64.value = String(data?.image_base64 || '')
    if (clearCode) {
      captchaCode.value = ''
    }
    syncModel()
  } catch {
    captchaID.value = ''
    imageBase64.value = ''
    captchaCode.value = ''
    syncModel()
    emit('config-stale')
  } finally {
    loading.value = false
  }
}

const clear = () => {
  captchaCode.value = ''
  syncModel()
}

watch(captchaCode, () => {
  syncModel()
})

onMounted(() => {
  refresh()
})

defineExpose({
  refresh,
  clear,
})
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-3">
      <img
        v-if="imageBase64"
        :src="imageBase64"
        alt="captcha"
        class="h-10 rounded-md border theme-border bg-[var(--ui-bg-soft)]"
      />
      <button
        type="button"
        class="text-xs theme-text-muted underline underline-offset-2 hover:text-[var(--ui-text-secondary)]"
        :disabled="disabled || loading"
        @click="refresh()"
      >
        {{ loading ? '刷新中...' : '换一张' }}
      </button>
    </div>
    <input
      v-model="captchaCode"
      type="text"
      class="h-10 w-full rounded-xl border theme-border bg-[var(--ui-bg-elevated)] px-3 text-sm theme-text-primary"
      placeholder="请输入图片验证码"
      :disabled="disabled"
      autocomplete="off"
    />
  </div>
</template>
