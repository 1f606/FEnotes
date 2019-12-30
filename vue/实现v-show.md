# 实现v-show

```html
<button onClick="model.isShow = true">显示</button>
 <button onClick="model.isShow = false">隐藏</button>
 <div v-show="isShow">Hello World！</div>
```

```javascript
<script>

// 第 1 步: 定义数据和视图
var model = {
    isShow: false
}
var view = document.querySelector('div')

// 第 2 步: 定义视图刷新方法
var updateView = function(value) {
    view.style.display = value ? '' : 'none'
}

// 第 3 步: 设置初始视图表现
var directiveKey = view.getAttribute('v-show')
updateView(model[directiveKey])

// 第 4 步: 监听数据变化，然后刷新视图，达到数据驱动的目的
Object.defineProperty(model, 'isShow', {
    set: function(val) {
        updateView(val)
    }
})
</script>
```


