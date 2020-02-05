## canvas学习

```html
<canvas>此内容只在不支持canvas的浏览器中显示</canvas>
```

### 用法

#### 1、绘制矩形

```js
const cavs = document.getElementByTagName('canvas')[0]
if (cavs.getContext) {
  //  把ctx理解为画笔
  const ctx = cavs.getContext('2d')
  //  添加颜色要在矩形画出来之前添加
  ctx.strokeStyle = 'rgb(200, 0, 0)'
  //  以画布的左上角为原点，在10，10的位置画一个300高300宽的非填充矩形
  ctx.strokeRect(10, 10, 300, 300)
  ctx.fillStyle = 'rgb(200, 0, 0)'
  //  画实心矩形
  ctx.fillRect(10, 10, 300, 300)
}
//  清空指定矩形区域
ctx.clearRect(x,y,width,height)
```

#### 2、通过路径绘制

```js
// 通过路径绘制
ctx.beginPath()
// 起始点
ctx.moveTo(75,50)
ctx.lineTo(100,75)
ctx.lineTo(75,10)
// 闭合图形方法一
ctx.lineTo(75,50)
// 方法二
ctx.closePath()
// 绘制图形（非填充）
ctx.strokeStyle = 'black'
ctx.stroke()
// 填充
ctx.fillStyle = 'red'
ctx.fill()
```

#### 3、画圆

```js
CanvasRenderingContext2D.arc(x, y, radius, startAngle, endAngle, anticlockwise)
//  endAngle = Math.PI 即半圆
```


