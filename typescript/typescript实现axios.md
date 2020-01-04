# typescript实现axios

## 1.URL处理

逻辑：

1. 定义函数接收 `url` 和 `params` 两个参数

2. 判断 `param` 值是否为空，为空直接返回 `url`

3. 定义字符串数组 `parts` 存放最终参数结果

4. 通过 `Object.keys(params)` 拿到参数的 `key` 同时用 `foreach` 进行处理

5. 判断 `value` 值是否为空，为空返回进行下一次处理

6. 定义临时数组 `values` 存放 `value` 

7. 判断 `value` 是否为数组，是的话将其赋给临时数组，否则将其赋给临时数组的第一项

8. `values` 调用 `foreach` 判断每一项 `value` 是否为 `Date` 对象，是则调用 `toISOString` ，不是则判断是否为对象，接着调用 `JSON.stringify` 。

9. 最后把结果按 `key = value` 的形式放入parts数组

10. `parts.push(${encode(key)}=${encode(val)})`

11. 最后调用 `parts.join('&')` 生成处理好的参数

12. 最后需要考虑 `url` 中是否有哈希标示，有的话忽略掉，即调用indexof和slice方法实现

13. 然后判断 `url` 中是否有问号，有的话用&号拼接处理好的参数，没有的话用问号拼接

14. 最后返回 `url`



## 2. 处理请求body数据

我们通过执行 `XMLHttpRequest` 对象实例的 `send` 方法来发送请求，并通过该方法的参数设置请求 `body` 数据。

`send` 方法的参数支持 `Document` 和 `BodyInit` 类型，`BodyInit` 包括了 `Blob`, `BufferSource`, `FormData`, `URLSearchParams`, `ReadableStream`、`USVString`，当没有数据的时候，我们还可以传入 `null`。

但是我们最常用的场景还是传一个普通对象给服务端，例如：

```js
axios({
  method: 'post',
  url: '/base/post',
  data: {     a: 1,
    b: 2   }
})
```

这个时候 `data`是不能直接传给 `send` 函数的，我们需要把它转换成 JSON 字符串。



Note: `isObject` 的判断方式，对于 `FormData`、`ArrayBuffer` 这些类型，`isObject` 判断也为 `true`，但是这些类型的数据我们是不需要做处理的，而 `isPlainObject` 的判断方式，只有我们定义的普通 `JSON` 对象才能满足。



逻辑：

1. 判断 `data` 是否是普通的 `JSON` 对象，是的话调用 `JSON.stringify` 方法处理，否则直接返回

2. 返回 `data` 

3. 如果请求的 `headers` 的 `content-type` 与 `send` 发送的数据格式不同，服务器端无法正确解析数据



## 3. 处理header

逻辑：

1. 设置可选配置项 `headers` 

2. 对配置项先做格式化处理，统一

3. 接着判断是否是 `JSON` 对象，再判断是否设置请求头但又没设置 `Content-Type` 的情况，有的话设置为 `application/json;charset=utf-8` 

4. 返回headers

5. 在调用 `send` 之前判断当 `data` 为空时，判断 `headers` 中是否有 `content-type` ，利用小写形式对比即可，因为此时配置 `Content-Type` 是没有意义的需要删除

6. 否则就调用 `setRequestHeader` 设置 `header`。 第一个参数传入key，第二个参数传入value

另外我们处理 `header` 的时候依赖了 `data`，所以要在处理请求 `body` 数据之前处理请求 `header`。



## 4. 获取响应数据

我们希望能处理服务端响应的数据，并支持 Promise 链式调用的方式。可以拿到 `res` 对象，并且我们希望该对象包括：服务端返回的数据 `data`，HTTP 状态码`status`，状态消息 `statusText`，响应头 `headers`、请求配置对象 `config` 以及请求的 `XMLHttpRequest` 对象实例 `request`

1. 定义 `AxiosResponse` 接口类型

2. 另外，`axios` 函数返回的是一个 `Promise` 对象，我们可以定义一个 `AxiosPromise` 接口，它继承于 `Promise<AxiosResponse>` 这个泛型接口：
   
   ```typescript
   export interface AxiosPromise extends Promise<AxiosResponse> {
   }
   ```

对于一个 AJAX 请求的 `response`，我们是可以指定它的响应的数据类型的，通过设置 `XMLHttpRequest` 对象的 [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) 属性，于是我们可以给 `AxiosRequestConfig` 类型添加一个可选属性：

```typescript
export interface AxiosRequestConfig {
  // ...
  responseType?: XMLHttpRequestResponseType
}
```

`responseType` 的类型是一个 `XMLHttpRequestResponseType` 类型，它的定义是 `"" | "arraybuffer" | "blob" | "document" | "json" | "text"` 字符串字面量类型。

3. 在 `xhr` 函数添加 [`onreadystatechange`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange) 事件处理函数，并且让 `xhr` 函数返回的是 `AxiosPromise` 类型。

4. 在 `onreadystatechange` 函数中判断 `XMLHttprequest` 对象的 `readyState` 的变化，只要不等于4，直接返回即可，这个函数会一直监听变化不断执行

5. 调用**XMLHttpRequest.getAllResponseHeaders()** 方法返回所有的响应头，返回值是每一行都通过 `\r\n` 来进行分割

6. 接着判断 `responseType` 存在且判断其类型，不为 `text` 则响应数据为 `XMLHttprequest` 对象的 `response` 否则是 XML对象的 `responseText`

7. 然后定义 `AxiosResponse` 类型的对象存储响应数据并调用 `resolve` 方法将其传入

8. 设置 `axios` 函数的返回类型是 `AxiosPromise`



## 5. 处理响应header

我们通过 `XMLHttpRequest` 对象的 `getAllResponseHeaders` 方法获取到的值是字符串，而且每一行都是以回车符和换行符 `\r\n` 结束，它们是每个 `header` 属性的分隔符。对于上面这串字符串，我们希望最终解析成一个对象结构。

逻辑：

1. 创建工具函数，创建一个空对象，先判断headers是否存在，不存在直接用 `Object.create(null)` 创建空对象 返回

2. 接着通过 `split()` 方法分割每行调用 `forEach` 对每一行进行处理

3. 因为每一行都是 key：value的形式，和上一步逻辑一样进行处理，用解构赋值 `[key, value]` 拿到对应键值对

4. 对key调用 `trim` 和 `toLowerCase` 方法，接着判断key值是否存在，不存在直接返回进行下一次

5. 然后判断value值是否存在，存在就调用 `trim` 方法

6. 最后在空对象中设置相应键值

7. 最后返回对象

8. 在调用 `getAllResponseHeaders` 方法后用工具函数对其处理后再返回



## 6. 处理响应data

在我们不去设置 `responseType` 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象。例如：

```js
data: "{"a":1,"b":2}"
```

我们把它转换成：

```js
data: {
  a: 1,
  b: 2
}
```



根据需求分析，我们要实现一个 `transformResponse` 工具函数。

`helpers/data.ts`：

```
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
```

`index.ts`：

```
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
```
