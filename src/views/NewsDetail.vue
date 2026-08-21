<template>
  <div class="news-detail-page">
    <section class="detail-hero">
      <div class="page-hero-bg"></div>
      <div class="detail-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>NEWS</h1>
        <h2>新闻详情</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <router-link to="/news">新闻中心</router-link> &gt;
        <span>新闻详情</span>
      </div>
    </section>

    <main class="article-section">
      <div class="article-container">
        <div v-if="loading" class="article-status" aria-live="polite">
          <span class="loading-spinner"></span>
          <p>正在加载文章...</p>
        </div>

        <div v-else-if="errorMessage" class="article-status article-error">
          <h2>文章暂时无法查看</h2>
          <p>{{ errorMessage }}</p>
          <div class="status-actions">
            <button type="button" @click="loadArticle">重新加载</button>
            <router-link to="/news">返回新闻列表</router-link>
          </div>
        </div>

        <article v-else class="article-card">
          <header class="article-header">
            <h2>{{ article.title }}</h2>
            <div class="article-meta">
              <span v-if="article.publishTime">{{ formatDate(article.publishTime) }}</span>
              <span v-if="article.author">{{ article.author }}</span>
              <span v-if="article.typeName" class="type-badge">{{ article.typeName }}</span>
            </div>
            <p v-if="article.digest" class="article-digest">{{ article.digest }}</p>
          </header>

          <img
            v-if="article.cover"
            class="article-cover"
            :src="article.cover"
            :alt="article.title"
            referrerpolicy="no-referrer"
          >

          <div class="article-content" v-html="safeContent"></div>

          <footer class="article-footer">
            <router-link class="back-link" to="/news">← 返回新闻列表</router-link>
            <a
              v-if="article.link"
              class="original-link"
              :href="article.link"
              target="_blank"
              rel="noopener noreferrer"
            >查看原文</a>
          </footer>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import request from '../utils/request'
import { sanitizeArticleHtml } from '../utils/articleHtml'

const route = useRoute()
const article = ref({})
const loading = ref(true)
const errorMessage = ref('')

const safeContent = computed(() => sanitizeArticleHtml(article.value.content))

async function loadArticle() {
  loading.value = true
  errorMessage.value = ''

  try {
    const data = await request.get(`/api/articles/${route.params.id}`)
    if (!data?.success || !data?.article) {
      throw new Error(data?.message || '未获取到文章内容')
    }

    article.value = data.article
    document.title = `${data.article.title} - 新闻中心`
  } catch (error) {
    article.value = {}
    errorMessage.value = error?.message || '请稍后重试或返回新闻列表'
  } finally {
    loading.value = false
  }
}

function formatDate(time) {
  if (!time) return ''
  const date = new Date(String(time).replace(/-/g, '/'))
  if (Number.isNaN(date.getTime())) return time

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

onMounted(loadArticle)
watch(() => route.params.id, (id, previousId) => {
  if (id && id !== previousId) loadArticle()
})
</script>

<style scoped>
.detail-hero {
  min-height: 320px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  color: #fff;
  text-align: center;
  background: var(--brand-gradient);
}

.detail-hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(78, 132, 230, 0.35), transparent 36%),
    linear-gradient(135deg, rgba(10, 30, 80, 0.35), rgba(26, 60, 124, 0.12));
}

.detail-hero-content {
  position: relative;
  z-index: 1;
  max-width: 920px;
}

.detail-hero-label {
  margin-bottom: 14px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 5px;
  opacity: 0.72;
}

.detail-hero-content h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.35;
  letter-spacing: 1px;
}
.page-hero-content { position: relative; z-index: 1; }
.page-hero-content h1 { font-size: 42px; font-weight: 700; letter-spacing: 3px; margin-bottom: 8px; }
.page-hero-content h2 { font-size: 26px; font-weight: 400; opacity: 0.9; }

.page-breadcrumb {
  position: absolute;
  right: max(24px, calc(50% - 600px));
  bottom: 20px;
  z-index: 1;
  max-width: calc(100% - 48px);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.72);
}

.page-breadcrumb a:hover { color: #fff; }
.page-breadcrumb span { opacity: 0.9; }

.article-section {
  min-height: 500px;
  padding: 64px 24px 88px;
  background: var(--bg-light);
}

.article-container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.article-card {
  padding: 54px clamp(24px, 6vw, 72px) 40px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--white);
  box-shadow: 0 16px 40px rgba(26, 60, 124, 0.08);
}

.article-header {
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}

.article-header h2 {
  margin: 0 0 18px;
  color: var(--text-primary);
  font-size: clamp(25px, 3.5vw, 36px);
  line-height: 1.45;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 22px;
  color: var(--text-muted);
  font-size: 13px;
}

.type-badge {
  padding: 2px 9px;
  border-radius: 3px;
  color: var(--brand-primary);
  background: #e8f0fe;
}

.article-digest {
  margin: 24px 0 0;
  padding: 18px 22px;
  border-left: 3px solid var(--brand-light);
  color: var(--text-secondary);
  line-height: 1.9;
  text-align: left;
  background: #f7f9fd;
}

.article-cover {
  width: 100%;
  max-height: 520px;
  margin: 36px 0;
  border-radius: 8px;
  object-fit: cover;
}

.article-content {
  color: #444;
  font-size: 16px;
  line-height: 2;
  overflow-wrap: anywhere;
}

.article-content:deep(p) { margin: 1.15em 0; }
.article-content:deep(h1),
.article-content:deep(h2),
.article-content:deep(h3),
.article-content:deep(h4) {
  margin: 1.8em 0 0.7em;
  color: var(--text-primary);
  line-height: 1.5;
}
.article-content:deep(img) {
  width: auto;
  max-width: 100% !important;
  height: auto !important;
  margin: 24px auto;
  border-radius: 4px;
}
.article-content:deep(a) { color: var(--brand-light); text-decoration: underline; }
.article-content:deep(blockquote) {
  margin: 24px 0;
  padding: 14px 20px;
  border-left: 4px solid #c9d7f2;
  color: var(--text-secondary);
  background: #f7f9fd;
}
.article-content:deep(table) {
  display: block;
  max-width: 100%;
  margin: 24px 0;
  border-collapse: collapse;
  overflow-x: auto;
}
.article-content:deep(td),
.article-content:deep(th) { padding: 8px 12px; border: 1px solid #ddd; }
.article-content:deep(video) { max-width: 100%; }

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.back-link { color: var(--text-secondary); }
.back-link:hover { color: var(--brand-primary); }
.original-link,
.status-actions button,
.status-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 22px;
  border: 1px solid var(--brand-primary);
  border-radius: 6px;
  color: #fff;
  font: inherit;
  cursor: pointer;
  background: var(--brand-primary);
}
.original-link:hover,
.status-actions button:hover,
.status-actions a:hover { background: var(--brand-light); border-color: var(--brand-light); }

.article-status {
  display: flex;
  min-height: 360px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px 24px;
  border-radius: 12px;
  color: var(--text-secondary);
  text-align: center;
  background: var(--white);
}

.loading-spinner {
  width: 38px;
  height: 38px;
  border: 3px solid #dce5f6;
  border-top-color: var(--brand-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.article-error h2 { color: var(--text-primary); }
.status-actions { display: flex; gap: 12px; margin-top: 8px; }
.status-actions a { color: var(--brand-primary); background: #fff; }

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
  .detail-hero { min-height: 260px; padding-top: 70px; }
  .page-breadcrumb { right: auto; left: 20px; }
  .article-section { padding: 32px 12px 56px; }
  .article-card { padding: 34px 20px 28px; border-radius: 8px; }
  .article-content { font-size: 15px; line-height: 1.9; }
  .article-footer { align-items: stretch; flex-direction: column; }
  .original-link { width: 100%; }
}

@media (max-width: 480px) {
  .detail-hero { min-height: 220px; }
  .article-meta { flex-direction: column; gap: 5px; }
  .article-digest { padding: 14px 16px; }
  .status-actions { width: 100%; flex-direction: column; }
}
</style>
