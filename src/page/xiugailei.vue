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
                  label="类别"
                  prop="type"
                  >
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
        <el-form-item label="类别" prop="type">
            <el-input v-model="editForm.type" auto-complete="off"></el-input>
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
this.$axios.get('/type/findAllType?index=0').then((res) => {
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
      let url=`/type/findAllType?index=${val-1}` //pno=${this.pno++}`
this.$axios.get(url).then(resp=>{
this.table_data=resp.data;
    })
    },



//点击更新
handleUpdate(formName) { 
    //更新的时候就把弹出来的表单中的数据写到要修改的表格中
    var data = {
      id:this.editForm.id,
       type:this.editForm.type
        
    }
    
    //这里再向后台发个post请求重新渲染表格数据
    axios.post('/type/alterType', data).then(
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
   
     this.$axios.get('/type/findAllType?index=0').then((res) => {
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
       type:''
       },
      editFormRules: {
					type: [
			            { required: true, message: '请输入类别', trigger: 'blur' },
			        ],
				
				},

      
    };
  }
};
</script>
<style scoped>
</style>