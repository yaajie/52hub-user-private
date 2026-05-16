<template>
  <section class="home-announcement relative z-10 pt-24 pb-6">
    <div class="container mx-auto px-4">
      <div class="theme-panel border theme-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
        <div class="flex items-center gap-3 mb-4 pb-4 border-b border-dashed theme-border">
          <svg class="w-6 h-6 shrink-0 text-cyan-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
          </svg>
          <h2 class="text-xl sm:text-2xl font-semibold theme-text-primary">{{ t('home.announcement.title') }}</h2>
        </div>

        <div class="pt-6 space-y-2 sm:space-y-3">
          <p class="text-lg sm:text-xl font-medium theme-text-primary">{{ heroTitle }}</p>
          <p class="text-base sm:text-lg theme-text-secondary">{{ heroSubtitle }}</p>
        </div>

        <div class="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <a
            :href="contacts.telegramService"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-3 rounded-xl theme-surface-soft hover:theme-surface-strong transition-colors"
          >
            <svg class="w-6 h-6 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold theme-text-primary">TG 客服</div>
              <div class="text-xs theme-text-muted truncate">@HUB52service</div>
            </div>
          </a>
          <a
            :href="contacts.telegramChannel"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-3 rounded-xl theme-surface-soft hover:theme-surface-strong transition-colors"
          >
            <svg class="w-6 h-6 shrink-0 text-sky-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
            </svg>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold theme-text-primary">TG 频道</div>
              <div class="text-xs theme-text-muted truncate">@Hub52Notice</div>
            </div>
          </a>
          <div
            class="flex items-center gap-3 px-4 py-3 rounded-xl theme-surface-soft hover:theme-surface-strong transition-colors"
          >
            <IconQQ class="w-6 h-6 shrink-0 text-[#1AB6FF]" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold theme-text-primary">QQ 群</div>
              <div class="text-xs theme-text-muted select-text cursor-text">{{ contacts.qqGroup }}</div>
              <div class="text-xs theme-text-muted">验证答案 {{ contacts.qqGroupVerifyAnswer }}</div>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-6 border-t border-dashed theme-border">
          <p class="flex items-center gap-2 text-base font-semibold theme-text-primary mb-3">
            <svg class="w-5 h-5 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5.25H7.5A2.25 2.25 0 0 0 5.25 7.5v11.25A2.25 2.25 0 0 0 7.5 21h9a2.25 2.25 0 0 0 2.25-2.25V7.5A2.25 2.25 0 0 0 16.5 5.25H15m-6 0a2.25 2.25 0 1 1 4.5 0m-4.5 0a2.25 2.25 0 0 0 4.5 0" />
            </svg>
            <span>{{ t('home.announcement.noticeTitle') }}</span>
          </p>
          <ol class="space-y-2 sm:space-y-2.5 text-sm sm:text-base theme-text-secondary list-none ml-0">
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONTACTS } from '../constants/contact'
import { useAppStore } from '../stores/app'
import IconQQ from './icons/IconQQ.vue'

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
</script>
