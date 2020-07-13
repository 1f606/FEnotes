```js
import App, { Container } from 'next/app'

//  需要通过继承app原有功能
class MyApp extends App {
  render() {

    //  和普通页面的getInitialProps不同，App能拿到Component，和下面一样
    //  需要这一步才能让下面的Component，即每个页面的getInitialProps生效
    static async getInitialProps({ Component, ctx }) {
      let pageProps
      //  判断页面是否有props
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
      return {
        pageProps
      }
    }

    //  Component就是每个页面，每次渲染的时候App都能拿到
    const { Component， pageProps } = this.props
    return (
      <Container>
        //  必须要用container作为最外层标签
        <Component {...pageProps}/>
      </Container>
    )
  }
}
```

自定义layout

```js
import Link from 'next/link'

export default ({ children }) => (
  <header>
    <Link href="/a?id=1">1</Link>
  </header>
  {children}
)
```
