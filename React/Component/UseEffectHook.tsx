import React, {useEffect, useState} from 'react'

//  例子一
// const LikeButton: React.FC = () => {
//     const [like, changeLike] = useState(0)
//     useEffect(() => {
//         document.title = `点击了${like}次`
//     })
//     return (
//         <>
//             <button onClick={() => {changeLike(like + 1)}}>点击</button>
//         </>
//     )
// }
//
// export default LikeButton

//  例子二
const MouseTracker: React.FC = () => {
    const [position, setPositions] = useState({x:0, y:0})
    useEffect(() => {
        console.log('开始执行' + position.x)
        const updateMouse = (e:MouseEvent) => {
            console.log('inner' + position.x)
            setPositions({x: e.clientX, y: e.clientY})
        }
        document.addEventListener('click', updateMouse)
        return () => {
            console.log('清除'+ position.x)
            document.removeEventListener('click', updateMouse)
        }
    })
    return (
        <p>x: {position.x}, y: {position.y}</p>
    )
}
//  运行结果
//  开始执行0
//  inner0
//  清除0
//  开始执行946

export default MouseTracker