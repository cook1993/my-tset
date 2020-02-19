import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store/index'
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import article from '@/views/article'
import NotFound from '@/views/404'

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
    },
    {
      path: '*',
      name: 'Not',
      component: NotFound
    }
  ]

})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) {
    return next('/login')
  }
  next()
})
export default router
