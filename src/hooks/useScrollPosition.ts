import { useState, useEffect } from 'react';

import { useDebounce } from './useDebounce';

interface ScrollPosition {
  x: number;
  y: number;
}

const isBrowser = typeof window !== `undefined`;

function getScrollPosition(): ScrollPosition {
  return isBrowser ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 };
}

export function useScrollPosition(): ScrollPosition {
  const [position, setScrollPosition] = useState<ScrollPosition>(getScrollPosition());

  useEffect(() => {
    let requestRunning: number | null = null;
    function handleScroll() {
      if (isBrowser && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition());
          requestRunning = null;
        });
      }
    }

    if (isBrowser) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return position;
}

export const useShowComponent = (visibleHeight: number): boolean => {
  const [isVisible, setIsVisible] = useState(true);
  const debouncedIsVisible = useDebounce(isVisible, 300);

  const [position, setPosition] = useState<number | void>(0);
  const current = useScrollPosition();

  useEffect(() => {
    setIsVisible(current.y < visibleHeight || position > current.y);
    setPosition(current.y);
  }, [current.y]);

  return debouncedIsVisible;
};
