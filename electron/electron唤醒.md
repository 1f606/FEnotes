[`app.setAsDefaultProtocolClient`](http://www.electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args)

调用这个方法来注册协议，这样当点击'customProtocol://'格式的链接的时候都会打开当前应用。在mac上通过监听open-url方法可以获取到我们打开应用程序上面的链接，在 `windows` 上面需要通过监听 `second-instance` 方法来获取到点击的链接。



步骤：

1、代码中使用函数来注册协议app.setAsDefaultProtocolClient('customProtocol')。windows会将对应协议写入注册表。需要打包后才能正常唤起。mac上需要写入到 应用的info.plist。

```js
"build": {
    "mac": {
        "extendInfo": {
            "CFBundleURLSchemes": [
                "customProtocol"
            ]
        }
    }
}
```



1. 监听唤醒链接

当我们通过web端的唤醒链接打开应用的时候， 我们需要在点击唤醒链接的时候执行一些操作以及通过唤醒链接实现web端和本地应用之间的参数传递。

在 macOS 上， 我们通过监听 `open-url` 来获取到唤醒时的链接

```text
app.on('open-url', (event, url) => {  event.preventDefault();  ...});
```

url 即是我们点击唤醒的链接。

在 Windows 上面， 我们通过监听 `second-instance` 来获取到触发唤醒的链接：

通过 `app.requestSingleInstanceLock()` 判断当前程序的实例是否为当前取得锁， 或者说， 当前实例是否为单一的固定实例， 如果当前实例没有取到锁， 返回 `false`,说明当前实例应该被关闭

下面的代码使得当前的应用程序仅有一个实例，其余的实例将会被退出， 并且当唤醒的时候， 将会执行监听到的`second-instance` 事件

> `[second-instance](https://link.zhihu.com/?target=https%3A//electronjs.org/docs/api/app%23%25E4%25BA%258B%25E4%25BB%25B6-second-instance)` 事件：当第二个实例被执行并且调用 `app.requestSingleInstanceLock()` 时，这个事件将在你的应用程序的首个实例中触发

当事件被触发的时候，执行的回调函数接受三个参数， 其中第二个参数 commandLine 表示第二个实例的命令行参数数组

当我们点击唤醒链接的时候， 这个参数数组将包含有我们唤醒命令的链接：

```js
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  log.info('gotTheLock');
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    log.info('second-instance-start');
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    } else {
      if (!isWindows) {
        if (app.isReady()) createWindow();
      }
    }
    if (isWindows) {
      log.info('second-instace');
      let commands = commandLine.slice();
      // commandLine 是一个数组， 其中最后一个数组元素为我们唤醒的链接
      activeUrl = decodeURI(commands.pop());
      // mainWindow.loadURL();
      whenUrlActive();
    }
  });
}
```

1. 解析唤醒链接

当我们通过 `open-url` 或者 `second-instance` 获取到唤醒链接的时候， 我们就可以解析唤醒链接中的参数，

需要注意到的一点是：我们接受到的链接是已经被编码过的， 因此， 当我们获取到链接的时候， 我们需要使用 `decodeURI` 进行解码；

### **总结**：

1. 当应用卸载之后， 重新安装的应用显示的仍是上次卸载应用时的 数据，在 windows 上可以配置 `electron-builder``nsis`中的 [deleteAppDataOnUninstall](https://link.zhihu.com/?target=https%3A//www.electron.build/configuration/nsis%23deleteAppDataOnUninstall) 为 true 来清空数据, 这个配置用于当卸载应用的时候进行数据清空， 在 mac 上面， 没有相关的配置项， 通过将应用移动到废纸篓的方式不会清空数据， 或许你可以在应用上设置卸载按钮， 在点击卸载按钮时执行相关的 scripts 时清空数据， 相关issue： [life cycle handler like “uninstall” for electron app installed by macOS dmg](https://link.zhihu.com/?target=https%3A//github.com/electron-userland/electron-builder/issues/1025)  

2. 直接通过唤醒打开的时候，在 macOS 时会走 `open-url` 事件， 在 `windows` 上, 唤醒链接会通过启动参数的形式传递给应用程序，因此， 我们需要在 `createWindow` 时拿到这个参数数组

```js
function createWindow() {
  log.warn('creating window');
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 647,
    useContentSize: true,
    width: 966,
    webPreferences: {
      nodeIntegration: true
    }
  });

  ipcMainSets(mainWindow);

  setMenu();

  if (isWindows) {
    const argv = process.argv.slice();
    // 启动参数的数组的最后一项是唤醒链接
    activeUrl = decodeURI(argv.pop());
  }

  mainWindow.loadURL(winURL).then(() => {
    if (isWindows) {
      // 解析唤醒链接
      whenUrlActive();
    } else {
      isOpenWithUrl && activeUrl && whenUrlActive();
      isOpenWithUrl = false;
    }
  });
```

> 对于当前 electron 平台的判断： 使用

[process | Node.js API 文档​nodejs.cn](https://link.zhihu.com/?target=http%3A//nodejs.cn/api/process.html%23process_process_platform)

判读平台为 Windows：

`const isWindows = process.platform === 'win32';`

3. 在 electron 中 cookie 的相关操作通过 [session.defaultSession.cookies](https://link.zhihu.com/?target=https%3A//electronjs.org/docs/api/cookies) 来进行操作：

设置cookie：

```js
const cookieObj = 
{ url: winURL,   name: cookieName,   hostOnly: false,   value: cookie,   expirationDate: (new Date().getTime() + cookieExpireTime) / 1000 
};
session.defaultSession.cookies.set(cookieObj)
```

在`cookieObj` 中我们可以设置 cookie作用的地址(url), 名称(name), 值(value), 以及过期时间(expirationDate)

需要注意的是： 过期时间的单位是 秒，

***** 注意：通过调用 `session.defaultSession.cookies.set` 方法设置 cookie 是异步操作，该方法调用之后返回一个 `promise` 如果你想在cookie 设置完成之后进行相关获取cookie 的操作，我们需要在其 `promise` 执行完成之后进行：

```js
// 批量设置 cookie
allCookiesSetArr = Object.keys(cookieObj).map(cookieName => setAppCookie(cookieObj[cookieName], cookieName));
// 等待cookie 全部设置完成之后， 执行相关回调函数
Promise.all(allCookiesSetArr).then(() => {
mainWindow.webContents.send('localStorage', parseUrl.localStorage);
  cb && cb();
})
```

对于 cookie 的设置， 在开发环境下， 我们是可以看到我们设置的 cookie 的：

![](https://picb.zhimg.com/80/v2-521338815e15788966968365c8c5a0e0_720w.jpg)

而在生产环境下：在控制台是看不到 cookie 的

![](https://picb.zhimg.com/80/v2-10e786246c4f5bce1b0a670edabb2c3b_720w.jpg)

参考：

[https://zhuanlan.zhihu.com/p/76172940?from_voters_page=true](https://zhuanlan.zhihu.com/p/76172940?from_voters_page=true)
