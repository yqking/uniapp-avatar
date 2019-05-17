示例说明

```
    <template>
        <avatar selWidth="350upx" selHeight="350upx"
        avatarSrc="../../static/logo.png" @upload="myUpload"
        avatarStyle="width: 80upx; height: 80upx; border-radius: 50%"></avatar>
    </template>
    <script>
        import avatar from "../../components/avatar/avatar.vue";
        export default {
            methods: {
                myUpload(path) {
                    console.log(path);
                }
            }，
            components: {
                avatar
            }
        }
    </script>
```

使用<br/>
点击头像，选择图片进行裁剪，支持缩放、旋转

属性<br/>
selWidth、seHeight 设置裁剪区域的宽高。<br/>
avatarSrc 设置头像图片<br/>
avatarStyle 设置头像样式<br/>

方法<br/>
upload 设置回调函数，点击上传后，参数path回传裁剪的临时图片路径

TODO<br/>
不支持h5<br/>
不支持色彩变化<br/>
不支持修改裁剪框大小<br/>
