## 前言

前两天在项目里遇到一个bug，这个页面的交互是通过点击左边的el-tree调用对应树节点的数据，然后渲染到右边的table中，但table组件有时候会出现渲染以后纵向滚动条不显示的问题。

## 解决思路

首先就观察了table上的样式有什么不同，因为这个很明显应该从css方面考虑。发现如果出现纵向滚动条，是在table组件最外层元素上会有el-table--scrollable-y这个类，这个类会给el-table__body-wrapper加上overflow-y: auto;的样式。没有滚动条的时候就是因为没有这个类。

知道了原因以后就去看了组件的源码，发现是和scrollY有关。就看了看里面有没有更新scrollY的方法，发现了一个updateScrollY的方法。然后就在table数据改变以后setTimeout调用这个方法解决了这个问题。


