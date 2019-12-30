# el-menu

```html
<el-menu

        //  默认高亮显示index为1-1的子项
        default-active="1-1"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        //  vertical和horizontal

        mode="vertical"
        //  只允许打开一个子菜单
        //  :unique-opened = “false”时可以打开多个

        unique-opened
        //  通过一个isCollapse变量的真假控制折叠

        :collapse="isCollapse"
        //  折叠动画

        :collapse-transition="false"
        class="el-menu-vertical-demo"
        //  监听折叠展开和子项被选中事件

        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
></el-menu>
```



```javascript
handleSelect(key, keyPath) {
      console.log('handleSelect', key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log('handleOpen', key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log('handleClose', key, keyPath)
    }
```
