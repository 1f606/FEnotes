# Generator函数

## 1、基本概念及用法

Generator 函数除了是状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

```
//  function后带星号, 内部使用yield定义内部状态
function* helloWorldGenerator() {
  yield 'hello';  //  yield在generator内才可以使用。
  yield 'world';
  return 'ending';
}

//  返回的是遍历器对象
var hw = helloWorldGenerator();
```

调用遍历器对象遍历generator内部状态

```
done表示遍历结束， value表示内部状态值，yield或return后的值。
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

//  再调用也会是上面的结果
```

```
这个例子先放着注意一下。

function* demo() {
  console.log('Hello' + (yield)); // yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
  console.log('Hello' + (yield 123)); 
}

let iterator = demo();

iterator.next();
//  {value: undefined, done: false}

iterator.next();
//  打印Helloundefined
// {value: 123, done: false}

iterator.next();
//  打印Helloundefined
//  {value: undefined, done: true}
```

## 2、next方法运行逻辑

（1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。

（3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

## 3、与 Iterator 接口的关系

任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。

```
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```

上面代码中，Generator 函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了。

Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。

```
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g  // true
```
