<template>
	<view class="container">
		<view class="imgbox" :class="weathmsg.wea_img == 'yin'?'imgcolor-yin':'imgcolor-qing'">
			<view class="item-1">
				<uni-icons type="location-filled"></uni-icons>
				<text>{{weathmsg.country}}</text>
				<text>{{weathmsg.city}}</text>
			</view>
			<view class="item-2">
				<text>{{weathmsg.tem}}°</text>
			</view>
			<view class="item-3">
				<text>{{weathmsg.wea}}</text>
				<text>|</text>
				<view class="airbox" :style="{backgroundColor: weathmsg.air_level=='优'?'#3baa35':'#faba22'}">
					<img src="../../static/tree.png">
					<text>{{weathmsg.air}}</text>
					<text>{{weathmsg.air_level}}</text>
				</view>
			</view>
			<view class="item-4">
				<text>风力{{weathmsg.win_speed}}</text>
				<text>湿度{{weathmsg.humidity}}</text>
				<text>气压{{weathmsg.pressure}}hPa</text>
			</view>
			
			<view class="item-5">
				<view class="textbox">
					<text>小提示：{{weathmsg.air_tips}}</text>
				</view>
			</view>
		</view>
		
		<view class="blankbox"></view>
		
		<view class="tipbox">
			<view class="todaybox">
				<view class="todaybox-1">
					<view style="display: flex;align-items: center;">
						<text>今天</text>
						<view class="air-text">{{futuremsg[0].index[3].level || '冷'}}</view>
					</view>
					<text>{{futuremsg[0].tem1}}/{{futuremsg[0].tem2}}</text>
				</view>
				<view class="todaybox-1">
					<text>{{futuremsg[0].wea}}</text>
					<text>图片</text>
				</view>
			</view>
			<view class="todaybox">
				<view class="todaybox-1">
					<view style="display: flex;align-items: center;">
						<text>明天</text>
						<view class="air-text">{{futuremsg[1].index[3].level || '冷'}}</view>
					</view>
					<text>{{futuremsg[1].tem1}}/{{futuremsg[1].tem2}}</text>
				</view>
				<view class="todaybox-1">
					<text>{{futuremsg[1].wea}}</text>
					<text>图片</text>
				</view>
			</view>
		</view>
		
		<view class="blankbox">
			<text>7天预报</text>
		</view>
		<view class="futurebox">
			<view class="future-item" 
			      v-for="(item,index) in futuremsg" 
				  :key="index"
			      :style="{backgroundColor: index==0?'#F0F0F0':''}">
				<text style="font-size: 34rpx;">{{index==0?'今天':item.week}}</text>
				<text style="font-size: 28rpx;">{{item.date?item.date.substring(5):'12-03'}}</text>
				<text style="font-size: 30rpx;">{{item.wea || '多云'}}</text>
				<text style="font-size: 24rpx;">{{item.win[0] || '北风'}}</text>
				<text style="font-size: 24rpx;">{{item.win_speed || '4级'}}</text>
				<text style="font-size: 24rpx;color: #0a89ff;">{{item.index[3].level || '冷'}}</text>
			</view>
		</view>
		
		<view class="blankbox">
			<text>生活指数</text>
		</view>
		<view class="lifebox">
			<mygrid :column="3" :gridlist="items" @index="getindex"></mygrid>
		</view>
		
		
		<view class="blankbox"></view>
	</view>
</template>

<script>
	import mygrid from '../../components/grid/grid.vue'
	export default {
		components: {
			mygrid
		},
		data() {
			return {
				title: 'Hello',
				imgcolor: '',
				weathmsg: {
					country: '中国',
					city: '南京',
					tem: '9',
					wea: '阴',
					wea_img: 'yin',
					win_speed: '4级',
					humidity: '60%',
					pressure: '1080',
					air: '53',
					air_level: '良',
					air_tips: '儿童、老年人及心脏病、呼吸系统疾病患者应尽量减少体力消耗大的户外活动。'
				},
				futuremsg: [
					{air_level: '优',tem1: '11°',tem2: '7°',wea: '阴'},
					{air_level: '良',tem1: '12°',tem2: '5°',wea: '多云'},
					{air_level: '优',tem1: '11°',tem2: '7°',wea: '阴'},
					{air_level: '良',tem1: '12°',tem2: '5°',wea: '多云'},
					{air_level: '优',tem1: '11°',tem2: '7°',wea: '阴'},
					{air_level: '良',tem1: '12°',tem2: '5°',wea: '多云'},
					{air_level: '优',tem1: '11°',tem2: '7°',wea: '阴'}
				],
				items: [
					{text: '中暑指数', tips: '无中暑指数', icon: '../../static/hot.png'},
					{text: '运动指数', tips: '哈哈', icon: '../../static/sport.png'},
					{text: '血糖指数', tips: '易波动', icon: '../../static/health.png'},
					{text: '穿衣指数', tips: '冷', icon: '../../static/clothes.png'},
					{text: '洗车指数', tips: '不宜', icon: '../../static/car.png'},
					{text: '紫外线指数', tips: '弱', icon: '../../static/sun.png'},
				]
			}
		},
		onLoad() {
			this.getData()
			this.getfurture()
		},
		methods: {
			//获取今天的天气情况
			getData() {
				this.$request('tianqi/now', 'GET').then(res=> {
					uni.showLoading({
						title: '加载中',
						mask: true
					})
					// console.log(res)
					if(res.data.code == 200){
						this.weathmsg = res.data.data
						uni.hideLoading()
					}else {
						uni.hideLoading()
						uni.showModal({
							content: res.data.msg,
							showCancel: false
						})
					}
				})
			},
			
			//获取未来的天气情况
			getfurture() {
				this.$request('tianqi/grid', 'GET').then(res=> {
					uni.showLoading({
						title: '加载中',
						mask: true
					})
					console.log(res)
					if(res.data.code == 200){
						this.futuremsg = res.data.data.data
					    this.futuremsg[0].index.map((item,index)=> {
							this.items[index].text = item.title
							this.items[index].tips = item.level
						})
						console.log(this.items)
						uni.hideLoading()
					}else {
						uni.hideLoading()
						uni.showModal({
							content: res.data.msg,
							showCancel: false
						})
					}
				})
			},
			
			getindex(id) {
				uni.showModal({
					content: this.futuremsg[0].index[id].desc,
					showCancel:false
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.imgcolor-yin {
		background-image: linear-gradient(40deg,#ffffff,#686868);
	}
	
	.imgcolor-qing {
		background-image: linear-gradient(to top,#e6fff0,#86ffb3);
	}
	
	.imgbox {
		width: 100%;
		height: 780rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.item-1 {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			uni-icons {
				margin: 0 10rpx 0 0;
				font-size: 34rpx;
			}
			text {
				margin: 0 20rpx 0 0;
				font-size: 34rpx;
				font-weight: 600;
			}
		}
		.item-2 {
			width: 100%;
			height: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				font-size: 100px;
			}
		}
		.item-3 {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				margin: 0 40rpx 0 0;
				font-size: 34rpx;
				font-weight: 600;
			}
			
			.airbox {
				min-width: 160rpx;
				height: 60rpx;
				border-radius: 10rpx;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 10rpx;
				img {
					width: 40rpx;
					height: 40rpx;
					margin: 0 10rpx 0 0;
					font-weight: normal;
				}
				text {
					font-size: 30rpx;
					margin: 0 10rpx 0 0;
				}
			}
		}
		.item-4 {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				margin: 0 40rpx 0 0;
				color: #686868;
				font-size: 34rpx;
			}
		}
		
		.item-5 {
			width: 100%;
			height: 160rpx;
			display: flex;
			justify-content: center;
			.textbox {
				width: 80%;
				height: 90%;
				display: flex;
				align-items: center;
				justify-content: center;
				text {
					font-size: 30rpx;
				}
			}
		}
	}
	
	.blankbox {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: flex-end;
		text {
			font-size: 30rpx;
			font-weight: 600;
			margin: 0 0 10rpx 20rpx;
		}
	}
	
	.tipbox {
		width: 100%;
		height: 160rpx;
		background-color: #edfffe;
		display: flex;
		flex-direction: row;
		.todaybox {
			height: 100%;
			width: 50%;
			border-right: 1rpx solid #c0c0c0;
			.todaybox-1 {
				height: 80rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 30rpx;
				text {
					margin: 0 20rpx 0 20rpx;
				}
			}
		}
	}
	
	.air-text {
		padding: 5rpx 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 40rpx;
		background-color: #0a89ff;
		color: #ffffff;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
	
	.futurebox {
		border-top: 2rpx solid #C0C0C0;
		display: flex;
		flex-direction: row;
		overflow-x: auto;
		.future-item {
			width: 180rpx;
			height: 400rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			text {
				margin: 20rpx  0 10rpx 0;
			}
		}
	}
	
	.lifebox {
		width: 100%;
		mygrid {
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}
</style>
