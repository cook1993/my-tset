<template>
  <div>
    <el-select  placeholder="请选择" @change="fn" :value="value">
          <el-option  v-for="item in channels"
          :key="item.id" :label="item.name"
          :value="item.id">
                     {{item.name}}
          </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'my-choole',
  props: ['value'],
  data () {
    return {
      // 频道
      channels: []
    }
  },
  created () {
    this.getchannels()
  },
  methods: {
    // 获取频道
    async getchannels () {
      const { data: { data } } = await this.$http.get('channels')
      // console.log(data.channels)
      this.channels = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  }
}
</script>

<style>

</style>
