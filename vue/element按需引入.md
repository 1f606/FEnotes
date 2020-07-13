element按需引入，不安装babel-preset-2015，安装，babel-preset-env

配置项也需要改动

```js
{
    presets: [
        ["env", {"modules": false}]
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```


