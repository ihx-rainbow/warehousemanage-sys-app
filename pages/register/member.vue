<template>
	<view class="register-page">
	  <view class="titleView">
		<text class="title">员工注册</text>
	  </view>
	  <view class="form-group">
	    <view class="label">用户名:</view>
	    <input class="input" type="text" v-model="form.username" placeholder="请输入用户名" />
	  </view>
	  <view class="form-group">
	    <view class="label">密码:</view>
	    <input class="input" type="password" v-model="form.password" placeholder="请输入密码" />
	  </view>
	  <view class="form-group">
	    <view class="label">确认密码:</view>
	    <input class="input" type="password" v-model="form.confirmPassword" placeholder="请确认密码" />
	  </view>
	  <view class="form-group">
	    <view class="label">邮箱:</view>
	    <input class="input" type="email" v-model="form.email" placeholder="请输入邮箱" />
	  </view>
	  <button class="submit-btn" @click="register">注册</button>
	  <button class="reset-btn" @click="toLogin">登录</button>
	  
	  <u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					 username: '',
					 password: '',
					 confirmPassword: '',
					 email: '',
					 role:''
				 }
			}
		},
		methods: {
			//用户注册
			register() {
			  if(this.form.username==null || this.form.username==''){
				  this.$u.toast('请输入用户名')
				  return
			  }
			  if(this.form.password==null || this.form.password==''){
			  	  this.$u.toast('请输入密码')
			  	  return
			  }
			  if(this.form.confirmPassword==null || this.form.confirmPassword==''){
			  	  this.$u.toast('请输入确认密码')
			  	  return
			  }
			  if(this.form.password!=this.form.confirmPassword){
			  	  this.$u.toast('两次密码输入不一致')
			  	  return
			  }
			  
			  //注册角色
			  this.form.role = 'member'
			  
			  uni.$u.http.post('/register', this.form,{dataType: 'json'}).then(res => {
			  	if(res.data.code=='200'){
			  		this.$u.toast('注册成功')
			  		this.form = {}
			  	}
			  }).catch(err => {
					this.$u.toast('注册失败')
			  })
			},
			//去登录页面
			toLogin(){
				uni.$u.route('/pages/login/login');
			}
		}
	}
</script>

<style>
	.register-page {
		padding: 20px;
	}

	.titleView{
		text-align: center;
		margin-bottom: 20px;

	}

	.title{
		font-size: 24px;
		margin: 0 auto;
		padding: 10px;
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
