<template>
  <div>
    <!-- Hero Banner -->
    <section class="detail-hero">
      <div class="detail-hero-bg"></div>
      <div class="detail-hero-content">
        <h1>{{ detail.title }}</h1>
        <h2>{{ detail.subtitle }}</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt;
        <router-link to="/solutions">解决方案</router-link> &gt;
        <span>{{ detail.title }}</span>
      </div>
    </section>

    <!-- 方案简介 -->
    <section class="detail-section intro-section">
      <div class="container">
        <div class="section-label">INTRODUCTION</div>
        <h3 class="section-title">方案简介</h3>
        <p class="section-desc">{{ detail.intro }}</p>
      </div>
    </section>

    <!-- 方案价值 -->
    <section class="detail-section value-section">
      <div class="container">
        <div class="section-label">VALUE</div>
        <h3 class="section-title">方案价值</h3>
        <div class="value-grid">
          <div v-for="(item, i) in detail.values" :key="i" class="value-card">
            <div class="value-icon">{{ item.icon }}</div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能 -->
    <section class="detail-section func-section">
      <div class="container">
        <div class="section-label">FEATURES</div>
        <h3 class="section-title">核心功能</h3>

        <!-- 功能 Tab 导航 -->
        <div class="func-tabs">
          <div
            v-for="(tab, i) in detail.features"
            :key="tab.title"
            :class="['func-tab', { active: activeFeature === i }]"
            @click="activeFeature = i"
          >
            <div class="func-tab-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="func-tab-info">
              <span class="func-tab-title">{{ tab.title }}</span>
            </div>
          </div>
        </div>

        <!-- 功能内容区 -->
        <div class="func-content-area">
          <div
            v-for="(block, i) in detail.features"
            :key="block.title"
            :class="['func-content-panel', { active: activeFeature === i }]"
          >
            <div class="func-content-left">
              <div class="func-content-img">
                <img v-img-oss :src="block.image" :alt="block.title" onerror="this.style.background='linear-gradient(135deg,#1a3c7c,#2d5bbf)';this.style.minHeight='280px'">
              </div>
            </div>
            <div class="func-content-right">
              <h4>{{ block.title }}</h4>
              <div class="func-points">
                <div v-for="(item, j) in block.items" :key="j" class="func-point">
                  <div class="point-marker"></div>
                  <div class="point-text">
                    <h5>{{ item.title }}</h5>
                    <p>{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 系统功能架构图 -->
        <!-- <div v-if="detail.architecture" class="func-architecture">
          <div class="func-architecture-label">系统功能架构</div>
          <div class="func-architecture-img">
            <img :src="detail.architecture" alt="系统功能架构图" onerror="this.style.display='none'">
          </div>
        </div> -->
      </div>
    </section>

    <!-- 相关案例 -->
    <section class="detail-section cases-section">
      <div class="container">
        <div class="section-label">CASES</div>
        <h3 class="section-title">相关案例</h3>
        <div class="cases-grid">
          <div v-for="(item, i) in relatedCases.slice(0,3)" :key="item.id" class="case-card" @click="goToCase(item.id)">
            <img v-img-oss :src="item.coverImage" :alt="item.title" onerror="this.parentElement.style.background='linear-gradient(135deg,#1a3c7c,#2d5bbf)'">
            <div class="case-label">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="detail-cta">
      <div class="container">
        <h3>需要了解更多信息？</h3>
        <p>我们的团队将为您提供专业的解决方案咨询服务</p>
        <a href="/contact" class="btn-cta">联系我们</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { solutionData } from '../data/solutions-data'
import { caseData } from '../data/cases-data'

const route = useRoute()
const router = useRouter()
const detail = ref({})
const activeFeature = ref(0)

// 根据当前解决方案的 id，关联对应的成功案例
const relatedCases = computed(() => {
  const solutionId = route.params.id
  return caseData.filter(c => c.solutionCategory === solutionId)
})

function goToCase(id) {
  router.push(`/cases/${id}`)
}

function loadDetail(id) {
  detail.value = solutionData[id] || solutionData['gate']
  activeFeature.value = 0
}

onMounted(() => {
  loadDetail(route.params.id)
})

// 监听路由变化，切换解决方案时重新加载
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

/* ---- 通用 Section ---- */
.detail-section {
  padding: 70px 0;
}

.section-label {
  font-size: 11px;
  color: #1a3c7c;
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 8px;
}

.section-title {
  font-size: 26px;
  color: #1a3c7c;
  font-weight: 700;
  margin-bottom: 16px;
}

.section-desc {
  font-size: 15px;
  color: #666;
  line-height: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* ---- 方案简介 ---- */
.intro-section {
  background: #fff;
  text-align: center;
}

/* ---- 方案价值 ---- */
.value-section {
  background: #f5f7fb;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.value-card {
  background: #fff;
  border-radius: 10px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.3s;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(26, 60, 124, 0.1);
}

.value-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.value-card h4 {
  font-size: 16px;
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
}

.value-card p {
  font-size: 13px;
  color: #888;
  line-height: 1.8;
}

/* ---- 核心功能 ---- */
.func-section {
  background: #f8fafc;
}

/* Tab 导航 */
.func-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 40px;
  border-bottom: 2px solid #e8ecf1;
  padding-bottom: 0;
}

.func-tab {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.3s;
  flex-shrink: 0;
}

.func-tab:hover {
  background: #f0f4f8;
}

.func-tab.active {
  border-bottom-color: #1a3c7c;
  color: #1a3c7c;
  font-weight: 600;
}

.func-tab-num {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #e8ecf1;
  color: #888;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.func-tab.active .func-tab-num {
  background: #1a3c7c;
  color: #fff;
}

.func-tab-title {
  font-size: 15px;
  color: #333;
  transition: color 0.3s;
}

.func-tab.active .func-tab-title {
  color: #1a3c7c;
  font-weight: 600;
}

/* 内容面板 */
.func-content-area {
  min-height: 400px;
}

.func-content-panel {
  display: none;
}

.func-content-panel.active {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 50px;
  align-items: start;
  animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.func-content-left {
  position: sticky;
  top: 140px;
}

.func-content-img {
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: linear-gradient(135deg, #e8f0fe, #d0e2ff);
  box-shadow: 0 8px 30px rgba(26, 60, 124, 0.1);
}

.func-content-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.func-content-right h4 {
  font-size: 22px;
  color: #1a3c7c;
  font-weight: 700;
  margin-bottom: 32px;
}

.func-points {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.func-point {
  display: flex;
  gap: 16px;
}

.point-marker {
  width: 3px;
  min-height: 100%;
  background: linear-gradient(to bottom, #1a3c7c, #2d5bbf);
  border-radius: 2px;
  flex-shrink: 0;
}

.point-text h5 {
  font-size: 15px;
  color: #333;
  font-weight: 600;
  margin-bottom: 6px;
}

.point-text p {
  font-size: 13px;
  color: #888;
  line-height: 1.9;
}

/* ---- 系统功能架构图 ---- */
.func-architecture {
  margin-top: 60px;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.func-architecture-label {
  font-size: 18px;
  color: #1a3c7c;
  font-weight: 700;
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 2px;
}

.func-architecture-img {
  text-align: center;
}

.func-architecture-img img {
  max-width: 100%;
  height: auto;
  display: inline-block;
}

/* ---- 相关案例 ---- */
.cases-section {
  background: #fff;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
}

.case-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background: linear-gradient(135deg, #1a3c7c, #2d5bbf);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}

.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(26, 60, 124, 0.15);
}

.case-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: #fff;
  font-size: 14px;
  font-weight: 500;
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
@media (max-width: 768px) {
  .value-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .func-tabs {
    flex-direction: column;
    gap: 0;
  }
  .func-content-panel.active {
    grid-template-columns: 1fr;
  }
  .func-content-left {
    position: static;
  }
  .cases-grid {
    grid-template-columns: 1fr;
  }
  .detail-hero {
    height: 260px;
  }
  .detail-hero-content h1 {
    font-size: 28px;
  }
}
</style>
