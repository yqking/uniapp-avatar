<template>
	<view>
	<avatar @upload="myUpload" expWidth="300px" expHeight="300px" ref="avatar"></avatar>
	<image :src="url" style="width: 200upx; height: 200upx; border-radius: 100%; margin: 40px" @click="clk(1)"></image> 

	<avatar 
		selWidth="350upx" selHeight="350upx" expWidth="300px" expHeight="300px" ref='avatar'
		:avatarSrc="url" @upload="myUpload" inner="true"
		avatarStyle="width: 200upx; height: 200upx; border-radius: 0 !important; margin: 40px">
	</avatar>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		data() {
			return {
				url:"../../static/logo.png",
			}
		},
		methods: {
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{selWidth: '350upx', selHeight: '350upx'})
			},
			myUpload(rsp) {
				this.url = rsp.path;
				//rsp.avatar.imgSrc = rsp.path;
				
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
</style>
