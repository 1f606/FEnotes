```js
new koa().use()是调用中间件的方法，回调函数中可以拿到两个参数ctx和next，next方法是必需要调用的，这样如果有别的中间件就可以继续调用下一个中间件

ctx.path拿到请求路径
ctx.method请求方法

//  这里的async和await最好都用上
new koa().use(async (ctx, next) => {
  ctx.body = '<span>koa</span>'
  await next()
})
```

```js
//  koa-router用法

const Router = require('koa-router')

const  router = new Router()

router.get('/test', (ctx) => {
  ctx.body = '<span><这里的ctx和koa中ctx一样/span>'
  // 想返回json数据，就要设置content-type为application/json
 ctx.set('Content-type', 'application/json')
})

//  可以通过ctx.params拿到params
router.get('/test/:id', (ctx) => {
 ctx.body = '<span>ctx.params.id</span>'
})

new koa().use(router.routes())
```
