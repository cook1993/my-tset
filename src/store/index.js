// 存储用户信息 toekn
const KEY = 'my-test'
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
