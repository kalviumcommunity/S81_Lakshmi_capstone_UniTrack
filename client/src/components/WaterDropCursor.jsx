import React, { useEffect, useState } from 'react';
import './WaterDropCursor.css';

const WaterDropCursor = () => {
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        let timeoutId;
        let lastMove = 0;

        const handleMouseMove = (e) => {
            const now = Date.now();
            // Throttle the ripple effect to prevent too many DOM nodes
            if (now - lastMove < 50) return;
            lastMove = now;

            const newRipple = {
                id: now + Math.random(),
                x: e.clientX,
                y: e.clientY,
            };

            setRipples((prev) => [...prev, newRipple]);

            // Remove the ripple after animation completes (1s)
            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 1000);
        };

        const handleClick = (e) => {
            const newRipple = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY,
                isClick: true,
            };

            setRipples((prev) => [...prev, newRipple]);

            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="water-drop-container">
            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className={`water-ripple ${ripple.isClick ? 'click-ripple' : ''}`}
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                    }}
                />
            ))}
        </div>
    );
};

export default WaterDropCursor;
