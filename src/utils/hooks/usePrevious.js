import { useRef, useEffect } from 'react';

/**
 * Custom hook to track previous values
 * Uses useRef to store the previous value without causing re-renders
 */
export const usePrevious = (value) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
};

/**
 * Custom hook to track multiple previous values
 */
export const usePreviousValues = (values, count = 5) => {
  const ref = useRef([]);
  
  useEffect(() => {
    ref.current = [values, ...ref.current.slice(0, count - 1)];
  }, [values, count]);
  
  return ref.current;
};

/**
 * Custom hook to detect if a value has changed
 */
export const useValueChanged = (value) => {
  const prevValue = usePrevious(value);
  return prevValue !== undefined && prevValue !== value;
}; 