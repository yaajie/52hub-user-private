// vue-i18n 已被 src/utils/i18n-lite.ts 替换（vite alias 'vue-i18n' → i18n-lite）。
// 本文件保留以兼容：
//   1) main.ts 的 `import i18n from './i18n'; app.use(i18n)` 调用模式
//   2) src/api/client.ts 的 `i18n.global.t(...)` 模块顶层调用模式（不在 setup 内）
//
// 真正的 messages 数据在 src/i18n/messages-zh-cn.ts；useI18n() 来自 src/utils/i18n-lite.ts。
//
// 历史：之前 1956 行（zh-CN 967 行 + en-US 984 行 dead data + createI18n config）。
// P0-8 已锁死 zh-CN，en-US 数据完全不会被读到。删除收益 ~50 KB gzip（vue-i18n runtime 本身）。

import { useI18n } from '../utils/i18n-lite'

// 模块顶层 useI18n() 调用 OK：i18n-lite 不依赖 Vue active component instance
const globalApi = useI18n()

export default {
  install: () => {},
  global: globalApi,
}
