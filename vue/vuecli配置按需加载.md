

路由通过import按需引入组件，实际上会生成带有prefetch的link标签，会在首页资源加载空闲时加载资源，通过下面的配置实现真正打开了对应页面才加载。

```js
chainWebpack: (config) => {
    config.plugins.delete('prefetch')
}
```


