## websocket

### 1、构造函数

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。

```js
var ws = new WebSocket('ws://localhost:8080');
```

### 2、webSocket.readyState

    CONNECTING：值为0，表示正在连接。
    OPEN：值为1，表示连接成功，可以通信了。
    CLOSING：值为2，表示连接正在关闭。
    CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

### 3、webSocket.onopen

实例对象的`onopen`属性，用于指定连接成功后的回调函数。

```js
ws.onopen = function () {
  ws.send('Hello Server!');
}

//  如果要指定多个回调函数，可以使用addEventListener方法。
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

### 4、webSocket.onclose

实例对象的`onclose`属性，用于指定连接关闭后的回调函数。

```js
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

### 5、webSocket.onmessage

实例对象的`onmessage`属性，用于指定收到服务器数据后的回调函数。

```js
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```

注意，服务器数据可能是文本，也可能是二进制数据（`blob`对象或`Arraybuffer`对象）。

```js
ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```

除了动态判断收到的数据类型，也可以使用`binaryType`属性，显式指定收到的二进制数据类型。

```js
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```


