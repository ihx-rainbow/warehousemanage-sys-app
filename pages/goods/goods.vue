<template>
	<view>


		<!-- 列表 -->
		<view class="news-list">
			<view class="form-group">
				<view class="label">请输入产品码:</view>
				<view class="inputClass">
					<input class="input" type="text" v-model="form.code" placeholder="请输入产品码" />
				</view>
			</view>
		</view>
		
		<button class="submit-btn" @click="search">查询</button>
		
		<!-- 详情 -->
		<view class="table" v-if="show">
			<!-- 表头 -->
			<view class="table-header">
				<view class="table-cell">项目</view>
				<view class="table-cell">内容</view>
			</view>
			<!-- 表体 -->
			<view class="table-content">
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[],
				goodsList:[],
				currentCategoryIndex: -1,
				pageNum: 1,
				pageSize: 8,
				totalPage: 1,
				total: 0,
				show: false,
				form:{
					
				},
				data:{},
				categoryList: [],
			}
		},
		onLoad(options) {
			this.getGoodsList(null,name)
			this.getCategoryList()
		},
		methods: {
			//搜索商品
			search(){
				uni.$u.http.get('/front/goods/code',{params: {code: this.form.code}}).then(res => {
					
					if(res.data.data==null){
						this.show=false;
						this.$u.toast('查无次商品')
					}else{
						this.show=true
						this.data = res.data.data
					}
				}).catch(err => {
				
				})
			},
			getCategoryList() {
				uni.$u.http.get('/front/category/list').then(res => {
					this.categoryList = res.data.data
				}).catch(err => {
			
				})
			},
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

	.form-group {
		display: flex;
		align-items: left;
		margin-bottom: 20px;
	}

	.label {
		width: 80px;
		text-align: left;
		margin-right: 10px;
		font-size: 16px;
		color: #333;
		flex: 0.8;
		margin-left: 30rpx;
	}
	
.submit-btn{
	width: 50%;
	margin-top: 10px;
	padding: 5px 5px;
	background-color: #ff5500;
	color: white;
	border-radius: 20px;
	border: none;
	font-size: 14px;
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
