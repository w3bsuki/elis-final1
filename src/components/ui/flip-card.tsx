"use client";

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  frontImage: string;
  frontTitle: string;
  frontSubtitle?: string;
  frontIcon?: React.ReactNode;
  backTitle: string;
  backDescription: string;
  backFeatures?: string[];
  backCta?: string;
  onCtaClick?: () => void;
  triggerMode?: "hover" | "click";
  popular?: boolean;
}

export function FlipCard({
  frontImage,
  frontTitle,
  frontSubtitle,
  frontIcon,
  backTitle,
  backDescription,
  backFeatures = [],
  backCta,
  onCtaClick,
  triggerMode = "hover",
  popular = false,
  className,
  ...props
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (triggerMode === "click") {
      setIsFlipped(!isFlipped);
    }
  };

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
        (triggerMode === "hover" ? "group-hover:rotate-y-180" : ""),
        (isFlipped ? "rotate-y-180" : "")
      )}>
        {/* Front Side */}
        <div className="flip-card-front absolute w-full h-full backface-hidden">
          <div className="relative h-full rounded-xl overflow-hidden border border-primary/10 bg-white/95 dark:bg-gray-800/95 shadow-lg hover:shadow-xl transition-shadow">
            {/* Image */}
            <div className="relative h-2/3 w-full overflow-hidden">
              <Image
                src={frontImage}
                alt={frontTitle}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
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
              <h3 className="text-xl font-bold text-foreground">{frontTitle}</h3>
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
            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-1.5 line-clamp-1">{backTitle}</h3>
            
            {/* Description - using more space */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-6 flex-grow-0">{backDescription}</p>
            
            {backFeatures.length > 0 && (
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