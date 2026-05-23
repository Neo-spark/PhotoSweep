import { useState, useEffect, useRef } from 'react';

// Global cache to prevent re-fetching thumbnails that were already loaded
const thumbnailCache = new Map<string, string>();

export function useThumbnail(thumbnailPath: string | undefined) {
  const [dataUrl, setDataUrl] = useState<string | null>(
    thumbnailPath ? thumbnailCache.get(thumbnailPath) || null : null
  );
  const [loading, setLoading] = useState(!dataUrl && !!thumbnailPath);
  const [error, setError] = useState(false);
  
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thumbnailPath) {
      setLoading(false);
      return;
    }

    if (thumbnailCache.has(thumbnailPath)) {
      setDataUrl(thumbnailCache.get(thumbnailPath)!);
      setLoading(false);
      return;
    }

    let isMounted = true;
    let observer: IntersectionObserver;

    const loadThumbnail = async () => {
      try {
        const base64 = await window.api.getThumbnail(thumbnailPath);
        if (isMounted) {
          thumbnailCache.set(thumbnailPath, base64);
          setDataUrl(base64);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load thumbnail:', err);
          setError(true);
          setLoading(false);
        }
      }
    };

    if (observerRef.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadThumbnail();
          observer.disconnect();
        }
      }, { rootMargin: '200px' }); // Load slightly before it comes into view

      observer.observe(observerRef.current);
    } else {
      // Fallback if no ref provided
      loadThumbnail();
    }

    return () => {
      isMounted = false;
      if (observer) observer.disconnect();
    };
  }, [thumbnailPath]);

  return { dataUrl, loading, error, observerRef };
}
