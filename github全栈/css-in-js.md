

```js
import { withRouter } from 'next/router'
import Link from 'next/link'

//  支持变量
const color = '#1133'

const A = ({router, name}) => (
  <>
    <Link href="#aaa">
      <a className="link">1</a>      
    </Link>
    //  定义页面局部样式
    <style jsx> {`
      a {
        color: blue;
      }
    `}
    </style>
    //  定义全局样式，但是只有在这个页面被渲染后这里的全局样式才会生效
    //  因为style标签定义的样式其实是在页面渲染后被插入到head标签中，页面销毁后就会移除
    <style jsx global>{`
      a {
        color: red;
      }
      a {
        color: ${color};
      }
    `}</style>
  </>
)
```


