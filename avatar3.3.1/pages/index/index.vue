<template>
	<view style="position: fixed; width: 100%; height: 100%;">
		
		<image :src="urls[0]" @click="clk(0)" class="myimg"></image> 
		<image :src="urls[1]" @click="clk(1)" class="myimg2"></image> 

		<avatar @upload="doUpload" @avtinit="doBefore" quality="1" ref="avatar"></avatar>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		data() {
			return {
				urls: ["../../static/logo.png","../../static/logo.png"],
			}
		},
		methods: {
			doBefore() {
				console.log('doBefore');
			},
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{
					selWidth: '350upx', selHeight: '350upx', 
					expWidth: '260upx', expHeight: '260upx',
					inner: index ? 'true' : 'false'
				});
			},
			doUpload(rsp) {
				console.log(rsp);
				this.$set(this.urls, rsp.index, rsp.path);
				return;
				uni.uploadFile({
					url: '', //仅为示例，非真实的接口地址
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
	.myimg {
		width: 200upx;
		height: 200upx;
		border-radius: 0 !important;
		margin: 40px;
	}
	.myimg2 {
		width: 200upx;
		height: 200upx;
		border-radius: 100%;
		margin: 40px;
	}
</style>
