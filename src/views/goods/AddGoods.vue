<template>
  <div class="add-goods">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
        <el-step title="步骤 5"></el-step>
      </el-steps>
    </el-row>

    <el-row>
      <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick" style="margin-top: 20px;">
        <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="fourth">
          <el-upload
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="setHeader()"
            :on-success="handleSuccess"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="fifth">商品内容</el-tab-pane>
      </el-tabs>

    </el-row>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        active:0,
        activeName:'first',
      }
    },
    methods: {
      handleClick (tab, event) {
        //console.log(tab, event)
        switch(tab.name){
          case 'first':
            this.active = 0
            break;
          case 'second':
            this.active = 1
            break
          case 'third':
            this.active = 2
            break
          case 'fourth':
            this.active = 3
            break
          case 'fifth':
            this.active = 4
            break
          default:
            this.active = 0
        }
      },

      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },

      setHeader(){
        let token = localStorage.getItem('mytoken')
        return {Authorization:token}
      },
      handleSuccess(res,file,fileList){
        if(res.meta.status ===200){
          this.$message({
            type:'success',
            message:res.meta.msg
          })
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
</style>
