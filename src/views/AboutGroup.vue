<template>
  <section class="about-content">
    <div class="container">
      <AboutSectionLead
        english="Shouhui Technology Tianjin Co., Ltd"
        title="首汇科技（天津）有限公司"
        summary="2019 年成立于天津滨海新区，专注集装箱物流行业数字化建设，面向运输、中转、堆存与管控等全业务场景提供一站式数字化升级服务。"
      />

      <div class="about-overview">
        <figure class="company-image">
          <img
            v-img-oss
            src="/images/case/shkjphoto.png"
            alt="首汇科技办公楼外景"
            width="2560"
            height="1266"
            loading="lazy"
          >
          <figcaption>立足天津，服务集装箱物流数字化升级</figcaption>
        </figure>

        <div class="about-text">
          <p>企业深耕 AI 智能感知、物联网、数字孪生、5G边缘计算等技术，完成软硬件集成与国产化适配，拥有多项软件著作权，核心技术自主可控。团队均具备 10 年以上行业实战经验，构建起从方案设计到落地运维的全链条服务能力。历经多年发展，业务辐射国内四大核心区域，合作MSC、胜狮国际等50余家知名企业，打造多个标杆案例，环保平台注册车辆超 10 万台，综合实力获得行业高度认可。</p>
          <p>我们立足集装箱物流全流程痛点打造定制化方案，赋能产业降本增效、绿色发展。未来，企业将持续迭代技术与产品，助力传统物流场站转型升级，致力于成为集装箱物流智能化综合服务商。</p>
        </div>
      </div>

      <dl class="about-stats" aria-label="公司关键数据">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <dt class="number">{{ stat.number }}<span v-if="stat.more" class="number-more">{{ stat.more }}</span><sup v-if="stat.unit">{{ stat.unit }}</sup></dt>
          <dd class="label">{{ stat.label }}</dd>
        </div>
      </dl>

      <section class="advantage-section" aria-labelledby="advantage-title">
        <div class="advantage-heading">
          <h3 id="advantage-title">持续沉淀的服务能力</h3>
          <p>从核心技术到项目交付，形成面向真实作业场景的完整能力体系。</p>
        </div>
        <ul class="advantage-grid">
          <li class="advantage-item" v-for="adv in advantages" :key="adv.title">
            <strong>{{ adv.title }}</strong>
            <span>{{ adv.desc }}</span>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script setup>
import AboutSectionLead from '../components/AboutSectionLead.vue'

const stats = [
  { number: '2019', unit: ' 年', label: '集团成立' },
  { number: '10', unit: ' 万', label: '环保注册' },
  { number: '50', more: '+', unit: ' 位', label: '合作客户' },
  { number: '30', more: '+', unit: ' 项', label: '技术专利' },
]

const advantages = [
  { title: '自研核心技术', desc: '知识产权雄厚' },
  { title: '资深专业团队', desc: '行业积淀深厚' },
  { title: '全链路服务体系', desc: '一站式交付' },
  { title: '高精度智能应用', desc: '作业效能突出' },
  { title: '广泛项目落地', desc: '标杆案例众多' },
  { title: '规模化实战验证', desc: '系统稳定可靠' },
]
</script>

<style scoped>
.about-content {
  padding: 88px 0 104px;
  background: var(--bg-light);
}

.about-overview {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  gap: 56px;
  align-items: center;
  margin-bottom: 64px;
}

.company-image {
  margin: 0;
}

.company-image img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.company-image figcaption {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 13px;
}

.about-text {
  padding: 0 0 0 40px;
  background: transparent;
  border: 0;
  border-left: 1px solid var(--border-color);
}

.about-text p {
  margin-bottom: 18px;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.95;
}

.about-text p:last-child { margin-bottom: 0; }

.about-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 0 88px;
  padding: 30px 0;
  background: #fff;
}

.stat-item {
  padding: 0 28px;
  border-right: 1px solid var(--border-color);
}

.stat-item:last-child { border-right: 0; }
.stat-item .number {
  color: var(--brand-primary);
  font-size: clamp(32px, 3vw, 42px);
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.number-more { font-size: 0.55em; }
.stat-item .number sup {
  margin-left: 3px;
  font-size: 13px;
  font-weight: 500;
}

.stat-item .label {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: 13px;
}

.advantage-section {
  padding: 50px 0;
  border-radius: 14px;
}

.advantage-heading {
  margin: 0 auto 42px;
}

.advantage-heading h3 {
  margin: 0 0 12px;
  color: var(--text-primary);
  font-size: clamp(26px, 3vw, 34px);
  line-height: 1.3;
}

.advantage-heading p {
  margin: 0 auto;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.8;
}

.advantage-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 0 0 1px var(--border-color);
}

.advantage-item {
  position: relative;
  display: flex;
  min-height: 140px;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  padding: 32px;
  background-color: #fff;
}

.advantage-item:not(:nth-child(3n + 1)) {
  border-left: 1px solid var(--border-color);
}

.advantage-item:nth-child(n + 4) {
  border-top: 1px solid var(--border-color);
}

.advantage-item::before {
  content: '';
  width: 26px;
  height: 2px;
  margin-bottom: 6px;
  background: var(--brand-light);
}

.advantage-item strong {
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.45;
}

.advantage-item span {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-content { padding: 64px 0 76px; }
  .about-overview {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .about-text {
    padding: 24px 0 0;
    border-top: 1px solid var(--border-color);
    border-left: 0;
  }
  .about-stats {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 64px;
  }
  .stat-item {
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
  }
  .stat-item:nth-child(2n) { border-right: 0; }
  .stat-item:nth-last-child(-n + 2) { border-bottom: 0; }
  .advantage-section { padding: 40px 28px 0; }
  .advantage-heading { margin-bottom: 32px; }
  .advantage-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .advantage-item { padding: 28px 24px; }
  .advantage-item:not(:nth-child(3n + 1)) { border-left: 0; }
  .advantage-item:not(:nth-child(2n + 1)) { border-left: 1px solid var(--border-color); }
  .advantage-item:nth-child(n + 3) { border-top: 1px solid var(--border-color); }
}

@media (max-width: 520px) {
  .advantage-section {
    padding: 36px 20px 0;
    border-radius: 12px;
  }
  .advantage-grid {
    grid-template-columns: 1fr;
  }
  .advantage-item {
    min-height: 112px;
    padding: 24px 8px;
    border-left: 0 !important;
  }
  .advantage-item:nth-child(n + 2) { border-top: 1px solid var(--border-color); }
}
</style>
