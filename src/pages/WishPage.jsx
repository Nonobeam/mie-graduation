import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import FloatingHat from '../components/FloatingHat';
import { storage } from '../services/storage';
import { api } from '../services/api';
import './WishPage.css';

const WishPage = () => {
    const [wishMessage, setWishMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [hasWish, setHasWish] = useState(false);
    const [existingWish, setExistingWish] = useState(null);
    const navigate = useNavigate();
    const userName = storage.getUserName();

    useEffect(() => {
        if (!userName) {
            navigate('/');
            return;
        }

        const wish = storage.getUserWish();
        if (wish) {
            setHasWish(true);
            setExistingWish(wish);
        }
    }, [userName, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!wishMessage.trim()) {
            setError(`Vui lòng nhập lời chúc của ${userName}`);
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
            } else {
                setError(result.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/menu');
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
        <div className="page wish-page">
            <FloatingHat size={180} position={{ top: '8%', right: '10%' }} />
            <FloatingHat size={130} position={{ bottom: '12%', left: '8%' }} />

            <div className="card wish-card">
                <div className="wish-header">
                    <div className="wish-icon">💌</div>
                    <h2 className="wish-title">
                        {hasWish ? `Lời Chúc Của ${userName}` : 'Gửi Lời Chúc'}
                    </h2>
                    <p className="wish-description">
                        {hasWish
                            ? `Cảm ơn ${userName} đã gửi lời chúc đến Thảo Mie!`
                            : `${userName} có thể cho My xin lời khuyên về công việc, cuộc sống hoặc là cảm nhận về tính cách của My để My hiểu hơn về bản thân mình hoặc bất cứ điều gì ${userName} muốn chia sẻ. Feel free nha, chỉ có hai ta biết thui 😉`}
                    </p>
                </div>

                {hasWish ? (
                    <div className="wish-display">
                        <div className="wish-display-box">
                            <p className="wish-display-message">{existingWish.message}</p>
                            <p className="wish-display-time">
                                Đã gửi lúc: {formatDate(existingWish.timestamp)}
                            </p>
                        </div>
                        <div className="wish-success-message">
                            <span className="success-icon">✓</span>
                            Lời chúc của ${userName} đã được gửi thành công!
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="wish-form">
                        <Input
                            label={`Lời chúc của ${userName}`}
                            value={wishMessage}
                            onChange={(e) => {
                                setWishMessage(e.target.value);
                                setError('');
                            }}
                            placeholder={`Viết lời chúc của ${userName} tại đây...`}
                            multiline
                            rows={6}
                            error={error}
                            disabled={loading}
                        />

                        {success && (
                            <div className="success-alert">
                                <span className="success-icon">✓</span>
                                Lời chúc đã được gửi thành công!
                            </div>
                        )}

                        <div className="wish-actions">
                            <Button
                                type="button"
                                onClick={handleBack}
                                variant="secondary"
                                disabled={loading}
                            >
                                Quay lại
                            </Button>
                            <Button type="submit" variant="primary" loading={loading}>
                                {loading ? 'Đang gửi...' : 'Gửi lời chúc'}
                            </Button>
                        </div>
                    </form>
                )}

                {hasWish && (
                    <div className="wish-actions">
                        <Button onClick={handleBack} variant="primary">
                            Quay lại
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishPage;
