<template>
  <div class="product-detail">
    <section class="product-hero">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="container hero-container">
        <nav class="page-breadcrumb" aria-label="面包屑导航">
          <router-link to="/">首页</router-link>
          <span>/</span>
          <router-link to="/products">产品清单</router-link>
          <span>/</span>
          <span aria-current="page">{{ detail.name }}</span>
        </nav>

        <div class="hero-content">
          <div class="hero-copy">
            <div class="product-kicker">
              <span class="kicker-line"></span>
              {{ currentCategory?.name || '工业智能终端' }}
            </div>
            <h1>{{ detail.name }}</h1>
            <p class="hero-subtitle">{{ detail.subtitle }}</p>
            <p v-if="detail.intro" class="hero-intro">{{ detail.intro }}</p>

            <div class="hero-actions">
              <router-link to="/contact" class="primary-action">
                获取产品咨询
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </router-link>
              <a href="#specifications" class="secondary-action">查看技术规格</a>
            </div>
          </div>

          <div class="hero-product" :class="{ 'hero-product--portrait': isPortraitProduct }">
            <div class="product-visual-label">PRODUCT / {{ String(currentProductIndex + 1).padStart(2, '0') }}</div>
            <img
              v-img-oss
              :src="detail.image"
              :alt="detail.name"
              width="720"
              height="520"
              fetchpriority="high"
            >
            <div class="visual-corner visual-corner--top"></div>
            <div class="visual-corner visual-corner--bottom"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="detail-body">
      <div class="container detail-layout">
        <aside class="detail-sidebar">
          <div class="sidebar-heading">
            <div class="sidebar-heading-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 5h16v5H4zM4 14h7v5H4zM15 14h5v5h-5z" fill="none" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
            <div>
              <h2>产品系列</h2>
              <p>按设备类别快速浏览</p>
            </div>
          </div>

          <nav class="product-navigation" aria-label="产品系列导航">
            <div v-for="cat in categories" :key="cat.id" class="category-group">
              <router-link
                :to="`/products/${cat.products[0]}`"
                :class="['category-link', { active: cat.id === currentCategory?.id }]"
              >
                <span>{{ cat.name }}</span>
                <span class="category-count">{{ String(cat.products.length).padStart(2, '0') }}</span>
              </router-link>

              <div v-if="cat.id === currentCategory?.id" class="category-products">
                <router-link
                  v-for="pid in cat.products"
                  :key="pid"
                  :to="`/products/${pid}`"
                  :class="{ active: pid === currentProductId }"
                >
                  {{ productData.details[pid]?.name || pid }}
                </router-link>
              </div>
            </div>
          </nav>
        </aside>

        <main class="detail-main">
          <section v-if="detail.certifications?.length" class="certification-panel" aria-labelledby="certification-title">
            <div>
              <span class="section-eyebrow">QUALITY STANDARD</span>
              <h2 id="certification-title">专业认证</h2>
            </div>
            <div class="certification-list">
              <span v-for="cert in detail.certifications" :key="cert" class="certification-badge">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="m5.5 10 3 3 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ cert }}
              </span>
            </div>
          </section>

          <section id="specifications" class="content-section specifications-section">
            <div class="section-heading">
              <div>
                <span class="section-eyebrow">SPECIFICATIONS</span>
                <h2>产品规格</h2>
              </div>
              <p>关键参数与工业环境适配能力</p>
            </div>

            <dl class="spec-grid">
              <div v-for="(spec, i) in detail.specs" :key="i" class="spec-item">
                <dt>{{ spec.label }}</dt>
                <dd>{{ spec.value }}</dd>
              </div>
            </dl>
          </section>

          <section class="content-section features-section">
            <div class="section-heading">
              <div>
                <span class="section-eyebrow">CORE FEATURES</span>
                <h2>核心特点</h2>
              </div>
              <p>为高强度业务场景而设计</p>
            </div>

            <div class="feature-grid">
              <article v-for="(feature, i) in detail.features" :key="i" class="feature-card">
                <div class="feature-index">{{ String(i + 1).padStart(2, '0') }}</div>
                <div class="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3 4.5 7.2v9.6L12 21l7.5-4.2V7.2L12 3Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
                    <path d="m8.5 12 2.3 2.3 4.8-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.desc }}</p>
              </article>
            </div>
          </section>

          <nav v-if="previousProduct || nextProduct" class="product-switcher" aria-label="同系列产品切换">
            <router-link v-if="previousProduct" :to="`/products/${previousProduct.id}`" class="switcher-link switcher-link--previous">
              <span>上一款产品</span>
              <strong>← {{ previousProduct.name }}</strong>
            </router-link>
            <router-link v-if="nextProduct" :to="`/products/${nextProduct.id}`" class="switcher-link switcher-link--next">
              <span>下一款产品</span>
              <strong>{{ nextProduct.name }} →</strong>
            </router-link>
          </nav>
        </main>
      </div>
    </section>

    <section class="detail-cta">
      <div class="cta-pattern" aria-hidden="true"></div>
      <div class="container cta-inner">
        <div>
          <span class="cta-eyebrow">PRODUCT CONSULTING</span>
          <h2>让合适的设备进入合适的业务场景</h2>
          <p>告诉我们您的作业环境和业务需求，获取专业的产品选型建议。</p>
        </div>
        <router-link to="/contact" class="cta-button">
          联系产品顾问
          <span aria-hidden="true">→</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { productData } from '../data/products-data'

const route = useRoute()
const detail = ref(productData.details[route.params.id] || {})
const currentProductId = ref(route.params.id)

const categories = computed(() => productData.categories)

const currentCategory = computed(() => (
  productData.categories.find((category) => category.products.includes(currentProductId.value))
))

const currentProductIndex = computed(() => (
  currentCategory.value?.products.indexOf(currentProductId.value) ?? 0
))

const siblingProducts = computed(() => currentCategory.value?.products || [])

const previousProduct = computed(() => {
  const id = siblingProducts.value[currentProductIndex.value - 1]
  return id ? productData.details[id] : null
})

const nextProduct = computed(() => {
  const id = siblingProducts.value[currentProductIndex.value + 1]
  return id ? productData.details[id] : null
})

const isPortraitProduct = computed(() => (
  ['ct47', 'eda51k', 'eda56', 'eda61k'].includes(currentProductId.value)
))

function loadDetail(id) {
  currentProductId.value = id
  detail.value = productData.details[id] || {}
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(() => route.params.id, loadDetail)
</script>

<style scoped>
.product-detail {
  --detail-ink: #10213f;
  --detail-muted: #5d6d83;
  --detail-blue: #244b82;
  --detail-bright: #3970c6;
  --detail-line: #dce4ef;
  background: #f5f8fc;
}

.product-hero {
  position: relative;
  min-height: 620px;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(circle at 76% 22%, rgba(85, 139, 218, 0.34), transparent 28%),
    linear-gradient(125deg, #0c2853 0%, #123b72 58%, #1f5595 100%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  opacity: 0.11;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.38) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.38) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(90deg, transparent 2%, #000 65%, #000 100%);
}

.hero-container {
  position: relative;
  z-index: 1;
  padding-top: 28px;
  padding-bottom: 58px;
}

.page-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 32px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

.page-breadcrumb a { transition: color var(--motion-fast); }
.page-breadcrumb a:hover { color: #fff; }
.page-breadcrumb span[aria-current] { color: rgba(255, 255, 255, 0.9); }

.hero-content {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(440px, 1.1fr);
  align-items: center;
  gap: 72px;
  padding-top: 54px;
}

.hero-copy { max-width: 570px; }

.product-kicker {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  color: #bcd4f6;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.14em;
}

.kicker-line {
  width: 32px;
  height: 2px;
  background: #7eb1ff;
}

.hero-copy h1 {
  max-width: 680px;
  margin: 0 0 14px;
  font-size: clamp(42px, 5vw, 64px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.hero-subtitle {
  margin-bottom: 24px;
  color: #d9e7fa;
  font-size: clamp(20px, 2vw, 26px);
  line-height: 1.4;
}

.hero-intro {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 16px;
  line-height: 1.85;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  transition: transform var(--motion-fast), background var(--motion-fast), border-color var(--motion-fast);
}

.primary-action {
  gap: 16px;
  color: var(--detail-blue);
  background: #fff;
  border-color: #fff;
}

.primary-action svg { width: 20px; height: 20px; }
.secondary-action { color: #fff; background: rgba(255, 255, 255, 0.06); }
.primary-action:hover, .secondary-action:hover { transform: translateY(-2px); }
.secondary-action:hover { background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.6); }

.hero-product {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 430px;
  padding: 56px;
  background: rgba(247, 250, 255, 0.97);
  box-shadow: 0 28px 70px rgba(4, 18, 45, 0.28);
}

.hero-product::before {
  position: absolute;
  inset: 18px;
  border: 1px solid rgba(36, 75, 130, 0.12);
  content: '';
}

.hero-product img {
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 330px;
  object-fit: contain;
  filter: drop-shadow(0 22px 20px rgba(26, 47, 77, 0.17));
}

.hero-product--portrait img { max-height: 360px; }

.product-visual-label {
  position: absolute;
  top: 26px;
  left: 30px;
  color: #7d8ba0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.visual-corner {
  position: absolute;
  z-index: 2;
  width: 18px;
  height: 18px;
  border-color: var(--detail-bright);
}

.visual-corner--top { top: 17px; right: 17px; border-top: 2px solid; border-right: 2px solid; }
.visual-corner--bottom { bottom: 17px; left: 17px; border-bottom: 2px solid; border-left: 2px solid; }

.detail-body { padding: 80px 0 96px; }

.detail-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 64px;
  align-items: start;
}

.detail-sidebar {
  position: sticky;
  top: 112px;
  padding: 8px;
  background: #fff;
  border: 1px solid #d9e2ee !important;
  border-radius: 6px !important;
}

.sidebar-heading {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 78px;
  padding: 14px 16px;
  margin-bottom: 8px;
  overflow: hidden;
  color: #fff;
  background: var(--detail-blue);
}

.sidebar-heading::after {
  position: absolute;
  right: -26px;
  bottom: -38px;
  width: 104px;
  height: 104px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  content: '';
}

.sidebar-heading-icon {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  color: #c8ddfb;
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-heading-icon svg { width: 22px; height: 22px; }

.section-eyebrow, .cta-eyebrow {
  color: var(--detail-bright);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.sidebar-heading h2 {
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 21px;
  font-weight: 600;
  line-height: 1.25;
}

.sidebar-heading p {
  position: relative;
  z-index: 1;
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
}

/* .product-navigation { border-top: 1px solid #bfcbdc; } */
.category-group { border-bottom: 1px solid var(--detail-line); }

.category-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 4px;
  color: var(--detail-muted);
  font-size: 14px;
  transition: color var(--motion-fast);
}

.category-link:hover, .category-link.active { color: var(--detail-blue); }
.category-link.active { font-weight: 700; }
.category-count { color: #91a0b4; font-size: 11px; font-variant-numeric: tabular-nums; }

.category-products {
  display: grid;
  gap: 2px;
  padding: 0 0 14px 14px;
  /* border-left: 2px solid #cbd8e9; */
}

.category-products a {
  padding: 8px 14px;
  color: #6c7b90;
  font-size: 13px;
  transition: color var(--motion-fast), background var(--motion-fast);
}

.category-products a:hover { color: var(--detail-blue); }
.category-products a.active { color: #fff; font-weight: 600; background: var(--detail-blue); }

.detail-main { min-width: 0; }

.certification-panel {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 32px;
  align-items: center;
  padding: 30px 32px;
  margin-bottom: 72px;
  background: #fff;
  border: 1px solid var(--detail-line);
}

.certification-panel h2 { margin-top: 6px; color: var(--detail-ink); font-size: 20px; }

.certification-list { display: flex; flex-wrap: wrap; gap: 10px; }
.certification-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 36px;
  padding: 6px 12px;
  color: #39516f;
  background: #f3f7fc;
  border: 1px solid #d7e2f0;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.certification-badge svg { width: 17px; height: 17px; color: var(--detail-bright); }

.content-section { scroll-margin-top: 100px; margin-bottom: 80px; }

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #bfcbdc;
}

.section-heading h2 {
  margin-top: 7px;
  color: var(--detail-ink);
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.section-heading > p { color: #7b899b; font-size: 13px; }

.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background: #fff;
  border-top: 2px solid var(--detail-blue);
  border-left: 1px solid var(--detail-line);
}

.spec-item {
  min-height: 116px;
  padding: 24px 26px;
  border-right: 1px solid var(--detail-line);
  border-bottom: 1px solid var(--detail-line);
}

.spec-item dt {
  margin-bottom: 9px;
  color: #75849a;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.spec-item dd {
  color: var(--detail-ink);
  font-size: 15px;
  line-height: 1.65;
}

.feature-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }

.feature-card {
  position: relative;
  min-height: 250px;
  padding: 30px;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--detail-line);
  transition: transform var(--motion-base), border-color var(--motion-base), box-shadow var(--motion-base);
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: #b6c8e1;
  box-shadow: 0 18px 36px rgba(20, 50, 91, 0.09);
}

.feature-index { position: absolute; top: 24px; right: 26px; color: #bdc9d9; font-size: 12px; font-weight: 700; }
.feature-icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 36px;
  color: var(--detail-blue);
  background: #eaf1fa;
}
.feature-icon svg { width: 25px; height: 25px; }
.feature-card h3 { margin-bottom: 12px; color: var(--detail-ink); font-size: 19px; font-weight: 600; }
.feature-card p { color: var(--detail-muted); font-size: 14px; line-height: 1.8; }

.product-switcher {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  border-top: 1px solid var(--detail-line);
  border-bottom: 1px solid var(--detail-line);
}

.switcher-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 50%;
  max-width: 50%;
  min-height: 110px;
  padding: 24px 28px;
  transition: color var(--motion-fast);
}
.switcher-link:hover strong { color: var(--detail-bright); }
.switcher-link span { margin-bottom: 7px; color: #8290a3; font-size: 12px; }
.switcher-link strong { color: var(--detail-blue); font-size: 15px; font-weight: 600; }
.switcher-link--next { margin-left: auto; text-align: right; }

.detail-cta {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: #102f5e;
}

.cta-pattern {
  position: absolute;
  top: -110px;
  right: -40px;
  width: 480px;
  height: 360px;
  transform: rotate(-18deg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 42px 42px 0 rgba(255, 255, 255, 0.035), 84px 84px 0 rgba(255, 255, 255, 0.025);
}

.cta-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  min-height: 280px;
  padding-top: 52px;
  padding-bottom: 52px;
}

.cta-eyebrow { color: #9fc3f4; }
.cta-inner h2 { max-width: 720px; margin: 10px 0 14px; font-size: clamp(28px, 3vw, 40px); font-weight: 500; line-height: 1.25; }
.cta-inner p { color: rgba(255, 255, 255, 0.68); font-size: 15px; }

.cta-button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  min-width: 210px;
  min-height: 54px;
  padding: 0 20px;
  color: var(--detail-blue);
  background: #fff;
  font-size: 14px;
  font-weight: 700;
  transition: transform var(--motion-fast), background var(--motion-fast);
}
.cta-button:hover { transform: translateY(-2px); background: #edf4ff; }
.cta-button span { font-size: 20px; font-weight: 400; }

@media (max-width: 1080px) {
  .hero-content { grid-template-columns: 1fr 1fr; gap: 38px; }
  .hero-product { min-height: 380px; padding: 44px; }
  .detail-layout { grid-template-columns: 220px minmax(0, 1fr); gap: 38px; }
}

@media (max-width: 900px) {
  .product-hero { min-height: auto; }
  .hero-content { grid-template-columns: 1fr; padding-top: 40px; }
  .hero-copy { max-width: 720px; }
  .hero-product { min-height: 360px; }
  .detail-layout { grid-template-columns: 1fr; }
  .detail-sidebar { position: static; }
  .product-navigation { display: grid; grid-template-columns: repeat(3, 1fr); border-left: 1px solid var(--detail-line); }
  .category-group { border-right: 1px solid var(--detail-line); }
  .category-link { padding: 0 14px; background: #fff; }
  .category-products { grid-column: 1 / -1; padding: 8px; border-left: 0; background: #edf3fa; }
  .certification-panel { margin-bottom: 60px; }
}

@media (max-width: 680px) {
  .hero-container { padding-top: 18px; padding-bottom: 36px; }
  .page-breadcrumb { gap: 7px; overflow: hidden; white-space: nowrap; }
  .page-breadcrumb span[aria-current] { overflow: hidden; text-overflow: ellipsis; }
  .hero-content { gap: 36px; padding-top: 32px; }
  .hero-copy h1 { font-size: 38px; }
  .hero-subtitle { font-size: 19px; }
  .hero-intro { font-size: 14px; }
  .hero-actions { display: grid; grid-template-columns: 1fr; }
  .hero-product { min-height: 290px; padding: 40px 28px 28px; }
  .hero-product img { max-height: 230px; }
  .hero-product--portrait img { max-height: 250px; }
  .detail-body { padding: 56px 0 70px; }
  .product-navigation { grid-template-columns: 1fr; }
  .category-products { padding: 8px 12px 14px; }
  .certification-panel { grid-template-columns: 1fr; gap: 20px; padding: 24px 20px; }
  .content-section { margin-bottom: 60px; }
  .section-heading { align-items: flex-start; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  .section-heading h2 { font-size: 26px; }
  .spec-grid, .feature-grid { grid-template-columns: 1fr; }
  .spec-item { min-height: auto; padding: 20px; }
  .feature-card { min-height: 220px; padding: 24px; }
  .feature-icon { margin-bottom: 28px; }
  .switcher-link { flex-basis: 100%; max-width: 100%; min-height: 92px; }
  .switcher-link--next { text-align: left; }
  .cta-inner { align-items: flex-start; flex-direction: column; min-height: auto; padding-top: 58px; padding-bottom: 58px; }
  .cta-button { width: 100%; }
}
</style>
