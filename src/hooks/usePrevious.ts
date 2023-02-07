import { useCallback, useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): () => T => {
  const prevRef = useRef(value);

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return useCallback(() => prevRef.current, []);
};