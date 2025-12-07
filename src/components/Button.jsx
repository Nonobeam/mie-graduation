import React from 'react';
import './Button.css';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    loading = false,
    type = 'button',
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} ${disabled || loading ? 'btn-disabled' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="btn-loading">
                    <span className="spinner"></span>
                    Đang xử lý...
                </span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
