<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-submenu index="2">
						<template slot="title">用户管理</template>
						<el-menu-item index="userList">删除管理员</el-menu-item>
						<el-menu-item index="adduser">新增管理员</el-menu-item>
						<el-menu-item index="modify">修改管理员</el-menu-item>
						
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">教职工管理</template>
						<el-menu-item index="addteacher">新增教职工</el-menu-item>
						<el-menu-item index="deleteteacher">删除教职工</el-menu-item>
						<el-menu-item index="modifyuser">修改教职工</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">类别管理</template>
						<el-menu-item index="addlei">新增类别</el-menu-item>
						<el-menu-item index="deletelei">删除类别</el-menu-item>
						<el-menu-item index="xiugailei">修改类别</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title">问题管理</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item index="vueEdit">新增问题</el-menu-item>
						<el-menu-item index="deletequestion">删除问题</el-menu-item>
						<el-menu-item index="modifyquestion">修改问题</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title">统计管理</template>
						<el-menu-item index="manage">统计管理</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title">反馈管理</template>
						<el-menu-item index="List">反馈管理</el-menu-item>
						
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>


export default {
		mounted(){
   
		},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	
</style>
