## Extending built-ins like `Error`, `Array`, and `Map` may no longer work

you may find `instanceof` will be broken between subclass and their instances, so `new FooError() instanceof FooError` will return false



To fix it you need to manually adjust the prototype immediately after any `super()` calls.

```typescript
class FooError extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FooError.prototype);
    }

    sayHello() {
        return "hello " + this.message;
    }
}
```

However, any **subclass** of FooError will have to adjust prototype as well. 


