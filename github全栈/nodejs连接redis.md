ioredis

redis的api对应着模块里的同名方法，相当于用命令行的形式调用

```js
const Redis = require('ioredis')

async function test () {
  const redis = new Redis({
    port: 6378,
    host: '127.0.0.1',
    family: 4, // ipv4 or ipv6
    password: '123456',
    db: 0
  })

  const keys = await redis.keys('*')
  await redis.set('a', 1)
  await redis.get('a')

  console.log(keys)
}

test()
```
