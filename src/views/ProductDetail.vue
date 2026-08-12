<template>
  <div class="product-detail">
    <!-- Hero Banner -->
    <section class="detail-hero">
      <div class="detail-hero-bg"></div>
      <div class="detail-hero-content">
        <h1>{{ detail.name }}</h1>
        <h2>{{ detail.subtitle }}</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <router-link to="/products">产品清单</router-link> &gt;
        <span>{{ detail.name }}</span>
      </div>
    </section>

    <!-- 左侧导航 + 右侧详情 -->
    <section class="detail-body">
      <div class="container">
        <div class="detail-layout">
          <!-- 左侧产品导航 -->
          <aside class="detail-sidebar">
            <div class="sidebar-title">产品系列</div>
            <nav class="sidebar-nav">
              <router-link
                v-for="cat in categories"
                :key="cat.id"
                :to="'/products/' + cat.products[0]"
                class="sidebar-category"
              >
                <span class="sidebar-cat-name">{{ cat.name }}</span>
                <svg viewBox="0 0 12 8" width="12" height="8">
                  <path d="M1 1l5 5 5-5" stroke="#1a3c7c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                </svg>
              </router-link>
            </nav>

            <!-- 当前分类下的产品列表 -->
            <div class="sidebar-products">
              <div
                v-for="pid in currentCategoryProducts"
                :key="pid"
                :class="['sidebar-product-item', { active: pid === currentProductId }]"
              >
                <router-link :to="'/products/' + pid">
                  {{ productData.details[pid]?.name || pid }}
                </router-link>
              </div>
            </div>
          </aside>

          <!-- 右侧产品内容 -->
          <main class="detail-main">
            <!-- 产品图片 -->
            <div class="product-showcase">
              <div class="showcase-img">
                <img v-img-oss :src="detail.image" :alt="detail.name" onerror="this.style.background='linear-gradient(135deg,#e8f0fe,#d0e2ff)';this.style.minHeight='300px'">
              </div>
            </div>

            <!-- 认证标志 -->
            <div class="certifications" v-if="detail.certifications?.length">
              <div class="cert-label">认证：</div>
              <div class="cert-icons">
                <span v-for="cert in detail.certifications" :key="cert" class="cert-badge">{{ cert }}</span>
              </div>
            </div>

            <!-- 产品规格 -->
            <div class="spec-section">
              <div class="section-label">SPECIFICATIONS</div>
              <h3 class="section-title">产品规格</h3>
              <table class="spec-table">
                <tbody>
                  <tr v-for="(spec, i) in detail.specs" :key="i">
                    <td class="spec-label">{{ spec.label }}</td>
                    <td class="spec-value">{{ spec.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 核心特点 -->
            <div class="features-section">
              <div class="section-label">FEATURES</div>
              <h3 class="section-title">核心特点</h3>
              <div class="feature-list">
                <div v-for="(feature, i) in detail.features" :key="i" class="feature-item">
                  <div class="feature-num">{{ String(i + 1).padStart(2, '0') }}</div>
                  <div class="feature-content">
                    <h4>{{ feature.title }}</h4>
                    <p>{{ feature.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="detail-cta">
      <div class="container">
        <h3>需要了解更多信息？</h3>
        <p>我们的团队将为您提供专业的产品咨询服务</p>
        <router-link to="/contact" class="btn-cta">联系我们</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productData } from '../data/products-data'

const route = useRoute()
const router = useRouter()
const detail = ref({})
const currentProductId = ref('')

const categories = computed(() => productData.categories)

const currentCategoryProducts = computed(() => {
  if (!currentProductId.value) return []
  for (const cat of productData.categories) {
    if (cat.products.includes(currentProductId.value)) {
      return cat.products
    }
  }
  return [currentProductId.value]
})

function loadDetail(id) {
  currentProductId.value = id
  detail.value = productData.details[id] || {}
}

onMounted(() => {
  loadDetail(route.params.id)
})

watch(() => route.params.id, (newId) => {
  loadDetail(newId)
})
</script>

<style scoped>
/* ---- Hero ---- */
.detail-hero {
  height: 360px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  background: linear-gradient(135deg, #0a1e50 0%, #1a3c7c 40%, #2d5bbf 100%);
  overflow: hidden;
}

.detail-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.7), rgba(26, 60, 124, 0.5));
}

.detail-hero-content {
  position: relative;
  z-index: 1;
}

.detail-hero-content h1 {
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 8px;
}

.detail-hero-content h2 {
  font-size: 22px;
  font-weight: 400;
  opacity: 0.9;
}

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

.page-breadcrumb span {
  opacity: 0.9;
}

/* ---- 详情页主体 ---- */
.detail-body {
  padding: 60px 0;
  background: #fff;
}

.detail-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 40px;
}

/* ---- 侧边栏 ---- */
.detail-sidebar {
  position: sticky;
  top: 140px;
  align-self: start;
}

.sidebar-title {
  font-size: 18px;
  color: #1a3c7c;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #1a3c7c;
}

.sidebar-nav {
  margin-bottom: 20px;
}

.sidebar-category {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

.sidebar-category:hover {
  background: #f0f5ff;
  color: #1a3c7c;
}

.sidebar-products {
  border-top: 1px solid #e8ecf1;
  padding-top: 16px;
}

.sidebar-product-item a {
  display: block;
  padding: 10px 12px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
}

.sidebar-product-item a:hover {
  background: #f0f5ff;
  color: #1a3c7c;
}

.sidebar-product-item.active a {
  background: #1a3c7c;
  color: #fff;
  font-weight: 600;
}

/* ---- 主内容区 ---- */
.detail-main {
  min-width: 0;
}

/* 产品展示图 */
.product-showcase {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  text-align: center;
}

.showcase-img {
  max-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.showcase-img img {
  max-width: 100%;
  max-height: 320px;
  object-fit: contain;
}

/* 认证 */
.certifications {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8ecf1;
}

.cert-label {
  font-size: 13px;
  color: #888;
  white-space: nowrap;
}

.cert-icons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.cert-badge {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  color: #555;
  font-weight: 600;
}

/* 技术链接 */
.tech-links {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.tech-links-label {
  font-size: 14px;
  color: #333;
  font-weight: 600;
}

.tech-link {
  font-size: 14px;
  color: #1a3c7c;
  text-decoration: none;
  font-weight: 500;
}

.tech-link:hover {
  text-decoration: underline;
}

.tech-divider {
  color: #ccc;
}

/* Section 通用 */
.section-label {
  font-size: 11px;
  color: #1a3c7c;
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 8px;
}

.section-title {
  font-size: 22px;
  color: #1a3c7c;
  font-weight: 700;
  margin-bottom: 24px;
}

/* 规格表 */
.spec-section {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
}

.spec-table tr:nth-child(even) {
  background: #f9fafb;
}

.spec-table td {
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.6;
}

.spec-label {
  width: 160px;
  font-weight: 600;
  color: #333;
  border-right: 1px solid #eee;
}

.spec-value {
  color: #666;
}

/* 特点列表 */
.features-section {
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feature-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.feature-num {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #1a3c7c, #2d5bbf);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-content h4 {
  font-size: 16px;
  color: #333;
  font-weight: 600;
  margin-bottom: 6px;
}

.feature-content p {
  font-size: 14px;
  color: #888;
  line-height: 1.8;
}

/* ---- CTA ---- */
.detail-cta {
  background: linear-gradient(135deg, #0a1e50, #1a3c7c);
  padding: 60px 0;
  text-align: center;
  color: #fff;
}

.detail-cta h3 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
}

.detail-cta p {
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 24px;
}

.btn-cta {
  display: inline-block;
  padding: 12px 36px;
  background: #fff;
  color: #1a3c7c;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-cta:hover {
  background: #e8f0fe;
  transform: translateY(-2px);
}

/* ---- 响应式 ---- */
@media (max-width: 1024px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
  .detail-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .detail-hero {
    height: 260px;
  }
  .detail-hero-content h1 {
    font-size: 28px;
  }
  .page-breadcrumb {
    right: auto;
    left: 20px;
  }
  .spec-table td {
    padding: 10px 8px;
    font-size: 13px;
  }
  .spec-label {
    width: 100px;
  }
  .product-showcase {
    padding: 20px;
  }
}
</style>
