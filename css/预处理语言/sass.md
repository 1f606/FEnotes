### 一、基本用法

1、@include

```scss
.css {
  @include name();
}

//  in minxin.scss
name...
```



2、@extend

```scss
.error {
  color: #f00;
}
.serious-error {
  @extend .error;
  border: 1px solid #eee;
}
//  只用于继承的类, error类无样式
%error {
  color: #f00;
}
.serious-error {
 @extend %error;
 border: 1px solid #eee;
}

//  另一种情况
.error.bg {
  background-image: url("img.png")
}
.error {
 color: #f00;
}
.serious-error {
 @extend .error;
 border: 1px solid #eee;
}
//  .serious-error.bg 这种情况也会有背景图片 
```



3、

```scss
a {
  :hover {
    color: blue;
  }
}
//  等同于
a *:hover {
  color: blue;
}
```

### 一、常见问题

1、sass中使用css原生import规则


