# vue Router

## 全局前置守卫和局部守卫

全局前置守卫的执行先于组件的生命周期函数

```javascript
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  }

];

const router = new VueRouter({
  routes,
});

//  next方法是必须调用的
//  第一个被调用
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  next()
})

//  如果组件内部定义了beforeRouteEnter守卫，第二个执行的是它
//  如果组件内部定义了beforeRouteUpdate，也是第二个执行
//  有beforeRouteLeave的话，是第一个执行
//  第二个
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve', to, from)
  next()
})

//  第三个
router.afterEach((to, from) => {
  console.log('afterEach', to, from)
})
```

```javascript
///  局部守卫
beforeRouteEnter (to, from, next) {
  console.log('beforeRouteEnter', to, from)

  next()
  // 在渲染该组件的对应路由被 confirm 前调用
  // 不！能！获取组件实例 `this`

  // 因为当守卫执行前，组件实例还没被创建

},
beforeRouteUpdate (to, from, next) {
  console.log('beforeRouteUpdate', to, from)
  next()
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候。或者是/home到/home?value=1之间切换的时候会触发

  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。

  // 可以访问组件实例 `this`

},
beforeRouteLeave (to, from, next) {
  console.log('beforeRouteLeave', to, from)
  next()
  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`

}
```

# 路由元信息

可以用于实现跳转后修改标题，例如

```javascript
router.beforeResolve((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    //  默认标题
    document.title = 'hello'
  }

  next()
})

//  或者使用Vue.mixin给所有组件添加beforeCreate方法来修改标题
Vue.mixin({
  beforeCreate() {
    if (this.$route.meta.title) {
      document.title = this.$route.meta.title;
    } else {
      document.title = 'default title'
    }
  }
})
```

## 动态添加路由

可以给一个按钮添加点击事件触发下面的函数，然后这时再访问对应路径就能成功访问到组件

```javascript
//  import B from './b'
addRoute() {
    //  this.$router就是全局路由对象
    this.$router.addRoutes([{
      path: '/b', component: B, meta: { title: 'Custom Title B' },
    }])
}
```

## next方法可以传入参数实现跳转

```javascript
next(`/login?redirect=${to.path}`)
```
