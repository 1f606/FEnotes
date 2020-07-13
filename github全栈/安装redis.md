1、使用Microsoft的版本，但旧

2、使用另外维护的版本，github已star

3、使用memurai，api基本一致。命令行输入memurai-cli即可进入redis



修改安装目录下的redis.windows.conf文件里的port和requirepass，然后使用redis-server.exe .\redis.windows.conf即可启动服务



redis-cli -p 6378可以进入刚刚启动的服务



输入auth 123456即可成功登录



redis常用api

```shell
setex key expire Time value
在指定时间后会删除

KEYs * 
查看所有key
```


