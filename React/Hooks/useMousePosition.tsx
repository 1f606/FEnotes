import {useEffect, useState} from 'react'

//  自定义hook必须以use开头
//  自定义hook不共享state
const useMousePosition= () => {
    const [position, setPositions] = useState({x:0, y:0})
    useEffect(() => {
        console.log('开始执行' + position.x)
        const updateMouse = (e:MouseEvent) => {
            console.log('inner' + position.x)
            setPositions({x: e.clientX, y: e.clientY})
        }
        document.addEventListener('mousemove', updateMouse)
        return () => {
            console.log('清除'+ position.x)
            document.removeEventListener('mousemove', updateMouse)
        }
    })
    return position
}

export default useMousePosition

//  使用
//  import useMousePosition
//  const position = useMOusePosition()