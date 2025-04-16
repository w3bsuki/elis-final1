"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const socialMediaLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/authorELIS",
    icon: Facebook,
    color: "#4267B2"
  },
  {
    name: "Instagram",
    href: "https://instagram.com/authorELIS",
    icon: Instagram,
    color: "#E1306C"
  }
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialMediaLinks.map((social) => (
        <motion.div
          key={social.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link 
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center rounded-full",
              "w-10 h-10",
              "bg-white/90 dark:bg-gray-800/90",
              "border border-gray-200 dark:border-gray-700",
              "shadow-sm hover:shadow",
              "text-gray-600 dark:text-gray-300",
              "transition-colors duration-200"
            )}
            aria-label={social.name}
            style={{ 
              color: "currentColor",
              WebkitTapHighlightColor: "transparent"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = social.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "currentColor";
            }}
          >
            <social.icon className="h-5 w-5" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
} 