import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import FloatingHat from '../components/FloatingHat';
import Navigation from '../components/Navigation';
import LocationSection from '../components/LocationSection';
import { storage } from '../services/storage';
import './MenuPage.css';

const MenuPage = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const name = storage.getUserName();
        if (!name) {
            // If no name found, redirect to welcome page
            navigate('/');
        } else {
            setUserName(name);
        }
    }, [navigate]);

    const handleAttend = () => {
        navigate('/celebration');
    };

    const handleSendWish = () => {
        navigate('/wish');
    };

    return (
        <div className="menu-page-wrapper">
            <Navigation />

            <div id="menu-section" className="page menu-page">
                <FloatingHat size={180} position={{ top: '8%', right: '12%' }} />
                <FloatingHat size={140} position={{ bottom: '15%', left: '10%' }} />
                <FloatingHat size={100} position={{ top: '20%', left: '15%' }} />

                <div className="card menu-card">
                    <div className="menu-header">
                        <h2 className="menu-greeting">
                            <span className="animated-text">Xin chào</span>, <span className="user-name">{userName}</span>!
                        </h2>
                        <p className="menu-description">
                            Chúc mừng Thảo Mie đã hoàn thành chặng đường học tập!
                            Bạn muốn làm gì hôm nay?
                        </p>
                    </div>

                    <div className="menu-options">
                        <div className="menu-option">
                            <div className="option-icon">🎉</div>
                            <h3 className="option-title">Tham dự</h3>
                            <p className="option-description">
                                Gửi lời chúc mừng và tham gia buổi lễ tốt nghiệp
                            </p>
                            <Button onClick={handleAttend} variant="primary">
                                Tham dự ngay
                            </Button>
                        </div>

                        <div className="menu-option">
                            <div className="option-icon">💌</div>
                            <h3 className="option-title">Gửi lời chúc</h3>
                            <p className="option-description">
                                Viết những lời chúc tốt đẹp cho Thảo Mie
                            </p>
                            <Button onClick={handleSendWish} variant="secondary">
                                Gửi lời chúc
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <LocationSection />
        </div>
    );
};

export default MenuPage;
