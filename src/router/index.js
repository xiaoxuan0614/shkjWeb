import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/solutions', component: () => import('../views/Solutions.vue') },
  { path: '/solutions/:id', component: () => import('../views/SolutionDetail.vue') },
  { path: '/cases', component: () => import('../views/Cases.vue') },
  { path: '/cases/:id', component: () => import('../views/CaseDetail.vue') },
  { path: '/news', component: () => import('../views/News.vue') },
  { path: '/news/:id', component: () => import('../views/NewsDetail.vue') },
  { path: '/products', component: () => import('../views/Products.vue') },
  { path: '/products/:id', component: () => import('../views/ProductDetail.vue') },
  {
    path: '/about',
    component: () => import('../views/AboutLayout.vue'),
    children: [
      { path: '', component: () => import('../views/AboutGroup.vue') },
      { path: 'history', component: () => import('../views/AboutHistory.vue') },
      { path: 'philosophy', component: () => import('../views/AboutPhilosophy.vue') },
      { path: 'honors', component: () => import('../views/AboutHonors.vue') },
    ]
  },
  { path: '/contact', component: () => import('../views/Contact.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
//百度统计 SPA页面上报
router.afterEach((to) => {
  if(window._hmt){
    window._hmt.push(['_trackPageview', to.fullPath])
  }
})
export default router
