### 1. tabindex属性

1. tabindex属性是所有标签通用属性

2. tabindex属性为负值时，鼠标和JS可以focus元素，但键盘不能。默认为-1

3. tabindex为0，鼠标，js和键盘都可以focus元素

4. tabindex的索引顺序从1开始，相同则根据元素在文档中位置决定，越靠外层越靠前的元素索引顺序更前

5. tabindex有最大值限制，各浏览器的处理不同
   
   

使用场景：

**临时改变页面索引起始位置**  
当我们点击按钮并显示一个弹框的时候，Tab键的索引起始位置应该是从弹框元素开始的，但是如果我们不做任何处理，索引起始位置还是弹框背后的页面，此时想要通过Tab键一个一个索引到弹框元素，估计天都已经黑了，很显然，为了达到完美的键盘交互体验，我们就需要额外做点事情。

1. 给弹框容器元素设置`tabindex="-1"`；
2. 弹框显示的时候容器元素`DOM.focus()`使其获取焦点；
3. 容器元素CSS设置`outline:none`；



### 2. :focus增强键盘可访问性

使用场景：

1. hover显示隐藏元素，可以添加:focus增强键盘可访问性

```css
p .btn {

    opacity: 0;
}

p:hover .btn,

p .btn:focus {

    opacity: 1;
}
```

2. hover显示下拉列表

```css
.list {
    position: absolute;
    visibility: hidden;
}
.trigger:hover + .list,
.trigger:focus + .list {
    visibility: visible;
}
```

然后需要监听`keydown`事件，监听上下键，需要阻止默认的滚动事件。

接着需要给tab键索引到的相应的元素添加`outline`css属性来优化体验
