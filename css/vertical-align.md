基线：字母x底部位置

行高：两行文字基线的距离



- `content area`：围绕文字看不见的 Box，其大小与 font-size 有关

- `inline boxes`：不会成块显示，而是并排显示在一行的 boxes ，如`span`、`a`、`em`等标签以及匿名 inline boxes（即不含把标签的裸露的文字）

- `line boxes`：由一个一个的 inline boxes 组成，一行即为一个 line box

- `containing box`：外层盒子模型,包含了其他的 boxes

- 起作用的前提：元素为 inline 水平元素，行内块元素或  table-cell  元素，包括  `span`、`img`、`input`、`button`、`td` 以及通过 display 改变了显示水平为 inline 水平或者 table-cell 的元素。这也意味着，默认情况下，`div`、`p` 等元素设置 vertical-align 无效

值得注意的是：例如`float`和`position: absolute`，一旦设置了这两个属性之一，元素的 display 值被忽略，强制当成 block 方式处理，因此，vertical-align 也就失去了作用。



## vertical-align 属性值

- 在实际应用中我们经常会遇到下图这种情况，你可能会容易的解决这种无法对齐的问题，但是你知道是什么原因导致他们这个样子吗？

- baseline 为 vertical-align 的默认值，其意思是指基线对齐

![](https://mmbiz.qpic.cn/mmbiz_jpg/vzEib9IRhZD5qK8YP5VbS4FGgeEjZbfYhBP9MmqcNEAsAtgMaV9HibGxc3oMWiaoL3wWXsZFicpr6Jljmb7ibGwSlfw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

```
<ul class="box">
  <li>文本</li>  
  <li></li>
</ul>
<style>
  .li {
    font-size: 20px;
    width: 160px;
    height: 160px;
    display: inline-block;
    border: 1px solid #ccc;
  }
</style>
```

![](https://mmbiz.qpic.cn/mmbiz_jpg/vzEib9IRhZD5qK8YP5VbS4FGgeEjZbfYh23Q2OaKmsleYMNBr0AOHkCgz8n5OiabvdmPgnK7lCKAT1XfSIicUKNKQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这里就涉及到了 inline-block 基线的定义，inline-block  的基线是正常流中最后一个（行盒子） line box 的基线，但是，如果这个 line box 里面没有 inline boxes 或者其 overflow 属性值不是 visible，那么其基线就是 margin bottom 的边缘。

如上图所示，第一个元素基线是子元素”文本“的基线，而第二个是盒子的底边缘，默认基线对齐，两个元素基线位置不一致，所有会产生上图现象，知道了原因，我们只需设置元素的 vertical-align 属性为  top/bottom/middle  就可以轻松对齐了。


