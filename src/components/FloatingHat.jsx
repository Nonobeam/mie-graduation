import React from 'react';
import './FloatingHat.css';

const FloatingHat = ({
    size = 80,
    position = { top: '10%', right: '10%' },
    className = '',
}) => {
    return (
        <div
            className={`floating-hat ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                top: position.top,
                right: position.right,
                left: position.left,
                bottom: position.bottom,
            }}
        >
            <img
                src="/hat.png"
                alt="Graduation Hat"
                className="hat-image"
            />
        </div>
    );
};

export default FloatingHat;
