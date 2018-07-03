<template>
  <div class="home">
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          default-active="2"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="1-4-1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
  import {getUserList} from '@/api'
  export default{
    mounted(){
      let params = {
        params:{
          query:'',
          pagenum:1,
          pagesize:1
        }
      }
      getUserList(params).then(res =>{
        console.log(res.data)
      })
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    height: 100%;
    .el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-container {
      height: 100%;
    }
    .el-aside {
      background-color: #545c64;
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #545c64;
    }
    .logo {
      height:60px;
      background: url(../assets/logo.png);
      background-size: cover;
      background-color: #989898;
    }
    .toggle-btn {
      font-size: 36px;
      color: #989898;
      cursor: pointer;
      line-height: 60px;
    }
    .system-title {
      font-size: 28px;
      color: white;
    }
    .welcome, {
      color: white;
    }
  }

</style>
