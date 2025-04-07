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

export function SocialLinks() {
  const linkStyles = cn(
    "transition-colors duration-200 rounded-md",
    "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
    "flex items-center justify-center h-9 w-9"
  );

  return (
    <div className="flex items-center gap-1">
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