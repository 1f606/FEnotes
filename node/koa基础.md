## koa

## 3、中间件

### 3.1 概念

中间件（middleware），它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。

### 3.2 中间件栈

多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

最外层的中间件首先执行。
调用next函数，把执行权交给下一个中间件。
...
最内层的中间件最后执行。
执行结束后，把执行权交回上一层的中间件。
...
最外层的中间件收回执行权之后，执行next函数后面的代码。

### 3.3 异步中间件

如果有异步操作（比如读取数据库），中间件就必须写成 async 函数。

## 4、错误处理

4.1 500错误：如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回500状态码。Koa 提供了ctx.throw()方法，用来抛出错误，ctx.throw(500)就是抛出500错误。

4.2 404错误：如果将ctx.response.status设置成404，就相当于ctx.throw(404)，返回404错误。

```
const main = ctx => {
  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
};

//  等同于
const main = ctx => {
  ctx.throw(404);
};
```

4.3 处理错误的中间件
为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。

```
const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);
app.listen(3000);
```



### 安装koa-generator

`npm install -g koa-generator`

使用es引擎创建

`koa2 -e koa2-learn`


