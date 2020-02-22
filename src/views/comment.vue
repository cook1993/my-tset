<template>
  <div>
    <el-card>
        <div slot="header">
         <my-bread>评论管理</my-bread>
         </div>
         <div>
             <el-table :data="commentData" style="width: 100%">
                     <el-table-column prop="title" label="标题" width="180">
                     </el-table-column>
                    <el-table-column prop="total_comment_count" label="总评论数" width="180">
                     </el-table-column>
                      <el-table-column prop="fans_comment_count" label="粉丝评论数" width="180">
                    </el-table-column>
                   <el-table-column  label="状态" width="180">
                     <template slot-scope="scope">
                      {{scope.row.comment_status?"打开":"关闭"}}
                     </template>
                   </el-table-column>
                  <el-table-column  label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="success"  v-if="!scope.row.comment_status"  @click="open(scope.row)">打开评论</el-button>
                        <el-button type="danger"  @click="open(scope.row)"  v-else>关闭评论</el-button>
                    </template>
                 </el-table-column>
             </el-table>
             <el-pagination
                 background
                 layout="prev, pager, next"
                 :total="total"
                 :page-size="reqParame.per_page"
                 :current-page="reqParame.page"
                 @current-change="changePage">
                </el-pagination>
         </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParame: {
        response_type: 'comment',
        page: 1,
        per_page: 50
      },
      commentData: [],
      total: 100
    }
  },
  created () {
    this.getcomment()
  },
  methods: {
    async  getcomment () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParame })
      console.log(data)
      this.commentData = data.results
      this.total = data.total_count
    },
    changePage (newPage) {
      this.reqParame.page = newPage
      this.getcomment()
    },
    // 打开评论
    async open (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`,
        { allow_comment: !row.comment_status })
      // console.log(data)
      this.$message.success(data.allow_comment ? '打开评论' : '关闭评论')
      row.comment_status = data.allow_comment
    }
  }

}
</script>

<style>

</style>
