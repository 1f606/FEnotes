## 文件引用规范

先说加载的规范，这个规范主要是为了提高**页面加载速度**或者是**首屏的速度**。

1. **CSS 文件或样式在 head 标签中引用**。页面的渲染需要 CSS，所以尽量早的让 CSS 文件加载出来。
2. **JS 文件要放在 body 标签尾部**。页面里加载和运行 JS 都会阻塞页面的渲染过程，所以把 JS 放在尾部可以加快首屏显示的速度，但对整个页面完成加载的时间没什么影响。
3. **使用压缩后的文件**。线上使用的静态文件，尽量都是压缩好的，CSS 使用 .min.css 形式，JS 使用 .min.js 形式，这样可以减少文件的体积，从而减少下载的时间。
4. **减少 import 方式引用 css 文件**。import 方式引入的 CSS 文件要等原 CSS 文件加载并解析后才会去请求，会拖慢 CSS 文件的加载速度。

## 选择器的规范

- 选择器命名都用小写字母。
- 最右侧的选择器尽量精确。选择器中最后一位的选择器尽量使用类选择器这种比较精确的选择器，因为选择器的读取是由右至左，最右边的选择器会先去遍历，如果最后使用了标签选择器，那么查找样式的消耗就会增多。
- 选择器的嵌套不宜太长。选择器在读取的时候都是一层层的去查找的，所以使用太长的选择器也会增加查找的消耗。
- 在可以的情况下用子代选择器代替后代选择器。子代选择器只需要做一层的查找，而后代选择器需要一直查找到根节点，所以子代选择器的效率会更高一点。
- 使用样式继承。对于可以继承的样式，尽量在父节点加入样式，而不要给每一个子节点都加样式。

## 属性的书写规范

**颜色的缩写**。在使用十六进制颜色的时候，如果 rgb 三个颜色位置中，每两位的颜色值相同，可以把六位的颜色写成三位。如：

```
color: #22ffcc;
```

就可以写成：

```
color: #2fc;
```

**这两种写法是等效的，但要注意的是如果需要兼容低版本 IE 浏览器，还是要用六位的颜色值。**

**属性顺序的规范**

理论上，CSS 的属性是一条一条解析执行的。这种情况下，就要把能确定大小和位置的属性写在前面，把对布局没什么影响的属性写在后面，避免返工。一般说的使用顺序如下:

```
1. 位置属性 (position, top, right, z-index, display, float等)　　
2. 大小 (width, height, padding, margin)　　
3. 文字系列 (font, line-height, letter-spacing, color- text-align等)　　
4. 背景 (background, border等)
5. 其他 (animation, transition等)
```

**属性使用的规范**

1. 不大面积的使用 gif 图片。显示 gif 图片的消耗比较大，所以一个页面里不要大面积使用 gif 图片。
2. 尽量不要对图片进行缩放，这也是一个高消耗的操作。
3. 减少高消耗属性的使用 box-shadow/border-radius/filter/ 透明度 /:nth-child 等
4. 动画里使用 3D 属性代替一般属性，如使用 transform、scale 等代替原始的 width、height、margin 等，因为这些 CSS3 的属性可以调用 GPU 进行渲染，会减少资源的消耗并提高动画的流畅度。

## 注释规范

**一、文件头注释。**

在文件头部加上注释是为了记录文件的创建者、创建时间、最后更改者和更改时间。这样在一个项目组里，如果遇到开发上的问题，可以直接根据文件头的注释找到这个文件所属人和操作时间。一个 CSS 文件头的注释可以按如下格式:

```css
/*
 * @Author: Rosen 
 * @Date: 2019-04-18 20:09:21 
 * @Last Modified by: Rosen
 * @Last Modified time: 2019-05-05 10:21:21
 */
```

**二、普通注释。**

在业务里也需要注释，这种注释我们用标准的注释圈起来就行，最好是在注释的文本两边留下个空格，这样不会显得拥挤。如下：

```css
/* 头部导航 */
.nav-top{
    background: #ccc;
}
```

## CSS-Reset

最后要介绍一下 CSS-Reset。在浏览器里每个元素都有默认的样式，也就是你不给它任何样式也是可以显示的。但问题是，不同的浏览器中默认样式是不一致的，并且这些样式也可能和我们的业务代码有冲突。因此我们在开发的时候就要把这些默认样式的差异抹平，用到的方式就是 CSS-Reset。

```css
/* 去掉所有元素的内外边距 */
html, body, div, span,
h1, h2, h3, h4, h5, h6, p, pre,
a, img,  ul, li, form, label, input,
table, tbody, tfoot, thead, tr, th, td,
audio, video {
	margin: 0;
	padding: 0;
}
/* 统一全局字体 */
body {
	font-family: -apple-system-font,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei",Arial,sans-serif
}
/* 列表元素去掉默认的列表样式 */
ol, ul {
	list-style: none;
}
/* Table元素的边框折叠 */
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* 去掉默认的下划线 */
a{
	text-decoration: none;
}
/* 去掉input自带的边缘效果和背景颜色 */
input{
	outline: none;
	background: none;
}
```


