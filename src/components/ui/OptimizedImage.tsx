import { useOptimizedImage } from '@/hooks/useOptimizedImage';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type OptimizedImageFormat = 'webp' | 'avif' | 'jpeg' | 'png';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  optimizedFormat?: OptimizedImageFormat;
  optimizedQuality?: number;
  blurEffect?: boolean;
}

/**
 * OptimizedImage component with lazy loading, format optimization, and blur effect
 */
export function OptimizedImage({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  optimizedFormat = 'webp',
  optimizedQuality = 80,
  blurEffect = false,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get optimized image props
  const imageProps = useOptimizedImage(isError ? fallbackSrc : src, {
    width: typeof width === 'number' ? width : undefined,
    height: typeof height === 'number' ? height : undefined,
    quality: optimizedQuality,
    format: optimizedFormat,
  });
  
  // Apply blur effect during loading if enabled
  const blurClass = blurEffect && !isLoaded ? 'blur-sm' : 'blur-0';
  const transitionClass = 'transition-all duration-300';
  
  return (
    <Image 
      {...props}
      src={imageProps.src}
      alt={alt}
      width={width}
      height={height}
      className={`${blurClass} ${transitionClass} ${className}`}
      onError={() => setIsError(true)}
      onLoad={() => setIsLoaded(true)}
      loading={priority ? undefined : loading}
      priority={priority}
      decoding="async"
    />
  );
}

/**
 * Background image component that applies optimization
 */
export function OptimizedBackgroundImage({
  src,
  fallbackSrc = '/images/placeholder.jpg',
  optimizedFormat = 'webp',
  optimizedQuality = 80,
  className,
  children,
  ...props
}: OptimizedImageProps & { children?: React.ReactNode }) {
  const [isError, setIsError] = useState(false);
  
  // Get optimized image URL
  const imageProps = useOptimizedImage(isError ? fallbackSrc : src, {
    quality: optimizedQuality,
    format: optimizedFormat,
  });
  
  return (
    <div 
      className={className}
      style={{ 
        backgroundImage: `url(${imageProps.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...props.style,
      }}
      {...props}
    >
      <img 
        src={imageProps.src} 
        alt="" 
        className="hidden" 
        onError={() => setIsError(true)}
        aria-hidden="true"
      />
      {children}
    </div>
  );
} 