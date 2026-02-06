import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PremiumLanding from './PremiumLanding';
import PremiumDashboard from './PremiumDashboard';

const PremiumRoute = () => {
  const [accessCode, setAccessCode] = useLocalStorage('indoz_premium_code', '');

  const handleUnlock = (code) => {
    setAccessCode(code);
    // The useEffect or parent routing will handle the navigation/state
    // But since we are separating routes, we might just force a navigate
    // However, since we are using useLocalStorage, the state updates.
    // If we want to use Navigate component:
  };

  // If already logged in, redirect to dashboard
  if (accessCode) {
    return <Navigate to="/premium/dashboard" replace />;
  }

  return <PremiumLanding onUnlock={handleUnlock} />;
};

export default PremiumRoute;
