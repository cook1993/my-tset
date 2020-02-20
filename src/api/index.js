// 配置axios
import axios from 'axios'
import store from '@/store/index'
import router from '../router/router'
import jsonbigint from 'json-bigint'
// - 后端给我们返回的数据，axios获取后，使用JSON.parse进行默认转换
// - 转换后的ID和初始的后端给的ID不一致，ID的数值超出了js数字最大安全值。
axios.defaults.transformResponse = [(data) => {
  // 对 data 进行任意转换处理
  try {
    return jsonbigint.parse(data)
  } catch (e) {
    return data
  }
}
]
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，例如加入token
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截

axios.interceptors.response.use(function (response) {
  // 在接收响应做些什么，例如跳转到登录页
  return response
}, function (error) {
  // 401 用户未经认证 没有授权
  if (error.response.status === 401) {
    // this.$router.push('/login')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
