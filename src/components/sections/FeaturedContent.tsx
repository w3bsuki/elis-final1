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
      gradientTo: "to-green-500/5"
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
      gradientTo: "to-blue-500/5"
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
      gradientTo: "to-purple-500/5"
    },
    {
      icon: "🛒",
      title: language === 'en' ? "Shop All" : "Пазарувай",
      description: language === 'en' ? "Explore all products & collections" : "Разгледайте всички продукти и колекции",
      url: "/shop/all",
      color: "amber",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      textColor: "text-amber-700 dark:text-amber-300",
      hoverBg: "hover:bg-amber-50 dark:hover:bg-amber-900/10", 
      borderColor: "border-amber-100 dark:border-amber-800/30",
      gradientFrom: "from-amber-400/10",
      gradientTo: "to-amber-500/5",
      isSpecial: true,
      specialLabel: language === 'en' ? "New Collection" : "Нова Колекция"
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
    <section className={cn("py-16", className)}>
      <div className="relative z-0">
        {/* Decorative background elements */}
        <div className="absolute right-0 top-20 w-48 h-48 bg-gradient-to-br from-green-400/10 to-green-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute left-0 bottom-20 w-48 h-48 bg-gradient-to-tr from-green-500/10 to-emerald-400/5 rounded-full blur-3xl -z-10"></div>
        
        {/* Main container - updated to match hero section */}
        <div className="w-[99.5%] max-w-none px-0 mx-auto">
          {/* Outer container with 3D nested look */}
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-green-200/40 to-emerald-100/40 dark:from-green-800/30 dark:to-emerald-900/30 shadow-xl">
            {/* Middle container */}
            <div className="p-1 rounded-lg bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-green-950/50 shadow-md">
              {/* Inner main container */}
              <div className="bg-gradient-to-br from-white/95 via-white/95 to-green-50/90 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-green-950/15 backdrop-blur-sm rounded-lg border border-green-100/50 dark:border-green-900/30 shadow-sm px-8 py-12 relative">
                {/* Subtle pattern background */}
                <div 
                  className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"
                  aria-hidden="true"
                ></div>
            
                {/* Subtle accent orbs */}
                <div className="absolute top-1/3 right-10 h-40 w-40 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/3 left-10 h-40 w-40 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
            
                {/* Inner shadow effect */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                {/* Section header */}
                <div className="text-center mb-12 relative z-10">
                  {/* Enhanced header with special badge styling */}
                  <div className="inline-flex flex-col items-center justify-center">
                    {/* Main title with badge-like appearance */}
                    <div className="relative inline-flex items-center justify-center mb-4">
                      {/* Decorative gradient blob behind the title */}
                      <div className="absolute -z-10 w-full h-full scale-150 bg-gradient-to-br from-green-400/20 via-teal-300/10 to-blue-400/5 dark:from-green-400/10 dark:via-teal-300/5 dark:to-blue-400/5 blur-2xl rounded-full"></div>
                      
                      {/* Badge container - reduced padding and size */}
                      <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                        px-5 py-3 rounded-xl
                        shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                        dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                        flex items-center gap-3 border border-green-200/50 dark:border-green-800/30">
                        
                        {/* Left icon with enhanced styling - smaller */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-300/20 blur-xl rounded-full"></div>
                          <div className="rounded-full p-2
                            bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                            border border-green-100/50 dark:border-green-800/30 relative">
                            <span className="text-xl text-green-600 dark:text-green-400">✨</span>
                          </div>
                        </div>
                        
                        {/* Title with text color changed to black - smaller */}
                        <div className="flex flex-col items-start">
                          <h2 className="text-xl md:text-2xl font-bold font-serif antialiased relative
                            text-gray-900 dark:text-white">
                            {ui.sectionTitle}
                          </h2>
                        </div>
                        
                        {/* Right icon with enhanced styling - ADD SECOND ICON */}
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
                    
                    {/* Description text - single row */}
                    <div className="max-w-3xl mx-auto mb-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base antialiased leading-relaxed">
                        {ui.sectionDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cards grid */}
                <motion.div 
                  variants={ANIMATIONS.container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10"
                >
                  {/* Map through expertise areas */}
                  {expertiseAreas.map((area, index) => (
                    <motion.div 
                      key={index}
                      variants={ANIMATIONS.item}
                      custom={index}
                      layout
                      layoutId={`card-${index}`}
                    >
                      {/* Card */}
                      <div 
                        className={cn(
                          "cursor-pointer transition-all duration-300 h-full group",
                          "focus:outline-none"
                        )}
                        onClick={() => window.location.href = area.url}
                        onKeyDown={(e) => handleCardKeyDown(e, area.url)}
                        tabIndex={0}
                        role="button"
                        aria-label={`${area.title}: ${area.description}`}
                      >
                        {/* Keep the exact card structure with hover border effect */}
                        {/* But remove any transform animations */}
                        <div className={cn(
                          "h-[320px] p-[3px] select-none rounded-xl",
                          `bg-gradient-to-br from-white/90 via-${area.color}-100/20 to-white/90 dark:from-gray-900/90 dark:via-${area.color}-900/20 dark:to-gray-900/90`,
                          "backdrop-blur-sm",
                          "shadow-[-5px_-5px_15px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.08)]", 
                          "dark:shadow-[-5px_-5px_15px_rgba(20,20,30,0.1),_5px_5px_15px_rgba(0,0,0,0.2)]",
                          "transition-all duration-300", 
                          "hover:shadow-[-2px_-2px_10px_rgba(255,255,255,0.6),_2px_2px_10px_rgba(0,0,0,0.1),_0_8px_20px_rgba(0,0,0,0.05)]", 
                          "dark:hover:shadow-[-2px_-2px_10px_rgba(20,20,30,0.15),_2px_2px_10px_rgba(0,0,0,0.3),_0_8px_20px_rgba(0,0,0,0.15)]",
                          // Add outer border with color-specific styling
                          "border-2",
                          area.color === "amber" && "border-amber-100/30 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-700",
                          area.color === "purple" && "border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700",
                          area.color === "green" && "border-green-100/30 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-700",
                          area.color === "blue" && "border-blue-100/30 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700",
                          "relative overflow-hidden"
                        )}>
                          <div className={cn(
                            "h-full w-full flex flex-col bg-white/90 dark:bg-gray-900/90 rounded-lg p-5",
                            // Inner border with color-specific styling
                            "border",
                            area.color === "amber" && "border-amber-100/30 dark:border-amber-900/30 hover:border-amber-300/50 dark:hover:border-amber-700/50",
                            area.color === "purple" && "border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300/50 dark:hover:border-purple-700/50",
                            area.color === "green" && "border-green-100/30 dark:border-green-900/30 hover:border-green-300/50 dark:hover:border-green-700/50",
                            area.color === "blue" && "border-blue-100/30 dark:border-blue-900/30 hover:border-blue-300/50 dark:hover:border-blue-700/50",
                            "shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]",
                            "dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
                          )}>
                            {/* Keep the decorative corner element */}
                            <div className={cn(
                              "absolute top-0 right-0 w-32 h-32 rounded-bl-3xl -z-1",
                              area.color === "amber" && "bg-gradient-to-bl from-amber-100/40 to-transparent dark:from-amber-900/20",
                              area.color === "purple" && "bg-gradient-to-bl from-purple-100/40 to-transparent dark:from-purple-900/20",
                              area.color === "green" && "bg-gradient-to-bl from-green-100/40 to-transparent dark:from-green-900/20",
                              area.color === "blue" && "bg-gradient-to-bl from-blue-100/40 to-transparent dark:from-blue-900/20"
                            )} />
                            
                            <div className="flex flex-col items-center text-center relative z-10">
                              {/* Special badge if applicable - with improved styling */}
                              {area.isSpecial && (
                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500/80 to-amber-600/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-amber-300/30 dark:border-amber-700/30">
                                  {area.specialLabel}
                                </div>
                              )}
                              
                              {/* Icon - Remove motion and scale animations */}
                              <div className={cn(
                                "w-20 h-20 mb-6 rounded-full flex items-center justify-center",
                                "shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]",
                                "dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]",
                                "transition-all duration-300",
                                area.iconBg,
                                area.isSpecial && "bg-gradient-to-r from-amber-200 to-amber-100 dark:from-amber-800/40 dark:to-amber-700/30"
                              )}>
                                <span className="text-4xl" aria-hidden="true">{area.icon}</span>
                              </div>
                            
                              {/* Rest of card content remains the same */}
                              <h3 className={cn(
                                "text-xl font-bold mb-3 transition-colors",
                                "text-[#171717] dark:text-white"
                              )}>
                                {area.title}
                              </h3>
                              
                              <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {area.description}
                              </p>
                              
                              {/* Button - Updated to activate on card hover with group-hover */}
                              <Button 
                                variant="ghost"
                                size="sm" 
                                className={cn(
                                  "mt-auto font-medium rounded-full transition-all duration-300",
                                  // Base text color
                                  area.color === "purple" && "text-purple-700 dark:text-purple-300",
                                  area.color === "green" && "text-green-700 dark:text-green-300", 
                                  area.color === "blue" && "text-blue-700 dark:text-blue-300",
                                  area.color === "amber" && "text-amber-700 dark:text-amber-300",
                                  // Hover state styles - now triggers on parent card hover
                                  area.color === "purple" && "group-hover:bg-purple-600 dark:group-hover:bg-purple-700 group-hover:text-white dark:group-hover:text-purple-50",
                                  area.color === "green" && "group-hover:bg-green-600 dark:group-hover:bg-green-700 group-hover:text-white dark:group-hover:text-green-50",
                                  area.color === "blue" && "group-hover:bg-blue-600 dark:group-hover:bg-blue-700 group-hover:text-white dark:group-hover:text-blue-50",
                                  area.color === "amber" && "group-hover:bg-amber-600 dark:group-hover:bg-amber-700 group-hover:text-white dark:group-hover:text-amber-50",
                                  // Special amber button styling
                                  area.isSpecial && "bg-gradient-to-r from-amber-600 to-amber-500 group-hover:from-amber-500 group-hover:to-amber-400 text-white shadow-md"
                                )}
                                asChild
                              >
                                <Link href={area.url} className="flex items-center justify-center">
                                  <span>{
                                    area.isSpecial 
                                      ? (language === 'en' ? "Shop Now" : "Пазарувай Сега") 
                                      : (language === 'en' ? "Explore" : "Разгледай")
                                  }</span>
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Newsletter Signup Section - simplify animation */}
                <motion.div
                  variants={ANIMATIONS.item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-10 max-w-4xl mx-auto"
                >
                  {/* Outer container with 3D nested look */}
                  <div className="p-1.5 rounded-xl bg-gradient-to-br from-blue-200/40 to-green-100/40 dark:from-blue-800/30 dark:to-green-900/30 shadow-xl">
                    {/* Middle container */}
                    <div className="p-1 rounded-lg bg-gradient-to-br from-white/90 via-white/80 to-blue-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-blue-950/50 shadow-md">
                      {/* Inner container */}
                      <div className="bg-gradient-to-br from-white/95 via-white/95 to-blue-50/90 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-blue-950/15 backdrop-blur-sm rounded-lg border border-blue-100/50 dark:border-blue-900/30 shadow-sm p-5 relative">
                        {/* Inner shadow effect */}
                        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                        
                        {/* Background gradient blob */}
                        <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-green-500/5 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute left-0 bottom-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-green-400/5 rounded-full blur-3xl -z-10"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr] gap-6 items-center">
                          {/* Book Image Column */}
                          <div className="relative z-10 hidden md:block">
                            <div className="relative mx-auto w-[150px] h-[190px]">
                              {/* Book glow effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-green-500/30 rounded-lg blur-xl opacity-70"></div>
                              
                              {/* Book container with 3D nested effect */}
                              <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-blue-200/40 to-green-100/40 dark:from-blue-800/30 dark:to-green-900/30 shadow-lg">
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
                            <div className="space-y-3 mb-4">
                              {/* Title with icon */}
                              <div className="flex items-center gap-2">
                                <div className="rounded-full p-1.5 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 shadow-sm flex items-center justify-center">
                                  <span className="text-blue-600 dark:text-blue-400">
                                    <Gift className="h-4 w-4" />
                                  </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                  {language === 'en' ? "Subscribe to our Newsletter" : "Абонирайте се за нашия бюлетин"}
                                </h3>
                              </div>
                              
                              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base ml-1">
                                {language === 'en' 
                                  ? "Get the latest updates and receive a free mindfulness ebook."
                                  : "Получавайте последните актуализации и безплатна книга за осъзнатост."}
                              </p>
                            </div>
                            
                            {/* Custom Newsletter Signup with better styling */}
                            <div className="flex flex-col sm:flex-row gap-3">
                              <div className="relative flex-1">
                                <input 
                                  type="email" 
                                  placeholder={language === 'en' ? "Your email address" : "Вашият имейл адрес"}
                                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-900/50 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-700 focus:outline-none transition-all"
                                />
                              </div>
                              <button
                                className="px-5 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                              >
                                <span>{language === 'en' ? "Subscribe" : "Абонирай се"}</span>
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                            
                            {/* Privacy note */}
                            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 ml-1">
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