<template>
	<view>

		<!-- 轮播图 -->
		<view class="swiper">
			<u-swiper
					:list="bannerList"
					indicator
					indicatorMode="line"
					circular
			></u-swiper>
		</view>
		
		<!-- 详情 -->
		<view class="table">
			<!-- 表头 -->
			<view class="table-header">
				<view class="table-cell">项目</view>
				<view class="table-cell">内容</view>
			</view>
			<!-- 表体 -->
			<view class="table-content">
				<view class="table-row">
					<view class="table-cell">产品类别</view>
					<view class="table-cell">{{ categoryList.find(v => v.id === data.categoryId) ? categoryList.find(v => v.id === data.categoryId).name : '' }}</view>
				</view>
				<view class="table-row">
					<view class="table-cell">产品名称</view>
					<view class="table-cell">{{ data.name }}</view>
				</view>
				<view class="table-row">
					<view class="table-cell">摆放货架</view>
					<view class="table-cell">{{ data.shelves }}</view>
				</view>
				<view class="table-row">
					<view class="table-cell">产品码</view>
					<view class="table-cell">{{ data.code }}</view>
				</view>
				<view class="table-row">
					<view class="table-cell">规格</view>
					<view class="table-cell">{{ data.spec }}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		data() {
			return {
				id:'',
				bannerList:[],
				data:{},
				categoryList: [],
			}
		},
		onLoad(options) {
			this.id = options.id
			//轮播图
			this.getBannerList()
			this.loadOne(this.id)
			this.getcategoryList()
		},
		computed:{
			...mapState(['userInfo','token','hasLogin'])
		},
		methods: {
			getcategoryList(){
				uni.$u.http.get('/front/category/list').then(res => {
					this.categoryList = res.data.data
				}).catch(err => {

				})
			},
			//获取轮播图
			getBannerList(){
				uni.$u.http.get('/front/banner/list').then(res => {
					let list = res.data.data
					list = list.filter((item) => item.indexRadio === '否')
					this.bannerList = list.map(item => item.img)
				}).catch(err => {

				})
			},
			//查询详情
			loadOne(id){
				uni.$u.http.get('/front/goods/'+id).then(res => {
					this.data = res.data.data		
				}).catch(err => {			
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.news-detail {
	padding:40rpx;
	display:flex;
	align-items:center;
}
.news-image {
	width:200rpx;
	height:200rpx;
	margin-right:20rpx;
	border-radius:5rpx;
}
.news-info {
	flex:1;
}
.news-title {
	font-size:36rpx;
	font-weight:bold;
	margin-bottom:10rpx;
	text-align: center;
}
.news-date {
	font-size:28rpx;
	color:#999;
	margin-bottom:10rpx;
	text-align: center;
	margin-top: 10px;
}
.news-content {
	margin-top: 10px;
	font-size:26rpx;
	color:#666;
	line-height:40rpx;
}


.comment {
	display: flex;
	padding: 30rpx;
.left {
image {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background-color: #f2f2f2;
}
}
.right {
	flex: 1;
	padding-left: 20rpx;
	font-size: 30rpx;
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10rpx;
.name {
	color: #5677fc;
	display: flex;
}
.highlight {
	color: #5677fc;
.num {
	color: #5677fc;
}
}
}
.content {
	margin-bottom: 10rpx;
}
.reply-box {
	background-color: rgb(242, 242, 242);
	border-radius: 12rpx;
.item {
	padding: 20rpx;
	border-bottom: solid 2rpx $u-border-color;
.username {
	font-size: 24rpx;
	color: #999999;
}
}
.all-reply {
	padding: 20rpx;
	display: flex;
	color: #5677fc;
	align-items: center;
.more {
	margin-left: 6rpx;
}
}
}
.bottom {
	margin-top: 20rpx;
	display: flex;
	font-size: 24rpx;
	color: #9a9a9a;
.reply {
	color: #5677fc;
	margin-left: 10rpx;
}
}
}
}

.btn-comment{
	width: 60%;
	margin: 0 auto;
	padding: 10px;
}
.noComments{
	font-size: 16px;
	color: #999999;
	margin-left: 20px;
}

.commentPop{
	padding: 10px;
}
/* 表格样式 */
.table {
	margin: 10px;
	border: 1px solid #996666;
	border-collapse: collapse;
	font-size: 14px;
}
/* 表头样式 */
.table-header {
	background-color: #996666;
	font-weight: bold;
	display: flex;
	color: #fff;
}

/* 表体样式 */
.table-content {
	display: flex;
	flex-direction: column;
}

/* 表格行样式 */
.table-row {
	display: flex;
}

/* 表格单元格样式 */
.table-cell {
	padding: 8px;
	border: 1px solid #ddd;
	flex: 1;
}

/* 斑马线样式：给表格行设置交替背景颜色 */
.table-row:nth-child(odd) {
	background-color: #f9f9f9;
}
</style>
