# Vue生命周期

new Vue() -> init Events & Lifecycle -(beforeCreate)-> init injections & reactivity -(created)-> Has "el" options ? (Has "template" option ? compile template into render function : compile el's outer HTML as template) : when vm.$mount(el) is called -> go to Has "template" option?

-(beforeMount)-> create vm.\$el and replace 'el' with it -(mounted)-> Mounted(status) -> when vm.$destroy() is called -(beforeDestroy)-> Teardown watchers, child components and event listeners -> (status)Destroyed -> destroyed(Lifecycle);

Mounted: when data changes -(beforeUpdate)-> virtual DOM re-render and patch -(updated)-> Mounted

![](D:\GoogleDrive\images\2019-12-29-22-56-33-image.png)
