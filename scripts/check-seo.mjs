import { readdir, readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const siteUrl = 'https://www.shouhuikeji.com'

async function findIndexFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await findIndexFiles(path))
    else if (entry.name === 'index.html') files.push(path)
  }
  return files
}

function routeFromFile(file) {
  const directory = relative(distDir, file).split(sep).slice(0, -1).join('/')
  return directory ? `/${directory}` : '/'
}

function match(html, expression, label, route) {
  const value = html.match(expression)?.[1]?.trim()
  if (!value) throw new Error(`${route}: missing ${label}`)
  return value
}

async function main() {
  const files = await findIndexFiles(distDir)
  const sitemap = await readFile(join(distDir, 'sitemap.xml'), 'utf8')
  const robots = await readFile(join(distDir, 'robots.txt'), 'utf8')
  const titles = new Map()
  const canonicals = new Set()

  for (const file of files) {
    const route = routeFromFile(file)
    const html = await readFile(file, 'utf8')
    const title = match(html, /<title>([^<]+)<\/title>/i, 'title', route)
    match(html, /<meta\s+name="description"\s+content="([^"]+)"/i, 'description', route)
    const canonical = match(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i, 'canonical', route)
    const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length

    if (h1Count !== 1) throw new Error(`${route}: expected one H1, found ${h1Count}`)
    if (canonical !== `${siteUrl}${route}`) throw new Error(`${route}: canonical mismatch (${canonical})`)
    if (!sitemap.includes(`<loc>${canonical}</loc>`)) throw new Error(`${route}: missing from sitemap`)
    if (titles.has(title)) throw new Error(`${route}: duplicate title also used by ${titles.get(title)}`)
    if (canonicals.has(canonical)) throw new Error(`${route}: duplicate canonical`)
    if (html.includes('<!--app-html-->')) throw new Error(`${route}: prerender placeholder remains`)
    if (route.startsWith('/news/') && html.includes('正在加载文章')) throw new Error(`${route}: news body was not prerendered`)

    titles.set(title, route)
    canonicals.add(canonical)
  }

  const sitemapCount = (sitemap.match(/<url>/g) || []).length
  if (sitemapCount !== files.length) throw new Error(`Sitemap has ${sitemapCount} URLs but ${files.length} pages were rendered`)
  if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) throw new Error('robots.txt has no canonical sitemap declaration')

  const notFound = await readFile(join(distDir, '404.html'), 'utf8')
  if (!notFound.includes('name="robots" content="noindex,follow"')) throw new Error('404 page is not noindex')

  console.log(`SEO check passed for ${files.length} indexable pages.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
