# postcss的配置

在vue中配置postcss的autoprefixer的方法

```javascript
//  vue.config.js
//  重点是postcss那个属性 只要在这里配置了，下面的两个就算配置了其实也没用
module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            rootValue: 100,
            exclude: /(node_module)/,
            mediaQuery: false,
          }),
          require('postcss-preset-env')()
        ]
      },
      scss: {
        prependData: `@import "~@/assets/style/_function.scss";`
      }
    }
  },
  publicPath: './'
}

//  package.json
"postcss": {
    "plugins": {
      "autoprefixer": {}
    }
}

//  postcss.config.js
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()
  ]
}
```
