<template>
  <aside class="owned-tools-panel" aria-label="AI开通 自有工具">
    <div class="owned-tools-panel__topline">
      <span class="owned-tools-panel__dot"></span>
      <span>AIKAITONG PRODUCT TOOLS</span>
    </div>

    <div class="owned-tools-panel__header">
      <p>先检查环境，再处理登录</p>
      <strong>两个自有工具覆盖 AI 使用前的关键问题</strong>
    </div>

    <div class="owned-tools-panel__products">
      <router-link
        to="/tools/ip"
        class="owned-tool owned-tool--primary"
      >
        <span class="owned-tool__icon owned-tool__icon--ip">
          <ShieldCheckIcon class="h-6 w-6" />
        </span>
        <span class="owned-tool__body">
          <span class="owned-tool__label">AI IP 环境检测</span>
          <span class="owned-tool__desc">判断当前出口是否适合 ChatGPT、Claude Code、Gemini、Codex 登录、注册和开发调用。</span>
        </span>
        <span class="owned-tool__action">检测</span>
      </router-link>

      <router-link
        to="/tools/codex-auth"
        class="owned-tool"
      >
        <span class="owned-tool__icon owned-tool__icon--auth">
          <CommandLineIcon class="h-6 w-6" />
        </span>
        <span class="owned-tool__body">
          <span class="owned-tool__label">Codex 登录辅助</span>
          <span class="owned-tool__desc">在浏览器本地生成 Codex CLI auth.json，减少海外手机验证卡点。</span>
        </span>
        <span class="owned-tool__action">打开</span>
      </router-link>
    </div>

    <div class="owned-tools-panel__footer">
      <span>不上传账号凭据</span>
      <span>购买前可先自检</span>
      <span>持续迭代规则</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { CommandLineIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped>
.owned-tools-panel {
  position: relative;
  overflow: hidden;
  width: min(100%, 460px);
  border: 1px solid color-mix(in srgb, var(--ui-accent) 24%, var(--ui-border));
  border-radius: 1.5rem;
  padding: 1.2rem;
  background:
    radial-gradient(circle at 12% 0%, rgba(34, 211, 238, 0.18), transparent 15rem),
    radial-gradient(circle at 100% 12%, rgba(16, 185, 129, 0.12), transparent 14rem),
    color-mix(in srgb, var(--ui-bg-panel) 84%, transparent);
  box-shadow: 0 26px 80px rgba(2, 132, 199, 0.14);
  backdrop-filter: blur(18px);
}

.owned-tools-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), transparent 76%);
}

.owned-tools-panel__topline,
.owned-tools-panel__header,
.owned-tools-panel__products,
.owned-tools-panel__footer {
  position: relative;
  z-index: 1;
}

.owned-tools-panel__topline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid color-mix(in srgb, var(--ui-accent) 28%, var(--ui-border));
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  color: var(--ui-text-muted);
  background: color-mix(in srgb, var(--ui-bg-soft) 74%, transparent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.owned-tools-panel__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: #22d3ee;
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.74);
}

.owned-tools-panel__header {
  margin-top: 1.3rem;
}

.owned-tools-panel__header p {
  margin: 0;
  color: var(--ui-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
}

.owned-tools-panel__header strong {
  display: block;
  margin-top: 0.3rem;
  max-width: 22rem;
  color: var(--ui-text-primary);
  font-size: 1.35rem;
  line-height: 1.32;
}

.owned-tools-panel__products {
  display: grid;
  gap: 0.85rem;
  margin-top: 1.3rem;
}

.owned-tool {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.9rem;
  min-height: 5.5rem;
  border: 1px solid color-mix(in srgb, var(--ui-accent) 20%, var(--ui-border));
  border-radius: 1rem;
  padding: 0.9rem;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--ui-accent) 8%, transparent), transparent 62%),
    color-mix(in srgb, var(--ui-bg-soft) 78%, transparent);
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.owned-tool:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--ui-accent) 42%, var(--ui-border));
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--ui-accent) 14%, transparent), transparent 66%),
    color-mix(in srgb, var(--ui-bg-soft) 86%, transparent);
}

.owned-tool--primary {
  min-height: 6.4rem;
  border-color: color-mix(in srgb, #22d3ee 42%, var(--ui-border));
}

.owned-tool__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.9rem;
  color: var(--ui-text-primary);
}

.owned-tool__icon--ip {
  background: linear-gradient(135deg, #f7a52b, #e8590c);
  color: white;
  box-shadow: 0 16px 36px rgba(232, 89, 12, 0.28);
}

.owned-tool__icon--auth {
  border: 1px solid color-mix(in srgb, #38bdf8 30%, var(--ui-border));
  background: color-mix(in srgb, #0ea5e9 12%, transparent);
  color: #38bdf8;
}

.owned-tool__body {
  min-width: 0;
}

.owned-tool__label,
.owned-tool__desc {
  display: block;
}

.owned-tool__label {
  color: var(--ui-text-primary);
  font-size: 1rem;
  font-weight: 800;
}

.owned-tool__desc {
  margin-top: 0.28rem;
  color: var(--ui-text-secondary);
  font-size: 0.78rem;
  line-height: 1.55;
}

.owned-tool__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.2rem;
  min-height: 2.2rem;
  border-radius: 999px;
  color: #67e8f9;
  background: rgba(8, 145, 178, 0.16);
  font-size: 0.78rem;
  font-weight: 800;
}

.owned-tools-panel__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
}

.owned-tools-panel__footer span {
  border: 1px solid var(--ui-border);
  border-radius: 999px;
  padding: 0.32rem 0.55rem;
  color: var(--ui-text-muted);
  background: color-mix(in srgb, var(--ui-bg-soft) 72%, transparent);
  font-size: 0.68rem;
  font-weight: 700;
}

@media (max-width: 640px) {
  .owned-tools-panel {
    width: 100%;
    padding: 1rem;
  }

  .owned-tools-panel__header strong {
    font-size: 1.12rem;
  }

  .owned-tool {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .owned-tool__action {
    grid-column: 2;
    justify-self: start;
  }
}
</style>
