前置知识点：Promise.resolve(x)可以看做是new Promise(resolve => resolve(x))的简写，可以快速封装字面量对象或者其他对象成Promise实例。

1、await返回一个Promise对象，如果直接return一个变量，async会将这个变量通过 Promise.resolve()封装成Promise对象。

2、await等待的是一个表达式。这个表达式的计算结果是Promise对象或者其他值，即没有限定。

3、await等待的是Promise对象的话，它会阻塞后面的代码，等待Promise对象的resolve，然后拿到resolve的值，作为await表达式的运算结果；await等待的不是一个Promise对象的话，那么await表达式的运算结果就是它等到的东西。

4、await的代码是直接执行，而await后面的代码是microtask。



例子：

```js
console.log(1);
async function fn () {
    console.log(2);
    await cosnole.log(3);
    console.log(4);
}
fn();
console.log(5);
//  1,2,3,5,4
```



资料：

https://segmentfault.com/a/1190000007535316

https://segmentfault.com/a/1190000018724020
