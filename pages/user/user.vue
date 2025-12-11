<template>
	<view>
			<view class="u-flex u-flex-y-center u-flex-around user-box u-p-l-30 u-p-r-20 u-p-b-30 avatarHeader">
				<view class="u-m-r-10">
					<u-avatar :src="userInfo.avatar" size="90"></u-avatar>
					<button @click="uploadAvatar" size="mini" v-if='hasLogin'>更新头像</button>
				</view>
			</view>
			<view class="u-flex-around user-box u-p-l-30 u-p-r-20 u-p-b-30">
				<view class="u-font-18 u-p-b-20" v-if='!hasLogin'>用户未登录</view>
				<view class="u-font-18 u-p-b-20" v-if='hasLogin'>角色：
										{{userInfo.role=='member'?'员工':''}}
				</view>
				<view class="u-font-18 u-p-b-20" v-if='hasLogin'>账户：{{userInfo.username}}</view>
				<view class="u-font-18 u-p-b-20" v-if='hasLogin'>姓名：{{userInfo.name}}</view>
				<view class="u-font-18 u-p-b-20" v-if='hasLogin'>Email：{{userInfo.email}}</view>
			</view>
			
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell icon="account" title="员工登录" @click="toLogin" v-if="!hasLogin"></u-cell>
					<u-cell icon="setting" title="修改个人信息" @click="openPopupPerson" v-if='hasLogin'></u-cell>
					<u-cell icon="setting-fill" title="重置密码" @click="openPopupPassword" v-if='hasLogin'></u-cell>
					<u-cell icon="man-delete" title="注销登录" @click="toLogout" v-if='hasLogin'></u-cell>
				</u-cell-group>
			</view>
			
			<view class="u-m-t-20">
				<u-cell-group>
					<u-cell icon="scan" title="产品查询" v-if="hasLogin" @click="toPage('goods')"></u-cell>
					<u-cell icon="list" title="产品管理" v-if="hasLogin" @click="toMyPage('mygoods')"></u-cell>
					<u-cell icon="plus" title="录入产品" v-if="hasLogin" @click="toMyPage('goods-publish')"></u-cell>
					<u-cell icon="home" title="查询产品入库" v-if="hasLogin" @click="toMyPage('myinbound')"></u-cell>
					<u-cell icon="plus" title="添加产品入库记录" v-if="hasLogin" @click="toMyPage('inbound-publish')"></u-cell>
					<u-cell icon="order" title="查询销售订单" v-if="hasLogin" @click="toMyPage('mysales')"></u-cell>
					<u-cell icon="plus" title="添加销售订单" v-if="hasLogin" @click="toMyPage('sales-publish')"></u-cell>
					<u-cell icon="car" title="查询产品出库" v-if="hasLogin" @click="toMyPage('myoutbound')"></u-cell>
					<u-cell icon="star" title="添加产品出库记录" v-if="hasLogin" @click="toMyPage('outbound-publish')"></u-cell>
				</u-cell-group>
			</view>
		
			<!-- 修改个人资料 -->
			<u-popup
				:safeAreaInsetBottom="true"
				:safeAreaInsetTop="true"
				:mode="popupData.mode"
				:show="showPerson"
				:round="popupData.round"
				:overlay="popupData.overlay"
				:borderRadius="popupData.borderRadius"
				:closeable="popupData.closeable"
				:closeOnClickOverlay="popupData.closeOnClickOverlay"
				@close="closePerson"
				@open="open"
			>
				<view
					class="u-popup-slot"
					:style="{
						width: ['bottom', 'top'].includes(popupData.mode) ? '750rpx' : '200px',
						marginTop: ['left', 'right'].includes(popupData.mode) ? '480rpx' : '0',
					}"
				>
				
				<view class="popupContent">
					<u--form
							labelPosition="left"
							:model="model1"
							ref="form1"
						>
						<u-form-item
							label="姓名"
							prop="person.username"
							borderBottom
							ref="item1"
							labelWidth="60"
						>
							<u--input
								v-model="person.name"
								border="none"
								placeholder="请输入姓名"
							></u--input>
						</u-form-item>			
						<u-form-item
							label="邮箱"
							prop="person.email"
							borderBottom
							ref="item1"
							labelWidth="60"
						>
							<u--input
								v-model="person.email"
								border="none"
								placeholder="请输入邮箱"
							></u--input>
						</u-form-item>	
						<u-button
							type="primary"
							text="提交修改"
							customStyle="margin-top: 50px"
							@click="updatePerson"
						></u-button>
					</u--form>
					</view>
				</view>
			</u-popup>
			
			<!-- 修改密码 -->
			<u-popup
				:safeAreaInsetBottom="true"
				:safeAreaInsetTop="true"
				:mode="popupData.mode"
				:show="showPassword"
				:round="popupData.round"
				:overlay="popupData.overlay"
				:borderRadius="popupData.borderRadius"
				:closeable="popupData.closeable"
				:closeOnClickOverlay="popupData.closeOnClickOverlay"
				@close="closePassword"
				@open="open"
			>
				<view
					class="u-popup-slot"
					:style="{
						width: ['bottom', 'top'].includes(popupData.mode) ? '750rpx' : '200px',
						marginTop: ['left', 'right'].includes(popupData.mode) ? '480rpx' : '0',
					}"
				>
				
				<view class="popupContent">
					<u--form
										labelPosition="left"
										:model="model1"
										ref="form1"
									>
						<u-form-item
							label="原密码"
							prop="password.password"
							borderBottom
							ref="item1"
							labelWidth="100"
						>
							<u--input
								v-model="password.password"
								border="none"
								placeholder="请输入原密码"
							></u--input>
						</u-form-item>			
						<u-form-item
							label="新密码"
							prop="password.newPassword"
							borderBottom
							ref="item1"
							labelWidth="100"
						>
							<u--input
								v-model="password.newPassword"
								border="none"
								placeholder="请输入新密码"
							></u--input>
						</u-form-item>	
						<u-form-item
							label="确认新密码"
							prop="password.confirmPassword"
							borderBottom
							ref="item1"
							labelWidth="100"
						>
							<u--input
								v-model="password.confirmPassword"
								border="none"
								placeholder="请输入确认新密码"
							></u--input>
						</u-form-item>	
						<u-button
							type="primary"
							text="修改密码"
							customStyle="margin-top: 50px"
							@click="updatePassword"
						></u-button>
					</u--form>
					</view>
				</view>
			</u-popup>
		</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import config from '../../config'
	
	export default {
		data() {	
			return {
				showPerson: false,
				showPassword: false,
				popupData: {
					overlay: true,
					mode: 'bottom',
					borderRadius: '',
					closeable: true,
					closeOnClickOverlay: true
				},
				person:{},
				password:{},
				fileList:[]
			}
		},
		onShow() {

		},
		computed:{
			...mapState(['userInfo','token','hasLogin'])	
		},
		methods: {	
			...mapMutations(['login','logout']),
			//去注册页面
			memberRegsiter(){
				uni.$u.route('/pages/register/member');
			},
			toPage(table){
				uni.$u.route('/pages/'+table+'/'+table);
			},
			toMyPage(url){
				uni.$u.route('/pages/my/'+url);
			},
			//去登录页面
			toLogin(){
				uni.$u.route('/pages/login/login');
			},
			//退出登录
			toLogout(){
				//清空用户数据
				this.logout();
				this.$u.toast('成功注销')
				//用户中心
				uni.switchTab({
				    url: '/pages/user/user',
				})
			},
			//弹出框
			openPopupPerson() {
				uni.$u.sleep().then(() => {
					this.showPerson = !this.showPerson
				})		
			},
			closePerson(){
				this.showPerson = false
			},
			//弹出框
			openPopupPassword() {
				uni.$u.sleep().then(() => {
					this.showPassword = !this.showPassword
				})		
			},
			closePassword(){
				this.showPassword = false
			},
			//修改个人资料
			updatePerson(){
				this.person.uid = this.userInfo.uid
				this.person.id = this.userInfo.id
				uni.$u.http.put('/updateUser', this.person,{dataType: 'json'}).then(res => {
					if(res.data.code=='200'){
						this.$u.toast('资料修改成功')
						this.showPerson = false
						this.person = {}
						this.logout();
					}else{
						this.$u.toast(res.data.msg)	
					}
				}).catch(err => {
					this.$u.toast('资料修改失败')
				})
			},
			//修改密码
			updatePassword(){
				this.password.uid = this.userInfo.uid
				this.password.id = this.userInfo.id
				uni.$u.http.post('/password/change', this.password,{dataType: 'json'}).then(res => {
					if(res.data.code=='200'){
						this.$u.toast('密码重置成功')
						this.showPassword = false
						this.password = {}
						this.logout();
					}else{
						this.$u.toast(res.data.msg)	
					}
				}).catch(err => {
					this.$u.toast('密码重置失败')
				})
			},
			//上传头像
			uploadAvatar() {
			  uni.chooseImage({
			    count: 1, // 可选择的图片数量
			    sizeType: ['original', 'compressed'], // 图片尺寸类型，原图或压缩图
			    sourceType: ['album', 'camera'], // 图片来源，相册或相机
			    success: (res) => {
			      const tempFilePaths = res.tempFilePaths // 用户选择的文件路径
			      // 调用上传接口上传图片
			      uni.uploadFile({
			        url: config.baseUrl+'/file/upload', // 上传服务器的URL
			        filePath: tempFilePaths[0], // 要上传的文件路径
			        name: 'file', // 上传文件的标识符
					header: {
					  'Authorization':'Bearer '+this.token // 将token添加到请求头中
					},
			        formData: {}, // 附带的表单数据
			        success: (res) => {
			          const data = JSON.parse(res.data) // 上传成功后的响应数据
			          this.userInfo.avatar = data.data
					  
					  //更新用户表的头像地址
					  this.person.uid = this.userInfo.uid
					  this.person.id = this.userInfo.id
					  this.person.avatar = data.data
					  uni.$u.http.put('/updateAvatar', this.person,{dataType: 'json'}).then(res => {
					  	if(res.data.code=='200'){
					  		this.$u.toast('头像修改成功')
					  		this.showPerson = false
					  		this.person = {}
					  		this.logout();
					  	}else{
					  		this.$u.toast(res.data.msg)	
					  	}
					  }).catch(err => {
					  	this.$u.toast('头像修改失败')
					  })
			        },
			        fail: (err) => {
			          
			        }
			      })
			    },
			    fail: (err) => {
			    }
			  })
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ededed;
	}

	.avatarHeader{
		height: 280rpx;
	}
	.camera{
		width: 54px;
		height: 44px;

	&:active{
		 background-color: #ededed;
	 }
	}
	.user-box{
		background-color: #996666;
		color: #fff;
		text-align: center;
	}
	.u-cell-group {
		background-color: #fff;
	}

	.popupContent{
		padding:10px;
	}

</style>
