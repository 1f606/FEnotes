# typescript from scratch

### 全局安装

`npm  install -g typescript`

安装了以后可以使用

`tsc hello.ts`

### 原始数据类型定义

这样定义后这些变量如果被赋值为其他类型就会报错，但`any`不受限制，而且在any上调用任何方法，访问任何属性都不受限制

```typescript
let isDone: boolean = false
let num: number = 123
let u: undefined = undefined;
let n: null = null;

//  any
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;
```

### void空值

`void` 表示没有任何返回值的函数：

```typescript
function alertName(): void {
    alert('My name is Tom');
}
```

### undefined, null and void

`undefined` 和 `null` 是所有类型的子类型。

> 也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

```typescript
// 这样不会报错
let num: number = undefined;

// 这样也不会报错
let u: undefined;
let num: number = u;
```

> 而 `void` 类型的变量不能赋值给 `number` 类型的变量：

```typescript
let u: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.
```

### 未声明类型变量

**变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型**

## 类型推论

### 什么是类型推论？

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```typescript
//  以下代码虽然没有指定类型，但是会在编译的时候报错：
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

## 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

联合类型使用 `|` 分隔每个类型。

### Demo

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```typescript
//  length只是string的属性，number没有，所以会报错
function getLength(something: string | number): number {
    return something.length;
}

//  toString方法都有，不报错
function getString(something: string | number): string {
    return something.toString();
}
```

> 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
```

## 对象的接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于[对类的一部分行为进行抽象](/advanced/class-and-interfaces#类实现接口)以外，也常用于对「对象的形状（Shape）」进行描述。

> 要与接口定义的类型和数量保持一致

```typescript
//  接口一般首字母大写
interface Person {
    name: string;
    age: number;
}

//  要与接口定义的类型和数量一致
let tom: Person = {
    name: 'Tom',
    age: 25
};
```

上面的例子中，我们定义了一个接口 `Person`，接着定义了一个变量 `tom`，它的类型是 `Person`。这样，我们就约束了 `tom` 的形状必须和接口 `Person` 一致。

> 也可以定义可选属性

```typescript
interface Person {
 name: string;
 age: number;
 time?: string; // 也可以定义可选属性
}

let tom: Person = {
 name: 'Tom',
 age: 25
};
```

> 允许任意属性

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 1
};
```

需要注意的是：**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

//  报错
let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527; //  报错
```

### Demo

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
```

上例中，报错信息有两处，第一处是在对 `tom` 进行赋值的时候，没有给 `id` 赋值。

第二处是在给 `tom.id` 赋值的时候，由于它是只读属性，所以报错了。

## 数组的类型

### 「类型 + 方括号」表示法

```typescript
//  数组的项中不允许出现其他的类型：
let fibonacci: number[] = [1, 1, 2, 3, 5];
let arr: any[] = [1,2,3,1]

//  数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
fibonacci.push('8');

// Argument of type '"8"' is not assignable to parameter of type 'number'.
```

## 元组

元组和联合类型相似，当不确定类型时，只能访问或调用数组内元素共有的属性或方法

```typescript
//  定义了一个长度为2，第一位是string类型，第二位是number类型
let x: [string, number]
x = ['h', 1]
```

## 枚举类型

```typescript
enum Color {
  Red,
  Blue,
  Greed
}

let c: Color = Color.Red
```

也能通过值反查键名

```typescript
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}

let r: string = Color[2]
```

## 类型断言

TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。

类型断言的一个常见用例是当你从 JavaScript 迁移到 TypeScript 时：

```
const foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
```

这里的代码发出了错误警告，因为 `foo` 的类型推断为 `{}`，即是具有零属性的对象。因此，你不能在它的属性上添加 `bar` 或 `bas`，你可以通过类型断言来避免此问题：

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```


