<template name="yq-avatar">
	<view>
		<image :src="imgSrc.imgSrc" @click="fSelect" :style="[ iS ]" class="my-avatar"></image>
		<canvas canvas-id="avatar-canvas" id="avatar-canvas" class="my-canvas" :style="{top: sT, height: csH}"
		 disable-scroll="false"></canvas>
		<canvas canvas-id="oper-canvas" id="oper-canvas" class="oper-canvas" :style="{top: sT, height: csH}"
		 disable-scroll="false" @touchstart="fStart" @touchmove="fMove" @touchend="fEnd"></canvas>
		<canvas canvas-id="prv-canvas" id="prv-canvas" class="prv-canvas" disable-scroll="false" 
		@touchstart="fHideImg" :style="{ height: csH, top: pT }"></canvas>
		<view class="oper-wrapper" :style="{display: sD, top:tp}">
			<view class="oper">
				<view class="btn-wrapper" v-if="sO">
					<view @click="fSelect" hover-class="hover" :style="{width: bW}"><text>重选</text></view>
					<view @click="fClose" hover-class="hover" :style="{width: bW}"><text>关闭</text></view>
					<view @click="fRotate" hover-class="hover" :style="{width: bW, display: bD}"><text>旋转</text></view>
					<view @click="fPreview" hover-class="hover" :style="{width: bW}"><text>预览</text></view>
					<view @click="fUpload" hover-class="hover" :style="{width: bW}"><text>上传</text></view>
				</view>
				<view class="clr-wrapper" v-else>
					<slider class="my-slider" @change="fColorChange" block-size="25" value="0" min="-100" max="100" activeColor="red"
					 backgroundColor="green" block-color="grey" show-value></slider>
					<view @click="fPrvUpload" hover-class="hover" :style="{width: bW}"><text>上传</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	"use strict";
	const tH = 50;
	export default {
		name: "yq-avatar",
		data() {
			return {
				csH: '0px',
				sD: 'none',
				sT: '-10000px',
				pT: '-10000px',
				iS: {},
				sS: {},
				sO: true,
				bW: '19%',
				bD: 'flex',
				tp: 0,
				imgSrc: {
					imgSrc: ''
				}
			};
		},
		watch: {
			avatarSrc() {
				this.imgSrc.imgSrc = this.avatarSrc;
			}
		},
		props: {
			avatarSrc: '',
			avatarStyle: '',
			selWidth: '',
			selHeight: '',
			expWidth: '',
			expHeight: '',
			minScale: '',
			maxScale: '',
			canScale: '',
			canRotate: '',
			lockWidth: '',
			lockHeight: '',
			stretch: '',
			lock: '',
			fileType: '',
			noTab: '',
			inner: '',
			quality: '',
			index: '',
			bgImage: '',
		},
		created() {
			this.cc = uni.createCanvasContext('avatar-canvas', this);
			this.cco = uni.createCanvasContext('oper-canvas', this);
			this.ccp = uni.createCanvasContext('prv-canvas', this);
			this.qlty = parseFloat(this.quality) || 1;
			this.imgSrc.imgSrc = this.avatarSrc;
			this.letRotate = (this.canRotate === false || this.inner === true || this.inner === 'true' || this.canRotate === 'false') ? 0 : 1;
			this.letScale = (this.canScale === false || this.canScale === 'false') ? 0 : 1;
			this.isin = (this.inner === true || this.inner === 'true') ? 1 : 0;
			this.indx = this.index || undefined;
			this.mnScale = parseFloat(this.minScale) || 0.3;
			this.mxScale = parseFloat(this.maxScale) || 4;
			this.noBar = (this.noTab === true || this.noTab === 'true') ? 1 : 0;
			this.stc = this.stretch;
			this.lck = this.lock;
			this.fType = this.fileType === 'jpg' ? 'jpg' : 'png';
			if (this.isin||!this.letRotate) {
				this.bW = '24%';
				this.bD = 'none';
			} else {
				this.bW = '19%';
				this.bD = 'flex';
			}
			
			if (this.noBar) {
				this.fWindowResize();
			} else {
				uni.showTabBar({
					fail: ()=>{
						this.noBar = 1;
					},
					success: ()=>{
						this.noBar = 0;
					},
					complete: (res) => {
						this.fWindowResize();
					}
				});
			}
		},
		methods: {
			fWindowResize() {
				let sysInfo = uni.getSystemInfoSync();
				this.platform = sysInfo.platform;
				this.wW = sysInfo.windowWidth;

				// #ifdef H5
				this.drawTop = sysInfo.windowTop;
				// #endif
				// #ifndef H5
				this.drawTop = 0;
				// #endif
				
				// #ifdef MP-ALIPAY
				this.wH = sysInfo.screenHeight - sysInfo.statusBarHeight - sysInfo.titleBarHeight;
				this.csH = this.wH - tH  + 'px';
				// #endif
				
				// #ifndef MP-ALIPAY
				this.wH = sysInfo.windowHeight;
				if(!this.noBar) this.wH += tH;
				this.csH = this.wH - tH  + 'px';
				// #endif
				
				this.tp = this.csH;
				// #ifdef H5
				this.tp =  sysInfo.windowTop + parseInt(this.csH)+ 'px';
				// #endif
				
				this.pxRatio = this.wW / 750;

				let style = this.avatarStyle;
				if (style && style !== true && (style = style.trim())) {
					style = style.split(';');
					let obj = {};
					for (let v of style) {
						if (!v) continue;
						v = v.trim().split(':');
						if (v[1].toString().indexOf('upx') >= 0) {
							let arr = v[1].trim().split(' ');
							for (let k in arr) {
								if (!arr[k]) continue;
								if (arr[k].toString().indexOf('upx') >= 0) {
									arr[k] = parseFloat(arr[k]) * this.pxRatio + 'px';
								}
							}
							v[1] = arr.join(' ');
						}
						obj[v[0].trim()] = v[1].trim();
					}
					this.iS = obj;
				}

				this.expWidth && (this.eW = this.expWidth.toString().indexOf('upx') >= 0 ? parseInt(this.expWidth) * this.pxRatio :
					parseInt(this.expWidth));
				this.expHeight && (this.eH = this.expHeight.toString().indexOf('upx') >= 0 ? parseInt(this.expHeight) * this.pxRatio :
					parseInt(this.expHeight));
				
				if (this.sD === 'flex') {
					this.fDrawInit(true);
				}
				this.fHideImg();
			},
			fSelect() {
				if (this.fSelecting) return;
				this.fSelecting = true;
				setTimeout(() => {
					this.fSelecting = false;
				}, 500);

				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (r) => {
						// #ifdef MP-ALIPAY
						uni.showLoading();
						// #endif
						// #ifndef MP-ALIPAY
						uni.showLoading({
							title: '加载中...',
							mask: true
						});
						// #endif

						let path = this.imgPath = r.tempFilePaths[0];
						uni.getImageInfo({
							src: path,
							success: r => {
								this.imgWidth = r.width;
								this.imgHeight = r.height;
								this.path = path;
								if (!this.hasSel) {
									let style = this.sS || {};
									if (this.selWidth && this.selHeight) {
										let sW = this.selWidth.toString().indexOf('upx') >= 0 ? parseInt(this.selWidth) * this.pxRatio : parseInt(
												this.selWidth),
											sH = this.selHeight.toString().indexOf('upx') >= 0 ? parseInt(this.selHeight) * this.pxRatio : parseInt(
												this.selHeight);
										style.width = sW + 'px';
										style.height = sH + 'px';
										style.top = ((this.wH - sH - tH)|0) / 2 + 'px';
										style.left = ((this.wW - sW)|0) / 2 + 'px';
									} else {
										uni.showModal({
											title: '裁剪框的宽或高没有设置',
											showCancel: false
										})
										return;
									}
									this.sS = style;
								}

								if (this.noBar) {
									this.fDrawInit(true);
								} else {
									uni.hideTabBar({
										complete: () => {
											this.fDrawInit(true);
										}
									});
								}
							},
							fail: () => {
								uni.showToast({
									title: "请选择正确图片",
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
			fUpload() {
				if (this.fUploading) return;
				this.fUploading = true;
				setTimeout(() => {
					this.fUploading = false;
				}, 1000)

				let style = this.sS,
					x = parseInt(style.left),
					y = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height),
					expWidth = this.eW || (width* this.pixelRatio),
					expHeight = this.eH || (height* this.pixelRatio);

				// #ifdef MP-ALIPAY
				uni.showLoading();
				// #endif
				// #ifndef MP-ALIPAY
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				// #endif

				this.sD = 'none';
				this.sT = '-10000px';
				this.hasSel = false;
				this.fHideImg();
				// #ifdef MP-ALIPAY
				this.cc.toTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					destWidth: expWidth,
					destHeight: expHeight,
					fileType: this.fType,
					quality: this.qlty,
					success: (r) => {
						r = r.apFilePath;
						this.$emit("upload", {
							avatar: this.imgSrc,
							path: r,
							index: this.indx,
							data: this.rtn,
							base64: this.base64 || null
						});
					},
					fail: (res) => {
						uni.showToast({
							title: "error1",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
						this.noBar || uni.showTabBar();
						this.$emit("end");
					}
				});
				// #endif
				// #ifndef MP-ALIPAY
				uni.canvasToTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					destWidth: expWidth,
					destHeight: expHeight,
					canvasId: 'avatar-canvas',
					fileType: this.fType,
					quality: this.qlty,
					success: (r) => {
						r = r.tempFilePath;
						// #ifdef H5
						this.btop(r).then((r) => {
							this.$emit("upload", {
								avatar: this.imgSrc,
								path: r,
								index: this.indx,
								data: this.rtn,
								base64: this.base64 || null
							});
							return;
						})
						// #endif
						// #ifndef H5
						this.$emit("upload", {
							avatar: this.imgSrc,
							path: r,
							index: this.indx,
							data: this.rtn,
							base64: this.base64 || null
						});
						// #endif
					},
					fail: (res) => {
						uni.showToast({
							title: "error1",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
						this.noBar || uni.showTabBar();
						this.$emit("end");
					}
				}, this);
				// #endif
			},
			fPrvUpload() {
				if (this.fPrvUploading) return;
				this.fPrvUploading = true;
				setTimeout(() => {
					this.fPrvUploading = false;
				}, 1000)

				let style = this.sS,
					destWidth = parseInt(style.width),
					destHeight = parseInt(style.height),
					prvX = this.prvX,
					prvY = this.prvY,
					prvWidth = this.prvWidth,
					prvHeight = this.prvHeight,
					expWidth = this.eW || (parseInt(style.width) * this.pixelRatio),
					expHeight = this.eH || (parseInt(style.height) * this.pixelRatio);

				// #ifdef MP-ALIPAY
				uni.showLoading();
				// #endif
				// #ifndef MP-ALIPAY
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				// #endif

				this.sD = 'none';
				this.sT = '-10000px';
				this.hasSel = false;
				this.fHideImg();
				// #ifdef MP-ALIPAY
				this.ccp.toTempFilePath({
					x: prvX,
					y: prvY,
					width: prvWidth,
					height: prvHeight,
					destWidth: expWidth,
					destHeight: expHeight,
					fileType: this.fType,
					quality: this.qlty,
					success: (r) => {
						r = r.apFilePath;
						this.$emit("upload", {
							avatar: this.imgSrc,
							path: r,
							index: this.indx,
							data: this.rtn,
							base64: this.base64 || null
						});
					},
					fail: () => {
						uni.showToast({
							title: "error_prv",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
						this.noBar || uni.showTabBar();
						this.$emit("end");
					}
				});
				// #endif
				// #ifndef MP-ALIPAY
				uni.canvasToTempFilePath({
					x: prvX,
					y: prvY,
					width: prvWidth,
					height: prvHeight,
					destWidth: expWidth,
					destHeight: expHeight,
					canvasId: 'prv-canvas',
					fileType: this.fType,
					quality: this.qlty,
					success: (r) => {
						r = r.tempFilePath;
						// #ifdef H5
						this.btop(r).then((r) => {
							this.$emit("upload", {
								avatar: this.imgSrc,
								path: r,
								index: this.indx,
								data: this.rtn,
								base64: this.base64 || null
							});
						})
						// #endif
						// #ifndef H5
						this.$emit("upload", {
							avatar: this.imgSrc,
							path: r,
							index: this.indx,
							data: this.rtn,
							base64: this.base64 || null
						});
						// #endif
					},
					fail: () => {
						uni.showToast({
							title: "error_prv",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
						this.noBar || uni.showTabBar();
						this.$emit("end");
					}
				}, this);
				// #endif
			},
			fDrawInit(ini = false) {
				let allWidth = this.wW,
					allHeight = this.wH,
					imgWidth = this.imgWidth,
					imgHeight = this.imgHeight,
					imgRadio = imgWidth / imgHeight,
					useWidth = allWidth - 40,
					useHeight = allHeight - tH - 80,
					useRadio = useWidth / useHeight,
					sW = parseInt(this.sS.width),
					sH = parseInt(this.sS.height);

				this.fixWidth = 0;
				this.fixHeight = 0;
				this.lckWidth = 0;
				this.lckHeight = 0;
				switch (this.stc) {
					case 'x':
						this.fixWidth = 1;
						break;
					case 'y':
						this.fixHeight = 1;
						break;
					case 'long':
						if (imgRadio > 1) this.fixWidth = 1;
						else this.fixHeight = 1;
						break;
					case 'short':
						if (imgRadio > 1) this.fixHeight = 1;
						else this.fixWidth = 1;
						break;
					case 'longSel':
						if (sW > sH) this.fixWidth = 1;
						else this.fixHeight = 1;
						break;
					case 'shortSel':
						if (sW > sH) this.fixHeight = 1;
						else this.fixWidth = 1;
						break;
				}
				switch (this.lck) {
					case 'x':
						this.lckWidth = 1;
						break;
					case 'y':
						this.lckHeight = 1;
						break;
					case 'long':
						if (imgRadio > 1) this.lckWidth = 1;
						else this.lckHeight = 1;
						break;
					case 'short':
						if (imgRadio > 1) this.lckHeight = 1;
						else this.lckWidth = 1;
						break;
					case 'longSel':
						if (sW > sH) this.lckWidth = 1;
						else this.lckHeight = 1;
						break;
					case 'shortSel':
						if (sW > sH) this.lckHeight = 1;
						else this.lckWidth = 1;
						break;
				}
				if (this.fixWidth) {
					useWidth = sW;
					useHeight = useWidth / imgRadio;
				} else if (this.fixHeight) {
					useHeight = sH;
					useWidth = useHeight * imgRadio;
				} else if (imgRadio < useRadio) {
					if (imgHeight < useHeight) {
						useWidth = imgWidth;
						useHeight = imgHeight;
					} else {
						useWidth = useHeight * imgRadio;
					}
				} else {
					if (imgWidth < useWidth) {
						useWidth = imgWidth;
						useHeight = imgHeight;
					} else {
						useHeight = useWidth / imgRadio;
					}
				}
				if (this.isin) {
					if (useWidth < sW) {
						useWidth = sW;
						useHeight = useWidth / imgRadio;
						this.lckHeight = 0;
					}
					if (useHeight < sH) {
						useHeight = sH;
						useWidth = useHeight * imgRadio;
						this.lckWidth = 0;
					}
				}

				this.scaleSize = 1;
				this.rotateDeg = 0;
				this.posWidth = (allWidth - useWidth) / 2 | 0;
				this.posHeight = (allHeight - useHeight - tH) / 2 | 0;
				this.useWidth = useWidth | 0;
				this.useHeight = useHeight | 0;
				this.centerX = this.posWidth + useWidth / 2;
				this.centerY = this.posHeight + useHeight / 2;
				this.focusX = 0;
				this.focusY = 0;

				let style = this.sS,
					left = parseInt(style.left),
					top = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height),
					canvas = this.canvas,
					canvasOper = this.canvasOper,
					cc = this.cc,
					cco = this.cco;
					
				cco.beginPath();
				cco.setLineWidth(3);
				cco.setGlobalAlpha(1);
				cco.setStrokeStyle('white');
				cco.strokeRect(left, top, width, height);
				
				cco.setFillStyle('black');
				cco.setGlobalAlpha(0.5);
				cco.fillRect(0, 0, this.wW, top);
				cco.fillRect(0, top, left, height);
				cco.fillRect(0, top + height, this.wW, this.wH - height - top - tH);
				cco.fillRect(left + width, top, this.wW - width - left, height);
				
				cco.setGlobalAlpha(1);
				cco.setStrokeStyle('red');
				cco.moveTo(left+15, top);
				cco.lineTo(left, top);
				cco.lineTo(left, top+15);
				cco.moveTo(left+width-15, top);
				cco.lineTo(left+width, top);
				cco.lineTo(left+width, top+15);
				cco.moveTo(left+15, top+height);
				cco.lineTo(left, top+height);
				cco.lineTo(left, top+height-15);
				cco.moveTo(left+width-15, top+height);
				cco.lineTo(left+width, top+height);
				cco.lineTo(left+width, top+height-15);
				cco.stroke();
				
				cco.draw(false, () => {
					if (ini) {
						this.sD = 'flex';
						this.sT = this.drawTop + 'px';
						this.fDrawImage(true);
					}
				});
				this.$emit("init");
			},
			fDrawImage(ini = false) {
				let tm_now = Date.now();
				if (tm_now - this.drawTm < 20) return;
				this.drawTm = tm_now;

				let cc = this.cc,
					imgWidth = this.useWidth * this.scaleSize,
					imgHeight = this.useHeight * this.scaleSize;

				// #ifdef MP-ALIPAY	
				cc.save();
				// #endif
				
				if (this.bgImage) {
					// #ifdef MP-ALIPAY
					cc.clearRect(0, 0, this.wW, this.wH - tH);
					// #endif
					// #ifndef MP-ALIPAY
					cc.drawImage(this.bgImage, 0, 0, this.wW, this.wH - tH);
					// #endif
				} else {
					cc.fillRect(0, 0, this.wW, this.wH - tH);
				}

				if (this.isin) {
					let cx = this.focusX * (this.scaleSize - 1),
						cy = this.focusY * (this.scaleSize - 1);

					cc.translate(this.centerX, this.centerY);
					cc.rotate(this.rotateDeg * Math.PI / 180);
					cc.drawImage(this.imgPath, this.posWidth-this.centerX-cx, this.posHeight-this.centerY-cy, imgWidth, imgHeight);
				
				} else {
					cc.translate(this.posWidth + imgWidth / 2, this.posHeight + imgHeight / 2);
					cc.rotate(this.rotateDeg * Math.PI / 180);
					cc.drawImage(this.imgPath, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
				}

				cc.draw(false);

				// #ifdef MP-ALIPAY
				cc.restore();
				// #endif
			},
			fPreview() {
				if (this.fPreviewing) return;
				this.fPreviewing = true;
				setTimeout(() => {
					this.fPreviewing = false;
				}, 1000);

				let style = this.sS,
					x = parseInt(style.left),
					y = parseInt(style.top),
					width = parseInt(style.width),
					height = parseInt(style.height);

				// #ifdef MP-ALIPAY
				uni.showLoading();
				// #endif
				// #ifndef MP-ALIPAY
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				// #endif

				// #ifdef MP-ALIPAY
				this.cc.toTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					expWidth: width * this.pixelRatio,
					expHeight: height * this.pixelRatio,
					fileType: this.fType,
					quality: this.qlty,
					success: (r) => {
						this.prvImgTmp = r = r.apFilePath;
						let ccp = this.ccp,
							prvX = this.wW,
							prvY = parseInt(this.csH),
							prvWidth = parseInt(this.sS.width),
							prvHeight = parseInt(this.sS.height),
							useWidth = prvX - 40,
							useHeight = prvY - 80,
							radio = useWidth / prvWidth,
							rHeight = prvHeight * radio;
						if (rHeight < useHeight) {
							prvWidth = useWidth;
							prvHeight = rHeight;
						} else {
							radio = useHeight / prvHeight;
							prvWidth *= radio;
							prvHeight = useHeight;
						}
						ccp.fillRect(0, 0, prvX, prvY);
						this.prvX = prvX = ((prvX - prvWidth) / 2) | 0;
						this.prvY = prvY = ((prvY - prvHeight) / 2) | 0;
						this.prvWidth = prvWidth = prvWidth | 0;
						this.prvHeight = prvHeight = prvHeight | 0;
						ccp.drawImage(r, prvX, prvY, prvWidth, prvHeight);
						ccp.draw(false);

						this.sO = false;
						this.pT = '0';
					},
					fail: () => {
						uni.showToast({
							title: "error2",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				});
				// #endif

				// #ifndef MP-ALIPAY
				uni.canvasToTempFilePath({
					x: x,
					y: y,
					width: width,
					height: height,
					expWidth: width * this.pixelRatio,
					expHeight: height * this.pixelRatio,
					canvasId: 'avatar-canvas',
					fileType: this.fType,
					quality: this.qlty,
					success: (r) => {
						this.prvImgTmp = r = r.tempFilePath;

						let ccp = this.ccp,
							prvX = this.wW,
							prvY = parseInt(this.csH);

						// #ifndef H5||MP-WEIXIN||APP-PLUS
						prvY += tH;
						// #endif
						// #ifdef APP-PLUS
						if (this.platform === 'android') {
							prvY += tH;
						}
						// #endif

						let prvWidth = parseInt(this.sS.width),
							prvHeight = parseInt(this.sS.height),
							useWidth = prvX - 40,
							useHeight = prvY - 80,
							radio = useWidth / prvWidth,
							rHeight = prvHeight * radio;
						if (rHeight < useHeight) {
							prvWidth = useWidth;
							prvHeight = rHeight;
						} else {
							radio = useHeight / prvHeight;
							prvWidth *= radio;
							prvHeight = useHeight;
						}

						ccp.fillRect(0, 0, prvX, prvY);
						this.prvX = prvX = ((prvX - prvWidth) / 2) | 0;
						this.prvY = prvY = ((prvY - prvHeight) / 2) | 0;
						this.prvWidth = prvWidth = prvWidth | 0;
						this.prvHeight = prvHeight = prvHeight | 0;
						ccp.drawImage(r, prvX, prvY, prvWidth, prvHeight);
						ccp.draw(false);

						// #ifdef H5
						this.btop(r).then((r) => {
							this.sO = false;
							this.pT = this.drawTop + 'px';
						})
						// #endif
						
						this.sO = false; 
						// if (this.platform === 'android') this.sO = false;
						this.pT = this.drawTop + 'px';
					},
					fail: () => {
						uni.showToast({
							title: "error2",
							duration: 2000,
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				}, this);
				// #endif
			},
			fChooseImg(index = undefined, params = undefined, data = undefined) {
				if (params) {
					let sW = params.selWidth,
						sH = params.selHeight,
						expWidth = params.expWidth,
						expHeight = params.expHeight,
						quality = params.quality,
						canRotate = params.canRotate,
						canScale = params.canScale,
						minScale = params.minScale,
						maxScale = params.maxScale,
						stretch = params.stretch,
						fileType = params.fileType,
						inner = params.inner,
						lock = params.lock;

					expWidth && (this.eW = expWidth.toString().indexOf('upx') >= 0 ? parseInt(expWidth) * this.pxRatio : parseInt(
						expWidth));
					expHeight && (this.eH = expHeight.toString().indexOf('upx') >= 0 ? parseInt(expHeight) * this.pxRatio : parseInt(
						expHeight));
					this.letRotate = (canRotate === false || inner === true || inner === 'true' || canRotate === 'false') ? 0 : 1;
					this.letScale = (canScale === false || canScale === 'false') ? 0 : 1;
					this.qlty = parseFloat(quality) || 1;
					this.mnScale = parseFloat(minScale) || 0.3;
					this.mxScale = parseFloat(maxScale) || 4;
					this.stc = stretch;
					this.isin = (inner === true || inner === 'true') ? 1 : 0;
					this.fType = fileType === 'jpg' ? 'jpg' : 'png';
					this.lck = lock;
					if (this.isin||!this.letRotate) {
						this.bW = '24%';
						this.bD = 'none';
					} else {
						this.bW = '19%';
						this.bD = 'flex';
					}

					if (sW && sH) {
						sW = sW.toString().indexOf('upx') >= 0 ? parseInt(sW) * this.pxRatio : parseInt(sW);
						sH = sH.toString().indexOf('upx') >= 0 ? parseInt(sH) * this.pxRatio : parseInt(sH);
						this.sS.width = sW + 'px';
						this.sS.height = sH + 'px';
						this.sS.top = ((this.wH - sH - tH)|0) / 2 + 'px';
						this.sS.left = ((this.wW - sW)|0) / 2 + 'px';
						this.hasSel = true;
					}
				}
				this.rtn = data;
				this.indx = index;
				this.fSelect();
			},
			fRotate() {
				this.rotateDeg += 90 - this.rotateDeg % 90;
				this.fDrawImage();
			},
			fStart(e) {
				let touches = e.touches,
					touch0 = touches[0],
					touch1 = touches[1];

				this.touch0 = touch0;
				this.touch1 = touch1;

				if (touch1) {
					let x = touch1.x - touch0.x,
						y = touch1.y - touch0.y;
					this.fgDistance = Math.sqrt(x * x + y * y);
				}
			},
			fMove(e) {
				let touches = e.touches,
					touch0 = touches[0],
					touch1 = touches[1];

				if (touch1) {
					let x = touch1.x - touch0.x,
						y = touch1.y - touch0.y,
						fgDistance = Math.sqrt(x * x + y * y),
						scaleSize = 0.005 * (fgDistance - this.fgDistance),
						beScaleSize = this.scaleSize + scaleSize;

					do {
						if (!this.letScale) break;
						if (beScaleSize < this.mnScale) break;
						if (beScaleSize > this.mxScale) break;

						let growX = this.useWidth * scaleSize / 2,
							growY = this.useHeight * scaleSize / 2;
						if (this.isin) {
							let imgWidth = this.useWidth * beScaleSize,
								imgHeight = this.useHeight * beScaleSize,
								l = this.posWidth - growX,
								t = this.posHeight - growY,
								r = l + imgWidth,
								b = t + imgHeight,
								left = parseInt(this.sS.left),
								top = parseInt(this.sS.top),
								width = parseInt(this.sS.width),
								height = parseInt(this.sS.height),
								right = left + width,
								bottom = top + height,
								cx, cy;

							if (imgWidth <= width || imgHeight <= height) break;
							this.cx = cx = this.focusX * beScaleSize - this.focusX,
								this.cy = cy = this.focusY * beScaleSize - this.focusY;
							this.posWidth -= growX;
							this.posHeight -= growY;
							if (this.posWidth - cx > left) {
								this.posWidth = left + cx;
							}
							if (this.posWidth + imgWidth - cx < right) {
								this.posWidth = right - imgWidth + cx;
							}
							if (this.posHeight - cy > top) {
								this.posHeight = top + cy;
							}
							if (this.posHeight + imgHeight - cy < bottom) {
								this.posHeight = bottom - imgHeight + cy;
							}
						} else {
							this.posWidth -= growX;
							this.posHeight -= growY;
						}

						this.scaleSize = beScaleSize;
					} while (0);
					this.fgDistance = fgDistance;
					if (touch1.x !== touch0.x && this.letRotate) {
						x = (this.touch1.y - this.touch0.y) / (this.touch1.x - this.touch0.x);
						y = (touch1.y - touch0.y) / (touch1.x - touch0.x);
						this.rotateDeg += Math.atan((y - x) / (1 + x * y)) * 180 / Math.PI;
						this.touch0 = touch0;
						this.touch1 = touch1;
					}

					this.fDrawImage();
				} else if (this.touch0) {
					let x = touch0.x - this.touch0.x,
						y = touch0.y - this.touch0.y,
						beX = this.posWidth + x,
						beY = this.posHeight + y;
					if (this.isin) {
						let imgWidth = this.useWidth * this.scaleSize,
							imgHeight = this.useHeight * this.scaleSize,
							l = beX,
							t = beY,
							r = l + imgWidth,
							b = t + imgHeight,
							left = parseInt(this.sS.left),
							top = parseInt(this.sS.top),
							right = left + parseInt(this.sS.width),
							bottom = top + parseInt(this.sS.height),
							cx, cy;

						this.cx = cx = this.focusX * this.scaleSize - this.focusX;
						this.cy = cy = this.focusY * this.scaleSize - this.focusY;

						if (!this.lckWidth && Math.abs(x) < 100) {
							if (left < l - cx) {
								this.posWidth = left + cx;
							} else if (right > r - cx) {
								this.posWidth = right - imgWidth + cx;
							} else {
								this.posWidth = beX;
								this.focusX -= x;
							}
						}
						if (!this.lckHeight && Math.abs(y) < 100) {
							if (top < t - cy) {
								this.focusY -= (top + cy - this.posHeight);
								this.posHeight = top + cy;
							} else if (bottom > b - cy) {
								this.focusY -= (bottom + cy - (this.posHeight + imgHeight));
								this.posHeight = bottom - imgHeight + cy;
							} else {
								this.posHeight = beY;
								this.focusY -= y;
							}
						}
					} else {
						if (Math.abs(x) < 100 && !this.lckWidth) this.posWidth = beX;
						if (Math.abs(y) < 100 && !this.lckHeight) this.posHeight = beY;
						this.focusX -= x;
						this.focusY -= y;
					}

					this.touch0 = touch0;
					this.fDrawImage();
				}
			},
			fEnd(e) {
				let touches = e.touches,
					touch0 = touches && touches[0],
					touch1 = touches && touches[1];
				if (touch0) {
					this.touch0 = touch0;
				} else {
					this.touch0 = null;
					this.touch1 = null;
				}
			},
			fHideImg() {
				this.prvImg = '';
				this.pT = '-10000px';
				this.sO = true;
				this.prvImgData = null;
				this.target = null;
			},
			fClose() {
				this.sD = 'none';
				this.sT = '-10000px';
				this.hasSel = false;
				this.fHideImg();
				this.noBar || uni.showTabBar();
				this.$emit("end");
			},
			fGetImgData() {
				return new Promise((resolve, reject) => {
					let prvX = this.prvX,
						prvY = this.prvY,
						prvWidth = this.prvWidth,
						prvHeight = this.prvHeight;
					// #ifdef MP-ALIPAY
					this.ccp.getImageData({
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
					// #endif
					// #ifndef MP-ALIPAY
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
					// #endif
				});
			},
			async fColorChange(e) {
				let tm_now = Date.now();
				if (tm_now - this.prvTm < 100) return;
				this.prvTm = tm_now;

				// #ifdef MP-ALIPAY
				uni.showLoading();
				// #endif
				// #ifndef MP-ALIPAY
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				// #endif

				if (!this.prvImgData) {
					if (!(this.prvImgData = await this.fGetImgData().catch(() => {
							uni.showToast({
								title: "error_read",
								duration: 2000,
							})
						}))) return;

					this.target = new Uint8ClampedArray(this.prvImgData.length);
				}

				let data = this.prvImgData,
					target = this.target,
					i = e.detail.value,
					r, g, b, a, h, s, l, d, p, q, t, min, max, hK, tR, tG, tB;

				if (i === 0) {
					target = data;
				} else {
					i = (i + 100) / 200;
					if (i < 0.005) i = 0;
					if (i > 0.995) i = 1;
					for (let n = data.length - 1; n >= 0; n -= 4) {
						r = data[n - 3] / 255;
						g = data[n - 2] / 255;
						b = data[n - 1] / 255;
						max = Math.max(r, g, b);
						min = Math.min(r, g, b);
						d = max - min;
						if (max === min) {
							h = 0;
						} else if (max === r && g >= b) {
							h = 60 * ((g - b) / d);
						} else if (max === r && g < b) {
							h = 60 * ((g - b) / d) + 360;
						} else if (max === g) {
							h = 60 * ((b - r) / d) + 120;
						} else if (max === b) {
							h = 60 * ((r - g) / d) + 240;
						}
						l = (max + min) / 2;
						if (l === 0 || max === min) {
							s = 0;
						} else if (0 < l && l <= 0.5) {
							s = d / (2 * l);
						} else if (l > 0.5) {
							s = d / (2 - 2 * l);
						}
						data[n] && (a = data[n]);

						if (i < 0.5) {
							s = s * i / 0.5;
						} else if (i > 0.5) {
							s = 2 * s + 2 * i - (s * i / 0.5) - 1;
						}

						if (s === 0) {
							r = g = b = Math.round(l * 255);
						} else {
							if (l < 0.5) {
								q = l * (1 + s);
							} else if (l >= 0.5) {
								q = l + s - (l * s);
							}
							p = 2 * l - q;
							hK = h / 360;
							tR = hK + 1 / 3;
							tG = hK;
							tB = hK - 1 / 3;
							let correctRGB = (t) => {
								if (t < 0) {
									return t + 1.0;
								}
								if (t > 1) {
									return t - 1.0;
								}
								return t;
							};
							let createRGB = (t) => {
								if (t < (1 / 6)) {
									return p + ((q - p) * 6 * t);
								} else if (t >= (1 / 6) && t < (1 / 2)) {
									return q;
								} else if (t >= (1 / 2) && t < (2 / 3)) {
									return p + ((q - p) * 6 * ((2 / 3) - t));
								}
								return p;
							};
							r = tR = Math.round(createRGB(correctRGB(tR)) * 255);
							g = tG = Math.round(createRGB(correctRGB(tG)) * 255);
							b = tB = Math.round(createRGB(correctRGB(tB)) * 255);
						}
						a && (target[n] = a);
						target[n - 3] = r;
						target[n - 2] = g;
						target[n - 1] = b;
					}
				}

				let prvX = this.prvX,
					prvY = this.prvY,
					prvWidth = this.prvWidth,
					prvHeight = this.prvHeight;

				// #ifdef MP-ALIPAY
				this.ccp.putImageData({
					x: prvX,
					y: prvY,
					width: prvWidth,
					height: prvHeight,
					data: target,
					fail() {
						uni.showToast({
							title: 'error_put',
							duration: 2000
						})
					},
					complete() {
						uni.hideLoading();
					}
				}, this);
				// #endif

				// #ifndef MP-ALIPAY
				uni.canvasPutImageData({
					canvasId: 'prv-canvas',
					x: prvX,
					y: prvY,
					width: prvWidth,
					height: prvHeight,
					data: target,
					fail() {
						uni.showToast({
							title: 'error_put',
							duration: 2000
						})
					},
					complete() {
						uni.hideLoading();
					}
				}, this);
				// #endif
			},
			btop(base64) {
				this.base64 = base64;
				return new Promise(function(resolve, reject) {
					var arr = base64.split(','),
						mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([u8arr], {
						type: mime
					})));
				});
			},
		}
	}
</script>

<style>
	.my-canvas {
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
		box-sizing: border-box;
		border: 1px solid #F1F1F1;
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
	}

	.my-slider {
		flex-grow: 1;
	}
</style>
