"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";

export interface ProfileCardProps {
  className?: string;
  imageSrc: string;
  name: string;
  title: string;
  altText?: string;
  description?: string;
  compact?: boolean;
  badgeText?: string;
  badgePosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

/**
 * ProfileCard component - Displays author/profile information
 * Used in hero sections and about pages
 */
export function ProfileCard({
  className,
  imageSrc,
  name,
  title,
  altText,
  description,
  compact = false,
  badgeText,
  badgePosition = "top-right",
}: ProfileCardProps) {
  const { language } = useLanguage();
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-2xl",
        "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",
        "border border-gray-200/50 dark:border-gray-700/50",
        "shadow-lg hover:shadow-xl transition-shadow duration-300",
        compact ? "max-w-[280px]" : "max-w-[320px]",
        className
      )}
    >
      {/* Profile Image with Avatar Badge */}
      <div className={cn(
        "relative rounded-full overflow-hidden mb-4",
        compact ? "h-24 w-24" : "h-32 w-32"
      )}>
        <Avatar className={cn(
          "w-full h-full border-4 border-green-100 dark:border-green-900",
          compact ? "h-24 w-24" : "h-32 w-32"
        )}>
          <AvatarImage
            src={imageSrc}
            alt={altText || name}
            className="object-cover"
          />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          {badgeText && (
            <AvatarBadge position={badgePosition} className="h-7 w-auto px-2 text-xs rounded-full">
              {badgeText}
            </AvatarBadge>
          )}
        </Avatar>
      </div>
      
      {/* Profile Information */}
      <h2 className={cn(
        "font-playfair font-bold text-gray-900 dark:text-white",
        compact ? "text-xl mb-1" : "text-2xl mb-2"
      )}>
        {name}
      </h2>
      
      <h3 className={cn(
        "text-green-600 dark:text-green-400 font-medium",
        compact ? "text-sm mb-2" : "text-base mb-3"
      )}>
        {title}
      </h3>
      
      {description && (
        <p className={cn(
          "text-gray-600 dark:text-gray-300",
          compact ? "text-sm" : "text-base"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

export default ProfileCard; 