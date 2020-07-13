Symbol和String能够作为对象的key。



```js
//  生成一个唯一的Symbol
let id = Symbol('id')
let id1 = Symbol('id')
id === id1 //  false

//  Symbol不会被转换成字符串
alert(id)  //  类型错误
alert(id.toString())  //Symbol(id)

//  key是Symbol类型的话不会被for-in遍历到
//  Object.keys(user) 也会忽略它们
//  因此实现隐藏属性
let user = {}
user[id] = 1
//  字面量使用
let user1 = {
  [id]: 1
}

//  在对象中使用
let user = {
  [id]: 1
}

//  全局 Symbol 注册表
通常所有的 Symbol 都是不同的，即使它们有相同的名字。但有时我们想要名字相同的 Symbol 具有相同的实体。例如，应用程序的不同部分想要访问的 Symbol "id" 指的是完全相同的属性。
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert( id === idAgain ); // true

对于全局 Symbol，不仅有 Symbol.for(key) 按名字返回一个 Symbol，还有一个反向调用：Symbol.keyFor(sym)，它的作用完全反过来：通过全局 Symbol 返回一个名字。
// 通过 name 获取 Symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 通过 Symbol 获取 name
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id

Symbol.keyFor 内部使用全局 Symbol 注册表来查找 Symbol 的键。所以它不适用于非全局 Symbol。如果 Symbol 不是全局的，它将无法找到它并返回 undefined。

也就是说，任何 Symbol 都具有 description 属性。

例如：
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name，全局 Symbol
alert( Symbol.keyFor(localSymbol) ); // undefined，非全局

alert( localSymbol.description ); // name
```


