import { normalizeArticleHtmlUrls } from './articleUrl'

const BLOCKED_TAGS = [
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'link',
  'meta',
  'base',
  'form',
  'input',
  'button',
]

function isSafeUrl(value) {
  const normalized = Array.from(value.trim())
    .filter((character) => character.charCodeAt(0) > 32)
    .join('')
    .toLowerCase()
  return !['javascript:', 'vbscript:', 'data:'].some((protocol) => normalized.startsWith(protocol))
}

export function sanitizeArticleHtml(html = '') {
  if (!html) return ''
  html = normalizeArticleHtmlUrls(html)
  if (typeof DOMParser === 'undefined') {
    const blocked = BLOCKED_TAGS.join('|')
    return String(html)
      .replace(new RegExp(`<(${blocked})\\b[^>]*>[\\s\\S]*?<\\/\\1\\s*>`, 'gi'), '')
      .replace(new RegExp(`<(${blocked})\\b[^>]*\\/?>`, 'gi'), '')
      .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/\s(href|src|poster|xlink:href)\s*=\s*(["'])\s*(javascript:|vbscript:|data:)[\s\S]*?\2/gi, '')
  }

  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll(BLOCKED_TAGS.join(',')).forEach((element) => element.remove())

  document.body.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach(({ name, value }) => {
      const attributeName = name.toLowerCase()

      if (attributeName.startsWith('on')) {
        element.removeAttribute(name)
        return
      }

      if (attributeName === 'style' && /(expression\s*\(|javascript:|vbscript:)/i.test(value)) {
        element.removeAttribute(name)
        return
      }

      if (['href', 'src', 'poster', 'xlink:href'].includes(attributeName) && !isSafeUrl(value)) {
        element.removeAttribute(name)
      }
    })

    if (element.tagName === 'IMG') {
      const lazySource = element.getAttribute('data-src')
      if (!element.getAttribute('src') && lazySource && isSafeUrl(lazySource)) {
        element.setAttribute('src', lazySource)
      }
      element.setAttribute('loading', 'lazy')
      element.setAttribute('referrerpolicy', 'no-referrer')
    }

    if (element.tagName === 'A') {
      element.setAttribute('target', '_blank')
      element.setAttribute('rel', 'noopener noreferrer')
    }
  })

  return document.body.innerHTML
}
