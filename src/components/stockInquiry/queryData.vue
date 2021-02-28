<template>
  <div>
       <!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>库存查询</el-breadcrumb-item>
         <el-breadcrumb-item>库存信息查询</el-breadcrumb-item>
       </el-breadcrumb>
       <button class="btn" @click="findData">点我查询数据</button>
       <!-- 查询信息弹窗 -->
       <el-dialog title="输入你要查询的信息" :visible.sync="findDialogVisible" width="50%" >
           <!-- 内容主体区域 -->
         <el-form  label-width="80px" :model="findForm" ref="findFormref">
           <el-form-item label="名称" prop='name'>
            <el-input v-model="findForm.name"></el-input>
            </el-form-item>
            <el-form-item label="型号" prop='size'>
            <el-input v-model="findForm.size"></el-input>
            </el-form-item>
            
         </el-form>    
         <!-- 底部区域 -->
         <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="resultOpen">确定</el-button>
         <el-button type="primary" @click="replaceInput">重置</el-button>
          </span>
        </el-dialog>   
        <!-- 查询弹窗2 -->
        <el-dialog title="查询的结果" :visible.sync="resultDialogVisible" width="50%" >
           <!-- 内容主体区域 -->
         <el-form  label-width="80px" :model="resultForm" ref="resultFormref">
           <el-form-item label="数量" prop="amount">
            <el-input v-model="resultForm.amount"></el-input>
            </el-form-item>
         </el-form>    
         <!-- 底部区域 -->
         <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="findData2">点击查询</el-button>
         <el-button type="primary" @click="closeViw">返回</el-button>
          </span>
        </el-dialog>   
  </div>
</template>

<script>
export default {
data(){
  return{
    findForm:{},
    findDialogVisible:false,
    resultDialogVisible:false,
    resultForm:{}
  }
},
methods:{
  //开启输入框
  findData(){
    this.findDialogVisible=true
  },
  //开启查询框
  resultOpen(){
    this.resultDialogVisible=true
    this.findDialogVisible=false

  },
  //渲染查询数据
  findData2(){
    this.$axios({
      method:'post',url:'/apis/sumProduct',
      data:{
        name:this.findForm.name,
        size:this.findForm.size
      }
    }).then(res=>{
      if(res.data[1]!=null){
        var a=res.data[0].amount-res.data[1].amount
     var b={amount:a}
     this.resultForm=b
      } else{
     this.resultForm=res.data[0]
      }
    }).catch(err=>{console.log(err)})
   this.$refs.findFormref.resetFields()

  },
  //关闭查询框
  closeViw(){
    this.resultDialogVisible=false
    this.$refs.resultFormref.resetFields()
  },
  //重置输入
  replaceInput(){
    this.$refs.findFormref.resetFields()
  }
}
}
</script>

<style scoped>
.btn{
    height: 50px;width: 150px;
    font-size: 20px;
    margin-left: 500px;
    margin-top: 200px;
}
</style>