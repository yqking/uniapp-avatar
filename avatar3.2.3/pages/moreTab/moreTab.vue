<template>
	<view>
		<button @click="upload" style="width: 80%; height: 60px;">上传</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			upload: ()=>{
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: '', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'avatar',
							formData: {
								'avatar': tempFilePaths[0]
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
