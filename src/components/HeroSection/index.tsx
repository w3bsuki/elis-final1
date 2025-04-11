"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { HeroProfile } from "./HeroProfile";
import { FeaturedBook } from "./FeaturedBook";
import { HeroSectionProps } from "./types";

/**
 * HeroSection - Main hero component with EXACT same structure as BooksSection
 */
export function HeroSection({ className, includeFooter = false }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLanguage();
  
  // Translate function - same as BooksSection
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Home') {
        window.scrollTo({
          top: 0,
          behavior: shouldReduceMotion ? 'auto' : 'smooth'
        });
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldReduceMotion]);
  
  return (
    <div className="relative z-0 h-[90vh] flex flex-col justify-center">
      {/* Green-tinted decorative background element - EXACT copy from BooksSection */}
      <div className="absolute right-0 top-8 w-48 h-48 bg-gradient-to-br from-green-400/10 to-teal-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-8 w-48 h-48 bg-gradient-to-tr from-green-500/10 to-emerald-400/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Enhanced Hero Container with nested neumorphic styling - EXACT copy from BooksSection */}
      <div className="rounded-2xl p-[3px] w-full flex-grow flex flex-col
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
          overflow-hidden">
        
        {/* Inner container with gradient and shadow effects - EXACT copy from BooksSection */}
        <div className="bg-gradient-to-br from-green-50/30 via-white/40 to-green-50/30 dark:from-green-900/20 dark:via-gray-900/20 dark:to-green-900/20 px-8 py-10 rounded-xl relative flex-grow flex flex-col justify-center">
          {/* Inner shadow effect - EXACT copy from BooksSection */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          {/* Main content - using same grid structure as BooksSection */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center flex-grow max-w-6xl mx-auto w-full">
            {/* Left column - Profile (using 7-span like BooksSection) */}
            <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center md:pr-6">
              <HeroProfile />
            </div>
            
            {/* Right column - Featured book (using 5-span like BooksSection) */}
            <div className="md:col-span-5 lg:col-span-5 flex flex-col items-center justify-center md:pl-4">
              <FeaturedBook />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection; 