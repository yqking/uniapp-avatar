<template name="yqking-avatar">
	<view>
		<image :src="avatarSrc" @click="fSelect" :style="[ imgStyle ]" class="my-avatar"></image>
		<canvas canvas-id="avatar-factory" class="my-canvas" :style="{display: styleDisplay, height: cvsStyleHeight}" disable-scroll="false"></canvas>
		<canvas canvas-id="oper-canvas" class="oper-canvas" :style="{display: styleDisplay, height: cvsStyleHeight}"
		disable-scroll="false" @touchstart="fStart" @touchmove="fMove" @touchend="fEnd"></canvas>
		<view class="oper-wrapper" :style="{display: styleDisplay, height: tabStyleHeight}">
			<view class="oper">
				<view class="btn-wrapper">
					<view @click="fSelect"  hover-class="hover"><text>重选</text></view>
					<view @click="fPreview" hover-class="hover"><text>预览</text></view>
					<view @click="fUpload"  hover-class="hover"><text>上传</text></view>
				</view>
			</view>
		</view>
	</view>
</template>
	
<script>
	const tabHeight = 50;
	export default {
		data() {
			return {
				tabStyleHeight: '0px',
				cvsStyleHeight: '0px',
				styleDisplay: 'none',
				imgStyle: {},
			};
		},
		props:{
			avatarSrc: '',
			avatarStyle: '',
			selWidth: '',
			selHeight: '',
		},
		created() {
			// #ifndef H5
			this.ctxCanvas = uni.createCanvasContext('avatar-factory', this);
			this.ctxCanvasOper = uni.createCanvasContext('oper-canvas', this);
			// #endif
				
			uni.onWindowResize(()=>{
				this.fWindowResize();
			})
			this.fWindowResize();
		},
		methods: {
			fWindowResize() {
				let sysInfo = uni.getSystemInfoSync();
				this.pixelRatio = sysInfo.pixelRatio;
				this.windowWidth = sysInfo.windowWidth;
				this.windowHeight = sysInfo.windowHeight;
				this.pxRatio = this.windowWidth/750;
				this.cvsStyleHeight = this.windowHeight - tabHeight + 'px';
				this.tabStyleHeight = tabHeight + 'px';
				
				let style = this.avatarStyle;
				if(style && style !== true && (style=style.trim()) ) {
					style = style.split(';');
					let obj = {};
					for( let v of style ) {
						if(!v) continue;
						v = v.trim().split(':');
						if(v[1].indexOf('upx') >= 0) {
							let arr = v[1].trim().split(' ');
							for( let k in arr ) {
								if(!arr[k]) continue;
								if(arr[k].indexOf('upx') >= 0) {
									arr[k] = parseFloat(arr[k]) * this.pxRatio + 'px';
								}
							}
							v[1] = arr.join(' ');
						}
						obj[v[0].trim()] = v[1].trim();
					}
					this.imgStyle = obj;
				}
				
				style = this.selStyle || {};
				if( this.selWidth && this.selHeight ) {
					style.width  = this.selWidth.indexOf('upx')  >= 0 ? parseInt(this.selWidth)  * this.pxRatio + 'px' : this.selWidth;
					style.height = this.selHeight.indexOf('upx') >= 0 ? parseInt(this.selHeight) * this.pxRatio + 'px' : this.selHeight;
				}
				style.top = (this.windowHeight - parseInt(style.height) - tabHeight)/2 + 'px';
				style.left = (this.windowWidth - parseInt(style.width))/2 + 'px';
				this.selStyle = style;
				
				if(this.styleDisplay === 'flex') {
					this.fDrawInit();
				}
			},
			fUpload() {
				if(this.fUploading)	return;
				this.fUploading = true;
				setTimeout(()=>{ this.fUploading = false; }, 1000)
				
				let style = this.selStyle,
					x = parseInt(style.left) + 3,
					y = parseInt(style.top) + 3,
					width = parseInt(style.width) - 6,
					height = parseInt(style.height) - 6;
					
				// #ifdef H5
				x *= this.pixelRatio;
				y *= this.pixelRatio;
				width *= this.pixelRatio;
				height *= this.pixelRatio;
				// #endif
					
				uni.showLoading({
					mask: true
				});
				uni.canvasToTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					canvasId: 'avatar-factory',
					fileType: 'png',
					quality: 0.9,
					success: (r)=>{
						this.styleDisplay = 'none'
						
						r = r.tempFilePath;
						// #ifdef H5
						this.btop(r).then((r)=> {
							this.$emit("upload", r);
						})
						// #endif
						
						// #ifndef H5
						this.$emit("upload", r);
						// #endif
					},
					fail: ()=>{
						uni.showLoading({
							title: "error1",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				}, this);
			},
			fDrawImage() {
				let tm_now = Date.now();
				if(tm_now - this.drawTm < 20) return;
				this.drawTm = tm_now;
				setTimeout(()=>{
					let ctxCanvas = this.ctxCanvas;
					// #ifdef H5
					ctxCanvas.restore();
					ctxCanvas.save();
					// #endif
					ctxCanvas.fillRect(0, 0, this.windowWidth, this.windowHeight-tabHeight);
					ctxCanvas.translate(this.posWidth+this.useWidth/2, this.posHeight+this.useHeight/2);
					ctxCanvas.scale(this.scaleSize, this.scaleSize);
					ctxCanvas.rotate(this.rotateDeg * Math.PI/180);
					ctxCanvas.drawImage(this.imgPath, -this.useWidth/2, -this.useHeight/2, this.useWidth, this.useHeight);
					// #ifndef H5
					ctxCanvas.draw(false);
					// #endif
				}, 20);
			},
			fPreview() {
				if(this.fPreviewing) return;
				this.fPreviewing = true;
				setTimeout(()=>{ this.fPreviewing = false; }, 1000);
				
				let style = this.selStyle,
					x = parseInt(style.left) + 3,
					y = parseInt(style.top) + 3,
					width = parseInt(style.width) - 6,
					height = parseInt(style.height) - 6;
					
				// #ifdef H5
				x *= this.pixelRatio;
				y *= this.pixelRatio;
				width *= this.pixelRatio;
				height *= this.pixelRatio;
				// #endif
				
				uni.showLoading({
					mask: true
				});
				uni.canvasToTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					canvasId: 'avatar-factory',
					fileType: 'png',
					quality: 0.9,
					success: (r)=>{
						r = r.tempFilePath;
						// #ifdef H5
						this.btop(r).then((r)=> {
							uni.previewImage({
								urls: [r]
							})
						})
						// #endif
						// #ifndef H5
						uni.previewImage({
							urls: [r]
						})
						// #endif
					},
					fail: ()=>{
						uni.showLoading({
							title: "error2",
							duration: 2000,
						})
					}, 
					complete: () => {
						uni.hideLoading();
					}
				}, this);
			},
			fDrawInit(ini=false) {
				let allWidth = this.windowWidth,
					allHeight = this.windowHeight,
					imgWidth = this.imgWidth,
					imgHeight = this.imgHeight,
					imgRadio = imgWidth/imgHeight,
					useWidth = allWidth - 40,
					useHeight = allHeight - tabHeight - 80,
					pixelRatio = this.pixelRatio;
				if( imgRadio < 1 ) {
					if( imgHeight < useHeight ) {
						useWidth = imgWidth;
						useHeight = imgHeight;
					} else {
						useHeight = useHeight;
						useWidth = useHeight*imgRadio;
					}
				} else {
					if( imgWidth < useWidth ) {
						useWidth = imgWidth;
						useHeight = imgHeight;
					} else {
						useWidth = useWidth;
						useHeight = useWidth/imgRadio;
					}
				}
				this.scaleSize = 1;
				this.rotateDeg = 0;
				this.posWidth = (allWidth-useWidth)/2;
				this.posHeight = (allHeight-useHeight-tabHeight)/2;
				this.useWidth = useWidth;
				this.useHeight = useHeight;
				
				// #ifdef H5
				if(this.styleDisplay === 'none') {
					let cvs = document.getElementsByTagName('canvas');
					this.canvas = cvs[0];
					this.canvasOper = cvs[1]; 
					this.ctxCanvas = this.canvas.getContext("2d"); 
					this.ctxCanvasOper = this.canvasOper.getContext("2d"); 
				}
				// #endif
				
				let style = this.selStyle,
					left = parseInt(style.left),
					top = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height),
					canvas = this.canvas,
					canvasOper = this.canvasOper,
					ctxCanvas = this.ctxCanvas,
					ctxCanvasOper = this.ctxCanvasOper;
				// #ifdef H5
				canvas.style.width = allWidth + 'px';
				canvas.style.height = allHeight + 'px';
				canvas.setAttribute("width", allWidth * pixelRatio + 'px');
				canvas.setAttribute("height", allHeight * pixelRatio + 'px');
				canvas.style.top = "0";
				canvas.style.left = "0";
				
				canvasOper.style.width = allWidth + 'px';
				canvasOper.style.height = allHeight + 'px';
				canvasOper.setAttribute("width", allWidth * pixelRatio + 'px');
				canvasOper.setAttribute("height", allHeight * pixelRatio + 'px');
				canvasOper.style.top = "0";
				canvasOper.style.left = "0";
				ctxCanvasOper.lineWidth = 3;
				ctxCanvasOper.strokeStyle = 'grey';
				ctxCanvasOper.globalAlpha = 0.3;
				ctxCanvasOper.fillStyle = 'grey';
				// #endif
				// #ifndef H5
				ctxCanvasOper.setLineWidth(3);
				ctxCanvasOper.setStrokeStyle('grey');
				ctxCanvasOper.setGlobalAlpha(0.3);
				ctxCanvasOper.setFillStyle('grey');
				// #endif
				ctxCanvasOper.strokeRect( left, top, width, height );
				ctxCanvasOper.fillRect(0, 0, this.windowWidth, top);
				ctxCanvasOper.fillRect(0, top, left, height);
				ctxCanvasOper.fillRect(0, top+height, this.windowWidth, this.windowHeight-height-top-tabHeight);
				ctxCanvasOper.fillRect(left+width, top,this.windowWidth-width-left, height);
				// #ifndef H5
				ctxCanvasOper.draw(false);
				// #endif
				
				if( ini ) {
					// #ifdef H5
					this.imgPath = null;
					let img = new Image();
					img.src =  this.path;
					img.addEventListener("load", ()=>{
						this.imgPath = img;
						this.styleDisplay = 'flex';
						ctxCanvas.fillStyle = 'black';
						this.fDrawImage();
					});
					// #endif
					// #ifndef H5
					this.styleDisplay = 'flex';
					ctxCanvas.setFillStyle('black');
					this.fDrawImage();
					// #endif
				} else {
					this.fDrawImage();
				}
			},
			fSelect() {
				if(this.fSelecting) return;
				this.fSelecting = true;
				setTimeout(()=>{ this.fSelecting = false; }, 500)
				
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (r)=>{
						let path = this.imgPath = r.tempFilePaths[0];
						uni.getImageInfo({
							src: path,
							success: r => {
								this.imgWidth = r.width;
								this.imgHeight = r.height;
								this.path = path;
								this.fDrawInit(true);
							},
							fail: ()=>{
								uni.showLoading({
									title: "error3",
									duration: 2000,
								})
							}
						});
					}
				})
			},
			fStart(e) {
				let touches = e.touches,
				touch0 = touches[0],
				touch1 = touches[1];
				
				this.touch0 = touch0;
				this.touch1 = touch1;
				
				if( touch1 ) {
					let x = touch1.x - touch0.x,
						y = touch1.y - touch0.y;
					this.fgDistance = Math.sqrt(x * x + y * y);
				}
			},
			fMove(e) {
				let touches = e.touches,
					touch0 = touches[0],
					touch1 = touches[1];
					
				if( touch1 ) {
					let x = touch1.x - touch0.x,
						y = touch1.y - touch0.y,
						fgDistance = Math.sqrt(x * x + y * y),
						scaleSize = 0.005 * (fgDistance - this.fgDistance);
					if( this.scaleSize + scaleSize > 0.3 && this.scaleSize + scaleSize < 4 ) {
						this.scaleSize += scaleSize;
					} 
					this.fgDistance = fgDistance;
			
					if(touch1.x !== touch0.x) {
						x = (this.touch1.y - this.touch0.y)/(this.touch1.x - this.touch0.x);
						y = (touch1.y - touch0.y)/(touch1.x - touch0.x);
						this.rotateDeg += Math.atan((y-x)/(1+x*y)) * 180/Math.PI;
						this.touch0 = touch0;
						this.touch1 = touch1;
					}
					
					this.fDrawImage();
				} else {
					
					let x = touch0.x - this.touch0.x,
						y = touch0.y - this.touch0.y;
					if( Math.abs(x) < 100 ) this.posWidth  += x;
					if( Math.abs(y) < 100 ) this.posHeight += y;
					this.touch0 = touch0;
					
					this.fDrawImage();
				}
			},
			fEnd(e) {
				let touches = e.touches,
					touch0 = touches && touches[0],
					touch1 = touches && touches[1];
				if(touch0) {
					this.touch0 = touch0;
				} else {
					this.touch0 = null;
					this.touch1 = null;
				}
			},
			fCancel() {
				uni.showLoading({
					title: "error4",
					duration: 2000,
				})
			},
			fError() {
				uni.showLoading({
					title: "error5",
					duration: 2000,
				})
			},
			btop(base64) {
				return new Promise(function(resolve, reject) {
					base64 = base64.split(',')
					var type = base64[0].match(/:(.*?);/)[1]
					var str = atob(base64[1])
					var n = str.length
					var array = new Uint8Array(n)
					while( n-- ) {
						array[n] = str.charCodeAt(n)
					}
					return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
				});
			},
		},
		name: "yqking-avatar",
	}
</script>

<style>
	.my-canvas{
		position: fixed;
		background: #000000;
		top: 0;
		left: 0;
		z-index: 100000;
		width: 100%;
	}
	.my-avatar {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.oper-canvas {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100001;
		width: 100%;
	}
	.oper-wrapper {
		position: fixed;
		background: #ffffff;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 100009;
		flex-direction: row;
	}
	.oper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 10upx 20upx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		align-self: center;
	}
	.btn-wrapper {
		display: flex;
		flex-direction: row;
		flex: 3;
	}
	.btn-wrapper view {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #333;
		border: 1px solid #f1f1f1;
		border-radius: 6%;
		margin: 0 2px;
	}
	.hover {
		background: #f1f1f1;
		border-radius: 6%;
	}
	.clr-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 30px;
		flex: 2;
	}
	.clr-wrapper view {
		margin-right: 10upx;
		font-size: 12px;
		color: #fff;
	}
</style>
