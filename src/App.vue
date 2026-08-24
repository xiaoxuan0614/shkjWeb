<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <SiteHeader />
    <div id="main-content" tabindex="-1">
      <router-view />
    </div>
    <SiteFooter />
    <BackToTop />
  </div>
</template>

<style>
@import './assets/ui-upgrade.css';

/* ===== 全局 CSS 变量 —— 统一品牌色 ===== */
:root {
  --brand-dark: #123265;
  --brand-primary: #244b82;
  --brand-light: #3970c6;
  --brand-soft: #ebf1fa;
  --brand-gradient: linear-gradient(125deg, #113568 0%, #1b477f 58%, #275b9e 100%);
  --text-primary: #10213f;
  --text-secondary: #53647c;
  --text-muted: #728198;
  --border-color: #dce3ee;
  --bg-light: #f4f7fb;
  --bg-subtle: #f8fafc;
  --white: #fff;
  --container-width: 1200px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --shadow-sm: 0 2px 8px rgba(16, 33, 63, 0.04);
  --shadow-md: 0 14px 32px rgba(16, 42, 88, 0.1);
  --motion-fast: 180ms ease;
  --motion-base: 240ms ease;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
body {
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  color: var(--text-primary);
  line-height: 1.6;
  background: var(--bg-subtle);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
a { text-decoration: none; color: inherit; }
button, input, textarea, select { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
ul, ol { list-style: none; }
img { max-width: 100%; display: block; }

:focus-visible {
  outline: 3px solid #75a3ff;
  outline-offset: 3px;
}

.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 3000;
  padding: 10px 16px;
  color: #fff;
  background: var(--brand-primary);
  transform: translateY(-150%);
  transition: transform var(--motion-fast);
}

.skip-link:focus { transform: translateY(0); }

/* ---- 通用容器：响应式宽度 ---- */
.container {
  width: min(100% - 48px, var(--container-width));
  margin: 0 auto;
  padding: 0;
}

@media (max-width: 768px) {
  .container { width: min(100% - 32px, var(--container-width)); }
}

@media (max-width: 480px) {
  .container { width: min(100% - 24px, var(--container-width)); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
