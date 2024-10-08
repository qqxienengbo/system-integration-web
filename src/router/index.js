import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import SystemItem from '../views/SystemItem.vue'
import Login from '@/views/Login.vue'
import Cookies from 'js-cookie'
import AUserM from '@/views/Admin/AUserM.vue'
import ASystemM from '@/views/Admin/ASystemM.vue'
import Me from '@/views/Me.vue'
import ALayout from '@/views/Admin/ALayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: '/SystemItem',
          name: 'SystemItem',
          component: SystemItem
        },
        {
          path: '/ALayout',
          name: 'ALayout',
          component: ALayout,
          children:[
            {
              path:'/AUserM',
              name:'AUserM',
              component:AUserM
            },
            {
              path:'/ASystemM',
              name:'ASystemM',
              component:ASystemM
            },
          ]
        },
        {
          path: '/Me',
          name: 'Me',
          component: Me
        },
      ]
    },
  ]
})

//路由守卫
router.beforeEach((to,form)=>{
  if(Cookies.get('user')===null&&to.name!='Login'){
    return {name:'Login'}
  }else{
    return true
  }
})
export default router
