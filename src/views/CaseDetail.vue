<template>
  <div>
    <!-- Hero Banner -->
    <section class="detail-hero">
      <div class="detail-hero-bg"></div>
      <div class="detail-hero-content">
        <h1>{{ detail.title }}</h1>
        <h2>{{ detail.location }}</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <router-link to="/cases">成功案例</router-link> &gt;
        <span>{{ detail.title }}</span>
      </div>
    </section>

    <!-- 客户痛点 -->
    <section class="detail-section section-pain">
      <div class="container">
        <div class="section-heading">
          <h3 class="section-heading-cn">客户痛点</h3>
          <span class="section-heading-en">PAIN POINTS</span>
        </div>
        <p class="section-text">{{ detail.painPoints }}</p>
      </div>
    </section>

    <!-- 落地方案 -->
    <section class="detail-section section-solution">
      <div class="container">
        <div class="section-heading">
          <h3 class="section-heading-cn">落地方案</h3>
          <span class="section-heading-en">SOLUTION</span>
        </div>
        <p class="section-text">{{ detail.intro }}</p>
      </div>
    </section>

    <!-- 成效价值 -->
    <section class="detail-section section-value">
      <div class="container">
        <div class="section-heading">
          <h3 class="section-heading-cn">成效价值</h3>
          <span class="section-heading-en">ACHIEVEMENTS</span>
        </div>
        <div class="value-list">
          <div v-for="(item, i) in detail.achievements" :key="i" class="value-item">
            <div class="value-item-marker"></div>
            <div class="value-item-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 照片展示 -->
    <section class="detail-section gallery-section">
      <div class="container">
        <div class="section-heading">
          <h3 class="section-heading-cn">照片展示</h3>
          <span class="section-heading-en">GALLERY</span>
        </div>
        <div class="gallery-carousel">
          <div class="gallery-viewport">
            <div class="gallery-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="(img, i) in gallery" :key="i" class="gallery-slide">
                <img v-img-oss :src="img" :alt="detail.title" onerror="this.style.background='linear-gradient(135deg,#1a3c7c,#2d5bbf)';this.style.minHeight='400px'">
              </div>
            </div>
          </div>
          <div class="gallery-dots">
            <span
              v-for="(_, i) in gallery"
              :key="i"
              :class="['gallery-dot', { active: currentSlide === i }]"
              @click="currentSlide = i"
            ></span>
          </div>
          <div class="gallery-arrow gallery-arrow-left" @click="prevSlide">‹</div>
          <div class="gallery-arrow gallery-arrow-right" @click="nextSlide">›</div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="detail-cta">
      <div class="container">
        <h3>想了解类似案例？</h3>
        <p>我们的团队将为您提供专业的案例咨询服务</p>
        <a href="/contact" class="btn-cta">联系我们</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { caseData } from '../data/cases-data'
import { galleryMap } from '../data/cases-gallery-generated'

const route = useRoute()
const detail = ref({})
const currentSlide = ref(0)
let timer = null

const gallery = computed(() => {
  const caseInfo = caseData.find(c => c.id === route.params.id)
  if (!caseInfo || !caseInfo.imageFolder) return []
  return galleryMap[caseInfo.imageFolder] || []
})

onMounted(() => {
  const id = route.params.id
  detail.value = caseData.find(c => c.id === id) || caseData[0]
  startAutoPlay()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function nextSlide() {
  if (gallery.value.length === 0) return
  currentSlide.value = (currentSlide.value + 1) % gallery.value.length
}

function prevSlide() {
  if (gallery.value.length === 0) return
  currentSlide.value = (currentSlide.value - 1 + gallery.value.length) % gallery.value.length
}

function startAutoPlay() {
  if (timer) clearInterval(timer)
  if (gallery.value.length > 1) {
    timer = setInterval(nextSlide, 4000)
  }
}
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

/* ---- 通用 ---- */
.detail-section {
  padding: 70px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 中英双语标题 */
.section-heading {
  text-align: center;
  margin-bottom: 32px;
}

.section-heading-cn {
  font-size: 26px;
  color: #1a3c7c;
  font-weight: 700;
  margin: 0 0 6px;
}

.section-heading-en {
  font-size: 11px;
  color: #999;
  letter-spacing: 3px;
  font-weight: 600;
}

.section-text {
  font-size: 15px;
  color: #555;
  line-height: 2;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

/* 客户痛点 */
.section-pain {
  background: #fff;
}

/* 落地方案 */
.section-solution {
  background: #f5f7fb;
}

/* 成效价值 */
.section-value {
  background: #fff;
}

.value-list {
  max-width: 900px;
  margin: 0 auto;
}

.value-item {
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.value-item:last-child {
  border-bottom: none;
}

.value-item-marker {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1a3c7c;
  margin-top: 10px;
  flex-shrink: 0;
}

.value-item-content h4 {
  font-size: 16px;
  color: #1a3c7c;
  font-weight: 700;
  margin: 0 0 6px;
}

.value-item-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.9;
  margin: 0;
}

/* ---- 照片展示 ---- */
.gallery-section {
  background: #f5f7fb;
}

.gallery-carousel {
  position: relative;
  margin-top: 40px;
  border-radius: 12px;
  overflow: hidden;
}

.gallery-viewport {
  overflow: hidden;
  border-radius: 12px;
}

.gallery-track {
  display: flex;
  transition: transform 0.5s ease;
}

.gallery-slide {
  min-width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #e8f0fe, #d0e2ff);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.gallery-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.gallery-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  cursor: pointer;
  transition: all 0.3s;
}

.gallery-dot.active {
  background: #1a3c7c;
  transform: scale(1.2);
}

.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.gallery-arrow:hover {
  background: #1a3c7c;
  color: #fff;
}

.gallery-arrow-left {
  left: 16px;
}

.gallery-arrow-right {
  right: 16px;
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
  transition: all 0.3s;
}

.btn-cta:hover {
  background: #e8f0fe;
  transform: translateY(-2px);
}

/* ---- 响应式 ---- */
@media (max-width: 1024px) {
  .value-list {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .detail-hero {
    height: 260px;
  }
  .detail-hero-content h1 {
    font-size: 28px;
  }
  .gallery-arrow {
    display: none;
  }
  .page-breadcrumb {
    right: auto;
    left: 20px;
  }
  .section-heading-cn {
    font-size: 20px;
  }
  .section-text {
    font-size: 14px;
  }
  .value-item {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .detail-hero {
    height: 200px;
  }
  .detail-hero-content h1 {
    font-size: 22px;
  }
  .detail-hero-content h2 {
    font-size: 16px;
  }
}
</style>
