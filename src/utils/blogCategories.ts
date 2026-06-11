// 博客前端分类（2026-06-11 博客体验专项；同日第二版改「读者意图」维度）
// 公开 posts API 不返回 tags（实测全为 null），分类用 slug 关键词规则映射，纯前端零后端依赖。
// 维度按读者意图（解决什么问题），不按产品——按产品分(Claude/ChatGPT/Gemini)和导航栏
// 「AI 资源」hub 页重复，没有新信息量；意图维度才是博客内容的自然分类。
// 当前 18 篇互斥全覆盖；新文章未命中任何分类时只出现在「全部」，发文时注意 slug 带上意图关键词。
// 列表页标签条与文章页右栏共用本模块。

export interface BlogCategory {
  key: string
  label: string
  match: (slug: string) => boolean
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { key: 'buying', label: '选购对比', match: (s) => /-vs-|comparison|how-to-pick|video-subscription/.test(s) },
  { key: 'signup', label: '注册开通', match: (s) => /registration|verification|apple-id|payment/.test(s) },
  { key: 'trouble', label: '防封排错', match: (s) => /anti-ban|403|troubleshooting/.test(s) },
  { key: 'basics', label: '新手科普', match: (s) => /what-is|membership-same|can-use-directly|getting-started|fable/.test(s) },
]

export function matchCategory(slug: string, key: string): boolean {
  if (key === 'all') return true
  const cat = BLOG_CATEGORIES.find((c) => c.key === key)
  return cat ? cat.match((slug || '').toLowerCase()) : false
}
