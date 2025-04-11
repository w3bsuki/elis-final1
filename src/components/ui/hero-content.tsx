"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { heroItemVariants } from "./hero-section";
import { Button } from "./button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export interface HeroContentProps {
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  alignment?: "left" | "center" | "right";
  className?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  imageSide?: "left" | "right";
  badge?: {
    text: string;
    variant?: "default" | "outline" | "secondary";
  };
  maxWidth?: string;
}

export function HeroContent({
  title,
  titleHighlight,
  description,
  primaryCta,
  secondaryCta,
  alignment = "left",
  className,
  image,
  imageSide = "right",
  badge,
  maxWidth = "max-w-5xl",
}: HeroContentProps) {
  // Determine text alignment classes
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  // Transform the title to include highlighted part if provided
  const renderTitle = () => {
    if (!titleHighlight) return title;
    
    const titleParts = title.split(titleHighlight);
    
    return (
      <>
        {titleParts[0]}
        <span className="text-primary">{titleHighlight}</span>
        {titleParts[1] || ""}
      </>
    );
  };

  // Determine if we should use columns layout (when image is provided)
  const useColumns = !!image;

  return (
    <div className={cn(
      "w-full",
      useColumns ? 
        "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center" : 
        alignmentClasses[alignment],
      imageSide === "left" && useColumns ? "flex-row-reverse" : "",
      className
    )}>
      {/* Content Column */}
      <div className={cn(
        "flex flex-col",
        !useColumns && maxWidth,
        !useColumns && alignmentClasses[alignment],
        "space-y-5 md:space-y-6"
      )}>
        {/* Optional badge */}
        {badge && (
          <motion.div 
            variants={heroItemVariants}
            className={cn(
              alignment === "center" && "flex justify-center",
              alignment === "right" && "flex justify-end",
            )}
          >
            <span className={cn(
              "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full",
              "bg-primary/10 text-primary",
              "dark:bg-primary/20 dark:text-primary-foreground"
            )}>
              {badge.text}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1 
          variants={heroItemVariants}
          className={cn(
            "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
            "font-bold tracking-tight leading-tight",
            "text-foreground"
          )}
        >
          {renderTitle()}
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          variants={heroItemVariants}
          className={cn(
            "text-base md:text-lg",
            "text-muted-foreground",
            "max-w-3xl",
            alignment === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
        
        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <motion.div 
            variants={heroItemVariants}
            className={cn(
              "flex flex-wrap items-center gap-4 pt-2",
              alignment === "center" && "justify-center",
              alignment === "right" && "justify-end"
            )}
          >
            {primaryCta && (
              <Link href={primaryCta.href}>
                <Button size="lg" className="gap-2">
                  {primaryCta.text}
                  {primaryCta.icon || <ArrowRight className="h-4 w-4" />}
                </Button>
              </Link>
            )}
            
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button variant="outline" size="lg" className="gap-2">
                  {secondaryCta.text}
                  {secondaryCta.icon}
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </div>
      
      {/* Image Column */}
      {image && (
        <motion.div 
          variants={heroItemVariants}
          className={cn(
            "relative w-full overflow-hidden rounded-lg",
            "aspect-[4/3] md:aspect-square lg:aspect-[4/3]",
            "bg-muted"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 600}
            height={image.height || 600}
            className="object-cover w-full h-full"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Subtle overlay and border for stylistic touch */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
        </motion.div>
      )}
    </div>
  );
} 