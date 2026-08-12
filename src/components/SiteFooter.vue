<template>
  <footer class="footer">
    <div class="container">
      <!-- 顶部 Logo + 联系信息 -->
      <div class="footer-top">
        <div class="footer-brand">
          <img v-img-oss src="/images/logo/logo-white.png" alt="首汇科技" class="footer-logo">
          <div class="footer-contact-info">
            <div class="contact-row">
              <span class="phone-icon">📞</span>
              <a href="tel:022-66220191" class="phone">022-66220191</a>
            </div>
            <p class="address">办公地址：天津市滨海新区京门大道396号</p>
          </div>
          <div class="qr-code">
            <img v-img-oss src="/images/logo/wechat-qrcode.jpg" alt="公众号二维码" class="qr-img" onerror="this.style.display='none'">
            <span class="qr-label">关注公众号</span>
          </div>
        </div>
        <div class="footer-nav">
          <div class="nav-col">
            <h4>关于我们</h4>
            <ul>
              <li><router-link to="/about">集团概况</router-link></li>
              <li><router-link to="/about/history">发展历程</router-link></li>
              <li><router-link to="/about/philosophy">企业理念</router-link></li>
            </ul>
          </div>
          <div class="nav-col">
            <h4>解决方案</h4>
            <ul>
              <li><router-link to="/solutions/gate">智能闸口</router-link></li>
              <li><router-link to="/solutions/yard">数字场站</router-link></li>
              <li><router-link to="/solutions/safety">安全监管</router-link></li>
              <li><router-link to="/solutions/hardware">硬件基建</router-link></li>
            </ul>
          </div>
          <div class="nav-col">
            <h4>产品清单</h4>
            <ul>
              <li><router-link to="/products/dlt-v73">车载终端</router-link></li>
              <li><router-link to="/products/ct47">手持终端</router-link></li>
              <li><router-link to="/products/granit-ultra-2105i">条码产品</router-link></li>
            </ul>
          </div>
          <div class="nav-col">
            <h4>新闻中心</h4>
            <ul>
              <li><router-link to="/news">公司新闻</router-link></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="footer-bottom">
        <span>© 首汇科技 版权所有</span>
        <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">津ICP备 2024021663号-1</a>
        <a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank" rel="noopener noreferrer">津公网安备 12011602301131号</a>
        <a href="#" @click.prevent="scrollToTop">返回顶部</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  background: #0a1e50;
  color: #ccc;
  padding: 50px 0 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---- 顶部 ---- */
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 280px;
  align-items: flex-start;
}

.footer-logo {
  height: 40px;
  width: auto;
  display: block;
  object-fit: contain;
}

.footer-contact-info .phone {
  font-size: 20px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.3s;
}

.footer-contact-info .phone:hover {
  opacity: 0.8;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.phone-icon {
  font-size: 18px;
}

.address {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  margin: 0;
}

.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-img {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;
  background: #fff;
}

.qr-label {
  font-size: 12px;
  color: #aaa;
  margin-top: 6px;
}

/* ---- 导航列 ---- */
.footer-nav {
  display: flex;
  gap: 48px;
}

.nav-col h4 {
  font-size: 14px;
  color: #fff;
  margin-bottom: 16px;
  font-weight: 600;
}

.nav-col ul li {
  margin-bottom: 10px;
}

.nav-col ul li a {
  font-size: 13px;
  color: #999;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-col ul li a:hover {
  color: #fff;
}

/* ---- 底部版权 ---- */
.footer-bottom {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.footer-bottom a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-bottom a:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
  }

  .footer-nav {
    flex-wrap: wrap;
    gap: 24px 40px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
