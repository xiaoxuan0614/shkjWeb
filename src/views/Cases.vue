<template>
  <div>
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <h1>CASES</h1>
        <h2>成功案例</h2>
      </div>
      <div class="page-breadcrumb">
        <router-link to="/">首页</router-link> &gt; 成功案例
      </div>
    </section>

    <!-- 案例列表 -->
    <section class="case-page-layout">
      <div class="container" style="padding-top:40px;padding-bottom:80px;">
        <!-- 筛选 -->
        <div class="case-filter">
          <div
            v-for="filter in filters"
            :key="filter"
            class="case-filter-btn"
            :class="{ active: activeFilter === filter }"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </div>
        </div>

        <!-- 案例网格 -->
        <div class="case-grid">
          <div
            v-for="(item, index) in paginatedCases"
            :key="item.id"
            class="case-card"
            @click="goToDetail(item.id)"
          >
            <div class="case-card-img">
              <img v-img-oss :src="item.coverImage" :alt="item.title" onerror="this.style.background='linear-gradient(135deg,#1a3c7c,#2d5bbf)';this.style.minHeight='240px'">
            </div>
            <div class="case-card-overlay">
              <div class="case-location">{{ item.location }}</div>
              <h4>{{ item.title }}</h4>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination" v-if="totalPages > 1">
          <div
            v-for="page in totalPages"
            :key="page"
            :class="['pagination-btn', { active: currentPage === page }]"
            @click.stop="currentPage = page"
          >{{ page }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { caseData } from '../data/cases-data'

const router = useRouter()
const activeFilter = ref('全部')
const currentPage = ref(1)
const pageSize = 10
const filters = ['全部', '智能闸口', '数字场站', '智慧安防', '硬件矩阵']

const filteredCases = computed(() => {
  if (activeFilter.value === '全部') return caseData
  return caseData.filter(c => c.category === activeFilter.value)
})

const totalPages = computed(() => Math.ceil(filteredCases.value.length / pageSize))

const paginatedCases = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCases.value.slice(start, start + pageSize)
})

// 切换筛选时重置页码
watch(activeFilter, () => { currentPage.value = 1 })

function goToDetail(id) {
  router.push(`/cases/${id}`)
}
</script>

<style scoped>
.page-hero {
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  background: var(--brand-gradient);
}

.page-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 30, 80, 0.75) 0%, rgba(26, 60, 124, 0.6) 100%);
}

.page-hero-content { position: relative; z-index: 1; }
.page-hero-content h1 { font-size: 42px; font-weight: 700; letter-spacing: 3px; margin-bottom: 8px; }
.page-hero-content h2 { font-size: 26px; font-weight: 400; opacity: 0.9; }

.page-breadcrumb {
  position: absolute;
  bottom: 20px;
  right: calc(50% - 600px);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 1;
}

.page-breadcrumb a {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
}

.page-breadcrumb a:hover {
  color: #fff;
}

.case-page-layout { background: var(--white); }

.case-filter {
  display: flex;
  gap: 0;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.case-filter-btn {
  padding: 10px 28px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
  background: var(--white);
}

.case-filter-btn:first-child { border-radius: 6px 0 0 6px; }
.case-filter-btn:last-child { border-radius: 0 6px 6px 0; }

.case-filter-btn:hover,
.case-filter-btn.active {
  background: var(--brand-primary);
  color: var(--white);
  border-color: var(--brand-primary);
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.case-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 240px;
  transition: transform 0.3s;
}

.case-card:hover {
  transform: translateY(-4px);
}

.case-card-img {
  width: 100%;
  height: 100%;
}

.case-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.case-card:hover .case-card-img img {
  transform: scale(1.05);
}

.case-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 40%, rgba(26, 60, 124, 0.85));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: var(--white);
  transition: background 0.3s;
}

.case-card:hover .case-card-overlay {
  background: linear-gradient(transparent 20%, rgba(26, 60, 124, 0.9));
}

.case-location {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  padding: 4px 12px;
  border-radius: 20px;
}

.case-card-overlay h4 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .case-grid {
    grid-template-columns: 1fr;
  }
  .case-filter {
    gap: 8px;
  }
  .case-filter-btn:first-child { border-radius: 6px; }
  .case-filter-btn:last-child { border-radius: 6px; }
  .page-breadcrumb {
    right: auto;
    left: 16px;
    bottom: 16px;
  }
  .page-hero-content h1 { font-size: 28px; }
  .page-hero-content h2 { font-size: 18px; }
}

/* ---- 分页 ---- */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 40px 0;
}

.pagination-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: var(--white);
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.pagination-btn:hover {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
}

.pagination-btn.active {
  background: var(--brand-primary);
  color: var(--white);
  border-color: var(--brand-primary);
}

@media (max-width: 480px) {
  .case-filter {
    flex-wrap: wrap;
  }
  .case-filter-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
  .pagination-btn {
    width: 36px;
    height: 36px;
    font-size: 13px;
  }
}
</style>
