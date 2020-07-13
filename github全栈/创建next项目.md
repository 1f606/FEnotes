### 创建next项目

#### 1、手动创建

```
npm init

yarn add next react react-dom

根目录下创建pages目录
//  需要注意pages下的每个文件都必须是一个react-compoment，必须导出一个component
创建index.js

//  内容(需要知道的是，next项目里文件不需要导入react，然后使用React.createElement，因为next已经在全局配置好了)
export default () => <span>index</span>

增加scripts

"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```



#### 2、使用create-next-app

```shell
//  全局安装
npm i -g create-next-app

npx create-next-app name

```


