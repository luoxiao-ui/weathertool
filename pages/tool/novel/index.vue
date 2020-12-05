<template>
	<view class="container">
		<uni-card :title="novelmsg.title"
		          :extra="novelmsg.author">
			<p v-html="novelmsg.content"></p>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				novelmsg: {}
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$request('mryw', 'GET').then(res=> {
					if(res.data.code == 200){
						this.novelmsg = res.data.data
					}else {
						uni.showModal({
							content: res.data.msg,
							showCancel: false
						})
					}
				})
			},
		}
	}
</script>

<style>
</style>
