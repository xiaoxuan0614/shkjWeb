<template>
  <div>
    <!-- Hero Banner -->
    <section class="hero-banner" style="background: linear-gradient(135deg, #0a1e50 0%, #1a3c7c 40%, #2d5bbf 100%);">
      <div class="hero-overlay">
        <h1>科技赋能物流 智慧引领未来</h1>
        <p>专业的智慧堆场解决方案供应商</p>
      </div>
    </section>

        <!-- 产品展示 -->
    <section class="section product-list-section">
      <div class="container">
        <div class="section-title">
          <h2>产品展示</h2>
          <p>全系智能产品，软硬协同、全域赋能，一站式解锁智慧场站新体验</p>
          <!-- <p style="font-size:13px;color:#888;margin-top:8px;">全系智能产品，软硬协同、全域赋能，一站式解锁智慧场站新体验</p> -->
          <div class="section-title-line"></div>
        </div>

        <!-- 四大产品图标 -->
        <div class="product-icons">
          <div
            v-for="(item, index) in productList"
            :key="item.name"
            :class="['product-icon-item', { active: activeProductIndex === index }]"
            @mouseenter="activeProductIndex = index"
            @click="navigateTo('/solutions')"
          >
            <div class="product-icon-wrap">
              <!-- <svg viewBox="0 0 48 48" width="40" height="40">
                <path :fill="item.color" v-html="item.icon"></path>
              </svg> -->
              <img v-img-oss :src="item.icon" :alt="item.title">
            </div>
            <span class="product-icon-name">{{ item.name }}</span>
          </div>
        </div>

        <!-- 对应图片 -->
        <div class="product-images">
          <div
            v-for="(item, index) in productList"
            :key="item.name"
            class="product-image-card"
            @mouseenter="activeProductIndex = index"
          >
            <div class="product-image-bg" :style="{ backgroundImage: item.bg }"></div>
            <div class="product-image-overlay">
              <div class="product-image-label">{{ item.name }}</div>
              <div class="product-image-desc">{{ item.shortDesc }}</div>
              <div class="product-tags">
                <span v-for="tag in item.tags" :key="tag" class="product-tag">{{ tag }}</span>
              </div>
              <a class="btn-view-detail" @click.prevent="navigateTo('/solutions')">查看详情</a>
            </div>
            <img v-img-oss :src="item.image" :alt="item.name" class="product-image" onerror="this.style.display='none'">
          </div>
        </div>
      </div>
    </section>
    <!-- 选择首汇 -->
    <section class="section why-section">
      <div class="container">
        <div class="section-title">
          <h2>选择首汇</h2>
          <p>赋能传统堆场转型，共建智慧产业新生态</p>
          <div class="section-title-line"></div>
        </div>

        <div class="why-grid">
          <div
            v-for="item in whyItems"
            :key="item.title"
            class="why-item"
          >
            <div class="why-icon" :class="item.colorClass">
              <img v-img-oss :src="item.icon" :alt="item.title">
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新动态 -->
    <section class="section news-section">
      <div class="container">
        <div class="news-header">
          <h2>最新动态</h2>
          <router-link to="/news" class="btn-more">查看全部新闻</router-link>
        </div>

        <div class="news-grid">
          <!-- 第一条：占满整行 -->
          <div
            v-if="latestNews.length > 0"
            class="news-card news-card--featured"
            @click="openArticle(latestNews[0])"
          >
          <div>
            <!-- <img v-if="latestNews[0].images && latestNews[0].images" :src="latestNews[0].images" :alt="latestNews[0].title" class="news-card-img" onerror="this.style.display='none'"> -->
            <img v-if="latestNews[0].cover" referrerpolicy="no-referrer" :src="latestNews[0].cover" :alt="latestNews[0].title" class="news-card-img" onerror="this.style.display='none'">
          </div>
            <div class="news-card-body">
              <h4>{{ latestNews[0].title }}</h4>
              <div class="news-card-footer">
                <span class="news-date">{{ latestNews[0].digest }}</span>
                <svg class="card-arrow" viewBox="0 0 16 16" width="16" height="16">
                  <path d="M3 8h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- 剩余3条：一行3列 -->
          <div
            v-for="news in latestNews.slice(1, 4)"
            :key="news.title"
            class="news-card"
            @click="openArticle(news)"
          >
          <div>
            <!-- <img v-if="latestNews[0].images && latestNews[0].images" :src="latestNews[0].images" :alt="latestNews[0].title" class="news-card-img" onerror="this.style.display='none'"> -->
            <img v-if="news.cover" referrerpolicy="no-referrer" :src="news.cover" :alt="news.title" class="news-card-img" onerror="this.style.display='none'">
          </div>
            <div class="news-card-body">
              <!-- <span class="news-tag">{{ news.source || '公众号' }}</span> -->
              <h4>{{ news.title }}</h4>
              <div class="news-card-footer">
                <span class="news-date">{{ news.digest }}</span>
                <svg class="card-arrow" viewBox="0 0 16 16" >
                  <path d="M3 8h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 合作客户 -->
    <section class="clients-section">
      <div class="container">
        <div class="section-title" style="margin-bottom:40px;">
          <h2>合作客户</h2>
          <div class="section-title-line"></div>
        </div>
        <div class="clients-grid">
          <div
            v-for="client in clients"
            :key="client.name"
            class="client-logo"
            :title="client.name"
          >
            <img
              v-if="client.img"
              v-img-oss
              :src="client.img"
              :alt="client.name"
              class="client-img"
              @error="handleImgError"
            />
            <span v-else class="client-name">{{ client.name }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'

const router = useRouter()
const currentSlide = ref(0)
const slides = ref(3)
let timer = null
const latestNews = ref([])

// 加载最新4条新闻，失败则回退到本地 JSON
async function loadLatestNews() {
  try {
    const data = await request.get('/api/articles?page=0&size=10')
    latestNews.value = data.articles.slice(0, 4)
  } catch {
      latestNews.value = []
  }
}

const activeSolutionTab = ref('无人闸口')
const activeProductIndex = ref(0)
const cardsScroll = ref(null)
const scrollX = ref(0)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)
let touchStartX = 0
let touchScrollLeft = 0

const solutionTabs = ['无人闸口', '数字运营', '安全监管', '硬件矩阵']

const productList = [
  {
    name: '智能闸口系统',
    icon: '/images/choose-icon/gate.png',
    color: '#1a3c7c',
    shortDesc: '以AI视觉识别与自动化管控为核心，构建全流程无人化闸口',
    tags: ['箱号识别', '铅封派发', '无人地磅', '线上预约'],
    image: '/images/case/gate3.jpg',
    bg: 'linear-gradient(135deg, #1a3c7c, #2d5bbf)',
  },
  {
    name: '数字场站建设',
    icon: '/images/choose-icon/yard.png',
    color: '#2d5bbf',
    shortDesc: '核心业务管理系统，打造场站一体化数字运营中枢',
    tags: ['YMS空重箱', 'CFS拆装箱', '智能调度', 'WMS仓储物料','SAMA船货代理'],
    image: '/images/case/yard2.jpg',
    bg: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  },  
  {
    name: '安全合规监管',
    icon: '/images/choose-icon/safety.png',
    color: '#4286f4',
    shortDesc: '全方位安全监控、风险预警、合规审计',
    tags: ['人车安全监管', '360°环视', '海关在途监管','环保门禁'],
    image: '/images/case/safety.jpg',
    bg: 'linear-gradient(135deg, #373b44, #4286f4)',
  },
  {
    name: '硬件网络基建',
    icon: '/images/choose-icon/hardware.png',
    color: '#2193b0',
    shortDesc: 'IoT设备接入、5G网络覆盖、边缘计算支持',
    tags: ['国产设备', '打印扫码', '车载终端', '无线通信基站', '国产工控机'],
    image: '/images/case/hardware.png',
    bg: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
  },
]


// 无人闸口 tab 对应卡片
const gateCards = [
  {
    title: '集装箱号码识别系统',
    desc: '自研AI视频流识别技术，精准秒级采集车号、箱号、箱型、重量、铅封及箱况残损检测，联动TOS系统实现无人化自动放行，全程影像留痕可追溯',
    image: '/images/solutions/gate-ai.png',
  },
  {
    title: '铅封自动派发系统',
    desc: '兼容全球船公司铅封，发放准确率100%，司机扫码3秒完成自助出封，库存自动预警，与闸口、TOS系统联动形成闭环管控',
    image: '/images/solutions/seal-machine.png',
  },
  {
    title: '网上自助营业厅',
    desc: '移动端线上业务平台，支持预约、线上缴费、电子发票、海关预约，错峰分流，全流程无纸化办公',
    image: '/images/solutions/online-hall.png',
  },
]

// 数字场站 tab 对应卡片
const yardCards = [
  {
    title: '堆场TOS管理系统',
    desc: '场站核心运营中枢，覆盖空箱、CFS、修箱全业务，可视化场位管理，智能分配箱位降低翻捣成本',
    image: '/images/solutions/tos-system.png',
  },
  {
    title: '智能调度平台',
    desc: 'AI多重派单算法，统筹拖车资源减少空驶，订单轨迹实时可视，计费对账开票一体化闭环结算',
    image: '/images/solutions/schedule-platform.png',
  },
  {
    title: '物料WMS管理系统',
    desc: '一物一码批次溯源，覆盖采购、入库、领用、盘点全流程，扫码无纸化作业，库存数据精准可控',
    image: '/images/solutions/wms-system.png',
  },
  {
    title: '智能理货APP',
    desc: '移动无纸化理货终端，现场拍照即时存档，数据毫秒同步后台，作业效率提升60%，杜绝纸质单据差错',
    image: '/images/solutions/tally-app.png',
  },
  {
    title: '叉车智能称重系统',
    desc: '单人完成称重理货一体化作业，人力成本降低50%，盘点效率大幅提升，订单录入零人工误差',
    image: '/images/solutions/forklift-weigh.png',
  },
  {
    title: '全域数据可视化大屏',
    desc: '整合闸口、堆场、车辆核心运营指标，多维度实时展示，作业异常自动预警，数据驱动精细化管理',
    image: '/images/solutions/data-screen.png',
  },
]

// 安全监管 tab 对应卡片
const safetyCards = [
  {
    title: '场区人车安全监管系统',
    desc: '北斗RTK+UWB多模融合定位，全场人车实时可视，电子围栏自动报警，实现场区安全主动预判管控',
    image: '/images/solutions/location-safety.png',
  },
  {
    title: '流机360°安全环视系统',
    desc: '堆高机/叉车全景无盲区画面，AI识别行人、疲劳驾驶，分级声光预警，作业事故全程录像可追溯',
    image: '/images/solutions/360-view.png',
  },
  {
    title: '智慧安防综合平台',
    desc: '集成视频监控、人脸识别门禁、访客管理，AI智能行为分析降低误报，PC/手机远程统一管控',
    image: '/images/solutions/security-platform.png',
  },
  {
    title: '海关在途监管系统',
    desc: '北斗定位+加密电子关锁，转关运输全程轨迹监控，防拆防篡改，自动卡口核验，大幅提升通关效率',
    image: '/images/solutions/customs-lock.png',
  },
]
// 硬件矩阵 tab 对应卡片
const hardwareCards = [
  {
    title: '工业手持智能终端',
    desc: 'IP68高防护5G手持PDA，抗摔宽温适配，极速扫码识别，适配闸口、理货、仓库巡检全场景',
    image: '/images/solutions/handheld-pda.png',
  },
  {
    title: '工业打印扫码设备',
    desc: '金属机身工业打印机、全解码扫描器、智能贴标机，户外耐磨损，贴标打印效率提升3倍',
    image: '/images/solutions/print-scan.png',
  },
  {
    title: '场车载智能终端',
    desc: '10.1寸高亮车载显示屏，IP65抗震防护，适配叉车、正面吊，支持业务下发、视频环视联动',
    image: '/images/solutions/truck-terminal.png',
  },
  {
    title: '室外无线通信基站',
    desc: 'IP67防雷宽温基站，远距离大范围覆盖港口堆场，保障场内设备网络稳定不间断传输',
    image: '/images/solutions/wireless-ap.png',
  },
  {
    title: '国产化工业工控机',
    desc: '海光CPU+麒麟国产系统，无风扇防尘多接口，7×24小时稳定运行，支撑闸口、调度后台算力',
    image: '/images/solutions/industrial-ipc.png',
  },
]

// 根据tab动态显示对应卡片
const allSolutionCards = computed(() => {
  const map = {
    '无人闸口': gateCards,
    '数字运营': yardCards,
    '安全监管': safetyCards,
    '硬件矩阵': hardwareCards,
  }
  return map[activeSolutionTab.value] || []
})

const whyItems = ref([
  { title: '一站式服务', desc: '覆盖咨询、设计、研发、实施、运维全环节', colorClass: 'blue', icon: '/images/choose-icon/service.png' },
  { title: '国产化适配', desc: '深度适配国产化软硬件生态', colorClass: 'green', icon: '/images/choose-icon/computer.png' },
  { title: '技术自主可控', desc: '核心技术自主研发，拥有多项软著', colorClass: 'purple', icon: '/images/choose-icon/technology.png' },
  { title: '定制化方案', desc: '深度适配需求，架构安全可靠', colorClass: 'cyan', icon: '/images/choose-icon/custom.png' },
  { title: '高性价比', desc: '支持原有设备利旧改造，严控成本', colorClass: 'yellow', icon: '/images/choose-icon/price.png' },
  { title: '全天候运维', desc: '7×24小时应急响应服务', colorClass: 'orange', icon: '/images/choose-icon/maintenance.png' },
])

const clients = ref([
  { name: '天津港集团', img: 'images/clients/tianjin-port.png' },
  { name: '河北港口集团', img: 'images/clients/hebei-port.png' },
  { name: '锦州港', img: 'images/clients/jinzhou-port.png' },
  { name: '辽港集团', img: 'images/clients/liaoning-port.png' },
  { name: '山东省港口集团', img: 'images/clients/shandong-port.png' },
  { name: 'MSC', img: 'images/clients/msc.png' },
  { name: '中远海运', img: 'images/clients/cosco.png' },
  { name: '中谷海运', img: 'images/clients/zhonggu-valuable.png' },
  { name: '欧亚码头', img: 'images/clients/ouya.png' },
  { name: '中国外运', img: 'images/clients/sinotrans.png' },
  { name: '中国五矿', img: 'images/clients/mmgroup.png' },
  { name: '中国物流', img: 'images/clients/china-logistics.png' },
  { name: 'SINGAMAS', img: 'images/clients/singamas.png' },
  { name: 'Sanly 鑫三利', img: 'images/clients/sanly.png' },
  { name: '长荣海运', img: 'images/clients/evergreen.png' },
  { name: '中铁联集', img: 'images/clients/crct.png' },
  { name: '博达集团', img: 'images/clients/boda.png' },
  { name: '首钢集团', img: 'images/clients/shougang.png' },
  { name: '万鑫泰物流', img: 'images/clients/wanxincai.png' },
  { name: '太阳纸业', img: 'images/clients/taiyang.png' },
])

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.value) % slides.value
}

function goToSlide(index) {
  currentSlide.value = index
}

function navigateTo(path) {
  router.push(path)
}

function openArticle(news) {
  if (news.link) {
    const newWindow = window.open(news.link, '_blank')
    if (newWindow) {
      newWindow.opener = null
      newWindow.rel = 'noopener noreferrer'
    }
  }
}

// ---- 卡片左右滑动 ----
function updateScrollState() {
  if (!cardsScroll.value) return
  const el = cardsScroll.value
  const maxScroll = el.scrollWidth - el.clientWidth
  canScrollLeft.value = scrollX.value > 0
  canScrollRight.value = scrollX.value < maxScroll
}

function scrollLeft() {
  if (!cardsScroll.value) return
  scrollX.value -= 360
  if (scrollX.value < 0) scrollX.value = 0
  cardsScroll.value.scrollLeft = scrollX.value
  updateScrollState()
}

function scrollRight() {
  if (!cardsScroll.value) return
  const maxScroll = cardsScroll.value.scrollWidth - cardsScroll.value.clientWidth
  scrollX.value += 360
  if (scrollX.value > maxScroll) scrollX.value = maxScroll
  cardsScroll.value.scrollLeft = scrollX.value
  updateScrollState()
}

function handleWheel(e) {
  if (!cardsScroll.value) return
  const dir = e.deltaY > 0 ? 1 : -1
  scrollX.value += dir * 60
  scrollX.value = Math.max(0, Math.min(scrollX.value, cardsScroll.value.scrollWidth - cardsScroll.value.clientWidth))
  cardsScroll.value.scrollLeft = scrollX.value
  updateScrollState()
}

function touchStart(e) {
  touchStartX = e.touches[0].clientX
  touchScrollLeft = cardsScroll.value?.scrollLeft ?? 0
}

function touchMove(e) {
  if (!cardsScroll.value) return
  const diff = touchStartX - e.touches[0].clientX
  cardsScroll.value.scrollLeft = touchScrollLeft + diff
  scrollX.value = cardsScroll.value.scrollLeft
  updateScrollState()
}

function touchEnd() {
  updateScrollState()
}

function handleImgError(e) {
  // 图片加载失败时回退到文字显示
  e.target.style.display = 'none'
  const nameSpan = e.target.parentElement.querySelector('.client-name')
  if (nameSpan) nameSpan.style.display = 'block'
}

onMounted(() => {
  timer = setInterval(nextSlide, 5000)
  // 卡片滚动状态
  setTimeout(updateScrollState, 100)
  window.addEventListener('resize', updateScrollState)
  loadLatestNews()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', updateScrollState)
})
</script>

<style scoped>
.hero-banner {
  position: relative;
  height: 400px;
  background: var(--brand-gradient);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}

.hero-overlay h1 {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 4px;
  margin-bottom: 16px;
}

.hero-overlay p {
  font-size: 16px;
  opacity: 0.85;
  letter-spacing: 2px;
}

.hero-arrows {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.hero-arrow {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background 0.3s;
}

.hero-arrow:hover {
  background: rgba(255, 255, 255, 0.35);
}

.hero-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.3s;
}

.hero-dot.active {
  background: #fff;
}

.section { padding: 80px 0; }
.section-title { text-align: center; margin-bottom: 50px; }
.section-title h2 { font-size: 28px; color: var(--brand-primary); margin-bottom: 12px; font-weight: 700; }
.section-title p { font-size: 15px; color: var(--text-secondary); max-width: 600px; margin: 0 auto; }
.section-title-line { width: 50px; height: 3px; background: var(--brand-primary); margin: 16px auto 0; border-radius: 2px; }

.solutions-section {
  background: var(--bg-light);
}

.solutions-tabs {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 50px;
  margin-top: 30px;
}

.solutions-tab {
  padding: 12px 32px;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  border-radius: 24px;
  border: 1px solid #d0d8e4;
  background: #fff;
  transition: all 0.3s;
}

.solutions-tab:hover {
  border-color: #5b7fc4;
  color: #1a3c7c;
}

.solutions-tab.active {
  background: #5b7fc4;
  color: #fff;
  border-color: #5b7fc4;
}

.solution-cards-wrapper {
  position: relative;
}

.solution-cards-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 4px;
}

.solution-cards-scroll::-webkit-scrollbar {
  display: none;
}

.solution-card {
  flex: 0 0 340px;
  background: var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  scroll-snap-align: start;
}

.solution-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(26, 60, 124, 0.12);
}

.solution-card-img {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, var(--brand-primary), var(--brand-light));
  overflow: hidden;
}

.solution-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.solution-card-body {
  padding: 24px;
}

.solution-card-body h4 {
  font-size: 17px;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 12px;
}

.solution-card-body p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

.btn-detail {
  display: inline-block;
  padding: 8px 24px;
  border: 1px solid var(--brand-primary);
  border-radius: 4px;
  color: var(--brand-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-detail:hover {
  background: var(--brand-primary);
  color: var(--white);
}

/* ---- 左右箭头 ---- */
.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--white);
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: var(--text-primary);
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.scroll-arrow:hover {
  background: var(--brand-primary);
  color: var(--white);
  border-color: var(--brand-primary);
}

.scroll-arrow-left {
  left: -22px;
}

.scroll-arrow-right {
  right: -22px;
}

.why-section { background: var(--white); }

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
}

.why-item {
  text-align: center;
  padding: 0 10px;
  transition: transform 0.3s;
}

.why-item:hover {
  transform: translateY(-4px);
}

.why-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

.why-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.why-icon svg {
  width: 56px;
  height: 56px;
}

.why-icon.blue svg { fill: #1a3c7c; }
.why-icon.green svg { fill: #2ecc71; }
.why-icon.purple svg { fill: #9b59b6; }
.why-icon.cyan svg { fill: #1abc9c; }
.why-icon.yellow svg { fill: #f39c12; }
.why-icon.orange svg { fill: #e74c3c; }

.why-item h3 {
  font-size: 17px;
  color: var(--brand-primary);
  margin-bottom: 12px;
  font-weight: 600;
}

.why-item p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.9;
}

/* ---- 产品清单 ---- */
.product-list-section {
  background: var(--white);
  padding-bottom: 0;
}

.product-icons {
  display: flex;
  justify-content: center;
  gap: 0;
  margin-bottom: 50px;
  border-bottom: 1px dashed #c0d4f0;
  padding-bottom: 0;
}

.product-icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 40px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  flex: 1;
  max-width: 260px;
}

.product-icon-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: #e0e0e0;
}

.product-icon-item:hover,
.product-icon-item.active {
  color: var(--brand-primary);
}

.product-icon-item.active .product-icon-name {
  font-weight: 700;
}

.product-icon-wrap {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  transition: transform 0.3s;
}

.product-icon-item:hover .product-icon-wrap,
.product-icon-item.active .product-icon-wrap {
  transform: scale(1.1);
}

.product-icon-name {
  font-size: 15px;
  color: #666;
  font-weight: 500;
  transition: color 0.3s;
}

.product-icon-item.active .product-icon-name {
  color: #1a3c7c;
  font-weight: 700;
}

.product-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-bottom: 60px;
}

.product-image-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-image-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.product-image-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.product-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.product-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 30%, rgba(0, 0, 0, 0.7));
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-image-card:hover .product-image-overlay {
  opacity: 1;
}

.product-image-label {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.product-image-desc {
  font-size: 13px;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 12px;
}

.product-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.product-tag {
  font-size: 11px;
  padding: 3px 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 3px;
  color: #fff;
  white-space: nowrap;
}

.btn-view-detail {
  display: inline-block;
  padding: 8px 24px;
  background: #1a5fa0;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
  align-self: flex-start;
}

.btn-view-detail:hover {
  background: #1a3c7c;
}

.news-section { background: #f5f6f8; }

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.news-header h2 {
  font-size: 26px;
  color: #1a3c7c;
  font-weight: 700;
}

.btn-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 14px;
  color: #1a3c7c;
  border: 1px solid #1a3c7c;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-more:hover {
  background: #1a3c7c;
  color: #fff;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.news-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

/* 第一条：占满整行 */
.news-card--featured {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.news-card--featured .news-card-body {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news-card--featured h4 {
  font-size: 18px;
}

.news-card-body {
  padding: 18px 20px;
}

.news-card-body h4 {
  font-size: 14px;
  color: #333;
  /* margin-bottom: 8px; */
  /* 固定行高 + 固定2行总高度，卡片不会因标题长短高低不齐 */
  line-height: 1.5;
  height: calc(1.5em * 2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card--featured .news-card-body h4 {
  -webkit-line-clamp: 1;
  line-clamp: 1;
  font-size: 18px;
}

.news-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}

/* 重点：:deep() 穿透 */
:deep(.card-arrow) {
  color: #ccc;
  transition: color 0.3s, transform 0.3s;
  width: 16px;
  height: 16px;
  padding-left: 4px;
  flex-shrink: 0; /* 防止图标被压缩变小！重点！ */
}

.news-card:hover :deep(.card-arrow) {
  color: var(--brand-primary);
  transform: translateX(3px);
}
/* .card-arrow {
  color: #ccc;
  transition: color 0.3s, transform 0.3s;
  width: 20px;
  height: 20px;
}

.news-card:hover .card-arrow {
  color: #1a3c7c;
  transform: translateX(4px);
} */

.news-date { 
  font-size: 12px; 
  color: #aaa; 
   /* 限制显示2行 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /* 超出隐藏 */
    overflow: hidden;
    /* 末尾显示省略号 ... */
    text-overflow: ellipsis;
}

.clients-section {
  background: #fff;
  padding: 60px 0;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.client-logo {
  background: #f9fafb;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  transition: border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.client-logo:hover {
  border-color: #1a3c7c;
  box-shadow: 0 4px 15px rgba(26, 60, 124, 0.08);
}

.client-img {
  max-width: 100%;
  max-height: 70px;
  width: auto;
  height: auto;
  object-fit: contain;
}

.client-name {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  display: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .solution-card {
    flex: 0 0 280px;
  }
  .scroll-arrow {
    display: none;
  }
  .solutions-tabs { flex-wrap: wrap; }
  .clients-grid { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 768px) {
  .solution-card {
    flex: 0 0 280px;
  }
  .scroll-arrow {
    display: none;
  }
  .solutions-tabs { flex-wrap: wrap; }
  .news-grid { grid-template-columns: 1fr; }
  .news-card--featured { grid-template-columns: 1fr; }
  .clients-grid { grid-template-columns: repeat(3, 1fr); }
  .hero-banner { height: 300px; }
  .hero-overlay h1 { font-size: 24px; }
  .hero-overlay p { font-size: 14px; }
  .section-title h2 { font-size: 22px; }
  .product-icons { flex-wrap: wrap; gap: 0; }
  .product-icon-item { padding: 16px 20px; }
  .product-images { grid-template-columns: repeat(2, 1fr); }
  .why-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
  .why-item h3 { font-size: 15px; }
  .why-item p { font-size: 12px; }
}

@media (max-width: 480px) {
  .hero-banner { height: 220px; }
  .hero-overlay h1 { font-size: 20px; letter-spacing: 2px; }
  .hero-overlay p { font-size: 12px; }
  .section { padding: 40px 0; }
  .section-title { margin-bottom: 30px; }
  .section-title h2 { font-size: 20px; }
  .product-images { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .clients-grid { grid-template-columns: repeat(2, 1fr); }
  .btn-more { padding: 8px 16px; font-size: 13px; }
}
</style>
