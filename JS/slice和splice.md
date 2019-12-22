# slice和splice

```javascript
//  start可为0，即深拷贝
//  end可省略即从start开始截取到最后，不省略的话从start开始截取到end但不包括
//  slice不会对原数组造成影响
//  返回值截取的元素集合
slice(start, end)

//  start开始的位置
//  number为0则不删除
//  item可选，向数组添加的新元素
//  如果删除了元素，则返回值是包含被删除的元素的数组
//  会改变原数组
splice(start, number, item1, item2, ...)
```




