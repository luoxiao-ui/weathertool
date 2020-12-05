<template>
	<view class="container">
		<view style="width: 100%;height: 100rpx;"></view>
		<view class="qrcodebox">
			<view class="inputbox">
				<view style="display: flex;flex-direction: row;align-items: center;">
					<input type="text"
					       placeholder="请输入二维码内容"
						   v-model="qrcode"/>
					<button @click="posttext">生成</button>
				</view>
			</view>
			<view class="imgbox">
				<img :src="imgsrc" mode="aspectFit">
			</view>
			<view class="btnbox">
				<button @click="saveimg" v-show="imgsrc">
					<uni-icons type="pulldown"
					           color="#ffffff"
							   size="16">
					</uni-icons>
					保存到本地</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { weBtoa, weAtob } from '../../../utils/bota.js'
	export default {
		data() {
			return{
				qrcode: '',
				imgsrc: ''
			}
		},
		methods: {
			posttext() {
				uni.request({
					url: 'https://v1.alapi.cn/api/qr',
					method: 'POST',
					data: {
						content: this.qrcode
					},
					responseType: "arraybuffer",
					success: res => {
						let datas = res.data
						this.imgsrc = 'data:image/png;base64,' + weBtoa(
							new Uint8Array(datas).reduce((datas, byte) => datas + String.fromCharCode(byte), '')
						);
					},
				})
			},
			 saveimg(){
				uni.getSetting({//获取用户的当前设置
					success:(res)=> {
						if(res.authSetting['scope.writePhotosAlbum']){//验证用户是否授权可以访问相册
							this.saveImageToPhotosAlbum();
						}else{
							uni.authorize({//如果没有授权，向用户发起请求
								scope: 'scope.writePhotosAlbum',
								success:()=> {
									this.saveImageToPhotosAlbum();
								},
								fail:()=>{
									uni.showToast({
										title:"请打开保存相册权限，再点击保存相册分享",
										icon:"none",
										duration:3000
									});
									setTimeout(()=>{
										uni.openSetting({//调起客户端小程序设置界面,让用户开启访问相册
											success:(res2)=> {
												// console.log(res2.authSetting)
											}
										});
									},3000);
								}
							})
						}
					}
				})
			},
			
			saveImageToPhotosAlbum() {
				let base64=this.imgsrc.replace(/^data:image\/\w+;base64,/, "");//去掉data:image/png;base64,
				let filePath=wx.env.USER_DATA_PATH + '/hym_pay_qrcode.png';
				uni.getFileSystemManager().writeFile({
					filePath:filePath ,  //创建一个临时文件名
					data: base64,    //写入的文本或二进制数据
					encoding: 'base64',  //写入当前文件的字符编码
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: filePath,
							success: function(res2) {
								uni.showToast({
									title: '保存成功，请从相册选择再分享',
									icon:"none",
									duration:5000
								})
							},
							fail: function(err) {
								// console.log(err.errMsg);
							}
						})
					},
					fail: err => {
						//console.log(err)
					}
				})
			},
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
	
	.qrcodebox {
		width: 90%;
		height: 740rpx;
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
			width: 400rpx;
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
	
	.imgbox {
		width: 100%;
		height: 440rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 80%;
			height: 80%;
		}
	}
	
	.btnbox {
		width: 100%;
		height: 140rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		button {
			width: 240rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color: #ffffff;
			background-color: #0084f3;
		}
	}
</style>
