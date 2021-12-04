<template>

  <div>
    <head-top></head-top>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="请选择类别" prop="ptype">
         <el-select v-model="form.ptype" placeholder="请选择" @change="getitem1">
    <!--使用v-for对变量models进行遍历，每一项均作为select的option，{{item.name}}为显示的内容-->
	<el-option  v-for="item in options" :key="item.id" :lable="item.type" :value="item.id" >{{item.type}}</el-option>
</el-select>

          </el-form-item>   
      </el-form>
<div>
       <el-button size='small' type="primary" @click="dialogVisible = true">批量上传<i class="el-icon-upload el-icon--right"></i></el-button>
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
          <!-- 全局控制的编辑 -->
          <div v-if="is_edit&&scope.row.add==undefined" style="display: inline-block;">
          
            <el-button
              size="small"
              type="success"
              :plain="true"
              v-if="scope.row.edit"
              @click="handleSave(scope.$index, scope.row)"
            >保存</el-button>
          </div>
          <!-- 添加控制 -->
          <div v-if="scope.row.add!=undefined&&scope.row.add" style="display: inline-block;">
            <!-- 保存 -->
            <el-button
              size="small"
              type="success"
              :plain="true"
              v-if="scope.row.edit"
              @click="handleSave(scope.$index, scope.row)"
            >Save</el-button>
          </div>
          <!-- 全局控制删除 -->
          <el-button
            size="small"
            v-if="is_delete&&scope.row.add==undefined"
            :plain="true"
            type="danger"
            @click="handleDelete(scope.$index,scope.row,table_data.data)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="附件管理"
        :visible.sync="dialogVisible"
        width="50%">
        <el-form ref="form" :model="form" >
          <!-- 1.将<el-upload>代码添加到<el-dialog>代码块中 -->
              <el-form-item label="请选择要上传的文件">
     <el-upload
          ref="form"
            class="upload-demo"
            drag
            action="/problem/problemExcel"
             :on-remove="handleRemove"
            :on-change="fileChange"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-exceed="exceedFile"
             accept=".xls, .xlsx"
             :before-upload="beforeUploadFile"
            :before-remove="beforeRemove"
            :auto-upload="false"
            :file-list="attachList"
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
    <el-pagination
                           
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10]" 
                            :page-size="pagesize"         
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total"
                            >   
                    </el-pagination>
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
            // var _this = this   //很重要！！
            // axios.get('/problem/findAllProblem')
            //     .then(function (res) {
            //         console.log(res);
            //         _this.tableData = res.data
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },
  methods: {
    getData(){
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
    },
    //隔行变色
    tableRowClassName() {
      //选取DOM节点
      var trs = this.$refs.mytable.$el
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
      for (var i in trs) {
        if (i % 2 == 0) {
          //当隔行变色未true时改变颜色
          if (this.space_color) {
            trs[i].style.backgroundColor = "#f0f9eb";
          } else {
            trs[i].style.backgroundColor = "";
          }
        }
      }
    },

    //多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("selection:", this.multipleSelection);
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      row.edit = true;
    },
    //删除
    handleDelete(index, row,table_data) {
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
          this.$axios.get("/problem/deleteProblem",{
                   params :{
                         id:row.id
                    }
                }).then(res=>{
                    if(res.data=="删除成功"){
                       this.getdata()
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
            url: "/problem/problemExcel",
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
                this.getData()
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
    handleCurrentChange(val){
      this.currentPage=val;
      // this.gettabledata()
      let url=`/problem/findAllProblem?index=${val-1}` //pno=${this.pno++}`
this.$axios.get(url).then(resp=>{
this.table_data=resp.data;
    })
    },
    //保存
    handleSave(index, row) {
      console.log(index, row);
      row.edit = false;

      delete this.table_data[index].add;

      this.$message({
        message: "保存成功！",
        type: "success"
      });
    },
    handleAdd() {
      var addDataJson = {};
      for (var key in this.new_date_json) {
        if (key === "edit") {
          delete addDataJson[key];
        } else if (key === "add") {
          delete addDataJson[key];
        } else {
          addDataJson[key] = "";
        }
      }
      addDataJson.edit = true;
      addDataJson.add = true;
      this.table_data.push(addDataJson);
    },
    //初始化编辑属性
    initEditAttribute() {
      var self = this;
      var edit = self.edit;

      var dataArray = [
        {
         question:'财务问题',
         answer:'xxx'
        }, {
         question:'财务问题',
         answer:'xxx'
        }, {
         question:'财务问题',
         answer:'xxx'
        }
        
      ];

      if (dataArray.length > 0) {
        //添加编辑事件
        for (var index in dataArray) {
          dataArray[index]["edit"] = false;
          this.table_data.push(dataArray[index]);
        }

        if (Object.keys(this.new_date_json).length === 0) {
          //新增时，初始化数据结构
          this.initAddDataJson(dataArray[0]);
        }
      }
      console.log("this.tableData:", this.table_data);
    },
    initAddDataJson(dataArray) {
      //新增时，初始化数据结构
      var dataJson = dataArray;
      var newDateJson = {};
      for (var key in dataJson) {
        if (key === "edit") {
          newDateJson[key] = "true";
        } else {
          newDateJson[key] = "";
        }
      }
      newDateJson["add"] = true;
      this.new_date_json = newDateJson;
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
    this.initEditAttribute();
    //确保方法在页面渲染后调用
    this.$nextTick(function() {
      /////方法
      this.tableRowClassName();
    });
  },
  watch: {
    space_color: function() {
      //监听数据变化
      this.$nextTick(function() {
        /////方法
        this.tableRowClassName();
      });
    },
    table_data: function() {
      //监听数据变化f
      this.$nextTick(function() {
        /////方法
        this.tableRowClassName();
      });
    }
  },
  data() {
    return {
      dialogVisible:false,
      form:{
        ptye:''
      },
       options: [],
        value: '',
      new_date_json: {}, //数据结构
      multipleSelection: [], //复选框，数据
      is_edit: true, //是否可编辑
      is_delete: true, //是否可删除
      selection: true, //是否需要复选框
      radio: false, //单选变色
      space_color: true, //隔行变色
      //表头信息
      table_columns: [
        {
          prop: "pproblem",
          label: "问题",
          
        },
        {
          prop: "panswer",
          label: "答案",
          width:"900"
        },{
          prop:"pfile",
          label:"文件",
         
        
        },
        {
          prop:"pvideo",
          label:"音频",
          
        }
      ],
      //表格数据
      table_data: [],
      type:'',
      tableData:{},
      currentPage:0, //初始页
                pagesize:10,    //    每页的数据
               total:100,
               length:0,
               attachList:[]
    };
  }
};
</script>
<style scoped>
 a{
    color: dodgerblue;
    font-size: 12px;
    
}
</style>