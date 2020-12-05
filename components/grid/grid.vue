<template>
	<view class="mygrid">
		<view class="mygrid-item" v-for="(item,index) in gridlist" :key="item"
		      @click="toindex(index,item.url)"
			  :style="{width: itemwidth+'px'}">
			<img :src="item.icon">
			<text>{{item.text}}</text>
			<text style="color: gray;font-weight: normal;font-size: 20rpx;">{{item.tips}}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * @property {Number} column 每一行显示多少列
	 * @property {Array} gridlist 每一行里的具体内容
	 * @event {Function()} toindex 点击每一行内容跳转详情页 
	 */
	export default {
		name: 'grid',
		props: {
			column: {
				type: Number,
				default: 3
			},
			gridlist: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				itemwidth: ''
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.itemwidth = (res.screenWidth * 0.9) / this.column
				}
			})
		},
		methods: {
			toindex(index,url) {
				// console.log(url)
				this.$emit('index',index)
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.mygrid {
		width: 90%;
		height: auto;
		display: flex;
		flex-flow: row wrap;
		border-left: 1rpx solid #D8D8D8;
		border-top: 1rpx solid #D8D8D8;
		.mygrid-item {
			box-sizing: border-box;
			height: 200rpx;
			border-right: 1rpx solid #D8D8D8;
			border-bottom: 1rpx solid #D8D8D8;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			img {
				width: 80rpx;
				height: 80rpx;
			}
			text {
				margin-top: 20rpx;
				font-size: 24rpx;
				font-weight: 600;
			}
		}
	}
</style>
