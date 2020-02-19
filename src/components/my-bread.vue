<template>
   <div style="height:40px;width:100%;border-bottom:1px #ccc solid">
       <el-breadcrumb separator-class="el-icon-arrow-right">
       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
       <!-- <el-breadcrumb-item>内容管理</el-breadcrumb-item> -->
       <!-- 插槽 -->
       <slot></slot>
       </el-breadcrumb>
       </div>
</template>
<script>
export default {
  name: 'my-bread'
}
</script>
<style lang="less">

</style>
