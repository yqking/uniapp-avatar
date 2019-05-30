<template>
	<view class="page">
		<avatar v-for="(v,k) in urls" :index="k" :avatarSrc="v" :key="k"
			selWidth="350upx" selHeight="350upx" quality="0.8" @upload="myUpload" 
			minWidth="200" minHeight="200" minScale="0.5" maxScale="4" canScale="true" canRotate="true" lockHeight="true"
			avatarStyle="width: 200upx; height: 200upx; border-radius: 100%; margin: 40px">
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
				
				// uni.uploadFile({
				// 	url: '',
				// 	filePath: rsp.path,
				// 	name: 'avatar',
				// 	method: 'post',
				// 	formData: {
				// 		'user': rsp.path
				// 	},
				// 	success: (uploadFileRes) => {
				// 		console.log(uploadFileRes.data);
				// 	},
				// 	complete(res) {
				// 		console.log(res);
				// 	}
				// });
				
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
