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

function closeMobile() {
  mobileMenuOpen.value = false
}

function isActive(path) {
  return router.currentRoute.value.path === path || (Array.isArray(path) && path.some(p => router.currentRoute.value.path.startsWith(p)))
}
</script>

<template>
  <header class="main-header">
    <div class="container header-inner">
      <router-link to="/" class="logo" aria-label="首汇科技首页">
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
          <router-link
            to="/solutions"
            class="nav-link-with-arrow"
            :class="{ active: isActive('/solutions') }"
            :aria-expanded="showSolutionsDropdown"
          >
            解决方案
            <svg viewBox="0 0 12 8" width="12" height="8" class="dropdown-arrow">
              <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            </svg>
          </router-link>
          <div class="dropdown-panel" aria-label="解决方案子导航">
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
      <button
        class="hamburger"
        :class="{ active: mobileMenuOpen }"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="mobileMenuOpen ? '关闭菜单' : '打开菜单'"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <span></span><span></span><span></span>
      </button>

      <!-- 移动端侧滑菜单（Element Plus el-drawer + el-menu） -->
      <el-drawer
        id="mobile-navigation"
        v-model="mobileMenuOpen"
        title="菜单"
        direction="rtl"
        size="280px"
        append-to-body
        destroy-on-close
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
  height: 72px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 1px 0 rgba(16, 33, 63, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(12px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 38px;
  width: auto;
}

/* ---- 桌面端导航 ---- */
.nav-menu {
  display: flex;
  gap: clamp(16px, 1.8vw, 28px);
  align-items: center;
}

.nav-menu a {
  min-height: 44px;
  font-size: 14px;
  color: var(--text-primary);
  padding: 12px 0;
  position: relative;
  transition: color var(--motion-fast);
}

.nav-menu a:hover,
.nav-menu a.active {
  color: var(--brand-light);
}

.nav-menu a.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--brand-light);
}

.nav-menu > a:last-child {
  min-height: 40px;
  padding: 9px 16px;
  color: #fff;
  background: var(--brand-light);
  border: 1px solid var(--brand-light);
  border-radius: 8px;
  font-weight: 700;
  transition: color var(--motion-fast), background-color var(--motion-fast), border-color var(--motion-fast);
}

.nav-menu > a:last-child:hover,
.nav-menu > a:last-child.active {
  color: #fff;
  background: var(--brand-primary);
  border-color: var(--brand-primary);
}

.nav-menu > a:last-child::after { display: none; }

/* ---- 汉堡按钮 ---- */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 8px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  transition: transform var(--motion-base), opacity var(--motion-fast);
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
  padding: 0;
}

.nav-link-with-arrow {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-primary);
  transition: color var(--motion-fast);
}

.nav-link-with-arrow:hover {
  color: var(--brand-light);
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
  width: 224px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(16, 33, 63, 0.14);
  padding: 10px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--motion-fast), visibility var(--motion-fast), transform var(--motion-fast);
  transform: translateX(-50%) translateY(8px);
  z-index: 100;
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.nav-dropdown:hover .dropdown-panel,
.nav-dropdown:focus-within .dropdown-panel,
.nav-dropdown.active .dropdown-panel {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item-link {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 11px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: color var(--motion-fast), background-color var(--motion-fast);
  text-decoration: none;
  color: inherit;
}

.dropdown-item-link:hover {
  background: var(--brand-soft);
}

.dropdown-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
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
    height: 64px;
  }

  .logo-img {
    height: 36px;
  }
}
</style>

<!-- 全局样式：覆盖 Element Plus Drawer 默认主题色以匹配品牌 -->
<style>
.mobile-drawer .el-drawer__header {
  padding: 20px 24px 16px;
  margin-bottom: 0;
  border-bottom: 1px solid var(--border-color);
}

.mobile-drawer .el-drawer__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.mobile-drawer .el-drawer__close-btn {
  width: 32px;
  height: 32px;
  background: var(--bg-light);
  color: var(--text-secondary);
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
  color: var(--text-primary);
  margin: 2px 8px;
  border-radius: 8px;
}

.mobile-menu .el-menu-item:not(:last-child) {
  border-bottom: 1px solid #f5f5f5;
}

.mobile-menu .el-menu-item.is-active {
  color: var(--brand-primary);
  background-color: var(--brand-soft);
  font-weight: 500;
}

.mobile-menu .el-menu-item:hover {
  background-color: var(--brand-soft);
  color: var(--brand-primary);
}

.mobile-menu .el-sub-menu__title {
  height: 52px;
  line-height: 52px;
  font-size: 15px;
  color: var(--text-primary);
  margin: 0;
}

.mobile-menu .el-sub-menu__title:hover {
  background-color: var(--brand-soft);
  color: var(--brand-primary);
}

.mobile-menu .el-sub-menu.is-active > .el-sub-menu__title {
  color: var(--brand-primary);
  background-color: var(--brand-soft);
  font-weight: 500;
}

.mobile-menu .el-sub-menu .el-menu-item {
  padding-left: 48px !important;
  font-size: 14px;
  color: var(--text-secondary);
}

.mobile-menu .el-sub-menu .el-menu-item.is-active {
  color: var(--brand-primary);
}
</style>
