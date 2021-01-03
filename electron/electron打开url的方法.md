1、在主进程中使用 child_process

```js
const child = require('child_process');
child.exec('start chrome https://www.baidu.com')
如果没有安装chrome，会调用默认浏览器
```

2、渲染进程的js中直接使用window.open来打开新网页，如果window.open打开的是下载链接，可以通过判断new-window事件的url来阻止弹出新窗口，new一个BrowserView，好处是不会有额外的窗口生成，直接弹出保存框。

```js
const view = new BrowserView();
//mainWindow是new BrowserWindow返回的窗口
mainWindow.setBrowserView(view)

view.webContents.loadURL('https:www.baidu.com')


```


