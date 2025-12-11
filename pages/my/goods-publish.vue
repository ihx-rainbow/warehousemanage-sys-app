<template>
	<view class="manage-page">
				
				<view class="form-group">
					<view class="label">产品类别:</view>
					<view class="inputClass">
						<picker mode="selector" :range="categoryList" :range-key="'name'"
								@change="categoryPickerChange">
							<view class="picker">
								{{ categoryList[categoryIndex].name }}
							</view>
						</picker>
					</view>
				</view>


				<view class="form-group">
					<view class="label">产品名称:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.name" placeholder="请输入产品名称" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">产品码:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.code" placeholder="请输入产品码" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">摆放货架:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.shelves" placeholder="请输入摆放货架" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">规格:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.spec" placeholder="请输入规格" />
					</view>
				</view>


				<button class="submit-btn" @click="save">确认保存</button>
				<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {ref} from 'vue';
	import config from '../../config'
	import tColorPicke from '@/components/t-color-picker.vue';
	
	var _self;
	export default {
		components: {
			't-color-picker': tColorPicke
		},
		data() {
			return {
				form: {
					categoryId:'',
					name:'',
					code:'',
					shelves:'',
					stock:'',
					spec:'',
				},
				categoryList: [],
				categoryIndex: 0,
			}
		},
		onLoad(options){
			_self = this;
			this.getCategoryList()
			this.id = options.id
			if(this.id!=null) {
				this.loadOne(this.id)
			}
		},
		computed: {
			...mapState(['userInfo', 'token', 'hasLogin']),
		},
		methods: {
			loadOne(id){
				uni.$u.http.get('/front/goods/'+id).then(res => {
					this.form = res.data.data
					const categoryCurrentIndex = this.categoryList.findIndex(c => c.id === this.form.categoryId);
					this.categoryIndex = categoryCurrentIndex
				}).catch(err => {
				})
			},
			getCategoryList() {
				uni.$u.http.get('/front/category/list').then(res => {
					this.categoryList = res.data.data
					this.form.categoryId = this.categoryList[this.categoryIndex].id;
				}).catch(err => {

				})
			},
			categoryPickerChange(e) {
				this.categoryIndex = e.target.value;
				this.form.categoryId = this.categoryList[this.categoryIndex].id;
			},
			//保存数据
			save(){
				_self.form.userId = this.userInfo.id
				uni.$u.http.post('/front/goods',_self.form,{dataType: 'json'}).then(res => {
					if(res.data.code=='200'){
						_self.$u.toast('保存成功')
					}else{
						_self.$u.toast(res.data.msg)
					}
				}).catch(err => {
					_self.$u.toast('保存失败')
				})
			},
		}
	}
</script>

<style>
	@import "../assets/editor.css";

	.manage-page {
		padding: 20px;
	}

	.titleView {
		text-align: center;
		margin-bottom: 20px;
	}

	.title {
		font-size: 24px;
		margin: 0 auto;
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
		flex: 1;
	}

	.infoLabel {}

	.inputClass {
		flex: 3;
	}

	.inputClass image {
		width: 60%;
		height: 110px;
		margin-top: 10px;
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

	.content {
		height: 600px;
		/* 指定滚动区域的高度 */
	}

	.content-inner {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}
</style>