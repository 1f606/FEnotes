nextjs自身带有服务器，但只处理ssr渲染，http请求根据host定位服务器。

它无法处理数据接口，数据库连接状态，session状态等，所以需要koa。



```shell
yarn add koa

根目录下创建server.js
```



```js
//  server.js
const koa = require('koa')
const next = require('next')

//  判断是否处于开发状态
const dev = process.env.NODE_ENV !== 'production'
//  初始化next
const app = next({ dev })
//  处理http请求
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const srever = new koa()

  server.use(async (ctx, next) => {
    await handler(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.listen(3000, ()=> {
    console.log('server is listening at 3000')
  })
})
```



修改scripts，dev为node server.js
