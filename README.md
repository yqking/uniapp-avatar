示例说明(可以直接去github下载项目运行)

H5测试

<img src='http://www.snyvic.eu/static/m.png'/>

```
<template>
    <avatar
	selWidth="200px" selHeight="400upx"
	:avatarSrc="url" @upload="myUpload"
	avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;" >
    </avatar>
</template>
<script>
    import avatar from "../../components/yq-avatar/yq-avatar.vue";
    export default {
    	data() {
	    return {
		url: "../../static/logo.png"
	    }
	},
        methods: {
            myUpload(path) {
                this.url = path;
            }
        }，
        components: {
            avatar
        }
    }
</script>
```



使用<br/>
点击头像，选择图片进行裁剪，支持缩放、旋转<br/>

属性<br/>
selWidth、selHeight 设置裁剪区域的宽高<br/>
avatarSrc 设置头像图片<br/>
avatarStyle 设置头像样式<br/>

方法<br/>
upload 设置回调函数，点击上传后，参数path回传裁剪的临时图片路径<br/>

TODO<br/>
暂不支持色彩变化<br/><br/>

| 版本  | 变化                                           |
| ----- | :--------------------------------------------- |
| 3.0.0 | 增加色彩变化，android平台需等待官方修复bug，其他平台测试正常 |
| 2.0.1 | 修复小程序预览失败                             |
| 2.0.0 | 适配HBuilder197、198版本，旧版可以去github下载 |
| 1.0.5 | 屏幕旋转后不需要重新选择图片                   |
| 1.0.4 | 修复头像样式解析错误                           |
| 1.0.3 | 修改样式绑定方式                               |
| 1.0.2 | 修改按钮栏样式                                 |
| 1.0.1 | 修改按钮栏高度                                 |
| 1.0.0 | 增加H5支持                                     |

<br/>

## 您的支持是开源的动力，觉得不错就给颗星，谢谢! ^-
