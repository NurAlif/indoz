import { useState, useEffect } from 'react';

/**
 * Custom hook to check if user has Indoz Premium access
 * @returns {boolean} true if user has premium access, false otherwise
 */
export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremiumStatus = () => {
      const accessCode = localStorage.getItem('indoz_premium_code');
      setIsPremium(accessCode?.length > 0);
    };

    checkPremiumStatus();

    // Listen for storage changes (in case premium status changes in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'indoz_premium_code') {
        checkPremiumStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return isPremium;
}
