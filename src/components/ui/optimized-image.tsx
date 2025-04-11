"use client";

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

export interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  /**
   * Fallback image to show if the main image fails to load
   */
  fallbackSrc?: string;
  
  /**
   * Apply blur effect while loading
   */
  blurEffect?: boolean;
  
  /**
   * Image format to use for optimization
   */
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  
  /**
   * Quality level for image optimization (0-100)
   */
  quality?: number;
  
  /**
   * Optional CSS class for the container
   */
  containerClassName?: string;
  
  /**
   * Optional placeholder component shown while image is loading
   */
  placeholder?: React.ReactNode;
  
  /**
   * Optional error component shown if image fails to load
   */
  errorComponent?: React.ReactNode;
}

/**
 * OptimizedImage component with lazy loading, blur effect, and error handling
 * Provides consistent image loading behavior across the application
 */
export function OptimizedImage({
  src,
  alt = "",
  width,
  height,
  fallbackSrc = '/images/placeholder.jpg',
  blurEffect = true,
  format = 'webp',
  quality = 80,
  className,
  containerClassName,
  placeholder,
  errorComponent,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  
  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setImageSrc(src);
  }, [src]);
  
  // Generate optimized image URL if needed
  const optimizeImageUrl = (url: string) => {
    // If it's an external URL or data URL, return as is
    if (url.startsWith('http') || url.startsWith('data:')) {
      return url;
    }
    
    // For internal images, add optimization parameters
    const params = new URLSearchParams();
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    params.append('quality', quality.toString());
    params.append('format', format);
    
    return `/api/optimize-image?url=${encodeURIComponent(url)}&${params.toString()}`;
  };
  
  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  // Handle image load error
  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
    setImageSrc(fallbackSrc);
  };
  
  // Determine image blur class based on loading state and blur effect setting
  const blurClass = blurEffect && isLoading ? 'blur-sm' : 'blur-0';
  
  // Default error component if none provided
  const defaultErrorComponent = (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="flex flex-col items-center text-gray-400">
        <ImageOff className="h-8 w-8 mb-2" />
        <span className="text-xs">Image not available</span>
      </div>
    </div>
  );
  
  // Default loading placeholder if none provided
  const defaultPlaceholder = (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
  );
  
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Show placeholder while loading */}
      {isLoading && (
        <div className="absolute inset-0 z-10">
          {placeholder || defaultPlaceholder}
        </div>
      )}
      
      {/* Show error component if image failed to load */}
      {isError && (
        <div className="absolute inset-0 z-20">
          {errorComponent || defaultErrorComponent}
        </div>
      )}
      
      {/* Actual image element */}
      <Image
        src={isError ? fallbackSrc : optimizeImageUrl(imageSrc)}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          blurClass,
          "transition-all duration-300",
          isError ? "opacity-0" : "opacity-100",
          className
        )}
        onLoadingComplete={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
} 