import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { solutionData } from '../data/solutions-data'
import { productData } from '../data/products-data'
import { caseData } from '../data/cases-data'

const validSolution = (to) => Boolean(solutionData[to.params.id]) || { path: '/404', replace: true }
const validProduct = (to) => Boolean(productData.details[to.params.id]) || { path: '/404', replace: true }
const validCase = (to) => Boolean(caseData.some((item) => item.id === to.params.id)) || { path: '/404', replace: true }

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/solutions', component: () => import('../views/Solutions.vue') },
  { path: '/solutions/:id', component: () => import('../views/SolutionDetail.vue'), beforeEnter: validSolution },
  { path: '/cases', component: () => import('../views/Cases.vue') },
  { path: '/cases/:id', component: () => import('../views/CaseDetail.vue'), beforeEnter: validCase },
  { path: '/news', component: () => import('../views/News.vue') },
  { path: '/news/:id', component: () => import('../views/NewsDetail.vue') },
  { path: '/products', component: () => import('../views/Products.vue') },
  { path: '/products/:id', component: () => import('../views/ProductDetail.vue'), beforeEnter: validProduct },
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
  { path: '/404', component: () => import('../views/NotFound.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

export function createAppRouter(ssr = false) {
  return createRouter({
    history: ssr
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes,
  })
}
