import { useCallback, useEffect, useState } from 'react';

const isMobileWindowSize = () => {
  if (typeof window !== 'undefined') {
    if (window.matchMedia(`(max-width: ${process.env.NEXT_PUBLIC_MAX_MOBILE_WIDTH_PX}px)`).matches) {
      return true;
    }
  }

  return false;
};

export default function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(isMobileWindowSize());

  const resizeEvent = useCallback(() => {
    setIsMobile(isMobileWindowSize());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizeEvent);

    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  return { isMobile };
}
