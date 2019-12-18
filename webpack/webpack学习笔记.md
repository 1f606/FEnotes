# webpack学习笔记1

## 安装

1. 全局安装或者项目根目录安装(推荐)

2. npm init -y快速初始化项目

3. npm install webpack webpack-cli --save-dev

## 配置

### 模式

- production(default)，压缩代码

- development，不压缩代码，sourceMap默认开启，treeshaking默认没有

### entry和output

```javascript
const path = require('path');

entery: {
  main: './src/index.js',
  sub: './src/index.js'  
},
output: {
  publicPath: 'http://cdn.com.cn', //  HtmlWebpackPlugin生成的html文件引用的js文件前面会用publicPath的地址作为前缀开头。
  filename: '[name].js', //  按entry中key值来设置生成的文件名, HtmlWebpackPlugin会把两个文件都引入
  path: path.resolve(__dirname, 'dist')
}
```

![](D:\GoogleDrive\images\2019-12-17-15-08-46-image.png)

### sourceMap

- sourceMap是一种映射关系，用于报错时快速定位报错代码

- source-map表示会生成单独的文件存放映射关系

- inline表示会把映射关系放在打包生成的js代码中

- cheap表示只提示错误代码所在行，忽略列

- module表示会把除业务代码外的loader中错误也映射

- ```javascript
  //  开发环境推荐
  module.export = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
  }
  ```

- ```javascript
  //  生产环境推荐
  module.export = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
  }
  ```

## loader

loader的执行顺序是从右到左的

### url-loader

- 能打包除字体文件外的静态资源

- 配置options的limit(单位：byte)可以实现小于limit则打包成base64，其余直接输出

### style-loader

把css代码添加到dom

### css-loader

用于解析@import等导入的格式，内置css热模块更新

```javascript
test: /\.scss$/,
use: [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,//  用于处理导入的css文件中的import导入的css文件，让这些文件也被'sass-loader'和'postcss-loader'处理一遍，走完完整流程
      modules: true//  开启css模块化，同时导入时也有要注意的地方，具体看下方demo
    }
  }，
  'sass-loader',
  'postcss-loader'
]
```

#### css模块化

```javascript
import avatar from './avatar.jpg';
import style from './style.scss'; //  import './style.scss'是全局引入, 里面定义了avatar类的样式
import createAvatar from './createAvatar';

createAvatar(); //  创建图片，这个文件里也引入了avatar图片以及做了下面四行代码的事

let img = new Image();
img.src = avatar;
img.classList.add(style.avatar)
document.getElementById('root').append(img);
```

### postcss-loader

用于添加厂商前缀

需要autoprefixer插件，并在postcss.config.js中配置

```javascript
module.export = {
  plugins: [
    require('autoprefixer')
  ]
}
```

## 

### vue-loader和vue-template-compiler

```javascript
npm install -D vue-loader vue-template-compiler
```

```javascript
//  webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
plugins: [
    new VueLoaderPlugin()
  ]
```

## plugin

### htmlWebpackPlugin

```
npm install --save-dev html-webpack-plugin
```

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.export = {
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html', //  选择生成的index.html的模板文件
  })]
}
```

### cleanWebpackPlugin

在打包前把之前生成的打包文件删除后再打包

## 热模块替换

实现热模块替换的方法

1. ```javascript
   //  package.json
   "script": {
     "watch": "webpack --watch" //  需要手动刷新
   }
   ```

2. 自己实现一个webpack-dev-server，需要自己手动刷新

3. npm install express webpack-dev-middleware -D

4. ```javascript
   "script": {
     "middleware": "node server.js"
   }
   
   // webpack.config.js
   output: {
     publicPath: '/'
   }
   
   //  server.js
   const express = require('express');
   const webpack = require('webpack');
   const webpackDevMiddleware = require('webpack-dev-middleware');
   const config = require('./webpack.config.js');
   const compiler = webpack(config);
   
   const app = express();
   
   app.use(webpackDevMiddleware(compiler, {
     publicPath: config.output.publicPath
   }))
   
   app.listen(3000, () => {
     console.log('server is running')
   })
   ```

5. 

6. 第三种方法如下

7. npm install webpack-dev-server -D

8. ```javascript
   const CleanWebapckPlugin = require('clean-webpack-plugin');
   const webpack = require('webpack');
   
   devServer: {
     contentBase: './dist',
     open: true,
     hot: true, //  启用热模块替换
     hotOnly: true, //  即使热模块更新不起作用也不刷新页面
     proxy: {
       "/api": "http://localhost:3000" //  请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
     }
   },
   plugins: [
     new HtmlWebpackPlugin({
       template: 'src/index.html'
     }),
     new CleanWebpackPlugin(['dist']),
     new webpack.HotModuleReplacementPlugin()
   ]
   
   //  If you want to proxy multiple, specific paths to the same target, you can use an array of one or more objects with a context property:
   
   proxy: [{
     context: ["/auth", "/api"],
     target: "http://localhost:3000",
   }]
   
   //  package.json
   "script": {
     "start": "webpack-dev-server"
   }
   ```

## Babel

- npm install --save-dev babel-loader @babel/core

- npm install @babel/preset-env --save-dev

- npm install --save @babel/polyfill

```javascript
module: {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presents: [['@babel/preset-env', {
        useBuiltIns: 'usage' //  让polyfill在打包时只在打包文件中增加使用了的新语法
      }]]
    }
  }]
}

//  还需要在入口文件第一行导入
require("@babel/polyfill");
//  或使用ES6的import语法
import "@babel/polyfill";
```

上面的用法不适用于在开发第三方组件库，因为polyfill可能会污染全局变量，替代方法如下：

npm install --save-dev babel-loader @babel/core

npm install --save-dev @babel/plugin-transform-runtime 已经默认包括了 @babel/polyfill

npm install --save @babel/runtime

npm install --save @babel/runtime-corejs3

```javascript
//  通过这样配置就不需要在入口文件第一行导入babel
module: {
 rules: [{
 test: /\.js$/,
 exclude: /node_modules/,
 loader: 'babel-loader',
 options: {
   "plugins": [["@babel/plugin-transform-runtime", {
     "corejs": 2,
     "helpers": true,
     "regenerator": true
   }]]
 }
 }]
}
```

## eslint

- npm install eslint --save-dev

- npm install eslint-loader --save-dev

- npx eslint --init //配置eslint

```javascript
devServer: {
  overlay: true //  用于在浏览器中弹提示层提示错误
}
module: {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
  }] 
}
```

还可以使用编辑器插件，或者为了提高打包速度不安装eslint-loader，git 钩子 eslint src在提交时检测

## Tree shaking

- 只支持es模块的引入（import）

- 可以在引入模块时不打包模块内没有调用的方法。

- production模式不需要配置ooptimization但需要配置sideEffects

- development模式开启tree shaking需要如下配置

```javascript
//  webpack.config.js
optimization: {
  usedExports: true
}

//  package.json
{
  "sideEffects": false 
}
//  如果有使用babel这种没有导出方法的模块，treeshaking会不打包他们，需要如下配置
{
  "sideEffects": ["@babel/poly-fill"]
}
{
  "sideEffects": ["*.css"]
}
```
