<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSolutionsDropdown = ref(false)
const mobileMenuOpen = ref(false)

const solutionTabs = [
  { name: '无人闸口建设', path: '/solutions/gate' },
  { name: '数字场站建设', path: '/solutions/yard' },
  { name: '安全合规监管', path: '/solutions/safety' },
  { name: '硬件网络基建', path: '/solutions/hardware' },
]

function goToSolution(path) {
  showSolutionsDropdown.value = false
  mobileMenuOpen.value = false
  router.push(path)
}

function closeMobile() {
  mobileMenuOpen.value = false
}

function isActive(path) {
  return router.currentRoute.value.path === path || (Array.isArray(path) && path.some(p => router.currentRoute.value.path.startsWith(p)))
}
</script>

<template>
  <header class="main-header">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;height:100%;">
      <router-link to="/" class="logo">
        <img v-img-oss src="/images/logo/logo.jpg" alt="首汇科技" class="logo-img">
      </router-link>

      <!-- 桌面端导航 -->
      <nav class="nav-menu desktop-nav">
        <router-link to="/" @click="closeMobile" :class="{ active: isActive('/') }">首页</router-link>

        <!-- 解决方案 下拉菜单 -->
        <div
          class="nav-dropdown"
          :class="{ active: showSolutionsDropdown }"
          @mouseenter="showSolutionsDropdown = true"
          @mouseleave="showSolutionsDropdown = false"
        >
          <router-link to="/solutions" class="nav-link-with-arrow">
            解决方案
            <svg viewBox="0 0 12 8" width="12" height="8" class="dropdown-arrow">
              <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>
          </router-link>
          <div class="dropdown-panel">
            <router-link
              v-for="item in solutionTabs"
              :key="item.name"
              :to="item.path"
              @click="closeMobile"
              class="dropdown-item-link"
            >
              <div class="dropdown-title">{{ item.name }}</div>
            </router-link>
          </div>
        </div>

        <router-link to="/products" @click="closeMobile" :class="{ active: isActive('/products') }">产品清单</router-link>
        <router-link to="/cases" @click="closeMobile" :class="{ active: isActive('/cases') }">成功案例</router-link>
        <router-link to="/news" @click="closeMobile" :class="{ active: isActive('/news') }">新闻中心</router-link>
        <router-link to="/about" @click="closeMobile" :class="{ active: isActive(['/about']) }">关于首汇</router-link>
        <router-link to="/contact" @click="closeMobile" :class="{ active: isActive('/contact') }">联系我们</router-link>
      </nav>

      <!-- 移动端汉堡按钮 -->
      <button class="hamburger" :class="{ active: mobileMenuOpen }" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
        <span></span><span></span><span></span>
      </button>

      <!-- 移动端侧滑菜单（Element Plus el-drawer + el-menu） -->
      <el-drawer
        v-model="mobileMenuOpen"
        title="菜单"
        direction="rtl"
        size="280px"
        :with-header="true"
        class="mobile-drawer"
        @close="closeMobile"
      >
        <el-menu
          :default-active="router.currentRoute.value.path"
          class="mobile-menu"
          @select="(path) => { mobileMenuOpen = false; router.push(path) }"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-sub-menu index="solutions">
            <template #title>解决方案</template>
            <el-menu-item v-for="item in solutionTabs" :key="item.name" :index="item.path">{{ item.name }}</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/products">产品清单</el-menu-item>
          <el-menu-item index="/cases">成功案例</el-menu-item>
          <el-menu-item index="/news">新闻中心</el-menu-item>
          <el-menu-item index="/about">关于首汇</el-menu-item>
          <el-menu-item index="/contact">联系我们</el-menu-item>
        </el-menu>
      </el-drawer>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  height: 70px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

/* ---- 桌面端导航 ---- */
.nav-menu {
  display: flex;
  gap: 36px;
  align-items: center;
}

.nav-menu a {
  font-size: 15px;
  color: #333;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s;
}

.nav-menu a:hover,
.nav-menu a.active {
  color: #1a3c7c;
}

.nav-menu a.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #1a3c7c;
}

/* ---- 汉堡按钮 ---- */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ---- 下拉菜单 ---- */
.nav-dropdown {
  position: relative;
  padding: 8px 0;
}

.nav-link-with-arrow {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 15px;
  color: #333;
  transition: color 0.3s;
}

.nav-link-with-arrow:hover {
  color: #1a3c7c;
}

.dropdown-arrow {
  width: 12px;
  height: 8px;
  transition: transform 0.3s;
  margin-left: 2px;
}

.nav-dropdown.active .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s, transform 0.25s;
  transform: translateX(-50%) translateY(8px);
  z-index: 100;
  border: 1px solid #eee;
}

.nav-dropdown:hover .dropdown-panel,
.nav-dropdown.active .dropdown-panel {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  color: inherit;
}

.dropdown-item-link:hover {
  background: #f0f5ff;
}

.dropdown-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* ========== 响应式 ========== */
@media (max-width: 992px) {
  .desktop-nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

@media (max-width: 480px) {
  .main-header {
    height: 60px;
  }

  .logo-img {
    height: 34px;
  }

  .hamburger {
    width: 24px;
    height: 24px;
    gap: 4px;
  }
}
</style>

<!-- 全局样式：覆盖 Element Plus Drawer 默认主题色以匹配品牌 -->
<style>
.mobile-drawer .el-drawer__header {
  padding: 20px 24px 16px;
  margin-bottom: 0;
  border-bottom: 1px solid #f0f0f0;
}

.mobile-drawer .el-drawer__title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.mobile-drawer .el-drawer__close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f5f5f5;
  color: #666;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.mobile-drawer .el-drawer__close-btn:hover {
  background: #e8e8e8;
}

.mobile-menu {
  padding: 8px 0;
}

.mobile-menu .el-menu-item {
  height: 52px;
  line-height: 52px;
  font-size: 15px;
  color: #333;
  margin: 0;
  border-radius: 0;
}

.mobile-menu .el-menu-item:not(:last-child) {
  border-bottom: 1px solid #f5f5f5;
}

.mobile-menu .el-menu-item.is-active {
  color: #1a3c7c;
  background-color: #f5f7fb;
  font-weight: 500;
}

.mobile-menu .el-menu-item:hover {
  background-color: #f5f7fb;
  color: #1a3c7c;
}

.mobile-menu .el-sub-menu__title {
  height: 52px;
  line-height: 52px;
  font-size: 15px;
  color: #333;
  margin: 0;
}

.mobile-menu .el-sub-menu__title:hover {
  background-color: #f5f7fb;
  color: #1a3c7c;
}

.mobile-menu .el-sub-menu.is-active > .el-sub-menu__title {
  color: #1a3c7c;
  background-color: #f5f7fb;
  font-weight: 500;
}

.mobile-menu .el-sub-menu .el-menu-item {
  padding-left: 48px !important;
  font-size: 14px;
  color: #666;
}

.mobile-menu .el-sub-menu .el-menu-item.is-active {
  color: #1a3c7c;
}
</style>
