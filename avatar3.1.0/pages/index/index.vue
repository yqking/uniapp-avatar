<template>
	<view class="page">
		<avatar v-for="(v,k) in urls" :index="k" :avatarSrc="v" :key="k"
			selWidth="350upx" selHeight="350upx" quality="0.8" @upload="myUpload" 
			avatarStyle="width: 200upx; height: 200upx; border-radius: 50%; margin: 40px">
		</avatar>
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
			myUpload(rsp) {
            	rsp.avatar.imgSrc = rsp.path;
				// this.$set(this.urls, rsp.index, rsp.path);
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
