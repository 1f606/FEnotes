### 1、translate方法

```js
// 调用translate后，坐标系被改变了。例如：  
// 在位置 (10,10) 处绘制一个矩形，将新的 (0,0) 位置设置为 (70,70)。  
// 再次绘制新的矩形（请注意现在矩形从位置 (80,80) 开始绘制）：  
// var c=document.getElementById("myCanvas");  
// var ctx=c.getContext("2d");  
// ctx.fillRect(10,10,100,50);  
// ctx.translate(70,70);  
// ctx.fillRect(10,10,100,50);
```

### 2、save方法

context.save()将当前状态压入堆栈。context.restore()弹出堆栈上的顶级状态，将上下文恢复到该状态。

例如：

一个canvas只有一个2d上下文，`save()和restore()`的使用场景也很广泛,例如 "变换"状态的用途。  
当你执行“变换”操作时，整个上下文的坐标系都将会改变。“变换”之后，我们需要将坐标系恢复到原有正常的状态，这时候就需要使用`save()和restore()`了。如下图：

![](D:\GoogleDrive\images\2020-02-07-17-00-26-image.png)


参考：

https://juejin.im/post/5d1c577f6fb9a07ecd3d78ae  

[https://www.w3school.com.cn/tags/canvas_translate.asp](https://www.w3school.com.cn/tags/canvas_translate.asp)
