1、关闭eslint  
直接注释掉package.json文件中eslint的配置就可以了（以下是vue-cli的默认配置）

```js
  "eslintConfig": {
     "root": true,////此项是用来告诉eslint找当前配置文件不能往父级查找
     "env": {
       "node": true//此项指定环境的全局变量，下面的配置指定为node环境
     },
     "extends": [// 此项是用来配置vue.js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
       "plugin:vue/essential",
       "@vue/standard"
     ],
     "rules": {//规则配置写在这里
       "indent": [1, 4]
     },
     "parserOptions": {
       "parser": "babel-eslint"//此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
     }
   },
```

或者vue.config.js中将以下三项设置为false

```js
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        lintOnSave: false
    }
```

详细解读可参考[vue-cli配置官方文档](https://cli.vuejs.org/zh/config/#pages)  
或者[vue-cli-eslint github说明书](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint)  
2、修改eslint的语法检测，文件为根目录下的 package.json文件（规则写在rules内）  
格式：

```js
rules: {
    "规则名": [规则值, 规则配置]
}
```

规则值：

```js
"off"或者0    //关闭规则关闭
"warn"或者1    //在打开的规则作为警告（不影响退出代码）
"error"或者2    //把规则作为一个错误（退出代码触发时为1）
```

3、eslint 规则配置参数

```js

```


