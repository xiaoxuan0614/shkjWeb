<template>
  <section class="philosophy-section">
    <div class="container">
      <div class="philosophy-content">
        <div class="philosophy-item">
          <div class="philosophy-icon blue">🎯</div>
          <div>
            <h3>企业使命</h3>
            <p>以科技创新赋能物流行业数字化转型，推动智慧物流发展，为客户创造更大价值。</p>
          </div>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-icon green">⭐</div>
          <div>
            <h3>企业愿景</h3>
            <p>成为集装箱物流智能化综合服务商，打造智慧物流行业标杆。</p>
          </div>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-icon purple">💡</div>
          <div>
            <h3>核心价值观</h3>
            <p>创新驱动、客户至上、合作共赢、持续精进。以技术创新为核心驱动力，始终将客户需求放在首位。</p>
          </div>
        </div>
        <div class="philosophy-item">
          <div class="philosophy-icon orange">🤝</div>
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
</script>

<style scoped>
.philosophy-section {
  padding: 60px 0;
  background: #fff;
}

.philosophy-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.philosophy-item {
  display: flex;
  gap: 24px;
  padding: 30px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: all 0.3s;
}

.philosophy-item:hover {
  border-color: #1a3c7c;
  box-shadow: 0 6px 20px rgba(26, 60, 124, 0.08);
}

.philosophy-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.philosophy-icon.blue { background: linear-gradient(135deg, #e8f0fe, #d0e2ff); }
.philosophy-icon.green { background: linear-gradient(135deg, #e8f8f0, #d0f0e0); }
.philosophy-icon.purple { background: linear-gradient(135deg, #f0e8fe, #e0d0ff); }
.philosophy-icon.orange { background: linear-gradient(135deg, #fef0e8, #ffd0c0); }

.philosophy-item h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.philosophy-item p {
  font-size: 14px;
  color: #888;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .philosophy-content {
    grid-template-columns: 1fr;
  }
}
</style>
