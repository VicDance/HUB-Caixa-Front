import { useState, useEffect, useRef, RefObject } from 'react';

export const useNearScreen = <T extends HTMLElement>(
  offset = '200px',
) => {
  const [isNear, setIsNear] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: offset },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, offset]);

  return { isNear, elementRef: elementRef as RefObject<T> };
};
