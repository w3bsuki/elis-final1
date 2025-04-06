"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatisticItemProps } from "./types";

export function StatisticItem({ value, label, className }: StatisticItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Simple number animation
  const [displayValue, setDisplayValue] = useState("0");
  
  useEffect(() => {
    if (!isVisible) return;
    
    // Parse the numeric part of the value (e.g., "500+" -> 500)
    const numericValue = parseInt(value.replace(/\D/g, ""));
    const hasSuffix = value.includes("+");
    
    // For small numbers, just set the value directly
    if (numericValue <= 5) {
      setDisplayValue(value);
      return;
    }
    
    // Animate counting up for larger numbers
    let start = 0;
    const end = numericValue;
    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = end / totalFrames;
    
    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const current = Math.round(currentFrame * increment);
      
      if (current > end) {
        clearInterval(counter);
        setDisplayValue(hasSuffix ? `${end}+` : `${end}`);
      } else {
        setDisplayValue(hasSuffix ? `${current}+` : `${current}`);
      }
      
      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [value, isVisible]);
  
  return (
    <motion.div 
      className={cn("text-center px-2", className)}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.p 
        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 10, 
          delay: 0.1 
        }}
      >
        {displayValue}
      </motion.p>
      
      <motion.p 
        className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
} 