<template>
	<view>
		<!-- 列表 -->
		<view class="data-list">
			<text class="listTitle">查询产品出库</text>
			<view v-for="(item, index) in dataList" :key="index" class="data-item">
				<view class="data-details">
					<view class="data-detail" @click="toDetail('outbound',item.id,'outbound-detail')">
						<view>出库日期：{{item.time}}</view>
						<view>出库产品：{{ goodsList.find(v => v.id === item.goodsId) ? goodsList.find(v => v.id === item.goodsId).name : '' }}</view>
						<view>出库数量：{{item.num}}</view>
					</view>
					<view class="data-date">
						<text style="color: red;float: right;margin-left: 10px;" @click="toDelete(item.id)">删除</text>
						<text style="color: red;float: right;margin-left: 10px;" @click="toEdit(item.id,'outbound-publish')">修改</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import { ref } from 'vue';
	
	export default {
		data() {
			return {
				dataList:[],
				goodsList: [],
			}
		},
		onShow() {
			//加载数据列表
			this.getDataList()
			this.getgoodsList()
		},
		computed: {
			...mapState(['userInfo','token','hasLogin']),
		},
		methods: {
			//加载数据列表
			getDataList(){
				uni.$u.http.get('/front/outbound/list').then(res => {
					this.dataList = res.data.data
				}).catch(err => {
				
				})
			},
			getgoodsList(){
				uni.$u.http.get('/front/goods/list').then(res => {
					this.goodsList = res.data.data
				}).catch(err => {

				})
			},
			//删除
			toDelete(id){
				uni.$u.http.delete('/front/outbound/del/'+id,{dataType: 'json'}).then(res => {
					if(res.data.code=='200'){
						this.$u.toast('删除成功')
						this.getDataList()
					}else{
						this.$u.toast(res.data.msg)	
					}
				}).catch(err => {
					this.$u.toast('删除失败')
				})
			},
			//跳转到详情页
			toDetail(table,id,url){
				uni.$u.route('/pages/'+table+'/'+url, {
					id: id
				});
			},
			//修改
			toEdit(id,url){
				uni.$u.route('/pages/my/'+url, {
					id: id
				});
			},
		}
	}
</script>

<style>

.list{
	margin-top: 10px;
}
.listTitle{
	font-size: 18px;
	margin-left: 20px;
	background-color: #996666;
	padding: 10px;
	color: #ffffff;
}

.data-list {
	padding:20rpx;
}
.data-item {
	display:flex;
	align-items:center;
	border-radius:10rpx;
	padding:20rpx;
	width: 90%;
	margin: 0 auto;
	margin-top: 20px;
	border-bottom: 1px solid #996666;
}
.data-details {
	flex:1;
}
.data-title {
	font-size:30rpx;
	font-weight:bold;
	margin-bottom:10rpx;
}
.data-date {
	font-size:24rpx;
	color:#999;
	margin-bottom:10rpx;
}
.data-description {
	font-size:26rpx;
	color:#666;
}

</style>
