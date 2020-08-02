![](C:\Users\1f606\AppData\Roaming\marktext\images\2020-07-25-16-37-59-image.png)

**一个inline-block元素，如果里面没有inline内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘，否则，其基线就是元素里面最后一行内联元素的基线。**

- ![](https://mmbiz.qpic.cn/mmbiz_jpg/vzEib9IRhZD5qK8YP5VbS4FGgeEjZbfYhbgjAY0nfv5UyicOIK1PmnVuBUV3H84ObpXgUvsXiatSmEs1ibKlBtT75g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- `content area`：围绕文字看不见的 Box，其大小与 font-size 有关

- `inline boxes`：不会成块显示，而是并排显示在一行的 boxes ，如`span`、`a`、`em`等标签以及匿名 inline boxes（即不含把标签的裸露的文字）

- `line boxes`：由一个一个的 inline boxes 组成，一行即为一个 line box

- `containing box`：外层盒子模型,包含了其他的 boxes

- 起作用的前提：元素为 inline 水平元素或  table-cell  元素，包括  `span`、`img`、`input`、`button`、`td` 以及通过 display 改变了显示水平为 inline 水平或者 table-cell 的元素。这也意味着，默认情况下，`div`、`p` 等元素设置 vertical-align 无效

值得注意的是：例如`float`和`position: absolute`，一旦设置了这两个属性之一，元素的 display 值被忽略，强制当成 block 方式处理，因此，vertical-align 也就失去了作用。

```css
.dib-baseline {
  display: inline-block; width: 150px; height: 150px;
  border: 1px solid #cad5eb; background-color: #f0f3f9;
}
```

```html
<span class="dib-baseline"></span>
<span class="dib-baseline">x-baseline</span>
```

![](C:\Users\1f606\AppData\Roaming\marktext\images\2020-07-25-17-05-12-image.png)

第一个框框里面没有内联元素，因此，基线就是容器的margin下边缘，也就是下边框下面的位置；而第二个框框里面有字符，纯正的内联元素，因此，第二个框框就是这些字符的基线，也就是字母x的下边缘了。于是，我们就看到了框框1下边缘和框框2里面字符`x`底边对齐的好戏。

我们也设置框框2的`line-height`值为`0`，于是，就会是下面这样的表现：

![](C:\Users\1f606\AppData\Roaming\marktext\images\2020-07-25-17-10-18-image.png)

因为字符实际占据的高度是由行高决定的，当行高变成0的时候，字符占据的高度也是`0`，此时，高度的起始位置就变成了字符content area的垂直中心位置。
