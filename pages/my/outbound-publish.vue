<template>
	<view class="manage-page">
				
				<view class="form-group">
					<view class="label">出库产品:</view>
					<view class="inputClass">
						<picker mode="selector" :range="goodsList" :range-key="'name'"
								@change="goodsPickerChange">
							<view class="picker">
								{{ goodsList[goodsIndex].name }}
							</view>
						</picker>
					</view>
				</view>


				<view class="form-group">
					<view class="label">出库日期:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.time" placeholder="请输入出库日期" @click="calendar.showTime=true"/>
					</view>
				</view>
				<u-calendar
						:show="calendar.showTime"
						defaultDate="2023-02-15"
						@confirm="confirmTime"
						@close="calendar.showTime=false"></u-calendar>

				<view class="form-group">
					<view class="label">销售订单:</view>
					<view class="inputClass">
						<picker mode="selector" :range="salesList" :range-key="'name'"
								@change="salesPickerChange">
							<view class="picker">
								{{ salesList[salesIndex].name }}
							</view>
						</picker>
					</view>
				</view>


				<view class="form-group">
					<view class="label">出库数量:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.num" placeholder="请输入出库数量" />
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
					goodsId:'',
					time:'',
					salesId:'',
					num:'',
				},
				goodsList: [],
				goodsIndex: 0,
				calendar:{},
				salesList: [],
				salesIndex: 0,
			}
		},
		onLoad(options){
			_self = this;
			this.getGoodsList()
			this.getSalesList()
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
				uni.$u.http.get('/front/outbound/'+id).then(res => {
					this.form = res.data.data
					const goodsCurrentIndex = this.goodsList.findIndex(c => c.id === this.form.goodsId);
					this.goodsIndex = goodsCurrentIndex
					const salesCurrentIndex = this.salesList.findIndex(c => c.id === this.form.salesId);
					this.salesIndex = salesCurrentIndex
				}).catch(err => {
				})
			},
			getGoodsList() {
				uni.$u.http.get('/front/goods/list').then(res => {
					this.goodsList = res.data.data
					this.form.goodsId = this.goodsList[this.goodsIndex].id;
				}).catch(err => {

				})
			},
			goodsPickerChange(e) {
				this.goodsIndex = e.target.value;
				this.form.goodsId = this.goodsList[this.goodsIndex].id;
			},
			confirmTime(e){
				this.calendar.showTime = false
				this.form.time=e[0]

			},
			getSalesList() {
				uni.$u.http.get('/front/sales/list').then(res => {
					this.salesList = res.data.data
					this.form.salesId = this.salesList[this.salesIndex].id;
				}).catch(err => {

				})
			},
			salesPickerChange(e) {
				this.salesIndex = e.target.value;
				this.form.salesId = this.salesList[this.salesIndex].id;
			},
			//保存数据
			save(){
				_self.form.userId = this.userInfo.id
				uni.$u.http.post('/front/outbound',_self.form,{dataType: 'json'}).then(res => {
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