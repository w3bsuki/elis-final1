"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

// Define card variants
export type CardVariant = 
  | "default"    // Standard card with balanced padding
  | "compact"    // Smaller padding, more condensed
  | "feature"    // Larger padding, prominent display
  | "interactive" // With hover effects
  | "highlight"; // With accent border/styling

// Define card sizes
export type CardSize = 
  | "sm"      // Small card
  | "md"      // Medium card (default)
  | "lg"      // Large card
  | "full";   // Full width card

export interface StandardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Appearance
  variant?: CardVariant;
  size?: CardSize;
  
  // Content
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageAspectRatio?: number;
  badge?: string;
  badgeVariant?: "default" | "outline" | "secondary" | "destructive" | "premium" | "accent";
  icon?: React.ReactNode;
  
  // Actions
  href?: string;
  buttonText?: string;
  buttonVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
  onButtonClick?: () => void;
  
  // Advanced Styling
  highlight?: boolean;
  glow?: boolean;
  hoverEffect?: boolean;
  
  children?: React.ReactNode;
  className?: string;
}

export function StandardCard({
  // Set defaults
  variant = "default",
  size = "md",
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imageAspectRatio = 16/9,
  badge,
  badgeVariant = "default",
  icon,
  href,
  buttonText,
  buttonVariant = "default",
  onButtonClick,
  highlight = false,
  glow = false,
  hoverEffect = true,
  children,
  className,
  ...props
}: StandardCardProps) {
  
  // Dynamic classes based on variant and size
  const variantClasses = {
    default: "p-6",
    compact: "p-4",
    feature: "p-8",
    interactive: "p-6 cursor-pointer hover:-translate-y-1",
    highlight: "p-6 border-l-4 border-primary"
  };
  
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "w-full"
  };
  
  // Build the main container classes
  const containerClasses = cn(
    // Base card styles with neumorphic design
    "rounded-xl bg-card text-card-foreground border-border/40 bg-card/30 backdrop-blur",
    "supports-[backdrop-filter]:bg-background/60",
    "shadow-[2px_2px_4px_rgba(0,0,0,0.06),-2px_-2px_4px_rgba(255,255,255,0.8)]", 
    "dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]",
    
    // Hover effects if enabled
    hoverEffect && "hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.7)] dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.15),-1px_-1px_2px_rgba(30,30,30,0.07)]",
    
    // Add glow effect if enabled
    glow && "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-b after:from-transparent after:to-primary/5 after:opacity-0 after:transition-opacity hover:after:opacity-100",
    
    // Transition effects
    "transition-all duration-200",
    
    // Apply variant and size classes
    variantClasses[variant],
    sizeClasses[size],
    
    // Apply highlight styles if enabled
    highlight && "border-l-4 border-primary",
    
    // Additional custom classes
    className
  );
  
  // Create card content
  const CardContent = () => (
    <>
      {/* Image Section */}
      {image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <AspectRatio ratio={imageAspectRatio}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={imageAlt || title || "Card image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Badge Overlay */}
              {badge && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge variant={badgeVariant} className="px-2 py-1 text-xs font-medium">
                    {badge}
                  </Badge>
                </div>
              )}
            </div>
          </AspectRatio>
        </div>
      )}
      
      {/* Content Section */}
      <div className="flex flex-col">
        {/* Icon */}
        {icon && <div className="mb-3">{icon}</div>}
        
        {/* Title */}
        {title && (
          <h3 className="text-xl font-semibold tracking-tight mb-1">
            {title}
          </h3>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-2">
            {subtitle}
          </p>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
        )}
        
        {/* Children Content */}
        {children}
        
        {/* Action Button */}
        {(buttonText || href) && (
          <div className="mt-auto pt-4">
            <Button
              variant={buttonVariant}
              size="sm"
              onClick={onButtonClick}
              className="w-full justify-center"
              asChild={!!href}
            >
              {href ? (
                <Link href={href}>
                  {buttonText || "Learn More"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <>
                  {buttonText || "Learn More"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  );
  
  // Return as link if href is provided, otherwise as div
  return href ? (
    <Link href={href} className={cn(containerClasses, "block group relative")} {...props}>
      <CardContent />
    </Link>
  ) : (
    <div className={cn(containerClasses, "relative")} {...props}>
      <CardContent />
    </div>
  );
} 