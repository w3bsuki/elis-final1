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

// Component props type
export interface HomePageProps {
  includeFooter?: boolean;
  noContainer?: boolean;
}

/**
 * HomePage component with optimized layout and better viewport fit
 */
export function HomePage({ includeFooter = true, noContainer = false }: HomePageProps) {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Completely unconstrained full width hero */}
      <HeroSection includeFooter={false} />
      
      {/* Featured Content section */}
      <FeaturedContent />
      
      {/* Main content sections */}
      <div className="space-y-24 py-12 md:py-20">
        <BooksSection />
        <ServicesSection />
        <Testimonials />
        <Contact />
      </div>
      
      {/* Footer */}
      {includeFooter && <Footer />}
    </div>
  );
}

export default HomePage; 