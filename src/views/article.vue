 <template>
  <div class="container">
    <!-- <el-card>
       <div style="height:40px;width:100%;border-bottom:1px #ccc solid">
       <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item>内容管理</el-breadcrumb-item>
       </el-breadcrumb>
      </div>
      <el-form   label-width="80px">
       <el-form-item label="状态：">
          <el-radio-group >
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="6">草稿</el-radio>
          <el-radio :label="9">待审核</el-radio>
          <el-radio :label="9">审核通过</el-radio>
          <el-radio :label="9">审核失败</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
        <el-select placeholder="请选择">
           <el-option>
          </el-option>
         </el-select>
        </el-form-item>
      <el-form-item label="日期：">
       <el-date-picker
           type="datetimerange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
           <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card> -->
    <el-card>
      <div slot="header" class="clearfix">
       <span>根据筛选条件共查询到 {{}} 条结果：</span>
     </div>
    <div>
      <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="images"
        label="封面"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
   </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles', { params: this.data })
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
}
</style>
