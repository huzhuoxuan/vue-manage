<template>
    <div>
        <head-top></head-top>
         <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="请选择类别" prop="ptype">
         <el-select v-model="form.ptype" placeholder="请选择" @change="getitem1">
    <!--使用v-for对变量models进行遍历，每一项均作为select的option，{{item.name}}为显示的内容-->
	<el-option  v-for="item in options" :key="item.id" :lable="item.type" :value="item.id" >{{item.type}}</el-option>
</el-select>

          </el-form-item>   
     
       <el-form-item label="请输入问题" prop="pproblem">
       <el-input v-model="form.pproblem" type="textarea" placeholder="请输入内容" autosize></el-input>
 </el-form-item>
<el-form-item label="请输入答案" prop="panswer">
        
           
   <el-input v-model="form.panswer" type="textarea" placeholder="请输入内容" autosize></el-input>
 </el-form-item>

        
        <el-form-item label="上传文件" prop="pfile">
           <el-button  size='small' type="primary" @click="dialogVisible=true"  >上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
           </el-form-item>
        </el-form>
        </el-col>
         </el-row>
        <div class="submit_btn">
  			<el-button type="primary" @click="submit">提交</el-button>
        </div>
        <el-dialog
        title="附件管理"
        :visible.sync="dialogVisible"
        width="50%">
          <!-- 1.将<el-upload>代码添加到<el-dialog>代码块中 -->
             <el-form ref="form" :model="form" >
          <!-- 1.将<el-upload>代码添加到<el-dialog>代码块中 -->
              <el-form-item label="请选择要上传的文件">
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
            :file-list="attachList"
            :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">上传文件，且不超过100M</div>
          </el-upload>
           </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"  @click="dialogVisible=false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
   import headTop from '../components/headTop.vue'
    import axios from 'axios'
    
    export default {
        data(){
            return {
             rules: {
					pproblem: [
						{ required: true, message: '请输入问题', trigger: 'blur' },
					],
					panswer: [
						{ required: true, message: '请输入答案', trigger: 'blur' }
					],
				
				},
              multipleSelection:[],
              radio:true,
              tableData:{},
              selection:true,
             dialogVisible:false,
            options: [],
        value: '',
       form:{
         id:'',
       pproblem:'',
       panswer:'',
       ptype:''
       },
      attachList:[],
     
            }
        },
    	components: {
    		headTop,
    	},
        
        mounted(){
           var _this = this   //很重要！！
            axios.get('/type/findAllType?index=0')
                .then( (res)=> {
                    console.log(res);
                   this.options= res.data.data
                })
                .catch((error)=> {
                    console.log(error);
                });
        },
        methods: {
         getitem1(val){
//val即是传进来的id值，也即value值
        var obj = {};
        obj = this.options.find((item) =>{
          return item.id ===val;
        });
        console.log(obj.type)
        console.log("id的值为："+val)
      },
        handleChange(val){
        console.log(val)
        },
		    submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
                 this.test1()
                 
                setTimeout(() => {
                   this.handleupdate()
        //代码
     }, 1000);
                
            },
           test1() {
      this.$axios({
        method: "POST",
        url: "/problem/addProblem",
        data: {
          ptype:this.form.ptype,
          pproblem:this.form.pproblem,
          panswer:this.form.panswer,
          pfile:this.form.fileName
        },
      })
        .then((resp) => {
          console.log(resp);
         this.form.id=resp.data.data
        })
        .catch((err) => {
          console.log(err);
        }); 
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
          form.append('id',this.form.id);
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
        
        },
        cerated(){
        
  }
        
    }
        
</script>

<style lang="less">
	@import '../style/mixin';
	.edit_container{
		padding: 40px;
		margin-bottom: 40px;
	}
	.editer{
		height: 350px;
	}
	.submit_btn{
		text-align: center;
	}
</style>