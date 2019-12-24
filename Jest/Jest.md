# Jest

## 安装

1. `npm init`

2. `npm install jest -D`

3. `npx jest --init`配置jest

4. `npx jest --coverage`生成测试覆盖率报告

## 配置

```javascript
//  package.json
"script": {
  "test": "jest" //  自动根据目录下的test.js后缀的文件进行测试，加上--watchAll运行后不会结束，测试文件有改动就会立刻进行测试，去掉All则进入的是o模式，All则是a模式，f模式只会对上次没有通过测试的测试用例进行测试
  "coverage": "jest --coverage"` //  生成测试覆盖率报告
}
```

jest只能识别commonJS的语法，如果要用ES6的语法，需要安装babel，在测试前jest会使用babel转换语法

1. `npm install @babel/core @babel/preset-env -D`

2. ```javascript
   //  .babelrc
   {
     "presets": [
       ["@babel/preset-env", {
         "targets": {
           "node": "current"
         }
       }]
     ]
   }
   ```

3. 

## 匹配器Matcher

```javascript
//  toEqual匹配器
test('测试对象内容相等', () => {
  const a = { one: 1}
  expect(a).toEqual({ one: 1})
})

//  toBeNull 是不是Null, 和toBeUndefined一样都必须是严格相等
//  toBeUndefined

//  toBeTruthy 是否为真，会进行类型转换
//  toBeFalsy  是否为假

//  not 下面例子里表示不为假则通过，即为真
test('测试对象内容相等', () => {
 const a = 1
 expect(a).not.toBeFalsy()
})

//  toBeGreaterThan 要求期望的比某个数大
//  toBeLessThan

//  toBeGreaterThanOrEqual 大于等于

//  JS在计算小数这种浮点数的时候不准确，小数点后几位可能带别的数字
//  toBeCloseTo 调用这个匹配器才能判断
test('toBeCloseTo', () => {
  const num1 = 0.1
  const num2 = 0.2
  expect(num1 + num2).toBeCloseTo(0.3)
})

//  toMatch 测试字符串中是否包含某些字符，匹配器中可以传入正则表达式或字符串

//  toContain 用于Array和Set，测试是否包含某些成员

//  toThrow 可以传入字符串或正则表达式，测试抛出的异常的内容是不是指定字符串，不是就不通过
const throwNewErrorFunc = () => {
  thorw new Error('this is a error')
}

test('toThrow', () => {
  expect(throwNewErrorFunc).toThrow()
})
//  可以通过
```

## 测试异步代码

必须要在test方法参数中传入done方法，这样test才会等待异步方法返回的结果，否则会在异步结果返回前就结束测试，从而导致错误代码也能通过测试

### 回调函数类型的异步

```javascript
//  fetch.js
import axios from 'axios';

export const fetchData = (fn) => {
  axios.get('/api').then((res) => {
    fn(res.data)
  })
}

//  fetch.test.js
import { fetchData } from "./fetch";

test('fetchData结果为success', (done) => {
  fetchData((data) => {
    expect(data).toEqual({
      success: true
    })
    done();
  })
})
```

### 非回调函数类型的异步测试

```javascript
//  fetch.js
import axios from 'axios';

export const fetchData = () => {
  return axios.get('/api')
}

//  fetch.test.js
import { fetchData } from "./fetch";

//  return必须带上
test('fetchData结果为success', () => {

  return fetchData().then((res) => {
    expect(res.data).toEqual({
      success: true
    })
  })
})
```

当需要测试某些接口需要返回404时，需要

```javascript
import { fetchData } from "./fetch";

test('fetchData结果为success', () => {
  expect.assertons(1); 
  // 必须执行1次expect语法，必须要有这个才能测试接口是否404。
  // 因为如果这时fetch方法请求的是正确的接口，那么不会调用catch方法，自然也不会调用到expect方法，所以会通过测试。

  return fetchData().catch((e) => {
    expect(e.toString().indexOf('Error') > -1).toBe(false)
  })
})
```
