<template>
	<view class="container">
		<view style="width: 100%;height: 200rpx;"></view>
		<view class="poetrybox">
			<view class="inputbox">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<input type="text"
					       placeholder="请输入4位藏头诗"
						   v-model="keyword"/>
					<button @click="postname">生成</button>
				</view>
			</view>
			<view class="poetrymsgbox">
				<text style="font-size: 34rpx;font-weight: 600;margin: 0 0 10rpx 0;">
					{{keywords}}</text>
				<text v-for="(item,index) in poem" :key="index">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				keywords: '',
				poem: []
			}
		},
		methods: {
			postname() {
				this.keywords = ''
				this.poem = []
				this.$request('poem','POST',{keyword: this.keyword}).then(res=> {
					if(res.data.code == 200){
						this.poem = this.changepoem(res.data.data.poem)
						this.keywords = this.keyword
					}else {
						uni.showModal({
							content: res.data.msg,
							showCancel: false
						})
					}
				})
			},
			//将诗词中的逗号和句号去掉,因为返回的古诗逗号为中文字符，所以没有去掉
			changepoem(str){
				str = (str.replace(/。/g,",")).split(",")
				str.pop()
				return str
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.poetrybox {
		width: 90%;
		height: 500rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx 8rpx #E0E0E0;
	}
	
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
			width: 140rpx;
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
	
	.poetrymsgbox {
		width: 100%;
		height: 240rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text {
			margin: 10rpx 0 10rpx 0;
			font-size: 28rpx;
		}
	}
</style>
