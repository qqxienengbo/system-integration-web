import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import SystemItem from '../views/SystemItem.vue'
import Login from '@/views/Login.vue'
import Cookies from 'js-cookie'
import AdminIndex from '@/views/Admin/AdminIndex.vue'
import Me from '@/views/Me.vue'

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
        {
          path: '/AdminIndex',
          name: 'AdminIndex',
          component: AdminIndex
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
