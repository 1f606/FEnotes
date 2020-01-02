# Blob

**`URL.createObjectURL()`**



## 语法

*objectURL* = URL.createObjectURL(*object*);



### 参数

`object`

用于创建 URL 的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File "文件（File）接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。") 对象、[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob "Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。") 对象或者 [`MediaSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource "MediaSource是Media Source Extensions API 表示媒体资源HTMLMediaElement对象的接口。MediaSource 对象可以附着在HTMLMediaElement在客户端进行播放。") 对象。​

### 返回值

一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString "DOMString 是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个String。")包含了一个对象URL，该URL可用于指定源 `object`的内容。



需要注意的是，即使是同样的二进制数据，每调用一次URL.createObjectURL方法，就会得到一个不一样的Blob URL。这个URL的存在时间，等同于网页的存在时间，一旦网页刷新或卸载，这个Blob URL就失效。

通过URL.revokeObjectURL(objectURL) 可以释放 URL 对象。当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了,允许平台在合适的时机进行垃圾收集。



> 如果是以文件协议打开的html文件（即url为file://开头），则地址中http://localhost:1234会变成null，而且此时这个Blob URL是无法直接访问的。



## 实战一：上传图片预览

有时我们通过input上传图片文件之前，会希望可以预览一下图片，这个时候就可以通过前面所学到的东西实现，而且非常简单。

html

```html
<input id="upload" type="file" />
<img id="preview" src="" alt="预览"/>
复制代码
```

javascript

```javascript
const upload = document.querySelector("#upload");
const preview = document.querySelector("#preview");upload.onchange = function() {  const file = upload.files[0]; //File对象
  const src = URL.createObjectURL(file);   preview.src = src;};
```


