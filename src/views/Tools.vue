<template>
  <div class="tools-page min-h-screen theme-page pt-24 pb-16">
    <div class="container mx-auto px-4">
      <header class="mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold theme-text-primary">实用工具集合</h1>
        <p class="mt-3 text-sm sm:text-base theme-text-secondary">AI 工具相关的常用网络检测、服务状态、域名信息工具</p>
      </header>

      <section
        v-for="category in categories"
        :key="category.name"
        class="mb-10"
      >
        <h2 class="text-xl sm:text-2xl font-semibold theme-text-primary">{{ category.name }}</h2>
        <p class="mt-2 text-sm theme-text-muted">{{ category.description }}</p>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a
            v-for="item in category.items"
            :key="`${category.name}-${item.name}`"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="block theme-panel border theme-border rounded-2xl p-5 transition-colors hover:theme-surface-strong"
          >
            <h3 class="text-base font-semibold theme-text-primary">{{ item.name }}</h3>
            <p class="mt-1 text-xs theme-text-muted">{{ getHost(item.url) }}</p>
            <p class="mt-2 text-sm theme-text-secondary">{{ item.desc }}</p>
          </a>
        </div>
      </section>

      <p class="text-xs sm:text-sm theme-text-muted border-t theme-border pt-6">
        本页仅整理公开网络检测工具入口，结果仅供网络诊断参考。请遵守当地法律法规和各平台服务条款。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

type ToolItem = {
  name: string
  url: string
  desc: string
}

type ToolCategory = {
  name: string
  description: string
  items: ToolItem[]
}

const categories: ToolCategory[] = [
  {
    name: 'IP 检测',
    description: '判断当前网络出口的类型、信誉、地理位置——影响 ChatGPT / Claude 注册和使用',
    items: [
      { name: 'ping0.cc', url: 'https://ping0.cc/', desc: 'IP 类型（住宅 / 机房）+ 风险值评分，最常用' },
      { name: 'IPInfo', url: 'https://ipinfo.io/', desc: 'IP 归属地 / ISP / ASN 详情' },
      { name: 'WhatIsMyIPAddress', url: 'https://whatismyipaddress.com/', desc: '基础 IP 信息 + 黑名单查询' },
      { name: 'Scamalytics', url: 'https://scamalytics.com/', desc: 'IP 欺诈值评分（低于 30 算干净）' },
      { name: 'BrowserLeaks IP', url: 'https://browserleaks.com/ip', desc: 'IP + WebRTC + 浏览器指纹综合检测' },
    ],
  },
  {
    name: '服务状态',
    description: '当 AI 服务用不了时，先查这里——是平台挂了还是你网络问题',
    items: [
      { name: 'Anthropic Status', url: 'https://status.anthropic.com/', desc: 'Claude / Claude Code / API 状态' },
      { name: 'OpenAI Status', url: 'https://status.openai.com/', desc: 'ChatGPT / API / Sora 状态' },
      { name: 'Google Cloud Status', url: 'https://status.cloud.google.com/', desc: 'Gemini / Google API 状态' },
      { name: 'Apple System Status', url: 'https://www.apple.com/support/systemstatus/', desc: 'iCloud / App Store / Apple ID 状态' },
      { name: 'Down For Everyone', url: 'https://downforeveryoneorjustme.com/', desc: '通用网站可达性检测' },
    ],
  },
  {
    name: 'DNS / 隐私检测',
    description: '代理是否真的安全？DNS 有没有泄露？这里能查清楚',
    items: [
      { name: 'DNS Leak Test', url: 'https://dnsleaktest.com/', desc: 'DNS 泄露检测' },
      { name: 'BrowserLeaks WebRTC', url: 'https://browserleaks.com/webrtc', desc: 'WebRTC 泄露真实 IP 检测' },
      { name: 'Whoer.net', url: 'https://whoer.net/', desc: '综合匿名性评分' },
      { name: 'IPLeak', url: 'https://ipleak.net/', desc: '泄露综合检测（含 IPv6 / Flash）' },
    ],
  },
  {
    name: '域名 / 备案查询',
    description: '查一个网站可信不可信，备案信息和注册时间最直观',
    items: [
      { name: 'Whois 查询', url: 'https://whois.chinaz.com/', desc: '域名注册信息、到期时间' },
      { name: 'ICP 备案查询', url: 'https://icp.chinaz.com/', desc: '国内 ICP 备案信息（境外域名查不到正常）' },
      { name: 'BuiltWith', url: 'https://builtwith.com/', desc: '查网站用什么技术栈' },
    ],
  },
  {
    name: '充值卡 / 礼品卡',
    description: 'Apple Gift Card / Visa Gift Card 等海外充值卡的常用入口',
    items: [
      { name: 'Apple 礼品卡（美区）', url: 'https://www.apple.com/shop/buy-giftcard/giftcard', desc: '官方 Apple Gift Card 直购（需海外卡）' },
      { name: '土耳其 Apple Store', url: 'https://www.apple.com/tr/', desc: '土区 App Store 入口（充值便宜）' },
    ],
  },
  {
    name: '接码服务（仅供参考）',
    description: '海外手机号短信接收 · 用于注册各类账号',
    items: [
      { name: 'HeroSMS', url: 'https://hero-sms.com/', desc: '主流接码平台之一，号源覆盖 180+ 国家' },
    ],
  },
]

const getHost = (url: string) => {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

useHead({
  title: '实用工具集合 · IP 检测 / 服务状态 / DNS / 礼品卡 - 52HUB',
  meta: [
    {
      name: 'description',
      content: '52HUB 整理的 AI 工具相关常用资源：IP 类型与风险检测、Claude/ChatGPT 服务状态、DNS 泄露检测、域名查询、礼品卡渠道。',
    },
  ],
})
</script>
