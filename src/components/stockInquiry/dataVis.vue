<template>
  <div>
       <!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>库存查询</el-breadcrumb-item>
         <el-breadcrumb-item>数据可视化</el-breadcrumb-item>
       </el-breadcrumb>
       <div ref="chart" class="treeMap"></div>
  </div>
</template>

<script>
export default {
  data () {
　　return {
  liatData:[,50000,,50000,,100000]
};
　},
　methods: {
　　initCharts  (){
　　let myChart = this.$echarts.init(this.$refs.chart);
    var a=100
  
    
　　// 绘制图表
　　myChart.setOption({
　　title: { text: '库存量图表' },
　　tooltip: {},
　　xAxis: {
　　data: ["A区已使用","A区","B区已使用","B区","已使用","仓库总容量"]
　　},
　　yAxis: {},
　　series: [{
　　name: '库存量',
　　type: 'bar',
　　data:[]
　　}]
　　});
     this.$axios({
      method:'post',url:'/apis/treeSum',data:{}
    }).then(res=>{
      if(res.data[1].amount!=null)
    {this.liatData[4]= res.data[0].amount-res.data[1].amount}
    else{this.liatData[4]=res.data[0]}
    if(res.data[3].amount!=null){
      this.liatData[0]=res.data[2].amount-res.data[3].amount
    }else{this.liatData[0]=res.data[2].amount}
     if(res.data[5].amount!=null){
      this.liatData[2]=res.data[4].amount-res.data[5].amount
    }else{this.liatData[2]=res.data[4].amount}
       myChart.setOption({
         series:[{
            name: '库存量',
　　        type: 'bar',
　　        data:this.liatData
         }]
       })
    }).catch(err=>{
      console.log(err)
    })
　　}
    
　  },
　  mounted () {
　　this.initCharts();
　}
}
</script>

<style scoped>
.treeMap{
  width: 700px;
  height: 600px;
  margin-left: 200px;
}
</style>