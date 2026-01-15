import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';
import './DesktopOnly.css';

function DesktopOnly({ children }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (isMobile) {
        return (
            <div className="desktop-only-container">
                <div className="desktop-only-content">
                    <div className="desktop-only-icon">
                        <Monitor size={64} />
                    </div>
                    <h1 className="desktop-only-title">Desktop Only</h1>
                    <p className="desktop-only-message">
                        PESCollab is optimized for desktop browsers. 
                        Please access this website from a desktop or laptop computer 
                        for the best experience.
                    </p>
                    <div className="desktop-only-footer">
                        <p>Minimum screen width: 1024px</p>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default DesktopOnly;
