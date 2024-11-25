
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Add your custom styles

const Welcome = () => {
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1 className="welcome-title">Welcome to Quickstay</h1>
                <p className="welcome-subtitle">Your Comfort, Our Priority</p>
                <button className="btn btn-primary" onClick={goToRegister}>
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Welcome;
