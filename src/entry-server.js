import { renderToString } from '@vue/server-renderer'
import { createShouhuiApp } from './app'
import { renderHead } from './seo/manager'
import { getStaticRoutes } from './seo/site'

export { getStaticRoutes }

export async function render(url) {
  const { app, router, seoManager, pageData } = createShouhuiApp({ ssr: true, initialPath: url })
  await router.push(url)
  await router.isReady()
  const appHtml = await renderToString(app)
  return {
    appHtml,
    headHtml: renderHead(seoManager.current),
    seo: seoManager.current,
    pageData,
  }
}
