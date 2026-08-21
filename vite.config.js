import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDevelopment = mode === 'development'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    base: '/',
    server: {
      port: 3000,
      host: true,
      proxy: isDevelopment
        ? {
            '/api': {
              target: env.VITE_API_PROXY_TARGET || 'http://192.168.18.2:8081',
              changeOrigin: true,
            }
          }
        : undefined
    },
    build: {
      rollupOptions: {
        external: (id) => {
          const reg = /src\/assets\/.*\.(png|jpg|jpeg|gif|svg|webp)$/
          return reg.test(id)
        }
      }
    }
  }
})
