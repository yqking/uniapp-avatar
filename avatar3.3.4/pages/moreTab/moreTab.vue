<template>
	<view style="position: fixed; width: 100%; height: 100%; padding-top: 80px;">
		<view class='imgs'>
			<view>
				<image :src="urls[0]" @click="clk(0)" class="myimg"></image>
				<view>自由移动</view>
			</view>
			<view>
				<image :src="urls[1]" @click="clk(1)" class="myimg"></image> 
				<view>内部移动</view>
			</view>
		</view>
		<view class='imgs'>
			<view>
				<image :src="urls[2]" @click="clk(2)" class="myimg2"></image>  
				<view>禁止旋转</view>
			</view>
			<view>
				<image :src="urls[3]" @click="clk(3)" class="myimg2"></image> 
				<view>禁止缩放</view>
			</view>
		</view>
		<view class='imgs'>
			<view>
				<image :src="urls[4]" @click="clk(4)" class="myimg"></image>  
				<view>短边铺满</view>
			</view>
			<view>
				<image :src="urls[5]" @click="clk(5)" class="myimg"></image> 
				<view>短边锁定</view>
			</view>
		</view>
		<avatar @upload="doUpload" quality="1" ref="avatar" selWidth="250upx" selHeight="250upx"></avatar>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		data() {
			return {
				urls: ["../../static/logo.png","../../static/logo.png",
					   "../../static/logo.png","../../static/logo.png",
					   "../../static/logo.png","../../static/logo.png"],
				url:"../../static/logo.png",
				imgBg: "../../static/b.jpg"
			}
		},
		methods: {
			doBefore() {
				console.log('doBefore');
			},
			clk(index) {
				// this.$refs.avatar.fChooseImg(index);
				// console.log(index);
				switch(index) {
					case 0:
						this.$refs.avatar.fChooseImg(index,{
							selWidth: '350upx', selHeight: '350upx', inner: false
						});
					break;
					case 1:
						this.$refs.avatar.fChooseImg(index,{
							selWidth: '350upx', selHeight: '350upx', inner: true
						});
					break;
					case 2:
						this.$refs.avatar.fChooseImg(index,{
							selWidth: '350upx', selHeight: '350upx', inner: false, canRotate: false
						});
					break;
					case 3:
						this.$refs.avatar.fChooseImg(index,{
							selWidth: '350upx', selHeight: '350upx', canScale: false
						});
					break;
					case 4:
						this.$refs.avatar.fChooseImg(index,{
							selWidth: '350upx', selHeight: '350upx', stretch: 'short'
						});
					break;
					case 5:
						this.$refs.avatar.fChooseImg(index,{
							selWidth: '350upx', selHeight: '350upx', lock: 'short'
						});
					break;
					default:
						this.$refs.avatar.fChooseImg(index,{
							selWidth: '350upx', selHeight: '350upx'
						});
					break;
				}
				
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.urls, rsp.index, rsp.path);
				// this.url = rsp.path;
				//rsp.avatar.imgSrc = rsp.path;
				return;
				uni.uploadFile({
					url: 'xxx', //仅为示例，非真实的接口地址
					filePath: rsp.path,
					name: 'avatar',
					formData: {
						'avatar': rsp.path
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					},
					complete(res) {
						console.log(res)
					}
				});
				
			}
		},
		components: {
			avatar
		}
	}
</script>

<style>
	.imgs {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 30px;
	}
	.myimg {
		width: 200upx;
		height: 200upx;
		border-radius: 0 !important;
	}
	.myimg2 {
		width: 200upx;
		height: 200upx;
		border-radius: 100%;
	}
</style>
