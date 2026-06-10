<template>
  <section class="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-400/20 dark:bg-amber-400/10">
    <div class="flex items-start gap-3">
      <ClockIcon class="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
      <div class="space-y-1">
        <p class="text-sm font-bold theme-text-primary">人工发货说明</p>
        <p class="text-xs leading-relaxed theme-text-secondary">
          商品页面显示为人工发货或人工交付的商品，下单付款后请保留订单号并联系客服处理。请加 QQ 群
          <span class="font-semibold theme-text-primary">1105879333</span>
          咨询，验证答案填写
          <span class="font-semibold theme-text-primary">AI开通</span>。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ClockIcon } from '@heroicons/vue/24/outline'
</script>
