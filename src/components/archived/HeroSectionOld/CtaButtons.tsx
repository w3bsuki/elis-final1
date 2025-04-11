"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { CtaButtonsProps } from "./types";

export function CtaButtons({ 
  primaryLabel, 
  primaryHref, 
  secondaryLabel, 
  secondaryHref, 
  className 
}: CtaButtonsProps) {
  const { language } = useLanguage();
  
  // Determine the current label based on language
  const primaryText = language === 'en' ? primaryLabel.en : primaryLabel.bg;
  const secondaryText = language === 'en' ? secondaryLabel.en : secondaryLabel.bg;
  
  // Track clicks for analytics
  const trackClick = (buttonType: 'primary' | 'secondary') => {
    // This would connect to your analytics system
    // Example: analytics.track('button_click', { type: buttonType });
    console.log(`Button clicked: ${buttonType}`);
  };
  
  return (
    <motion.div 
      className={cn("flex flex-wrap gap-4", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 0.3
      }}
    >
      <Button 
        asChild
        size="lg" 
        className="rounded-full gap-2 text-base relative group overflow-hidden"
        onClick={() => trackClick('primary')}
      >
        <Link href={primaryHref}>
          <span className="relative z-10 flex items-center">
            {primaryText}
            <motion.span
              initial={{ x: -5, opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "mirror", 
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.span>
          </span>
          
          {/* Hover effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary w-full h-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
        </Link>
      </Button>
      
      <Button 
        asChild
        variant="outline" 
        size="lg" 
        className="rounded-full gap-2 text-base relative group"
        onClick={() => trackClick('secondary')}
      >
        <Link href={secondaryHref}>
          <span className="relative z-10">
            {secondaryText}
          </span>
          
          {/* Hover effect */}
          <span className="absolute inset-0 bg-primary/10 dark:bg-primary/20 w-full h-full rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
        </Link>
      </Button>
    </motion.div>
  );
} 