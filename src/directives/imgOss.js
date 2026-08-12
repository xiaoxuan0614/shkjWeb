const OSS_PREFIX = 'https://sh-website.obs.cn-north-4.myhuaweicloud.com/'

export default {
  install(app) {
    app.directive('img-oss', {
      mounted(el) {
        // 先保存原始路径
        const originSrc = el.getAttribute('src')
        // 清空src，阻止浏览器自动发起请求
        el.src = ''
        transformSrc(el, originSrc)
      },
      updated(el) {
        const originSrc = el.getAttribute('src')
        el.src = ''
        transformSrc(el, originSrc)
      }
    })

    function transformSrc(el, rawPath) {
      if (!rawPath) return

      // 本地开发：直接使用原始地址
      if (!import.meta.env.PROD) {
        el.src = rawPath
        return
      }

      if (rawPath.startsWith('http') || rawPath.startsWith('data:')) {
        el.src = rawPath
        return
      }

      const path = rawPath.startsWith('/') ? rawPath : '/' + rawPath
      const ossUrl = OSS_PREFIX + path
      el.src = ossUrl

      // OSS失败，降级回原始服务器地址
      el.onerror = () => {
        el.src = rawPath
      }
    }
  }
}