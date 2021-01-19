<template>
	<view class="container">
		<view style="width: 100%;height: 100rpx;"></view>
		<view class="textbox" v-for="(item,index) in contentlist" :key="index">
			<text selectable>{{item}}</text>
		</view>
		<uni-icons type="loop"
		           color="#0084f3"
				   class="refreshbtn"
				   size="40"
				   :class="{refreshbtnclick: isrefresh}"
				   @click="getrefresh"></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentlist: [],
				isrefresh: false
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			//下拉刷新事件
			onPullDownRefresh() {
				this.getData()
				setTimeout(()=> {
					uni.stopPullDownRefresh()
				},2000)
			},
			getrefresh() {
				this.isrefresh = true
				this.getData()
			},
			getData() {
				this.contentlist = []
				for(let i=0;i<4;i++){
					this.$request('qinghua','GET').then(res=> {
						if(res.data.code == 200) {
							this.contentlist.push(res.data.data.content)
							if(this.contentlist.length===4){
								this.isrefresh = false
							}
						}else {
							uni.showModal({
								content: res.data.msg,
								showCancel: true
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		.textbox {
			width: 80%;
			margin-bottom: 60rpx;
			min-height: 140rpx;
			border-radius: 10rpx;
			padding: 40rpx 40rpx;
			box-shadow: 0 0 10rpx 8rpx #E0E0E0;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 34rpx;
		}
	}
	
	.refreshbtn {
		position: fixed;
		z-index: 2;
		right: 40rpx;
		bottom: 60rpx;
	}
	
	.refreshbtnclick {
		transition: 2s;
		transform: rotate(180deg);
	}
</style>
