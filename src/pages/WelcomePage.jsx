import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import FloatingHat from '../components/FloatingHat';
import { storage } from '../services/storage';
import './WelcomePage.css';

const WelcomePage = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Vui lòng nhập tên của bạn');
            return;
        }

        // Save name to storage
        const success = storage.saveUserName(name.trim());

        if (success) {
            // Navigate to menu page
            navigate('/menu');
        } else {
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="page welcome-page">
            <FloatingHat size={200} position={{ top: '5%', right: '5%' }} />
            <FloatingHat size={120} position={{ bottom: '10%', left: '8%' }} />

            <div className="card welcome-card">
                <div className="welcome-header">
                    <h1 className="welcome-title">🎓</h1>
                    <h2 className="welcome-subtitle">
                        <span className="animated-text">Chúc Mừng Tốt Nghiệp</span>
                    </h2>
                    <h3 className="graduate-name">Thảo Mie</h3>
                    <p className="welcome-message">
                        Cảm ơn bạn đã ghé thăm! Để bắt đầu, hãy cho mình biết tên của bạn nhé.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="welcome-form">
                    <Input
                        label="Bạn tên là gì thế"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        placeholder="Nhập tên của bạn..."
                        error={error}
                        autoFocus
                    />

                    <Button type="submit" variant="primary">
                        Tiếp tục
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default WelcomePage;
