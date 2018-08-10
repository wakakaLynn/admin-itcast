<template>
  <div class="category">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success" plain @click="addCategory">添加分类</el-button>
      </el-col>
    </el-row>

    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>

    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--添加分类对话框-->
    <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm"  label-width="80px" :rules="rules" ref="addCateForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            :options="options"
            :change-on-select="true"
            v-model="selectedOptions"
            :props="props"
            @change="handleChange">
          </el-cascader>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑用户对话框-->
    <!--<el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm"  label-width="80px" :rules="rules" ref="editCateForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCateSubmit('editCateForm')">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>
<script>
  import TreeGrid from '@/components/TreeGrid/TreeGrid'
  import {getGoodsCategory,addCategories} from '@/api/index2.js'
  export default{
    data () {
      return {
        addDialogFormVisible:false,
        addForm:{
          cat_name:'',
          cat_pid:0,
          cat_level:0
        },
        rules: {
          cat_name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
          ]},
        dataSource: [],
        columns: [{
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        }, {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        }, {
          text: '排序',
          dataIndex: 'cat_level',
          width: ''
        }],

        total: 0,
        pagesize: 10,
        pagenum: 1,

        selectedOptions:[],
        options:[],
        props:{
          value:'cat_id',
          label:'cat_name'
        }
      }
    },
    components: {
      TreeGrid
    },
    created(){
      this.initList()
    },
    methods:{
      deleteCategory (cid) {
        console.log(cid)
      },
      editCategory (cid) {
        console.log(cid)
      },
      //分页动画
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`)
        this.pagesize = val
        this.initList()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`)
        this.pagenum = val
        this.initList()
      },

      //获取商品分类列表
      initList(){
        getGoodsCategory({type:'3', pagenum: this.pagenum, pagesize: this.pagesize}).then(res=>{
          //console.log(res.data)
          if(res.meta.status===200){
            this.total = res.data.total
            this.dataSource = res.data.result
          }
        })
      },

      //级联样式表点击动画
      handleChange(value) {
        //console.log(value);
      },
      addCategory(){
        this.addDialogFormVisible = true
        getGoodsCategory({type:'2'}).then(res=>{
          //console.log(res.data)
          if(res.meta.status ===200){
            this.options = res.data
          }
        })
      },
      addCateSubmit(formName){
        this.$refs[formName].validate(valid=>{
          if(valid){
            if(this.selectedOptions.length===0){
              this.addForm.cat_pid = 0
              this.addForm.cat_level = 0
            }else if(this.selectedOptions.length===1){
              this.addForm.cat_level = 1
              this.addForm.cat_pid = this.selectedOptions[0]
            } else{
              this.addForm.cat_level = 2
              this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length-1]
            }
            addCategories({cat_pid:this.addForm.cat_pid,cat_name:this.addForm.cat_name,cat_level:this.addForm.cat_level}).then(res=>{
              console.log(res.data)
              if(res.meta.status ===201){
                this.addDialogFormVisible = false
                this.initList()
                this.$message({
                  type:'success',
                  message:res.meta.msg
                })
              }
            })
          }
        })
      }

    }
  }
</script>
<style lang="scss" scoped>
  .category{
    .page {
      padding: 5px 0;
      background-color: #D3DCE6;
    }
  }

</style>
