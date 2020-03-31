(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/yq-avatar/yq-avatar"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var tabHeight = 50;var _default =
{
  name: "yq-avatar",
  data: function data() {
    return {
      cvsStyleHeight: '0px',
      styleDisplay: 'none',
      styleTop: '-10000px',
      prvTop: '-10000px',
      imgStyle: {},
      selStyle: {},
      showOper: true,
      imgSrc: {
        imgSrc: '' },

      btnWidth: '19%',
      btnDsp: 'flex' };

  },
  watch: {
    avatarSrc: function avatarSrc() {
      this.imgSrc.imgSrc = this.avatarSrc;
    } },

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
    noTab: '',
    inner: '',
    quality: '',
    index: '' },

  created: function created() {var _this = this;
    this.ctxCanvas = uni.createCanvasContext('avatar-canvas', this);
    this.ctxCanvasOper = uni.createCanvasContext('oper-canvas', this);
    this.ctxCanvasPrv = uni.createCanvasContext('prv-canvas', this);
    this.qlty = parseInt(this.quality) || 0.9;
    this.imgSrc.imgSrc = this.avatarSrc;
    this.letRotate = this.canRotate === 'false' || this.inner === 'true' ? 0 : 1;
    this.letScale = this.canScale === 'false' ? 0 : 1;
    this.isin = this.inner === 'true' ? 1 : 0;
    this.indx = this.index || undefined;
    this.mnScale = this.minScale || 0.3;
    this.mxScale = this.maxScale || 4;
    this.noBar = this.noTab === 'true' ? 1 : 0;
    this.stc = this.stretch;
    this.lck = this.lock;
    if (this.isin) {
      this.btnWidth = '24%';
      this.btnDsp = 'none';
    }

    if (this.noBar) {
      this.moreHeight = 0;
      this.fWindowResize();
    } else {
      uni.showTabBar({
        complete: function complete(res) {
          _this.moreHeight = res.errMsg === 'showTabBar:ok' ? 50 : 0;
          _this.fWindowResize();
        } });

    }
  },
  methods: {
    fGetImgData: function fGetImgData() {var _this2 = this;
      return new Promise(function (resolve, reject) {
        var prvX = _this2.prvX,
        prvY = _this2.prvY,
        prvWidth = _this2.prvWidth,
        prvHeight = _this2.prvHeight;

        prvX *= _this2.pixelRatio;
        prvY *= _this2.pixelRatio;
        prvWidth *= _this2.pixelRatio;
        prvHeight *= _this2.pixelRatio;

        uni.canvasGetImageData({
          canvasId: 'prv-canvas',
          x: prvX,
          y: prvY,
          width: prvWidth,
          height: prvHeight,
          success: function success(res) {
            resolve(res.data);
          },
          fail: function fail(err) {
            reject(err);
          } },
        _this2);
      });
    },
    fColorChange: function () {var _fColorChange = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {var tm_now, data, target, i, r, g, b, a, h, s, l, d, p, q, t, min, max, hK, tR, tG, tB, n, correctRGB, createRGB, prvX, prvY, prvWidth, prvHeight;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                tm_now = Date.now();if (!(
                tm_now - this.prvTm < 100)) {_context.next = 3;break;}return _context.abrupt("return");case 3:
                this.prvTm = tm_now;

                uni.showLoading({ mask: true });if (

                this.prvImgData) {_context.next = 11;break;}_context.next = 8;return (
                  this.fGetImgData().catch(function (res) {
                    uni.showToast({
                      title: "error_read",
                      duration: 2000 });

                  }));case 8:if (this.prvImgData = _context.sent) {_context.next = 10;break;}return _context.abrupt("return");case 10:
                this.target = new Uint8ClampedArray(this.prvImgData.length);case 11:


                data = this.prvImgData,
                target = this.target,
                i = e.detail.value;


                if (i === 0) {
                  target = data;
                } else {
                  i = (i + 100) / 200;
                  if (i < 0.005) i = 0;
                  if (i > 0.995) i = 1;
                  for (n = data.length - 1; n >= 0; n -= 4) {
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
                      s = 2 * s + 2 * i - s * i / 0.5 - 1;
                    }

                    if (s === 0) {
                      r = g = b = Math.round(l * 255);
                    } else {
                      if (l < 0.5) {
                        q = l * (1 + s);
                      } else if (l >= 0.5) {
                        q = l + s - l * s;
                      }
                      p = 2 * l - q;
                      hK = h / 360;
                      tR = hK + 1 / 3;
                      tG = hK;
                      tB = hK - 1 / 3;
                      correctRGB = function correctRGB(t) {
                        if (t < 0) {
                          return t + 1.0;
                        }
                        if (t > 1) {
                          return t - 1.0;
                        }
                        return t;
                      };
                      createRGB = function createRGB(t) {
                        if (t < 1 / 6) {
                          return p + (q - p) * 6 * t;
                        } else if (t >= 1 / 6 && t < 1 / 2) {
                          return q;
                        } else if (t >= 1 / 2 && t < 2 / 3) {
                          return p + (q - p) * 6 * (2 / 3 - t);
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
                prvX = this.prvX,
                prvY = this.prvY,
                prvWidth = this.prvWidth,
                prvHeight = this.prvHeight;

                this.ctxCanvasPrv.setFillStyle('black');
                this.ctxCanvasPrv.fillRect(prvX, prvY, prvWidth, prvHeight);
                this.ctxCanvasPrv.draw(true);


                prvX *= this.pixelRatio;
                prvY *= this.pixelRatio;
                prvWidth *= this.pixelRatio;
                prvHeight *= this.pixelRatio;

                uni.canvasPutImageData({
                  canvasId: 'prv-canvas',
                  x: prvX,
                  y: prvY,
                  width: prvWidth,
                  height: prvHeight,
                  data: target,
                  fail: function fail() {
                    uni.showToast({
                      title: 'error_put',
                      duration: 2000 });

                  },
                  complete: function complete() {
                    uni.hideLoading();
                  } },
                this);case 22:case "end":return _context.stop();}}}, _callee, this);}));function fColorChange(_x) {return _fColorChange.apply(this, arguments);}return fColorChange;}(),

    fWindowResize: function fWindowResize() {
      var sysInfo = uni.getSystemInfoSync();
      this.platform = sysInfo.platform;
      this.pixelRatio = sysInfo.pixelRatio;
      this.windowWidth = sysInfo.windowWidth;






      if (this.platform === 'android') {
        this.windowHeight = sysInfo.screenHeight + sysInfo.statusBarHeight;
        this.cvsStyleHeight = this.windowHeight - tabHeight + 'px';
      } else {
        this.windowHeight = sysInfo.windowHeight + this.moreHeight;
        this.cvsStyleHeight = this.windowHeight - tabHeight + 6 + 'px';
      }





      this.pxRatio = this.windowWidth / 750;

      var style = this.avatarStyle;
      if (style && style !== true && (style = style.trim())) {
        style = style.split(';');
        var obj = {};var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
          for (var _iterator = style[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var v = _step.value;
            if (!v) continue;
            v = v.trim().split(':');
            if (v[1].indexOf('upx') >= 0) {
              var arr = v[1].trim().split(' ');
              for (var k in arr) {
                if (!arr[k]) continue;
                if (arr[k].indexOf('upx') >= 0) {
                  arr[k] = parseFloat(arr[k]) * this.pxRatio + 'px';
                }
              }
              v[1] = arr.join(' ');
            }
            obj[v[0].trim()] = v[1].trim();
          }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return != null) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
        this.imgStyle = obj;
      }

      this.expWidth && (this.exportWidth = this.expWidth.indexOf('upx') >= 0 ? parseInt(this.expWidth) * this.pxRatio : parseInt(this.expWidth));
      this.expHeight && (this.exportHeight = this.expHeight.indexOf('upx') >= 0 ? parseInt(this.expHeight) * this.pxRatio : parseInt(this.expHeight));

      if (this.styleDisplay === 'flex') {
        this.fDrawInit(true);
      }
      this.fHideImg();
    },
    fSelect: function fSelect() {var _this3 = this;
      if (this.fSelecting) return;
      this.fSelecting = true;
      setTimeout(function () {_this3.fSelecting = false;}, 500);

      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function success(r) {
          uni.showLoading({ mask: true });
          var path = _this3.imgPath = r.tempFilePaths[0];
          uni.getImageInfo({
            src: path,
            success: function success(r) {
              _this3.imgWidth = r.width;
              _this3.imgHeight = r.height;
              _this3.path = path;
              if (!_this3.hasSel) {
                var style = _this3.selStyle || {};
                if (_this3.selWidth && _this3.selHeight) {
                  var selWidth = _this3.selWidth.indexOf('upx') >= 0 ? parseInt(_this3.selWidth) * _this3.pxRatio : parseInt(_this3.selWidth),
                  selHeight = _this3.selHeight.indexOf('upx') >= 0 ? parseInt(_this3.selHeight) * _this3.pxRatio : parseInt(_this3.selHeight);
                  style.width = selWidth + 'px';
                  style.height = selHeight + 'px';
                  style.top = (_this3.windowHeight - selHeight - tabHeight) / 2 + 'px';
                  style.left = (_this3.windowWidth - selWidth) / 2 + 'px';
                } else {
                  uni.showModal({
                    title: '裁剪框的宽或高没有设置',
                    showCancel: false });

                  return;
                }
                _this3.selStyle = style;
              }

              if (_this3.noBar) {
                _this3.fDrawInit(true);
              } else {
                uni.hideTabBar({
                  complete: function complete() {
                    _this3.fDrawInit(true);
                  } });

              }
            },
            fail: function fail() {
              uni.showToast({
                title: "error3",
                duration: 2000 });

            },
            complete: function complete() {
              uni.hideLoading();
            } });

        } });

    },
    fUpload: function fUpload() {var _this4 = this;
      if (this.fUploading) return;
      this.fUploading = true;
      setTimeout(function () {_this4.fUploading = false;}, 1000);

      var style = this.selStyle,
      x = parseInt(style.left),
      y = parseInt(style.top),
      width = parseInt(style.width),
      height = parseInt(style.height),
      expWidth = this.exportWidth || width,
      expHeight = this.exportHeight || height;








      uni.showLoading({ mask: true });
      this.styleDisplay = 'none';
      this.styleTop = '-10000px';
      this.hasSel = false;
      this.fHideImg();
      uni.canvasToTempFilePath({
        x: x,
        y: y,
        width: width,
        height: height,
        destWidth: expWidth,
        destHeight: expHeight,
        canvasId: 'avatar-canvas',
        fileType: 'png',
        quality: this.qlty,
        success: function success(r) {
          r = r.tempFilePath;







































          _this4.$emit("upload", { avatar: _this4.imgSrc, path: r, index: _this4.indx, data: _this4.rtn });

        },
        fail: function fail(res) {
          uni.showToast({
            title: "error1",
            duration: 2000 });

        },
        complete: function complete() {
          uni.hideLoading();
          _this4.noBar || uni.showTabBar();
        } },
      this);
    },
    fPrvUpload: function fPrvUpload() {var _this5 = this;
      if (this.fPrvUploading) return;
      this.fPrvUploading = true;
      setTimeout(function () {_this5.fPrvUploading = false;}, 1000);

      var style = this.selStyle,
      destWidth = parseInt(style.width),
      destHeight = parseInt(style.height),
      prvX = this.prvX,
      prvY = this.prvY,
      prvWidth = this.prvWidth,
      prvHeight = this.prvHeight,
      expWidth = this.exportWidth || prvWidth,
      expHeight = this.exportHeight || prvHeight;








      uni.showLoading({ mask: true });

      this.styleDisplay = 'none';
      this.styleTop = '-10000px';
      this.hasSel = false;
      this.fHideImg();
      uni.canvasToTempFilePath({
        x: prvX,
        y: prvY,
        width: prvWidth,
        height: prvHeight,
        destWidth: expWidth,
        destHeight: expHeight,
        canvasId: 'prv-canvas',
        fileType: 'png',
        quality: this.qlty,
        success: function success(r) {
          r = r.tempFilePath;







































          _this5.$emit("upload", { avatar: _this5.imgSrc, path: r, index: _this5.indx, data: _this5.rtn });

        },
        fail: function fail() {
          uni.showToast({
            title: "error_prv",
            duration: 2000 });

        },
        complete: function complete() {
          uni.hideLoading();
          _this5.noBar || uni.showTabBar();
        } },
      this);
    },
    fDrawImage: function fDrawImage() {
      var tm_now = Date.now();
      if (tm_now - this.drawTm < 20) return;
      this.drawTm = tm_now;
      var ctxCanvas = this.ctxCanvas;
      ctxCanvas.fillRect(0, 0, this.windowWidth, this.windowHeight - tabHeight);
      ctxCanvas.translate(this.posWidth + this.useWidth / 2, this.posHeight + this.useHeight / 2);
      ctxCanvas.scale(this.scaleSize, this.scaleSize);
      ctxCanvas.rotate(this.rotateDeg * Math.PI / 180);
      ctxCanvas.drawImage(this.imgPath, -this.useWidth / 2, -this.useHeight / 2, this.useWidth, this.useHeight);
      ctxCanvas.draw(false);
    },
    fHideImg: function fHideImg() {
      this.prvImg = '';
      this.prvTop = '-10000px';
      this.showOper = true;
      this.prvImgData = null;
      this.target = null;
    },
    fClose: function fClose() {
      this.styleDisplay = 'none';
      this.styleTop = '-10000px';
      this.hasSel = false;
      this.fHideImg();
      this.noBar || uni.showTabBar();
    },
    fPreview: function fPreview() {var _this6 = this;
      if (this.fPreviewing) return;
      this.fPreviewing = true;
      setTimeout(function () {_this6.fPreviewing = false;}, 1000);

      var style = this.selStyle,
      x = parseInt(style.left),
      y = parseInt(style.top),
      width = parseInt(style.width),
      height = parseInt(style.height);






      uni.showLoading({ mask: true });

      uni.canvasToTempFilePath({
        x: x,
        y: y,
        width: width,
        height: height,
        canvasId: 'avatar-canvas',
        fileType: 'png',
        quality: this.qlty,
        success: function success(r) {
          _this6.prvImgTmp = r = r.tempFilePath;

          var ctxCanvasPrv = _this6.ctxCanvasPrv,
          prvX = _this6.windowWidth,
          prvY = parseInt(_this6.cvsStyleHeight),
          prvWidth = parseInt(_this6.selStyle.width),
          prvHeight = parseInt(_this6.selStyle.height),
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
          ctxCanvasPrv.setFillStyle('black');
          ctxCanvasPrv.fillRect(0, 0, prvX, prvY);
          _this6.prvX = prvX = (prvX - prvWidth) / 2;
          _this6.prvY = prvY = (prvY - prvHeight) / 2;
          _this6.prvWidth = prvWidth;
          _this6.prvHeight = prvHeight;
          ctxCanvasPrv.drawImage(r, prvX, prvY, prvWidth, prvHeight);
          ctxCanvasPrv.draw(false);








          if (_this6.platform != 'android') {
            _this6.showOper = false;
          }
          _this6.prvTop = '0';

        },
        fail: function fail() {
          uni.showToast({
            title: "error2",
            duration: 2000 });

        },
        complete: function complete() {
          uni.hideLoading();
        } },
      this);
    },
    fDrawInit: function fDrawInit() {var _this7 = this;var ini = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var allWidth = this.windowWidth,
      allHeight = this.windowHeight,
      imgWidth = this.imgWidth,
      imgHeight = this.imgHeight,
      imgRadio = imgWidth / imgHeight,
      useWidth = allWidth - 40,
      useHeight = allHeight - tabHeight - 80,
      pixelRatio = this.pixelRatio,
      selWidth = parseInt(this.selStyle.width),
      selHeight = parseInt(this.selStyle.height);

      this.fixWidth = 0;
      this.fixHeight = 0;
      this.lckWidth = 0;
      this.lckHeight = 0;
      switch (this.stc) {
        case 'x':this.fixWidth = 1;break;
        case 'y':this.fixHeight = 1;break;
        case 'long':if (imgRadio > 1) this.fixWidth = 1;else this.fixHeight = 1;break;
        case 'short':if (imgRadio > 1) this.fixHeight = 1;else this.fixWidth = 1;break;
        case 'longSel':if (selWidth > selHeight) this.fixWidth = 1;else this.fixHeight = 1;break;
        case 'shortSel':if (selWidth > selHeight) this.fixHeight = 1;else this.fixWidth = 1;break;}

      switch (this.lck) {
        case 'x':this.lckWidth = 1;break;
        case 'y':this.lckHeight = 1;break;
        case 'long':if (imgRadio > 1) this.lckWidth = 1;else this.lckHeight = 1;break;
        case 'short':if (imgRadio > 1) this.lckHeight = 1;else this.lckWidth = 1;break;
        case 'longSel':if (selWidth > selHeight) this.lckWidth = 1;else this.lckHeight = 1;break;
        case 'shortSel':if (selWidth > selHeight) this.lckHeight = 1;else this.lckWidth = 1;break;}

      if (this.fixWidth) {
        useWidth = selWidth;
        useHeight = useWidth / imgRadio;
      } else if (this.fixHeight) {
        useHeight = selHeight;
        useWidth = useHeight * imgRadio;
      } else if (imgRadio < 1) {
        if (imgHeight < useHeight) {
          useWidth = imgWidth;
          useHeight = imgHeight;
        } else {
          useHeight = useHeight;
          useWidth = useHeight * imgRadio;
        }
      } else {
        if (imgWidth < useWidth) {
          useWidth = imgWidth;
          useHeight = imgHeight;
        } else {
          useWidth = useWidth;
          useHeight = useWidth / imgRadio;
        }
      }
      if (this.isin) {
        this.scaleWidth = 0;
        this.scaleHeight = 0;
        if (useWidth < selWidth) {
          useWidth = selWidth;
          useHeight = useWidth / imgRadio;
          this.lckHeight = 0;
        }
        if (useHeight < selHeight) {
          useHeight = selHeight;
          useWidth = useHeight * imgRadio;
          this.lckWidth = 0;
        }
      }

      this.scaleSize = 1;
      this.rotateDeg = 0;
      this.posWidth = (allWidth - useWidth) / 2;
      this.posHeight = (allHeight - useHeight - tabHeight) / 2;
      this.useWidth = useWidth;
      this.useHeight = useHeight;

      var style = this.selStyle,
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
      ctxCanvasOper.setGlobalAlpha(0.4);
      ctxCanvasOper.setFillStyle('black');
      ctxCanvasOper.strokeRect(left, top, width, height);
      ctxCanvasOper.fillRect(0, 0, this.windowWidth, top);
      ctxCanvasOper.fillRect(0, top, left, height);
      ctxCanvasOper.fillRect(0, top + height, this.windowWidth, this.windowHeight - height - top - tabHeight);
      ctxCanvasOper.fillRect(left + width, top, this.windowWidth - width - left, height);
      ctxCanvasOper.setStrokeStyle('red');
      ctxCanvasOper.moveTo(left + 20, top);ctxCanvasOper.lineTo(left, top);ctxCanvasOper.lineTo(left, top + 20);
      ctxCanvasOper.moveTo(left + width - 20, top);ctxCanvasOper.lineTo(left + width, top);ctxCanvasOper.lineTo(left + width, top + 20);
      ctxCanvasOper.moveTo(left + 20, top + height);ctxCanvasOper.lineTo(left, top + height);ctxCanvasOper.lineTo(left, top + height - 20);
      ctxCanvasOper.moveTo(left + width - 20, top + height);ctxCanvasOper.lineTo(left + width, top + height);ctxCanvasOper.lineTo(left + width, top + height - 20);
      ctxCanvasOper.stroke();

      ctxCanvasOper.draw(false, function () {
        if (ini) {

          _this7.styleDisplay = 'flex';




          _this7.styleTop = '0';

          ctxCanvas.setFillStyle('black');
          _this7.fDrawImage();
        }
      });

      this.$emit("avtinit");
    },
    fChooseImg: function fChooseImg() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      if (params) {
        var selWidth = params.selWidth,
        selHeight = params.selHeight,
        expWidth = params.expWidth,
        expHeight = params.expHeight,
        quality = params.quality,
        canRotate = params.canRotate,
        canScale = params.canScale,
        inner = params.inner,
        minScale = params.minScale,
        maxScale = params.maxScale,
        stretch = params.stretch,
        lock = params.lock,
        noTab = params.noTab;

        expWidth && (this.exportWidth = expWidth.indexOf('upx') >= 0 ? parseInt(expWidth) * this.pxRatio : parseInt(expWidth));
        expHeight && (this.exportHeight = expHeight.indexOf('upx') >= 0 ? parseInt(expHeight) * this.pxRatio : parseInt(expHeight));
        this.letRotate = canRotate === 'false' || inner === 'true' ? 0 : 1;
        this.letScale = canScale === 'false' ? 0 : 1;
        this.noBar = noTab === 'true' ? 1 : 0;
        this.qlty = parseInt(quality) || 0.9;
        this.isin = inner === 'true' ? 1 : 0;
        this.mnScale = minScale || 0.3;
        this.mxScale = maxScale || 4;
        this.stc = stretch;
        this.lck = lock;
        if (selWidth && selHeight) {
          selWidth = selWidth.indexOf('upx') >= 0 ? parseInt(selWidth) * this.pxRatio : parseInt(selWidth);
          selHeight = selHeight.indexOf('upx') >= 0 ? parseInt(selHeight) * this.pxRatio : parseInt(selHeight);
          this.selStyle.width = selWidth + 'px';
          this.selStyle.height = selHeight + 'px';
          this.selStyle.top = (this.windowHeight - selHeight - tabHeight) / 2 + 'px';
          this.selStyle.left = (this.windowWidth - selWidth) / 2 + 'px';
          this.hasSel = true;
        }
      }
      this.rtn = data;
      this.indx = index;
      this.fSelect();
    },
    fRotate: function fRotate() {var _this8 = this;

      if (this.platform === 'android') {
        if (this.fRotateing) return;
        this.fRotateing = true;
        setTimeout(function () {_this8.fRotateing = false;}, 500);
      }


      if (this.letRotate) {
        this.rotateDeg += 90 - this.rotateDeg % 90;
        this.fDrawImage();
      }
    },
    fStart: function fStart(e) {
      var touches = e.touches,
      touch0 = touches[0],
      touch1 = touches[1];

      this.touch0 = touch0;
      this.touch1 = touch1;

      if (touch1) {
        var x = touch1.x - touch0.x,
        y = touch1.y - touch0.y;
        this.fgDistance = Math.sqrt(x * x + y * y);
      }
    },
    fMove: function fMove(e) {
      var touches = e.touches,
      touch0 = touches[0],
      touch1 = touches[1];

      if (touch1) {
        var x = touch1.x - touch0.x,
        y = touch1.y - touch0.y,
        fgDistance = Math.sqrt(x * x + y * y),
        scaleSize = 0.005 * (fgDistance - this.fgDistance),
        beScaleSize = this.scaleSize + scaleSize;

        do {
          if (!this.letScale) break;
          if (beScaleSize < this.mnScale) break;
          if (beScaleSize > this.mxScale) break;
          if (this.isin) {
            var imgWidth = this.useWidth * beScaleSize,
            imgHeight = this.useHeight * beScaleSize,
            rx0 = this.posWidth + this.useWidth / 2,
            ry0 = this.posHeight + this.useHeight / 2,
            l = rx0 - imgWidth / 2,t = ry0 - imgHeight / 2,
            r = l + imgWidth,b = t + imgHeight,
            left = parseInt(this.selStyle.left),
            top = parseInt(this.selStyle.top),
            width = parseInt(this.selStyle.width),
            height = parseInt(this.selStyle.height);
            if (left < l || left + width > r || top < t || top + height > b) break;
            this.scaleWidth = (this.useWidth - imgWidth) / 2;
            this.scaleHeight = (this.useHeight - imgHeight) / 2;
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
        var _x2 = touch0.x - this.touch0.x,
        _y = touch0.y - this.touch0.y,
        beX = this.posWidth + _x2,
        beY = this.posHeight + _y;
        if (this.isin) {
          var _imgWidth = this.useWidth * this.scaleSize,
          _imgHeight = this.useHeight * this.scaleSize,
          _rx = beX + this.useWidth / 2,
          _ry = beY + this.useHeight / 2,
          _l = _rx - _imgWidth / 2,_t = _ry - _imgHeight / 2,
          _r = _l + _imgWidth,_b = _t + _imgHeight,
          _left = parseInt(this.selStyle.left),
          _top = parseInt(this.selStyle.top),
          _width = parseInt(this.selStyle.width),
          _height = parseInt(this.selStyle.height);
          if (!this.lckWidth && Math.abs(_x2) < 100) {
            if (_left >= _l && _left + _width <= _r) {
              this.posWidth = beX;
            } else if (_left < _l) {
              this.posWidth = _left - this.scaleWidth;
            } else if (_left + _width > _r) {
              this.posWidth = _left - (_imgWidth - _width) - this.scaleWidth;
            }
          }
          if (!this.lckHeight && Math.abs(_y) < 100) {
            if (_top >= _t && _top + _height <= _b) {
              this.posHeight = beY;
            } else if (_top < _t) {
              this.posHeight = _top - this.scaleHeight;
            } else if (_top + _height > _b) {
              this.posHeight = _top - (_imgHeight - _height) - this.scaleHeight;
            }
          }
        } else {
          if (Math.abs(_x2) < 100 && !this.lckWidth) this.posWidth = beX;
          if (Math.abs(_y) < 100 && !this.lckHeight) this.posHeight = beY;
        }

        this.touch0 = touch0;
        this.fDrawImage();
      }
    },
    fEnd: function fEnd(e) {
      var touches = e.touches,
      touch0 = touches && touches[0],
      touch1 = touches && touches[1];
      if (touch0) {
        this.touch0 = touch0;
      } else {
        this.touch0 = null;
        this.touch1 = null;
      }
    },
    btop: function btop(base64) {
      return new Promise(function (resolve, reject) {
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
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var s0 = _vm.__get_style([_vm.imgStyle])

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        s0: s0
      }
    }
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue":
/*!**********************************************************************!*\
  !*** D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _yq_avatar_vue_vue_type_template_id_1a2d5a0c_name_yq_avatar___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar& */ "D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar&");
/* harmony import */ var _yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./yq-avatar.vue?vue&type=script&lang=js& */ "D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _yq_avatar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./yq-avatar.vue?vue&type=style&index=0&lang=css& */ "D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _yq_avatar_vue_vue_type_template_id_1a2d5a0c_name_yq_avatar___WEBPACK_IMPORTED_MODULE_0__["render"],
  _yq_avatar_vue_vue_type_template_id_1a2d5a0c_name_yq_avatar___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./yq-avatar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=script&lang=js&");
/* harmony import */ var _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************!*\
  !*** D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./yq-avatar.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar&":
/*!********************************************************************************************************************!*\
  !*** D:/workspace/uni-app/avatar/components/yq-avatar/yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_template_id_1a2d5a0c_name_yq_avatar___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue?vue&type=template&id=1a2d5a0c&name=yq-avatar&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_template_id_1a2d5a0c_name_yq_avatar___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_F_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_yq_avatar_vue_vue_type_template_id_1a2d5a0c_name_yq_avatar___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/yq-avatar/yq-avatar-create-component',
    {
        'components/yq-avatar/yq-avatar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('./node_modules/@dcloudio/uni-app-plus/dist/index.js')['createComponent'](__webpack_require__("D:\\workspace\\uni-app\\avatar\\components\\yq-avatar\\yq-avatar.vue"))
        })
    },
    [['components/yq-avatar/yq-avatar-create-component']]
]);                
