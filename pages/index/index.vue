<template>
    <view class="u-page">
        
				
		<!-- 轮播图 -->
		<view class="swiper">
			<u-swiper
				:list="bannerList"
				indicator
				indicatorMode="line"
				circular
			></u-swiper>
		</view>
		
		<!-- 菜单栏 -->
		 <view class="grid-menu">
		    <view v-for="(item, index) in list" :key="index" class="menu-item" @click="toMenuUrl(item.url,item.id)">
		      <image :src="item.icon" mode="aspectFill" />
		      <text>{{ item.title }}</text>
		    </view>
		</view>


		<!-- 系统公告 -->
		<view class="news-list">
			<text class="listTitle">系统公告</text>
			<view v-for="(item, index) in noticeList" :key="index" class="news-item" @click="toDetail('notice',item.id,'notice-detail')">
				<view class="news-details">
					<view class="news-title">{{ item.name }}</view>
					<view class="news-description"><u-parse :content="truncatedContent(item.content)"></u-parse></view>
				</view>
			</view>
		</view>

		
    </view>
</template>


<script>
	export default {
		data() {
			return {
				src : '/static/logo.png',
				bannerList:[],
				noticeList:[],
				searchKey:'',
				list: [
					{
						title: '产品查询',
						icon: '/static/menu-icon/goods.png',
						url: '/pages/goods/goods',
						id: ''
					},
					{
						title: '产品管理',
						icon: '/static/menu-icon/manage.png',
						url: '/pages/my/mygoods',
						id: ''
					}
				],
			}
		},
		watch: {
			
		},
		onShow() {
			//轮播图
			this.getBannerList()
			//加载系统公告
			this.getNoticeList()
		},
		methods: {
			//获取轮播图
			getBannerList(){
				uni.$u.http.get('/front/banner/list').then(res => {
					let list = res.data.data
					list = list.filter((item) => item.indexRadio === '是')
					this.bannerList = list.map(item => item.img)
				}).catch(err => {
				
				})
			},
			//获取系统公告列表
			getNoticeList(){
				uni.$u.http.get('/front/notice/page',{params: {pageNum: '1', pageSize: '8'}}).then(res => {
					this.noticeList = res.data.data.records
				}).catch(err => {
				
				})
			},
			//跳转到详情页
			toDetail(table,id,url){
				uni.$u.route('/pages/'+table+'/'+url, {
					id: id
				});
			},
			toMenuUrl(url,id){
				uni.$u.route(url,{
					id:id
				})
			},
			truncatedContent(content) {
				if (content.length > 80) {
					return content.slice(0, 80) + '...'
				} else {
					return content
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 12px;
	}


	.title{
		margin-left: 10px;
		font-size: 18px;
		font-weight: bold;
		color: orangered;
	}

	.u-page__tag-item {
		@include flex(column);
		flex: 1
	}

	.swiper{
		margin-top: 10px;
	}

	.list{
		margin-top: 20rpx;
	}

	.product-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 10px;
	}

	.product-item {
		width: 38%;
		margin-bottom: 20px;
		margin-left: 10px;
		margin-right: 10px;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.product-image {
		width: 140px;
		height: 110px;
		object-fit: cover;
		border-radius: 5px;
		margin-bottom: 10px;
	}

	.product-title {
		font-size: 16px;
	}

	.product-price {
		font-size: 14px;
		color: #fc5531;
	}

	.listTitle{
		font-size: 18px;
		margin-left: 20px;
		background-color: #996666;
		padding: 10px;
		color: #ffffff;
	}

	.grid-menu {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 10px;
	}

	.menu-item {
		width: 90px;
		height: 90px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 12px;
		border-radius: 10px;
		cursor: pointer;
	}

	.menu-item image {
		width: 50px;
		height: 50px;
	}

	.menu-item text {
		margin-top: 10px;
		font-size: 16px;
		text-align: center;
		color: #996666;
		font-weight: bold;
	}


	.news-list {
		padding:20rpx;
	}
	.news-item {
		display:flex;
		align-items:center;
		border-radius:10rpx;
		padding:20rpx;
		width: 90%;
		margin: 0 auto;
		margin-top: 10px;
		border: 1px solid #996666;
	}
	.news-details {
		flex:1;
	}
	.news-title {
		font-size:30rpx;
		font-weight:bold;
		margin-bottom:10rpx;
	}
	.news-date {
		font-size:24rpx;
		color:#999;
		margin-bottom:10rpx;
	}
	.news-description {
		font-size:26rpx;
		color:#666;
		width: 100%;
	}
</style>
