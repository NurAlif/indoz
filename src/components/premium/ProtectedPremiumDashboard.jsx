import React, { useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PremiumDashboard from './PremiumDashboard';
import { useNavigate } from 'react-router-dom';

const ProtectedPremiumDashboard = () => {
    // We still keep this to ensure the "state" is there, but we don't block
    const [accessCode, setAccessCode] = useLocalStorage('indoz_premium_code', 'PREMIUM_UNLOCKED');
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessCode) {
            setAccessCode('PREMIUM_UNLOCKED');
        }
    }, [accessCode, setAccessCode]);

    const handleLogout = () => {
        // For "logout", maybe we just go back to home since there's no login anymore?
        // Or we clear the code and go to home.
        setAccessCode('');
        navigate('/');
    };

    return <PremiumDashboard onLogout={handleLogout} />;
};

export default ProtectedPremiumDashboard;
