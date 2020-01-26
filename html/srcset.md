例子：

```html
<img src="128px.jpg" srcset="128px.jpg 128w, 256px.jpg 256w, 512px.jpg 512w" sizes="(max-width: 360px) calc(100vw - 20px), 128px">
```

表示在宽度规格在128时，显示'128px.jpg'这张图片。sizes表示宽度在360px及以下时图片宽度为设备宽-20px，否则为128px。



宽度规格需要考虑设备的dpr

例如在iPhone6，此时屏幕宽度`375px`，依然大于`360px`，但是屏幕密度为`2`，因此，图片尺寸`128px`乘以密度`2`正好是`256w`这个规格，于是加载256px.jpg。


