import React, {useState, useEffect} from 'react';

const TestTimer = ({time, onCountdownEnd}) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    function set(seconds) {
        setSeconds(seconds);
        setIsActive(false);
    }

    useEffect(() => {
        set(time * 60);
        toggle();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive && seconds !== 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (isActive && seconds === 0) {
            toggle();
            onCountdownEnd();
        }
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [isActive, seconds]);


    return (
        <div className="card bg-light">
            <h4 className="text-primary" style={{ textAlign: 'center' }}>
                {("0" + Math.floor((seconds / 3600) % 60)).slice(-2)} : {("0" + Math.floor((seconds / 60) % 60)).slice(-2)} : {("0" + (seconds) % 60).slice(-2)}
            </h4>
        </div>
    );
};

export default TestTimer;