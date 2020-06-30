示例说明(可以直接去github下载项目运行, 有问题或讨论方法，请撩924515629)

注意：

1)  H5平台，后台收到文件后，需要根据文件类型添加后缀，无法直接使用文件后缀

2)  百度小程序使用头像的页面，需要在页面style里配置 "disableScroll": true

H5测试地址

![image](https://github.com/yqking/uniapp-avatar/blob/master/qr.png)

<br/><br/>

感谢如下用户信息反馈，为组件优化提供宝贵意见和建议

 **393747897@qq.com、caomeiyouren@qq.com、enson、lionxiong、dcloud@zdxai.com、<br/>暮雪骄阳、帅少**

<br/><br/>

如果单页面使用多个裁剪框，建议使用方法二<br/>用法一

```
//template部分
    <avatar	
        selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="url"
        avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;">
    </avatar>

//script部分
    import avatar from "../../components/yq-avatar/yq-avatar.vue";
    export default {
        data() {
            return {
                url: "../../static/logo.png"
            }
        },
        methods: {
            myUpload(rsp) {
            	this.url = rsp.path; //更新头像方式一
            	//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
            }
        }，
        components: {
            avatar
        }
    }
```

<br/>用法二

```
//template部分
    <image :src="urls[0]" @click="clk(0)"></image>
    <image :src="urls[1]" @click="clk(1)"></image>
    <button @click="clk(0)">按钮触发</button>
    <avatar @upload="myUpload" ref="avatar"></avatar>

//script部分
    import avatar from "../../components/yq-avatar/yq-avatar.vue";
    export default {
        data() {
            return {
                urls: ["../../static/logo.png","../../static/logo.png"]
            }
        },
        methods: {
            myUpload(rsp) {
            	this.$set(this.urls, rsp.index, rsp.path);
            },
            clk(index) {
                this.$refs.avatar.fChooseImg(index,{
                    selWidth: "300upx", selHeight: "300upx",
                    expWidth: '260upx', expHeight: '260upx'
                });
            }
        }，
        components: {
            avatar
        }
    }
```

<br/>

| 属性        | 必须 | 类型   | 说明                                                         |
| ----------- | ---- | ------ | ------------------------------------------------------------ |
| selWidth    | 是   | string | 裁剪区域的宽，单位px或upx                                    |
| selHeight   | 是   | string | 裁剪区域的高，单位px或upx                                    |
| noTab       | 否   | bool   | 是否存在tabBar，默认false，即有tabBar。**支付宝小程序必须填写，不然无法运行** |
| avatarSrc   | 否   | string | 头像地址                                                     |
| avatarStyle | 否   | object | 头像样式，默认{width: 150upx; height: 150upx; border-radius: 100%;} |
| bgImg       | 否   | string | 剪切背景图片，默认黑色背景                                   |
| expWidth    | 否   | string | 设置导出图片宽度。默认值selWidth*屏幕像素密度，单位px或upx   |
| expHeight   | 否   | string | 设置导出图片高度。默认值selHeight*屏幕像素密度，单位px或upx  |
| inner       | 否   | bool   | 只允许在图片范围内移动，并禁用一切旋转，默认false            |
| quality     | 否   | number | 生成图片质量，取值范围0~1，默认1                             |
| index       | 否   | any    | 索引，回调upload方法，返回该index值，默认undefined           |
| fileType    | 否   | string | 报错图片格式，jpg或png，默认png。                            |
| minScale    | 否   | number | 缩放允许的最小比例，默认0.3                                  |
| maxScale    | 否   | number | 缩放允许的最大比例，默认4                                    |
| canRotate   | 否   | bool   | 是否允许旋转，默认true                                       |
| canScale    | 否   | bool   | 是否允许缩放，默认true                                       |
| stretch     | 否   | string | 图片一边自动铺满裁剪框<br/>x: x轴方向，图片自动铺满<br/>y: y轴方向，图片自动铺满<br/>long:  根据图片长边自动铺满<br/>short:  根据图片短边自动铺满<br/>longSel:  根据裁剪框长边自动铺满<br/>shortSel:  根据裁剪框短边自动铺满 |
| lock        | 否   | string | 锁定图片移动方向<br/>x:  锁定x轴方向<br/>y:  锁定y轴方向<br/>long: 锁定图片长边方向<br/>short:  锁定图片短边方向<br/>longSel:  锁定裁剪框长边方向<br/>shortSel:  锁定裁剪框短边方向 |

<br/>

| 回调   | 必须 | 参数说明                                                     |
| ------ | ---- | :----------------------------------------------------------- |
| upload | 是   | <p align="left">点击上传后回调<br/>{<br/>avatar：对象类型，可以通过更新imgSrc值，更新头像<br/>path：临时头像地址<br/>index：图片索引<br/>data：通过fChooseImg函数设置的额外数据，默认undefined<br/>base64：当前只有H5平台有base64格式图片<br/>}</p> |
| init   | 否   | 在图片裁剪之前回调，可用于自定义操作，例如禁用下拉刷新、隐藏自定义tabBar(例如colorUI tabbar) |
| end    | 否   | 关闭或上传后回调，可用于自定义操作，例如开启下拉刷新、显示自定义tabBar |
<br/>

| 方法                            | 参数说明                                                     |
| ------------------------------- | ------------------------------------------------------------ |
| fChooseImg(index, params, data) | <p align="left">触发图片选着<br/>index：索引，默认undefined<br/>params：对象类型，默认undefined，可设置属性有selWidth、selHeight、<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expWidth、expHeight、quality、canRotate、canScale、minScale、<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxScale、stretch、lock、inner<br/>data：回调时的额外数据，可以是任何类型，默认undefined </p> |

<br/>

## 您的支持是开源的动力，觉得不错就给个好评给颗星，谢谢! ^-

<br/>

| 版本  | 变化                                                         |
| ----- | :----------------------------------------------------------- |
| 3.4.2 | 参数优化处理                                                 |
| 3.4.1 | 功能完善，代码结构优化                                       |
| 3.3.4 | 支付宝平台必须填写noTab参数                                  |
| 3.3.3 | 修复导出大尺寸错误bug，修改expWidth、expHeight默认计算规则，性能优化 |
| 3.3.2 | 恢复遮罩、增加到处文件类型fileType参数、修复旋转后移动方向异常、修复裁剪框某些比例出现bug异常、增加loading提示文字、修复重选图片时图片重叠bug、百度小程序支持渲染、H5平台可以返回base64格式图片 |
| 3.3.1 | 优化缩放、移动操作，修复expWidth、expHeight错误设置导致图片不清晰bug |
| 3.3.0 | 增加对支付宝小程序支持                                       |
| 3.2.6 | 修复小程序预览，底图继续显示bug                              |
| 3.2.5 | 根据反馈，修复已知的bug；增加背景图片参数bgImg               |
| 3.2.4 | fChooseImg函数可修改inner属性                                |
| 3.2.3 | 禁用旋转后还可以通过按钮进行90°旋转，修改fChooseImg可设置属性 |
| 3.2.1 | 增加自定义前置操作avtinit，增加fChooseImg函数可设置的部分自定义属性 |
| 3.2.0 | 加深颜色凸显裁剪框、增加expWidth/expHeight设置导出大小       |
| 3.1.9 | 修复直接关闭不显示tabBar问题                                 |
| 3.1.8 | 修复提示bug                                                  |
| 3.1.7 | fChooseImg增加调用参数params/data，upload返回对象增加data字段<br/>删除minWidth/minHeight属性<br/>增加关闭按钮<br/>修复图片过小时采用inner无法移动问题 |
| 3.1.6 | 修复stretch属性                                              |
| 3.1.5 | 增加新属性 noTab                                             |
| 3.1.4 | 增加旋转按钮                                                 |
| 3.1.3 | 删除属性lockWidth/lockHeight<br/>新增控制属性 inner/stretch/lock<br/>新增自动触发子组件方法 fChooseImg(index) |
| 3.1.2 | 新增控制属性minWidth/minHeight/minScale/maxScale/canRotate/canScale/lockWidth/lockHeight |
| 3.1.1 | 调整回调返回数据内容，修复小程序报错问题                     |
| 3.1.0 | 增加index属性，修改回调返回的数据格式                        |
| 3.0.4 | H5平台适配HX1.9.9                                            |
| 3.0.3 | 增加导出图片质量调整参数                                     |
| 3.0.2 | 加强对H5和Android兼容                                        |
| 3.0.1 | 如果tabBar存在，自动隐藏                                     |
| 3.0.0 | 增加色彩变化，android平台需等待官方修复bug，没有启用；其他平台测试正常 |
| 2.0.1 | 修复小程序预览失败                                           |
| 2.0.0 | 适配HX197、198版本，旧版可以去github下载                     |
| 1.0.5 | 屏幕旋转后不需要重新选择图片                                 |
| 1.0.4 | 修复头像样式解析错误                                         |
| 1.0.3 | 修改样式绑定方式                                             |
| 1.0.2 | 修改按钮栏样式                                               |
| 1.0.1 | 修改按钮栏高度                                               |
| 1.0.0 | 增加H5支持                                                   |









