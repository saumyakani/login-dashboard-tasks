
import React, { useState } from 'react';
import { getDeviceDetails } from '../utils/deviceUtils';

function Login({ onLoginSuccess }) {
    const [status, setStatus] = useState('Ready to log in...');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        setStatus('Capturing device and location data...');

        const eventData = {};
        
     
        eventData.timestamp = new Date().toISOString();

    
        eventData.deviceDetails = getDeviceDetails(navigator.userAgent);
        
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    eventData.geolocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    };
                    setStatus('Login successful! Capturing complete.');
                    setIsLoading(false);
                    onLoginSuccess(eventData);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    eventData.geolocation = { error: error.message || "Denied/Unavailable" };
                    setStatus(`Login successful, but Geolocation failed: ${error.message}`);
                    setIsLoading(false);
                    onLoginSuccess(eventData); 
                }
            );
        } else {
            eventData.geolocation = { error: "Geolocation not supported by browser." };
            setStatus('Login successful, but Geolocation not supported.');
            setIsLoading(false);
            onLoginSuccess(eventData); 
        }
    };

    return (
        <div className="login-container">
            <h1>Login Simulation</h1>
            <p>Click the button to simulate a user login and capture event details.</p>
            <button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Simulate Login'}
            </button>
            <p className="status-message">Status: {status}</p>
        </div>
    );
}

export default Login;