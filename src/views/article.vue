 <template>
  <div class="container">
    <el-card>
       <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
       <el-breadcrumb-item>内容管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-radio-group >
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
  <el-select placeholder="请选择">
    <el-option>
    </el-option>
     <el-option>
    </el-option>
  </el-select>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
    <span>卡片名称</span>

  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  position: relative;
}
</style>
