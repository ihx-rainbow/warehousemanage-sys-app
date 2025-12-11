<template>
	<view class="login-page">
	  <view class="titleView">
		<text class="title">员工登录</text>
	  </view>
	  <view class="form-group">
	    <view class="label">用户名:</view>
	    <input class="input" type="text" v-model="form.username" placeholder="请输入用户名" />
	  </view>
	  <view class="form-group">
	    <view class="label">密码:</view>
	    <input class="input" type="password" v-model="form.password" placeholder="请输入密码" />
	  </view>
	  <button class="submit-btn" @click="userLogin">登录</button>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				form:{
					username:'',
					password:'',
				}
			}
		},
		methods: {
			...mapMutations(['login']),
			//登录
			userLogin(){
				if(this.form.username==null || this.form.username==''){
					  this.$u.toast('请输入用户名')
					  return
				}
				if(this.form.password==null || this.form.password==''){
					  this.$u.toast('请输入密码')
					  return
				}
				
				uni.$u.http.post('/login', this.form,{dataType: 'json'}).then(res => {
					if(res.data.code=='200'){
						// 保存用户信息
						this.login(res.data.data);
						this.$u.toast('登录成功')
						this.form = {}
						//用户中心
						uni.switchTab({
						    url: '/pages/user/user',
						})
					}else{
						this.$u.toast(res.data.msg)
						this.form = {}
					}
				}).catch(err => {
						this.$u.toast('登录失败')
				})
			},
			//去注册页面
			memberRegsiter(){
				uni.$u.route('/pages/register/member');
			},
		}
	}
</script>

<style>
.login-page {
  padding: 20px;
}

.titleView{
	text-align: center;
	margin-bottom: 20px;
}

.title{
	font-size: 24px;
	margin: 0 auto;
	color: #996666;
	font-weight: bold;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.label {
  width: 80px;
  text-align: right;
  margin-right: 10px;
  font-size: 16px;
  color: #333;
}

.input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
	background-color: #996666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
	background-color: #996666;
}

.reset-btn {
  margin-top: 10px;	
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #996666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
