"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const socialMediaLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/authorELIS",
    icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/authorELIS",
    icon: Instagram,
  }
];

// Define the nestedGlassStyle for consistency
const nestedGlassStyle = cn(
  "border border-border/70", 
  "shadow-inner", 
  "bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/75", 
  "text-foreground", 
  "transition-all duration-200 ease-in-out", 
  "hover:bg-background/85 hover:shadow-sm hover:border-border", 
  "active:bg-background/95 active:scale-[0.98] active:shadow-inner",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 dark:focus-visible:ring-offset-background"
);

export function SocialLinks() {
  const linkStyles = cn(
    nestedGlassStyle,
    "rounded-full flex items-center justify-center h-8 w-8 text-gray-600 dark:text-gray-300 hover:text-[#4267B2] dark:hover:text-[#4267B2]"
  );

  const instagramStyles = cn(
    nestedGlassStyle,
    "rounded-full flex items-center justify-center h-8 w-8 text-gray-600 dark:text-gray-300 hover:text-[#E1306C] dark:hover:text-[#E1306C]"
  );

  return (
    <div className="flex items-center gap-2">
      <Link 
        href={socialMediaLinks[0].href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkStyles}
        aria-label={socialMediaLinks[0].name}
      >
        <Facebook className="h-4 w-4" />
      </Link>
      <Link 
        href={socialMediaLinks[1].href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={instagramStyles}
        aria-label={socialMediaLinks[1].name}
      >
        <Instagram className="h-4 w-4" />
      </Link>
    </div>
  );
} 