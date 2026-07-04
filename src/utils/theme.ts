import { ref } from 'vue'

// 2026-07-05 站长拍板：砍亮色只留暗色（站点=深褐黑+琥珀金定位，亮色为 dujiao-next 原版遗留、二开未系统适配）。
// index.html 的 <html class="dark"> 已首帧固定暗色（防闪、无需 JS）；此处只保 useTheme API 兼容 Navbar/CodexAuth 调用方。
type Theme = 'dark'

// 兜底：即使某页未走 index.html（理论不会），也确保 .dark 在。
if (typeof document !== 'undefined') document.documentElement.classList.add('dark')

const theme = ref<Theme>('dark')

export const useTheme = () => {
    // 亮色已砍，切换为空操作（切换按钮已从 Navbar 移除）
    const toggleTheme = () => {}
    return { theme, toggleTheme }
}
