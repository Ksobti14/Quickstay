import React, { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

const Loading = () => {
    const [loading] = useState(true); // Keeps the spinner active
    const [color] = useState("#007BFF"); // Custom loader color
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); // Timestamp state

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString()); // Update the time every second
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' // Full screen height for proper centering 
        }}>
            <MoonLoader
                color={color}
                loading={loading}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <p style={{ marginTop: '20px', fontSize: '16px', color: '#555' }}>
                Current Time: {currentTime}
            </p>
        </div>
    );
};

export default Loading;
