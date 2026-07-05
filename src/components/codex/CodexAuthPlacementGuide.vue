<template>
  <section class="placement-panel interactive-panel mt-5 rounded-2xl border theme-border theme-panel overflow-hidden">
    <div class="placement-head border-b theme-border px-5 py-5 sm:px-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span class="placement-kicker">保存到 Codex 配置目录</span>
          <h2 class="mt-2 text-xl font-bold theme-text-primary sm:text-2xl">放置路径</h2>
          <p class="mt-1 text-[0.95rem] theme-text-muted">
            下载后文件名必须保持 <strong class="theme-text-primary">auth.json</strong>，放到对应系统目录后 Codex 才能读取。
          </p>
        </div>
        <span class="placement-file-badge font-mono">auth.json</span>
      </div>
    </div>

    <div class="space-y-5 p-5 sm:p-6">
      <div class="placement-note">
        <strong>隐藏目录提示：</strong>
        macOS 的 <code>.codex</code> 默认不在 Finder 里显示；Windows 可把路径粘贴到资源管理器地址栏，或直接复制下面命令打开目录。
      </div>

      <div class="placement-guide-grid">
        <article v-for="guide in placementGuides" :key="guide.key" class="placement-card">
          <div class="placement-card-head">
            <div class="placement-platform-heading">
              <span :class="['placement-platform-icon', `placement-platform-${guide.key}`]" aria-hidden="true">
                <svg v-if="guide.key === 'macos'" viewBox="0 0 24 24" focusable="false">
                  <path d="M16.73 12.03c-.02-2.23 1.82-3.32 1.91-3.37-1.04-1.52-2.66-1.73-3.23-1.75-1.38-.14-2.69.81-3.39.81-.71 0-1.79-.79-2.94-.77-1.52.02-2.92.88-3.7 2.24-1.58 2.74-.4 6.8 1.13 9.02.75 1.09 1.65 2.32 2.83 2.27 1.13-.04 1.56-.73 2.93-.73 1.36 0 1.75.73 2.94.71 1.22-.02 1.99-1.11 2.74-2.2.86-1.26 1.21-2.48 1.23-2.54-.03-.01-2.36-.9-2.45-3.69ZM14.5 5.46c.62-.75 1.04-1.79.93-2.83-.9.04-1.99.6-2.64 1.35-.58.67-1.09 1.73-.95 2.75 1 .08 2.03-.51 2.66-1.27Z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" focusable="false">
                  <path d="M3 4.5 10.9 3.4v8H3V4.5Zm9.1-1.3L21 2v9.4h-8.9V3.2ZM3 12.6h7.9v8L3 19.5v-6.9Zm9.1 0H21V22l-8.9-1.2v-8.2Z" />
                </svg>
              </span>
              <div class="placement-platform-copy">
                <span class="placement-os">{{ guide.os }}</span>
                <span class="placement-title-divider">·</span>
                <h3>{{ guide.title }}</h3>
              </div>
            </div>
            <span class="placement-step">{{ guide.step }}</span>
          </div>

          <div class="placement-path-box">
            <div class="placement-path-meta">
              <span>{{ guide.pathLabel }}</span>
              <button
                type="button"
                class="placement-copy-button placement-path-copy"
                @click="copyPlacementCommand(guide.path, `${guide.os} 路径`)"
              >
                <ClipboardDocumentIcon class="h-4 w-4" aria-hidden="true" />
                复制路径
              </button>
            </div>
            <code>{{ guide.path }}</code>
          </div>
          <div v-if="guide.secondaryPath" class="placement-path-box secondary">
            <span>{{ guide.secondaryPathLabel }}</span>
            <code>{{ guide.secondaryPath }}</code>
          </div>

          <p class="placement-help">{{ guide.help }}</p>

          <div class="placement-command-list">
            <div v-for="command in guide.commands" :key="command.label" class="placement-command">
              <div class="placement-command-meta">
                <span>{{ command.label }}</span>
                <button
                  type="button"
                  class="placement-copy-button"
                  @click="copyPlacementCommand(command.value, `${guide.os} ${command.label}`)"
                >
                  <ClipboardDocumentIcon class="h-4 w-4" aria-hidden="true" />
                  复制
                </button>
              </div>
              <code>{{ command.value }}</code>
            </div>
          </div>
        </article>
      </div>

      <p
        v-if="placementCopyStatus"
        :class="['placement-copy-status', placementCopyStatusType === 'ok' ? 'text-[var(--ui-success)]' : 'text-rose-700 dark:text-rose-300']"
        aria-live="polite"
      >
        {{ placementCopyStatus }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ClipboardDocumentIcon } from '@heroicons/vue/24/outline'

const placementCopyStatus = ref('')
const placementCopyStatusType = ref<'ok' | 'error'>('ok')

const placementGuides = [
  {
    key: 'macos',
    os: 'macOS',
    step: '01',
    title: 'Finder / 终端',
    pathLabel: '最终文件路径',
    path: '~/.codex/auth.json',
    secondaryPathLabel: '小白理解',
    secondaryPath: 'Mac 用户目录/.codex/auth.json',
    help: '开头的 ~ 代表你的 Mac 用户目录。如果没有 .codex 文件夹，下面命令会自动创建，并在 Finder 里直接打开该隐藏目录。',
    commands: [
      {
        label: '打开目录',
        value: 'mkdir -p ~/.codex && open ~/.codex',
      },
      {
        label: '复制下载文件',
        value: 'mkdir -p ~/.codex && cp ~/Downloads/auth.json ~/.codex/auth.json',
      },
      {
        label: '检查文件',
        value: 'ls -la ~/.codex/auth.json',
      },
    ],
  },
  {
    key: 'windows',
    os: 'Windows',
    step: '02',
    title: 'PowerShell / 文件资源管理器',
    pathLabel: '资源管理器里看到的路径',
    path: 'C:\\Users\\你的用户名\\.codex\\auth.json',
    secondaryPathLabel: '命令里的变量含义',
    secondaryPath: '%USERPROFILE% = C:\\Users\\你的用户名',
    help: '不用手动把命令里的 $env:USERPROFILE 或 %USERPROFILE% 改成用户名；Windows 会自动识别你的用户目录。',
    commands: [
      {
        label: '打开目录',
        value: 'New-Item -ItemType Directory -Force "$env:USERPROFILE\\.codex" | Out-Null; explorer "$env:USERPROFILE\\.codex"',
      },
      {
        label: '复制下载文件',
        value: 'New-Item -ItemType Directory -Force "$env:USERPROFILE\\.codex" | Out-Null; Copy-Item -Force "$env:USERPROFILE\\Downloads\\auth.json" "$env:USERPROFILE\\.codex\\auth.json"',
      },
      {
        label: 'CMD 打开目录',
        value: 'mkdir "%USERPROFILE%\\.codex" 2>nul & explorer "%USERPROFILE%\\.codex"',
      },
    ],
  },
] as const

async function copyPlacementCommand(command: string, label: string) {
  try {
    await navigator.clipboard.writeText(command)
    placementCopyStatus.value = `已复制 ${label}。`
    placementCopyStatusType.value = 'ok'
  } catch {
    placementCopyStatus.value = '复制失败，请手动选中命令复制。'
    placementCopyStatusType.value = 'error'
  }
}
</script>

<style scoped>
.placement-panel {
  position: relative;
  isolation: isolate;
}

.placement-panel::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-accent) 13%, transparent), transparent 42%),
    linear-gradient(180deg, transparent, color-mix(in oklab, var(--ui-accent-soft) 34%, transparent));
}

.placement-head {
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--ui-accent-soft) 64%, transparent), transparent 76%),
    color-mix(in oklab, var(--ui-bg-elevated) 82%, transparent);
}

.placement-kicker {
  display: inline-flex;
  align-items: center;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 32%, var(--ui-border));
  border-radius: 999px;
  background: color-mix(in oklab, var(--ui-accent-soft) 58%, var(--ui-bg-soft));
  padding: 0.18rem 0.55rem;
  color: var(--ui-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
}

.placement-file-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border: 1px solid color-mix(in oklab, var(--ui-success) 36%, var(--ui-border));
  border-radius: 999px;
  background: color-mix(in oklab, var(--ui-success-soft) 72%, var(--ui-bg-elevated));
  padding: 0.42rem 0.78rem;
  color: var(--ui-success);
  font-size: 0.86rem;
  font-weight: 900;
}

.placement-note {
  border: 1px solid color-mix(in oklab, var(--ui-warning) 34%, var(--ui-border));
  border-radius: 0.875rem;
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-warning-soft) 72%, transparent), transparent),
    color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
  padding: 1rem 1.1rem;
  color: var(--ui-text-secondary);
  font-size: 0.94rem;
  line-height: 1.75;
}

.placement-note strong {
  color: var(--ui-text-primary);
}

.placement-note code {
  border-radius: 0.35rem;
  background: color-mix(in oklab, var(--ui-warning-soft) 78%, var(--ui-bg-elevated));
  padding: 0.05rem 0.28rem;
  color: var(--ui-warning);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.88rem;
}

.placement-guide-grid {
  display: grid;
  gap: 1.1rem;
  align-items: stretch;
}

.placement-card {
  display: flex;
  height: 100%;
  min-width: 0;
  flex-direction: column;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 20%, var(--ui-border));
  border-radius: 1.15rem;
  background:
    linear-gradient(180deg, color-mix(in oklab, var(--ui-bg-elevated) 90%, transparent), color-mix(in oklab, var(--ui-bg-soft) 72%, transparent));
  padding: 1.2rem;
  box-shadow: 0 18px 48px color-mix(in oklab, var(--ui-accent) 8%, transparent);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.placement-card:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 42%, var(--ui-border));
  box-shadow: 0 22px 60px color-mix(in oklab, var(--ui-accent) 13%, transparent);
  transform: translateY(-1px);
}

.placement-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.1rem;
}

.placement-platform-heading {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 1.1rem;
}

.placement-platform-icon {
  position: relative;
  display: inline-flex;
  height: 3.9rem;
  width: 3.9rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 34%, var(--ui-border));
  border-radius: 1.15rem;
  background:
    linear-gradient(135deg, color-mix(in oklab, var(--ui-accent-soft) 84%, transparent), transparent),
    color-mix(in oklab, var(--ui-accent-soft) 68%, var(--ui-bg-elevated));
  color: var(--ui-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.placement-platform-icon svg {
  height: 2.18rem;
  width: 2.18rem;
  fill: currentColor;
}

.placement-platform-copy {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem;
}

.placement-os {
  color: var(--ui-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.placement-title-divider {
  color: var(--ui-text-muted);
  font-weight: 900;
}

.placement-card h3 {
  color: var(--ui-text-primary);
  font-size: 1.14rem;
  font-weight: 900;
}

.placement-step {
  flex: 0 0 auto;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 30%, var(--ui-border));
  border-radius: 999px;
  background: color-mix(in oklab, var(--ui-accent-soft) 52%, var(--ui-bg-elevated));
  padding: 0.25rem 0.55rem;
  color: var(--ui-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.76rem;
  font-weight: 900;
}

.placement-path-box {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: 1rem;
  border: 1px solid var(--ui-border);
  border-radius: 1rem;
  background: color-mix(in oklab, var(--ui-bg-soft) 86%, transparent);
  padding: 0.95rem 1rem;
}

.placement-path-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
}

.placement-path-box.secondary {
  margin-top: 0.55rem;
  background: color-mix(in oklab, var(--ui-bg-soft) 68%, transparent);
}

.placement-path-box span,
.placement-path-meta span {
  color: var(--ui-text-muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.placement-path-box code,
.placement-command code {
  color: var(--ui-text-primary);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  overflow-wrap: anywhere;
}

.placement-path-box code {
  font-size: 1.04rem;
  line-height: 1.6;
}

.placement-command code {
  font-size: 0.94rem;
  line-height: 1.7;
}

.placement-path-copy {
  flex: 0 0 auto;
}

.placement-help {
  margin-top: 0.9rem;
  color: var(--ui-text-secondary);
  font-size: 0.92rem;
  line-height: 1.75;
}

.placement-command-list {
  display: grid;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
}

.placement-command {
  border: 1px solid color-mix(in oklab, var(--ui-accent) 18%, var(--ui-border));
  border-radius: 1rem;
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--ui-accent-soft) 32%, transparent), transparent),
    color-mix(in oklab, var(--ui-bg-elevated) 84%, transparent);
  padding: 0.9rem;
}

.placement-command-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.placement-command-meta span {
  color: var(--ui-text-secondary);
  font-size: 0.84rem;
  font-weight: 900;
}

.placement-copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 2.25rem;
  border: 1px solid color-mix(in oklab, var(--ui-accent) 34%, var(--ui-border));
  border-radius: 0.65rem;
  background: color-mix(in oklab, var(--ui-accent-soft) 58%, var(--ui-bg-elevated));
  padding: 0.42rem 0.68rem;
  color: var(--ui-accent);
  font-size: 0.84rem;
  font-weight: 900;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.placement-copy-button:hover {
  border-color: color-mix(in oklab, var(--ui-accent) 58%, var(--ui-border));
  background: color-mix(in oklab, var(--ui-accent-soft) 84%, var(--ui-bg-elevated));
  transform: translateY(-1px);
}

.placement-copy-status {
  border-radius: 0.75rem;
  background: color-mix(in oklab, var(--ui-bg-soft) 72%, transparent);
  padding: 0.75rem 0.95rem;
  font-size: 0.92rem;
  font-weight: 800;
}

@media (hover: none) {
  .placement-card:hover,
  .placement-copy-button:hover {
    box-shadow: none;
    transform: none;
  }
}

@media (min-width: 1280px) {
  .placement-guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }
}

@media (max-width: 640px) {
  .placement-head {
    padding: 1rem;
  }

  .placement-file-badge {
    align-self: stretch;
  }

  .placement-note,
  .placement-card {
    padding: 1rem;
  }

  .placement-card-head {
    align-items: flex-start;
    gap: 0.85rem;
  }

  .placement-path-box {
    padding: 0.9rem;
  }

  .placement-path-meta {
    align-items: stretch;
    flex-direction: column;
    gap: 0.55rem;
  }

  .placement-platform-icon {
    height: 3.4rem;
    width: 3.4rem;
  }

  .placement-platform-icon svg {
    height: 1.9rem;
    width: 1.9rem;
  }

  .placement-os {
    font-size: 0.96rem;
  }

  .placement-card h3 {
    font-size: 1rem;
  }

  .placement-command {
    padding: 0.85rem;
  }

  .placement-command-meta {
    align-items: stretch;
    flex-direction: column;
    gap: 0.5rem;
  }

  .placement-copy-button {
    width: 100%;
  }

  .placement-command code {
    font-size: 0.82rem;
    line-height: 1.62;
  }
}
</style>
