import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PremiumLanding from './PremiumLanding';
import PremiumDashboard from './PremiumDashboard';

const PremiumRoute = () => {
  const [accessCode, setAccessCode] = useLocalStorage('indoz_premium_code', '');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Check if user has valid access code stored
    if (accessCode) {
      setIsUnlocked(true);
    }
  }, [accessCode]);

  const handleUnlock = (code) => {
    setAccessCode(code);
    setIsUnlocked(true);
  };

  const handleLogout = () => {
    setAccessCode('');
    setIsUnlocked(false);
  };

  if (!isUnlocked) {
    return <PremiumLanding onUnlock={handleUnlock} />;
  }

  return <PremiumDashboard onLogout={handleLogout} />;
};

export default PremiumRoute;
