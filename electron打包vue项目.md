electron-builder打包vue项目



```js
//package.json参数解析
    "build": {
        "productName": "data-visuation",//项目名 这也是生成的exe文件的前缀名
        "copyright": "copyright© Guangzhou shumei.,Ltd",//版权  信息
        "appId": "com.shumei.data-visuation",//包名 
        "asar": true,//asar包有助于加快安装文件的安装速度，如果保留所有文件夹的话，在释放文件的时候磁盘压力会比较大，因此，使用asarUnpack属性，将不需要打进asar包里的文件路径指定。
        "asarUnpack":[//使用asarUnpack属性，将不需要打进asar包里的文件路径指定。
            "./dist/electron",//这里的(electron文件夹下）index.html、main.js、rederer.js和styles.css就是每次编译生成的文件，因此，如果要进行增量更新，(electron文件夹下）这四个文件是必须更新的
            "./package.json"//由于每次版本更新时，package.json的内容也会改变，所以package.json也必须排除
        ],
        "directories": {// 打包输出的文件夹位置
            "output": "build"
        },
        "files": [
            "dist/electron/**/*"
        ],
        "dmg": {
            "contents": [
            {
                "x": 410,
                "y": 150,
                "type": "link",
                "path": "/Applications"
            },
            {
                "x": 130,
                "y": 150,
                "type": "file"
            }
            ]
        },
        "mac": {
            "icon": "build/icons/icon.icns"
        },
        "win": {
            "icon": "build/icons/icon.ico",//图标路径 
            "certificateFile": "sign-xxxx.pfx",//代码签名证书
            "certificatePassword": "xxxxx",//代码签名证书密码
            "target": [
                {
                    "target": "nsis",// 我们要的目标安装包
                    "arch": [ // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包。
                        "x64", 
                        "ia32"
                    ]
                }
            ]
        },
      
        "linux": {
            "icon": "build/icons"
        },
        "nsis": {
            "oneClick": false,// 是否一键安装
            "allowElevation": true,// 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
            "allowToChangeInstallationDirectory": true, // 允许修改安装目录
            "installerIcon":"build/icons/icon.ico",// 安装图标
            "uninstallerIcon": "build/icons/icon.ico",//卸载图标
            "installerHeaderIcon": "build/icons/icon.ico",// 安装时头部图标
            "createDesktopShortcut": true,// 创建桌面图标
            "createStartMenuShortcut": true,// 创建开始菜单图标
            "displayLanguageSelector": true,//安装界面显示语言选择器
            "multiLanguageInstaller": true,//安装界面多国语言包
            "installerLanguages": [//安装界面多语言选项，如果配置该项，则（安装界面的提示文字）语言选择只有这个配置
                "en_US",
                "zh_CN"
            ],
            "warningsAsErrors": false// 安装警告不作为错误
        },
        "publish": [//publish此项用于软件更新的配置，主要是为了生成lastest.yaml配置文件
            {
              "provider": "guangzhou",// 服务器提供商 也可以是GitHub等等
              "url": "http://172.0.0.1:3000" // 服务器地址
            }
        ]
    }
```



```js
//入口文件
const { app, BrowserWindow, globalShortcut } = require('electron')


// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win

function createWindow () {
  // 创建浏览器窗口。
  win = new BrowserWindow({ width: 800, height: 600, webPreferences: { webSecurity: false } })
  win.loadURL('indexurl')


  // 打开开发者工具
  // win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })

  // // ctrl+shift+l打开控制台
  // globalShortcut.register('CommandOrControl+Shift+L', () => {
  //   let focusWin = BrowserWindow.getFocusedWindow()
  //   focusWin && focusWin.toggleDevTools()
  // })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

```


