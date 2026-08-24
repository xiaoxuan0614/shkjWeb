<template>
  <main class="not-found">
    <p class="status-code">404</p>
    <h1>页面未找到</h1>
    <p>您访问的页面不存在、已被移动或链接有误。</p>
    <div class="actions">
      <router-link to="/">返回首页</router-link>
      <router-link to="/solutions">查看解决方案</router-link>
    </div>
  </main>
</template>

<style scoped>
.not-found { min-height: 60vh; padding: 100px 24px; text-align: center; background: #f5f7fb; }
.status-code { color: #1a3c7c; font-size: 72px; font-weight: 800; line-height: 1; }
h1 { margin: 20px 0 12px; color: #0a1e50; font-size: 34px; }
.actions { display: flex; justify-content: center; gap: 16px; margin-top: 32px; }
.actions a { padding: 10px 22px; border-radius: 4px; color: #fff; background: #1a3c7c; }
.actions a + a { color: #1a3c7c; background: #fff; border: 1px solid #1a3c7c; }
</style>
