import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to measure element dimensions
 * Uses useRef to access DOM element and measure its size
 */
export const useElementSize = () => {
  const elementRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  const updateSize = useCallback(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, []);
  
  useEffect(() => {
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [updateSize]);
  
  return { elementRef, size, updateSize };
};

/**
 * Custom hook to measure element position
 */
export const useElementPosition = () => {
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const updatePosition = useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({ 
        x: rect.left + window.scrollX, 
        y: rect.top + window.scrollY 
      });
    }
  }, []);
  
  useEffect(() => {
    updatePosition();
    
    const handleScroll = () => updatePosition();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]);
  
  return { elementRef, position, updatePosition };
}; 