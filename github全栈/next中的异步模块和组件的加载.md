

```shell
yarn add moment
```

在页面中使用

```js
import { withRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
//  应该在getInitialProps中引入才是页面局部引入，在这里引入会变成全局引入，虽然是在页面中
//  import moment from 'moment'

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`
const color = '#333'

const A = ({ router, name， time }) => (
  <>
    <Title>title {time}</Title>
    <style jsx>{`
      a {
        color:${color};
      }
    `}
  </>
)

A.getInitialProps = async ctx => {
  const moment = await import('moment')
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'jocky',
        //  fromNow转换成多少小时之前，多久分钟之前
        time: moment(Data.now() - 60 * 1000).fromNow()
        //  如果是通过这种import方法引入的，上面的方法要变一下
        time: moment.default(Data.now() - 60 * 1000).fromNow()
      })
    }, 1000)
  })
  return await promise
}

export default withRouter(A)
```



#### 异步加载组件



```js
//  components - comp.jsx
export default ({children}) => <span>Lazy Component</span>
```



```js
//  页面
import dynamic from 'next/dynamic'

const comp = dynamic(import('../components/comp'))
```


