import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import FloatingHat from '../components/FloatingHat';
import { storage } from '../services/storage';
import { api } from '../services/api';
import './CelebrationPage.css';

const CelebrationPage = () => {
    const navigate = useNavigate();
    const userName = storage.getUserName();
    const [wishMessage, setWishMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [hasWish, setHasWish] = useState(false);
    const [existingWish, setExistingWish] = useState(null);

    useEffect(() => {
        if (!userName) {
            navigate('/');
            return;
        }

        // Submit attendance when entering celebration page
        const submitAttendanceOnce = async () => {
            const attendanceSubmitted = localStorage.getItem('mie_grad_attendance_submitted');
            if (!attendanceSubmitted) {
                try {
                    await api.submitAttendance(userName);
                    localStorage.setItem('mie_grad_attendance_submitted', 'true');
                } catch (error) {
                    console.error('Failed to submit attendance:', error);
                }
            }
        };

        submitAttendanceOnce();

        // Check if user has already sent a wish
        const wish = storage.getUserWish();
        if (wish) {
            setHasWish(true);
            setExistingWish(wish);
        }
    }, [userName, navigate]);

    const handleBack = () => {
        navigate('/menu');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!wishMessage.trim()) {
            setError('Vui lòng nhập lời chúc của bạn');
            return;
        }

        setLoading(true);

        try {
            const result = await api.submitWish(userName, wishMessage);

            if (result.success) {
                storage.saveWish(wishMessage);
                setSuccess(true);
                setHasWish(true);
                setExistingWish({
                    message: wishMessage,
                    timestamp: new Date().toISOString(),
                });
                setWishMessage('');
            } else {
                setError(result.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="page celebration-page">
            <FloatingHat size={240} position={{ top: '5%', right: '5%' }} />
            <FloatingHat size={160} position={{ top: '15%', left: '8%' }} />
            <FloatingHat size={120} position={{ bottom: '10%', right: '15%' }} />
            <FloatingHat size={140} position={{ bottom: '20%', left: '12%' }} />

            <div className="celebration-content">
                <div className="celebration-emoji-group">
                    <span className="celebration-emoji">🎊</span>
                    <span className="celebration-emoji">🎓</span>
                    <span className="celebration-emoji">🎉</span>
                </div>

                <h1 className="celebration-title">Chúc Mừng!</h1>

                <div className="celebration-message-box">
                    <h2 className="celebration-subtitle">
                        Cảm ơn <span className="highlight">{userName}</span> đã tham dự!
                    </h2>
                    <p className="celebration-text">
                        Xin chúc mừng <strong>Thảo Mie</strong> đã hoàn thành xuất sắc chặng đường học tập!
                    </p>
                    <p className="celebration-text">
                        Đây là một cột mốc quan trọng, đánh dấu sự khởi đầu cho những hành trình mới
                        tràn đầy cơ hội và thành công.
                    </p>
                    <p className="celebration-text">
                        Chúc Thảo Mie luôn vững bước, tự tin và đạt được nhiều thành tựu rực rỡ hơn nữa
                        trong tương lai! 🌟
                    </p>
                </div>

                <div className="celebration-quote">
                    <p className="quote-text">
                        "The future belongs to those who believe in the beauty of their dreams."
                    </p>
                    <p className="quote-author">— Eleanor Roosevelt</p>
                </div>

                {/* Wish Section */}
                <div className="celebration-wish-section">
                    <h3 className="wish-section-title">💌 Gửi lời chúc cho Thảo Mie</h3>

                    {hasWish ? (
                        <div className="celebration-wish-display">
                            <div className="wish-sent-box">
                                <p className="wish-sent-message">{existingWish.message}</p>
                                <p className="wish-sent-time">
                                    Đã gửi lúc: {formatDate(existingWish.timestamp)}
                                </p>
                            </div>
                            <div className="wish-sent-badge">
                                <span className="success-icon">✓</span>
                                Lời chúc của bạn đã được gửi!
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="celebration-wish-form">
                            <Input
                                value={wishMessage}
                                onChange={(e) => {
                                    setWishMessage(e.target.value);
                                    setError('');
                                }}
                                placeholder="Viết lời chúc của bạn tại đây..."
                                multiline
                                rows={4}
                                error={error}
                                disabled={loading}
                            />

                            {success && (
                                <div className="wish-success-alert">
                                    <span className="success-icon">✓</span>
                                    Lời chúc đã được gửi thành công!
                                </div>
                            )}

                            <Button type="submit" variant="secondary" loading={loading}>
                                {loading ? 'Đang gửi...' : 'Gửi lời chúc'}
                            </Button>
                        </form>
                    )}
                </div>

                <div className="celebration-actions">
                    <Button onClick={handleBack} variant="primary">
                        Quay lại
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CelebrationPage;
