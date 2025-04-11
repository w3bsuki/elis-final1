import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Gift, BookOpen } from 'lucide-react';
import { NewsletterSignup } from '@/components/ui/NewsletterSignup';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

// Animations for staggered reveal with improved performance
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 12,
        mass: 0.5 
      }
    }
  }
};

interface FeaturedContentProps {
  className?: string;
}

export function FeaturedContent({ className }: FeaturedContentProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Section text translations
  const ui = useMemo(() => ({
    sectionTitle: language === 'en' ? "Featured Content" : "Препоръчано съдържание",
    sectionDescription: language === 'en' 
      ? "Explore resources to help you on your journey towards well-being."
      : "Разгледайте ресурси за вашия път към благополучие."
  }), [language]);
  
  // Define the freeEbook object that was referenced but not defined
  const freeEbook = useMemo(() => ({
    title: language === 'en' ? "Get Your Free eBook" : "Получете безплатна електронна книга",
    description: language === 'en' 
      ? "\"5 Techniques for Stress Management\" - delivered to your inbox"
      : "\"5 Техники за Справяне със Стреса\" - директно във вашата пощенска кутия",
    buttonText: language === 'en' ? "Subscribe Now" : "Абонирайте се сега"
  }), [language]);
  
  // expertise areas (the three cards)
  const expertiseAreas = useMemo(() => [
    {
      icon: "📚",
      title: language === 'en' ? "Books" : "Книги",
      description: language === 'en' ? "Self-help & growth resources" : "Ресурси за себепомощ и развитие",
      url: "/shop",
      color: "green",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-700 dark:text-green-300",
      hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/10",
      borderColor: "border-green-100 dark:border-green-800/30",
      gradientFrom: "from-green-400/10",
      gradientTo: "to-green-500/5",
      index: 0
    },
    {
      icon: "🎓",
      title: language === 'en' ? "Services" : "Услуги",
      description: language === 'en' ? "Professional therapy sessions" : "Професионални терапевтични сесии",
      url: "/services",
      color: "blue",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-700 dark:text-blue-300",
      hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/10",
      borderColor: "border-blue-100 dark:border-blue-800/30",
      gradientFrom: "from-blue-400/10",
      gradientTo: "to-blue-500/5",
      index: 1
    },
    {
      icon: "📝",
      title: language === 'en' ? "Articles" : "Статии",
      description: language === 'en' ? "Insights & practical tips" : "Прозрения и практични съвети",
      url: "/blog",
      color: "purple",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-700 dark:text-purple-300",
      hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/10", 
      borderColor: "border-purple-100 dark:border-purple-800/30",
      gradientFrom: "from-purple-400/10",
      gradientTo: "to-purple-500/5",
      index: 2
    },
    {
      icon: "🛒",
      title: language === 'en' ? "Shop All" : "Пазарувай",
      description: language === 'en' ? "Explore all products & collections" : "Разгледайте всички продукти и колекции",
      url: "/shop/all",
      color: "green",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-700 dark:text-green-300",
      hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/10", 
      borderColor: "border-green-100 dark:border-green-800/30",
      gradientFrom: "from-green-400/10",
      gradientTo: "to-green-500/5",
      isSpecial: true,
      specialLabel: language === 'en' ? "New Book" : "Нова Книга",
      index: 3
    }
  ], [language]);

  // Handle keyboard navigation for cards
  const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <div className="relative z-0">
        {/* Decorative background elements - enhance with more vibrant gradients */}
        <div className="absolute right-0 top-20 w-64 h-64 bg-gradient-to-br from-green-400/20 to-green-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute left-0 bottom-20 w-64 h-64 bg-gradient-to-tr from-green-500/20 to-emerald-400/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Main container - updated to match hero section */}
        <div className="w-[99.5%] max-w-none px-0 mx-auto">
          {/* Outer container with 3D nested look - updated to match hero */}
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-green-200/60 to-emerald-100/50 dark:from-green-700/40 dark:to-emerald-800/30 shadow-xl shadow-green-100/30 dark:shadow-green-900/30">
            {/* Middle container */}
            <div className="p-1 rounded-lg bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-green-950/50 shadow-md">
              {/* Inner main container */}
              <div className="bg-gradient-to-br from-white/95 via-white/95 to-green-50/90 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-green-950/15 backdrop-blur-sm rounded-lg border border-green-200/80 dark:border-green-800/50 shadow-sm px-5 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 relative">
                {/* Subtle pattern background */}
                <div 
                  className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"
                  aria-hidden="true"
                ></div>
            
                {/* Subtle accent orbs - improved with better positioning */}
                <div className="absolute top-1/4 right-1/6 h-40 w-40 bg-green-200/30 dark:bg-green-900/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/4 left-1/6 h-40 w-40 bg-green-100/30 dark:bg-green-900/15 rounded-full blur-3xl pointer-events-none"></div>
            
                {/* Inner shadow effect - subtle */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none opacity-50"></div>
                
                {/* Section header - simplified and more elegant */}
                <div className="text-center mb-10 relative z-10">
                  {/* Simplified header with special styling */}
                  <div className="inline-flex flex-col items-center justify-center">
                    {/* Main title */}
                    <div className="relative inline-flex items-center justify-center mb-4">
                      {/* Decorative gradient blob behind the title */}
                      <div className="absolute -z-10 w-full h-full scale-150 bg-gradient-to-br from-green-400/20 via-teal-300/10 to-blue-400/5 dark:from-green-400/10 dark:via-teal-300/5 dark:to-blue-400/5 blur-2xl rounded-full"></div>
                      
                      {/* Badge container - restored with icons */}
                      <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                        px-5 py-3 rounded-xl
                        shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                        dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                        flex items-center gap-3 border border-green-200/50 dark:border-green-800/30">
                        
                        {/* Left icon with enhanced styling */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-300/20 blur-xl rounded-full"></div>
                          <div className="rounded-full p-2
                            bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                            border border-green-100/50 dark:border-green-800/30 relative">
                            <span className="text-xl text-green-600 dark:text-green-400">🌟</span>
                          </div>
                        </div>
                        
                        {/* Title with text color changed to black */}
                        <div className="flex flex-col items-start">
                          <h2 className="text-2xl md:text-3xl font-bold font-serif antialiased relative
                            text-gray-900 dark:text-white">
                            {ui.sectionTitle}
                          </h2>
                        </div>
                        
                        {/* Right icon with enhanced styling */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-300/20 blur-xl rounded-full"></div>
                          <div className="rounded-full p-2
                            bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                            border border-blue-100/50 dark:border-blue-800/30 relative">
                            <span className="text-xl text-blue-600 dark:text-blue-400">🌟</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description text */}
                    <div className="max-w-3xl mx-auto mb-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base antialiased leading-relaxed">
                        {ui.sectionDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cards grid - improved layout */}
                <motion.div 
                  variants={ANIMATIONS.container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 max-w-6xl mx-auto relative z-10"
                >
                  {/* Map through expertise areas */}
                  {expertiseAreas.map((area, index) => (
                    <motion.div 
                      key={index}
                      variants={ANIMATIONS.item}
                      custom={index}
                      layout
                      layoutId={`card-${index}`}
                      className="h-full"
                    >
                      {/* Card with improved styling */}
                      <Link 
                        href={area.url}
                        className={cn(
                          "block h-full transition-all duration-300 group",
                          "focus:outline-none focus:ring-2 focus:ring-offset-2",
                          `focus:ring-${area.color}-500 dark:focus:ring-${area.color}-400`
                        )}
                      >
                        {/* Outer container with nested 3D look */}
                        <div className={cn(
                          "h-full p-1.5 rounded-xl",
                          area.index === 3 ? "bg-gradient-to-br from-green-200/60 to-green-100/50 dark:from-green-700/40 dark:to-green-800/30" : 
                          "bg-gradient-to-br from-gray-100/40 to-gray-50/30 dark:from-gray-700/30 dark:to-gray-800/20",
                          "shadow-xl transition-all duration-300 relative"
                        )}>
                          {/* Middle container */}
                          <div className={cn(
                            "p-1 rounded-lg h-full",
                            area.index === 3 ? "bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-green-950/50" :
                            "bg-gradient-to-br from-white/90 via-white/80 to-gray-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-gray-950/50"
                          )}>
                            {/* Inner container */}
                            <div className={cn(
                              "relative h-full rounded-lg overflow-hidden",
                              area.index === 3 ? "bg-gradient-to-br from-green-50/90 to-white/95 dark:from-gray-900/95 dark:to-green-950/20" :
                              "bg-white dark:bg-gray-800",
                              "border",
                              area.index === 3 ? "border-green-200/80 dark:border-green-800/50" : "border-gray-100 dark:border-gray-700",
                              "group-hover:border-green-200 dark:group-hover:border-green-800",
                              "shadow-sm group-hover:shadow-md transition-all duration-300",
                            )}>
                              {/* Special badge - positioned to cross the top */}
                              {area.isSpecial && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                                  <span className={cn(
                                    "inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold",
                                    "bg-green-500 text-white dark:bg-green-600",
                                    "border-2 border-white dark:border-gray-800",
                                    "shadow-lg rounded-full",
                                  )}>
                                    {area.specialLabel}
                                  </span>
                                </div>
                              )}

                              {/* Background gradient for hover effect */}
                              <div className={cn(
                                "absolute inset-0",
                                area.index === 3 ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                                "transition-opacity duration-300",
                                `bg-gradient-to-br ${area.gradientFrom} ${area.gradientTo}`
                              )}></div>

                              {/* Card content */}
                              <div className="relative z-10 p-5 flex flex-col items-center text-center h-full">
                                {/* Icon with enhanced styling */}
                                <div className={cn(
                                  "relative mb-4 transform group-hover:scale-110 transition-transform duration-300"
                                )}>
                                  {/* Icon background glow */}
                                  <div className={cn(
                                    "absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300",
                                    area.iconBg
                                  )}></div>
                                  
                                  {/* Icon container */}
                                  <div className={cn(
                                    "relative w-16 h-16 rounded-full flex items-center justify-center",
                                    area.iconBg,
                                    "border",
                                    `border-${area.color}-200/50 dark:border-${area.color}-800/30`,
                                    "shadow-sm group-hover:shadow-md transition-all duration-300"
                                  )}>
                                    <span className="text-3xl">{area.icon}</span>
                                  </div>
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-3xl font-bold mb-3 text-[#171717] dark:text-white">
                                  {area.title}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                                  {area.description}
                                </p>
                                
                                {/* Call-to-action button */}
                                <div className={cn(
                                  "mt-4 inline-flex items-center justify-center rounded-full",
                                  `text-${area.color}-700 dark:text-${area.color}-300`,
                                  `bg-${area.color}-50 dark:bg-${area.color}-900/30`,
                                  "px-3 py-1.5 text-sm font-medium",
                                  "border",
                                  `border-${area.color}-100 dark:border-${area.color}-800/30`,
                                  "group-hover:shadow-sm transition-all duration-300",
                                  "opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                                )}>
                                  <span>{language === 'en' ? 'Explore' : 'Разгледай'}</span>
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Newsletter signup section - more compact version */}
                <motion.div
                  variants={ANIMATIONS.item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-8 max-w-4xl mx-auto"
                >
                  {/* Outer container with 3D nested look */}
                  <div className="p-1.5 rounded-xl bg-gradient-to-br from-blue-200/40 to-green-100/40 dark:from-blue-800/30 dark:to-green-900/30 shadow-xl">
                    {/* Middle container */}
                    <div className="p-1 rounded-lg bg-gradient-to-br from-white/90 via-white/80 to-blue-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-blue-950/50 shadow-md">
                      {/* Inner container */}
                      <div className="bg-gradient-to-br from-white/95 via-white/95 to-blue-50/90 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-blue-950/15 backdrop-blur-sm rounded-lg border border-blue-100/50 dark:border-blue-900/30 shadow-sm p-4 relative">
                        {/* Inner shadow effect */}
                        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                        
                        {/* Background gradient blob */}
                        <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-green-500/5 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute left-0 bottom-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-green-400/5 rounded-full blur-3xl -z-10"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_2fr] gap-4 items-center">
                          {/* Book Image Column */}
                          <div className="relative z-10 hidden md:block">
                            <div className="relative mx-auto w-[120px] h-[160px]">
                              {/* Book glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-green-500/30 rounded-lg blur-xl opacity-70"></div>
                              
                              {/* Book container with 3D nested effect */}
                              <div className="relative p-1 rounded-lg bg-gradient-to-br from-blue-200/40 to-green-100/40 dark:from-blue-800/30 dark:to-green-900/30 shadow-lg">
                                <div className="p-0.5 rounded-md bg-gradient-to-br from-white/90 via-white/80 to-blue-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-blue-950/50">
                                  <AspectRatio ratio={3/4} className="bg-white dark:bg-gray-800 rounded overflow-hidden">
                                    <Image 
                                      src="/images/books/osaznato-hranene.jpg" 
                                      alt={language === 'en' ? "Free mindfulness ebook" : "Безплатна електронна книга за осъзнатост"}
                                      fill
                                      className="object-cover rounded"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-center justify-center">
                                      <span className="text-white text-xs font-bold py-1 px-2 bg-gradient-to-r from-blue-600/80 to-green-600/80 rounded-full">
                                        {language === 'en' ? "FREE EBOOK" : "БЕЗПЛАТНА Е-КНИГА"}
                                      </span>
                                    </div>
                                  </AspectRatio>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Newsletter Content Column */}
                          <div className="relative z-10">
                            <div className="space-y-2 mb-3">
                              {/* Title with icon */}
                              <div className="flex items-center gap-2">
                                <div className="rounded-full p-1.5 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 shadow-sm flex items-center justify-center">
                                  <span className="text-blue-600 dark:text-blue-400">
                                    <Gift className="h-4 w-4" />
                                  </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {language === 'en' ? "Subscribe to our Newsletter" : "Абонирайте се за нашия бюлетин"}
                                </h3>
                              </div>
                              
                              <p className="text-gray-700 dark:text-gray-300 text-sm ml-1">
                                {language === 'en' 
                                  ? "Get the latest updates and receive a free mindfulness ebook."
                                  : "Получавайте последните актуализации и безплатна книга за осъзнатост."}
                              </p>
                            </div>
                          
                            {/* Custom Newsletter Signup with better styling */}
                            <div className="flex flex-col sm:flex-row gap-2">
                              <div className="relative flex-1">
                                <input 
                                  type="email" 
                                  placeholder={language === 'en' ? "Your email address" : "Вашият имейл адрес"}
                                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-700 focus:outline-none transition-all"
                                />
                              </div>
                              <button
                                className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                              >
                                <span>{freeEbook.buttonText}</span>
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                            
                            {/* Privacy note */}
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 ml-1">
                              {language === 'en' 
                                ? "We respect your privacy. Unsubscribe at any time."
                                : "Уважаваме вашата поверителност. Отпишете се по всяко време."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 