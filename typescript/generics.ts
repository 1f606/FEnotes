function echo<T> (arg: T): T {
  return arg
}

const r = echo('str')
//  报错
//  const a: string = echo(1)

function swap<T,U>(arr: [T, U]): [U,T] {
  return [arr[1], arr[0]]
}

const result = swap([1,'2'])

function echoWithArr<T> (arg: T[]): T[] {
  //  因为arg不一定有length属性
  //  需要给arg和返回值注明是返回泛型数组
  console.log(arg.length)
  return arg
}

//  返回的是number数组，但也只能返回number数组，无法传入字符串等拥有length的变量
//  需要约束泛型
// const arr = echoWithArr([1,2,3])

//  约束泛型
interface argWithLength {
  length: number
}

function echoWithLength<T extends argWithLength> (arg: T): T {
  console.log(arg.length)
  return arg
}

// const str = echoWithLength('str')
// const arr1 = echoWithLength([1,2,'1'])
// const obj = echoWithLength({length: 1})

//  上面的都是在函数中使用的例子
//  下面是类和接口的例子
class Queue {
  private data = []
  push (item) {
    return this.data.push(item)
  }
  pop () {
    return this.data.shift()
  }
}

const queue = new Queue()
queue.push(1)
queue.push('str')
//  toFixed方法只有number类型才可以使用
//  但在这里没有限制传入的类型会导致在检查时没有错误，运行时出错
// console.log(queue.pop().toFixed())
// console.log(queue.pop().toFixed())

//  解决方法一: 限制push传入的为number，pop返回值也为number
//  解决方法二：泛型类
class Queue1<T> {
  private data = []
  push (item: T) {
    return this.data.push(item)
  }
  pop (): T {
    return this.data.shift()
  }
}
//  实例化时限制类类型
const queue1 = new Queue1<number>()
queue1.push(1)
//  报错
// queue1.push('str')
console.log(queue.pop().toFixed())

const queue2 = new Queue1<string>()
queue2.push('str')
//  queue2.push(1)

//  接口
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kp1: KeyPair<number, string> = {key: 1, value: 'str'}
let kp2: KeyPair<string, number> = {key: '1', value: 1}