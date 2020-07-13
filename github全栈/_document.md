pages下创建_document.js

这个只有在服务端渲染的时候会生效

```js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // 这里和下面一样，定义了就得调用这一句
    const props = await Document.getInitialProps(ctx)

    return {
      ...props
    }
  }

  //  如果你重写了render方法，下面的基本结构就是必须的
  render () {
    return <Html>
      <Head>
        //  不推荐在这里使用title标签定义标题，应该在每个页面文件中引入head
        //  import Head from 'next/head'
        <Style> {`.test {color: red}`}</Style>
      </Head>
      <body className="test">
        <Main/>
        <NextScript/>
      </body>
    </Html>
  }
}

export default MyDocument
```



### next集成styled-components



```shell
yarn add styled-components babel-plugin-styled-components
```



```js
//  babelrc
{
  "presets": ["next/babel"],
  "plugins": [
    ["import", {"libraryName": "antd"}],
    ["styled-components": {"ssr": true}]
  ]
}
```





```js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import {ServerStyleSheet} from 'styled-components'

class MyDocument extends Document {
 static async getInitialProps(ctx) {
 const sheet = new ServerStyleSheet()
 const originalRenderPage = ctx.renderPage
 
  try {
    ctx.renderPage = () => originalRenderPage({
     // next自带的app
     enhanceApp: App => (props) => sheet.collectStyles(<App {...props}/>)
     // 每个页面
     //  enhanceComponent: Component => Component
     })
     // 这里和下面一样，定义了就得调用这一句
     const props = await Document.getInitialProps(ctx)
     return {
     ...props,
     styles: <>{props.styles}{sheet.getStyleElement()}</>
     }
  } finally {
    sheet.seal()
  }
 
 
 }
 // 如果你重写了render方法，下面的基本结构就是必须的
 render () {
 return <Html>
 <Head>
 // 不推荐在这里使用title标签定义标题，应该在每个页面文件中引入head
 // import Head from 'next/head'
 <Style> {`.test {color: red}`}</Style>
 </Head>
 <body className="test">
 <Main/>
 <NextScript/>
 </body>
 </Html>
 }
}
export default MyDocument
```



页面使用

```js
import styled from 'styled-components'

//  定义一个title标签
const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`

//  然后使用这个title标签即可
```


