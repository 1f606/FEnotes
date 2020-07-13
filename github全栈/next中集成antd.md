1、next默认不支持导入css，因为官方推荐的是css in js。需要额外配置



1、yarn add @zeit/next-css

2、根目录下创建next.config.js

```js
//  配置
const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withCss({})
如果有别的包例如 withless
module.exports = withLess(withCss({}))
```



集成antd

```shell
yarn add antd
yarn add babel-plugin-import 
//  按需加载
```



根目录下.babelrc

```js
{
  "presets": ["next/babel"],
  "plugins": [
  //  增加了style的配置后可以不需要下面导入全局css的做法，但是因为webpack的mini-css-extract-plugin会有bug，暂时没有解决方法，所以先不这么配置
    ["import", {"libraryName": "antd", "style": "css"}]

  ]
}

```



还需要在pages下创建_app.js

```js
//  覆盖next的
import App from 'next/app'

import 'antd/dist/antd.css'

export default App
```


