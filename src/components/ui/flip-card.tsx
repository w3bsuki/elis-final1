"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
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
  backTitle?: string;
  subtitle?: string;
  backFeatures?: string[];
  backCta?: string;
  onCtaClick?: () => void;
  triggerMode?: "hover" | "click";
  popular?: boolean;
  rotate?: "x" | "y"; // Support x/y rotation from the animata version
  simpleMode?: boolean; // Flag to use the simpler animata style when true
}

export function FlipCard({
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
  backTitle,
  subtitle,
  backFeatures = [],
  backCta,
  onCtaClick,
  triggerMode = "hover",
  popular = false,
  rotate = "y",
  simpleMode = false,
  className,
  ...props
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Consolidated values using both naming conventions
  const finalImage = frontImage || image || "";
  const finalFrontTitle = frontTitle || title || "";
  const finalBackDescription = backDescription || description || "";
  const finalBackTitle = backTitle || subtitle || finalFrontTitle;

  // Handle flip action based on trigger mode
  const handleFlip = () => {
    if (triggerMode === "click") {
      setIsFlipped(!isFlipped);
    }
  };

  // Define rotation classes based on axis
  const rotationClass = {
    x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
    y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
  };
  
  // Use the correct rotation
  const rotateClasses = rotationClass[rotate];
  
  // If simpleMode is true, use the simpler animata style
  if (simpleMode) {
    return (
      <div className={cn("group [perspective:1000px]", className)} {...props}>
        <div
          className={cn(
            "relative h-full rounded-xl transition-all duration-500 [transform-style:preserve-3d]",
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
    );
  }

  // Default rich implementation
  return (
    <div 
      className={cn(
        "flip-card-container relative h-[450px] w-full perspective-1000",
        triggerMode === "hover" ? "flip-on-hover" : "",
        isFlipped ? "is-flipped" : "",
        className
      )} 
      onClick={handleFlip}
      {...props}
    >
      <div className={cn(
        "flip-card relative w-full h-full transition-transform duration-700 transform-style-3d", 
        triggerMode === "hover" ? rotateClasses[0] : "",
        isFlipped ? rotateClasses[1] : ""
      )}>
        {/* Front Side */}
        <div className="flip-card-front absolute w-full h-full backface-hidden">
          <div className="relative h-full rounded-xl overflow-hidden border border-primary/10 bg-white/95 dark:bg-gray-800/95 shadow-lg hover:shadow-xl transition-shadow">
            {/* Image */}
            <div className="relative h-2/3 w-full overflow-hidden">
              {typeof finalImage === 'string' && finalImage ? (
                <Image
                  src={finalImage}
                  alt={finalFrontTitle}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 h-full w-full flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            
            {/* Popular Badge */}
            {popular && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                Popular
              </div>
            )}
            
            {/* Content */}
            <div className="absolute bottom-0 w-full p-6 space-y-2">
              {frontIcon && (
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                  {frontIcon}
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground">{finalFrontTitle}</h3>
              {frontSubtitle && (
                <p className="text-sm text-muted-foreground">{frontSubtitle}</p>
              )}
              
              <div className="pt-2 text-sm text-primary font-medium flex items-center gap-1">
                Learn more <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Side */}
        <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180">
          <div className="h-full flex flex-col rounded-xl overflow-hidden border border-green-200/50 dark:border-green-800/30 bg-gradient-to-br from-green-50/80 to-white/90 dark:from-gray-800/90 dark:to-gray-900/80 shadow-xl p-4">
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-1.5 line-clamp-1">{finalBackTitle}</h3>
            
            {/* Description - using more space */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-6 flex-grow-0">{finalBackDescription}</p>
            
            {backFeatures && backFeatures.length > 0 && (
              <div className="mb-2">
                <h4 className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Details:</h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                  {backFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-1 text-xs col-span-1">
                      <div className="h-3.5 w-3.5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <ChevronRight className="h-2 w-2 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {backCta && (
              <div className="mt-auto pt-1">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onCtaClick?.();
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 py-1.5 h-auto text-sm"
                >
                  {backCta}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Add a default export for compatibility with animata version
export default FlipCard; 