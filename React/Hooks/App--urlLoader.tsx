import React, {useState} from 'react';
import useURLLoader from './useURLLoader'

interface ShowResult {
    message: string;
    status: string;
}

function App() {
    const [show, setShow] = useState(true)
    const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
    const dogResult = data as ShowResult
    return (
        <div className="App">
            {loading ? <p><span role="img" aria-label="1">🐕读取中</span></p> : <img alt="dog" src={dogResult && dogResult.message}/>}
            <br/>
            <button onClick={() => {setShow(!show)}}>refresh dog</button>
        </div>
    );
}

export default App;
