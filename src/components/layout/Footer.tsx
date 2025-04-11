"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Heart, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  BookOpen,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
    } catch (e) {
      console.warn("Language context not available in Footer", e);
      // Keep using default language
    }
  }, []);
  
  return { language };
}

export function Footer() {
  const { language } = useSafeLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="relative bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-8 pb-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pointer-events-none" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none"></div>
      
      <div className={`${CONTAINER_WIDTH_CLASSES} relative z-10`}>
        {/* Neumorphic container with shadow effects */}
        <div className="rounded-2xl p-[5px] mb-6
            bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
            dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
            shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.7)]
            dark:shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(30,30,30,0.1)]
            overflow-hidden">
          
          {/* Inner container with gradient and shadow effects */}
          <div className="bg-gradient-to-br from-gray-50/40 via-white/40 to-gray-50/40 dark:from-gray-800/20 dark:via-gray-900/20 dark:to-gray-800/20 p-8 rounded-xl relative">
            {/* Inner shadow effect */}
            <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>

            {/* Footer top section with multiple columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-200/40 dark:border-gray-800/40 relative z-10">
              {/* Column 1: Brand info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-green-100 dark:border-green-800">
                    <Image
                      src="/images/avatar/avatar.jpg"
                      alt="Author photo"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white font-playfair">ELIS</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  {translate(
                    "Автор, философ и вдъхновител, посветен на споделянето на истории и идеи, които повдигат духа и преобразяват живота.",
                    "Author, philosopher, and inspirer dedicated to sharing stories and ideas that uplift the spirit and transform lives."
                  )}
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <a 
                    href="https://facebook.com/authorELIS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://instagram.com/authorELIS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://twitter.com/authorELIS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://youtube.com/authorELIS" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    aria-label="Youtube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
              
              {/* Column 2: Quick Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                  {translate("Бързи връзки", "Quick Links")}
                </h3>
                
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li>
                    <Link 
                      href="/about" 
                      className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {translate("За автора", "About the Author")}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/books" 
                      className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {translate("Книги", "Books")}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/events" 
                      className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {translate("Събития", "Events")}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {translate("Блог", "Blog")}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/shop" 
                      className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {translate("Книжарница", "Shop")}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                    >
                      <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      {translate("Контакти", "Contact")}
                    </Link>
                  </li>
                </ul>
              </motion.div>
              
              {/* Column 3: Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                  {translate("Контактна информация", "Contact Information")}
                </h3>
                
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {translate(
                        "ул. Г. С. Раковски 128, София 1000, България",
                        "128 G. S. Rakovski St, Sofia 1000, Bulgaria"
                      )}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <a 
                      href="mailto:contact@authorELIS.com" 
                      className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      contact@authorELIS.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Phone className="mr-3 h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <a 
                      href="tel:+35929876543" 
                      className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      +359 2 987 6543
                    </a>
                  </li>
                  <li className="flex items-center pt-2">
                    <BookOpen className="mr-3 h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span>
                      {translate(
                        "Работно време за срещи:",
                        "Office hours for meetings:"
                      )}
                    </span>
                  </li>
                  <li className="flex items-center pl-8">
                    <span>
                      {translate(
                        "Пон - Пет: 10:00 - 18:00",
                        "Mon - Fri: 10:00 AM - 6:00 PM"
                      )}
                    </span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Column 4: Newsletter */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
                  {translate("Бюлетин", "Newsletter")}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  {translate(
                    "Абонирайте се за нашия бюлетин, за да получавате новини за нови книги, събития и специални оферти.",
                    "Subscribe to our newsletter to receive updates about new books, events, and special offers."
                  )}
                </p>
                
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/30 p-3 shadow-inner">
                  <NewsletterSignup 
                    variant="accent"
                    showIcon={true}
                    className="mb-3"
                  />
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  {translate(
                    "Абонирайки се, вие се съгласявате с нашата ",
                    "By subscribing, you agree to our "
                  )}
                  <Link 
                    href="/privacy" 
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    {translate("Политика за поверителност", "Privacy Policy")}
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Footer bottom section */}
            <div className="pt-6 flex flex-col md:flex-row justify-between items-center relative z-10">
              <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
                © {currentYear} ELIS. {translate(
                  "Всички права запазени.",
                  "All rights reserved."
                )}
              </div>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/terms" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {translate("Условия за ползване", "Terms of Use")}
                </Link>
                <Link href="/privacy" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {translate("Поверителност", "Privacy Policy")}
                </Link>
                <Link href="/cookies" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  {translate("Бисквитки", "Cookie Policy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-green-600 text-white shadow-lg flex items-center justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Heart animation at the bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, -10, 0] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <Heart className="h-6 w-6 text-red-500 fill-red-500 mb-2" />
        </motion.div>
      </div>
    </footer>
  );
} 