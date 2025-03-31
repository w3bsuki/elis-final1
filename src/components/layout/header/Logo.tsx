"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  isScrolled: boolean;
}

export function Logo({ isScrolled }: LogoProps) {
  return (
    <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
      <span className={cn(
        "font-bold tracking-wide font-playfair transition-all duration-300",
        // Conditional colors based on scroll state for visibility
        isScrolled 
          ? "text-gray-900 dark:text-white" 
          : "text-gray-900 dark:text-white", // Ensure visibility even when not scrolled on potentially light backgrounds
        // Smooth size transition
        isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
      )}>ELIS</span>
    </Link>
  );
} 