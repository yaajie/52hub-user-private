// v-spotlight · 鼠标跟随光晕指令（简化版）
//
// 用法：在 template 里直接加 v-spotlight 到任意卡片元素：
//   <div v-spotlight class="theme-panel ...">...</div>
//   <div v-spotlight.border class="...">...</div>   // 同时加渐变边框
//
// 配合 src/styles/52hub-hotfixes.css 里的 .spotlight 样式，鼠标
// 在卡片上 hover 时会有一个跟随鼠标位置的 radial gradient 高光。
//
// 简化策略：直接在 mounted 时绑定 mousemove，不再等 mouseenter
// 包裹。mousemove 只在鼠标在元素 bounding box 内才会触发，性能
// 影响可忽略。用 rAF 节流避免高频 setStyle。

import type { Directive, DirectiveBinding } from 'vue'

type Cleanup = () => void
type ElWithCleanup = HTMLElement & { __spotlightCleanup?: Cleanup }

interface SpotlightOptions {
  /** 是否同时加 border 扫光 */
  border?: boolean
}

function parseOptions(binding: DirectiveBinding<SpotlightOptions | boolean | undefined>): SpotlightOptions {
  const v = binding.value
  if (typeof v === 'boolean') return { border: v }
  return v || {}
}

export const vSpotlight: Directive<ElWithCleanup, SpotlightOptions | boolean | undefined> = {
  mounted(el, binding) {
    const opts = parseOptions(binding)
    el.classList.add('spotlight')
    if (opts.border || binding.modifiers.border) {
      el.classList.add('spotlight-border')
    }

    let rafId = 0
    let latestX = 0
    let latestY = 0

    const flush = () => {
      el.style.setProperty('--spot-x', `${latestX}px`)
      el.style.setProperty('--spot-y', `${latestY}px`)
      rafId = 0
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      latestX = e.clientX - rect.left
      latestY = e.clientY - rect.top
      if (rafId === 0) rafId = requestAnimationFrame(flush)
    }

    el.addEventListener('mousemove', onMove, { passive: true })

    el.__spotlightCleanup = () => {
      el.removeEventListener('mousemove', onMove)
      if (rafId !== 0) cancelAnimationFrame(rafId)
    }
  },
  unmounted(el) {
    el.__spotlightCleanup?.()
  },
}
