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
                                <p className="info-value">Lễ Tốt Nghiệp Đại Học của Thảo Mie</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">📅</div>
                            <div className="info-details">
                                <h3 className="info-label">Thời gian</h3>
                                <p className="info-value">Ngày 18 Tháng 12, 2025</p>
                                <p className="info-subvalue">15:30 - 17:30</p>
                            </div>
                        </div>

                        <div className="info-item info-item-clickable">
                            <div className="info-icon">📍</div>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=306+Võ+Văn+Hát,+Phường+Long+Trường,+TP.+Hồ+Chí+Minh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="info-details info-details-link"
                            >
                                <h3 className="info-label">Địa điểm</h3>
                                <p className="info-value">Cơ sở 306 Võ Văn Hát</p>
                                <p className="info-subvalue">Phường Long Trường, TP. Hồ Chí Minh</p>
                                <p className="click-hint">👆 Nhấn để xem bản đồ</p>
                            </a>
                        </div>
                    </div>

                    <div className="location-map">
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.7379593989218!2d106.80889090127334!3d10.814997789594381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273243cb65d9%3A0x5913954ca65f9f1f!2sUniversity%20of%20Finance%20-%20Marketing!5e0!3m2!1sen!2s!4v1765088621429!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Graduation Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
