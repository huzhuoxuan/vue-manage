
<template>
  <div>
   <head-top></head-top>
   <el-button size="medium" @click="addType" type="primary">新增类别</el-button>
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
               
                
     
           
      
       
    

    </el-table>
    <el-dialog title="新增类"
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
        <el-button type="primary" @click.native.prevent="saveData">更新</el-button>
    
    </div>
    
   
</el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import headTop from '../components/headTop.vue'
export default {
    components:{
        headTop
    },
    mounted: function () {
            var _this = this   //很重要！！
            axios.get('/type/findAllType')
                .then(function (res) {
                    console.log(res);
                    _this.table_data = res.data
                })
                .catch(function (error) {
                    console.log(error);
                });
               
        },
  methods: {
     gettableData() {
                this.$axios.get('/admin/findAllAdmin?index=0').then((res) => {
                    this.table_data = res.data;
                }).catch(function(error){
                    console.log(error);
                })
            },

    //多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("selection:", this.multipleSelection);
    },
    //点击关闭dialog
handleClose(done) {
    /*done();
    location.reload();*/
    this.editFormVisible = false;
},




//点击更新
handleUpdate(formName) { 
    //更新的时候就把弹出来的表单中的数据写到要修改的表格中
    var data = {
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
   this.getTabledata()
    this.editFormVisible = false;
},
  addType(){
 
 this.title='新增类',
 this.editForm.type='',
this.editFormVisible=true
  },
  saveData(){
var title=this.title
var type=this.editForm.type
if(title=='新增类'){
  this.table_data.data.push({type})
  this.editFormVisible=false
}else{
  var table_data=this.table_data
  for(var i=0;i<table_data.length;i++){
  table_data[i].type=type
     
    }
  }
  var data={
   type:this.editForm.type
  }
  axios.post('/type/addType', data).then(
        res => {
          if (res.code === 200) {
            this.$message("修改成功！")
          }
          else {
            this.$message(res.data)
          }
        }
      )
  this.editFormVisible=false
  
},

   
  
    
  
  },
  mounted: function() {
    var _this = this   //很重要！！
      this.$axios({
                  method:'GET',
                  url:'/type/findAllType?index=1'
                }).then((resp)=>{
                  console.log(resp);
                  this.table_data=resp.data
                  console.log(this.table_data.data);
                }).catch((err)=>{
                  console.log(err);
                });
  
  },
  
  data() {
    return {
      editFormVisible:false,
      new_date_json: {}, //数据结构
      multipleSelection: [], //复选框，数据
      is_edit: true, //是否可编辑
      is_delete: true, //是否可删除
      selection: true, //是否需要复选框
      radio: false, //单选变色
      space_color: true, //隔行变色
      editForm:{
        type:''
      },
       
      editFormRules: {
					type: [
			            { required: true, message: '请输入类别', trigger: 'blur' },
			        ],
				
				},
      //表格数据
      table_data: []
    };
  }
};
</script>
<style scoped>
</style>