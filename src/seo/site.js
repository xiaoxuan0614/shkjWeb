import { solutionData } from '../data/solutions-data'
import { productData } from '../data/products-data'
import { caseData } from '../data/cases-data'
import { normalizeArticleUrl } from '../utils/articleUrl'

export const SITE_URL = 'https://www.shouhuikeji.com'
export const SITE_NAME = '首汇科技'

const staticSeo = {
  '/': {
    title: '智慧堆场与港口数字化解决方案 - 首汇科技',
    description: '首汇科技面向港口、集装箱堆场、仓储与物流企业，提供智能闸口、堆场管理、仓储物料管理、安全监管、工业终端和无线网络覆盖解决方案。',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '首汇科技（天津）有限公司',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/logo.jpg`,
      telephone: '022-66220191',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '京门大道396号',
        addressLocality: '滨海新区',
        addressRegion: '天津市',
        addressCountry: 'CN',
      },
    },
  },
  '/solutions': {
    title: '智慧港口与堆场解决方案 - 首汇科技',
    description: '查看首汇科技智能闸口、数字场站、安全合规监管、工业硬件与无线网络基建解决方案。',
  },
  '/products': {
    title: '工业PDA、条码设备与数传电台产品 - 首汇科技',
    description: '查看首汇科技工业手持PDA、车载终端、工业扫码枪、条码打印机、固定式工业读码器及 GE MDS 数传电台基站产品。',
  },
  '/cases': {
    title: '智慧港口与物流数字化成功案例 - 首汇科技',
    description: '查看首汇科技在智能闸口、数字场站、安全监管、叉车智能作业和无线网络覆盖方面的真实项目案例。',
  },
  '/news': {
    title: '新闻中心与技术文章 - 首汇科技',
    description: '了解首汇科技公司动态、智慧港口项目实践、物流数字化行业资讯与技术文章。',
  },
  '/about': {
    title: '关于首汇科技 - 智慧物流数字化服务商',
    description: '了解首汇科技的企业概况、发展历程、企业理念与智慧物流数字化服务能力。',
  },
  '/about/history': {
    title: '发展历程 - 首汇科技',
    description: '了解首汇科技在智慧港口、堆场与物流数字化领域的发展历程。',
  },
  '/about/philosophy': {
    title: '企业理念 - 首汇科技',
    description: '了解首汇科技的企业使命、价值观与服务理念。',
  },
  '/about/honors': {
    title: '资质荣誉 - 首汇科技',
    description: '查看首汇科技公开展示的企业资质与荣誉。',
  },
  '/contact': {
    title: '联系我们 - 首汇科技',
    description: '联系首汇科技，咨询智慧堆场、智能闸口、仓储物流数字化、工业终端和无线网络覆盖解决方案。',
  },
  '/404': {
    title: '页面未找到 - 首汇科技',
    description: '您访问的页面不存在或已被移动。',
    robots: 'noindex,follow',
  },
}

function cleanDescription(value, maxLength = 150) {
  const text = String(value || '').replace(/\s+/g, ' ').trim()
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text
}

function articleDate(value) {
  if (!value) return undefined
  const text = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(?::\d{2})?$/.test(text)) {
    return `${text.replace(' ', 'T')}+08:00`
  }
  return text
}

function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function normalizePath(path = '/') {
  const pathname = String(path).split(/[?#]/, 1)[0] || '/'
  if (pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

export function canonicalUrl(path) {
  return `${SITE_URL}${normalizePath(path)}`
}

export function resolveSeo(path, article) {
  const normalized = normalizePath(path)
  const base = staticSeo[normalized]
  if (base) return { ...base, canonical: canonicalUrl(normalized), path: normalized }

  const solutionMatch = normalized.match(/^\/solutions\/([^/]+)$/)
  if (solutionMatch) {
    const detail = solutionData[solutionMatch[1]]
    if (!detail) return resolveSeo('/404')
    return {
      title: `${detail.title}解决方案 - 首汇科技`,
      description: cleanDescription(detail.intro),
      canonical: canonicalUrl(normalized),
      path: normalized,
      jsonLd: breadcrumb([
        { name: '首页', path: '/' },
        { name: '解决方案', path: '/solutions' },
        { name: detail.title, path: normalized },
      ]),
    }
  }

  const productMatch = normalized.match(/^\/products\/([^/]+)$/)
  if (productMatch) {
    const detail = productData.details[productMatch[1]]
    if (!detail) return resolveSeo('/404')
    return {
      title: `${detail.name} ${detail.subtitle} - 首汇科技`,
      description: cleanDescription(detail.intro),
      canonical: canonicalUrl(normalized),
      path: normalized,
      image: detail.image,
      jsonLd: [
        breadcrumb([
          { name: '首页', path: '/' },
          { name: '产品清单', path: '/products' },
          { name: detail.name, path: normalized },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: detail.name,
          description: detail.intro,
          image: canonicalUrl(detail.image),
          url: canonicalUrl(normalized),
        },
      ],
    }
  }

  const caseMatch = normalized.match(/^\/cases\/([^/]+)$/)
  if (caseMatch) {
    const detail = caseData.find((item) => item.id === caseMatch[1])
    if (!detail) return resolveSeo('/404')
    return {
      title: `${detail.title} - 首汇科技成功案例`,
      description: cleanDescription(detail.intro),
      canonical: canonicalUrl(normalized),
      path: normalized,
      image: detail.coverImage,
      jsonLd: breadcrumb([
        { name: '首页', path: '/' },
        { name: '成功案例', path: '/cases' },
        { name: detail.title, path: normalized },
      ]),
    }
  }

  const newsMatch = normalized.match(/^\/news\/([^/]+)$/)
  if (newsMatch && article) {
    return {
      title: `${article.title} - 首汇科技`,
      description: cleanDescription(article.digest || article.content),
      canonical: canonicalUrl(normalized),
      path: normalized,
      image: normalizeArticleUrl(article.cover),
      jsonLd: [
        breadcrumb([
          { name: '首页', path: '/' },
          { name: '新闻中心', path: '/news' },
          { name: article.title, path: normalized },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: cleanDescription(article.digest || article.content),
          image: normalizeArticleUrl(article.cover) || undefined,
          datePublished: articleDate(article.publishTime),
          dateModified: articleDate(article.updateTime || article.updatedAt || article.publishTime),
          author: { '@type': 'Organization', name: article.author || SITE_NAME },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo/logo.jpg` },
          },
          mainEntityOfPage: canonicalUrl(normalized),
        },
      ],
    }
  }

  if (newsMatch) {
    return {
      title: '新闻详情 - 首汇科技',
      description: '首汇科技新闻、项目实践与技术文章。',
      canonical: canonicalUrl(normalized),
      path: normalized,
    }
  }

  return resolveSeo('/404')
}

export function getStaticRoutes() {
  return [
    ...Object.keys(staticSeo).filter((path) => path !== '/404'),
    ...Object.keys(solutionData).map((id) => `/solutions/${id}`),
    ...Object.keys(productData.details).map((id) => `/products/${id}`),
    ...caseData.map((item) => `/cases/${item.id}`),
  ]
}
