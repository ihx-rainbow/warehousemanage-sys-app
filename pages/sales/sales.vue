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


		<!-- 列表 -->
		<view class="news-list">
			<text class="listTitle">销售订单</text>
			<view v-for="(item, index) in salesList" :key="index" class="news-item" @click="toDetail('sales',item.id,'sales-detail')">
				<view class="news-details">
					<view class="news-title">{{ item.name }}</view>
					<view class="news-date">发布时间：{{ item.createTime }}</view>
				</view>
			</view>
		</view>
		
		<!-- 分页条 -->
		<view class="pagination">
		  <button size="mini" class="prev-button" @click="prevPage" v-if="pageNum != 1 && total!=0">
		    上一页
		  </button>
			  
		  <button size="mini" class="next-button" @click="nextPage" v-if="pageNum != totalPage && total!=0">
		    下一页
		  </button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[],
				salesList:[],
				currentCategoryIndex: -1,
				pageNum: 1,
				pageSize: 8,
				totalPage: 1,
				total: 0,
			}
		},
		onLoad(options) {
			const name = options.name
			//轮播图
			this.getBannerList()
			this.getSalesList(null,name)
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
			//获取销售订单
			getSalesList(id){
				uni.$u.http.get('/front/sales/page',{params: {pageNum: this.pageNum, pageSize: this.pageSize,
				}}).then(res => {
					this.salesList = res.data.data.records
					this.totalPage = res.data.data.pages
					this.total = res.data.data.total
				}).catch(err => {
				
				})
			},
			//跳转到详情页
			toDetail(table,id,url){
				uni.$u.route('/pages/'+table+'/'+url, {
					id: id
				});
			},
			changeCategory(index,id) {
			    this.currentCategoryIndex = index
				this.getSalesList(id)
			},
			//上一页
			prevPage(){
				this.pageNum--
				this.getSalesList()
			},
			//下一页
			nextPage(){
				this.pageNum++
				this.getSalesList()
			}
		}
	}
</script>

<style>
.swiper{
	margin-top: 10px;
}

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


.news-list {
	padding:20rpx;
	margin-top: 10px;
}
.news-item {
	display:flex;
	align-items:center;
	border-radius:10rpx;
	padding:20rpx;
	width: 90%;
	margin: 0 auto;
	margin-top: 10px;
	border-bottom: 1px solid #996666;
}
.news-details {
	flex:1;
}
.news-title {
	font-size:30rpx;
	font-weight:bold;
	margin-bottom:10rpx;
	color: #996666;
}
.news-date {
	font-size:24rpx;
	color:#999;
	margin-bottom:10rpx;
}
.news-description {
	font-size:26rpx;
	color:#666;
}


.category-scroll {
  margin-top: 5px;
  white-space: nowrap;
  background-color: #f5f5f5;
}

.category-item {
  display: inline-block;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  color: #333;
  transition: background-color 0.3s;
  line-height: 50rpx;
}

.category-item.active {
  background-color: #ff5500; /* 这里设置选中时的背景色 */
  color: #FFF; /* 这里设置选中时的字体颜色 */
  font-weight: bold;
}

.category-item.hover {
  background-color: #4a68ee;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
  outline: none;
}

button:focus, button:active, button:hover {
  background-color: #ff5500;
  border-color: #ff5500;
  color: #fff;
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

button.active {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.prev-button {
  order: -1;
}

.next-button {
  order: 1;
}

.arrow {
  width: 10px;
  height: 10px;
  margin-right: 5px;
}

</style>
