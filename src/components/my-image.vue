<template>
<div>
    <div class="image">
        <img :src="value ||defaultImage " alt="" @click="opendialog">
   </div>
   <div>
     <el-dialog
         title="提示"
         :visible.sync="dialogVisible"
          width="800px"
          >
        <template>
            <el-tabs type="card" v-model="activename">
              <el-tab-pane label="素材库" name="image">
                <el-radio-group  style="margin-bottom: 30px;" v-model="resParams.collect" @change="changetab">
                     <el-radio-button label="false">全部</el-radio-button>
                     <el-radio-button label="true">收藏</el-radio-button>
                     <div class="imagelist" >
                       <div class="image2" v-for="item in image" :key="item.id" @click="choose(item.url)" :class="{choosestyle:imageurl===item.url}">
                         <img :src="item.url" alt="">
                       </div>
                       //分页
                       <el-pagination
                       v-if="total>resParams.per_page"
                          class="pagination"
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :page-size="resParams.per_page"
                            :current-page="resParams.page"
                            @current-change="changepage"
                            >
                        </el-pagination>
                     </div>
                </el-radio-group>
              </el-tab-pane>
              <el-tab-pane label="上传图片"  name="uplode" style="text-align:center">
                <el-upload
                   action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                   list-type="picture-card"
                   name="image"
                   :on-success="handleAvatarSuccess"
                   :headers="header"
                   >
                   <i class="el-icon-plus"></i>
               </el-upload>

               <img width="100%" :src="dialogImageUrl" alt="">

              </el-tab-pane>
           </el-tabs>
        </template>
         <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </span>
</el-dialog>
   </div>
</div>

</template>

<script>
import store from '@/store/index'
import defaultImage from '@/assets/images/pic_bg.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      activename: 'image',
      dialogVisible: false,
      resParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      image: [],
      total: 100,
      imageurl: null,
      dialogImageUrl: null,

      header: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      defaultImage
    }
  },
  created () {
    this.getimage()
  },
  methods: {
    async getimage () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.resParams })
      // console.log(data.results.url)
      this.image = data.results
      this.total = data.total_count
    },
    changepage (newPage) {
      this.resParams.page = newPage
      this.getimage()
    },
    changetab () {
      this.resParams.page = 1
      this.getimage()
    },
    choose (url) {
      // console.log(url)
      this.imageurl = url
    },
    handleAvatarSuccess (res) {
      console.log(res.data.url)
      this.dialogImageUrl = res.data.url
    },
    submit () {
      if (this.activename === 'image') {
        // this.value = this.imageurl
        this.$emit('input', this.imageurl)
      } else {
        // this.value = this.dialogImageUrl
        this.$emit('input', this.dialogImageUrl)
      }
      this.dialogVisible = false
    },
    opendialog () {
      this.dialogVisible = true
      this.imageurl = null
      this.dialogImageUrl = null
    }
  }

}
</script>

<style scoped lang="less">
.imagelist {
  width: 100%;
  height: 400px;
  position: relative;
  .pagination{
    position: absolute;
    bottom:0;
  }
}
.image2 {
  width: 150px;
  height: 100px;
  margin-top:20px;
  margin-right:10px;
  float:left;
  text-align: center;
  border:black 1px dotted;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  &.choosestyle{
    &::after{
      // .img-item.selected::after{}
      content:"";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
    }
  }
}
.image{
  width: 150px;
  height: 150px;
  border:steelblue 1px dotted;
  position: relative;
  img {
  width: 100%;
  height: 100%;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%)
}
}
.dialog-footer{
  display: block;
  width: 100%;
  text-align: center;
}
</style>
