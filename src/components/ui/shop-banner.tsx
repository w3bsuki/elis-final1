import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function ShopBanner() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;
  
  return (
    <div className="relative overflow-hidden rounded-xl mb-6">
      {/* Enhanced neumorphic styling */}
      <div className="bg-gradient-to-br from-white/50 via-white/80 to-white/50
        dark:from-gray-900/50 dark:via-gray-800/60 dark:to-gray-900/50
        rounded-xl relative p-8 md:p-10
        border border-gray-200/50 dark:border-gray-700/50
        shadow-[inset_1px_1px_1px_rgba(255,255,255,0.7),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
        dark:shadow-[inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-br from-pink-200/20 via-purple-300/10 to-blue-300/10 dark:from-pink-800/20 dark:via-purple-900/10 dark:to-blue-900/10 rounded-bl-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-tr from-blue-200/20 via-teal-300/10 to-green-200/10 dark:from-blue-800/20 dark:via-teal-900/10 dark:to-green-900/10 rounded-tr-full blur-3xl -z-10"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] -z-5"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            {/* Enhanced badge */}
            <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-2
              bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/30 
              text-amber-700 dark:text-amber-400
              border border-amber-200/70 dark:border-amber-700/40
              shadow-sm px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">{translate("Нови предложения", "New Releases")}</span>
            </div>
            
            {/* Improved heading with gradient text */}
            <h2 className="text-2xl md:text-3xl font-bold 
              bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 
              bg-clip-text text-transparent">
              {translate("Авторска Колекция 2024", "Author Collection 2024")}
            </h2>
            
            {/* Decorative underline */}
            <div className="h-1 w-32 mx-auto md:mx-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3"></div>
            
            {/* Description text */}
            <p className="max-w-[600px] text-gray-600 dark:text-gray-300 text-base antialiased leading-relaxed">
              {translate(
                "Открийте най-новите заглавия и популярни услуги. Безплатна доставка при поръчки над 50 лв.",
                "Discover our latest titles and popular services. Free shipping on orders over 50 BGN."
              )}
            </p>
          </div>
          <motion.div 
            className="flex-shrink-0 mt-4 md:mt-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Button 
              size="lg" 
              className="relative overflow-hidden group 
                bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                text-white text-base px-6 py-3 h-auto font-medium rounded-xl
                border border-blue-500/50
                shadow-[3px_3px_6px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.1)]
                dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-2px_-2px_5px_rgba(60,60,60,0.1)]
                transition-all duration-300 hover:shadow-[1px_1px_3px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(255,255,255,0.1)]"
            >
              <div className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span>{translate("Разгледай Колекцията", "Explore Collection")}</span>
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              
              {/* Button glow effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 