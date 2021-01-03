vue-router的hash变化会触发did-navigate-in-page但无法获取到具体url，可以再事件处理函数里面调用webview.getURL()。只会在webview刚加载的时候触发did-navigate事件并获取到url对象。

```js
var webview = onload = () => {
    webview = document.querySelector('webview');
}
```

控制webview加载的页面中弹窗的显示

1、设置`allowpopups` and `webpreferences="nativeWindowOpen=true"`在webview标签上

2、webview的new-window事件在renderer进程中无法被阻止，需要在主进程中处理。

```js
const { app } = require('electron')
app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
  if (contents.getType() === 'webview') {
    contents.on('new-window', function (newWindowEvent, url) {
      console.log('block');
      newWindowEvent.preventDefault();
    });
  }
});
```

参考：

[https://stackoverflow.com/questions/48298364/choose-which-popups-should-be-allowed-from-webview-in-electron-app](https://stackoverflow.com/questions/48298364/choose-which-popups-should-be-allowed-from-webview-in-electron-app)

[https://github.com/electron/electron/pull/9568#issuecomment-306339926](https://github.com/electron/electron/pull/9568#issuecomment-306339926)

相关讨论：

[https://github.com/electron/electron/issues/15040](https://github.com/electron/electron/issues/15040)
