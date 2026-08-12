<template>
  <div>
      <div class="page-hero">
        <div class="page-hero-bg"></div>
        <div class="page-hero-overlay"></div>
        <div class="page-hero-content">
          <h1>ABOUT US</h1>
          <h2>关于首汇</h2>
        </div>
        <div class="page-breadcrumb">
          <router-link to="/">首页</router-link> &gt;
          <router-link to="/about">关于我们</router-link> &gt;
          <span>{{ currentLabel }}</span>
        </div>
        <div class="page-tabs">
          <div class="page-tabs-inner">
            <router-link
              v-for="tab in tabs"
              :key="tab.path"
              :to="tab.link"
              class="page-tab"
              :class="{ active: $route.path === tab.link || ($route.path === '/about' && tab.path === '') }"
            >
              {{ tab.label }}
            </router-link>
          </div>
        </div>
      </div>

    <!-- 子页面内容 -->
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { label: '集团概况', path: '', link: '/about' },
  { label: '发展历程', path: 'history', link: '/about/history' },
  { label: '企业理念', path: 'philosophy', link: '/about/philosophy' },
  { label: '资质荣誉', path: 'honors', link: '/about/honors' },
]

const currentLabel = computed(() => {
  const tab = tabs.find(t => t.link === route.path)
  return tab ? tab.label : '集团概况'
})
</script>

<style scoped>
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

.page-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.75) 0%, rgba(26, 60, 124, 0.6) 100%);
}

.page-hero-content {
  position: relative;
  z-index: 1;
}

.page-hero-content h1 {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 8px;
}

.page-hero-content h2 {
  font-size: 26px;
  font-weight: 400;
  opacity: 0.9;
}

.page-breadcrumb {
  position: absolute;
  bottom: 50px;
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

.page-tabs {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgba(0,0,0,0.15);
}

.page-tabs-inner {
  display: flex;
  justify-content: center;
  gap: 0;
  width: 1200px;
  max-width: calc(100% - 48px);
  margin: 0 auto;
}

.page-tab {
  padding: 14px 32px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;
  border-bottom: 2px solid transparent;
}

.page-tab:hover,
.page-tab.active {
  color: #fff;
  border-bottom-color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .page-hero {
    height: 220px;
  }
  .page-hero-content h1 {
    font-size: 28px;
  }
  .page-hero-content h2 {
    font-size: 18px;
  }
  .page-breadcrumb {
    right: auto;
    left: 16px;
    bottom: 16px;
  }
  .page-tab {
    padding: 12px 16px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .page-hero {
    height: 180px;
  }
  .page-hero-content h1 {
    font-size: 22px;
  }
  .page-hero-content h2 {
    font-size: 14px;
  }
  .page-tab {
    padding: 10px 12px;
    font-size: 12px;
  }
}
</style>
