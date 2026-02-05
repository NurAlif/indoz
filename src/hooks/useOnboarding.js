import { useEffect, useState } from 'react';

const ONBOARDING_KEY = 'indoz_onboarding_completed';

/**
 * Custom hook to manage onboarding modal state
 * @returns {Object} { isOpen, handleClose }
 */
export function useOnboarding() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompleted = localStorage.getItem(ONBOARDING_KEY);

    if (!hasCompleted) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    // Mark onboarding as completed
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOpen(false);
  };

  return {
    isOpen,
    handleClose,
  };
}
