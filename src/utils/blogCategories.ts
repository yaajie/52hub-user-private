// 博客前端分类（2026-06-11 博客体验专项）
// 公开 posts API 不返回 tags（实测全为 null），分类用 slug 关键词规则映射，纯前端零后端依赖。
// 一篇文章可命中多个分类（如 chatgpt-codex-vs-claude-code 同属 Claude 与 ChatGPT），
// 未命中任何分类的文章只出现在「全部」。列表页标签条与文章页右栏共用本模块。

export interface BlogCategory {
  key: string
  label: string
  match: (slug: string) => boolean
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { key: 'claude', label: 'Claude', match: (s) => /claude/.test(s) },
  { key: 'chatgpt', label: 'ChatGPT / Codex', match: (s) => /chatgpt|codex|openai|sora/.test(s) },
  { key: 'gemini', label: 'Gemini', match: (s) => /gemini|veo/.test(s) },
  { key: 'starter', label: '新手入门', match: (s) => /^ai-|^what-is-|^how-to-pick|^apple-id-/.test(s) },
]

export function matchCategory(slug: string, key: string): boolean {
  if (key === 'all') return true
  const cat = BLOG_CATEGORIES.find((c) => c.key === key)
  return cat ? cat.match((slug || '').toLowerCase()) : false
}
