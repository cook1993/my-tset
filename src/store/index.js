// 存储用户信息 toekn
const KEY = 'my-test'
export default {
  setUser (user) {
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
