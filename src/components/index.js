// 封装插件 注册自己所有的components下的组件为全局的
import MyBread from '@/components/my-bread.vue'
import MyImage from '@/components/my-image.vue'
import MyChoole from '@/components/my-choole.vue'
export default {
  install (vue) {
    vue.component(MyBread.name, MyBread)
    vue.component(MyImage.name, MyImage)
    vue.component(MyChoole.name, MyChoole)
  }
}
