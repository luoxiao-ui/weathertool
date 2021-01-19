<template>
	<view class="container">
		<uni-card v-for="(item,index) in poetrymsg" :key="index"
		          :title="item.origin"
		          :extra="item.author"
				  :note="item.category">
			<text selectable>{{item.content}}</text>
		</uni-card>
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
				poetrymsg: [],
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
				this.poetrymsg = []
				for(let i=0;i<4;i++){
					this.$request('shici','GET').then(res=> {
						if(res.data.code == 200){
							this.poetrymsg.push(res.data.data)
							if(this.poetrymsg.length===4){
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
	
	.refreshbtnclick {
		transition: 2s;
		transform: rotate(180deg);
	}
</style>
