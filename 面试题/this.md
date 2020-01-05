# this

### 绑定规则：

1. 默认绑定
2. 隐式绑定
3. 硬绑定
4. new绑定



### 默认绑定

默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。

```js
function sayHi(){    
console.log('Hello,', this.name);
}
var name = 'YvetteLau';
sayHi();
```

在调用Hi()时，应用了默认绑定，this指向全局对象（非严格模式下），严格模式下，this指向undefined，undefined上没有this对象，会抛出错误。

上面的代码，如果在浏览器环境中运行，那么结果就是 Hello,YvetteLau



### 隐式绑定

函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的形式为 XXX.fun().我们来看一段代码：

```js
function sayHi(){    
console.log('Hello,', this.name);
}
var person = {    
name: 'YvetteLau',    
sayHi: sayHi
}
var name = 'Wiliam';
person.sayHi();
```

打印的结果是 Hello,YvetteLau.



**对象属性链中只有最后一层会影响到调用位置。**

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person2 = {
    name: 'Christina',
    sayHi: sayHi
}
var person1 = {
    name: 'YvetteLau',
    friend: person2
}
person1.friend.sayHi();
```

结果是：Hello, Christina.

隐式绑定有一个大陷阱，绑定很容易丢失(或者说容易给我们造成误导，我们以为this指向的是什么，但是实际上并非如此).

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = person.sayHi;
Hi();
```

结果是: Hello,Wiliam.

这是为什么呢，因为Hi直接指向了sayHi的引用，在调用的时候，跟person没有半毛钱的关系，针对此类问题，我建议大家只需牢牢继续这个格式:XXX.fn();fn()前如果什么都没有，那么肯定不是隐式绑定，但是也不一定就是默认绑定，这里有点小疑问，我们后来会说到。

除了上面这种丢失之外，隐式绑定的丢失是发生在回调函数中(事件回调也是其中一种)，我们来看下面一个例子:

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person1 = {
    name: 'YvetteLau',
    sayHi: function(){
        setTimeout(function(){
            console.log('Hello,',this.name);
        })
    }
}
var person2 = {
    name: 'Christina',
    sayHi: sayHi
}
var name='Wiliam';
person1.sayHi();
setTimeout(person2.sayHi,100);
setTimeout(function(){
    person2.sayHi();
},200);
```

```
Hello, Wiliam
Hello, Wiliam
Hello, Christina
```

- 第一条输出很容易理解，setTimeout的回调函数中，this使用的是默认绑定，非严格模式下，执行的是全局对象

- 第二条输出是不是有点迷惑了？说好XXX.fun()的时候，fun中的this指向的是XXX呢，为什么这次却不是这样了！Why?
  
  其实这里我们可以这样理解: setTimeout(fn,delay){ fn(); },相当于是将person2.sayHi赋值给了一个变量，最后执行了变量，这个时候，sayHi中的this显然和person2就没有关系了。

- 第三条虽然也是在setTimeout的回调中，但是我们可以看出，这是执行的是person2.sayHi()使用的是隐式绑定，因此这是this指向的是person2，跟当前的作用域没有任何关系。

### 显式绑定

显式绑定比较好理解，就是通过call,apply,bind的方式，显式的指定this所指向的对象。(注意:《你不知道的Javascript》中将bind单独作为了硬绑定讲解了)

call,apply和bind的第一个参数，就是对应函数的this所指向的对象。call和apply的作用一样，只是传参方式不同。call和apply都会执行对应的函数，而bind方法不会。

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = person.sayHi;
Hi.call(person); //Hi.apply(person)
```

输出的结果为: Hello, YvetteLau. 因为使用硬绑定明确将this绑定在了person上。

那么，使用了硬绑定，是不是意味着不会出现隐式绑定所遇到的绑定丢失呢？显然不是这样的，不信，继续往下看。

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = function(fn) {
    fn();
}
Hi.call(person, person.sayHi); 
```

输出的结果是 Hello, Wiliam. 原因很简单，Hi.call(person, person.sayHi)的确是将this绑定到Hi中的this了。但是在执行fn的时候，相当于直接调用了sayHi方法(记住: person.sayHi已经被赋值给fn了，隐式绑定也丢了)，没有指定this的值，对应的是默认绑定。

现在，我们希望绑定不会丢失，要怎么做？很简单，调用fn的时候，也给它硬绑定。

```js
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
var Hi = function(fn) {
    fn.call(this);
}
Hi.call(person, person.sayHi);
```

此时，输出的结果为: Hello, YvetteLau，因为person被绑定到Hi函数中的this上，fn又将这个对象绑定给了sayHi的函数。这时，sayHi中的this指向的就是person对象。

### new 绑定

在javaScript中，构造函数只是使用new操作符时被调用的函数，任何一个函数都可以使用new来调用，因此其实并不存在构造函数，而只有对于函数的“构造调用”。

> 使用new来调用函数，会自动执行下面的操作：

1. 创建一个新对象
2. 将构造函数的作用域赋值给新对象，即this指向这个新对象
3. 执行构造函数中的代码
4. 返回新对象

因此，我们使用new来调用函数的时候，就会新对象绑定到这个函数的this上。

```js
function sayHi(name){
    this.name = name;
	
}
var Hi = new sayHi('Yevtte');
console.log('Hello,', Hi.name);
```

输出结果为 Hello, Yevtte, 原因是因为在var Hi = new sayHi('Yevtte');这一步，会将sayHi中的this绑定到Hi对象上。

有种特殊情况，当this遇到return，如果返回值是一个对象，那么this指向的就是那个返回的对象，如下： 

```js
function fn() { 
this.name = 'james'; 
return {}; 
} 
let a = new fn; 
console.log(a.name); // undefined
```

### 绑定优先级

我们知道了this有四种绑定规则，但是如果同时应用了多种规则，怎么办？

显然，我们需要了解哪一种绑定方式的优先级更高，这四种绑定的优先级为:

new绑定 > 显式绑定 > 隐式绑定 > 默认绑定

### 绑定例外

凡事都有例外，this的规则也是这样。

如果我们将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略，实际应用的是默认绑定规则。

```js
var foo = {
    name: 'Selina'
}
var name = 'Chirs';
function bar() {
    console.log(this.name);
}
bar.call(null); //Chirs 
```

输出的结果是 Chirs，因为这时实际应用的是默认绑定规则。

### 箭头函数

箭头函数是ES6中新增的，它和普通函数有一些区别，箭头函数没有自己的this，它的this继承于外层代码库中的this。箭头函数在使用时，需要注意以下几点:

（1）函数体内的this对象，继承的是外层代码块的this。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

（5）箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向.

```js
var obj = {
    hi: function(){
        console.log(this);
        return ()=>{
            console.log(this);
        }
    },
    sayHi: function(){
        console.log(this)

        return function() {
            console.log(this);
            return ()=>{
                console.log(this);
            }
        }
    },
    say: ()=>{
        console.log(this);
    }
}
let hi = obj.hi();  //输出obj对象
hi();               //输出obj对象
let sayHi = obj.sayHi(); //输出obj对象

let fun1 = sayHi(); //输出window
fun1();             //输出window
obj.say();          //输出window
```

那么这是为什么呢？如果大家说箭头函数中的this是定义时所在的对象，这样的结果显示不是大家预期的，按照这个定义，say中的this应该是obj才对。

我们来分析一下上面的执行结果：

1. obj.hi(); 对应了this的隐式绑定规则，this绑定在obj上，所以输出obj，很好理解。
2. hi(); 这一步执行的就是箭头函数，箭头函数继承上一个代码库的this，刚刚我们得出上一层的this是obj，显然这里的this就是obj.
3. 执行sayHi();这一步也很好理解，我们前面说过这种隐式绑定丢失的情况，这个时候this执行的是默认绑定，this指向的是全局对象window.
4. fun1(); 这一步执行的是箭头函数，如果按照之前的理解，this指向的是箭头函数定义时所在的对象，那么这儿显然是说不通。OK，按照箭头函数的this是继承于外层代码库的this就很好理解了。外层代码库我们刚刚分析了，this指向的是window，因此这儿的输出结果是window.
5. obj.say(); 执行的是箭头函数，当前的代码块obj中是不存在this的，只能往上找，就找到了全局的this，指向的是window.



来源：

[https://github.com/YvetteLau/Blog/issues/6](https://github.com/YvetteLau/Blog/issues/6)


