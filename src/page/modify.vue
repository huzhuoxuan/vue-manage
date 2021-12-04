<template >

  <div>
    <head-top></head-top>
   
    <el-table
      ref="mytable"
      :data="table_data.data"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="radio" type="index" width="50"></el-table-column>
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
      <el-table-column
                  label="用户名"
                  prop="username"
                  >
                </el-table-column>
                <el-table-column
                  label="职工号"
                  prop="tid">
                </el-table-column>
                <el-table-column
                  label="密码"
                  prop="password">
                </el-table-column>
                
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click.native="handleEdit(scope.$index,scope.row)" >编辑</el-button>
         
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
                           
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            >   
                    </el-pagination>
   <el-dialog title="编辑"
   :visible.sync="editFormVisible"
   :close-on-click-modal="false"
   class="edit-form"
   :before-close="handleClose">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职工号" prop="tid">
            <el-input v-model="editForm.tid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="editForm.password" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    
    <div slot="footer" class="dialog-footer">
     
        <el-button @click.native="editFormVisible=false">取消</el-button>
        <el-button type="primary" @click.native.prevent="handleUpdate('editForm')">更新</el-button>
    
    </div>
    
   
</el-dialog>
  </div>
</template>

<script>
import headTop from '../components/headTop.vue'
import axios from 'axios'
export default {
  components:{
    headTop
  },
    // mounted: function () {
    //         var _this = this   //很重要！！
    //         axios.get('/admin/findAlladmin')
    //             .then(function (res) {
    //                 console.log(res);
    //                 _this.tableData = res.data
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     },
  methods: {
    getTabledata(){
this.$axios.get('/admin/findAllAdmin?index=0').then((res) => {
                    this.table_data = res.data;
                }).catch(function(error){
                    console.log(error);
                })},


    //多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("selection:", this.multipleSelection);
    },
    //编辑
    handleEdit(index, row) {
      console.log(row)
      console.log(index)
    this.editFormVisible = true;
    this.editForm = Object.assign({}, row); //这句是关键！！！
},

//点击关闭dialog
handleClose(done) {
    /*done();
    location.reload();*/
    this.editFormVisible = false;
},
 handleCurrentChange(val){
      this.currentPage=val;
      // this.gettabledata()
      let url=`/admin/findAllAdmin?index=${val-1}` //pno=${this.pno++}`
this.$axios.get(url).then(resp=>{
this.table_data=resp.data;
    })
    },



//点击更新
handleUpdate(formName) { 
    //更新的时候就把弹出来的表单中的数据写到要修改的表格中
    var data = {
      id:this.editForm.id,
        username: this.editForm.username,
        tid:this.editForm.tid,
        password:this.editForm.password,
        
    }
    
    //这里再向后台发个post请求重新渲染表格数据
    axios.post('/admin/alterAdmin', data).then(
        res => {
          if (res.code === 200) {
            this.$message("修改成功！")
          }
          else {
            this.$message(res.data)
          }
        }
      )

//         });
   
   this.editFormVisible = false;
   this.getTabledata()
 }

  },
  mounted: function() {
   
     this.$axios.get('/admin/findAllAdmin?index=0').then((res) => {
                    this.table_data = res.data;
                }).catch(function(error){
                    console.log(error);
                })},
  
  data() {
    return {
     editFormVisible: false,
      selection: true, //是否需要复选框
      radio: false, //单选变色
     currentPage:0, //初始页
                pagesize:10,    //    每页的数据
               total:100,
      //表格数据
      table_data: {},
       editForm:{
         id:'',
       username:'',
       tid:'',
       password:''
       },
      editFormRules: {
					tid: [
			            { required: true, message: '请输入教职工号', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ]
				},

      
    };
  }
};
</script>
<style scoped>
</style>