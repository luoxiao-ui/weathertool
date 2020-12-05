<template>
	<view class="container">
		<mygrid :column="3" :gridlist="items" @index="getindex"></mygrid>
	</view>
</template>

<script>
	import mygrid from '../../components/grid/grid.vue'
	export default {
		components: {
			mygrid
		},
		data() {
			return {
				items: [
					{text: '一言',icon: '../../static/yiyan.png',url: 'onewords/index'},
					{text: '土味情话',icon: '../../static/tuwei.png',url: 'honeyword/index'},
					{text: '随机诗词',icon: '../../static/shici.png',url: 'poetry/index'},
					{text: '每日一图',icon: '../../static/todayimg.png',url: 'dayimg/index'},
					{text: '谜语大全',icon: '../../static/miyu.png',url: 'riddle/index'},
					{text: '每日一文',icon: '../../static/resou.png',url: 'novel/index'},
					{text: '垃圾分类查询',icon: '../../static/laji.png',url: 'rubbish/index'},
					{text: '藏头诗生成',icon: '../../static/cangtoushi.png',url: 'createpoetry/index'},
					{text: '二维码生成',icon: '../../static/erweima.png',url: 'QRcode/index'}
				]
			}
		},
		methods: {
			getindex(index){
				if(this.items[index].url == ''){
					uni.showToast({
						title: '功能开发中...',
						icon: 'none',
						duration: 2000
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100%;
	}
	
	mygrid {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
