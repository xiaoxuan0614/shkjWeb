import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // base: process.env.NODE_ENV === 'production'
  //   ? 'https://sh-website.obs.cn-north-4.myhuaweicloud.com'
  //   : '/',
  base: '/',
  server: {
    port: 3000, // 修改为3000端口
    host: true, // 可选：允许局域网其他设备访问
    proxy: {
      '/api': {
        target: 'https://www.shouhuikeji.com',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      external: (id) => {
        const reg = /src\/assets\/.*\.(png|jpg|jpeg|gif|svg|webp)$/
        return reg.test(id)
      }
    }
  }
  
})