import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to manage infinite scroll using Intersection Observer
 * @param {Function} loadMoreCallback - Action to dispatch when intersection occurs
 * @param {boolean} hasMore - Indicator if there are more items to fetch
 * @param {boolean} isLoading - Indicator if an active fetch is already in progress
 * @returns {React.RefObject} Target reference to attach to bottom element
 */
export const useInfiniteScroll = (loadMoreCallback, hasMore, isLoading) => {
  const observerRef = useRef(null);

  const targetRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreCallback();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loadMoreCallback, hasMore, isLoading]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return targetRef;
};
