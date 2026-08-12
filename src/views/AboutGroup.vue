<template>
  <section class="about-content">
    <div class="container">
      <!-- 公司简介头部 -->
      <div class="about-header">
        <!-- 左侧统计数据 -->
        <div>
          <h1 style="font-size:28px;color:#333;margin-bottom:8px;font-weight:700;">首汇科技（天津）有限公司</h1>
          <p style="font-size:15px;color:#999;margin-bottom:30px;">Shouhui Technology Tianjin Co., Ltd</p>
          <div class="about-stats">
            <div class="stat-item" v-for="stat in stats" :key="stat.label">
              <div class="number">{{ stat.number }}<span v-if="stat.more" style="font-size: 18px;">{{ stat.more }}</span>
                <sup v-if="stat.unit">{{ stat.unit }}</sup>
              </div>
              <div class="label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- 右侧文字介绍 -->
        <div class="about-text">
          <p>首汇科技（天津）有限公司 2019 年成立于天津滨海新区，是专注集装箱物流行业数字化建设的高新技术企业。公司恪守发展理念，聚焦集装箱运输、中转、堆存、管控等全业务场景，打造完整智能产品体系，为行业客户输出一站式数字化升级服务。</p>
          <p>企业深耕 AI 智能感知、物联网、数字孪生、5G边缘计算等技术，完成软硬件集成与国产化适配，拥有多项软件著作权，核心技术自主可控。团队均具备 10 年以上行业实战经验，构建起从方案设计到落地运维的全链条服务能力。历经多年发展，业务辐射国内四大核心区域，合作MSC、胜狮国际等50余家知名企业，打造多个标杆案例，环保平台注册车辆超 10 万台，综合实力获得行业高度认可。</p>
          <p>我们立足集装箱物流全流程痛点打造定制化方案，赋能产业降本增效、绿色发展。未来，企业将持续迭代技术与产品，助力传统物流场站转型升级，致力于成为集装箱物流智能化综合服务商。</p>
        </div>
      </div>

      <!-- 集团优势 -->
      <div class="about-image-grid">
        <div class="image-placeholder">
        <img v-img-oss src="/images/case/shkjphoto.png" alt="">
        </div>
        <div>
          <h3 class="advantage-title">集团优势</h3>
          <div class="advantage-grid">
            <div class="advantage-card" v-for="adv in advantages" :key="adv">
              <h4 v-html="adv"></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { number: '2019', unit: ' 年', label: '集团成立' },
  { number: '10', unit: ' 万', label: '环保注册' },
  { number: '50', more: '+', unit: ' 位', label: '合作客户' },
  { number: '30', more: '+', unit: ' 项', label: '技术专利' },
]

const advantages = [
  '自研核心技术<br>知识产权雄厚',
  '资深专业团队<br>行业积淀深厚',
  '全链路服务体系<br>一站式交付',
  '高精度智能应用<br>作业效能突出',
  '广泛项目落地<br>标杆案例众多',
  '规模化实战验证<br>系统稳定可靠',
]
</script>

<style scoped>
.about-content {
  padding: 60px 0;
}

.about-header {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  margin-bottom: 60px;
  align-items: start;
}

.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.stat-item {
  text-align: left;
}

.stat-item .number {
  font-size: 36px;
  font-weight: 700;
  color: #1a3c7c;
}

.stat-item .number sup {
  /* font-size: 16px; */
  font-weight: 400;
  font-size: 14px;
  vertical-align: bottom;
}

.stat-item .label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.about-text p {
  font-size: 14px;
  color: #555;
  line-height: 2;
  text-indent: 2em;
  margin-bottom: 16px;
}

.about-image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid #eee;
}

.image-placeholder {
  width: 100%;
  height: 283px;
  background: linear-gradient(135deg, #e8f0fe, #d0e2ff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a3c7c;
  font-size: 14px;
}

.advantage-title {
  font-size: 22px;
  color: #333;
  margin-bottom: 24px;
  border-radius: 12px;
  font-weight: 600;
}

.advantage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.advantage-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 30px 24px;
  text-align: center;
  transition: all 0.3s;
}

.advantage-card:hover {
  border-color: #1a3c7c;
  box-shadow: 0 6px 20px rgba(26, 60, 124, 0.1);
}

.advantage-card h4 {
  font-size: 15px;
  color: #333;
  line-height: 1.8;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .about-header {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .about-image-grid {
    grid-template-columns: 1fr;
  }
  .advantage-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .page-breadcrumb {
    right: auto;
    left: 20px;
  }
}

@media (max-width: 480px) {
  .about-stats {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .stat-item .number {
    font-size: 28px;
  }
  .advantage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
