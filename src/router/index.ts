import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },

    {
      path: '/IncomeDetails',
      name: 'IncomeDetails',
      component: () => import('../views/IncomeDetails.vue'),
      meta: { title: '收入纳税明细' },
    },
    {
      path: '/DetailView',
      name: 'DetailView',
      component: () => import('../views/DetailView.vue'),
      meta: { title: '收入明细' },
    },
  ],
})

export default router
