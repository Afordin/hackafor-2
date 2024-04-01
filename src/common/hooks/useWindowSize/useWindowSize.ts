import { useLayoutEffect, useState } from 'react';
import throttle from 'lodash.throttle';

interface WindowSize {
  windowWidth: number;
  windowHeight: number;
}

export const useWindowSize = (waitingTime = 400) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: 0,
    windowHeight: 0
  });

  const handleSize = () => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  // Update size on resize
  useLayoutEffect(() => {
    // Initial size on mount
    handleSize();

    // Update windowSize on mount
    const calcInnerWidth = throttle(() => handleSize(), waitingTime);

    // Add event listener for resize
    window.addEventListener('resize', calcInnerWidth);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', calcInnerWidth);
    };
  }, []);

  return windowSize;
};
