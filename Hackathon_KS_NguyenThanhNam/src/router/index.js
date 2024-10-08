import App from '@/App.vue'
import DashBorad from '@/components/DashBorad.vue'
import ManagerProduct from '@/components/ManagerProduct.vue'
import ManagerUser from '@/components/ManagerUser.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: App
    },
    {
      path: '/admin',
      component: DashBorad,
      children: [
        {
        path: 'manager-user',
        component: ManagerUser
      }, {
        path: 'manager-product',
        component: ManagerProduct
      }]
    }
  ]
})

export default router
