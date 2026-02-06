import React from 'react';
import PremiumLanding from './PremiumLanding';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const PremiumRoute = () => {
  const navigate = useNavigate();
  const [, setAccessCode] = useLocalStorage('indoz_premium_code', '');

  const handleUnlock = (code) => {
    setAccessCode(code || 'PREMIUM_UNLOCKED');
    navigate('/premium/dashboard', { replace: true });
  };

  // Always show landing page when navigating to /premium
  return <PremiumLanding onUnlock={handleUnlock} />;
};

export default PremiumRoute;
