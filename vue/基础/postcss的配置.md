# \$emit和\$on

1. **vm.\$on(event, callback)**
   
   1.1 Arguments:
   
          {String | Array<String>} event (array only supprted in 2.2.0+)
   
          {Function} callback
   
   
   
   1.2 Usage:
   
           Listen for a custom event on the current vm. Events can be triggered by `vm.$emit`. The callback will receive all the additional arguments passed into these event-triggering methods`vm.$emit`.
   
   
   
   1.3 Example
   
   ```javascript
   //  example one
   
   //  define
   vm.$on('test', eventHandler)
   
   //  you can also call more than one methods, cause inside the vm, this 'test' event was put in an array.
   vm.$on('test', eventHandler)
   vm.$on('test', eventHandlerTwo)
   vm.$on('test', eventHandlerThree)
   

   //  call
   vm.$emit('test', 'hi')
   
   function eventHandler(msg) {
     console.log(msg)
   }
   function eventHandlerTwo(msg) {
     console.log('two:' + msg)
   }
   function eventHandlerThree(msg) {
    console.log('three:' + msg)
   }
   //  hi
   //  two:hi
   //  three:hi
   
   //  example two
   created() {
     this.$on(['my_events1', 'my_events2'], this.eventHandler)
     console.log(this._events)
     //  inside _events, there are two array  , one is 'my_events1', another is 'my_events2'.
   },
   methods: {
     function eventHandler(msg) {
       console.log(msg)
     },
     function click() {
       this.$emit('my_events1', 'my params')
     }
   }
   ```
   
   
