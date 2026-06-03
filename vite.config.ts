import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

const cfAsyncModuleScriptPlugin = () => ({
  name: 'cfasync-module-script',
  transformIndexHtml(html: string) {
    return html.replace(
      /<script\s+type="module"(?![^>]*data-cfasync)/g,
      '<script data-cfasync="false" type="module"',
    )
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue(), cfAsyncModuleScriptPlugin()],
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'] } : {},
  resolve: {
    alias: {
      // P1-O: replace vue-i18n runtime (gzip ~50 kB) with lightweight in-house shim.
      // All `from 'vue-i18n'` imports across 52 source files resolve here.
      // Supports: useI18n() with t(key) + t(key, {var}) interpolation + locale ref.
      'vue-i18n': fileURLToPath(new URL('./src/utils/i18n-lite.ts', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue-core': ['vue', 'vue-router', 'pinia', '@unhead/vue'],
          'vendor-qrcode': ['qrcode'],
          // 'vendor-vue-i18n' chunk removed: aliased to in-house shim, no longer a vendor dep
        },
      },
    },
  },
  server: {
    host: '0.0.0.0', // 监听所有网络接口
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_PROXY || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: process.env.VITE_DEV_PROXY || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
}))
