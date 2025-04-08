"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Define the shared style (or import)
const nestedGlassStyle = cn(
  "border border-border/70", 
  "shadow-inner", 
  "bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/75", 
  "text-foreground", 
  "transition-all duration-200 ease-in-out", 
  "hover:bg-background/85 hover:shadow-sm hover:border-border", 
  "active:bg-background/95 active:scale-[0.98] active:shadow-inner" 
);

type LogoProps = {
  isScrolled?: boolean;
  className?: string;
};

export function Logo({ isScrolled, className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <div className="relative flex items-center">
        {/* Apply nested style to the avatar container */}
        <div className={cn(
          nestedGlassStyle,
          "relative rounded-full overflow-hidden", // Keep shape
          // Adjust size based on scroll state dynamically if needed, or keep fixed
          isScrolled ? "w-9 h-9" : "w-10 h-10"
          )}>
          <Image 
            src="/images/avatar/avatar.jpg" 
            alt="Елис" // Changed alt text
            // Use layout="fill" and objectFit="cover" for better positioning within the div
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="ml-3 flex flex-col items-start">
          <p className={cn(
            "font-semibold text-gray-800 dark:text-gray-100 transition-all duration-300",
            isScrolled ? "text-base" : "text-lg"
          )}>Елис</p> { /* Shortened name */}
          <p className={cn(
            "text-gray-600 dark:text-gray-300 transition-all duration-300",
            isScrolled ? "text-[10px]" : "text-xs"
          )}>Психолог & Арт Терапевт</p>
        </div>
      </div>
    </Link>
  );
} 