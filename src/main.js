import Vue from 'vue'
import App from './App.vue'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router'
Vue.use(Elementui)
// 控制台信息更加详细
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
