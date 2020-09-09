#### 配合自动更新 - 安装包签名(mac)（待补充）

> 前提：实现自动更新需要签名

一、**本地开发调试mac签名**（无需具有权限的appple账号）

1. 打开xcode，`xcode -> preference -> add new acount` 登录apple账号(系统会生成默认开发证书)

2. `command+空格`开启钥匙串访问

3. 选择`登录` - `我的证书` - 选择当前账号下的证书  

4. ```
   sudo vim ~/.bash_profile
   // 添加
   export CSC_LINK=~/work/ypshop.p12 // 你打算把p12签名文件存放的位置
   export CSC_KEY_PASSWORD="12345" // p12密码
   // 退出后刷新env
   source ~/.bash_profile
   // 启动新的终端窗口，准备打包
   ```

5. 回到第4步，右键证书，导出到对应的p12文件

6. 输入密码应该和CSC_KEY_PASSWORD一致

7. 打包`npm run package`

8. 提示
   
   • Mac Developer is used to sign app — it is only for development and testing, not for production
   • signing         file=build/mac/ypshop.app identityName=Mac Developer: 703390877@qq.com (AW2NUS55WJ) identityHash=56CF8E6D4AC72AA3FE4E4FD34AADB4F7AAE7051E provisioningProfile=none
   • building        target=DMG arch=x64 file=build/ypshop-0.1.3.dmg
   • building        target=macOS zip arch=x64 file=build/ypshop-0.1.3-mac.zip
   • building block map  blockMapFile=build/ypshop-0.1.3.dmg.blockmap
   • building embedded block map  file=build/ypshop-0.1.3-mac.zip

就可以了  

8. 接下来就可以走自动更新流程了

二、 **生产环境mac签名**（需要指定权限账号/可生成 Developer ID Application证书）

1. 添加证书  
   `xcode -> preference -> acount`  
   登录账号，选择`manage certificates`,添加 `developer id application`
2. 创建有效证书后，跟着开发调试步骤2继续往下

[参考1](https://www.electron.build/code-signing)

[参考2](https://segmentfault.com/a/1190000012902525)

[参考3](https://www.cnblogs.com/lovesong/p/11782449.html)

三、 本地服务器搭建：

`mkdir -p update_server/download`

全局安装http-server  
`npm i http-server -g`

启动文件服务器http-server

`cd update_server`

`http-server -p 4000`

将打包好的新版本文件放入download目录

访问  
`http://127.0.0.1:4000/download`
