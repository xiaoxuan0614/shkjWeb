<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>NEWS</h1>
        <h2>新闻中心</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt; 新闻中心
      </div>
    </section>

    <!-- 新闻列表 -->
    <section class="news-page-layout">
      <div class="container" style="padding-top:40px;padding-bottom:80px;">
        <div class="news-header">
          <h3>资讯列表</h3>
        </div>

        <!-- 新闻卡片列表 -->
        <div class="news-grid">
          <div
            v-for="(article, index) in articles"
            :key="article.id || index"
            class="news-card"
            @click="openArticle(article)"
          >
            <div>
            <!-- <img v-if="latestNews[0].images && latestNews[0].images" :src="latestNews[0].images" :alt="latestNews[0].title" class="news-card-img" onerror="this.style.display='none'"> -->
            <img v-if="article.cover" referrerpolicy="no-referrer" :src="article.cover" :alt="article.title" class="news-card-img" onerror="this.style.display='none'">
          </div>
            <div class="news-card-accent" :class="'accent-' + ((article.id || index) % 4)">
            </div>
            <div class="news-card-body">
              <h4>{{ article.title }}</h4>
              <p>{{ article.digest }}</p>
              <div class="news-card-meta">
                <span class="news-item-date">{{ formatDate(article.publishTime) }}</span>
                <span v-if="article.author" class="source-badge">{{ getArticleTypeName(article, newsTypeList) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="totalPages > 1">
          <div class="pagination-btn pagination-btn--prev" :class="{ 'disabled': currentPage === 0 }" @click="goPage(currentPage)">‹</div>
          <div
            v-for="page in visiblePages"
            :key="page"
            :class="['pagination-btn', { active: currentPage + 1 === page }]"
            @click.stop="goPage(page)"
          >{{ page }}</div>
          <div class="pagination-btn pagination-btn--next" :class="{ 'disabled': currentPage + 1 >= totalPages }" @click="goPage(currentPage + 2)">›</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import request from '../utils/request'

const articles = ref([])
const totalPages = ref(0)
const currentPage = ref(0)
const pageSize = 9
const newsTypeList =
[
  {
    name: '公司新闻',
    type: 0,
    typeName: '公司动态与公告',
  },
  {
    name: '行业资讯',
    type: 1,
    typeName: '标杆项目实践',
  },
  {
    name: '技术文章',
    type: 2,
    typeName: '技术分享与经验',
  },
  {
    name: '媒体报道',
    type: 3,
    typeName: '媒体关注与报道',
  }
]
// 根据 article.typeName 匹配 newsTypeList，优先展示对应 name，匹配不到展示 article.author
const getArticleTypeName = (article, newsTypeList) => {
  // 兜底：数组不存在直接返回author
  if (!newsTypeList || !Array.isArray(newsTypeList)) {
    return article?.author || ''
  }
  const findItem = newsTypeList.find(item => item.typeName === article?.typeName)
  return findItem?.name ?? article?.author
}

async function loadArticles() {
  try {
    const data = await request.get('/api/articles', {
      params: { page: currentPage.value, size: pageSize },
    })
    if (data && Array.isArray(data.articles)) {
      articles.value = data.articles
      totalPages.value = data.pages || Math.ceil((data.total || data.count || data.articles.length) / pageSize)
    } else if (Array.isArray(data)) {
      articles.value = data
      totalPages.value = Math.ceil(data.length / pageSize)
    }
  } catch {
    articles.value = []
    totalPages.value = 0
  }
}

const visiblePages = computed(() => {
  if (totalPages.value <= 1) return []
  const pages = []
  const activePage = currentPage.value + 1
  const rangeStart = Math.max(0, activePage - 1 - 3)
  const rangeEnd = Math.min(totalPages.value - 1, activePage - 1 + 3)
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i + 1)
  }
  return pages
})

function goPage(page) {
  if (page < 1 || page > totalPages.value || totalPages.value === 0) return
  currentPage.value = page - 1
  loadArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function formatDate(time) {
  if (!time) return ''
  const d = new Date(time)
  if (isNaN(d)) return time
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function openArticle(article) {
  if (article.link) {
    const newWindow = window.open(article.link, '_blank')
    if (newWindow) {
      newWindow.opener = null
      newWindow.rel = 'noopener noreferrer'
    }
  }
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
/* ---- Page Hero ---- */
.page-hero {
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  background: var(--brand-gradient);
}

.page-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.75) 0%, rgba(26, 60, 124, 0.6) 100%);
}

.page-hero-content { position: relative; z-index: 1; }
.page-hero-content h1 { font-size: 42px; font-weight: 700; letter-spacing: 3px; margin-bottom: 8px; }
.page-hero-content h2 { font-size: 26px; font-weight: 400; opacity: 0.9; }

.page-breadcrumb {
  position: absolute;
  bottom: 20px;
  right: calc(50% - 600px);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.page-breadcrumb a {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
}

.page-breadcrumb a:hover {
  color: #fff;
}

.news-page-layout { background: var(--white); }

.news-header h3 {
  font-size: 16px;
  color: var(--brand-primary);
  padding-bottom: 12px;
  border-bottom: 2px dashed #ddd;
  margin-bottom: 24px;
}

/* ---- 新闻卡片网格 ---- */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.news-card {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid var(--border-color);
  background: var(--white);
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(26, 60, 124, 0.1);
}

/* 彩色顶栏 */
.news-card-accent {
  height: 6px;
}

.accent-0 { background: linear-gradient(90deg, #1a3c7c, #2d5bbf); }
.accent-1 { background: linear-gradient(90deg, #0f2027, #203a43, #2c5364); }
.accent-2 { background: linear-gradient(90deg, #373b44, #4286f4); }
.accent-3 { background: linear-gradient(90deg, #2193b0, #6dd5ed); }

.news-card-body {
  padding: 20px;
}

.news-card-body h4 {
  color: var(--text-primary);
  margin: 4px 0;
  /* 核心：行高1.3em，固定2行总高度 */
  line-height: 1.3em;
  height: calc(1.3em * 2); /* 2行文字固定高度 */
  /* 多行文字截断 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 最多显示2行 */
  -webkit-box-orient: vertical;
  font-weight: bold;
  unicode-bidi: isolate;
}

.news-card-body p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-item-date {
  font-size: 12px;
  color: #bbb;
}

.source-badge {
  font-size: 11px;
  color: var(--brand-primary);
  background: #e8f0fe;
  padding: 2px 8px;
  border-radius: 3px;
}

/* ---- 分页 ---- */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 40px 0;
}

.pagination-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: var(--white);
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.pagination-btn:hover {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
}

.pagination-btn.active {
  background: var(--brand-primary);
  color: var(--white);
  border-color: var(--brand-primary);
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  .page-breadcrumb {
    right: auto;
    left: 16px;
    bottom: 16px;
  }
  .page-hero-content h1 { font-size: 28px; }
  .page-hero-content h2 { font-size: 18px; }
}

@media (max-width: 480px) {
  .page-hero {
    height: 220px;
  }
  .page-hero-content h1 {
    font-size: 22px;
    letter-spacing: 1px;
  }
  .page-hero-content h2 {
    font-size: 14px;
  }
  .pagination-btn {
    min-width: 36px;
    height: 36px;
    font-size: 13px;
  }
}
</style>
