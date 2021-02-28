<template>
  <div>
      <!-- 面包屑 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>用户管理</el-breadcrumb-item>
         <el-breadcrumb-item>用户列表</el-breadcrumb-item>
       </el-breadcrumb>
       <!-- 卡片区域 -->
       <el-card >
         <!-- 用户列表区 -->
         <el-table :data="userList" style="width:100%" stripe border>
             <el-table-column type='index'></el-table-column>
             <el-table-column prop='userName' label="姓名" ></el-table-column>
             <el-table-column prop='password' label="密码" ></el-table-column>
             <el-table-column prop='number' label="工号" ></el-table-column>
             
             <el-table-column prop='change' label="修改" >
                 <template slot-scope="scope">
                     <el-button type="primary" icon="el-icon-edit" size='mini' @click="alertUser(scope.row.userName)"></el-button>
                     <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteUser(scope.row.userName)" ></el-button>
                      <el-tooltip class="item" effect="dark" content="添加" placement="right">
                       <el-button type="primary" icon="el-icon-share" size='mini' @click="addDialogVisible=true"></el-button>
                      </el-tooltip>
                 </template>
             </el-table-column>
         </el-table>   
       </el-card>
       <!-- 添加用户得对话框 -->
       <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" >
           <!-- 内容主体区域 -->
         <el-form ref="addFormRef" :model="addForm" label-width="80px" :rules='addFormRules'>
            <el-form-item label="姓名" prop='userName'>
            <el-input v-model="addForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
            <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop='number'>
            <el-input v-model="addForm.number"></el-input>
            </el-form-item>
            
         </el-form>    
         <!-- 底部区域 -->
         <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="adduser">确定</el-button>
         <el-button type="primary" @click="resetadd">重置</el-button>
         <el-button @click="addDialogVisible = false">返回</el-button>
         </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog title="修改用户" :visible.sync="alertDialogVisible" width="50%" >
           <!-- 内容主体区域 -->
         <el-form  label-width="80px" :model="alertForm" :rules="alertFormRules">
           <el-form-item label="姓名" prop='userName'>
            <el-input v-model="alertForm.userName" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
            <el-input v-model="alertForm.password"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop='number'>
            <el-input v-model="alertForm.number" disabled></el-input>
            </el-form-item>
         </el-form>    
         <!-- 底部区域 -->
         <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="alertuser">确定</el-button>
         <el-button type="primary" >重置</el-button>
         
         </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
data () {
    return {
        userList:[
            
        ],
        //修改用户对话框显示
        alertDialogVisible:false,
        //控制添加用户对话框显示
       addDialogVisible:false,
       /* 添加用户得表单数据 */
       addForm:{},
       /* 添加表单验证规则 */
       addFormRules:{
         userName:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
         ],
         password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
         ],
         number:[
           { required: true, message: '请输入工号', trigger: 'blur' },
           { min: 4, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
         ]
       },
       //更新用户表单
       alertForm:{},
       //更新用户表单验证规则
       alertFormRules:{
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
         ]
       }
    }
},
methods: {  
           //添加用户
              adduser(){
              const userName=this.addForm.userName
               const number=this.addForm.number
              const password=this.addForm.password
             const user={userName,number,password}
             this.userList.unshift(user)
            
             this.$axios({
               method:'post',url:'/apis/addstu',
               data:{
                 userName:this.addForm.userName,
                 password:this.addForm.password,
                 number:this.addForm.number
               }
             }).then(res=>{console.log(res.data)}).catch(err=>{console.log(err)})
             this.$refs.addFormRef.resetFields()
             this.addDialogVisible=false
             this.getData()
               },
      resetadd(){
          this.$refs.addFormRef.resetFields()
      },
      //渲染用户列表
      getData(){
           const self=this
           self.$axios({
               method:'post',url:'/apis/getData',
               data:{}
           }).then(res=>{
               self.userList=res.data
           }).catch(err=>{console.log(err)})
       } ,
       //删除用户
            deleteUser(userName){
            if(confirm('确定要删除吗')==true){
              this.$axios({
                method:'post',url:'/apis/removeD',data:{userName:userName}
              }).then(res=>{console.log(res.data)}).catch(err=>{console.log(err)})
               this.getData()}
             },
             //更新用户  
        alertUser(userName){
          this.alertDialogVisible=true
          this.$axios({
            method:'post',url:'/apis/updata',data:{userName:userName}
          }).then(res=>{
            this.alertForm=res.data
          }).catch(err=>{console.log(err)})
          
        },
        //更新后修改用户
             alertuser(){
               this.$axios({
                 method:'post',url:'/apis/alertData',data:{
                   userName:this.alertForm.userName,
                   password:this.alertForm.password
                 }
               }).then(res=>{
                 if(res.data.meta.state==200){console.log("成功")}
               }).catch(err=>{console.log(err)})
               this.alertDialogVisible=false
               this.getData()
             }
    },
    mounted(){
      this.getData()
    }
}

</script>

<style scoped>
.refresh{
  width: 50px;
  height: 30px;

}
</style>