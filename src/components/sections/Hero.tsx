"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
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
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: custom * 0.1 
      }
    })
  };
  
  return (
    <>
      <section 
        id="hero" 
        className="w-full min-h-screen bg-white dark:bg-gray-950 overflow-hidden relative hero-below-header z-0"
        style={{ 
          marginTop: '80px', // Match header height
          scrollMarginTop: '80px' // For anchor navigation
        }}
      >
        {/* Background decorations - simplified and reduced for better performance */}
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
        
        {/* Main content container with matching width to header */}
        <div className="container mx-auto px-4 flex justify-center">
          <div className="max-w-7xl mx-auto w-full">
            {/* Hero Section - Using our new refactored component */}
            <HeroSection />
            
            {/* Book Carousel in dedicated nested container */}
            <div className="relative mt-10 mb-6" id="books">
              {/* Visual connector between containers */}
              <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary/40 to-primary/10"></div>
              
              <motion.div
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-0.5 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Container inner gradient */}
                <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
                  {/* Glass panel effect with inner shadow */}
                  <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-0">
                    {/* Books Section Component */}
                    <BooksSection />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Services Section - Directly inside main Hero container, not nested in Books container */}
            <div className="relative mt-10 mb-6" id="services">
              {/* Visual connector between sections */}
              <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary/40 to-purple-500/30"></div>
              
              {/* Services inner container with nested card design */}
              <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-0.5 overflow-hidden">
                {/* Container inner gradient */}
                <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
                  {/* Glass panel effect with inner shadow */}
                  <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-20 left-20 size-60 bg-purple-500/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-20 right-20 size-60 bg-primary/5 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-0">
                    {/* Services Section Component */}
                    <ServicesSection />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonials Section - Directly inside main Hero container */}
            <div className="relative mt-10 mb-6" id="testimonials">
              {/* Visual connector between sections */}
              <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-purple-500/30 to-blue-500/30"></div>
              
              {/* Place Testimonials directly here without extra container wrappers */}
              <Testimonials />
            </div>
            
            {/* Integrated Contact section */}
            <div className="relative mt-10 mb-6" id="contact">
              {/* Visual connector between containers */}
              <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-blue-500/30 to-green-500/30"></div>
              
              <motion.div
                className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={10}
              >
                <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-4 sm:p-6 md:p-8 relative">
                  {/* Glass panel effect */}
                  <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner"></div>
                  
                  {/* Contact component */}
                  <div className="relative z-0">
                    <Contact />
                  </div>
                </div>
              </motion.div>
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
    </>
  );
} 