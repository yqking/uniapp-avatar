示例说明(可以直接去github下载项目运行，联系方式924515629)

H5测试

<img src='http://www.snyvic.eu/static/m.png'/>

```
<template>
    <avatar
        selWidth="200px" selHeight="400upx" :avatarSrc="url" @upload="myUpload" 
        avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;">
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
            myUpload(rsp) {
                this.url = rsp.path; //更新头像方式一
                //rsp.avatar.imgSrc = rsp.path; //更新头像方式二
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

| 属性        | 必须 | 说明                                                         |
| ----------- | ---- | ------------------------------------------------------------ |
| selWidth    | 是   | 裁剪区域的宽                                                 |
| selHeight   | 是   | 裁剪区域的高                                                 |
| avatarSrc   | 否   | 头像地址, 虽然空不会报错，但不方便使用，建议填写             |
| avatarStyle | 否   | 头像样式，默认{width: 150upx; height: 150upx; border-radius: 100%;} |
| quality     | 否   | 取值范围0~1，默认0.9                                         |
| index       | 否   | 回调upload方法，返回该index值，默认undefined                 |
| minWidth    | 否   | 缩放允许的最小宽度，数值类型，不需要添加单位后缀，默认单位px |
| minHeight   | 否   | 缩放允许的最小高度，数值类型，不需要添加单位后缀，默认单位px |
| minScale    | 否   | 缩放允许的最小比例，默认0.3                                  |
| maxScale    | 否   | 缩放允许的最大比例，默认4                                    |
| canRotate   | 否   | 是否允许旋转，默认true                                       |
| canScale    | 否   | 是否允许缩放，默认true                                       |
| lockWidth   | 否   | 锁定宽度，图片宽度缩放至裁剪框的大小，只允许纵向移动，默认false |
| lockHeight  | 否   | 锁定高度，图片高度缩放至裁剪框的大小，只允许横向移动，默认false |

<br/>

| 事件   | 必须 | 说明                                                         |
| ------ | ---- | :----------------------------------------------------------- |
| upload | 是   | 返回格式 {avatar: xx, path: xx, index: xx}<br/>avatar: 对象类型，可以通过更新imgSrc值，更新头像<br/>path: 临时头像地址<br/>index: 组件索引值，需要设置了index属性，默认undefined |

<br/>

| 版本  | 变化                                                         |
| ----- | :----------------------------------------------------------- |
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

<br/>

## 您的支持是开源的动力，觉得不错就给个好评，谢谢! ^-
