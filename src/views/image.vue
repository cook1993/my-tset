<template>
<div class=container>
<div slot="header">
   <my-bread>素材管理</my-bread>
  </div>
  <div>
   <el-card class="box-card">
        <template>
        <el-radio-group v-model="reqParams.collect" style="margin-bottom: 30px;" @change="changeTab">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true" >收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" @click="dialogVisible = true">添加素材</el-button>
       </template>
       <div class="imageList" >
         <div class="image" v-for="item in image" :key="item.id">
             <img :src="item.url" alt="">
             <div class="footer" v-show="!reqParams.collect">
                <span class="el-icon-star-off" style="padding-right:30px" :class="{selected:item.is_collected}" @click="toggleCollect(item)" ></span>
                <span class="el-icon-delete" @click="delImage(item.id)"></span>
              </div>
         </div>
         <div class="pagination" >
            <el-pagination
              v-if="total>reqParams.per_page"
                 background
                 layout="prev, pager, next"
                 :total="total"
                 :page-size="reqParams.per_page"
                 :current-page="reqParams.page"
                 @current-change="changePage"
                 >
              </el-pagination>
       </div>
       </div>
       <!-- 弹出框 -->
             <el-dialog
              title="添加素材"
               :visible.sync="dialogVisible"
              width="300px"
              class="dialog"
              >
                 <el-upload
                      class="avatar-uploader"
                      action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                     :show-file-list="false"
                       :headers="uploadHeaders"
                      name="image"
                     :on-success="handleAvatarSuccess">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
             <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
         </el-dialog>
  </el-card>
  </div>
</div>
</template>
<script>
import store from '@/store/index'
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材
      image: [],
      // 素材总数
      total: 100,
      // 弹框
      dialogVisible: false,
      // 上传图片地址
      imageUrl: '',
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    // 获取素材
    async getImage () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      // console.log(data.results)
      this.image = data.results
      this.total = data.total_count
    },
    // 点击全部按钮时重新获取
    changeTab () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 换页
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    // 收藏或取消收藏
    async toggleCollect (item) {
      console.log(item)
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      // console.log(data)
      this.$message.success(data.collect ? '添加成功' : '取消收藏')
      item.is_collected = data.collect
    },
    // 删除素材
    delImage (id) {
      // console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功!')
        this.getImage()
      }).catch(() => {

      })
    },
    // 上传图片
    handleAvatarSuccess (res) {
      console.log(res.data.url)
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImage()
      }, 2000)
    }

  }

}
</script>
<style scoped>
.container{
  position: relative;
}
.imageList{
  width: 100%;
  height: 600px;
  position: relative;

}
.image {
  width:200px;
  height: 150px;
  float:left;
   margin-right:20px;
   margin-bottom:30px  ;
   position: relative;

}
img {
   width: 100%;
  height: 100%;

}
.footer{
  width: 200px;
  height: 30px;
  text-align: center;
  background-color:rgba(0,0,0,0.5);
  position: absolute;
  bottom:0;
  color:white;
}
.selected {
  color:red
}
.pagination{
  position: absolute;
  left:0;
  bottom:0;
}

.avatar-uploader{
  font-size: 50px;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border:thistle 1px solid;
  margin-left:28px
}
</style>
