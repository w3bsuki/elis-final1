import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

interface ShopBannerProps {
  className?: string;
}

export function ShopBanner({ className }: ShopBannerProps) {
  const { language, translations } = useLanguage();
  
  // Create a local translation function
  const getTranslation = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <div className={cn("bg-gradient-to-r from-primary/10 to-secondary/30 py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {ensureString(getTranslation("shopBanner.title"))}
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {ensureString(getTranslation("shopBanner.subtitle"))}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" asChild>
                <Link href="#featured-books">
                  {ensureString(getTranslation("shopBanner.browseBooks"))}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="#services">
                  {ensureString(getTranslation("shopBanner.exploreServices"))}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Visual content with staggered book images */}
          <motion.div 
            className="lg:w-1/2 relative h-[300px] md:h-[400px] w-full max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Background decorative elements */}
              <motion.div 
                className="absolute w-full h-full inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl" />
              </motion.div>
              
              {/* Main featured book */}
              <motion.div 
                className="absolute transform z-30"
                initial={{ y: 20, x: 0, rotate: -5, opacity: 0 }}
                animate={{ y: 0, x: 0, rotate: -5, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.6
                }}
                style={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transform: "rotate(-5deg)",
                  width: "180px",
                  height: "270px"
                }}
              >
                <Image
                  src="/images/books/dnevnik-na-uspeha.jpg" 
                  alt="Featured book"
                  fill
                  className="rounded-md object-cover"
                />
              </motion.div>
              
              {/* Second book */}
              <motion.div 
                className="absolute transform z-20"
                initial={{ y: 30, x: -80, rotate: 5, opacity: 0 }}
                animate={{ y: 20, x: -100, rotate: 5, opacity: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.8
                }}
                style={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transform: "rotate(5deg)",
                  width: "160px",
                  height: "240px"
                }}
              >
                <Image
                  src="/images/books/osaznato-hranene.jpg" 
                  alt="Second book"
                  fill
                  className="rounded-md object-cover"
                />
              </motion.div>
              
              {/* Third book */}
              <motion.div 
                className="absolute transform z-10"
                initial={{ y: 30, x: 80, rotate: -10, opacity: 0 }}
                animate={{ y: 40, x: 100, rotate: -10, opacity: 0.8 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 1
                }}
                style={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transform: "rotate(-10deg)",
                  width: "150px",
                  height: "225px"
                }}
              >
                <Image
                  src="/images/books/vdahnovenia-kniga-1.png" 
                  alt="Third book"
                  fill
                  className="rounded-md object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 