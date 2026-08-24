<template>
  <section class="honors-section">
    <div class="container">
      <AboutSectionLead
        english="Qualifications &amp; Honors"
        title="资质荣誉"
        summary="以自主技术、规范交付和实际项目成果为基础，持续积累企业资质与行业认可。"
      />

      <!-- 奖杯 + 证书墙 -->
      <div class="honors-content">
        <!-- 左侧奖杯 -->
        <div class="honors-trophy">
          <img v-img-oss :src="trophySrc" alt="首汇科技所获荣誉奖杯" class="trophy-img" loading="lazy">
          <p>荣誉见证</p>
        </div>

        <!-- 右侧证书墙 -->
        <div class="honors-cert-wall">
          <img v-img-oss :src="certWallSrc" alt="首汇科技资质证书墙" class="cert-wall-img" loading="lazy">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import AboutSectionLead from '../components/AboutSectionLead.vue'

const trophySrc = ref('/images/case/chan.png')
const certWallSrc = ref('/images/case/cert-wall.jpg')
</script>

<style scoped>
.honors-section {
  padding: 88px 0 104px;
  background: var(--bg-light);
}

.honors-content {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  align-items: stretch;
  gap: 32px;
}

.honors-trophy {
  display: flex;
  min-height: 420px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  /* background: #fff; */
  /* border: 1px solid var(--border-color); */
  border-radius: 12px;
}

.trophy-img {
  width: min(100%, 170px);
  height: auto;
  filter: drop-shadow(0 12px 18px rgba(84, 66, 25, 0.2));
}

.honors-trophy p {
  margin-top: 24px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
}

.honors-cert-wall {
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  min-height: 420px;
  /* border: 1px solid var(--border-color); */
}

.cert-wall-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

@media (max-width: 768px) {
  .honors-section { padding: 64px 0 76px; }
  .honors-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .honors-trophy {
    min-height: 280px;
  }
  .honors-cert-wall {
    min-height: auto;
    height: auto;
    overflow: visible;
  }
}
</style>
