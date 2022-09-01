import React, { useEffect, useState, Fragment } from 'react';
import ReactDom from 'react-dom';
import './index.less';

const App = () => {
    const [isMount, setIsMount] = useState(false);
    useEffect(() => {
        setIsMount(true);
    }, [])
    return (
        <div>
            wellcome to use react-cli-sh
            {
                isMount && <><br /> done</>
            }
        </div>
    )
}

const container = document.getElementById('app');
ReactDom.render(<App />, container)