<template>
  <div class="container">
    <el-card>
       <div slot="header">
            <my-bread >{{articleId ?'编写文章':'发布文章'}}</my-bread>
        </div>
        <div>
          <el-form  :model="form" label-width="80px" label-position=left>
               <el-form-item label="标题:">
              <el-input v-model="form.title"></el-input >
             </el-form-item>
              <el-form-item label="内容:">
              <quill-Editor  :options=editorOption v-model="form.content"></quill-Editor>
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
              <el-form-item label="频道:" >
                <my-choole  v-model="form.channel_id"></my-choole>
               </el-form-item>
        <el-form-item v-if="this.articleId">
               <el-button type="primary" @click="submit(false)">修改</el-button>
               <el-button  @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
               <el-button type="primary" @click="update(false)">发布</el-button>
               <el-button  @click="update(true)">存入草稿</el-button>
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
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },

      // 文章id
      articleId: null,
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
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    // 获取指定文章
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      console.log(data)
      this.form = data
      // console.log(this.form)
    },
    // 当选取再次点击时清空
    change () {
      this.form.cover.images = []
    },

    // 修改文章
    async submit (draft) {
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.form)
      this.$message.success(draft ? '存为草稿' : '修改成功')
      this.$router.push('/article')
    },
    // 发布文章
    async update (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.form)
      this.$message.success(draft ? '存为草稿' : '修改成功')
      this.$router.push('/article')
    }

  },
  watch: {
    // 不仅仅是data中的数据才可以去监听 $route实例的数据
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.form = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  }
}
</script>

<style  lang="less" scoped>
.container{
  position: relative;

}

</style>
