"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import Image from "next/image";

// Hero section types
export interface HeroSectionProps {
  className?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  withPattern?: boolean;
  withGradient?: boolean;
  backgroundImage?: string;
  imageAlt?: string;
  imageQuality?: number;
  imagePriority?: boolean;
}

/**
 * HeroSection component - A standardized hero section container
 * This component provides consistent styling for hero sections
 * and can be used across different pages.
 */
export function HeroSection({
  className,
  children,
  fullWidth = false,
  withPattern = true,
  withGradient = true,
  backgroundImage,
  imageAlt = "Background image",
  imageQuality = 85,
  imagePriority = true,
}: HeroSectionProps) {
  const { language } = useLanguage();
  
  // Animation variants for child components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.4
      }
    }
  };
  
  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden",
        "py-4 md:py-6 lg:py-8", // Reduced section spacing
        fullWidth ? "max-w-none" : cn(
          CONTAINER_WIDTH_CLASSES,
          "mx-auto px-4 sm:px-6 lg:px-8" // Container-aligned layout
        ),
        className
      )}
    >
      {/* Optional background image with optimized loading */}
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt={imageAlt}
            fill
            quality={imageQuality}
            priority={imagePriority}
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>
      )}
      
      {/* Optional background pattern */}
      {withPattern && (
        <div 
          className="absolute inset-0 -z-10 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.02] bg-repeat bg-[length:24px_24px] pointer-events-none"
          aria-hidden="true"
        />
      )}
      
      {/* Optional background gradient */}
      {withGradient && (
        <>
          <div className="absolute top-1/3 right-1/4 h-40 w-40 -z-10 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-1/3 left-1/4 h-40 w-40 -z-10 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        </>
      )}
      
      {/* Main content with animations */}
      <motion.div 
        className="relative z-10 space-y-8 md:space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </section>
  );
}

// Export an item variant that can be used by children for consistent animations
export const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Default export for easier imports
export default HeroSection; 