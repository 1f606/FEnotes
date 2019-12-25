# express

1.  `mkdir xxx`

2.  `npm init -y`

3.  `npm i -S express`

```javascript
//  app.js
const express = require('express')

const app = express()

//  中间件的调用要在请求以前，而且中间件内部要调用next方法。因为如果中间件的调用在请求以后，路由已经被消费，不会执行中间件的调用。

//  比较特殊的是异常处理中间件，必须在路由后面才能捕获异常，同时异常捕获函数的四个参数一个都不能少，可以自定义错误状态码

app.get('/', function(req, res) {
  res.send('hello node')
})

function errorHandler(err, req, res, next) {
  res.status(400).json({
    error: -1,
    msg: err.toString()
  })
}

app.use(errorHandler)

const server = app.listen(5000, function() {
  const { address, port } = server.address()
  console.log('HTTP启动成功：http://%s:%s', address, port)
})
```


