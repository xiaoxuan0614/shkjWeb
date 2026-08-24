const HTTPS_HOSTS = new Set([
  'mp.weixin.qq.com',
  'mmbiz.qpic.cn',
  'mmbiz.qlogo.cn',
  'mmecoa.qpic.cn',
])

export function normalizeArticleUrl(value = '') {
  const url = String(value || '').trim()
  if (!url.startsWith('http://')) return url
  try {
    const parsed = new URL(url)
    if (HTTPS_HOSTS.has(parsed.hostname)) parsed.protocol = 'https:'
    return parsed.toString()
  } catch {
    return url
  }
}

export function normalizeArticleHtmlUrls(html = '') {
  return String(html).replace(
    /http:\/\/(mp\.weixin\.qq\.com|mmbiz\.qpic\.cn|mmbiz\.qlogo\.cn|mmecoa\.qpic\.cn)/gi,
    'https://$1',
  )
}
