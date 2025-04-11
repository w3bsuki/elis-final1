"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { HomeHero } from "./home-hero";
import { FeaturedContent } from "../FeaturedContent";
import BooksSection from "../BooksSection";
import ServicesSection from "../ServicesSection";
import Testimonials from "../Testimonials";
import { Contact } from "../Contact";
import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export interface HomePageProps {
  className?: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
  containerized?: boolean;
}

/**
 * HomePage component - Container for the homepage sections
 * This replaces the original Hero.tsx component which was acting as a container
 */
export function HomePage({ 
  className,
  includeHeader = true,
  includeFooter = true,
  containerized = true,
}: HomePageProps) {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  return (
    <div className={cn("flex flex-col w-full", className)}>
      {/* Optional Header */}
      {includeHeader && (
        <div className="relative w-full mb-0 rounded-xl bg-gradient-to-b from-white via-gray-50/95 to-gray-100/90 dark:from-gray-800/95 dark:via-gray-850/95 dark:to-gray-900/90 shadow-[0_4px_16px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200/80 dark:border-gray-700/60 backdrop-blur-md contained-header overflow-hidden">
          {/* Subtle inner shadow overlay */}
          <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.04)] pointer-events-none rounded-xl"></div>
          
          {/* Subtle pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
          
          {/* Subtle highlight at the top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/80 dark:bg-white/15"></div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-radial from-transparent via-transparent to-gray-100/30 dark:to-primary/5 pointer-events-none"></div>
          
          <Header containedMode={containerized} />
        </div>
      )}
      
      {/* Main Sections */}
      <div className="flex flex-col space-y-6 md:space-y-12 w-full">
        {/* Hero Section */}
        <HomeHero />
        
        {/* Featured Content */}
        <FeaturedContent />
        
        {/* Books Section */}
        <BooksSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Contact Section */}
        <Contact />
      </div>
      
      {/* Optional Footer */}
      {includeFooter && <Footer />}
    </div>
  );
}

export default HomePage; 