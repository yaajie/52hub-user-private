<template>
  <section class="home-announcement relative z-10 pt-24 pb-6">
    <div class="container mx-auto px-4">
      <div class="theme-panel border theme-border rounded-2xl p-5 sm:p-7 md:p-8">
        <div class="flex items-center gap-2 pb-3 border-b theme-border">
          <span aria-hidden="true">📢</span>
          <h2 class="text-lg font-semibold theme-text-primary">{{ t('home.announcement.title') }}</h2>
        </div>

        <div class="pt-4 space-y-1">
          <p class="text-base font-medium theme-text-primary">{{ heroTitle }}</p>
          <p class="text-sm theme-text-secondary">{{ heroSubtitle }}</p>
        </div>

        <div class="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <a
            :href="contacts.telegramService"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-3 py-2 rounded-lg theme-surface-soft hover:theme-surface-strong transition-colors"
          >
            <span aria-hidden="true">📨</span>
            <span><strong>TG 客服</strong>　@HUB52service</span>
          </a>
          <a
            :href="contacts.telegramChannel"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-3 py-2 rounded-lg theme-surface-soft hover:theme-surface-strong transition-colors"
          >
            <span aria-hidden="true">📢</span>
            <span><strong>TG 频道</strong>　@Hub52Notice</span>
          </a>
          <button
            type="button"
            @click="copyQQ"
            class="flex items-center gap-2 px-3 py-2 rounded-lg theme-surface-soft hover:theme-surface-strong transition-colors text-left"
          >
            <span aria-hidden="true">💬</span>
            <span>
              <strong>QQ 群</strong>　{{ contacts.qqGroup }}
              <span class="block text-xs theme-text-muted">{{ copyState === 'copied' ? '已复制 ✓' : `验证答案 ${contacts.qqGroupVerifyAnswer}` }}</span>
            </span>
          </button>
        </div>

        <div class="pt-4 mt-4 border-t theme-border">
          <p class="flex items-center gap-2 text-sm font-semibold theme-text-primary mb-2">
            <span aria-hidden="true">📋</span>
            <span>{{ t('home.announcement.noticeTitle') }}</span>
          </p>
          <ol class="space-y-1.5 text-sm theme-text-secondary list-none ml-0">
            <li>① 直充类商品付款后自动开通；非自动发货商品请等待客服处理</li>
            <li>② 成品账号收到后请第一时间修改密码</li>
            <li>③ 卡密 / 账户数据保留 7 天，请及时保存</li>
            <li>④ 商品售后规则以各商品详情页说明为准</li>
            <li>⑤ 客服在线时间：每日 12:00 - 24:00</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONTACTS } from '../constants/contact'
import { useAppStore } from '../stores/app'

defineProps<{
  heroTitle: string
  heroSubtitle: string
}>()

const { t } = useI18n()
const appStore = useAppStore()
const contacts = computed(() => ({
  ...CONTACTS,
  telegramService: appStore.config?.contact?.telegram || CONTACTS.telegramService,
}))

const copyState = ref<'idle' | 'copied'>('idle')
const copyQQ = async () => {
  try {
    await navigator.clipboard.writeText(CONTACTS.qqGroup)
    copyState.value = 'copied'
    setTimeout(() => {
      copyState.value = 'idle'
    }, 2000)
  } catch (error) {
    console.error('copy failed', error)
  }
}
</script>
