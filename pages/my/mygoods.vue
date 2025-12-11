<template>
	<view>
		<!-- 列表 -->
		<view class="data-list">
			<text class="listTitle">产品管理</text>
			<view v-for="(item, index) in dataList" :key="index" class="data-item">
				<view class="data-details">
					<view class="data-title" @click="toDetail('goods',item.id,'goods-detail')" >产品名称：{{ item.name }}</view>
					<view class="data-detail">
						<view>产品类别：{{ categoryList.find(v => v.id === item.categoryId) ? categoryList.find(v => v.id === item.categoryId).name : '' }}</view>
						<view>摆放货架：{{item.shelves}}</view>
						<view>产品码：{{item.code}}</view>
					</view>
					<view class="data-date">
						<text style="color: red;float: right;margin-left: 10px;" @click="toDelete(item.id)">删除</text>
						<text style="color: red;float: right;margin-left: 10px;" @click="toEdit(item.id,'goods-publish')">修改</text>
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
				categoryList: [],
			}
		},
		onShow() {
			//加载数据列表
			this.getDataList()
			this.getcategoryList()
		},
		computed: {
			...mapState(['userInfo','token','hasLogin']),
		},
		methods: {
			//加载数据列表
			getDataList(){
				uni.$u.http.get('/front/goods/list').then(res => {
					this.dataList = res.data.data
				}).catch(err => {
				
				})
			},
			getcategoryList(){
				uni.$u.http.get('/front/category/list').then(res => {
					this.categoryList = res.data.data
				}).catch(err => {

				})
			},
			//删除
			toDelete(id){
				uni.$u.http.delete('/front/goods/del/'+id,{dataType: 'json'}).then(res => {
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
