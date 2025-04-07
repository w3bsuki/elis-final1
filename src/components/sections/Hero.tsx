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
import { Footer } from "@/components/layout/Footer";

// Component props type
interface HeroProps {
  includeFooter?: boolean;
}

// Export Hero as both default and named export to ensure compatibility
const Hero = ({ includeFooter = false }: HeroProps) => {
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
              
              {/* Footer Section - Conditionally rendered inside the container */}
              {includeFooter && (
                <div id="footer" className="relative pt-14 mt-16 pb-4">
                  {/* Footer divider with gradient */}
                  <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent"></div>
                  {/* Custom styled footer for inside the container */}
                  <FooterInContainer />
                </div>
              )}
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
};

// Export the component both ways
export { Hero };
export default Hero;

// Special version of the footer for inside the container
function FooterInContainer() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  const currentYear = new Date().getFullYear();
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
      
      {/* Main footer content with neumorphic design */}
      <div className="relative bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30 shadow-inner p-6">
        {/* Top footer section with grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-200/40 dark:border-gray-700/40">
          {/* Column 1: Brand info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-green-100/50 dark:border-green-800/50">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900"></div>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-playfair text-green-700 dark:text-green-300">E</div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white font-playfair">ELIS</h3>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {translate(
                "Автор, философ и вдъхновител, посветен на споделянето на истории и идеи.",
                "Author, philosopher, and inspirer dedicated to sharing stories and ideas."
              )}
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3 mt-auto">
              <a 
                href="https://facebook.com/authorELIS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://instagram.com/authorELIS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://twitter.com/authorELIS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="https://youtube.com/authorELIS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              {translate("Бързи връзки", "Quick Links")}
            </h3>
            
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <a href="/about" className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                  <svg className="mr-2 h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {translate("За автора", "About the Author")}
                </a>
              </li>
              <li>
                <a href="/books" className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                  <svg className="mr-2 h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {translate("Книги", "Books")}
                </a>
              </li>
              <li>
                <a href="/events" className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                  <svg className="mr-2 h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {translate("Събития", "Events")}
                </a>
              </li>
              <li>
                <a href="/blog" className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                  <svg className="mr-2 h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {translate("Блог", "Blog")}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              {translate("Контакти", "Contact")}
            </h3>
            
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="mr-2 h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {translate(
                    "ул. Г. С. Раковски 128, София",
                    "128 G. S. Rakovski St, Sofia"
                  )}
                </span>
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@authorELIS.com" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  contact@authorELIS.com
                </a>
              </li>
              <li className="flex items-center">
                <svg className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+35929876543" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  +359 2 987 6543
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              {translate("Бюлетин", "Newsletter")}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {translate(
                "Абонирайте се за нашия бюлетин за новини.",
                "Subscribe to our newsletter for updates."
              )}
            </p>
            
            <div className="flex">
              <input
                type="email"
                placeholder={translate("Вашият имейл", "Your email")}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md text-sm flex-grow focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-r-md text-sm transition-colors flex-shrink-0"
                aria-label={translate("Абонирай се", "Subscribe")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400 text-xs mb-3 sm:mb-0">
            © {currentYear} ELIS. {translate("Всички права запазени.", "All rights reserved.")}
          </div>
          
          <div className="flex gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
            <a href="/terms" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
              {translate("Условия", "Terms")}
            </a>
            <a href="/privacy" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
              {translate("Поверителност", "Privacy")}
            </a>
            <a href="/cookies" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
              {translate("Бисквитки", "Cookies")}
            </a>
          </div>
        </div>
        
        {/* Scroll to top button */}
        <button 
          onClick={scrollToTop}
          className="absolute -top-12 right-4 h-8 w-8 rounded-full bg-green-500 text-white shadow-md flex items-center justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all"
          aria-label="Scroll to top"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
} 