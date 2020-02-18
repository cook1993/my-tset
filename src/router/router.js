import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import article from '@/views/article'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: welcome
        },
        {
          path: '/article',
          name: 'artice',
          component: article
        }
      ]
    }
  ]
})
export default router
