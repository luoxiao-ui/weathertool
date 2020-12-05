<template>
	<view class="container">
		<uni-card v-for="(item,index) in poetrymsg" :key="index"
		          :title="item.origin"
		          :extra="item.author"
				  :note="item.category">
			{{item.content}}
		</uni-card>
		<uni-icons type="loop"
		           color="#0084f3"
				   class="refreshbtn"
				   size="40"
				   @click="getrefresh"></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				poetrymsg: []
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
				this.getData()
			},
			getData() {
				this.poetrymsg = []
				for(let i=0;i<4;i++){
					this.$request('shici','GET').then(res=> {
						if(res.data.code == 200){
							this.poetrymsg.push(res.data.data)
						}else {
							uni.showModal({
								content: res.data.msg,
								showCancel: true
							})
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.refreshbtn {
		position: fixed;
		z-index: 2;
		right: 40rpx;
		bottom: 60rpx;
	}
</style>
