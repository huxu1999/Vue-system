<template>
   <div class="login_container">
      <div class="login_box">
          <!-- 头像区 -->
          <div class="avatar_box">
              <img src="../assets/huxi.jpg" alt="">
          </div>
          <!-- 登陆表单区 -->
          <el-form label-width="0" class="login_from" :model='loginFrom' :rules='loginFromRules' ref="loginFromRef">
              <!-- 用户名 -->
            <el-form-item  prop='id'>
              <el-input v-model="loginFrom.username"  prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop='password' >
              <el-input  v-model="loginFrom.password" prefix-icon="iconfont icon-mima" type='password'></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
             <el-form-item  class="btns">
              <el-button type="primary" @click="login">登陆</el-button>
              <el-button type="info" @click='resetLoginFrom'>重置</el-button>
            </el-form-item>
        
          </el-form>  
      </div>
      </div> 
</template>

<script>
export default {
   data(){
       return{
           //这是登陆表单的数据对象
           loginFrom:{
               username:'',
               password:''
           },
           /* 表单的验证规则对象 */
           loginFromRules:{
               /* 验证用户名是否合法 */
                username:[
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
               ],
               /* 验证密码是否合法 */
               password:[
                   { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
               ]
           }
       }
   },
   methods: {
       /* 点击重置按钮 重置登陆表单 */
       resetLoginFrom(){
           this.$refs.loginFromRef.resetFields()
       },
    login(){//表单预校验
           /*  this.$refs.loginFromRef.validate(async valid=>{
                if(!valid) return;
           const {data:result}=await this.$http.post('login',this.loginFrom);
            if(result.meta.status!==200) return console.log('登陆失败')
            console.log('登陆成功')
            }) */
            /* this.$message({
                message:'成功',
                type:'success'
            })
            this.$router.push('/home') */
             const self=this
            self.$axios({
                 method:'post',
                 url:'/apis/stu',
                 data:{username:self.loginFrom.username,
                       password:self.loginFrom.password
                 }
             }).then(res=>{
                 if(res.data!=1) return self.$message.error('登陆失败,请输入正确的用户名和密码')
                 self.$message({
                     message:'登陆成功',
                     type:'success'
                 })
                 self.$router.push('/home')
             }).catch(err=>{console.log(err)})
                
       },
       
   }
}
</script>

<style  scoped>
.login_container{
    background-color: rgb(68, 67, 67);
    height: 100%;
}
.login_box{
    position: absolute;
   width: 450px;height: 300px;background-color: #fff;
   border-radius: 3px; 
   left: 50%;top: 50%;
   transform: translate(-50%,-50%);  
}
.avatar_box{
    position: absolute;
    height: 130px;width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd ;
    left: 50%;
   transform: translate(-50%,-50%);  
   background-color: #fff;
}
.avatar_box img{
    
        height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
    }
.btns{
    display: flex;
    justify-content: flex-end;
}  
.login_from{
position:absolute;
bottom: 0;
width: 100%;
padding: 0 20px;
box-sizing: border-box;
}  
</style>