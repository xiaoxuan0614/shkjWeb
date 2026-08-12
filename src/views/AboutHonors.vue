<template>
  <section class="honors-section">
    <div class="container">
      <!-- 标题 -->
      <div class="honors-header">
        <h2>资质荣誉</h2>
        <div class="honors-line"></div>
      </div>

      <!-- 奖杯 + 证书墙 -->
      <div class="honors-content">
        <!-- 左侧奖杯 -->
        <div class="honors-trophy">
          <img v-img-oss :src="trophySrc" alt="冠军奖杯" class="trophy-img">
        </div>

        <!-- 右侧证书墙 -->
        <div class="honors-cert-wall">
          <img v-img-oss :src="certWallSrc" alt="资质证书墙" class="cert-wall-img">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const trophySrc = ref('/images/case/chan.png')
const certWallSrc = ref('/images/case/cert-wall.jpg')
</script>

<style scoped>
.honors-section {
  padding: 60px 0 80px;
  background: #fff;
}

.honors-header {
  margin-bottom: 50px;
}

.honors-header h2 {
  font-size: 32px;
  color: #333;
  font-weight: 700;
  margin-bottom: 16px;
}

.honors-line {
  width: 40px;
  height: 2px;
  background: #1a3c7c;
}

.honors-content {
  display: flex;
  align-items: flex-start;
  gap: 60px;
}

.honors-trophy {
  flex-shrink: 0;
  width: 200px;
  display: flex;
  justify-content: center;
}

.trophy-img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 8px 20px rgba(212, 168, 67, 0.3));
}

.honors-cert-wall {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f9f6ee, #f0e6c8);
  min-height: 400px;
}

.cert-wall-img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 768px) {
  .honors-content {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  .honors-trophy {
    width: 150px;
  }
  .honors-cert-wall {
    min-height: auto;
    height: auto;
    overflow: visible;
  }
}
</style>
