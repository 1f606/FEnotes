# Vue组件通信

## 祖先后代通信 provide 和 inject

利用 `provide` 把自己这个实例传递给后代(包括子元素)使用，使用时在后代用 `inject` 以数组形式接收实例的字符串名称

```javascript
<div id="app">
    <Test></Test>
</div>

<script>
  function registerPlugin() {
    Vue.component('Test', {
      template: '<div>{{message}}<Test2></Test2></div>',
      provide() {
        return {
          elTest: this
        }
      },
      data() {
        return {
          message: 'message from Test'
        }
      },
      methods: {
        change(component) {
          this.message = 'message from' + component
        }
      }
    })
    Vue.component('Test2', {
      template: '<Test3/>'
    })
    Vue.component('Test3', {
      template: '<button @click="changeMessage">改变</button>',
      inject: ['elTest'],
      methods: {
        changeMessage() {
          this.elTest.change(this.$options._componentTag)
        }
      }
    })
  }
  Vue.use(registerPlugin)
  new Vue({
    el: '#app'
  })
</script>
```
