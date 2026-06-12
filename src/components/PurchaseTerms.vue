<template>
  <section class="purchase-terms mt-8 space-y-4">
    <details class="theme-panel border theme-border rounded-2xl p-5 sm:p-6 group" open>
      <summary class="flex items-center gap-2 cursor-pointer list-none">
        <svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <details class="theme-panel border theme-border rounded-2xl p-5 sm:p-6 group">
      <summary class="flex items-center gap-2 cursor-pointer list-none">
        <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 3c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
        </svg>
        <h3 class="text-base sm:text-lg font-semibold theme-text-primary">购买须知</h3>
        <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p class="mt-3 text-sm theme-text-secondary font-medium">⚠ 请在购买前仔细阅读以下风险提示</p>
      <ul class="mt-3 space-y-2.5 text-sm theme-text-secondary list-none">
        <li><strong class="theme-text-primary">网络访问合规：</strong>本站所售商品为会员开通服务，中国大陆用户访问相关服务需自行解决网络问题。用户应了解并遵守《中华人民共和国计算机信息网络国际联网管理暂行规定》等相关法律法规，因违规使用网络工具访问境外服务所产生的一切法律后果由用户自行承担</li>
        <li><strong class="theme-text-primary">数据跨境风险：</strong>使用境外账号涉及个人数据跨境传输，用户应知悉数据可能存储在中国大陆境外服务器，不受《中华人民共和国数据安全法》《个人信息保护法》的直接管辖保护，请勿在境外平台上传敏感个人信息或涉密数据</li>
        <li><strong class="theme-text-primary">外汇与支付合规：</strong>本站以人民币计价，不涉及外汇交易。但用户后续如在境外平台产生付费行为，应自行确保符合国家外汇管理相关规定</li>
        <li><strong class="theme-text-primary">内容合规责任：</strong>用户不得利用境外账号发布、传播违反中国法律法规的内容，包括但不限于危害国家安全、扰乱社会秩序、侵犯他人合法权益的信息。因用户发布违规内容导致的法律责任由用户自行承担</li>
        <li><strong class="theme-text-primary">账号使用风险：</strong>相关平台可能随时对账号进行安全审查或政策调整，账号存在被封禁的风险。本站质保规则以各商品详情页说明为准，超出质保范围的使用风险由用户自行承担</li>
        <li><strong class="theme-text-primary">服务不可用风险：</strong>因国际网络波动、境外平台政策变更、国内监管政策调整等不可抗力因素，相关服务可能出现无法访问或功能受限的情况，本站不对此承担责任</li>
        <li><strong class="theme-text-primary">退款政策：</strong>虚拟商品一经售出概不退换，发货内容显示后视为已使用，请确认需求并评估风险后再购买</li>
      </ul>
      <p class="mt-4 text-sm theme-text-primary font-medium">购买即表示您已充分了解上述风险并自愿承担相关责任</p>
    </details>

    <details class="theme-panel border theme-border rounded-2xl p-5 sm:p-6 group">
      <summary class="flex items-center gap-2 cursor-pointer list-none">
        <svg class="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-base sm:text-lg font-semibold theme-text-primary">免责声明</h3>
        <svg class="w-4 h-4 ml-auto transition-transform group-open:rotate-180 theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p class="mt-3 text-sm theme-text-secondary leading-relaxed">
        本站仅提供 AI 会员开通、自动发货与订单查询技术服务，不提供任何网络代理、VPN 或翻墙工具。用户应自行确保访问境外服务的方式合法合规。本站不对用户使用账号的具体行为负责，不对因网络环境变化、平台政策调整、账号封禁等导致的任何直接或间接损失承担责任。本站保留在法律法规或监管政策要求下随时调整或终止服务的权利。如您不同意上述条款，请勿购买。
      </p>
    </details>
  </section>
</template>

<script setup lang="ts"></script>
