<template>
  <div>
    <el-card>
      <div slot="header">
       <my-bread>个人设置</my-bread>
       <div class="myform">
         <el-form ref="form" :model="form" label-width="80px" style="width:400px  ">
              <el-form-item label="编号">
              {{form.id}}
              </el-form-item>
                <el-form-item label="手机号">
             {{form.mobile}}
              </el-form-item>
                <el-form-item label="媒体名称">
              <el-input v-model="form.name" style="width:400px"></el-input>
              </el-form-item>
                <el-form-item label="媒体介绍">
                  <textarea name="" id="" v-model="form.intro" cols="30" rows="10" style="width:400px;height:100px"></textarea>
              </el-form-item>
                <el-form-item label="邮箱">
                <el-input v-model="form.email" style="width:400px"></el-input>
              </el-form-item>
               <el-form-item >
              <el-button type="success" @click="submit">保存设置</el-button>
              </el-form-item>
         </el-form>
        <div class="upload">
          <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="myupdate"
              >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width:200px;height:200px">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <p style="text-align:center;font-size:14px">修改头像</p>
</el-upload>
        </div>
       </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import store from '@/store/index'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      form: {
        id: '',
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      imageUrl: ''
    }
  },
  created () {
    this.getAuth()
  },
  methods: {
    async getAuth () {
      const { data: { data } } = await this.$http.get('user/profile')
      // console.log(data)
      this.form = data
      this.imageUrl = data.photo
    },
    // 自定义上传
    myupdate (results) {
      console.log(results)
      const formData = new FormData()
      formData.append('photo', results.file)
      this.$http.patch('user/photo', formData)
        .then(res => {
          console.log(res)
          this.$message.success('上传图片成功')
          this.imageUrl = res.data.photo
          store.setUser({ photo: this.imageUrl })
          eventBus.$emit('updataPhoto', this.imageUrl)
        })
    },
    async submit () {
      await this.$http.patch('user/profile',
        {
          name: this.form.name,
          intro: this.form.intro,
          emali: this.form.email
        })
      this.$message.success('编辑用户成功')
      store.setUser({ name: this.form.name })
      eventBus.$emit('updataName', this.form.name)
    }

  }

}
</script>

<style scoped>
.myform{
  position: relative;
}
.upload{
  position: absolute;
  top:100px;
  right:100px;
}
</style>
