import React from 'react';
import './Loader.css';

function Loader({ size = 'medium', fullScreen = false }) {
    const sizeClass = `loader-${size}`;
    const containerClass = fullScreen ? 'loader-fullscreen' : 'loader-container';

    return (
        <div className={containerClass}>
            <div className={`loader ${sizeClass}`}>
                <div className="loader-card">
                    <div className="loader-spinner">
                        <div className="loader-ring"></div>
                        <div className="loader-ring"></div>
                        <div className="loader-ring"></div>
                        <div className="loader-center"></div>
                    </div>
                    <p className="loader-text">
                        <span className="loader-text-gradient">Loading</span>
                        <span className="loader-dots">
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Loader;
