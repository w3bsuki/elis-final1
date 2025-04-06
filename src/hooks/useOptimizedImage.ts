import { useMemo } from 'react';

type ImageFormat = 'webp' | 'avif' | 'jpeg' | 'png';

interface OptimizeImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: ImageFormat;
}

/**
 * Custom hook to generate optimized image URLs
 * 
 * @param src Original image URL or path
 * @param options Optimization options
 * @returns Optimized image URL
 */
export function useOptimizedImage(src: string, options: OptimizeImageOptions = {}) {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
  } = options;

  // Memoize the URL to avoid recreating it on every render
  const optimizedSrc = useMemo(() => {
    // Handle empty or invalid src
    if (!src) return '';
    
    // Return original image for SVGs or data URLs which don't need optimization
    if (src.endsWith('.svg') || src.startsWith('data:')) {
      return src;
    }
    
    // If this is a relative URL (from public directory), prepend with base URL
    const fullSrc = src.startsWith('/') 
      ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}${src}`
      : src;
      
    // Build the optimized image URL
    const params = new URLSearchParams();
    params.append('url', fullSrc);
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    params.append('quality', quality.toString());
    params.append('format', format);
    
    return `/api/optimize-image?${params.toString()}`;
  }, [src, width, height, quality, format]);
  
  return {
    src: optimizedSrc,
    width,
    height,
    // Return additional props for better loading performance
    loading: 'lazy' as const,
    decoding: 'async' as const,
    style: { 
      backgroundColor: 'transparent',
    },
  };
}

/**
 * Standalone function to generate optimized image URL
 * Useful for static contexts where hooks can't be used
 */
export function getOptimizedImageUrl(src: string, options: OptimizeImageOptions = {}) {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
  } = options;
  
  // Handle empty or invalid src
  if (!src) return '';
  
  // Return original image for SVGs or data URLs which don't need optimization
  if (src.endsWith('.svg') || src.startsWith('data:')) {
    return src;
  }
  
  // If this is a relative URL (from public directory), use as is
  const fullSrc = src.startsWith('/') ? src : src;
    
  // Build the optimized image URL
  const params = new URLSearchParams();
  params.append('url', fullSrc);
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  params.append('quality', quality.toString());
  params.append('format', format);
  
  return `/api/optimize-image?${params.toString()}`;
} 