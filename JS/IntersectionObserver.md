### IntersectionObserver

异步查询元素相对于指定的根元素或视口的位置，一般在元素开始出现在视口和元素在视口内完全消失时触发。

#### 一、基本API

```js
const intersection = new IntersectionObserver(callback, option);
intersection.observe(document.querySelector('.class'))//    接受Element
intersection.unobserve(Element)//停止观察某个元素
intersection.disconnect()//停止观察
```

#### 二、callBack

callback能接收到一个IntersectionObserver Entry对象数组参数

#### 三、IntersectionObserver Entry对象

```js
有下面几个属性：
time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
target：被观察的目标元素，是一个 DOM 节点对象
rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
boundingClientRect：目标元素的矩形区域的信息
intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0
isIntersecting：目标元素和指定根元素相交时为真，反之为假
```

#### 四、option对象

```js
它可以配置下面几个属性：
1、threshold

threshold属性决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数。


threshold: [0, 0.25, 0.5, 0.75, 1]表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。

2、root属性
很多时候，目标元素不仅会随着窗口滚动，还会在容器里面滚动（比如在iframe窗口里滚动）。容器内滚动也会影响目标元素的可见性

IntersectionObserver API 支持容器内滚动。root属性指定目标元素所在的容器节点（即根元素）。注意，容器元素必须是目标元素的祖先节点。

var opts = {
root: document.querySelector('.container'),
rootMargin: "500px 0px"
};
var observer = new IntersectionObserver( callback, opts );

上面代码中，除了root属性，还有rootMargin属性。后者定义根元素的margin，用来扩展或缩小rootBounds这个矩形的大小，从而影响intersectionRect交叉区域的大小。它使用CSS的定义方法，比如10px 20px 30px 40px，表示 top、right、bottom 和 left 四个方向的值。
这样设置以后，不管是窗口滚动或者容器内滚动，只要目标元素可见性变化，都会触发观察器。

```

#### 五、注意点

IntersectionObserver API 是异步的，**不随着目标元素的滚动同步触发**。

规格写明，IntersectionObserver的实现，应该采用requestIdleCallback()，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。

整理自：

[https://kknews.cc/code/gpo8a68.html](https://kknews.cc/code/gpo8a68.html)

[https://juejin.im/post/6844903927419256846](https://juejin.im/post/6844903927419256846)


