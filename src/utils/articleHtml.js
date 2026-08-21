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
  if (!html || typeof DOMParser === 'undefined') return ''

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
