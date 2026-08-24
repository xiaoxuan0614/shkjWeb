import { nextTick } from 'vue'
import 'element-plus/es/components/base/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/col/style/css'
import 'element-plus/es/components/drawer/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/menu-item/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/row/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/sub-menu/style/css'
import { createShouhuiApp } from './app'

const { app, router } = createShouhuiApp({ initialPath: window.location.pathname })

// 路由切换时滚动到页面顶部
router.afterEach(() => {
  nextTick(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))
})

router.isReady().then(() => app.mount('#app'))
