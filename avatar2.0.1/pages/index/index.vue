<template>
	<view class="page">
		<avatar class='my-avatar'
			selWidth="150px" selHeight="150px"
			:avatarSrc="url" @upload="myUpload"
			avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;" >
		</avatar>
		</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	
	export default {
		data() {
			return {
				url: "../../static/logo.png"
			}
		},
		methods: {
			myUpload(path) {
				this.url = path;
				/*
				uni.uploadFile({
					url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data);
					}
				});
				*/
			}
		},
		components: {
			avatar
		}
	}
</script>

<style>
	.my-avatar {
		margin: 40px;
	}
	.page {
		background: #F1F1F1;
		width: 100%;
		height: 100%;
		position: fixed;
	}
</style>
