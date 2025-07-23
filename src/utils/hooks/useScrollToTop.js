import { useRef, useCallback } from 'react';

/**
 * Custom hook for scroll-to-top functionality
 * Uses useRef to store the scroll target element
 */
export const useScrollToTop = () => {
  const scrollTargetRef = useRef(null);
  
  const scrollToTop = useCallback((behavior = 'smooth') => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollTo({
        top: 0,
        behavior
      });
    }
  }, []);
  
  const scrollToElement = useCallback((elementRef, offset = 0, behavior = 'smooth') => {
    if (elementRef?.current) {
      const elementTop = elementRef.current.offsetTop - offset;
      if (scrollTargetRef.current) {
        scrollTargetRef.current.scrollTo({
          top: elementTop,
          behavior
        });
      }
    }
  }, []);
  
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollTo({
        top: scrollTargetRef.current.scrollHeight,
        behavior
      });
    }
  }, []);
  
  return {
    scrollTargetRef,
    scrollToTop,
    scrollToElement,
    scrollToBottom
  };
}; 