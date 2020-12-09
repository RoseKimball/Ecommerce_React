import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        //redirect once count = 0
        count === 0 && history.push('/');
        return() => clearInterval(interval);
    }, [count]);

    return (
        <div className='container p-5 text-center'>
            <p>You are not logged in. Redirecting in {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect;
