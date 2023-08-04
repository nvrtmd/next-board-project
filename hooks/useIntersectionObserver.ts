import { useState, useEffect, RefObject } from 'react';

const useIntersectionObserver = (
  intersectRef: RefObject<HTMLDivElement>,
  options: {
    root: Element | null;
    rootMargin: string;
    threshold: number;
  },
) => {
  const [isIntersect, setIsIntersect] = useState<boolean>(false);
  const { root, rootMargin = '0px', threshold } = options;

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    const target = entries[0];
    setIsIntersect(target.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    intersectRef.current && observer.observe(intersectRef.current);

    return () => observer.disconnect();
  }, []);

  return {
    isIntersect,
  };
};

export default useIntersectionObserver;
