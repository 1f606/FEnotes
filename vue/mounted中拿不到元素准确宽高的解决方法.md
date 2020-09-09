1、如果元素需要依赖于异步返回的数据来渲染，那么应该在异步的回调里用$nextTick来拿到数据，

#### $nextTick:

**在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。**



2、在mounted中也可以通过settimeout和$nextTick来获取。不过如果用到了document.getElementById等api，获取的是动态的元素集合，所以可能会出现打印出来的结果能看到元素中的宽高属性正常，直接获取却为0或不正常。应该用querySelector、querySelectorAll
