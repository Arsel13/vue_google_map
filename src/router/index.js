import { createRouter, createWebHistory } from 'vue-router'
import AddAddress from '../views/AddAddress.vue'
import NoPage from '../views/NoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'add-address',
      component: AddAddress
    },
    {
      path: '/:catchAll(.*)',
      name: 'no-page',
      component: NoPage
    }
  ]
})

export default router
