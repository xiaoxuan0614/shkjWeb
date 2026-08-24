import { createApp as createClientApp, createSSRApp } from 'vue'
import {
  ElButton,
  ElCol,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElRow,
  ElSelect,
  ElSubMenu,
  ID_INJECTION_KEY,
  ZINDEX_INJECTION_KEY,
} from 'element-plus'
import App from './App.vue'
import { createAppRouter } from './router'
import { debounce } from './utils/debounce'
import { getOssImg } from './utils/imgUrl'
import imgOss from './directives/imgOss.js'
import { createSeoManager, SEO_MANAGER_KEY } from './seo/manager'
import { PAGE_DATA_KEY } from './seo/pageData'

export function createShouhuiApp({ ssr = false, initialPath = '/' } = {}) {
  const app = ssr ? createSSRApp(App) : createClientApp(App)
  const router = createAppRouter(ssr)
  const seoManager = createSeoManager(initialPath)
  const pageData = {}

  app.config.globalProperties.$ossImg = getOssImg
  app.use(router)
  const elementComponents = [
    ElButton, ElCol, ElDrawer, ElForm, ElFormItem, ElInput,
    ElMenu, ElMenuItem, ElOption, ElRow, ElSelect, ElSubMenu,
  ]
  elementComponents.forEach((component) => app.component(component.name, component))
  app.use(imgOss)
  app.provide(SEO_MANAGER_KEY, seoManager)
  app.provide(PAGE_DATA_KEY, pageData)
  if (ssr) {
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  }

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
    },
  })

  router.afterEach((to) => {
    seoManager.setRoute(to.path)
    if (!ssr && window._hmt) window._hmt.push(['_trackPageview', to.fullPath])
  })

  return { app, router, seoManager, pageData }
}
