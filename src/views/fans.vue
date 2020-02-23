<template>
  <div>
    <el-card>
      <div solt="header">
       <my-bread>粉丝管理</my-bread>
      </div>
      <div>
         <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="粉丝列表" name="fansList">
                <div class="fanslist" v-for="item in fansList" :key="item.name">
                       <div class="demo-basic--circle">
                        <div class="block" style="margin-top:10px">
                          <el-avatar :size=50 :src="item.photo"></el-avatar>
                        </div>
                      </div>
                  <h1>{{item.name}}</h1>
                  <div>
                      <el-button type="primary">+关注</el-button>
                  </div>
                </div>
                <div class="pagination">
                <el-pagination
                 background
                 layout="prev, pager, next"
                 :total="total"
                 :page-size="reqPamrams.per_page"
                 :current-page="reqPamrams.page"
                 @current-change="changePage">
                 </el-pagination>
             </div>
              </el-tab-pane>

              <el-tab-pane label="粉丝画像" name="fansPhoto">
                <div ref="dom" style="width:600px;height:400px"></div>
              </el-tab-pane>
         </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'fansList',
      reqPamrams: {
        page: 1,
        per_page: 20
      },
      fansList: [],
      total: 100,
      fansCount: {}
    }
  },
  created () {
    this.getFans()
    this.getFanscount()
  },
  mounted () {
    this.inbar()
  },
  methods: {
    // 获取粉丝数量
    async getFanscount () {
      const { data: { data } } = await this.$http.get('statistics/followers')
      // console.log(data)
      this.fansCount = data
      console.log(this.fansCount)
    },
    // 初始化图片
    inbar () {
      const dom = this.$refs.dom
      const myChart = echarts.init(dom)
      const options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['性别', '年龄', '手机类型']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['性别', '年龄', '手机类型']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '性别',
            type: 'bar',
            data: [58, 81]
          },
          {
            name: '年龄',
            type: 'bar',
            data: this.fansCount.age
          },
          {
            name: '手机类型',
            type: 'bar',
            data: this.fansCount.device
          }
        ]
      }

      myChart.setOption(options)
    },
    async getFans () {
      const { data: { data } } = await this.$http.get('followers', { params: this.reqPamrams })
      // console.log(data)
      this.fansList = data.results
      this.total = data.total_count
    },
    changePage (newpage) {
      this.reqPamrams.page = newpage
      this.getFans()
    }
  }

}
</script>

<style scoped>
.fanslist {
   width: 140px;
   height: 200px;
   text-align: center;
   float: left;
   /* margin-top:20px; */
   margin-right:20px;
   margin-bottom: 40px;
   border: 1px black dotted;
   position: relative;
}
.pagination{
  position: absolute;
  left:0;
  bottom:0;
}
</style>
