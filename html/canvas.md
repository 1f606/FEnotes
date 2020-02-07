## canvas学习

```html
<canvas width="300px" height="300px">此内容只在不支持canvas的浏览器中显示</canvas>
canvas的宽高设置在标签上才生效
```

### 用法

#### 1、绘制矩形

note: `beginPath` 作用是开始一段新路径

1. 不管你用moveTo把画笔移动到哪里，只要不beginPath，那你一直都是在画一条路径。
2. fillRect与strokeRect这种直接画出独立区域的函数，也不会打断当前的path.

closePath的意思不是结束路径，而是关闭路径，它会试图从当前路径的终点连一条路径到起点，让整个路径闭合起来。但是，这并不意味着它之后的路径就是新路径了！

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

### 4、实现鼠标涂鸦功能

通过监听canvas元素的 `onmousedown` 和 `onmousemove` 实现，拿到e.clientX和 `canvas.offsetLeft`。

### 5、globalCompositeOperation

### 定义

> globalCompositeOperation 属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。  
> 源图像 = 您打算放置到画布上的绘图。  
> 目标图像 = 您已经放置在画布上的绘图。

### 用法

默认值： `source-over`  
语法： `context.globalCompositeOperation="source-in";`

表格中的蓝色矩形为目标图像，红色圆形为源图像。

source-over
默认。在目标图像上显示源图像。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd0fe3bc0ef?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

source-atop
在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd0ffcab1fb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

source-in
在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd0ffe09f40?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

source-out
在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd0fe727647?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

destination-over
在源图像上方显示目标图像。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd0feaf47ac?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

destination-atop
在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd0fe46f2cf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

destination-in
在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd122f4e34e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

destination-out
在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd132221546?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

lighter
显示源图像 + 目标图像。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd13ccf5ac1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

copy
显示源图像。忽略目标图像。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd14bfc7fd9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

xor
使用异或操作对源图像与目标图像进行组合。

![](https://user-gold-cdn.xitu.io/2018/8/30/1658abd14a8a8c15?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

作者：FEWY  
链接：https://juejin.im/post/5b87de766fb9a01a175dce1e  

#### 5.1、水滴扩散

**实现思路**

在一个 canvas 上先画出黑白色的图片，然后设置背景是一张彩色的图片，鼠标点击时，设置 canvas 的 `globalCompositeOperation` 属性值为 `destination-out`，根据鼠标在 canvas 中的 坐标，用一个不规则的图形逐渐增大，来擦除掉黑白色的图片，就可以慢慢显示彩色的背景了。

也就是说我们需要三张图片

**黑白的图片**

![这里写图片描述](https://user-gold-cdn.xitu.io/2018/8/30/1658abd14d14b88a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**彩色的图片**

![这里写图片描述](https://user-gold-cdn.xitu.io/2018/8/30/1658abd157ad9e8b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**不规则形状的图片**

![这里写图片描述](https://user-gold-cdn.xitu.io/2018/8/30/1658abd15d587ca5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**代码**

```html
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
        canvas {
            /* 设置鼠标的光标是一张图片， 16和22 分别表示热点的X坐标和Y坐标 */
            /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor/url */
            cursor: url('https://www.kkkk1000.com/images/mouse.png') 16 22, auto;
        }
    </style>
</head>

<body>
    <canvas id="canvas" width="400px" height="250px"></canvas>

    <script type="text/javascript"> 
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        // 保存图片路径的数组
        var urlArr = ["https://user-gold-cdn.xitu.io/2018/8/30/1658abd14d14b88a?w=640&h=360&f=png&s=221487", "https://user-gold-cdn.xitu.io/2018/8/30/1658abd15d587ca5?w=100&h=100&f=png&s=2721"];
        // imgArr 保存加载后的图片的数组，imgArr中保存的是真实的图片
        // loadImg 函数用来加载 urlArr 中所有的图片
        // 并返回一个保存所有图片的数组
        var imgArr = loadImg(urlArr);
        // flag 用来限制 点击事件，一张图片只会产生一次效果
        var flag = false;


        function loadImg(urlArr) {
            var index = 0;
            var res = [];
            // 每次给 load 函数传入一个图片路径，来加载图片
            load(urlArr[index]);
            function load(url) {
                // 如果 index 等于 urlArr.length，
                // 表示加载完 全部图片了，就结束 load函数
                if (index == urlArr.length) {
                    // 加载完全部图片，调用 init 函数
                    init();
                    return;
                }

                var img = new Image();
                img.src = url;
                // 不管当前图片是否加载成功，都要加载下一张图片
                img.onload = next;
                img.onerror = function () {
                    console.log(res[index] + "加载失败");
                    next();
                }
                // next 用来加载下一张图片
                function next() {
                    // 把加载后的图片，保存到 res 中
                    res[index] = img;
                    load(urlArr[++index])
                }
            }
            // 最后返回保存所有真实图片的数组
            return res;
        }

        function init() {
            // 先在canvas上画黑白的图片，然后再设置背景是彩色的图片
            // 避免先显示出彩色图片，再显示出黑白的图片
            context.globalCompositeOperation = "source-over";
            context.drawImage(imgArr[0], 0, 0, 400, 250);
            canvas.style.background = 'url(https://user-gold-cdn.xitu.io/2018/8/30/1658abd157ad9e8b?w=640&h=360&f=jpeg&s=44022)';
            canvas.style.backgroundSize = "100% 100%";

            // flag 是 true 时，鼠标点击才有水滴扩散的效果
            flag = true;
            // canvas 绑定点击事件，点击时产生水滴扩散效果
            canvas.onclick =  diffusion;
        }

        // width 表示 不规则形状的图片的尺寸
        var width = 0;
        // speed 表示扩散效果的速度
        var speed = 8;
        // diffusion 函数根据鼠标坐标，产生效果
        function  diffusion (e) {
            if (flag) {
                flag = false;
                context.globalCompositeOperation = "destination-out";
                window.requestAnimationFrame(draw);
                // 根据鼠标坐标，画扩散效果
                function draw() {
                    // 这里不一定需要是 1800 ，但必须是一个足够大的数，可以扩散出整张背景图
                    if (width > 1800) {
                        flag = true;
                        return;
                    }
                    width += speed;
                    // 获取鼠标相对于 canvas 的坐标
                    var x = e.layerX;
                    var y = e.layerY;

                    // 画不规则形状的图片，逐渐增大图片尺寸
                    context.drawImage(imgArr[1], x - (width / 2), y - (width / 2), width, width);
                    window.requestAnimationFrame(draw);
                }
            }
        }
    </script>
</body>

</html>
```

#### 5.2、刮刮卡

**第一种**  
使用 canvas 的 [getImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData) 方法，来获取 canvas 上的像素信息，这个方法返回的对象的 data 属性是一个一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示，详细的可以看看 canvas 的[像素操作](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)。  
用这个方法来判断有多少已经擦除掉了，也就是通过一个变量来记录有多少像素的RGBA的值是0，当变量的值超过某一个值时，就清除全部灰色。

```js
    var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        // canvas的宽度
        var width = 400;
        // canvas的高度
        var height = 250;

        init()
        function init() { 
            // 先在canvas上画一个灰色的矩形
            context.fillStyle = '#ddd';
            context.fillRect(0, 0, width, height); 
            // 设置canvas的背景为一张图片
            canvas.style.background = 'url("https://www.kkkk1000.com/images/bg3.jpg") no-repeat center';
            canvas.style.backgroundSize = "100% 100%";

            // 设置画的线的宽度            
            context.lineWidth = 35;
            // 设置线交汇时，是圆角的
            context.lineJoin = "round";
        }



        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('mouseup', mouseUp, false);

        /* 如果需要移动端也可以生效，
        需要绑定touchstart、touchmove、touchend 事件，并且获取触摸点的坐标
        */
        //canvas.addEventListener('touchstart', mouseDown, false);
        //canvas.addEventListener('touchmove', mouseMove, false);
        //canvas.addEventListener('touchend', mouseUp, false);


        // 判断是否可以画线
        var isDrawing; 
        // 保存开始画线时，线的起点的X坐标
        var startX=0;
        // 保存开始画线时，线的起点的Y坐标
        var startY=0; 

        // 按下鼠标按钮时，调用mouseDown
        function mouseDown(e){
             isDrawing = true;
             // 保存鼠标点击时 X坐标为，画线时，线的起点的X坐标
             startX = e.layerX;
             // 保存鼠标点击时 Y坐标为，画线时，线的起点的Y坐标
             startY = e.layerY;

             /* 移动端使用下面的方法 获取 startX 和 startY
             startX = e.touches[0].clientX;
             startY = e.touches[0].clientY;
             */
        }

        // 鼠标移动时，调用mouseDown
        function mouseMove(e){
            if(isDrawing){
            // 获取鼠标相对于 canvas 的坐标
            var x = e.layerX;
            var y = e.layerY;

            /* 移动端使用下面的方法 获取 x 和 y
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            */ 
            context.globalCompositeOperation = "destination-out"; 

            // 开始画线
            context.beginPath();
            // 起点坐标为 startX 和 startY
            context.moveTo(startX, startY);
            // 结束的坐标为这次移动时的坐标
            context.lineTo(x, y);
            context.closePath(); 
            context.stroke();

            // 设置这次移动结束时的坐标，为下次开始画线时的坐标
            startX = x;
            startY = y; 
            } 
        }

        // 松开鼠标按钮时，调用的事件
        function mouseUp(e){
            // isDrawing 为false时，不可以画线
            isDrawing = false;
            // 获取图片像素信息
            var data = context.getImageData(0, 0, width, height).data;
            console.log("图片像素信息",data); 
            var length = data.length;
            var k = 0;

            // 如果一个像素是透明的（值都是0），k就+1
            for (var i = 0; i < length - 3; i += 4) {
                if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0 && data[i + 3] == 0) {
                    k++;
                }
            }

            // 当k > width*height*0.2 时，
            // 也就是说有20%的面积是透明的时，就把整个canvas的背景显示出来
            if(k>width*height*0.2){
                 context.fillStyle = "blue";
                 context.fillRect(0, 0, width, height);
            }
        }
```

**第二种**

就直接看移动了多少，鼠标移动时，会有一个变量进行自增运算，当这个变量，超过一定值时，就擦除全部灰色。

```js
var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        // canvas的宽度
        var width = 400;
        // canvas的高度
        var height = 250;

        init()
        function init() { 
            // 先在canvas上画一个灰色的矩形
            context.fillStyle = '#ddd';
            context.fillRect(0, 0, width, height); 
            // 设置canvas的背景为一张图片
            // 因为 getImageData 方法需要跨域，所以这里用 base64来保存图片
            canvas.style.background = 'url("https://www.kkkk1000.com/images/bg3.jpg") no-repeat center';
            canvas.style.backgroundSize = "100% 100%";

            // 设置画的线的宽度            
            context.lineWidth = 35;
            // 设置线交汇时，是圆角的
            context.lineJoin = "round";
        }



        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mousemove', mouseMove, false);
        canvas.addEventListener('mouseup', mouseUp, false);

        /* 如果需要移动端也可以生效，
        需要绑定touchstart、touchmove、touchend 事件，并且获取触摸点的坐标
        */
        //canvas.addEventListener('touchstart', mouseDown, false);
        //canvas.addEventListener('touchmove', mouseMove, false);
        //canvas.addEventListener('touchend', mouseUp, false);


        // 判断是否可以画线
        var isDrawing; 
        // 保存开始画线时，线的起点的X坐标
        var startX=0;
        // 保存开始画线时，线的起点的Y坐标
        var startY=0; 
        // removeGrey 用来判断是否擦除全部灰色
        var removeGrey=0;
        // 按下鼠标按钮时，调用mouseDown
        function mouseDown(e){
             isDrawing = true;
             // 保存鼠标点击时 X坐标为，画线时，线的起点的X坐标
             startX = e.layerX;
             // 保存鼠标点击时 Y坐标为，画线时，线的起点的Y坐标
             startY = e.layerY;

             /* 移动端使用下面的方法 获取 startX 和 startY
             startX = e.touches[0].clientX;
             startY = e.touches[0].clientY;
             */
        }

        // 鼠标移动时，调用mouseDown
        function mouseMove(e){
            if(isDrawing){
            removeGrey++;
            // 获取鼠标相对于 canvas 的坐标
            var x = e.layerX;
            var y = e.layerY;

            /* 移动端使用下面的方法 获取 x 和 y
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            */ 
            context.globalCompositeOperation = "destination-out"; 

            // 开始画线
            context.beginPath();
            // 起点坐标为 startX 和 startY
            context.moveTo(startX, startY);
            // 结束的坐标为这次移动时的坐标
            context.lineTo(x, y);
            context.closePath(); 
            context.stroke();

            // 设置这次移动结束时的坐标，为下次开始画线时的坐标
            startX = x;
            startY = y; 
            } 
        }

        // 松开鼠标按钮时，调用的事件
        function mouseUp(e){
            // isDrawing 为false时，不可以画线
            isDrawing = false;
            console.log(removeGrey);

            // 当removeGrey > 100时，清除全部灰色
            if(removeGrey>100){
                 context.fillStyle = "blue";
                 context.fillRect(0, 0, width, height);
            }
        }
```

**注意：**  
第一种方式使用 [getImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData) 存在跨域问题，不过因为这个效果中，没有在canvas上画图片，而是设置canvas的 `background` 为一张图片，所以这个还没有影响，但是如果canvas上画了其他图片，就可能需要处理跨域的问题了。  
使用 [getImageData](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData) 能获取到 canvas 上的像素信息，就可以根据刮刮卡上灰色的面积，决定擦除全部灰色的时机，更加灵活。

第二种方式，虽然不存在跨域的问题，但是，不能很好的根据刮刮卡上灰色的面积，控制最后擦除全部灰色的时机。

作者：FEWY  
链接：https://juejin.im/post/5b87de766fb9a01a175dce1e  
