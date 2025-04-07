"use client";

import { useState, useCallback, useEffect } from "react";
import { Feather, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

// Import the extracted section components
import { HeroSection } from "./HeroSection";
import BooksSection from "./BooksSection";
import ServicesSection from "./ServicesSection";
import Testimonials from "./Testimonials";
import { Contact } from "./Contact";

export default function Hero() {
  const { language } = useLanguage();
  
  // Section connector component for visual connectors between sections
  const SectionConnector = ({ fromColor, toColor }: { fromColor: string; toColor: string }) => (
    <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-{fromColor}/30 to-{toColor}/30"></div>
  );
  
  return (
    <section 
      id="hero" 
      className="w-full min-h-screen bg-white dark:bg-gray-950 overflow-hidden relative hero-below-header z-0"
      style={{ 
        marginTop: '80px', // Match header height
        scrollMarginTop: '80px' // For anchor navigation
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 rotate-12 opacity-20 dark:opacity-10">
          <Feather className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute bottom-20 right-10 -rotate-12 opacity-20 dark:opacity-10">
          <Sparkle className="h-12 w-12 text-amber-500" />
        </div>
      </div>
      
      {/* Single main container for all sections */}
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 p-5 sm:p-6 md:p-8 relative">
            {/* Glass panel effect with inner shadow */}
            <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
            
            {/* Main content wrapper */}
            <div className="relative z-0 space-y-16">
              {/* Hero Intro Section */}
              <div id="intro">
                <HeroSection />
              </div>
              
              {/* Books Section with divider */}
              <div id="books" className="relative pt-6">
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
                <BooksSection />
              </div>
              
              {/* Services Section with divider */}
              <div id="services" className="relative pt-6">
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                <ServicesSection />
              </div>
              
              {/* Testimonials Section with divider */}
              <div id="testimonials" className="relative pt-6">
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <Testimonials />
              </div>
              
              {/* Contact Section with divider */}
              <div id="contact" className="relative pt-6">
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <Contact />
              </div>
            </div>
          </div>
        </div>
          
        {/* Background wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 overflow-hidden pointer-events-none">
          <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path className="fill-white dark:fill-gray-950" d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
} 