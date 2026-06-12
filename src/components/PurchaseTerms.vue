<template>
  <section class="purchase-terms mt-8 space-y-4">
    <!-- 购买须知：仅商品详情页展示（showPurchaseNotice），默认展开 -->
    <details v-if="showPurchaseNotice" class="theme-panel border theme-border rounded-2xl p-5 sm:p-6 group" open>
      <summary class="flex items-center gap-2 cursor-pointer list-none">
        <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 3c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
        </svg>
        <h3 class="text-base sm:text-lg font-semibold theme-text-primary">购买须知</h3>
        <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p class="mt-3 text-sm theme-text-secondary font-medium">⚠ 下单前请确认以下事项：</p>
      <ul class="mt-3 space-y-2.5 text-sm theme-text-secondary list-none">
        <li><strong class="theme-text-primary">账号前置：</strong>请先确认账号能正常登录、前置验证已完成；如卡在登录、验证或网络环境，请先联系客服，不要直接下单</li>
        <li><strong class="theme-text-primary">发货方式：</strong>自动发货商品付款后通常即时到账；人工或卡充类商品按客服指引完成处理</li>
        <li><strong class="theme-text-primary">退款政策：</strong>虚拟商品一经发货（卡密或账号信息已显示）即视为已使用，概不退换，请确认需求后再下单</li>
        <li><strong class="theme-text-primary">保障范围：</strong>各档位具体保障以本页「售后保障与边界」说明为准；平台风控不可由卖家控制，本站不承诺 100% 不封号</li>
        <li><strong class="theme-text-primary">合规使用：</strong>请在遵守相关法律法规的前提下使用所购服务，不得用于任何违规用途</li>
      </ul>
      <p class="mt-4 text-sm theme-text-primary font-medium">下单即表示您已确认并接受上述购买须知</p>
    </details>

    <!-- 免责声明：全站所有页面展示，默认展开 -->
    <details class="theme-panel border theme-border rounded-2xl p-5 sm:p-6 group" open>
      <summary class="flex items-center gap-2 cursor-pointer list-none">
        <svg class="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-base sm:text-lg font-semibold theme-text-primary">免责声明</h3>
        <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <ul class="mt-3 space-y-2.5 text-sm theme-text-secondary list-none">
        <li><strong class="theme-text-primary">本站定位：</strong>本站仅提供 AI 工具的学习科普、信息交流，以及 AI 订阅开通、自动发货与订单查询等技术服务；不提供任何网络代理、VPN 或翻墙工具，亦不涉及上述范围之外的其他业务</li>
        <li><strong class="theme-text-primary">网络访问合规：</strong>用户访问境外服务需自行解决网络访问问题，并确保方式合法合规；因违规使用网络工具产生的一切法律后果由用户自行承担</li>
        <li><strong class="theme-text-primary">数据与支付：</strong>使用境外账号涉及个人数据跨境，用户应知悉相关风险并避免上传敏感或涉密信息；本站以人民币计价，不涉及外汇交易</li>
        <li><strong class="theme-text-primary">内容责任：</strong>用户不得利用账号发布、传播违反法律法规的内容，由此产生的法律责任由用户自行承担</li>
        <li><strong class="theme-text-primary">服务风险：</strong>因网络波动、境外平台政策变更、监管政策调整等不可抗力因素，相关服务可能出现无法访问或功能受限，本站不对此承担责任</li>
      </ul>
      <p class="mt-4 text-sm theme-text-secondary leading-relaxed">本站保留在法律法规或监管要求下随时调整或终止服务的权利。如您不同意上述声明，请勿使用本站服务。</p>
    </details>
  </section>
</template>

<script setup lang="ts">
// showPurchaseNotice：是否显示「购买须知」（仅商品详情页传 true）。免责声明全站常显示、不受此控制。
withDefaults(defineProps<{ showPurchaseNotice?: boolean }>(), { showPurchaseNotice: false })
</script>
