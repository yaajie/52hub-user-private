// 自实现 useI18n shim, 兼容 vue-i18n 的最小用法（仅 t + locale）。
// 通过 vite.config.ts resolve.alias 把 'vue-i18n' 重定向到本文件，
// 替换上游 vue-i18n runtime（gzip ~50 kB），保留所有现有 import 不动。
//
// 支持：
//   const { t, locale } = useI18n()
//   t('common.confirm')                       // nested key
//   t('home.featured.viewAll')                // deep nested
//   t('notFound.description', { site: 'X' }) // {var} 插值
//
// 不支持（但项目当前也未使用）：
//   - 复数（tc / $tc）
//   - datetime / number 格式化（d / n）
//   - link 消息（@:key）
//   - lazy-load 语言包

import { readonly, ref, type Ref } from 'vue'
import messages from '../i18n/messages-zh-cn'

type MessageNode = string | { [k: string]: MessageNode }

const currentLocale = ref<string>('zh-CN')

function getNested(obj: MessageNode | undefined, path: string): string | undefined {
  if (!obj) return undefined
  const out = path.split('.').reduce<MessageNode | undefined>((cur, key) => {
    if (cur && typeof cur === 'object' && key in cur) {
      return (cur as Record<string, MessageNode>)[key]
    }
    return undefined
  }, obj)
  return typeof out === 'string' ? out : undefined
}

function interpolate(template: string, vars?: Record<string, unknown>): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    k in vars && vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : `{${k}}`,
  )
}

export interface I18nApi {
  t: (key: string, vars?: Record<string, unknown>) => string
  locale: Ref<string>
}

export function useI18n(): I18nApi {
  return {
    t(key: string, vars?: Record<string, unknown>): string {
      const v = getNested(messages as MessageNode, key)
      if (v === undefined) return key
      return interpolate(v, vars)
    },
    locale: readonly(currentLocale) as Ref<string>,
  }
}

// 兼容 createI18n / app.use(i18n) 写法：导出 noop install 让 main.ts 可继续 app.use 但实际不做事
export function createI18n(): { install: () => void } {
  return { install: () => {} }
}

// vue-i18n 默认 export 通常是 createI18n() 返回的对象本身；提供 noop default 兼容
export default { install: () => {} }
