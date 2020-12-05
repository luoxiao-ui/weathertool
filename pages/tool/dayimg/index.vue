<template>
	<view class="container">
		<view class="maximg" v-if="isshow" @click="closemaximg">
			  <img :src="imgsrc" mode="aspectFit">
		</view>
		<img :src="item.url"
		     class="imgbox"
			 v-for="(item,index) in imglist"
			 :key="index"
			 @click="tomax(item.url)">
		<uni-icons type="loop"
		           color="#ffffff"
				   class="refreshbtn"
				   size="40"
				   @click="getrefresh"></uni-icons>
	</view>
</template>

<script>
	/*
	* 未完成功能：按压图片保存和放大图片时可双指放大或缩小
	*/
	export default {
		data() {
			return {
				imglist: '',
				imgsrc: '',
				isshow: false 
			}
		},
		onLoad() {
			this.getData()
		},
		methods:{
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
			//放大图片
			tomax(url){
				this.isshow = true
				this.imgsrc = url
				console.log(this.isshow)
			},
			closemaximg() {
				this.isshow = false
			},
			getData() {
				this.imglist = []
				for(let i=0;i<4;i++){
					this.$request('acg', 'GET',{format: 'json'}).then(res=> {
						if(res.data.code == 200){
							this.imglist.push(res.data.data)
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
	.imgbox {
		width: 100%;
		min-height: 200rpx;
	}
	
	.container {
		height: 100%;
		width: 100%;
	}
	
	.maximg {
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,0.6);
		img {
			width: 100%;
			height: 100%;
			z-index: 4;
		}
	}
	
	.refreshbtn {
		position: fixed;
		z-index: 2;
		right: 40rpx;
		bottom: 60rpx;
	}
</style>
