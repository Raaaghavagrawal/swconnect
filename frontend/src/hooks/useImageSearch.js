import { useState, useEffect } from 'react';

/**
 * Simple hook for image search (mock implementation)
 * Returns empty array as components have local fallback images
 */
export function useImageSearch({ queries, perPage = 6 }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Mock implementation - components use local fallback images
    setImages([]);
  }, [queries, perPage]);

  return { images };
}

