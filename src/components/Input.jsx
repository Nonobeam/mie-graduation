import React from 'react';
import './Input.css';

const Input = ({
    label,
    value,
    onChange,
    placeholder,
    multiline = false,
    rows = 4,
    disabled = false,
    error = '',
    className = '',
    ...props
}) => {
    const Component = multiline ? 'textarea' : 'input';

    return (
        <div className={`input-container ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <Component
                className={`input ${error ? 'input-error' : ''} ${multiline ? 'input-multiline' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={multiline ? rows : undefined}
                {...props}
            />
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};

export default Input;
