<template>

  <div>
    <head-top></head-top>
   <div class="searchWord">
 <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="searchsParams.username" style="width: 160px;" placeholder="请输入职工姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="search-btn el-button--infoSearch" icon="el-icon-search" @click="submitSearchs()"></el-button>
        </el-form-item>
        <el-form-item>
            <el-input v-model="searchParams.tid" style="width: 180px;" placeholder="请输入职工号" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="search-btn el-button--infoSearch" icon="el-icon-search" @click="submitSearch()"></el-button>
            <el-button class="search-btn el-button--infoSearch" @click="clearListSearch">清空</el-button>
        </el-form-item>
    </el-form>
</div>
     <el-table
      ref="mytable"
      :data="table_data.data"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="radio" type="index" width="50"></el-table-column>
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
      <el-table-column
                  label="职工名"
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
   <el-dialog title="编辑"
   :visible.sync="editFormVisible"
   :close-on-click-modal="false"
   class="edit-form"
   :before-close="handleClose">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="职工名" prop="username">
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
      <!-- 分页功能 -->
<div class="block">
<el-pagination
@size-change="handleSizeChange"
@current-change="handleCurrentChange"
:current-page="currentPage4"
:page-size="50"
layout="total, sizes, prev, pager, next, jumper"
:total="100">
<!-- 总计 -->
</el-pagination>
</div>
  </div>
</template>

<script>
import axios from 'axios'
import headTop from '../components/headTop.vue'
export default {
  computed: {

},
  components:{
    headTop
  },
  methods: {
     submitSearchs(){
             this.searchsParams.pageIndex = 0
              this.getusernamedata()
              this.currentPage = 1
            },
            getusernamedata(){
              
           
                  this.$axios({
        method: "GET",
        url: "/user/findUserByName",
        params: {
          username: this.searchsParams.username,
         
          
        },
      })
        .then((resp) => {
          console.log(resp.data);
          this.table_data = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
            },
            //搜索列表 num(下同)
            submitSearch () {
              this.searchParams.pageIndex = 0
              this.getiddata()
              this.currentPage = 1
            },
            getiddata(){
          
                 this.$axios({
        method: "GET",
        url: "/user/findUserById",
        params: {
          
          tId:this.searchParams.tid ,
         
          
        },
      })
        .then((resp) => {
          console.log(resp);
          this.table_data = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
            },
            // 格式化表单数据
            clearForm () {
                this.searchParams = {
                   
                    tid:'',
                    pageIndex: 0,
                    pageSize: 10
                },
                this.searchsParams={
                    username:'',
                    pageIndex:0,
                    pageSize10
                }
            },
            // 清除列表的搜索表单
            clearListSearch () {
                this.clearForm()
                this.getTabledata()
            },
    getdata(){
     this.$axios.get('/user/findAllUser?index=0').then((res) => {
                    this.table_data = res.data;
                }).catch(function(error){
                    console.log(error);
                })
    },
    
         // getData() {
// console.log('生命周期')
// this.axios.get('../../static/database.json').then(response => {
// console.log(response.data);
// this.tableData=response.data
// }, response => {
// console.log("error");
// });
// },
// 分页功能 页码大小 val控制每页多少条信息
handleSizeChange(val) {
console.log(`每页 ${val} 条`);
// this.pagesize=`${val}`;
// let url=`/user/findAllUser?index=${val}`
// this.$axios.get(url).then(result=>{
// this.table_data=result.data;
//})
},
// 当页码数发生改变的时候执行的函数 val代表页数 没问题了
handleCurrentChange(val) {
console.log( `这是${val}页`)
let url=`/user/findAllUser?index=${val-1}` //pno=${this.pno++}`
this.$axios.get(url).then(result=>{
this.table_data=result.data;
})
},

    //多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("selection:", this.multipleSelection);
    },
     //编辑
    handleEdit(index, table_data) {
      console.log(table_data)
      console.log(index)
    this.editFormVisible = true;
    this.editForm = Object.assign({}, table_data); //这句是关键！！！
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
        id:this.editForm.id,
        username: this.editForm.username,
        tid:this.editForm.tid,
        password:this.editForm.password,
        
    }
    
    //这里再向后台发个post请求重新渲染表格数据
   axios.post('/user/alterUser', data).then(
        res => {
          if (res.data.code === 200) {
            this.$message("修改成功！")
          }
          else {
            this.$message(res.data)
          }
        }
      )

    this.editFormVisible = false;
    this.getdata()
}},
    
  mounted: function() {
    var _this = this   //很重要！！
            axios.get('/user/findAllUser?index=0')
                .then(function (res) {
                    console.log(res);
                    _this.table_data = res.data
                })
                .catch(function (error) {
                    console.log(error);
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
       search:'',
     isPaging:true, //是否显示分页
pageIndex:1, //当前页（必传）
pageSize :20, //每页多少条
currentPage:1, //当前显示3页
totalNumber: 1, //总条数
totalPage:1 , //总页数
pno:'1', // 页码
// 分页功能
currentPage4: 0,
tableData:{}, //后台拿来的数据
// 表单功能
itemList: [],
 table_data: [],
 id:0,
       editForm:{
         id:'',
       username:'',
       tId:'',
       password:''
       },
      editFormRules: {
					tId: [
			            { required: true, message: '请输入教职工号', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ]
				},
     searchParams: {
                  
                  tid:'',
                  pageSize: 10,
                  pageIndex: 0
                },
                searchsParams:{
                    username:'',
                    pageSize:10,
                    pageIndex:0
                }
           
     
    };
  }
};
</script>
<style scoped>
</style>