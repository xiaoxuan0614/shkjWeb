<template>
  <main class="products-page">
    <section class="product-hero page-hero">
      <div class="page-hero-bg" aria-hidden="true"></div>
      <div class="page-hero-overlay" aria-hidden="true"></div>
      <div class="page-hero-content">
        <p class="hero-en">PRODUCTS</p>
        <h1>产品清单</h1>
      </div>
      <nav class="page-breadcrumb" aria-label="面包屑导航">
        <router-link to="/">首页</router-link>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
        <span aria-current="page">产品清单</span>
      </nav>
    </section>

    <section class="catalog-nav-section" aria-labelledby="catalog-heading">
      <div class="container">
        <AboutSectionLead
          english="Product Range"
          title="按设备类型快速选型"
          summary="选择产品类别，查看对应设备型号与核心定位。"
          heading-id="catalog-heading"
        />

        <nav class="category-nav" aria-label="产品分类">
          <a
            v-for="(category, index) in categories"
            :key="category.id"
            :href="`#${category.id}`"
            class="category-nav-item"
          >
            <span class="category-nav-index">0{{ index + 1 }}</span>
            <span class="category-nav-copy">
              <strong>{{ category.name }}</strong>
              <small>{{ category.products.length }} 款产品</small>
            </span>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" /></svg>
          </a>
        </nav>
      </div>
    </section>

    <section class="catalog-section" aria-label="全部产品">
      <div class="container">
        <section
          v-for="(category, categoryIndex) in catalog"
          :id="category.id"
          :key="category.id"
          class="category-section"
        >
          <header class="category-header">
            <div class="category-heading">
              <span class="category-icon" aria-hidden="true">
                <svg v-if="category.id === 'vehicle-pc'" viewBox="0 0 48 48">
                  <rect x="5" y="9" width="38" height="27" rx="3" />
                  <path d="M10 14h28v17H10zM17 41h14M24 36v5" />
                </svg>
                <svg v-else-if="category.id === 'mobile-computer'" viewBox="0 0 48 48">
                  <rect x="14" y="4" width="20" height="40" rx="4" />
                  <path d="M18 10h12v20H18zM21 36h6" />
                </svg>
                <svg v-else viewBox="0 0 48 48">
                  <path d="M10 16V7h28v9M7 16h34a3 3 0 0 1 3 3v18H4V19a3 3 0 0 1 3-3Z" />
                  <path d="M11 25h26v16H11zM36 21h2" />
                </svg>
              </span>
              <div>
                <p>0{{ categoryIndex + 1 }} / CATEGORY</p>
                <h2>{{ category.name }}</h2>
              </div>
            </div>
            <p class="category-description">{{ category.desc }}</p>
          </header>

          <div class="product-grid">
            <router-link
              v-for="product in category.productDetails"
              :key="product.id"
              :to="`/products/${product.id}`"
              class="product-card"
              :aria-label="`查看 ${product.name} 产品详情`"
            >
              <div class="product-image">
                <img
                  v-img-oss
                  :src="product.image"
                  :alt="product.name"
                  width="360"
                  height="240"
                  loading="lazy"
                >
                <!-- <span class="product-category-tag">{{ category.name }}</span> -->
              </div>

              <div class="product-info">
                <div class="product-title-row">
                  <h3>{{ product.name }}</h3>
                </div>
                <p class="product-subtitle">{{ product.subtitle }}</p>
                <ul v-if="product.certifications?.length" class="product-tags" aria-label="产品认证与特性">
                  <li v-for="certification in product.certifications.slice(0, 3)" :key="certification">
                    {{ certification }}
                  </li>
                </ul>
                <div class="product-footer">
                  <span class="detail-link">查看技术参数</span>
                  <span class="product-arrow" aria-hidden="true">
                    <svg viewBox="0 0 20 20"><path d="M4 10h12m-5-5 5 5-5 5" /></svg>
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import AboutSectionLead from '../components/AboutSectionLead.vue'
import { productData } from '../data/products-data'

const categories = computed(() => productData.categories)
const catalog = computed(() => productData.categories.map(category => ({
  ...category,
  productDetails: category.products.map(productId => productData.details[productId]),
})))
</script>

<style scoped>
.products-page {
  --catalog-ink: #10213f;
  --catalog-muted: #5d6b80;
  --catalog-line: #dce3ee;
  --catalog-surface: #f4f7fb;
  --catalog-accent: #2d67d1;
  color: var(--catalog-ink);
  background: #fff;
}

.product-hero {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: #fff;
}

.page-hero-bg,
.page-hero-overlay {
  position: absolute;
  inset: 0;
}

.page-hero-content {
  position: relative;
  z-index: 1;
}

.page-breadcrumb {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  min-height: 32px;
  text-align: right;
  color: rgba(255, 255, 255, 0.84);
  font-size: 13px;
}

.page-breadcrumb a { color: rgba(255, 255, 255, 0.92); }
.page-breadcrumb a:hover { color: #fff; }
.page-breadcrumb span { color: rgba(255, 255, 255, 0.84); }
.page-breadcrumb svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

.catalog-nav-section {
  padding: 72px 0 80px;
  background: #fff;
}

.category-nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--catalog-line);
  border-bottom: 1px solid var(--catalog-line);
  border-right: 1px solid var(--catalog-line);
  border-left: 1px solid var(--catalog-line);
  border-radius: 12px;
  overflow: hidden;
}

.category-nav-item {
  display: flex;
  align-items: center;
  min-height: 104px;
  gap: 18px;
  padding: 20px 28px;
  color: var(--catalog-ink);
  border-right: 1px solid var(--catalog-line);
  transition: color 180ms ease, background-color 180ms ease;
  touch-action: manipulation;
}

.category-nav-item:last-child { border-right: 0; }
.category-nav-item:hover {
  color: var(--catalog-accent);
  background: var(--catalog-surface);
}

.category-nav-index {
  color: #8190a8;
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.category-nav-copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.category-nav-copy strong { font-size: 17px; }
.category-nav-copy small {
  color: var(--catalog-muted);
  font-size: 13px;
}

.category-nav-item > svg,
.product-arrow svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.catalog-section {
  padding: 16px 0 96px;
  background: var(--catalog-surface);
}

.category-section {
  padding-top: 80px;
  scroll-margin-top: 96px;
}

.category-section + .category-section {
  margin-top: 16px;
  border-top: 1px solid var(--catalog-line);
}

.category-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 440px);
  align-items: center;
  gap: 48px;
  margin-bottom: 32px;
}

.category-heading {
  display: flex;
  align-items: center;
  gap: 20px;
}

.category-icon {
  display: grid;
  flex: 0 0 64px;
  width: 64px;
  height: 64px;
  place-items: center;
  color: var(--catalog-accent);
  background: #e6eefc;
  border: 1px solid #d5e1f5;
  border-radius: 12px;
}

.category-icon svg {
  width: 36px;
  height: 36px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.category-heading p {
  margin-bottom: 6px;
  color: #74849d;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.category-heading h2 {
  font-size: 28px;
  line-height: 1.25;
}

.category-description {
  color: var(--catalog-muted);
  font-size: 15px;
  line-height: 1.75;
  text-align: right;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.product-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  color: var(--catalog-ink);
  background: #fff;
  border: 1px solid #e0e6ef;
  box-shadow: 0 2px 8px rgba(16, 33, 63, 0.035);
  border-radius: 14px;
  transition: border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;
  touch-action: manipulation;
}

.product-card:hover {
  border-color: #a9bfe4;
  box-shadow: 0 16px 34px rgba(16, 42, 88, 0.1);
  transform: translateY(-4px);
}

.product-image {
  position: relative;
  display: grid;
  min-height: 244px;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(145deg, #fbfcfe, #f3f6fa);
  border-bottom: 1px solid #e7ebf1;
}

.product-image img {
  width: 100%;
  height: 244px;
  padding: 26px;
  object-fit: contain;
  transition: transform 280ms ease;
}

.product-card:hover .product-image img { transform: scale(1.035); }
.product-category-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 9px;
  color: #53647c;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #dfe5ed;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
}

.product-info {
  display: flex;
  flex: 1;
  min-height: 220px;
  flex-direction: column;
  padding: 24px;
}

.product-title-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.product-title-row h3 {
  flex: 1;
  min-width: 0;
  font-size: 20px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.product-arrow {
  display: grid;
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  place-items: center;
  color: var(--catalog-accent);
  border: 0;
  transition: color 180ms ease, transform 180ms ease;
}

.product-card:hover .product-arrow {
  color: var(--brand-light);
  transform: translateX(3px);
}

.product-subtitle {
  margin-top: 12px;
  color: var(--catalog-muted);
  font-size: 14px;
  line-height: 1.7;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 18px;
  padding: 0;
  list-style: none;
}

.product-tags li {
  padding: 4px 7px;
  color: #53647c;
  background: #f1f4f8;
  border: 1px solid #e5e9ef;
  font-size: 10px;
  line-height: 1.4;
  border-radius: 6px;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 22px;
}

.detail-link {
  color: var(--catalog-accent);
  font-size: 13px;
  font-weight: 700;
}

.category-nav-item:focus-visible,
.product-card:focus-visible,
.page-breadcrumb a:focus-visible {
  outline: 3px solid #75a3ff;
  outline-offset: 3px;
}

@media (max-width: 1024px) {
  .category-nav-item { padding: 18px; }
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 768px) {
  .catalog-nav-section { padding: 56px 0 64px; }
  .category-nav { grid-template-columns: 1fr; }
  .category-nav-item {
    min-height: 82px;
    border-right: 0;
    border-bottom: 1px solid var(--catalog-line);
  }
  .category-nav-item:last-child { border-bottom: 0; }
  .catalog-section { padding-bottom: 72px; }
  .category-section { padding-top: 64px; }
  .category-header {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .product-grid { grid-template-columns: 1fr; }
  .product-image,
  .product-image img { height: 260px; }
  .product-info { min-height: 0; }
}

@media (max-width: 480px) {
  .category-heading { align-items: flex-start; }
  .category-icon {
    flex-basis: 52px;
    width: 52px;
    height: 52px;
  }
  .category-icon svg {
    width: 30px;
    height: 30px;
  }
  .category-heading h2 { font-size: 24px; }
  .product-image,
  .product-image img {
    height: 224px;
    min-height: 224px;
  }
  .product-info { padding: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .category-nav-item,
  .product-card,
  .product-image img,
  .product-arrow { transition: none; }
  .product-card:hover,
  .product-card:hover .product-image img { transform: none; }
}
</style>
