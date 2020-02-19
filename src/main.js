import Vue from 'vue'
import App from './App.vue'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/router'
import Less from '@/style/index.less'
import axios from '@/api/index'
// 我的插槽在全局使用
import myCom from '@/components'

Vue.use(Elementui)
Vue.use(Less)
Vue.prototype.$http = axios
Vue.use(myCom)

// 控制台信息更加详细
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
