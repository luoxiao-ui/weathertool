<template>
	<view class="container">
		<uni-card v-for="(item,index) in riddlelist" :key="index"
		          :title="item.type_name.name"
				  :extra="item.riddleanswer"
				  :note="item.type_name.desc"
				  :exracolor="item.exracolor"
				  @click="getanswer(item.answer,index)">
			{{item.content}}
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
				riddlelist: [],
				exracolor: '',
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
				this.riddlelist = []
				this.$request('riddle','GET').then(res=> {
					this.riddlelist = res.data.data.data
					if(this.riddlelist.length===10){
						this.isrefresh = false
					}
					this.riddlelist = this.riddlelist.map(item=> {
						this.$set(item,'riddleanswer','点击显示答案')
						this.$set(item,'exracolor','')
						return item
					})
				})
			},
			getanswer(answer,index){
				this.riddlelist[index].riddleanswer = answer
				this.riddlelist[index].exracolor = '#0084f3'
			}
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
