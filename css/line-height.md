### line-height

line-height指的是两行文字基线之间的距离

![](C:\Users\1f606\AppData\Roaming\marktext\images\2020-07-25-14-33-36-image.png)

CSS中起高度作用的是height和line-height，空div插入文字，撑起高度的是line-height而不是font-size。line-box会取inline-box元素中line-height值最高的为line-height。

单行居中，父元素设置行高即可，不过如果设置了高度，行高就必须和高度一致。

多行居中和单行居中一个道理，父元素设置行高，子元素设置为行内快，单独设置和父元素不同的行高。

第二种方案单行多行居中都适合：

父元素设置高度，子元素设置行内块，vertical-align：middle。同时给父元素的伪元素设置行内块和垂直居中，宽度0高度百分百。
