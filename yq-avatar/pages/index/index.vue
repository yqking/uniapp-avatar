<template>
	<view style="position: fixed; width: 100%; height: 100%;">
		<avatar 
			:bgImage="imgBg"
			selWidth="200px" selHeight="200px"  ref='avatar' fileType='png'
			:avatarSrc="url" @upload="myUpload" quality="1" inner=true
			avatarStyle="width: 200px; height: 200px; margin: 40px;">
		</avatar>
		<button @click="clk">按钮触发</button>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		data() {
			return {
				urls: ["../../static/logo.png","../../static/logo.png"],
				url:"../../static/logo.png",
				imgBg: "../../static/a.jpg"
			}
		},
		onLoad() {
		},
		methods: {
			clk() {
				let avatar = this.$refs.avatar;
				avatar.fChooseImg(1, {selWidth: "480upx", selHeight: "480upx", expWidth: "480px", expHeight: "480upx", inner:false}, {data: 'xxx'});
			},
			myUpload(rsp) {
				console.log(rsp);
				this.url = rsp.path;
				//rsp.avatar.imgSrc = rsp.path;
				return;
				
				uni.uploadFile({
					url: 'xxxx',
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
