**父页面调用子页面方法：FrameName.window.childMethod();**

**子页面调用父页面方法：parent.window.parentMethod();**



要确保在iframe加载完成后再进行操作，如果iframe还未加载完成就开始调用里面的方法或变量，会产生错误。判断iframe是否加载完成有两种方法：

**1. iframe上用onload事件**

**2. 用document.readyState=="complete"来判断**



第一个方法：监听iframe的onload事件



如果是在vue开发的单页，在Vue代码开始执行之前就已经触发了onload()。此时iframe中包含的是一个空的document。虽然在子项目完成挂载之后，依旧会再次触发onload事件，但最佳时机已经错过。



第二个方法：利用postMessage实现跨域通信，**由子页面通知父页面可以传递消息了，替代onload事件**。父页面监听数据，然后在回调中操作。

最好先阅读[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)。postMessage是一个异步方法。



参考:

[https://juejin.im/post/5c37fcf251882525a94e1269](https://juejin.im/post/5c37fcf251882525a94e1269)

[https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)




