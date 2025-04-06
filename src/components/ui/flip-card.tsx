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
          <div className="h-full flex flex-col rounded-xl overflow-hidden border border-primary/10 bg-white/95 dark:bg-gray-800/95 shadow-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-2">{backTitle}</h3>
            <p className="text-sm text-muted-foreground mb-4">{backDescription}</p>
            
            {backFeatures.length > 0 && (
              <div className="flex-1 overflow-auto">
                <h4 className="text-sm font-semibold mb-2">Includes:</h4>
                <ul className="space-y-2">
                  {backFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <ChevronRight className="h-3 w-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {backCta && (
              <div className="mt-auto pt-4">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onCtaClick?.();
                  }}
                  className="w-full"
                  variant="premium"
                  animation="glow"
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