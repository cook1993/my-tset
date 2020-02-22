 <template>
  <div class="container">
    <!-- 筛选 -->
    <el-card>
        <div slot="header">
         <my-bread>内容管理</my-bread>
        </div>
      <el-form   label-width="80px">
       <el-form-item label="状态：">
          <el-radio-group v-model="radio">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">草稿</el-radio>
          <el-radio :label="2">待审核</el-radio>
          <el-radio :label="3">审核通过</el-radio>
          <el-radio :label="4">审核失败</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
        <el-select placeholder="请选择" v-model="value">
           <el-option  v-for="(item,id) in filterFrom" :key=id :value="item.name" >
          </el-option>
         </el-select>
        </el-form-item>
      <el-form-item label="日期：">
       <div class="block">
          <el-date-picker
           v-model="value1"
           type="daterange"
           value-format="yyyy-MM-dd"
           @change="changeDate"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
        </el-date-picker>
       </div>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="FliterChannels">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章列表 -->
    <el-card>
      <div slot="header" class="clearfix">
       <span>根据筛选条件共查询到 {{total}} 条结果：</span>
     </div>
    <div>
      <el-table
      :data="Article"
      style="width: 100%" >
      <el-table-column
        prop="images"
        label="封面"
        width="200"
       >
       <!-- scope相当于一行的数据， scope.row相当于当前行的数据对象 -->
       <template slot-scope="scope">
          <el-image
          style="width:120px;height:80px"
          :src="scope.row.cover.images[0]">
       <div slot="error">
       <img  src="@/assets/images/error.gif"  alt=""   style="width:120px;height:80px">
       </div></el-image>
       </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="250">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
              <el-tag   v-if="scope.row.status===1">待审核</el-tag>
              <el-tag type="success"  v-if="scope.row.status===2">审核通过</el-tag>
              <el-tag type="warning"  v-if="scope.row.status===3">审核失败</el-tag>
              <el-tag type="danger"  v-if="scope.row.status===4">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
        width="250">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" circle @click="getPublish(scope.row.id)"></el-button>
         <el-button type="danger" icon="el-icon-delete" circle @click="remove(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width:100%;height:60px;text-align:center;margin-top:30px">
        <el-pagination
         background
         layout="prev, pager, next"
         :total="total"
         :current-change="reqParams.page"
          :page-size="reqParams.per_page"
         @current-change="changePage"
         >
       </el-pagination>
    </div>
   </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 文章频道
      filterFrom: [],
      // 状态选则
      radio: '',
      // 下拉框的默认值
      value: '',
      // 时间
      value1: '',
      // 文章列表
      Article: [],
      // 文章总数
      total: 0
    }
  },
  created () {
    this.getArticle()
    this.getChannels()
  },
  methods: {
    // 日期处理
    changeDate (date) {
      // console.log(date)
      if (date) {
        this.reqParams.begin_pubdate = date[0]
        this.reqParams.end_pubdate = date[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选
    FliterChannels () {
      this.reqParams.page = 1
      this.getArticle()
      this.value = null
      this.value1 = null
      this.radio = null
    },
    // 获取下拉框数据
    async getChannels () {
      const { data: { data } } = await this.$http.get('channels')
      // console.log(data.channels)
      this.filterFrom = data.channels
    },
    // 获取文章列表
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data.results)
      this.Article = data.results
      this.total = data.total_count
      // console.log(this.total)
      // this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles', { params: this.reqParams })
      //   .then(res => {
      //     console.log(res)
      //   }).catch(err => {
      //     console.log(err)
      //   })
    },
    // 改变页数
    changePage (newPage) { // 参数是新的页数
      this.reqParams.page = newPage
      this.getArticle()
    },
    // 删除文章
    remove (id) {
      // console.log(id)

      // 弹出确认框 点击确认后  发删除请求  响应成功更新列表即可
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        await this.$http.delete(`articles/${id}`)
        // 这两句代码没有执行  上面一句代码报错  没有抛出这个错误id
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 编辑文章
    getPublish (id) {
      // console.log(id)
      this.$router.push('/publish?id=' + id)
    }
  }
}
</script>
<style scoped>
.container {
  position: relative;
}
</style>
