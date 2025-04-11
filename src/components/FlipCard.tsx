import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ArrowRight, RefreshCw, X } from 'lucide-react';

interface FlipCardProps {
  frontImage: string;
  frontTitle: string;
  frontSubtitle?: string;
  frontIcon?: React.ReactNode;
  frontRibbon?: string;
  frontButton?: string;
  triggerMode?: 'click' | 'hover';
  onFlip?: () => void;
  backTitle: string;
  backDescription: string;
  backFeatures?: string[];
  backCta?: string;
  onCtaClick?: () => void;
  className?: string;
}

export default function FlipCard({
  frontImage,
  frontTitle,
  frontSubtitle,
  frontIcon,
  frontRibbon,
  frontButton,
  triggerMode = 'click',
  onFlip,
  backTitle,
  backDescription,
  backFeatures,
  backCta,
  onCtaClick,
  className,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle flip based on mode
  const handleFlip = () => {
    if (triggerMode === 'click') {
      setIsFlipped(!isFlipped);
      if (onFlip) onFlip();
    }
  };

  // Handle hover interactions
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (triggerMode === 'hover') {
      setIsFlipped(true);
      if (onFlip) onFlip();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (triggerMode === 'hover') {
      setIsFlipped(false);
    }
  };

  // Truncate title if it's very long
  const truncatedTitle = useMemo(() => {
    return frontTitle.length > 60 ? frontTitle.substring(0, 57) + '...' : frontTitle;
  }, [frontTitle]);

  return (
    <div 
      ref={cardRef}
      className={`flip-card w-full relative ${className || 'h-[380px]'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flip-card-inner w-full h-full relative transition-transform duration-500 transform-gpu ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Card - Book Cover */}
        <div 
          className="flip-card-front w-full h-full absolute bg-white dark:bg-gray-800 rounded-lg p-3 flex flex-col items-center overflow-hidden" 
          onClick={handleFlip}
        >
          {/* Ribbon if provided */}
          {frontRibbon && (
            <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-0.5 text-xs transform rotate-45 translate-x-4 translate-y-2 shadow-md">
              {frontRibbon}
            </div>
          )}
          
          {/* Cover Image Container */}
          <div className="relative w-full aspect-[3/4] mb-3 flex items-center justify-center">
            <Image 
              src={frontImage} 
              alt={frontTitle} 
              width={200} 
              height={280} 
              className="object-contain h-full w-full drop-shadow-md transition-transform duration-300 transform-gpu group-hover:scale-105"
              priority
            />
            {/* Hover effect only in click mode */}
            {triggerMode === 'click' && isHovering && (
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded flex items-center justify-center">
                {frontButton && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 
                    rounded-full bg-white/90 dark:bg-gray-800/90 text-xs
                    border border-gray-200 dark:border-gray-700 
                    text-gray-800 dark:text-gray-200 font-medium
                    shadow-sm"
                  >
                    {frontButton}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Title */}
          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm text-center mb-1.5">
            {truncatedTitle}
          </h3>
          
          {/* Subtitle/Price */}
          {frontSubtitle && (
            <div className="flex items-center gap-2 justify-center mt-auto mb-2">
              <span className="inline-flex items-center px-2 py-0.5 
                rounded-full bg-gray-100 dark:bg-gray-700 text-xs
                text-gray-800 dark:text-gray-200"
              >
                {frontIcon && <span className="mr-1 text-green-500">{frontIcon}</span>}
                {frontSubtitle}
              </span>
            </div>
          )}
          
          {/* Click to see more indicator (only in click mode) */}
          {triggerMode === 'click' && (
            <div className="text-center absolute bottom-2 inset-x-0 text-gray-400 dark:text-gray-500 text-xs flex items-center justify-center gap-1">
              <span>Click for details</span>
              <RefreshCw className="h-2.5 w-2.5" />
            </div>
          )}
        </div>
        
        {/* Back Card - Details */}
        <div 
          className="flip-card-back w-full h-full absolute bg-white dark:bg-gray-800 rounded-lg p-3 flex flex-col overflow-y-auto rotate-y-180"
          onClick={handleFlip}
        >
          {/* Title */}
          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1.5">
            {backTitle}
          </h3>
          
          {/* Separator */}
          <div className="w-12 h-0.5 bg-green-500 rounded mb-2"></div>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-xs mb-2.5 line-clamp-5">
            {backDescription}
          </p>
          
          {/* Features/Topics List */}
          {backFeatures && backFeatures.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1.5">Topics covered:</h4>
              <div className="flex flex-wrap gap-1">
                {backFeatures.map((feature, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700 
                      text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* CTA Button */}
          {backCta && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onCtaClick) onCtaClick();
              }}
              className="mt-auto self-center px-4 py-1.5 text-xs
                rounded-full bg-gradient-to-r from-green-600 to-teal-500 
                text-white font-medium shadow hover:shadow-md
                transform transition-all duration-300 hover:-translate-y-0.5
                flex items-center gap-1.5"
            >
              {backCta}
              <ArrowRight className="h-3 w-3" />
            </button>
          )}

          {/* Back Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
              transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close details"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
} 