<template>
   <div class="fillcontain">
        <head-top></head-top>
       
 <div class="search">
   
            <el-input v-model="usernames" style="width: 160px;" placeholder="请输入职工姓名" clearable></el-input>
       
            <el-button class="search-btn el-button--infoSearch" icon="el-icon-search" @click="submitSearchs()"></el-button>
        
            <el-input v-model="tids" style="width: 180px;" placeholder="请输入职工号" clearable></el-input>
      
            <el-button class="search-btn el-button--infoSearch" icon="el-icon-search" @click="submitSearch()"></el-button>
            <!-- <el-button class="search-btn el-button--infoSearch" @click="clearListSearch">清空</el-button> -->
       



</div>
        <el-button size='small' type="primary" @click="dialogVisible = true">批量上传<i class="el-icon-upload el-icon--right"></i></el-button>
           <el-button type="danger" size="small" @click="handleDeleteAll()">一键删除</el-button>
        <div class="table_container">
            <el-table
                :data="table_data.data"
                style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
            <el-table-column v-if="radio" type="index" width="50"></el-table-column>
           
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
                <el-table-column
                  label="教职工姓名"
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
                 <el-table-column
                  label="操作"
                  align="center">
                   <template slot-scope="scope"> 
                   <el-button
            size="small"
           :plain="true"
            type="danger"
            
            @click.native.prevent="handleDelete(scope.$index,scope.row,table_data.data)"
          >删除</el-button>
                   </template>
                </el-table-column>
               
            </el-table>
            <div class="Pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="1000">
                </el-pagination>
            
            
        </div>
        <el-dialog
        title="导入表格"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form ref="form" :model="form" >
          <!-- 1.将<el-upload>代码添加到<el-dialog>代码块中 -->
              <el-form-item label="请选择要上传的文件">
          <el-upload
          ref="form"
            class="upload-demo"
            drag
            action="/user/importExcel"
             :on-remove="handleRemove"
            :on-change="fileChange"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-exceed="exceedFile"
             accept=".xls,.xlsx"
             :file-list="attachList"
             :before-upload="beforeUploadFile"
            :before-remove="beforeRemove"
            :auto-upload="false"
            
            :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传xls与xlsx文件，且不超过2M</div>
          </el-upload>
          </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleupdate()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</div>
</template>
<script>
    import headTop from '../components/headTop'
    import axios from 'axios'
   import XLSX from 'xlsx'
    export default {
        data(){
            return {
               
               length:0,
                input1:'',
                delarr:[],
                dialogVisible:false,
                 multipleSelection: [], //复选框，数据
                  selection: true, //是否需要复选框
                 attachList: [],
                
              isPaging:true, //是否显示分页
pageIndex:1, //当前页（必传）
pageSize :20, //每页多少条
currentPage:1, //当前显示3页
totalNumber: 1, //总条数
radio:false,
totalPage:1 , //总页数
pno:'1', // 页码
// 分页功能
currentPage4: 4,
table_data:[], 
//后台拿来的数据

usernames:'',
tids:'',
                form:{
                }
           
            }
        },
       
    	components: {
    		headTop,
    	},
        created:function(){
           
        },
         mounted: function () {
            var _this = this   //很重要！！
            
             this.$axios({
                  method:'GET',
                  url:'/user/findAllUser?index=0'
                }).then((resp)=>{
                  console.log(resp);
                  this.table_data=resp.data
                  console.log(this.table_data.data);
                }).catch((err)=>{
                  console.log(err);
                })
        },
        methods: {
         
            
            submitSearchs(){
            //  this.searchsParams.pageIndex = 0
              this.getusernamedata()
            //   this.currentPage = 1
            },
            getusernamedata(){
            this.$axios({
        method: "GET",
        url: "/user/findUserByName",
        params: {
          username: this.usernames,
         
          
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
              getTabledata() {
                this.$axios.get('/user/findAllUser?index=0').then((res) => {
                    this.table_data = res.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
               handleRemove(file, attachList) {
                for (const i in this.attaList) {
                    if (this.attaList[i].key === file.uid) {
                        this.attaList.splice(i, 1)
                    }
                }
                //this.upload.attachList = attachList
                this.attachList.push(file.raw) ;
            },
            // 文件改变时
            fileChange(file, attachList) {
                console.log(file.raw);
                console.log(attachList);
        //this.attachList.push(file.raw) ;
        this.attachList = attachList
            },
            // 文件移除之前
            beforeRemove(file,attaList) {
              console.log(file,this.attachList)
                return this.$confirm(`确定移除 ${file.name}？`);
                
            },
            exceedFile(files, attachList) {
        this.$message.warning(`只能选择1个文件，当前共选择了 ${files.length + attachList.length} 个`);
      },
      beforeUploadFile(file){
    console.log('before upload');
        console.log(file);
        let extension = file.name.substring(file.name.lastIndexOf('.')+1);
        let size = file.size / 1024 / 1024;
        if(extension !== '.doc,.docx,.pdf,jpg,.png,.xls') {
          this.$message.warning('该文件类型不符合');
        }
        if(size > 100) {
          this.$message.warning('文件大小不得超过100M')}
      },
         handleupdate(){
        
            if (this.attachList.length === 0){
          this.$message.warning('请上传文件');
        } else {
          console.log(this.attachList[0].raw)
          const form = new FormData();
          
          form.append('file',this.attachList[0].raw);
         
         
         this.$axios({
            method:"post",
            url: "/user/importExcel",
            contentType: false,//这里不要落下
            headers:{
              'Content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',//格式转换为binary
            },
            data:form
          }).then(res=>{
            console.log(res)
            }).catch(error=>{
                    console.log(error);
                   
                })}
                this.dialogVisible=false
                this.getTabledata()
         }   ,
            handleSuccess(res,file,attachList){
                console.log(res,file,attachList)
             this.$message.sucess("文件上传成功");
             this.$router.push('/deleteteacher')
            },
            handleError(err,file,attachList){
                console.log(err,file,attachList)
            this.$message.error('文件上传失败')
            },
            //搜索列表 num(下同)
            submitSearch () {
            //   this.searchParams.pageIndex = 0
              this.getiddata()
            //   this.currentPage = 1
            },
            getiddata(){
          this.$axios({
        method: "GET",
        url: "/user/findUserById",
        params: {
          
          tId: this.tids,
         
          
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
            // // 格式化表单数据
            // clearForm () {
            //     this.searchParams = {
                   
            //         tid:'',
            //         pageIndex: 0,
            //         pageSize: 10
            //     },
            //     this.searchsParams={
            //         username:'',
            //         pageIndex:0,
            //         pageSize10
            //     }
            // },
            // // 清除列表的搜索表单
            // clearListSearch () {
            //     this.clearForm()
            //     this.getTabledata()
            // },
             handleSelectionChange(val) {
       this.multipleSelection = val;
       console.log("selection:", this.multipleSelection);
     },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                 let url=`/user/findAllUser?index=${val-1}` //pno=${this.pno++}`
this.$axios.get(url).then(resp=>{
this.table_data=resp.data;})
            },
           
           handleDelete(index,row,table_data) {
       console.log(index)
    console.log(row.id)
     this.$confirm('是否确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            //点击确定的操作(调用接口)
             table_data.splice(index,1)
         var _this = this   //很重要！！
          this.$axios.get("/user/deleteUser",{
                   params :{
                         id:row.id
                    }
                }).then(res=>{
                    if(res.data=="删除成功"){
                       this.getTabledata()
                        this.$message.success('删除成功')
                    }
                }).catch(error=>{
                    console.log(error);
                    this.$message.error('删除失败')
                })
     
      this.$message({
       message: "删除成功！",
       type: "success"
     });
     
          }).catch(() => {
            alert('已取消删除')
            //几点取消的提示
          });

      
   },
       handleDeleteAll: function() {
                this.$confirm('此操作将任务状态改为删除状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.$axios({
                    method: 'GET',
                    url: '/user/deleteBatch',
                }).then(function(res) {
                    if (res.data.code == 0) {
                        alert('成功！');
                        _this.getTabledata();
                    } else {
                        alert('数据加载失败！');
                    }
                })    
            //点击确定的操作(调用接口)
          }).catch(() => {
            //几点取消的提示
          });  
        
          
           
       }
            
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
