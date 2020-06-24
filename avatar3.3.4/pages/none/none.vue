<template>
</template>

<script>
	export default {
		data() {
			return {
				imgPath: ''
			}
		},
		methods: {
			myUpload(path) {
				console.log(path);//截取的图片临时路径，进行图片上传
			}
		},
		onLoad(e) {
			this.imgPath = e.imgPath;
		}
	}
</script>

<style>
</style>
