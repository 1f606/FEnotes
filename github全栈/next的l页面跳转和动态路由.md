使用

```js
import Link from 'next/link'
import { Button } from 'antd'

export default () => (
  //跳转携带参数，as属性设置浏览器地址栏显示的地址
  <Link href="/a?id=1" as="/a/1">
    <Button>1</Button>
  </Link>
)
```

Link组件内部只能有一个子元素，因为要监听唯一的子元素点击事件

```js
import Router from 'next/router'

export default () => {
  function gotoB () {
    Router.push('/test/b?id=2')
    //或这种方式
    Router.push({
      pathname: '/test/b',
      query: {
        id: 2
      }
    }, '/test/b/2')
  }
  return (
    <>
      <Link href="/a">
       <Button>1</Button>
      </Link>
      <Button onClick={gotoB}>b</Button>
    </>
  )
}
```



### 跳转页面拿到query的办法



```js
import { withRouter } from 'next/router'
import Comp from '../components/comp'

//  可以拿到router对象
const A = ({ router })=> <Comp>{router.query.id}</Comp>

export default withRouter(A)
```



### 路由映射存在的问题

利用as属性，我们实现了路由映射，但在映射的页面中重新刷新时，会导致404错误，因为刷新页面浏览器会重新向服务器请求数据，所以需要koa来解决这个问题。



```js
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  
  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handler(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })
  
  server.use(router.routes())
  
  server.use(async (ctx, next) => {
    await handler(ctx.req, ctx.res)
    ctx.respond = false
  })
  
  server.listen(3000, () => {
    console.log('koa server listening at 3000')
  })
})
```


