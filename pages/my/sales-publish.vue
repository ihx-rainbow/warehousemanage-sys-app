<template>
	<view class="manage-page">
				
				<view class="form-group">
					<view class="label">订单标题:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.name" placeholder="请输入订单标题" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">销售商品:</view>
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
					<view class="label">销售客户:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.custname" placeholder="请输入销售客户" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">订单日期:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.time" placeholder="请输入订单日期" @click="calendar.showTime=true"/>
					</view>
				</view>
				<u-calendar
						:show="calendar.showTime"
						defaultDate="2023-02-15"
						@confirm="confirmTime"
						@close="calendar.showTime=false"></u-calendar>

				<view class="form-group">
					<view class="label">销售单价:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.price" placeholder="请输入销售单价" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">数量:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.num" placeholder="请输入数量" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">销售总额:</view>
					<view class="inputClass">
						<input class="input" type="text" v-model="form.amount" placeholder="请输入销售总额" />
					</view>
				</view>


				<view class="form-group">
					<view class="label">状态:</view>
					<view class="inputClass">
						<radio-group :value="form.stateRadio" @change="stateRadioRadioChange">
							<radio :value="'已下单'" :checked="form.stateRadio === '已下单'">已下单</radio>
							<radio :value="'已出库'" :checked="form.stateRadio === '已出库'">已出库</radio>
							<radio :value="'已发货'" :checked="form.stateRadio === '已发货'">已发货</radio>
							<radio :value="'已完成'" :checked="form.stateRadio === '已完成'">已完成</radio>
						</radio-group>
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
					name:'',
					goodsId:'',
					custname:'',
					time:'',
					price:'',
					num:'',
					amount:'',
					stateRadio:'',
				},
				goodsList: [],
				goodsIndex: 0,
				calendar:{},
			}
		},
		onLoad(options){
			_self = this;
			this.getGoodsList()
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
				uni.$u.http.get('/front/sales/'+id).then(res => {
					this.form = res.data.data
					const goodsCurrentIndex = this.goodsList.findIndex(c => c.id === this.form.goodsId);
					this.goodsIndex = goodsCurrentIndex
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
			stateRadioRadioChange(e){
				this.form.stateRadio = e.detail.value
			},
			//保存数据
			save(){
				_self.form.userId = this.userInfo.id
				uni.$u.http.post('/front/sales',_self.form,{dataType: 'json'}).then(res => {
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