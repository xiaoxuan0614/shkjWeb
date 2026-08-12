import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { debounce } from './utils/debounce'
import { nextTick } from 'vue'
import { getOssImg } from './utils/imgUrl'

import imgOss from './directives/imgOss.js'

const app = createApp(App)
app.config.globalProperties.$ossImg = getOssImg
// ==========新增这一行！！！==========
// app.provide('ossImg', getOssImg)

app.use(router)
app.use(ElementPlus)
app.use(imgOss)
// console.log('指令注册完成！', app.directive('img-oss'))

// 全局按钮防抖指令：v-debounce="handler" 或 v-debounce="500"（仅延迟）
app.directive('debounce', {
  mounted(el, binding) {
    const delay = typeof binding.value === 'number' ? binding.value : 500
    const handler = debounce(() => {
      if (typeof binding.value === 'function') binding.value()
    }, delay)
    el._debouncedHandler = handler
    el.addEventListener('click', handler)
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el._debouncedHandler)
  }
})

// 路由切换时滚动到页面顶部
router.afterEach(() => {
  nextTick(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))
})
app.mount('#app')

