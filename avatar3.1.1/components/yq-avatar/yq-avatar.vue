<template name="yq-avatar">
	<view>
		<image :src="imgSrc.imgSrc" @click="fSelect" :style="[ imgStyle ]" class="my-avatar"></image>
		<canvas canvas-id="avatar-factory" class="my-canvas" :style="{top: styleTop, height: cvsStyleHeight}" disable-scroll="false"></canvas>
		<canvas canvas-id="oper-canvas" class="oper-canvas" :style="{top: styleTop, height: cvsStyleHeight}" disable-scroll="false" @touchstart="fStart" @touchmove="fMove" @touchend="fEnd"></canvas>
		<canvas canvas-id="prv-canvas" class="prv-canvas" disable-scroll="false" @touchstart="fHideImg"	:style="{ height: cvsStyleHeight, top: prvTop }"></canvas>
		<view class="oper-wrapper" :style="{display: styleDisplay}">
			<view class="oper">
				<view class="btn-wrapper" v-if="showOper">
					<view @click="fSelect"  hover-class="hover"><text>重选</text></view>
					<view @click="fPreview" hover-class="hover"><text>预览</text></view>
					<view @click="fUpload"  hover-class="hover"><text>上传</text></view>
				</view>
				<view class="clr-wrapper" v-else>
					<slider class="my-slider" @change="fColorChange"
					block-size="25" value="0" min="-100" max="100" activeColor="green" backgroundColor="red" block-color="grey" show-value></slider>
					<view @click="fPrvUpload"  hover-class="hover"><text>上传</text></view>
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
				cvsStyleHeight: '0px',
				styleDisplay: 'none',
				styleTop: '-10000px',
				prvTop: '-10000px',
				imgStyle: {},
				showOper: true,
				imgSrc: {
					imgSrc: ''
				},
			};
		},
		watch: {
			avatarSrc() {
				this.imgSrc.imgSrc = this.avatarSrc;
			}
		},
		props:{
			avatarSrc: '',
			avatarStyle: '',
			selWidth: '',
			selHeight: '',
			quality: '',
			index: '',
		},
		created() {
			this.ctxCanvas = uni.createCanvasContext('avatar-factory', this);
			this.ctxCanvasOper = uni.createCanvasContext('oper-canvas', this);
			this.ctxCanvasPrv = uni.createCanvasContext('prv-canvas', this);
			this.qlty = parseInt(this.quality) || 0.9;
			this.imgSrc.imgSrc = this.avatarSrc;
			
			uni.showTabBar({
				complete:(res) => {
					this.moreHeight = (res.errMsg === 'showTabBar:ok') ? 50 : 0;
					// uni.onWindowResize(()=>{
					// 	this.styleDisplay = 'none';
					// 	this.styleTop = '-10000px';
					// 	this.fHideImg();
					// })
					this.fWindowResize();
				}
			});
		},
		methods: {
			fGetImgData() {
				return new Promise((resolve, reject)=>{
					let prvX = this.prvX,
						prvY = this.prvY,
						prvWidth = this.prvWidth,
						prvHeight = this.prvHeight;
					// #ifdef APP-PLUS||H5
					prvX *= this.pixelRatio;
					prvY *= this.pixelRatio;
					prvWidth *= this.pixelRatio;
					prvHeight *= this.pixelRatio;
					// #endif
					uni.canvasGetImageData({
						canvasId: 'prv-canvas',
						x: prvX,
						y: prvY,
						width: prvWidth,
						height: prvHeight,
						success(res) {
							resolve(res.data);
						},
						fail(err) {
							reject(err);
						}
					}, this);
				});
			},
			async fColorChange(e) {
				let tm_now = Date.now();
				if(tm_now - this.prvTm < 20) return;
				this.prvTm = tm_now;
				
				uni.showLoading({ mask: true });
				
				if( !this.prvImgData ) {
					if( !(this.prvImgData = await this.fGetImgData().catch((res)=>{
						uni.showLoading({
							title: "error_read",
							duration: 2000,
						})
					}))) return;
					this.target = new Uint8ClampedArray(this.prvImgData.length);
				}
				
				let data = this.prvImgData,
					target = this.target,
					i = e.detail.value,
					r,g,b,a,h,s,l,d,p,q,t,min,max,hK,tR,tG,tB;
					
				if( i === 0 ) {
					target = data;
				} else {
					i = (i+100)/200;
					if( i < 0.005 ) i = 0;
					if( i > 0.995 ) i = 1;
					for( let n = data.length-1; n >= 0; n-=4 ) {
						r = data[n-3] / 255;
						g = data[n-2] / 255;
						b = data[n-1] / 255;
						max = Math.max(r,g,b);
						min = Math.min(r,g,b);
						d = max-min;
						if ( max === min ){
							h = 0 ;
						}else if( max === r && g>=b ){
							h = 60*( (g-b)/d ) ;
						}else if( max === r && g<b ){
							h = 60*( (g-b)/d ) + 360 ;
						}else if( max === g ){
							h = 60*( (b-r)/d ) + 120 ;
						}else if( max === b ){
							h = 60*( (r-g)/d ) + 240 ;
						}
						l = (max+min)/2 ;
						if ( l===0 || max===min ){
							s = 0 ;
						}else if( 0<l && l<=0.5 ){
							s = d/(2*l) ;
						}else if( l>0.5 ){
							s = d/(2-2*l) ;
						}
						data[n] && (a = data[n]);
						
						if ( i < 0.5 ){
							s = s*i/0.5 ;
						}else if ( i > 0.5 ){
							s = 2*s + 2*i - (s*i/0.5) - 1 ;
						}
						
						if ( s === 0 ){
							r = g = b = Math.round( l*255 ) ;
						}else{
							if ( l<0.5 ){
								q = l * ( 1 + s ) ;
							}else if( l>=0.5 ){
								q = l + s - ( l * s ) ;
							}      
							p = 2*l-q ;
							hK = h/360 ;
							tR = hK + 1/3 ;
							tG = hK ;
							tB = hK - 1/3 ;
							let correctRGB = (t)=>{
								if( t<0 ){
									return t + 1.0 ;
								}
								if( t>1 ){
									return t - 1.0 ;
								}
								return t ;
							} ;
							let createRGB = (t)=>{
								if ( t<(1/6) ){
									return p+((q-p)*6*t) ;
								}else if( t>=(1/6) && t<(1/2) ){
									return q ;
								}else if( t>=(1/2) && t<(2/3) ){
									return p+((q-p)*6*((2/3)-t)) ;
								}
								return p ;
							} ;
							r = tR = Math.round( createRGB( correctRGB( tR ) )*255 ) ;
							g = tG = Math.round( createRGB( correctRGB( tG ) )*255 ) ;
							b = tB = Math.round( createRGB( correctRGB( tB ) )*255 ) ;
						}
						a && ( target[n] = a ) ;  
						target[n-3] = r;
						target[n-2] = g;
						target[n-1] = b;
					}
				}
				let prvX = this.prvX,
					prvY = this.prvY,
					prvWidth = this.prvWidth,
					prvHeight = this.prvHeight;
					
				this.ctxCanvasPrv.setFillStyle('black');
				this.ctxCanvasPrv.fillRect(prvX, prvY, prvWidth, prvHeight);
				this.ctxCanvasPrv.draw(true);
				
				// #ifdef APP-PLUS||H5
				prvX *= this.pixelRatio;
				prvY *= this.pixelRatio;
				prvWidth *= this.pixelRatio;
				prvHeight *= this.pixelRatio;
				// #endif
				
				
				uni.canvasPutImageData({
					canvasId: 'prv-canvas',
					x: prvX,
					y: prvY,
					width: prvWidth,
					height: prvHeight,
					data: target,
					success(res) {
					},
					fail() {
						uni.showLoading({
							title: 'error_put',
							duration: 2000
						})
					},
					complete(res) {
						uni.hideLoading();
					}
				}, this);
			},
			fWindowResize() {
				let sysInfo = uni.getSystemInfoSync();
				this.platform = sysInfo.platform;
				this.pixelRatio = sysInfo.pixelRatio;
				this.windowWidth = sysInfo.windowWidth;
				// #ifdef H5
				this.windowHeight = sysInfo.windowHeight + sysInfo.windowBottom;
				this.drawTop = sysInfo.windowTop;
				// #endif
				// #ifdef APP-PLUS
				if(this.platform === 'android') {
					this.windowHeight = sysInfo.screenHeight + sysInfo.statusBarHeight;
				} else {
					this.windowHeight = sysInfo.windowHeight + this.moreHeight;
				}
				// #endif
				// #ifdef MP
				this.windowHeight = sysInfo.windowHeight + this.moreHeight;
				// #endif
				
				this.pxRatio = this.windowWidth/750;
				this.cvsStyleHeight = this.windowHeight - tabHeight + 'px';
				
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
					setTimeout(()=>{
						this.fDrawInit(true);
					}, 200);
				}
				this.fHideImg();
			},
			fUpload() {
				if(this.fUploading)	return;
				this.fUploading = true;
				setTimeout(()=>{ this.fUploading = false; }, 1000)
				
				let style = this.selStyle,
					x = parseInt(style.left),
					y = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height);
					
				// #ifdef H5
				x *= this.pixelRatio;
				y *= this.pixelRatio;
				// #endif
					
				uni.showLoading({
					mask: true
				});
				
				this.styleDisplay = 'none';
				this.styleTop = '-10000px';
				this.fHideImg();
				uni.canvasToTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					destWidth: width,
					destHeight: height,
					canvasId: 'avatar-factory',
					fileType: 'png',
					quality: this.qlty,
					success: (r)=>{
						r = r.tempFilePath;
						// #ifdef H5
						this.btop(r).then((r)=> {
							r = { index: this.index, path: r, avatar: this.imgSrc };
							this.$emit("upload", r);
						})
						// #endif
						// #ifndef H5
						r = { index: this.index, path: r, avatar: this.imgSrc };
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
						uni.showTabBar();
					}
				}, this);
			},
			fPrvUpload() {
				if(this.fPrvUploading)	return;
				this.fPrvUploading = true;
				setTimeout(()=>{ this.fPrvUploading = false; }, 1000)
				
				let style = this.selStyle,
					destWidth = parseInt(style.width),
					destHeight = parseInt(style.height),
					prvX = this.prvX,
					prvY = this.prvY,
					prvWidth = this.prvWidth,
					prvHeight = this.prvHeight;
					
				// #ifdef H5
				prvX *= this.pixelRatio;
				prvY *= this.pixelRatio;
				// #endif
					
				uni.showLoading({
					mask: true
				});
				this.styleDisplay = 'none';
				this.styleTop = '-10000px';
				this.fHideImg();
				
				uni.canvasToTempFilePath({
					x: prvX,
					y: prvY,
					width: prvWidth,
					height: prvHeight,
					destWidth: prvWidth,
					destHeight: prvHeight,
					canvasId: 'prv-canvas',
					fileType: 'png',
					quality: this.qlty,
					success: (r)=>{
						r = r.tempFilePath;
						// #ifdef H5
						this.btop(r).then((r)=> {
							r = { index: this.index, path: r, avatar: this.imgSrc };
							this.$emit("upload", r);
						})
						// #endif
						// #ifndef H5
						r = { index: this.index, path: r, avatar: this.imgSrc };
						this.$emit("upload", r);
						// #endif
					},
					fail: ()=>{
						uni.showLoading({
							title: "error_prv",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
						uni.showTabBar();
					}
				}, this);
			},
			fDrawImage() {
				let tm_now = Date.now();
				if(tm_now - this.drawTm < 20) return;
				this.drawTm = tm_now;
				let ctxCanvas = this.ctxCanvas;
				ctxCanvas.fillRect(0, 0, this.windowWidth, this.windowHeight-tabHeight);
				ctxCanvas.translate(this.posWidth+this.useWidth/2, this.posHeight+this.useHeight/2);
				ctxCanvas.scale(this.scaleSize, this.scaleSize);
				ctxCanvas.rotate(this.rotateDeg * Math.PI/180);
				ctxCanvas.drawImage(this.imgPath, -this.useWidth/2, -this.useHeight/2, this.useWidth, this.useHeight);
				ctxCanvas.draw(false);
			},
			fHideImg() {
				this.prvImg = '';
				this.prvTop = '-10000px';
				this.showOper = true;
				this.prvImgData = null;
				this.target = null;
			},
			fPreview() {
				if(this.fPreviewing) return;
				this.fPreviewing = true;
				setTimeout(()=>{ this.fPreviewing = false; }, 1000);
				
				let style = this.selStyle,
					x = parseInt(style.left),
					y = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height);
					
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
					quality: this.qlty,
					success: (r)=>{
						this.prvImgTmp = r = r.tempFilePath;
						
						let ctxCanvasPrv = this.ctxCanvasPrv,
							prvX = this.windowWidth,
							prvY = parseInt(this.cvsStyleHeight),
							prvWidth = parseInt(this.selStyle.width),
							prvHeight = parseInt(this.selStyle.height),
							useWidth = prvX - 40,
							useHeight = prvY - 80,
							radio = useWidth/prvWidth,
							rHeight = prvHeight*radio;
							if(rHeight < useHeight) {
								prvWidth = useWidth;
								prvHeight = rHeight;
							} else {
								radio = useHeight/prvHeight;
								prvWidth *= radio;
								prvHeight = useHeight;
							}
						ctxCanvasPrv.setFillStyle('black');
						ctxCanvasPrv.fillRect(0, 0, prvX, prvY);
						this.prvX = prvX = (prvX-prvWidth)/2;
						this.prvY = prvY = (prvY-prvHeight)/2;
						this.prvWidth = prvWidth;
						this.prvHeight = prvHeight;
						ctxCanvasPrv.drawImage(r, prvX, prvY, prvWidth, prvHeight);
						ctxCanvasPrv.draw(false);
						
						// #ifdef H5
						this.btop(r).then((r)=> {
							this.showOper = false;
							this.prvTop = this.drawTop + 'px';
						})
						// #endif
						// #ifndef H5
						if( this.platform != 'android' ) {
							this.showOper = false;
						}
						this.prvTop = '0';
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
					// #ifdef H5
					this.styleTop = this.drawTop + 'px';
					// #endif
					// #ifndef H5
					this.styleTop = '0';
					// #endif
					ctxCanvas.setFillStyle('black');
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
						uni.showLoading({ mask: true });
						let path = this.imgPath = r.tempFilePaths[0];
						uni.getImageInfo({
							src: path,
							success: r => {
								this.imgWidth = r.width;
								this.imgHeight = r.height;
								this.path = path;
								uni.hideTabBar({
									complete: () => {
										setTimeout(()=>{
											this.fDrawInit(true);
										}, 200);
									}
								});
							},
							fail: ()=>{
								uni.showLoading({
									title: "error3",
									duration: 2000,
								})
							},
							complete() {
								uni.hideLoading();
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
		width: 150upx;
		height: 150upx;
		border-radius: 100%;
	}
	.oper-canvas {
		display: flex;
		position: fixed !important;
		left: 0;
		z-index: 100001;
		width: 100%;
	}
	.prv-canvas {
		display: flex;
		position: fixed !important;
		background: #000000;
		left: 0;
		z-index: 200000;
		width: 100%;
	}
	.oper-wrapper {
		height: 50px;
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
		/* #ifndef H5 */
		flex-grow: 1;
		/* #endif */
		/* #ifdef H5 */
		height: 50px;
		/* #endif */
		justify-content: space-between;
	}
	.btn-wrapper view {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #333;
		border: 1px solid #f1f1f1;
		border-radius: 6%;
		width: 30%;
	}
	.hover {
		background: #f1f1f1;
		border-radius: 6%;
	}
	.clr-wrapper {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}
	.clr-wrapper view {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		color: #333;
		border: 1px solid #f1f1f1;
		border-radius: 6%;
		width: 30%;
	}
	.my-slider {
		flex-grow: 1;
	}
</style>
