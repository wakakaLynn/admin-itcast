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
    <el-button type="primary" plain @click="addDialogFormVisible=true">添加角色</el-button>
    <!--添加角色对话框-->
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm"  label-width="80px" :rules="rules" ref="addRoleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit('addRoleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      border
      class="mt-15"
      :data="roleList"
      v-loading="loading"
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
          <el-button size="mini" type="warning" icon="el-icon-check" plain @click="showDialog(scope.row)" title="授权角色"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="授权角色"
      :visible.sync="dialogVisible">
      <div class="tree-container">
        <el-tree
          ref="tree"
          :data="rightList"
          show-checkbox
          node-key="id"
          :default-checked-keys="selectedRights"
          :default-expand-all="true"
          :props="defaultProps">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitGrant">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {getRoleList,deleteRoleRight,getRightList,addRole,grantRoleRight} from '@/api/index2.js'
  export default {
    data(){
      return{
        loading:true,
        roleList: [],
        dialogVisible:false,
        addDialogFormVisible:false,
        addForm: {
          roleName: '',
          roleDesc: ''
        },
        rightList: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        selectedRights:[],//保存默认选中的权限id数组
        currentRole:{},//保存点击的角色
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          roleDesc: [
            {required: true, message: '请输入角色描述',trigger: 'blur'}
          ],
        }
      }
    },
    created(){
      this.initList()
    },
    methods:{
      initList(){
        this.loading = true
        getRoleList().then(res=>{
          if(res.meta.status ===200){
            this.roleList = res.data
            this.loading = false
          }
        })
      },
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
      },
      showDialog(row){
        this.dialogVisible = true
        this.currentRole = row
        getRightList({type:'tree'}).then(res=>{
          if(res.meta.status===200){
            //console.log(res.data)
            this.rightList = res.data
          }else{
            this.$message({
              type:'error',
              message:res.mera.msg
            })
          }
        })
        //遍历之前呀清空tree数组
        this.selectedRights.length = 0
        //取出当前点击角色的所有权限，然后遍历到第三个children，取出所有id,让进入selectedRights中
        row.children.forEach(first=>{
          if(first.children && first.children.length!==0){
            first.children.forEach(second =>{
              if(second.children && second.children.length!==0){
                second.children.forEach(third=>{
                  this.selectedRights.push(third.id)
                })
              }
            })
          }
        })
      },
      //添加角色
      addRoleSubmit(formName){
        this.$refs[formName].validate(valid=>{
          if(valid){
            addRole(this.addForm).then(res=>{
              if(res.meta.status ===201){
                this.$message({
                  type:'success',
                  message:res.meta.msg
                })
              }
              this.addDialogFormVisible = false
              this.initList()
            })
          } else {
            this.$message({
            type:'error',
            message:res.meta.msg
            })
          }
        })
      },
      //提交授权
      submitGrant(){
        let rids = this.$refs.tree.getCheckedKeys().join(',')
        //console.log(rids)
        grantRoleRight(this.currentRole.id,{rids:rids}).then(res=>{
          if(res.meta.status ===200){
            this.$message({
              type:'success',
              message:res.meta.msg
           })
            this.dialogVisible = false
            this.initList()
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
    .tree-container{
      height: 300px;
      overflow: auto;
    }
  }
</style>
