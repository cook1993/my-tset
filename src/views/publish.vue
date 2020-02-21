<template>
  <div class="container">
    <el-card>
       <div slot="header">
            <my-bread>发布文章</my-bread>
        </div>
        <div>
          <el-form  :model="form" label-width="80px" label-position=left>
               <el-form-item label="标题:">
              <el-input v-model="form.title"></el-input >
             </el-form-item>
              <el-form-item label="内容:">
              <quill-Editor  :options=editorOption></quill-Editor>
             </el-form-item>
             <el-form-item label="封面:">
                    <el-radio-group v-model="form.cover.type" @click="change">
                       <el-radio :label="1">单图</el-radio>
                       <el-radio :label="3">三图</el-radio>
                       <el-radio :label="0">无图</el-radio>
                       <el-radio :label="-1">自动</el-radio>
                   </el-radio-group>
                   <div v-if="form.cover.type===1">
                         <my-image v-model="form.cover.images[0]"></my-image>
                   </div>
                   <div v-if="form.cover.type===3" >
                     <div >
                          <my-image v-model="form.cover.images[0]" style="float:left;margin-right:10px"></my-image>
                          <my-image v-model="form.cover.images[1]" style="float:left;margin-right:10px"></my-image>
                          <my-image v-model="form.cover.images[2]" style="float:left"></my-image>
                     </div>
                   </div>
             </el-form-item>
              <el-form-item label="频道:">
              <el-select  placeholder="请选择"   v-model="value">
                    <el-option  v-for="item in channels"
                      :key="item.id"  :value="item.name">
                     {{item.name}}
                  </el-option>
              </el-select>
        </el-form-item>
         <el-form-item >
               <el-button type="primary">发表</el-button>
               <el-button>存入草稿</el-button>
             </el-form-item>
          </el-form>

        </div>
    </el-card>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: ''
      },
      // 频道
      channels: [],
      value: '',
      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    this.getchannels()
  },
  methods: {
    // 当选取再次点击时清空
    change () {
      this.form.cover.images = []
    },
    async getchannels () {
      const { data: { data } } = await this.$http.get('channels')
      // console.log(data.channels)
      this.channels = data.channels
    }

  }

}
</script>

<style  lang="less" scoped>
.container{
  position: relative;

}

</style>
