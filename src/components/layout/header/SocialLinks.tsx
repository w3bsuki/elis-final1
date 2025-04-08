"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
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
  },
  {
    name: "Twitter",
    href: "https://twitter.com/authorELIS",
    icon: Twitter,
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
    "rounded-lg flex items-center justify-center h-10 w-10"
  );

  return (
    <div className="flex items-center gap-2">
      {socialMediaLinks.map((link) => (
        <Link 
          key={link.name}
          href={link.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={linkStyles}
          aria-label={link.name}
        >
          <link.icon className="h-5 w-5" />
        </Link>
      ))}
    </div>
  );
} 