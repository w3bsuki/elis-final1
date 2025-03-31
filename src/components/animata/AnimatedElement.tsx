"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, scaleUp, slideInLeft, slideInRight } from "@/lib/animations";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "fadeInUp" | "scaleUp" | "slideInLeft" | "slideInRight";
  delay?: number;
  duration?: number;
  custom?: number;
  viewport?: boolean;
  once?: boolean;
  amount?: number | "some" | "all";
}

const AnimatedElement = ({
  children,
  className,
  animation = "fadeIn", 
  delay = 0,
  duration = 0.5,
  custom = 0,
  viewport = true,
  once = true,
  amount = 0.3,
  ...props
}: AnimatedElementProps) => {
  // Get animation variant based on the animation prop
  const getVariant = () => {
    switch (animation) {
      case "fadeInUp":
        return fadeInUp;
      case "scaleUp":
        return scaleUp;
      case "slideInLeft":
        return slideInLeft;
      case "slideInRight":
        return slideInRight;
      case "fadeIn":
      default:
        return fadeIn;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView={viewport ? "visible" : undefined}
      animate={!viewport ? "visible" : undefined}
      exit={!viewport ? "hidden" : undefined}
      variants={getVariant()}
      custom={custom}
      viewport={viewport ? { once, amount } : undefined}
      transition={{ 
        duration: duration,
        delay: delay, 
        ease: "easeOut" 
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement; 