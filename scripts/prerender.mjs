import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

// Never allow a parent shell setting to disable TLS certificate verification for SEO API reads.
delete process.env.NODE_TLS_REJECT_UNAUTHORIZED

const projectRoot = process.cwd()
const distDir = join(projectRoot, 'dist')
const serverDir = join(projectRoot, '.seo-dist')
const apiBase = (process.env.SEO_API_BASE_URL || 'https://www.shouhuikeji.com').replace(/\/$/, '')
const allowNewsFailure = process.env.SEO_ALLOW_NEWS_FAILURE === '1'

function xmlEscape(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/-->/g, '--\\>')
}

async function fetchJson(path) {
  const response = await fetch(`${apiBase}${path}`, { headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}`)
  const data = await response.json()
  if (data?.success === false || (data?.code && data.code !== 200)) {
    throw new Error(data?.message || `${path} returned business code ${data?.code}`)
  }
  return data
}

async function fetchPublishedArticles() {
  const first = await fetchJson('/api/articles?page=0&size=100&sort=publishTime&direction=desc')
  if (!Array.isArray(first.articles)) throw new Error('Article list response has no articles array')
  const articles = [...first.articles]
  const pages = Number(first.pages || 1)
  for (let page = 1; page < pages; page += 1) {
    const data = await fetchJson(`/api/articles?page=${page}&size=100&sort=publishTime&direction=desc`)
    if (!Array.isArray(data.articles)) throw new Error(`Article page ${page} has no articles array`)
    articles.push(...data.articles)
  }
  return articles.filter((article) => article?.id && article?.title)
}

function injectHtml(template, { appHtml, headHtml }, pageData = {}) {
  const withoutDefaultHead = template
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name=["']description["'][^>]*>/i, '')
  return withoutDefaultHead
    .replace('</head>', `  ${headHtml}\n  </head>`)
    .replace('<!--app-html-->', appHtml)
    .replace('</body>', `  <script>window.__SEO_PAGE_DATA__=${safeJson(pageData)}</script>\n</body>`)
}

async function writeRoute(route, html) {
  if (route === '/') {
    await writeFile(join(distDir, 'index.html'), html)
    return
  }
  const output = join(distDir, route.slice(1), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
}

async function main() {
  const serverEntry = join(serverDir, 'entry-server.mjs')
  const { render, getStaticRoutes } = await import(`${pathToFileURL(serverEntry).href}?t=${Date.now()}`)
  const template = await readFile(join(distDir, 'index.html'), 'utf8')

  let articles = []
  try {
    articles = await fetchPublishedArticles()
  } catch (error) {
    if (!allowNewsFailure) throw new Error(`News prerender failed: ${error.message}`)
    console.warn(`News prerender skipped: ${error.message}`)
  }

  const routes = [...new Set([
    ...getStaticRoutes(),
    ...articles.map((article) => `/news/${article.id}`),
  ])]

  for (const route of routes) {
    const rendered = await render(route)
    await writeRoute(route, injectHtml(template, rendered, rendered.pageData))
  }

  const notFound = await render('/404')
  await writeFile(join(distDir, '404.html'), injectHtml(template, notFound))

  const lastModifiedByRoute = new Map(
    articles.map((article) => [`/news/${article.id}`, article.updatedAt || article.updateTime || article.publishTime]),
  )
  const sitemapItems = routes.map((route) => {
    const lastModified = lastModifiedByRoute.get(route)
    const lastmod = lastModified ? `\n    <lastmod>${xmlEscape(String(lastModified).slice(0, 10))}</lastmod>` : ''
    return `  <url>\n    <loc>https://www.shouhuikeji.com${route}</loc>${lastmod}\n  </url>`
  }).join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapItems}\n</urlset>\n`
  await writeFile(join(distDir, 'sitemap.xml'), sitemap)

  await rm(serverDir, { recursive: true, force: true })
  console.log(`Prerendered ${routes.length} indexable routes (${articles.length} news articles).`)
}

main().catch(async (error) => {
  await rm(serverDir, { recursive: true, force: true })
  console.error(error)
  process.exitCode = 1
})
