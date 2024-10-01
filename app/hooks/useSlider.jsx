// Hook for horizontal slider of review cards.

import { useState, useEffect } from 'react';

const useSlider = (totalSlides) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
      }, 10000); // Change slide every 3 seconds
  
      return () => clearInterval(interval);
    }, [totalSlides]);
  
    return { currentIndex };
  };

export default useSlider;
