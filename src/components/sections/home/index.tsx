"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import HeroSection from "@/components/sections/home/hero-section";
import { FeaturedContent } from "../FeaturedContent";
import BooksSection from "../BooksSection";
import ServicesSection from "../ServicesSection";
import Testimonials from "../Testimonials";
import { Contact } from "../Contact";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";

/**
 * Component props interface
 */
export interface HomePageProps {
  /**
   * Whether to include the footer component
   * @default true
   */
  includeFooter?: boolean;
  
  /**
   * Whether to render without container width constraints
   * @default false
   */
  noContainer?: boolean;
}

/**
 * Main HomePage component that renders all sections
 * This component serves as the entry point for the homepage and coordinates the layout
 * of all major sections.
 */
export function HomePage({ includeFooter = true, noContainer = false }: HomePageProps): React.ReactElement {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Hero section in a dedicated container with minimal vertical spacing */}
      <div className={cn(
        "hero-section-container mb-0",
        "w-full max-w-none", // Remove container width classes for full width
        "px-0" // Remove horizontal padding
      )}>
        <HeroSection includeFooter={false} className="w-full" />
      </div>
      
      {/* Featured Content section */}
      <FeaturedContent />
      
      {/* Main content sections with proper vertical spacing */}
      <div className="space-y-24 py-12 md:py-20">
        <BooksSection />
        <ServicesSection />
        <Testimonials />
        <Contact />
      </div>
      
      {/* Footer section (conditionally rendered) */}
      {includeFooter && <Footer />}
    </div>
  );
}

export default HomePage; 