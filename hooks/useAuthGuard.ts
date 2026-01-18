import { useEffect, useState } from 'react';

export const useAuthGuard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isReady: isMounted,
    isLoading: !isMounted,
  };
};
