`$router`和`$route`的区别:

- `$router`是指整个**路由实例**,你可以操控整个路由,通过'$router.push'往其中添加任意的路由对象.
- `$route`:是指当前路由实例('$router')跳转到的**路由对象**，里面可以获取name、path、query、params等。
- 路由实例可以包含多个路由对象.它们是父子包含关系.


