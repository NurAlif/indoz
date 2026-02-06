import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PremiumDashboard from './PremiumDashboard';

const ProtectedPremiumDashboard = () => {
    const [accessCode, setAccessCode] = useLocalStorage('indoz_premium_code', '');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (accessCode) {
            setIsAuthorized(true);
        }
        setIsLoading(false);
    }, [accessCode]);

    const handleLogout = () => {
        setAccessCode('');
        setIsAuthorized(false);
    };

    if (isLoading) {
        return null; // Or a loading spinner
    }

    if (!isAuthorized) {
        return <Navigate to="/premium" replace />;
    }

    return <PremiumDashboard onLogout={handleLogout} />;
};

export default ProtectedPremiumDashboard;
