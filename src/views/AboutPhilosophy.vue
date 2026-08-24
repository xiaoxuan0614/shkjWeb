<template>
  <section class="philosophy-section">
    <div class="container">
      <AboutSectionLead
        english="Corporate Philosophy"
        title="企业理念"
        summary="以技术创新回应行业需求，以稳定交付和长期服务持续为客户创造价值。"
      />
      <div class="philosophy-content">
        <div class="philosophy-item">
          <div class="philosophy-icon blue" aria-hidden="true">
            <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="5"/><path d="M16 5V2M27 16h3M16 27v3M5 16H2"/></svg>
          </div>
          <div>
            <h3>企业使命</h3>
            <p>以科技创新赋能物流行业数字化转型，推动智慧物流发展，为客户创造更大价值。</p>
          </div>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-icon green" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M16 3 20 11l9 1.3-6.5 6.3L24 28l-8-4.3L8 28l1.5-9.4L3 12.3l9-1.3L16 3Z"/></svg>
          </div>
          <div>
            <h3>企业愿景</h3>
            <p>成为集装箱物流智能化综合服务商，打造智慧物流行业标杆。</p>
          </div>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-icon purple" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M10 20a9 9 0 1 1 12 0c-2 1.5-2.5 3-2.5 4h-7c0-1-.5-2.5-2.5-4Z"/><path d="M13 28h6M16 1v3M4 7l2.5 2M28 7l-2.5 2"/></svg>
          </div>
          <div>
            <h3>核心价值观</h3>
            <p>创新驱动、客户至上、合作共赢、持续精进。以技术创新为核心驱动力，始终将客户需求放在首位。</p>
          </div>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-icon orange" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="m3 12 6-5 6 4-4 4 3 3 4-4 5 5-6 7-5-2-9-8v-4Z"/><path d="m29 12-6-5-5 3M8 20l3-3M11 23l3-3"/></svg>
          </div>
          <div>
            <h3>经营理念</h3>
            <p>诚信为本、质量为先、服务至上。坚持长期主义，与客户建立长久共赢的合作关系。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AboutSectionLead from '../components/AboutSectionLead.vue'
</script>

<style scoped>
.philosophy-section {
  padding: 88px 0 104px;
  background: var(--bg-light);
}

.philosophy-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 56px;
  background: #fff;
}

.philosophy-item {
  display: flex;
  gap: 22px;
  min-height: 190px;
  padding: 38px 28px;
  background: transparent;
  border: 0;
}

.philosophy-item:nth-last-child(-n + 2) { border-bottom: 0; }

.philosophy-icon {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.philosophy-icon svg {
  width: 28px;
  height: 28px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.philosophy-icon.blue,
.philosophy-icon.green,
.philosophy-icon.purple,
.philosophy-icon.orange {
  color: var(--brand-light);
  background: var(--brand-soft);
}

.philosophy-item h3 {
  margin-bottom: 12px;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 700;
}

.philosophy-item p {
  max-width: 48ch;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.85;
}

@media (max-width: 768px) {
  .philosophy-section { padding: 64px 0 76px; }
  .philosophy-content {
    grid-template-columns: 1fr;
  }
  .philosophy-item {
    min-height: 0;
    padding: 28px 0;
  }
  .philosophy-item:nth-last-child(2) { border-bottom: 1px solid var(--border-color); }
}
</style>
