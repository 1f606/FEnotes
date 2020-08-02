vertical-align对块级元素无用。

块级元素中的图片下边缘还会有一段空白，实际上是因为内联元素的vertical-align默认是基线对齐（字母x的下边缘），空白处是留给y、g的尾部的。也就是基线到底线的距离。

所以解决这个问题可以使用以下几个方法：

1、vertical-align失效，设置图片为块级元素。

2、vertical-align使用top、bottom或middle。

3、设置line-height值为0。

如果要让图片垂直居中，父元素设置行高，图片设置vertical-align为middle即可，但因为middle是基线往上1/2的x-height，所以父元素还需要设置font-size为0才能实现真正的垂直居中。font-size为0，则基线等线都会在高度为中心线上。
