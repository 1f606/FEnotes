## class的继承

1. 子类的构造函数中必须调用super方法后才能使用this关键字

2. 子类没有定义构造函数，会默认添加上并调用super方法

3. 父类的静态方法会被子类继承

4. ```js
   class A {
     static hello() {
       console.log('hello world');
     }
   }
   
   class B extends A {
   }
   
   B.hello()  // hello world
   ```

5. ## Object.getPrototypeOf()
   
   `Object.getPrototypeOf`方法可以用来从子类上获取父类。
   
   ```javascript
   Object.getPrototypeOf(ColorPoint) === Point
   // true
   ```
   
   因此，可以使用这个方法判断，一个类是否继承了另一个类。
   
   

### super关键字

1. 既可以当作函数使用，也可以当作对象使用。

2. `super`作为函数调用时，代表父类的构造函数。

3. `super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

4. `super`在普通方法之中，指向`A.prototype`，所以`super.p()`就相当于`A.prototype.p()`。

5. 这里需要注意，由于`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。

6. ```js
   class A {
     constructor() {
       this.p = 2;
     }
   }
   
   class B extends A {
     get m() {
       return super.p;
     }
   }
   
   let b = new B();
   b.m // undefined
   ```

7. 在子类普通方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例。

8. ```javascript
   class A {
     constructor() {
       this.x = 1;
     }
     print() {
       console.log(this.x);
     }
   }
   
   class B extends A {
     constructor() {
       super();
       this.x = 2;
     }
     m() {
       super.print();
     }
   }
   
   let b = new B();
   b.m() // 2
   ```

9. 由于`this`指向子类实例，所以如果通过`super`对某个属性赋值，这时`super`就是`this`，赋值的属性会变成子类实例的属性。

10. ```javascript
    class A {
      constructor() {
        this.x = 1;
      }
    }
    
    class B extends A {
      constructor() {
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x); // undefined
        console.log(this.x); // 3
      }
    }
    
    let b = new B();
    ```

11. 上面代码中，`super.x`赋值为`3`，这时等同于对`this.x`赋值为`3`。而当读取`super.x`的时候，读的是`A.prototype.x`，所以返回`undefined`。
    
    如果`super`作为对象，用在静态方法之中，这时`super`将指向父类，而不是父类的原型对象。

12. ```javascript
    class Parent {
      static myMethod(msg) {
        console.log('static', msg);
      }
    
      myMethod(msg) {
        console.log('instance', msg);
      }
    }
    
    class Child extends Parent {
      static myMethod(msg) {
        super.myMethod(msg);
      }
    
      myMethod(msg) {
        super.myMethod(msg);
      }
    }
    
    Child.myMethod(1); // static 1
    
    var child = new Child();
    child.myMethod(2); // instance 2
    ```

13. 上面代码中，`super`在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
    
    另外，在子类的静态方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类，而不是子类的实例。

14. ```javascript
    class A {
      constructor() {
        this.x = 1;
      }
      static print() {
        console.log(this.x);
      }
    }
    
    class B extends A {
      constructor() {
        super();
        this.x = 2;
      }
      static m() {
        super.print();
      }
    }
    
    B.x = 3;
    B.m() // 3
    ```
    
    上面代码中，静态方法`B.m`里面，`super.print`指向父类的静态方法。这个方法里面的`this`指向的是`B`，而不是`B`的实例。
    
    注意，使用`super`的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。
    
    ```javascript
    class A {}
    
    class B extends A {
      constructor() {
        super();
        console.log(super); // 报错
      }
    }
    ```
    
    上面代码中，`console.log(super)`当中的`super`，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明`super`的数据类型，就不会报错。
    
    ```javascript
    class A {}
    
    class B extends A {
      constructor() {
        super();
        console.log(super.valueOf() instanceof B); // true
      }
    }
    
    let b = new B();
    ```
    
    上面代码中，`super.valueOf()`表明`super`是一个对象，因此就不会报错。同时，由于`super`使得`this`指向`B`的实例，所以`super.valueOf()`返回的是一个`B`的实例。
    
    最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用`super`关键字。
    
    ```javascript
    var obj = {
      toString() {
        return "MyObject: " + super.toString();
      }
    };
    
    obj.toString(); // MyObject: [object Object]
    ```





出处：

[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/class-extends)


