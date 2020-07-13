

```js
//  组件Container.jsx
const style = {
  width: '100%'
}

//  需要大写开头才能让babel识别
export default ({children, comp: Comp = 'div'}) => {
  return <Comp style={style}>{children}</Comp>
}
```

上面的组件存在局限性，无法修改传入的props



```js
const Comp = ({children, color}) => <div style={color}>{children}</div>

//  当直接使用Comp组件时，可以传入color
//  但当Comp和Container组件结合使用时，无法传入
//  <Container comp={Comp}>这样无法传入</Container>
<Container>
<Comp color="red"></Comp>
{children}  
</Container>
```



解决上面的问题可以是使用cloneElement

```js
import { cloneElement } from 'react'

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto'
}

export default ({children, renderer}) =>{
  return cloneElement(renderer, {
    style,
    children
  })
}

//  使用

//  需要注意的是，在Comp组件中要处理Container组件中的style，否则container组件的style不会生效，因为cloneElement传给了Comp组件

const Comp = ({children, color, style}) => <div style={{color, ...style}}>{children}</div>

//  renderer属性接受的是一个JSX标签，等同于React.createElement('div')一样
<Container renderer={<Comp color="red"/>}>
  {children}
</Container>
```


