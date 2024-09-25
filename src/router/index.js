import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import SystemItem from '../views/SystemItem.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect:'/SystemItem',
      children:[
        {
          path: '/SystemItem',
          name: 'SystemItem',
          component: SystemItem
        },
      ]
    },
  ]
})

export default router
