<template>
  <div>
    <head-top></head-top>
    <div class="search">
   
            <el-input v-model="question" style="width: 160px;" placeholder="请输入问题" clearable></el-input>
       
            <el-button class="search-btn el-button--infoSearch" icon="el-icon-search" @click="submitSearchs()"></el-button>


</div>
     <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="请选择类别" prop="ptype">
         <el-select v-model="form.ptype" placeholder="请选择" @change="getitem1">
    <!--使用v-for对变量models进行遍历，每一项均作为select的option，{{item.name}}为显示的内容-->
	<el-option  v-for="item in options" :key="item.id" :lable="item.type" :value="item.id" >{{item.type}}</el-option>
</el-select>

          </el-form-item>   
      </el-form>
    <el-table
      ref="mytable"
      :data="table_data.data"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="radio" type="index" width="50"></el-table-column>
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
       <el-table-column
                  label="问题"
                  prop="pproblem"
                  >
                </el-table-column>
                <el-table-column
                  label="答案"
                  prop="panswer"
                  width="400">
                </el-table-column>
                 <el-table-column
                  label="文件"
                  
                  >
                  <template slot-scope="scope">
                 <a :href="`http://175.24.24.187:8080/images/tupian/${scope.row.pfile}`" >{{scope.row.pfname}}</a>
                  </template>
                </el-table-column>
               
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click.native="handleEdit(scope.$index,scope.row)" >编辑</el-button>
         
        </template>
      </el-table-column>
      <el-table-column
          prop="attach"
          label="附件管理"
          width="180">
          <template slot-scope="scope">
            <el-button size='small' type="primary" @click="uploadBtnClick(scope.$index,scope.row)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </template>
        </el-table-column>
      
    </el-table>
    <el-pagination
                           
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="100"
                            >   
                    </el-pagination>
      <el-dialog
        title="附件管理"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form ref="elform" :model="elform" >
          <!-- 1.将<el-upload>代码添加到<el-dialog>代码块中 -->
              <el-form-item label="请选择要上传的文件" >
          <el-upload
            class="upload-demo"
            drag
            action="http://175.24.24.187:8080/images/tupian/"
             :on-remove="handleRemove"
            :on-change="fileChange"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-exceed="exceedFile"
             :before-upload="beforeUploadFile"
            :before-remove="beforeRemove"
            :auto-upload="false"
            name="file"
            :file-list="attachList"
            :limit="1"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传文件，不超过100M</div>
          </el-upload>
          </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click=" submitUpload()" >确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑"
   :visible.sync="editFormVisible"
   :close-on-click-modal="false"
   class="edit-form"
   :before-close="handleClose">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="问题" prop="pproblem">
            <el-input  type="textarea" v-model="editForm.pproblem" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="panswer">
            <el-input type="textarea" v-model="editForm.panswer" auto-complete="off"></el-input>
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
   
  methods: {
      submitSearchs(){
            //  this.searchsParams.pageIndex = 0
              this.getusernamedata()
            //   this.currentPage = 1
            },
            getusernamedata(){
            this.$axios({
        method: "GET",
        url: "/problem/findLikeProblem",
        params: {
          pProblem: this.question,
        }  })
        .then((resp) => {
          console.log(resp.data);
          this.table_data = resp.data;
          
        })
        .catch((err) => {
          console.log(err);
        });
            },
          
          
      getitem1(val){
//val即是传进来的id值，也即value值
        var obj = {};
        obj = this.options.find((item) =>{
          return item.id ===val;
        });
        console.log(obj.type)
        console.log("id的值为："+val)
         var _this = this   //很重要！！
      this.$axios({
                  method:'GET',
                  url:`/problem/findTypeProblem`,
                  params:{
                    pType:val
                  }
                }).then((resp)=>{
                  console.log(resp);
                  this.table_data=resp.data
               
                  console.log(this.table_data.data);
                }).catch((err)=>{
                  console.log(err);
                });
      },
      uploadBtnClick(index,row){
     
     this.dialogVisible = true;
    this.elform = Object.assign({}, row);
      },
      // 上传文件

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
        if(extension !== '.doc,.docx,.pdf,jpg,.png,.xls,.mp4') {
          this.$message.warning('该文件类型不符合');
        }
        if(size > 100) {
          this.$message.warning('文件大小不得超过100M')}
      },
         submitUpload(){
        
            if (this.attachList.length === 0){
          this.$message.warning('请上传文件');
        } else {
          console.log(this.attachList[0].raw)
          const form = new FormData();
          
          form.append('file',this.attachList[0].raw);
          form.append('id',this.elform.id);
          form.append('fName',this.attachList[0].name)
         
         this.$axios({
            method:"post",
            url: "/problem/upload",
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
                this.getdata()
         }   ,
           
            handleSuccess(res,file,attachList){
               
                console.log(res,file,attachList)
             this.$message.sucess("文件上传成功");
            },
            handleError(err,file,attachList){
                console.log(err,file,attachList)
            this.$message.error('文件上传失败')
            },
    getdata(){
     var _this = this   //很重要！！
            axios.get('/problem/findAllProblem?index=0')
                .then(function (res) {
                    console.log(res);
                    _this.table_data = res.data
                })
                .catch(function (error) {
                    console.log(error);
                });
    },
    handleSizeChange(val) {
console.log(`每页 ${val} 条`);
// this.pagesize=`${val}`;
// let url=`http://127.0.0.1:3000/getGoodList?pageSize=${val}`
// this.axios.get(url).then(result=>{
// this.tableData=result.data.data;
// })
},
// 当页码数发生改变的时候执行的函数 val代表页数 没问题了
handleCurrentChange(val) {
console.log( `这是${val}页`)
let url=`/problem/findAllProblem?index=${val-1}` //pno=${this.pno++}`
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
    handleEdit(index,row) {
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




//点击更新
handleUpdate(formName) { 
    //更新的时候就把弹出来的表单中的数据写到要修改的表格中
    var data = {
        id:this.editForm.id,
        pproblem:this.editForm.pproblem,
        panswer:this.editForm.panswer,

    }
    
    //这里再向后台发个post请求重新渲染表格数据
   axios.post('/problem/alterProblem', data).then(
        res => {
          if (res.code === 200) {
            this.$message("修改成功！")
          }
          else {
            this.$message(res.data)
          }
        }
      )
 this.getdata()
    this.editFormVisible = false;
   
}
  },
  mounted: function() {
     var _this = this   //很重要！！
      this.$axios({
                  method:'GET',
                  url:'/problem/findAllProblem?index=0'
                }).then((resp)=>{
                  console.log(resp);
                  this.table_data=resp.data
                  console.log(this.table_data.data);
                }).catch((err)=>{
                  console.log(err);
                });
                 var _this = this   //很重要！！
      this.$axios({
                  method:'GET',
                  url:'/type/findAllType?index=0'
                }).then((resp)=>{
                  console.log(resp);
                  this.options=resp.data.data
                 
                }).catch((err)=>{
                  console.log(err);
                });
  },
  

  data() {
    return {
     pfile:'',
     pfname:'',
      question:'',
      form:{
        ptype:''
      },
      options: [{
          value: '选项1',
          label: '报销'
        }, {
          value: '选项2',
          label: '财务'
        }],
        editFormVisible:false,
        value: '',
        radio:false,
        // 添加属性，默认值为false,表示弹框不显示
      dialogVisible: false,
      // 2.设置文件列表属性attachList,需要绑定到<el-upload>元素上。默认值为空数组，表示文件列表为空
      attachList: [],

      file:'',
      editForm:{
        id:'',
       pproblem:'',
       panswer:''
       },
       textarea:'',
      editFormRules: {
					pproblem: [
			            { required: true, message: '请输入问题', trigger: 'blur' },
			        ],
					panswer: [
						{ required: true, message: '请输入答案', trigger: 'blur' }
					],
         
				},
      multipleSelection: [], //复选框，数据
   
      selection: true, //是否需要复选框
    
      //表头信息
      //表格数据
      table_data: {
        
      },
      elform:{
       id:''
      },
      type:'',
      tableData:{},
       currentPage:0, //初始页
                pagesize:10,    //    每页的数据
    };
  }
};
</script>
<style scoped>
.el-dialog__header{
  background:#EBEEF5;
  border-bottom: 1px solid#EBEEF5;
}
 .el-dialog{
  text-align: left;
}
.el-upload,.el-upload .el-upload-dragger{
  width: 100%;}
  a{
    color: dodgerblue;
    font-size: 12px;
    
}
</style>
