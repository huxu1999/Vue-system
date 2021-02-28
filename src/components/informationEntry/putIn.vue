<template>
  <div>
       <!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>基本信息录入</el-breadcrumb-item>
         <el-breadcrumb-item>入库信息</el-breadcrumb-item>
       </el-breadcrumb>
       <!-- 数据列表区域 -->
       <el-card>
       <button class="btn1" @click="addData">插入数据</button>
       <el-table :data="dataList" style="width:100%" stripe border>
             <el-table-column type='index'></el-table-column>
             <el-table-column prop='inTime' label="入库时间" ></el-table-column>
             <el-table-column prop='name' label="名称" ></el-table-column>
             <el-table-column prop='number' label="编号" ></el-table-column>
             <el-table-column prop='amount' label="数量" ></el-table-column>
             <el-table-column prop='breakage' label="破损" ></el-table-column>
             <el-table-column prop='realAmount' label="实际数量" ></el-table-column>
             <el-table-column prop='size' label="型号" ></el-table-column>
             <el-table-column prop='userNumber' label="记录员工号" ></el-table-column>
       </el-table> 
       </el-card>
       <!-- 添加数据对话框 -->
       <el-dialog title="添加入库信息" :visible.sync="addDialogVisible" width="50%" >
           <!-- 内容主体区域 -->
         <el-form :model="addForm" label-width="80px" ref="addFormRef">
            <el-form-item label="入库时间" prop='inTime'>
            <el-input v-model="addForm.inTime"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop='name'>
            <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="编号" prop='number'>
            <el-input v-model="addForm.number"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop='amount'>
            <el-input v-model="addForm.amount"></el-input>
            </el-form-item>
            <el-form-item label="破损" prop='breakage'>
            <el-input v-model="addForm.breakage"></el-input>
            </el-form-item>
            <el-form-item label="实际数量" prop='realAmount'>
            <el-input v-model="addForm.realAmount" disabled></el-input>
            </el-form-item>
            <el-form-item label="型号" prop='size'>
            <el-input v-model="addForm.size"></el-input>
            </el-form-item>
            <el-form-item label="记录员工号" prop='userNumber'>
            <el-input v-model="addForm.userNumber"></el-input>
            </el-form-item>
            
         </el-form>    
         <!-- 底部区域 -->
         <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="addProduct">确定</el-button>
         <el-button type="primary" @click="replace">重置</el-button>
         
         </span>
        </el-dialog>    
  </div>
</template>

<script>
export default {
data(){
  return{
    dataList:[],
    addForm:{},
    addDialogVisible:false
  }
},
methods: {
  addData(){
    this.addDialogVisible=true
  },
  showData(){
     const self=this
           self.$axios({
               method:'post',url:'/apis/getProduct',
               data:{}
           }).then(res=>{
               self.dataList=res.data
           }).catch(err=>{console.log(err)})
  },
  addProduct(){
        this.$axios({
          method:'post',url:'/apis/createProduct',
          data:{
            inTime:this.addForm.inTime,
            name:this.addForm.name,
            number:this.addForm.number,
            amount:this.addForm.amount,
            breakage:this.addForm.breakage,
            realAmount:this.addForm.amount-this.addForm.breakage,
            size:this.addForm.size,
            userNumber:this.addForm.userNumber
          }
        }).then(res=>{
          console.log(res.data)
        }).catch(err=>{console.log(err)})
        this.addDialogVisible=false
        this.$refs.addFormRef.resetFields()
        this.showData()
  },
  replace(){
    this.$refs.addFormRef.resetFields()
  }
},
mounted(){
  this.showData()
}
}
</script>

<style scoped>

</style>