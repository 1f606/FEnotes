```javascript
BrowserWindow传递的options中设置
webPreferences: {
      webSecurity: false
}
```

对webview标签也适用。

需要注意的是在webview标签属性中使用时，只有自己名字的将被赋予 `true` 布尔值。 可以通过 `=` 来赋予其他值。 `yes` 和 `1` 会被解析成 `true`，而 `no` 和 `0` 解析为 `false`。

```html
<webview ></webview>
```


