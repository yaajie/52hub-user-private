<template>
  <section class="after-sales-notice mt-8 mb-12">
    <details class="theme-panel border theme-border rounded-2xl p-5 sm:p-6 group" open>
      <summary class="flex items-center gap-2 cursor-pointer list-none">
        <svg class="w-5 h-5 text-[var(--ui-success)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <h3 class="text-base sm:text-lg font-semibold theme-text-primary">售后保障与边界</h3>
        <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p class="mt-3 text-sm theme-text-secondary font-medium">正规渠道充值，售后有保障，边界也讲清楚：</p>
      <ul class="mt-3 space-y-2.5 text-sm theme-text-secondary list-none">
        <li><strong class="theme-text-primary">我们负责：</strong>正规渠道充值、确保到账；30 天订阅状态（质保版掉订阅由本店协助处理：按剩余天数退差价，或补差价再开一个月，二选一）</li>
        <li><strong class="theme-text-primary">两档区别：</strong>到账版价格更低、出问题自己找官方；质保版多一点服务费、30 天内掉订阅由本店全程跟进。差价是服务费，不是保险</li>
        <li><strong class="theme-text-primary">充值 / 升级前：</strong>请保持账号当前没有进行中的订阅，避免覆盖剩余时间或重复扣费</li>
        <li><strong class="theme-text-primary">不在售后范围：</strong>因使用行为或使用环境（多人共用、反向代理、不稳定网络、违规使用等）导致的账号封禁——平台风控不可由卖家控制，本店不承诺 100% 不封号</li>
        <li><strong class="theme-text-primary">支持对公：</strong>所有套餐均可开具发票，公司采购可走报销流程</li>
        <li><strong class="theme-text-primary">想用得更稳：</strong>了解账号被封的常见原因与安全使用方法，参见博客 <router-link to="/blog/ai-account-banned-deactivated-troubleshooting" class="theme-link underline">《账号被封了怎么办》</router-link></li>
      </ul>
      <p class="mt-4 text-sm theme-text-primary font-medium">下单即表示您已了解并接受上述售后保障与边界</p>
    </details>
  </section>
</template>

<script setup lang="ts"></script>
