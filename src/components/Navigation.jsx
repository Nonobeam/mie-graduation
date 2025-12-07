import React from 'react';
import './Navigation.css';

const Navigation = ({ onNavigate }) => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (onNavigate) onNavigate(sectionId);
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <button
                    className="nav-tab"
                    onClick={() => scrollToSection('menu-section')}
                >
                    Trang chủ
                </button>
                <button
                    className="nav-tab"
                    onClick={() => scrollToSection('location-section')}
                >
                    Địa điểm
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
