<template>
  <el-container class="homeContainer">
      <!-- 头部 -->
  <el-header>
        <div class="headerDiv">
            <img src="../assets/logo.png" alt="">
            <span>绿苹果瓷砖仓库管理系统</span>
        </div>
       <el-button type="info" @click='backLogin'>退出</el-button>
  </el-header>
 <!-- 主体 -->
  <el-container>
      <!-- 侧边栏 -->
    <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
      <el-menu  background-color="#323743"
      text-color="#fff" active-text-color="#409EFF" unique-opened router>
      <!-- 一级菜单 -->
      <el-submenu index="1">
          <!-- 一级菜单模板 -->
           <template slot="title">
               <!-- 图标 -->
                 <i class="el-icon-user"></i>
                 <!-- 文本 -->
                <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
           <el-menu-item index="user">
               <template slot="title">

               <!-- 图标 -->
                 <i class="el-icon-s-operation"></i>
                 <!-- 文本 -->
                <span>用户列表</span>
                 </template>
           </el-menu-item>
      </el-submenu> 
      <el-submenu index="2">
          <!-- 一级菜单模板 -->
           <template slot="title">
               <!-- 图标 -->
                 <i class="el-icon-folder-opened"></i>
                 <!-- 文本 -->
                <span>基本信息录入</span>
            </template>
            <!-- 二级菜单 -->
           <el-menu-item index="putIn">
               <template slot="title">
                   
               <!-- 图标 -->
                 <i class="el-icon-folder-add"></i>
                 <!-- 文本 -->
                <span>入库信息</span>
                 </template>
           </el-menu-item>
           <el-menu-item index="putOut">
               <template slot="title">
                   
               <!-- 图标 -->
                 <i class="el-icon-folder-remove"></i>
                 <!-- 文本 -->
                <span>出库信息</span>
                 </template>
           </el-menu-item>
        </el-submenu> 
        <el-submenu index="3">
          <!-- 一级菜单模板 -->
           <template slot="title">
               <!-- 图标 -->
                 <i class="el-icon-s-data"></i>
                 <!-- 文本 -->
                <span>库存查询</span>
            </template>
            <!-- 二级菜单 -->
           <el-menu-item index="dataVis">
               <template slot="title">
                   
               <!-- 图标 -->
                 <i class="el-icon-s-marketing"></i>
                 <!-- 文本 -->
                <span>数据可视化</span>
                 </template>
           </el-menu-item>
           <el-menu-item index="queryData">
               <template slot="title">
                   
               <!-- 图标 -->
                 <i class="el-icon-s-data"></i>
                 <!-- 文本 -->
                <span>库存信息查询</span>
                 </template>
           </el-menu-item>
        </el-submenu> 
    </el-menu>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
     
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
export default {
     created () {
      this.getMenuList()  
    },
methods: {
   
    backLogin(){
        this.$router.push('/login')
    },
    getMenuList(){

    }
}
}
</script>

<style>
 .el-header{
    background-color: #373d3f;
    color: rgb(245, 238, 238);
    
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-header .headerDiv{
      display: flex;
      align-items: center;
  }
  .el-header .headerDiv img {
      height: 40px;
      width: 40px;
  }
  
    .el-aside {
    background-color:#323743;
    color: #333;
    
  }
  .el-aside .el-menu{
    border-right: none;          
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    
    
  }
  .homeContainer{
      height: 100%;
  }
</style>