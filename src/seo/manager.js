import { inject } from 'vue'
import { resolveSeo, SITE_NAME, SITE_URL } from './site'

export const SEO_MANAGER_KEY = Symbol.for('shouhui-seo-manager')

function absoluteImage(image) {
  if (!image) return `${SITE_URL}/images/logo/logo.jpg`
  return /^https?:\/\//.test(image) ? image : `${SITE_URL}${image}`
}

export function createSeoManager(initialPath = '/') {
  let current = resolveSeo(initialPath)

  function set(seo) {
    current = { ...current, ...seo }
    if (typeof document !== 'undefined') applyToDocument(current)
  }

  function setRoute(path, article) {
    current = resolveSeo(path, article)
    if (typeof document !== 'undefined') applyToDocument(current)
  }

  return {
    get current() { return current },
    set,
    setRoute,
  }
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.dataset.seo = 'true'
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export function applyToDocument(seo) {
  document.title = seo.title
  setMeta('meta[name="description"]', { name: 'description', content: seo.description })
  setMeta('meta[name="robots"]', { name: 'robots', content: seo.robots || 'index,follow' })
  setMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title })
  setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
  setMeta('meta[property="og:type"]', { property: 'og:type', content: seo.path?.startsWith('/news/') ? 'article' : 'website' })
  setMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical })
  setMeta('meta[property="og:image"]', { property: 'og:image', content: absoluteImage(seo.image) })
  setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    canonical.dataset.seo = 'true'
    document.head.appendChild(canonical)
  }
  canonical.href = seo.canonical

  document.head.querySelectorAll('script[data-seo-jsonld]').forEach((node) => node.remove())
  const jsonLd = Array.isArray(seo.jsonLd) ? seo.jsonLd : seo.jsonLd ? [seo.jsonLd] : []
  jsonLd.forEach((data) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seoJsonld = 'true'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  })
}

export function renderHead(seo) {
  const escape = (value) => String(value || '')
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const image = absoluteImage(seo.image)
  const jsonLd = (Array.isArray(seo.jsonLd) ? seo.jsonLd : seo.jsonLd ? [seo.jsonLd] : [])
    .map((data) => `<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ')

  return `<title>${escape(seo.title || SITE_NAME)}</title>
    <meta name="description" content="${escape(seo.description)}" data-seo>
    <meta name="robots" content="${escape(seo.robots || 'index,follow')}" data-seo>
    <link rel="canonical" href="${escape(seo.canonical)}" data-seo>
    <meta property="og:title" content="${escape(seo.title)}" data-seo>
    <meta property="og:description" content="${escape(seo.description)}" data-seo>
    <meta property="og:type" content="${seo.path?.startsWith('/news/') ? 'article' : 'website'}" data-seo>
    <meta property="og:url" content="${escape(seo.canonical)}" data-seo>
    <meta property="og:image" content="${escape(image)}" data-seo>
    <meta name="twitter:card" content="summary_large_image" data-seo>
    ${jsonLd}`
}

export function useSeoManager() {
  return inject(SEO_MANAGER_KEY)
}
