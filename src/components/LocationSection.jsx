import React from 'react';
import './LocationSection.css';

const LocationSection = () => {
    return (
        <section id="location-section" className="location-section">
            <div className="location-container">
                <h2 className="location-title">📍 Thông Tin Lễ Tốt Nghiệp</h2>

                <div className="location-content">
                    <div className="location-info">
                        <div className="info-item">
                            <div className="info-icon">🎓</div>
                            <div className="info-details">
                                <h3 className="info-label">Sự kiện</h3>
                                <p className="info-value">Lễ Tốt Nghiệp Đại Học</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">📅</div>
                            <div className="info-details">
                                <h3 className="info-label">Thời gian</h3>
                                <p className="info-value">Tháng 12, 2025</p>
                                <p className="info-subvalue">15:30</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">📍</div>
                            <div className="info-details">
                                <h3 className="info-label">Địa điểm</h3>
                                <p className="info-value">Cơ sở 306 Võ Văn Hát</p>
                                <p className="info-subvalue">Phường Long Trường, TP. Hồ Chí Minh</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">🎉</div>
                            <div className="info-details">
                                <h3 className="info-label">Dress Code</h3>
                                <p className="info-value">Lễ phục hoặc trang phục trang trọng</p>
                            </div>
                        </div>
                    </div>

                    <div className="location-map">
                        <div className="map-placeholder">
                            <div className="map-icon">🗺️</div>
                            <p className="map-text">Bản đồ địa điểm</p>
                            <p className="map-subtext">Nhấn để xem chỉ đường</p>
                        </div>
                    </div>
                </div>

                <div className="location-note">
                    <p>💡 <strong>Lưu ý:</strong> Vui lòng đến trước 30 phút để làm thủ tục check-in</p>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
