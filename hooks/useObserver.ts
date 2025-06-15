import { useEffect, useRef } from 'react';

interface UseObserverOptions extends IntersectionObserverInit {
  hasNextPage: boolean;
  isLoading: boolean;
  onIntersect: () => Promise<unknown>;
  delay?: number;
}

export default function useObserver(
  targetRef: React.RefObject<HTMLElement>,
  {
    hasNextPage,
    isLoading,
    onIntersect,
    root = null,
    rootMargin = '500px',
    threshold = 0,
    delay = 300,
  }: UseObserverOptions,
): void {
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const target = targetRef.current;

    if (!target || !hasNextPage || isLoading) {
      return undefined; // consistent-return 룰에 맞게 명시적으로 undefined 반환
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]): void => {
      const entry = entries[0];

      if (entry?.isIntersecting && !isFetchingRef.current) {
        isFetchingRef.current = true;

        onIntersect()
          .catch(err => {
            console.error('onIntersect error:', err);
          })
          .finally(() => {
            setTimeout(() => {
              isFetchingRef.current = false;
            }, delay);
          });
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, hasNextPage, isLoading, onIntersect, root, rootMargin, threshold, delay]);
}
