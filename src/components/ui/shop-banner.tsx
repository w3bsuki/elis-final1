import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import { BookOpen, Sparkles } from 'lucide-react';

export function ShopBanner() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;
  
  return (
    <div className="relative overflow-hidden rounded-xl mb-6
      bg-gradient-to-r from-gray-50/70 via-white/80 to-gray-50/70 
      dark:from-gray-800/70 dark:via-gray-900/80 dark:to-gray-800/70
      border border-gray-200/50 dark:border-gray-700/50
      shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9)]
      dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2)]">
      
      {/* Inner glow effect */}
      <div className="absolute inset-1 rounded-lg bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm shadow-inner pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-pink-200/20 to-purple-300/20 dark:from-pink-800/20 dark:to-purple-900/20 rounded-bl-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tr from-blue-200/20 to-teal-300/20 dark:from-blue-800/20 dark:to-teal-900/20 rounded-tr-full blur-lg"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">{translate("Нови предложения", "New Releases")}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {translate("Авторска Колекция 2024", "Author Collection 2024")}
          </h2>
          <p className="max-w-[600px] text-gray-600 dark:text-gray-300">
            {translate(
              "Открийте най-новите заглавия и популярни услуги. Безплатна доставка при поръчки над 50 лв.",
              "Discover our latest titles and popular services. Free shipping on orders over 50 BGN."
            )}
          </p>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Button 
            size="lg" 
            className="relative overflow-hidden group bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-800 dark:to-gray-900 text-white hover:from-gray-800 hover:to-gray-950 text-base px-6 py-3 h-auto font-medium rounded-xl
            shadow-[3px_3px_6px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.1)]
            dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-2px_-2px_5px_rgba(60,60,60,0.1)]
            transition-all duration-300 hover:shadow-[1px_1px_3px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(255,255,255,0.1)]"
          >
            <BookOpen className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            {translate("Разгледай Колекцията", "Explore Collection")}
            {/* Button glow effect on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>
      </div>
    </div>
  );
} 