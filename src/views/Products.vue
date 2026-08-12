<template>
  <div>
    <!-- Hero Banner -->
    <section class="product-hero">
      <div class="product-hero-bg"></div>
      <div class="product-hero-content">
        <h1>PRODUCTS</h1>
        <h2>产品清单</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt; 产品清单
      </div>
    </section>

    <!-- 产品卡片列表 -->
    <section class="product-list-section">
      <div class="container">
        <div class="product-grid">
          <div
            v-for="(category, index) in categories"
            :key="category.id"
            class="product-category-card"
            @click="goToCategory(category)"
          >
            <div class="product-category-icon">
              <svg v-if="category.id === 'vehicle-pc'" viewBox="0 0 64 64" width="64" height="64">
                <rect x="6" y="14" width="52" height="32" rx="3" fill="#1a3c7c"/>
                <rect x="10" y="18" width="44" height="24" rx="1" fill="#fff" opacity="0.9"/>
                <rect x="24" y="46" width="16" height="4" rx="1" fill="#1a3c7c"/>
                <circle cx="32" cy="30" r="4" fill="#1a3c7c" opacity="0.3"/>
                <line x1="16" y1="24" x2="22" y2="24" stroke="#1a3c7c" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="16" y1="28" x2="20" y2="28" stroke="#1a3c7c" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="42" y1="24" x2="48" y2="24" stroke="#1a3c7c" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="42" y1="28" x2="48" y2="28" stroke="#1a3c7c" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <svg v-else-if="category.id === 'mobile-computer'" viewBox="0 0 64 64" width="64" height="64">
                <rect x="20" y="6" width="24" height="48" rx="4" fill="#1a3c7c"/>
                <rect x="24" y="12" width="16" height="22" rx="1" fill="#fff" opacity="0.9"/>
                <rect x="26" y="38" width="12" height="10" rx="1" fill="#fff" opacity="0.5"/>
                <circle cx="32" cy="43" r="2" fill="#1a3c7c"/>
                <rect x="28" y="50" width="8" height="4" rx="1" fill="#1a3c7c" opacity="0.6"/>
                <line x1="28" y1="18" x2="36" y2="18" stroke="#1a3c7c" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="28" y1="22" x2="34" y2="22" stroke="#1a3c7c" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <svg v-else viewBox="0 0 64 64" width="64" height="64">
                <rect x="8" y="20" width="48" height="30" rx="3" fill="#1a3c7c"/>
                <rect x="14" y="12" width="36" height="10" rx="2" fill="#1a3c7c" opacity="0.7"/>
                <rect x="16" y="26" width="32" height="14" rx="1" fill="#fff" opacity="0.9"/>
                <rect x="18" y="28" width="28" height="10" rx="1" fill="#f5f7fb"/>
                <line x1="22" y1="32" x2="42" y2="32" stroke="#1a3c7c" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
                <line x1="22" y1="35" x2="38" y2="35" stroke="#1a3c7c" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
                <circle cx="50" cy="25" r="2" fill="#fff" opacity="0.6"/>
                <rect x="12" y="52" width="40" height="4" rx="1" fill="#1a3c7c" opacity="0.4"/>
              </svg>
            </div>
            <h3>{{ category.name }}</h3>
            <p class="product-category-desc">{{category.desc}}</p>
            <router-link
              v-if="category.products.length > 0"
              :to="'/products/' + category.products[0]"
              class="product-category-link"
            >
              了解详情 →
            </router-link>
            <span v-else class="product-category-link disabled">敬请期待</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门产品 -->
    <section class="hot-products-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">HOT PRODUCTS</div>
          <h3 class="section-title">热门产品</h3>
        </div>
        <div class="hot-product-grid">
          <div
            v-for="(product, index) in hotProducts"
            :key="index"
            class="hot-product-card"
            @click="goToDetail(product.id)"
          >
            <div class="hot-product-img">
              <img v-img-oss :src="product.image" :alt="product.name" onerror="this.style.background='linear-gradient(135deg,#e8f0fe,#d0e2ff)';this.style.minHeight='200px'">
            </div>
            <div class="hot-product-info">
              <h4>{{ product.name }}</h4>
              <p>{{ product.subtitle }}</p>
              <span class="product-link">了解详情 →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { productData } from '../data/products-data'

const router = useRouter()
const categories = computed(() => productData.categories)
const hotProducts = computed(() => Object.values(productData.details).slice(0, 4))

function goToDetail(id) {
  router.push(`/products/${id}`)
}

function goToCategory(category) {
  if (category.products.length > 0) {
    router.push(`/products/${category.products[0]}`)
  }
}
</script>

<style scoped>
/* ---- Hero ---- */
.product-hero {
  height: 360px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  background: var(--brand-gradient);
  overflow: hidden;
}

.product-hero-bg {
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 360"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%230a1e50"/><stop offset="50%" style="stop-color:%231a3c7c"/><stop offset="100%" style="stop-color:%232d5bbf"/></linearGradient></defs><rect fill="url(%23g)" width="1920" height="360"/><text x="960" y="160" text-anchor="middle" font-family="Arial" font-size="70" font-weight="700" fill="rgba(255,255,255,0.06)" letter-spacing="6">PRODUCTS</text></svg>') center/cover no-repeat;
}

.product-hero-content {
  position: relative;
  z-index: 1;
}

.product-hero-content h1 {
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 4px;
  margin-bottom: 8px;
}

.product-hero-content h2 {
  font-size: 26px;
  font-weight: 400;
  opacity: 0.9;
  letter-spacing: 2px;
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

/* ---- 产品分类卡片 ---- */
.product-list-section {
  padding: 60px 0 40px;
  background: var(--white);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.product-category-card {
  background: var(--bg-light);
  border-radius: 16px;
  padding: 40px 32px;
  text-align: center;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.product-category-card:hover {
  background: var(--white);
  border-color: var(--brand-primary);
  box-shadow: 0 8px 30px rgba(26, 60, 124, 0.1);
  transform: translateY(-4px);
}

.product-category-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
}

.product-category-card h3 {
  font-size: 22px;
  color: var(--brand-primary);
  font-weight: 700;
  margin-bottom: 8px;
}

.product-category-desc {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 20px;
}

.product-category-link {
  display: inline-block;
  font-size: 15px;
  color: var(--brand-primary);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
}

.product-category-link:hover {
  color: var(--brand-light);
}

.product-category-link.disabled {
  color: #ccc;
  cursor: default;
}

/* ---- 热门产品 ---- */
.hot-products-section {
  padding: 40px 0 80px;
  background: var(--bg-light);
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-label {
  font-size: 11px;
  color: var(--brand-primary);
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 8px;
}

.section-title {
  font-size: 26px;
  color: var(--brand-primary);
  font-weight: 700;
}

.hot-product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.hot-product-card {
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.hot-product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(26, 60, 124, 0.12);
}

.hot-product-img {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #e8f0fe, #d0e2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hot-product-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
}

.hot-product-info {
  padding: 20px;
  /* 新增：弹性纵向布局 + 固定高度 */
  display: flex;
  flex-direction: column;
  height: 150px; /* 根据视觉微调这个高度，统一所有卡片信息区高度 */
}

.hot-product-info h4 {
  font-size: 16px;
  color: var(--brand-primary);
  font-weight: 600;
  margin-bottom: 6px;
}

.hot-product-info p {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
  /* 删除原来的margin-bottom:12px; */
  margin-bottom: auto; /* 关键！自动撑开，把链接压到底部 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-link {
  font-size: 14px;
  color: var(--brand-primary);
  font-weight: 500;
  transition: color 0.3s;
  margin-top: 12px; /* 文字和链接之间间距 */
}

.hot-product-card:hover .product-link {
  color: var(--brand-light);
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .hot-product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  .hot-product-grid {
    grid-template-columns: 1fr;
  }
  .product-hero {
    height: 260px;
  }
  .product-hero-content h1 {
    font-size: 28px;
    letter-spacing: 2px;
  }
  .product-hero-content h2 {
    font-size: 18px;
  }
  .page-breadcrumb {
    right: auto;
    left: 16px;
    bottom: 16px;
  }
}

@media (max-width: 480px) {
  .product-hero {
    height: 200px;
  }
  .product-hero-content h1 {
    font-size: 22px;
    letter-spacing: 1px;
  }
  .product-hero-content h2 {
    font-size: 15px;
  }
  .product-category-card {
    padding: 24px 20px;
  }
  .product-category-icon {
    width: 60px;
    height: 60px;
  }
  .product-category-card h3 {
    font-size: 18px;
  }
  .hot-products-section {
    padding: 30px 0 40px;
  }
}
</style>
