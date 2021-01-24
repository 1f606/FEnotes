1、为了避免和原生的属性冲突，html中的onclick, onmouseover等事件以及一些标签属性还有style中css属性名都是驼峰写法。

2、函数组件在16.8.0后借助reacthooks有state和lifecycle，class based组件本身就有。



```javascript
import React from 'react';
import ReactDom from 'react-dom';

const Footer = (props) => (
   <header>
    <ul>{{props.tects.map(tech => <li>{tect}</li>)}}</ul>
   </header>
)
const Header = (props) => {
    return (
        <header>
         <h1>{{props.title}}</h1>
        </header>
    )
}

class Header extends React.Component {
    constructor (props) {
        super(props);
    }
    render () {
        const {variable} = this.props;
        return (
            <header>
                {variable}
            <header>
        )
    }
}

class Header extends React.Component {
    greet () {
        alert('hello');
    }
    render () {
        return (
            <header>
                <div>
                    <button onClick={this.greet}></button>
                </div>
            </header>
        )
    }
}
const rootElement = document.getElementById('root');
ReactDom.render(<Header/>, rootElement);
```


