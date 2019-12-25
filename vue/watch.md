# watch的用法



**为了方便，下面例子中只保留关键代码**



1. watch监听数据时可以拿到数据变化后的值进行操作

```javascript
 //  监听message这个数据的变化，发生变化后改变copyMessage的值
 watch: {
      message(value) {
        this.copyMessage = value
      }
    },
```

1. 1第一种用法可以改写成下面绑定方法的形式

```javascript
//  绑定方法
watch: {
  message: 'handleMessage'
},
methods: {
  handleMessage(value) {
   this.copyMessage = value
  }
}
//  使用handler
watch: {
  message: [{
    handler: 'handleMessage'
  }]
}
//  数组形式绑定多个方法处理
watch: {
  message: [{
    handler: 'handleMessage'
  },
  'handleMessage1',
  function(value) {
    this.copyMessage = this.copyMessage + '...'
  }]
}
```

2. `deep` , `handler` 和`immediate`

```javascript
watch: {
  deepMessage: {
    handler: 'handleMessage',
    deep: true, //  监听deepMessage内所有属性，false则表示只监听第一层
    immediate: true //  表示会在监听前先进行一次处理，例如<span>{{copyMessage}}</span>，在immediate不为true时，是没有值的，只有为真，才有默认的值，就是先进行了一次处理
  }
}，
data() {
  return {
    handleMessage: {
      a: {
        b: 'msg'
      }
    }
  }
}
```

    对于deep来说，如果只是要监听某个很深层级的属性，`watch` 的时候直接只监听这个属性即可，节约性能。所以上面的例子可以改成

```javascript
watch: {
 'deepMesage.a.b': 'handleMessage',
}，
```










