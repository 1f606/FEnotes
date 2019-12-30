# @font face详解

```css
@font-face {
  /* 不能与已有字体冲突 */
  font-family: 'custom name';
  /* IE9才支持local本地字体 */
  /* src可以是相对路径或绝对路径,网络地址 */
  src: local("Microsoft Yahei");
}
/* 常见兼容性写法 */
@font-face {
  font-family: 'defineName';
  src: url('../fonts/singlemalta-webfont.eot');
  src: url('../fonts/singlemalta-webfont.eot?#iefix') format('embedded-opentype'),
       url('../fonts/singlemalta-webfont.woff') format('woff'),
       url('../fonts/singlemalta-webfont.ttf') format('truetype'),
       url('../fonts/singlemalta-webfont.svg#defineName') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

这时候，对普通HTML元素，你设置其 `font-family` 属性值为`'custom name'`，则其字体表现就变成了“微软雅黑”（如果本地有这个字体）。



|         | .eot | .ttf | .otf | .woff | .svg |
| ------- | ---- | ---- | ---- | ----- | ---- |
| IE6-8   | √    |      |      |       |      |
| firefox |      | √    | √    | √     | √    |
| opera   |      | √    | √    | √     | √    |
| chrome  |      | √    | √    | √     | √    |
| safari  |      | √    | √    | √     | √    |
