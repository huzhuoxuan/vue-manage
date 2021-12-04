<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="formData.username"></el-input>
					</el-form-item>
					<el-form-item label="职工号" prop="tid">
						<el-input v-model="formData.tid"  ></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formData.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="v_passord">
						<el-input v-model="formData.v_password"></el-input>
					</el-form-item>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="onSubmit">立即创建</el-button>
					</el-form-item>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="resetForm(formName)">取消</el-button>
					</el-form-item>
				</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
import axios from 'axios'
    import headTop from '@/components/headTop'
   
    export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					username: '', 
					tid: '', 
					password: '',
					v_password: '',
		        },
		        rules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						
					],
					tid: [
						{ required: true, message: '请输入职工号', trigger: 'blur' },
						{min:10,max:10,message:'请输入正确的职工号'}
					],
					password: [
						{ required: true, message: '请输入密码' ,trigger:'blur'}
        ],
       
					v_password: [
						{required:true, message:'请确认密码', trigger:'blur'},
                       {
                validator:(rule,value,callback)=>{
                 if(value===''){
             callback(new Error('请再次输入密码'))
            }else if(value!==this.formData.password){
           callback(new Error('两次输入密码不一致'))
          }else{
          callback( )
          }
        },
 
    }
					]
				},
				
			    
    		}
    	},
    	components: {
    		headTop,
    	},
		computed:{
        
		},
    	methods: {
			 onSubmit () {
				 
				  
      if (this.formData.username === '' || this.formData.tid === '' || this.formData.password=== '' ) {
        alert('请按照要求填写后再提交')
      }   
	  else if(this.formData.tid.length!=10){
		  alert('教工号填写错误')
	  }
	  else if(this.formData.password!=this.formData.v_password ){
      alert('密码与确认密码不一致')
	  }
	  else{
     this.test()
	 
      alert('发布成功返回首页')
      this.$router.push('/userList')
	  }
	  
    },
	test() {
      this.$axios({
        method: "POST",
        url: "/admin/addAdmin",
        data: {
          username: this.formData.username,
          tid: this.formData.tid,
          password: this.formData.password,
          
        },
      })
        .then((resp) => {
          console.log(resp);
          this.formData = resp.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
   
    		
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
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
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
