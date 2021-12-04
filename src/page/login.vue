<template>
  	 <div class="fillcontain">
		   
		  <div class="login_page">
	  	<transition name="form-fade" mode="in-out">
			  
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>财务问答系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="tid" label="教职工号">
						<el-input v-model="loginForm.tid" placeholder="教职工号"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password" label="密码">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
				
	  		</section>
			 
	  	</transition>
	   </div>
		   </div>
    
</template>

<script>
	
	import axios from 'axios'
	import qs from 'qs'
	export default {
	    data(){
			return {
				loginForm: {
					tid: '',
					password: '',
				},
				rules: {
					tid: [
			            {  message: '请输入教职工号', trigger: 'blur' },
			        ],
					password: [
						{  message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
			this.getCookie()
		},
		methods: {
			
			submitForm(formName){
				//保存的账号
      var name = this.loginForm.tid;
      //保存的密码
      var pass = this.loginForm.password;
      if (name == "" || name == null) {
        alert("请输入正确的用户名");
        return;
      } else if (pass == "" || pass == null) {
        alert("请输入正确的密码");
        return;
      }
	  //接口
this.$axios({
	method:"POST",
	url:`/admin/loginCheckAdmin`,
	params:{
		tid:this.loginForm.tid,
		password:this.loginForm.password
	}
	
}).then(res=>{
	
	console.log(res)
	if(res.data.code==200){
	alert('登录成功！')
	this.$router.push('manage')
	}else{
		alert('用户名或密码错误，请重新输入！')
	}
	
})

	// 	this.$axios.post(`/admin/loginCheckAdmin$`,{
	// 		name:this.loginForm.tid,
	// 		pasword:this.loginForm.password
	// 	}).then(res => {
    //         console.log(res);
    //       this.loginForm = res.data;
	// 	  alert('登录成功');
	// 	  this.$router.push('/manage')

	// 	}).catch(err=>{
    //     console.log(err);
	// 	alert('用户名或密码错误，请重新输入！');
	// 	this.loginForm.tid="";
	//   this.loginForm.password=""
	//   return;
	// 	})
        
    
    //   axios.post(`/admin/loginCheckAdmin?tid=${name}&password=${pass}`).then(res => {
    //     if (res.code == 403) {
    //       alert("用户名或密码错误,请重新输入");
    //       this.loginForm.tid = "";
    //       this.loginForm.password = "";
    //       return;
    //     } else {
    //      alert("登陆成功");
    //       this.$router.push("/manage");
    //     }
    //   });
    },
	//设置cookie
    setCookie(tid, password) {
      //字符串拼接cookie
      window.document.cookie =
        "tid" + "=" + tid + ";path=/;expires=" ;
      window.document.cookie =
        "password" + "=" + password + ";path=/;expires=" ;
    },
	 //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "tid") {
            this.loginForm.tid = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.loginForm.password = arr2[1];
          }
        }
      }
    },	
	//清除cookie
    clearCookie: function() {
      this.setCookie("", ""); //修改2值都为空，天数为负1天就好了
    }
	
    
  },
  
  
		
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background: blue;
	}
	.manage_tip{
	
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color:rgb(73, 144, 236);
		}
	}
	.form_contianer{
		.wh(320px, 250px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background: #fff;
		border: rgb(73, 144, 236)  solid 3px;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
