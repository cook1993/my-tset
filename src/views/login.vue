<template>
  <div class="container" >
     <el-card class="box-card">
       <img src="../assets/images/logo_index.png" alt="">
       <el-form  :model="ruleFrom" class="form"  :rules=" rulelogin" ref="ruleFrom" label="left">
          <el-form-item  prop="moblie" label="电话号">
               <el-input style="width:300px" v-model="ruleFrom.moblie"  placeholder="请输入手机号"></el-input>
        </el-form-item>
         <el-form-item  prop="code"  label="验证码">
            <el-input style="width:180px" v-model="ruleFrom.code" placeholder="请输入验证码"></el-input>
            <el-button type="info" style="margin-left:20px;">发送信息</el-button>
         </el-form-item>
         <el-form-item>
            <el-checkbox  style="margin-left:20px;" :value="true">我已阅读并同意用户协议及隐私条款</el-checkbox>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" style="width:350px" @click="loginFrom(ruleFrom)">登录</el-button>
         </el-form-item>
       </el-form>
     </el-card>
  </div>
</template>
<script>

export default {
  data: function () {
    const checkPhone = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) { return callback(new Error('手机号格式不对')) }
      callback()
    }
    return {
      // 表单参数
      ruleFrom: {
        mobile: '18330679707',
        code: '246810'
      },
      rulelogin: {
        moblie: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { length: 6 }
        ]
      }
    }
  },
  methods: {
    loginFrom () {
      this.$refs.ruleFrom.validate(valid => {
        if (valid) {
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.ruleFrom
            )
            .then(res => {
              console.log(res)
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              // 错误提示
              this.$message.error('用户名或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../assets/images/login_bg.jpg)  no-repeat center/cover  ;
  }
.box-card {
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  width: 400px;

}
img {
  position: absolute;
  left:50%;
  top:5%;
  transform: translate(-50%,-5%);
  width: 200px;
}
.form {
  width: 400px;
  margin-top:80px;
  text-align: left
}
</style>
