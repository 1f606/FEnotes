![](D:\GoogleDrive\images\2020-02-27-17-02-22-image.png)

```shell
yarn add redux
```

```js
import { createStore } from 'redux'
```

example

```js
import { createStore } from 'redux'
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}
// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)
// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.
store.subscribe(() => console.log(store.getState()))
// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```



### 1、Action

通过 `store.dispatch()` 将action传到store。Action约定内部必须使用type字段表示要执行的动作，当应用规模变大，使用单独模块来存放action

除了 `type` 字段外，action 对象的结构完全由你自己决定。参照 [Flux 标准 Action](https://github.com/acdlite/flux-standard-action) 获取关于如何构造 action 的建议。



action可以通过action创建函数来创建，创建函数会返回一个action，由于 创建函数可能是一个异步的方法，而 `store.dispatch` 没有这种接收异步函数返回的机制，需要安装redux-thunk



```shell
yarn add redux-thunk
```



```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const initialState = {
  count: 0
}

const userInitialState = {
  username: '1f606'
}

const ADD = 'ADD'

function counterReducer(state = initialState, action) {
  switch(action.type) {
    case ADD: 
      return { count: state.count + (action.num || 1)}
    default:
      return state  
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.name
      }
    default:
      return state  
  }
}

const allReducers = combineReducers({
  counter: counterReducer,
  user: userReducer
})

const store = createStore(
  allReducers, 
  {
    counter: initialState,
    user: userInitialState
  },
  applyMiddleware(ReduxThunk) 
)

//  action creator
function add(num) {
  return {
    type: ADD,
    num,
  }
}

function addAsync (num) {
  //  可以拿到store.dispatch
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 1000)
  }
}

store.dispatch(add(3))

store.subscribe(() => {
  console.log('store的每次改变都会触发这个函数')
})
```







### 2、Reducer

reducer 只是一个接收 state 和 action，并返回新的 state 的函数。

在[高级篇](https://cn.redux.js.org/docs/advanced/)里会介绍如何执行有副作用的操作。现在只需要谨记 reducer 一定要保持纯净。**只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**



#### 使用combineReducer

使用这份方法能让state自动按模块区分存放

```js
const allReducer = combineReducer({
  counter: counterReducer,
  user: userReducer
})

//  createStore中传入的state也要调整
const store = createStore(allReducer, {
  counter: counterInitState,
  user: userInitState
})

//  然后state里面就会按key存
//  类似下面的结构
{
  counter: counterState,
  user: userState
}
```


