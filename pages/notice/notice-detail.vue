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
		
		<!-- 文章详情 -->
		<view class="news-detail">
		<view class="news-info">
			<view class="news-title">{{ data.name }}</view>
			<view class="news-date">发布时间：{{ data.createTime }}</view>
			<view class="news-content"><u-parse :content="data.content"></u-parse></view>
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
			}
		},
		onLoad(options) {
			this.id = options.id
			//轮播图
			this.getBannerList()
			this.loadOne(this.id)
		},
		computed:{
			...mapState(['userInfo','token','hasLogin'])
		},
		methods: {
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
				uni.$u.http.get('/front/notice/'+id).then(res => {
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
</style>
