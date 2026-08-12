<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <div id="app">
    <SiteHeader />
    <router-view />
    <SiteFooter />
    <BackToTop />
  </div>
</template>

<style>
/* ===== 全局 CSS 变量 —— 统一品牌色 ===== */
:root {
  --brand-dark: #0a1e50;
  --brand-primary: #1a3c7c;
  --brand-light: #2d5bbf;
  --brand-gradient: linear-gradient(135deg, #0a1e50 0%, #1a3c7c 40%, #2d5bbf 100%);
  --text-primary: #333;
  --text-secondary: #666;
  --text-muted: #888;
  --border-color: #eee;
  --bg-light: #f5f7fb;
  --white: #fff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
#app { animation: pageFade 0.4s ease-out; }
@keyframes pageFade { from {opacity:0.7;transform:translateY(6px)} to {opacity:1;transform:translateY(0)} }
body {
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  color: var(--text-primary);
  line-height: 1.6;
  background: var(--white);
}
a { text-decoration: none; color: inherit; }
ul, ol { list-style: none; }
img { max-width: 100%; display: block; }

/* ---- 通用容器：响应式宽度 ---- */
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 1248px) {
  .container { width: calc(100% - 48px); max-width: 1200px; }
}

@media (max-width: 768px) {
  .container { padding: 0 16px; }
}

@media (max-width: 480px) {
  .container { padding: 0 12px; }
}
</style>
