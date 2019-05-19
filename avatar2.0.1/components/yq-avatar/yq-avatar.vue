<template name="yq-avatar">
	<view>
		<image :src="avatarSrc" @click="fSelect" :style="[ imgStyle ]" class="my-avatar"></image>
		<canvas canvas-id="avatar-factory" class="my-canvas" :style="{top: styleTop, height: cvsStyleHeight}" disable-scroll="false"></canvas>
		<canvas canvas-id="oper-canvas" class="oper-canvas" :style="{top: styleTop, height: cvsStyleHeight}"
		disable-scroll="false" @touchstart="fStart" @touchmove="fMove" @touchend="fEnd"></canvas>
		<canvas canvas-id="prv-canvas" class="prv-canvas" disable-scroll="false" @click="fHideImg" :style="{top: prvTop}">
			<image :src="prvImg" mode="aspectFit"></image>
		</canvas>
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
		name: "yq-avatar",
		data() {
			return {
				tabStyleHeight: '0px',
				cvsStyleHeight: '0px',
				styleDisplay: 'none',
				styleTop: '-10000px',
				prvTop: '-10000px',
				imgStyle: {},
				prvImg: '',
			};
		},
		props:{
			avatarSrc: '',
			avatarStyle: '',
			selWidth: '',
			selHeight: '',
		},
		created() {
			this.ctxCanvas = uni.createCanvasContext('avatar-factory', this);
			this.ctxCanvasOper = uni.createCanvasContext('oper-canvas', this);
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
				// #ifdef H5
				this.windowHeight += sysInfo.windowTop;
				// #endif
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
					this.fHideImg();
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
						this.styleDisplay = 'none';
						this.styleTop = '-10000px';
						
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
					ctxCanvas.fillRect(0, 0, this.windowWidth, this.windowHeight-tabHeight);
					ctxCanvas.translate(this.posWidth+this.useWidth/2, this.posHeight+this.useHeight/2);
					ctxCanvas.scale(this.scaleSize, this.scaleSize);
					ctxCanvas.rotate(this.rotateDeg * Math.PI/180);
					ctxCanvas.drawImage(this.imgPath, -this.useWidth/2, -this.useHeight/2, this.useWidth, this.useHeight);
					ctxCanvas.draw(false);
				}, 20);
			},
			fHideImg() {
				this.prvImg = '';
				this.prvTop = '-10000px';
				this.styleTop = '0px';
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
							this.prvImg = r;
							this.prvTop = '0';
							this.styleTop = '-10000px';
						})
						// #endif
						// #ifndef H5
						this.prvImg = r;
						this.prvTop = '0';
						this.styleTop = '-10000px';
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
				
				let style = this.selStyle,
					left = parseInt(style.left),
					top = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height),
					canvas = this.canvas,
					canvasOper = this.canvasOper,
					ctxCanvas = this.ctxCanvas,
					ctxCanvasOper = this.ctxCanvasOper;
				ctxCanvasOper.setLineWidth(3);
				ctxCanvasOper.setStrokeStyle('grey');
				ctxCanvasOper.setGlobalAlpha(0.3);
				ctxCanvasOper.setFillStyle('grey');
				ctxCanvasOper.strokeRect( left, top, width, height );
				ctxCanvasOper.fillRect(0, 0, this.windowWidth, top);
				ctxCanvasOper.fillRect(0, top, left, height);
				ctxCanvasOper.fillRect(0, top+height, this.windowWidth, this.windowHeight-height-top-tabHeight);
				ctxCanvasOper.fillRect(left+width, top,this.windowWidth-width-left, height);
				ctxCanvasOper.draw(false);
				
				if( ini ) {
					this.styleDisplay = 'flex';
					this.styleTop = '0';
					ctxCanvas.setFillStyle('black');
					this.fDrawImage();
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
				} else if( this.touch0 ) {
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
			btop(base64) {
				return new Promise(function(resolve, reject) {
					var arr = base64.split(','),
						mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([u8arr], { type: mime })));
				});
			},
		}
	}
</script>

<style>
	.my-canvas{
		display: flex;
		position: fixed !important;
		background: #000000;
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
		display: flex;
		position: fixed !important;
		left: 0;
		z-index: 100001;
		width: 100%;
	}
	.oper-wrapper {
		position: fixed !important;
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
	.prv-canvas {
		display: flex;
		position: fixed !important;
		background: #000000;
		left: 0;
		z-index: 200000;
		width: 100%;
		height: 100%;
		/* background-repeat: no-repeat;
		background-position: center;
		background-color: #000000;
		background-size: contain; */
		justify-content: center;
		align-items: center;
	}
	.prv-canvas image {
		width: 100%;
		height: 100%;
	}
</style>
