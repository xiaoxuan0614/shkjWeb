<template>
  <footer class="footer">
    <div class="container">
      <!-- 顶部 Logo + 联系信息 -->
      <div class="footer-top">
        <div class="footer-brand">
          <img v-img-oss src="/images/logo/logo-white.png" alt="首汇科技" class="footer-logo">
          <div class="footer-contact-info">
            <div class="contact-row">
              <svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.5 3.5 10 8 8.4 9.7a15.2 15.2 0 0 0 5.9 5.9L16 14l4.5 2.5-.9 3.1c-.2.7-.9 1.2-1.7 1.1C10.3 19.8 4.2 13.7 3.3 6.1c-.1-.8.4-1.5 1.1-1.7l3.1-.9Z" />
              </svg>
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
              <li><router-link to="/products/ge-mds-master-station">数传电台</router-link></li>
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
  background: #0e2b58;
  color: #cbd5e3;
  padding: 64px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* ---- 顶部 ---- */
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 72px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 300px;
  align-items: flex-start;
}

.footer-logo {
  height: 42px;
  width: auto;
  display: block;
  object-fit: contain;
}

.footer-contact-info .phone {
  font-size: 22px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: color var(--motion-fast);
}

.footer-contact-info .phone:hover {
  color: #8fb3ff;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.phone-icon {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: #8fb3ff;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.address {
  font-size: 13px;
  color: #afbdd0;
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
  padding: 4px;
  object-fit: cover;
  background: #fff;
}

.qr-label {
  font-size: 12px;
  color: #afbdd0;
  margin-top: 6px;
}

/* ---- 导航列 ---- */
.footer-nav {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  gap: 40px;
}

.nav-col h4 {
  font-size: 15px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 600;
}

.nav-col ul li {
  margin-bottom: 11px;
}

.nav-col ul li a {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  font-size: 13px;
  color: #b6c3d4;
  text-decoration: none;
  transition: color var(--motion-fast);
}

.nav-col ul li a:hover {
  color: #fff;
}

/* ---- 底部版权 ---- */
.footer-bottom {
  min-height: 72px;
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #96a7bd;
}

.footer-bottom a {
  color: #96a7bd;
  text-decoration: none;
  transition: color var(--motion-fast);
}

.footer-bottom a:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
  }

  .footer-nav {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 24px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer { padding-top: 48px; }
  .footer-brand { min-width: 0; }
}
</style>
