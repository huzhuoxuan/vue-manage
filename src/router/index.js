import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const adduser = r => require.ensure([], () => r(require('@/page/adduser')), 'adduser');
const addteacher = r => require.ensure([], () => r(require('@/page/addteacher')), 'addteacher');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const List = r => require.ensure([], () => r(require('@/page/List')), 'List');
const modify = r => require.ensure([], () => r(require('@/page/modify')), 'modify');
const modifyuser = r => require.ensure([], () => r(require('@/page/modifyuser')), 'modifyuser');

const deleteteacher = r => require.ensure([], () => r(require('@/page/deleteteacher')), 'deleteteacher');

const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const deletequestion = r => require.ensure([], () => r(require('@/page/deletequestion')), 'deletequestion');
const modifyquestion = r => require.ensure([], () => r(require('@/page/modifyquestion')), 'modifyquestion');

const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const addlei = r => require.ensure([], () => r(require('@/page/addlei')), 'addlei');
const deletelei = r => require.ensure([], () => r(require('@/page/deletelei')), 'deletelei');
const xiugailei = r => require.ensure([], () => r(require('@/page/xiugailei')), 'xiugailei');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: ['统计管理'],
		},{
			path: '/adduser',
			component: adduser,
			meta: ['用户管理', '添加管理员'],
		},{
			path: '/addteacher',
			component: addteacher,
			meta: ['教职工管理', '添加教职工'],
		},{
			path: '/userList',
			component: userList,
			meta: ['用户管理', '删除管理员'],
		},{
			path: '/List',
			component: List,
			meta: ['反馈管理'],
		},{
			path: '/modify',
			component: modify,
			meta: ['用户管理', '修改管理员'],
		},
		{
			path: '/modifyuser',
			component: modifyuser,
			meta: ['教职工管理', '修改教职工'],
		},{
			path: '/deleteteacher',
			component: deleteteacher,
			meta: ['教职工管理', '删除教职工'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['问题管理', '增加问题'],
		},
		{
			path: '/deletequestion',
			component: deletequestion,
			meta: ['问题管理', '删除问题'],
		},{
			path: '/modifyquestion',
			component: modifyquestion,
			meta: ['问题管理', '修改问题'],
		},{
			path: '/addlei',
			component: addlei,
			meta: ['类别管理', '新增类别'],
		},{
			path: '/deletelei',
			component: deletelei,
			meta: ['类别管理', '删除类别'],
		},{
			path: '/xiugailei',
			component: xiugailei,
			meta: ['类别管理', '修改类别'],
		}]
	}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
	  next();
	} else {
	  let token = localStorage.getItem('Authorization');
   
	  if (token === null || token === '') {
		next('/login');
	  } else {
		next();
	  }
	}
  });
export default router
