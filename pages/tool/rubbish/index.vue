<template>
	<view class="container">
		<view style="width: 100%;height: 200rpx;"></view>
		<view class="searchcard">
			<view class="inputbox">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<input type="text"
					       placeholder="请输入垃圾名称"
						   v-model="rubbishname"/>
					<button @click="postname">
						<uni-icons type="search"
					               size="14"
								   color="#ffffff"
								   style="margin: 0 6rpx 0 0;"></uni-icons>
					查询</button>
				</view>
			</view>
			<view class="rubbishimg">
				<text>{{inputname}}</text>
				<img :src="imgsrc">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rubbishname: '',
				imgsrc: '',
				inputname: ''
			}
		},
		methods: {
			postname(){
				this.$request('lajifenlei', 'POST', {name: this.rubbishname}).then(res=> {
					uni.showLoading({
						title: '查询中',
						mask: true
					})
					if(res.data.code == 200){
						if(res.data.data.length>0){
							this.inputname = `${this.rubbishname}是`
							this.imgsrc = `../../../static/${res.data.data[0].type}.png`
						}else {
							this.inputname = 'AI未能分辨该垃圾'
							this.imgsrc = ''
						}
						uni.hideLoading()
					}else {
						uni.hideLoading()
						uni.showModal({
							content: res.data.msg,
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.searchcard {
		width: 90%;
		height: 400rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx 8rpx #E0E0E0;
		.inputbox {
			width: 100%;
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			input {
				width: 300rpx;
				margin: 0 20rpx 0 0;
				font-size: 30rpx;
				border-bottom: 1rpx solid #e0e0e0;
				padding: 6rpx 4rpx;
			}
			button {
				width: 160rpx;
				height: 50rpx;
				color: #ffffff;
				background-color: #0084f3;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				margin: 0 0 0 20rpx;
			}
		}
		
		.rubbishimg {
			width: 100%;
			height: 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				color: #0084f3;
				font-size: 34rpx;
				margin: 0 10rpx 0 0;
			}
			img {
				width: 90rpx;
				height: 90rpx;
			}
		}
	}
</style>
