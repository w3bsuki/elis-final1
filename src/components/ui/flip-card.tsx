"use client";

import React, { useState, useCallback, memo } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Support both naming conventions for images
  frontImage?: string;
  image?: string;
  
  // Support both naming conventions for titles
  frontTitle?: string; 
  title?: string;
  
  // Support both naming conventions for descriptions
  backDescription?: string;
  description?: string;
  
  // Other properties
  frontSubtitle?: string;
  frontIcon?: React.ReactNode;
  frontFooter?: string;
  backTitle?: string;
  backQuote?: string;
  subtitle?: string;
  backFeatures?: string[];
  backCta?: string;
  onCtaClick?: () => void;
  triggerMode?: "hover" | "click";
  popular?: boolean;
  rotate?: "x" | "y"; // Support x/y rotation from the animata version
  simpleMode?: boolean; // Flag to use the simpler animata style when true
  backComponent?: React.ReactNode; // Add support for custom back component
  frontClassName?: string; // Class name for front of card
  backClassName?: string; // Class name for back of card
}

// Optimized image component to prevent unnecessary re-renders
const OptimizedCardImage = memo(({ src, alt }: { src: string, alt: string }) => (
  <div className="h-full w-full relative">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform will-change-transform"
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    
    {/* Additional image decorations */}
    <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-black/30 to-transparent"></div>
    <div className="absolute top-3 right-3">
      <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
      </div>
    </div>
  </div>
));

OptimizedCardImage.displayName = 'OptimizedCardImage';

// Extract front side into a memoized component to prevent unnecessary re-renders
const CardFront = memo(({ 
  finalImage, 
  finalFrontTitle, 
  frontIcon, 
  frontSubtitle, 
  frontFooter, 
  frontClassName,
  popular
}: { 
  finalImage: string, 
  finalFrontTitle: string, 
  frontIcon?: React.ReactNode, 
  frontSubtitle?: string, 
  frontFooter?: string, 
  frontClassName?: string,
  popular?: boolean
}) => (
  <div className={cn("flip-card-front absolute w-full h-full backface-hidden", frontClassName)}>
    <div className="relative h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl">
      {/* Image with enhanced design and overlay gradient */}
      <div className="relative h-2/3 w-full overflow-hidden">
        {typeof finalImage === 'string' && finalImage ? (
          <OptimizedCardImage src={finalImage} alt={finalFrontTitle} />
        ) : (
          <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        )}
      </div>
      
      {/* Popular Badge - repositioned and redesigned */}
      {popular && (
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
          <span className="text-amber-100">⭐</span>
          <span>Popular</span>
        </div>
      )}
      
      {/* Content with enhanced styling */}
      <div className="absolute bottom-0 w-full p-6 space-y-2 bg-gradient-to-t from-white via-white/95 to-white/0 dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800/0">
        {frontIcon && (
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full 
            bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
            text-green-600 dark:text-green-400 mb-2
            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
            border border-green-100/50 dark:border-green-800/30">
            {frontIcon}
          </div>
        )}
        
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white drop-shadow-md leading-tight line-clamp-2">{finalFrontTitle}</h3>
          
          {frontSubtitle && (
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{frontSubtitle}</p>
            </div>
          )}
          
          {frontFooter && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="text-sm sm:text-base font-medium text-green-600 dark:text-green-400 flex items-center">
                <span className="text-xs text-green-500 dark:text-green-400 mr-1">лв</span>
                {frontFooter}
              </div>
              
              <div className="text-xs text-white px-2 py-0.5 rounded bg-green-500 dark:bg-green-600 shadow-sm">
                В наличност
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-3 text-sm text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1.5">
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">Flip</span>
          <span>за повече детайли</span>
          <ArrowRight className="h-3 w-3 text-green-500" />
        </div>
      </div>
    </div>
  </div>
));

CardFront.displayName = 'CardFront';

// Extract simple style component into a memoized component
const SimpleFlipCard = memo(({ 
  finalImage, 
  finalFrontTitle, 
  finalBackTitle, 
  finalBackDescription, 
  className, 
  triggerMode, 
  isFlipped, 
  rotateClasses 
}: {
  finalImage: string,
  finalFrontTitle: string,
  finalBackTitle: string,
  finalBackDescription: string,
  className?: string,
  triggerMode: "hover" | "click",
  isFlipped: boolean,
  rotateClasses: string[]
}) => (
  <div className={cn("group [perspective:1000px]", className)}>
    <div
      className={cn(
        "relative h-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] will-change-transform",
        triggerMode === "hover" ? rotateClasses[0] : "",
        isFlipped ? rotateClasses[1] : "",
      )}
    >
      {/* Front */}
      <div className="absolute h-full w-full [backface-visibility:hidden]">
        <img
          src={finalImage}
          alt={finalFrontTitle}
          className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
        />
        <div className="absolute bottom-3 left-3 right-3 text-base font-bold text-white line-clamp-2 bg-black/30 p-1 rounded backdrop-blur-sm">{finalFrontTitle}</div>
      </div>

      {/* Back */}
      <div
        className={cn(
          "absolute h-full w-full rounded-xl bg-black/80 p-3 text-slate-200 [backface-visibility:hidden]",
          rotateClasses[1],
        )}
      >
        <div className="flex min-h-full flex-col gap-1">
          <h1 className="text-base font-bold text-white">{finalBackTitle}</h1>
          <p className="mt-1 border-t border-t-gray-200 py-2 text-xs font-medium leading-normal text-gray-100 overflow-y-auto max-h-[80%]">
            {finalBackDescription}
          </p>
        </div>
      </div>
    </div>
  </div>
));

SimpleFlipCard.displayName = 'SimpleFlipCard';

// Main FlipCard component now optimized with memoization
export const FlipCard = memo(function FlipCard({
  // Handle both naming conventions with defaults
  frontImage,
  image,
  frontTitle,
  title,
  backDescription,
  description,
  
  // Other properties
  frontSubtitle,
  frontIcon,
  frontFooter,
  backTitle,
  backQuote,
  subtitle,
  backFeatures = [],
  backCta,
  onCtaClick,
  triggerMode = "hover",
  popular = false,
  rotate = "y",
  simpleMode = false,
  backComponent, // Add support for custom back component
  frontClassName,
  backClassName,
  className,
  ...props
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Consolidated values using both naming conventions
  const finalImage = frontImage || image || "";
  const finalFrontTitle = frontTitle || title || "";
  const finalBackDescription = backDescription || description || "";
  const finalBackTitle = backTitle || subtitle || finalFrontTitle;

  // Handle flip action based on trigger mode - use useCallback to optimize event handler
  const handleFlip = useCallback(() => {
    if (triggerMode === "click") {
      setIsFlipped(prev => !prev);
    }
  }, [triggerMode]);

  // Handle CTA click with useCallback
  const handleCtaClick = useCallback(() => {
    if (onCtaClick) {
      onCtaClick();
    }
  }, [onCtaClick]);

  // Define rotation classes based on axis - moved outside of render for optimization
  const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
  };
  
  // Use the correct rotation
  const rotateClasses = rotationClass[rotate];
  
  // If simpleMode is true, use the simpler animata style
  if (simpleMode) {
    return (
      <SimpleFlipCard 
        finalImage={finalImage}
        finalFrontTitle={finalFrontTitle}
        finalBackTitle={finalBackTitle}
        finalBackDescription={finalBackDescription}
        className={className}
        triggerMode={triggerMode}
        isFlipped={isFlipped}
        rotateClasses={rotateClasses}
        {...props}
      />
    );
  }

  // Default rich implementation
  return (
    <div 
      className={cn(
        "flip-card-container relative h-[450px] w-full",
        className
      )} 
      onClick={handleFlip}
      {...props}
    >
      <div className={cn(
        "flip-card relative w-full h-full", 
        triggerMode === "hover" ? "hover-trigger" : "",
        isFlipped ? "is-flipped" : ""
      )}>
        {/* Front Side - Using memoized component */}
        <CardFront 
          finalImage={finalImage}
          finalFrontTitle={finalFrontTitle}
          frontIcon={frontIcon}
          frontSubtitle={frontSubtitle}
          frontFooter={frontFooter}
          frontClassName={frontClassName}
          popular={popular}
        />
        
        {/* Back Side - Improved design */}
        <div className={cn("flip-card-back absolute w-full h-full backface-hidden", backClassName)}>
          {backComponent ? (
            backComponent
          ) : (
            <div className="h-full flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl p-5">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{finalBackTitle}</h3>
              
              {/* Description - using more space with controlled max height and scroll */}
              <div className="flex-grow overflow-y-auto pb-4 pr-1">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{finalBackDescription}</p>
                
                {/* Quote if available */}
                {backQuote && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-2 border-green-500">
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{backQuote}"</p>
                  </div>
                )}
                
                {/* Features list */}
                {backFeatures.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {backFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <ChevronRight className="h-4 w-4 mr-1 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* CTA Button */}
              {(backCta || onCtaClick) && (
                <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <Button 
                    onClick={handleCtaClick}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    {backCta || "Learn More"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

FlipCard.displayName = "FlipCard";

// Add a default export for compatibility with animata version
export default FlipCard; 