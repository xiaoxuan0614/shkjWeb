<template>
  <section class="history-section">
    <div class="container">
      <AboutSectionLead
        english="SHKJ History"
        title="发展大事记"
        summary="回顾首汇科技从成立至今的重要节点"
      />

      <!-- 年份切换区：左右箭头 + 5个年份卡片 -->
      <div class="timeline-slider">
        <button type="button" class="slider-arrow slider-arrow--left" aria-label="查看更新年份" :disabled="activeYear === newestYear" @click="slideLeft">
          <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>

        <div class="timeline-viewport">
          <div class="timeline-track">
            <button
              v-for="(year, i) in visibleYears"
              :key="year"
              type="button"
              class="timeline-year"
              :class="{ active: activeYear === String(year) }"
              :aria-pressed="activeYear === String(year)"
              @click="pickYear(year)"
            >
              <div class="year-num">{{ year }}</div>
              <div class="dot"></div>
            </button>
          </div>
        </div>

        <button type="button" class="slider-arrow slider-arrow--right" aria-label="查看更早年份" :disabled="activeYear === oldestYear" @click="slideRight">
          <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
        </button>
      </div>

      <!-- 各年事件 -->
      <div
        v-for="yearData in yearEvents"
        :key="yearData.year"
        class="timeline-event"
        :class="{ active: activeYear === String(yearData.year) }"
      >
        <div class="timeline-event-header">
          <div class="year-big">{{ yearData.year }}</div>
          <h3>{{ yearData.title }}</h3>
        </div>
        <div class="timeline-list">
          <div
            v-for="event in yearData.events"
            :key="event.date"
            class="timeline-item"
          >
            <span class="date-badge">{{ event.date }}</span>
            <p>{{ event.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import AboutSectionLead from '../components/AboutSectionLead.vue'
import { timelineData } from '../data/timeline-data'

const VISIBLE = 5
const reverseTimeline = [...timelineData].reverse()
const yearList = reverseTimeline.map(d => d.year)
const newestYear = String(yearList[0]) // "2026"
const oldestYear = String(yearList[yearList.length - 1]) // "2019"

const activeYear = ref(newestYear)

const startIndex = ref(0)
const endIndex = computed(() => Math.min(startIndex.value + VISIBLE, yearList.length))
const visibleYears = computed(() => yearList.slice(startIndex.value, endIndex.value))

const yearEvents = computed(() =>
  reverseTimeline.map(d => ({
    year: d.year,
    title: d.label,
    events: d.events.map(e => ({ date: e.period, desc: e.desc })),
  }))
)

function pickYear(year) {
  activeYear.value = String(year)
  const idx = yearList.indexOf(Number(year))
  if (idx === -1) return
  startIndex.value = Math.max(0, Math.min(idx, yearList.length - VISIBLE))
}

// 左箭头：年份增加（2021→2022→...），往更新的方向走
function slideLeft() {
  const idx = yearList.indexOf(Number(activeYear.value))
  if (idx <= 0) return
  const newIdx = Math.max(0, idx - 1)
  activeYear.value = String(yearList[newIdx])
  if (newIdx < startIndex.value) {
    startIndex.value = Math.max(0, newIdx)
  } else if (newIdx >= startIndex.value + VISIBLE) {
    startIndex.value = newIdx - VISIBLE + 1
  }
}

// 右箭头：年份回退（2026→2025→...），往更老的方向走
function slideRight() {
  const idx = yearList.indexOf(Number(activeYear.value))
  if (idx >= yearList.length - 1) return
  const newIdx = Math.min(yearList.length - 1, idx + 1)
  activeYear.value = String(yearList[newIdx])
  if (newIdx < startIndex.value) {
    startIndex.value = Math.max(0, newIdx)
  } else if (newIdx >= startIndex.value + VISIBLE) {
    startIndex.value = newIdx - VISIBLE + 1
  }
}
</script>

<style scoped>
.history-section {
  padding: 88px 0 104px;
  background: var(--bg-light);
}

/* ---- 年份滑块 ---- */
.timeline-slider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding: 22px 24px;
  /* background: #fff; */
  /* border: 1px solid var(--border-color); */
  border-radius: 12px;
}

.slider-arrow {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease;
  color: var(--text-secondary);
}

.slider-arrow:hover:not(:disabled) {
  background: var(--brand-light);
  border-color: var(--brand-light);
  color: #fff;
}

.slider-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.slider-arrow svg {
  display: block;
}

.timeline-viewport {
  overflow: hidden;
  flex: 1;
}

.timeline-track {
  display: flex;
  justify-content: space-between;
  gap: 0;
  position: relative;
}

.timeline-track::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #e8e8e8;
}

.timeline-year {
  min-height: 62px;
  padding: 6px;
  text-align: center;
  cursor: pointer;
  appearance: none;
  background: transparent;
  border: 0;
  font: inherit;
  position: relative;
  z-index: 1;
  flex: 1;
  transition: transform 0.3s;
}

.timeline-year:hover {
  transform: translateY(-2px);
}

.timeline-year .year-num {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-muted);
  margin-bottom: 12px;
  transition: color 0.3s, font-size 0.3s;
}

.timeline-year.active .year-num {
  color: var(--brand-primary);
  font-size: 28px;
}

.timeline-year .dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #e8e8e8;
  margin: 0 auto;
  transition: background 0.3s, box-shadow 0.3s;
}

.timeline-year.active .dot {
  background: var(--brand-light);
  box-shadow: 0 0 0 4px rgba(36, 75, 130, 0.14);
}

/* ---- 事件面板 ---- */
.timeline-event {
  display: none;
}

.timeline-event.active {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 56px;
  padding: 44px 48px;
}

.timeline-event-header {
  display: block;
}

.timeline-event-header h3 {
  margin-top: 10px;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 600;
}

.year-big {
  color: var(--brand-primary);
  font-size: 54px;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.timeline-list {
  position: relative;
  padding-left: 36px;
}

.timeline-list::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color);
}

.timeline-item {
  position: relative;
  padding: 4px 0 28px;
}

.timeline-item:last-child { padding-bottom: 4px; }

.timeline-item::before {
  content: "";
  position: absolute;
  left: -31px;
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--brand-light);
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px var(--brand-light);
}

.date-badge {
  display: inline-block;
  font-size: 13px;
  color: var(--brand-primary);
  background: var(--brand-soft);
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.timeline-item p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.85;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .history-section { padding: 64px 0 76px; }
  .timeline-slider {
    gap: 8px;
    padding: 16px 12px;
  }
  .timeline-event.active {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 32px 24px;
  }
  .year-big {
    font-size: 36px;
  }
  .timeline-list {
    padding-left: 30px;
  }
  .timeline-item::before {
    left: -23px;
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .timeline-year .year-num {
    font-size: 15px;
  }
  .timeline-year.active .year-num {
    font-size: 20px;
  }
  .year-big {
    font-size: 30px;
  }
}
</style>
