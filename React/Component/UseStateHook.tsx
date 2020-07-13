import React, {useState} from 'react'

const LikeButton: React.FC = () => {
    //  可以一起设置
    const [obj, setObj] = useState({like: 0, on: true})
    //  也可以单独设置
    // const [on, setOn] = useState(true)
    return (
        <>
            <button onClick={() => {setObj({like: obj.like + 1, on: obj.on})}}>
                {obj.like}👍
            </button>
            <button onClick={() => {setObj({like: obj.like, on: !obj.on})}}>
                {obj.on ? 'OFF' : 'ON'}
            </button>
        </>
    )
}

export default LikeButton