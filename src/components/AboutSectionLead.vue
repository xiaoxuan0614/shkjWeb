<template>
  <header class="about-section-lead">
    <p class="about-section-en">{{ english }}</p>
    <h2 :id="headingId" class="about-section-title">{{ title }}</h2>
    <p class="about-section-summary">{{ summary }}</p>
  </header>
</template>

<script setup>
defineProps({
  english: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  headingId: {
    type: String,
    default: undefined,
  },
})
</script>

<style scoped>
.about-section-lead {
  max-width: 1200px;
  margin-bottom: 48px;
}

.about-section-en {
  margin-bottom: 12px;
  color: var(--brand-light);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about-section-title {
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: clamp(30px, 3.4vw, 44px);
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.about-section-summary {
  max-width: 1200px;
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.85;
}

@media (max-width: 768px) {
  .about-section-lead { margin-bottom: 40px; }
  .about-section-summary { font-size: 16px; }
}
</style>
