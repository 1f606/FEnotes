# require.context()

通过执行require.context函数获取一个特定的上下文,主要用来实现自动化导入模块,在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块

## 参数

1. directory { string } - 读取文件的路径

2. useSubdirectories { Boolean } - 是否遍历子目录

3. regExp { RegExp } - 匹配文件的正则

> 语法：require.context(directory, useSubdirectories = false, regExp = /^.//);

例子：

> require.context('./test', false, /.test.js$/);

上面的代码遍历当前目录下的test文件夹的所有.test.js结尾的文件,不遍历子目录

## 返回值

require.context函数执行后返回的是**一个函数,并且这个函数有3个属性**

1. resolve { Function } - 接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径

2. keys { Function } - 返回匹配成功的文件的名字组成的数组

3. id { String } - 执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载?

返回的函数接受一个req参数，和resolve的req参数是一样的，即匹配的文件名的相对路径,而files函数返回的是一个模块,这个模块才是真正我们需要的。

这个Module模块和使用import导入的模块是一样的

### example

![](D:\GoogleDrive\images\2019-12-30-14-37-36-image.png)

![](D:\GoogleDrive\images\2019-12-30-14-37-21-image.png)

#### 例子总结

- 首先调用require.context导入某个文件夹的所有匹配文件,返回执行上下文的环境赋值给files变量

- 声明一个configRouters用来暴露给外层index.js作为vue-router的数组

- 调用files函数的keys方法返回modules文件夹下所有以.js结尾的文件的文件名,返回文件名组成的数组

- 遍历数组每一项,如果是index.js就跳过(index.js并不是路由模块),调用files函数传入遍历的元素返回一个Modules模块

- 因为我的路径是用export default导出的,所以在Module模块的default属性中获取到我导出的内容(即路由的结构),类似这种样子

![](D:\GoogleDrive\images\2019-12-30-14-38-33-image.png)

## 调整路由顺序

- 在使用require.context自动导入路由文件时发现一个问题,路由的顺序不是你期望的样子,因为webpack是根据你文件夹中文件的位置排序的,这个时候需要定义一个标识符来给路由数组排序,这里我们给每个文件夹最上层的路由添加一个sort属性用于排序

![](https://user-gold-cdn.xitu.io/2018/12/24/167de378ecafc0ae?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

随后在读取模块后,给外层index传入路由配置前,给路由的模块排序

![](https://user-gold-cdn.xitu.io/2018/12/24/167de378f1cadbee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## 可用于组织路由

对于`Vue`中的路由，大家都很熟悉，类似于声明式的配置文件，其实已经很简洁了。现在我们来让他更简洁

1. 分割路由

首先为了方便我们管理，我们把`router`目录下的文件分割为以下结构

```javascript
router                           // 路由文件夹
  |__index.js                    // 路由组织器：用来初始化路由等等
  |__common.js                   // 通用路由：声明通用路由
  |__modules                     // 业务逻辑模块：所以的业务逻辑模块
        |__index.js              // 自动化处理文件：自动引入路由的核心文件
        |__home.js               // 业务模块home：业务模块
        |__a.js                  // 业务模块a
```

2. `modules`文件夹中处理业务模块

`modules`文件夹中存放着我们所有的业务逻辑模块，至于业务逻辑模块怎么分，我相信大家自然有自己的一套标准。我们通过上面提到的`require.context()`接下来编写自动化的核心部分`index.js`。

```javascript
const files = require.context('.', true, /\.js$/)

console.log(files.keys()) // ["./home.js"] 返回一个数组
let configRouters = []
/**
* inject routers
*/
files.keys().forEach(key => {  if (key === './index.js') return
  configRouters = configRouters.concat(files(key).default) // 读取出文件中的default模块
})
export default configRouters // 抛出一个Vue-router期待的结构的数组
```

自动化部分写完了，那业务组件部分怎么写？ 这就更简单了

```javascript
import Frame from '@/views/frame/Frame'
import Home from '@/views/index/index'
export default [    
  // 首页
  {      
    path: '/index',      
    name: '首页',      
    redirect: '/index',      
    component: Frame,       
    children: [ // 嵌套路由
      {          
        path: '',          
        component: Home        
      }      
    ]    
  }
]
```

3. `common`路由处理
   我们的项目中有一大堆的公共路由需要处理比如`404`阿，`503`阿等等路由我们都在`common.js`中进行处理。

```javascript
export default [  
  // 默认页面
  {    
    path: '/',    
    redirect: '/index',    
    hidden:true
  },  
  // 无权限页面
  {    
    path: '/nopermission',    
    name: 'nopermission',    
    component: () => import('@/views/NoPermission')  
  },  
  // 404
  {    
    path: '*',    
    name: 'lost',    
    component: () => import('@/views/404')  
  }
]
```

4. 路由初始化
   这是我们的最后一步了，用来初始化我们的项目路由

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterConfig from './modules' // 引入业务逻辑模块
import CommonRouters from './common' // 引入通用模块
Vue.use(VueRouter)
export default new VueRouter({  
  mode: 'history',// 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),  
  routes: RouterConfig.concat(CommonRouters)
})
```

估计有些朋友代码写到这还不知道到底这样做好处在哪里。我们来描述一个场景，比如按照这种结构来划分模块。正常的情况是我们创建完`home.js`要手动的把这个模块`import`到路由文件声明的地方去使用。但是有了上面的`index.js`，在使用的时候你只需要去创建一个`home.js`并抛出一个符合`VueRouter`规范的数组，剩下的就不用管了。`import RouterConfig from './modules' // 引入业务逻辑模块` 已经帮你处理完了。另外扩展的话你还可以把`hooks`拿出来作为一个单独文件。
