<template>
	<view>
		<uni-card v-for="(item,index) in oneword" :key="index"
		          :title="`来源：${item.from}`"
		          :extra="`类型：${item.judgetype}`">
			<text selectable>{{item.hitokoto || '人生就是一场旅行'}}</text>
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
	/*
	*想到的问题： 怎么限制快速且不停下拉刷新和点击刷新按钮？
	*/ 
	export default {
		data() {
			return {
				oneword: [],
				isrefresh: false,
			}
		},
		created() {
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
			//发送请求
			getData() {
				this.oneword = []
				for(let i=0;i<4;i++){
					this.$request('hitokoto','GET').then(res=> {
						if(res.data.code == 200){
							this.oneword.push(res.data.data)
							this.judgetype(res.data.data.type,i)
							if(this.oneword.length===4){
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
			//判断一言类型
			judgetype(type,i) {
				switch(type){
					case 'a': {
						this.oneword[i].judgetype = "动画"
					}
					break;
					case 'b': {
						this.oneword[i].judgetype = '漫画'
					}
					break;
					case 'c': {
						this.oneword[i].judgetype = '游戏'
					}
					break;
					case 'd': {
						this.oneword[i].judgetype = '文学'
					}
					break;
					case 'e': {
						this.oneword[i].judgetype = '原创'
					}
					break;
					case 'f': {
						this.oneword[i].judgetype = '来自网络'
					}
					break;
					case 'g': {
						this.oneword[i].judgetype = '其他'
					}
					break;
					case 'h': {
						this.oneword[i].judgetype = '影视'
					}
					break;
					case 'i': {
						this.oneword[i].judgetype = '诗词'
					}
					break;
					case 'j': {
						this.oneword[i].judgetype = '网易云'
					}
					break;
					case 'k': {
						this.oneword[i].judgetype = '哲学'
					}
					break;
					case 'l': {
						this.oneword[i].judgetype = '抖机灵'
					}
					break;
					default: {
						this.oneword[i].judgetype = '动画'
					}
				}
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
