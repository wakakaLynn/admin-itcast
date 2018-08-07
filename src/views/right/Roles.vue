<template>
  <div class="roles">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="primary" plain>添加角色</el-button>
    <el-table
      border
      class="mt-15"
      :data="roleList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
            <el-col :span="4">
              <el-tag closable @close="deleteRight(scope.row,firstChildren.id)">{{firstChildren.authName}}</el-tag>
              <i class="el-icon-arrow-right" v-if="firstChildren.children.length !==0"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                <el-col :span="5">
                  <el-tag closable type="success" @close="deleteRight(scope.row,secondChildren.id)">{{secondChildren.authName}}</el-tag>
                  <i class="el-icon-arrow-right" v-if="secondChildren.children.length !==0"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag closable type="warning" v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id" @close="deleteRight(scope.row,thirdChildren.id)">
                    {{thirdChildren.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
            <el-col :span="24">该角色没有分配权限，请前往分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
      width="165px">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc"
        width="130px">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain ></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain ></el-button>
          <el-button size="mini" type="warning" icon="el-icon-check" plain ></el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import {getRoleList,deleteRoleRight} from '@/api/index2.js'
  export default {
    data(){
      return{
        roleList: []

      }
    },
    created(){
      getRoleList().then(res=>{
        if(res.meta.status ===200){
          this.roleList = res.data
        }
      })
    },
    methods:{
      deleteRight (row,rightId){
        //console.log(roleId,rightId)
        deleteRoleRight({roleId:row.id,rightId:rightId}).then(res=>{
          if(res.meta.status===200){
            //console.log(res.data)
          row.children = res.data
          }else{
            this.$message({
              type:'error',
              message:res.mera.msg
            })
        }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .roles{
    .el-tag{
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
</style>
