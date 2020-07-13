useState是一个hook，会返回一对值：**当前**状态和一个让你更新它的函数，类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。

useState中可以传入对象、字符串、数字等

### useEffect

在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

下面这个组件在 React 更新 DOM 后会设置一个页面标题：

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：

```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

在这个示例中，React 会在组件销毁时取消对 `ChatAPI` 的订阅，然后在后续渲染时重新执行副作用函数。

## ✌️ Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

同时，我们提供了 [linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)来自动执行这些规则。这些规则乍看起来会有一些限制和令人困惑，但是要让 Hook 正常工作，它们至关重要。

例子

```js
import React from 'react'

class MyCount extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {
    this.timer = setInterVal(() => {
      this.setState({count: this.state.count + 1})
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  render () {
    return <span>{this.state.count}</span>
  }
}

export default MyCount
```

```js
import React, { useState, useEffect， useReducer } from 'react'

function countReducer(state, action) {
 switch(action.type) {
   case 'add':
     return state + 1
     break
   case 'minus':
     return state - 1
     break
   default:
     return state
 }
}

function MyCountFunc() {
  const [count, setCount] = useState(0)

  //  setCount用法
  setCount(1)  //  给count赋值为1
  //  拿到的count是当时的最新值
  setCount((count) => count + 1)

  useEffect(() => {
    const timer = setInterval(() => {
      //  这样写永远只会是1，因为拿到的count的值是setInterval触发的时候拿到的count
      //  setCount(count + 1)
      //  需要使用回调方式
      setCount(count => count + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  return <span>{count}</span>
}

export default MyCountFunc

//  使用useReducer
function MyCount () {
  const [count, dispatchCount] = useReducer(countReducer, 0)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatchCount({ type: 'add' })
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return <span>{count}</span>
}
```
