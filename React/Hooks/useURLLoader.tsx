import {useState, useEffect} from 'react'
import axios from 'axios'

//  eslint-disable-next-line
const useURLLoader = (url: string, deps: any[] = []) => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(url).then(res => {
            console.log(res)
            setData(res.data)
            setLoading(false)
        })
        //  eslint-disable-next-line
    }, deps)
    return [data, loading]
}

export default useURLLoader