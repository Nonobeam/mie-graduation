import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import MenuPage from './pages/MenuPage';
import CelebrationPage from './pages/CelebrationPage';
import WishPage from './pages/WishPage';
import { storage } from './services/storage';

function App() {
    // Protected route wrapper
    const ProtectedRoute = ({ children }) => {
        const userName = storage.getUserName();
        if (!userName) {
            return <Navigate to="/" replace />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route
                    path="/menu"
                    element={
                        <ProtectedRoute>
                            <MenuPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/celebration"
                    element={
                        <ProtectedRoute>
                            <CelebrationPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/wish"
                    element={
                        <ProtectedRoute>
                            <WishPage />
                        </ProtectedRoute>
                    }
                />
                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
