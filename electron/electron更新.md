主进程运行检查更新函数

```js
import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'
let mainWindow = null;

export function updateHandle (window, feedUrl) {
  mainWindow = window;
  const returnData = {
    error: { status: 0, msg: '检测更新查询异常' },
    checking: { status: 1, msg: '正在检查应用程序更新' },
    updateNotAva: { status: 2, msg: '您现在使用的版本为最新版本,无需更新!' },
    updateAva: { status: 3, msg: '检测到新版本' },
    updateDone: { status: 5, msg: '更新完毕' },
  };
  //设置更新包的地址
  autoUpdater.setFeedURL(feedUrl);
  //监听升级失败事件
  autoUpdater.on('error', function (error) {
    console.log(error)
    sendUpdateMessage(returnData.error)
  });
  //监听开始检测更新事件
  autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage(returnData.checking)
  });
  //监听没有可用更新事件
  autoUpdater.on('update-not-available', function (message) {
    sendUpdateMessage(returnData.updateNotAva)
  });
  //监听发现可用更新事件
  autoUpdater.on('update-available', function (message) {
    sendUpdateMessage(returnData.updateAva)
  });
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage({ status: 4, msg: progressObj })
  });
  //监听下载完成事件
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl) {
    sendUpdateMessage(returnData.updateDone)
    //退出并安装更新包
    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 1000);
  });

  //接收渲染进程消息，开始检查更新
  ipcMain.on("checkForUpdate", (e, arg) => {
    //执行自动更新检查
    console.log('开始检查更新')
    autoUpdater.checkForUpdates();
  })
}

//给渲染进程发送消息
function sendUpdateMessage (text) {
  mainWindow.webContents.send('message', text)
}
```



```js
    this.$electron.ipcRenderer.on('message', (event, data) => {
      switch (data.status) {
        case 0:
          this.$Message['error']({

            content: data.msg
          })
          break
        case 1:
        case 2:
        case 5:
          if (!this.firstClick) {
            this.$Message['info']({


              content: data.msg
            })
          }
          break
        case 3:
          this.dialogVisible = true
          this.$Message['info']({


            content: data.msg
          })
          break
        case 4:
          this.percent = parseInt(data.msg.percent)
          break
      }
    })
    //渲染进程和主线程通信

    this.$electron.ipcRenderer.send('checkForUpdate')

```


