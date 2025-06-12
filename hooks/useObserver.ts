import { useEffect } from 'react';

type UseObserverOptions = IntersectionObserverInit;

export default function useObserver(
  targetRef: React.RefObject<HTMLElement>,
  onIntersect: () => void,
  options?: UseObserverOptions,
) {
  useEffect(() => {
    if (!targetRef.current) {
      return undefined; // consistent-return 규칙에 맞게 undefined 반환
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    }, options);

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [targetRef, onIntersect, options]);
}
