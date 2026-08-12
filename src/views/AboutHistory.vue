<template>
  <section class="history-section">
    <div class="container">
      <div class="history-title-area">
        <h2>大事记</h2>
        <div class="en-title">SHKJ HISTORY</div>
      </div>

      <!-- 年份切换区：左右箭头 + 5个年份卡片 -->
      <div class="timeline-slider">
        <button class="slider-arrow slider-arrow--left" :disabled="activeYear === newestYear" @click="slideLeft">
          <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>

        <div class="timeline-viewport">
          <div class="timeline-track">
            <div
              v-for="(year, i) in visibleYears"
              :key="year"
              class="timeline-year"
              :class="{ active: activeYear === String(year) }"
              @click="pickYear(year)"
            >
              <div class="year-num">{{ year }}</div>
              <div class="dot"></div>
            </div>
          </div>
        </div>

        <button class="slider-arrow slider-arrow--right" :disabled="activeYear === oldestYear" @click="slideRight">
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
  padding: 60px 0;
  background: #fff;
}

.history-title-area {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.history-title-area h2 {
  font-size: 32px;
  color: #1a3c7c;
  font-weight: 700;
}

.en-title {
  font-size: 48px;
  color: #f0f2f5;
  font-weight: 700;
  letter-spacing: 4px;
}

/* ---- 年份滑块 ---- */
.timeline-slider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.slider-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #d0d5dc;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s;
  color: #666;
}

.slider-arrow:hover:not(:disabled) {
  background: #1a3c7c;
  border-color: #1a3c7c;
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
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  flex: 1;
  transition: transform 0.3s;
}

.timeline-year:hover {
  transform: translateY(-2px);
}

.timeline-year .year-num {
  font-size: 24px;
  font-weight: 700;
  color: #999;
  margin-bottom: 12px;
  transition: color 0.3s, font-size 0.3s;
}

.timeline-year.active .year-num {
  color: #1a3c7c;
  font-size: 32px;
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
  background: #1a3c7c;
  box-shadow: 0 0 0 4px rgba(26, 60, 124, 0.15);
}

/* ---- 事件面板 ---- */
.timeline-event {
  display: none;
}

.timeline-event.active {
  display: block;
}

.timeline-event-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.timeline-event-header h3 {
  font-size: 22px;
  color: #333;
  font-weight: 600;
}

.year-big {
  font-size: 48px;
  font-weight: 700;
  color: #1a3c7c;
}

.timeline-list {
  position: relative;
  padding-left: 40px;
}

.timeline-list::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e8e8e8;
}

.timeline-item {
  position: relative;
  padding: 16px 0;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: -33px;
  top: 24px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1a3c7c;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #1a3c7c;
}

.date-badge {
  display: inline-block;
  font-size: 13px;
  color: #1a3c7c;
  background: #e8f0fe;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 8px;
}

.timeline-item p {
  font-size: 14px;
  color: #555;
  line-height: 1.8;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .history-title-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .en-title {
    font-size: 24px;
  }
  .timeline-event-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
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
  .history-title-area h2 {
    font-size: 24px;
  }
  .en-title {
    font-size: 20px;
  }
  .timeline-year .year-num {
    font-size: 18px;
  }
  .timeline-year.active .year-num {
    font-size: 24px;
  }
  .year-big {
    font-size: 30px;
  }
}
</style>
