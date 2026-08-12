<template>
  <div>
    <!-- Hero Banner -->
    <section class="solution-hero">
      <div class="solution-hero-bg"></div>
      <div class="solution-hero-content">
        <h1>SOLUTIONS</h1>
        <h2>解决方案</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt; 解决方案
      </div>
    </section>

    <!-- 4大方案模块 -->
    <section class="solution-modules">
      <div class="container">
        <div class="module-grid">
          <div
            v-for="module in solutionModules"
            :key="module.id"
            class="module-card"
            @click="goToDetail(module.id)"
          >
            <div class="module-card-img">
              <img v-img-oss :src="module.image" :alt="module.title" onerror="this.style.background='linear-gradient(135deg,#1a3c7c,#2d5bbf)';this.style.minHeight='200px'">
            </div>
            <div class="module-card-body">
              <h3>{{ module.title }}</h3>
              <p>{{ module.desc }}</p>
              <span class="module-link">了解详情 →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const solutionModules = [
  {
    id: 'gate',
    title: '智能闸口系统',
    desc: '依托 AI 视觉识别道闸联动，实现车辆无人无感通行，自动核验，降本增效',
    image: '/images/case/gate3.jpg',
  },
  {
    id: 'yard',
    title: '数字场站建设',
    desc: '场站核心运营中枢，覆盖场站全业务，智能调度分配，可视化场位管理',
    image: '/images/case/yard2.jpg',
  },
  {
    id: 'safety',
    title: '安全合规监管',
    desc: '全景安全监控、风险预警、合规审计，多模态定位，操作可溯',
    image: '/images/case/safety.jpg',
  },
  {
    id: 'hardware',
    title: '硬件网络基建',
    desc: 'IoT设备接入、5G网络覆盖、边缘计算支持，工业级终端稳定运行',
    image: '/images/case/hardware.png',
  },
]

function goToDetail(id) {
  router.push(`/solutions/${id}`)
}
</script>

<style scoped>
/* ---- Hero ---- */
.solution-hero {
  height: 420px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  background: var(--brand-gradient);
  overflow: hidden;
}

.solution-hero-bg {
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 420"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%230a1e50"/><stop offset="50%" style="stop-color:%231a3c7c"/><stop offset="100%" style="stop-color:%232d5bbf"/></linearGradient></defs><rect fill="url(%23g)" width="1920" height="420"/><text x="960" y="180" text-anchor="middle" font-family="Arial" font-size="80" font-weight="700" fill="rgba(255,255,255,0.06)" letter-spacing="8">SOLUTIONS</text></svg>') center/cover no-repeat;
}

.solution-hero-content {
  position: relative;
  z-index: 1;
}

.solution-hero-content h1 {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 4px;
  margin-bottom: 8px;
}

.solution-hero-content h2 {
  font-size: 28px;
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

/* ---- 方案模块卡片 ---- */
.solution-modules {
  padding: 60px 0 80px;
  background: var(--bg-light);
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.module-card {
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.module-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(26, 60, 124, 0.12);
}

.module-card-img {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-light));
  overflow: hidden;
}

.module-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.module-card-body {
  padding: 24px;
}

.module-card-body h3 {
  font-size: 17px;
  color: var(--brand-primary);
  font-weight: 600;
  margin-bottom: 10px;
}

.module-card-body p {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.module-link {
  font-size: 14px;
  color: var(--brand-primary);
  font-weight: 500;
  transition: color 0.3s;
}

.module-card:hover .module-link {
  color: var(--brand-light);
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .module-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .module-grid {
    grid-template-columns: 1fr;
  }
  .solution-hero {
    height: 280px;
  }
  .solution-hero-content h1 {
    font-size: 28px;
    letter-spacing: 2px;
  }
  .solution-hero-content h2 {
    font-size: 18px;
  }
  .page-breadcrumb {
    right: auto;
    left: 16px;
    bottom: 16px;
  }
}

@media (max-width: 480px) {
  .solution-hero {
    height: 220px;
  }
  .solution-hero-content h1 {
    font-size: 22px;
    letter-spacing: 1px;
  }
  .solution-hero-content h2 {
    font-size: 15px;
  }
  .module-card-body {
    padding: 16px;
  }
  .module-card-body h3 {
    font-size: 15px;
  }
}
</style>
