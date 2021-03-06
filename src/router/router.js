import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store/index'
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import article from '@/views/article'
import image from '@/views/image'
import publish from '@/views/publish'
import fans from '@/views/fans'
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
        },
        {
          path: '/image',
          name: 'image',
          component: image
        },
        {
          path: '/publish',
          name: 'publish',
          component: publish
        },
        {
          path: '/fans',
          name: 'fans',
          component: fans
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
