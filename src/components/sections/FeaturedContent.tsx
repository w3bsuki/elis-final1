import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { ChevronRight, Gift, BookOpen, Sparkles } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

/**
 * Animation configuration for staggered reveal effects
 */
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.06,
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
        stiffness: 70, 
        damping: 12,
        mass: 0.5 
      }
    }
  }
};

/**
 * UI text content type definition
 */
interface UiContent {
  sectionTitle: string;
  sectionDescription: string;
}

/**
 * Free eBook promo content type definition
 */
interface FreeEbookContent {
  title: string;
  description: string;
  buttonText: string;
}

/**
 * Expertise area card data structure
 */
interface ExpertiseArea {
  /** Icon emoji or string */
  icon: string;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Link destination */
  url: string;
  /** Base color theme for styling */
  color: string;
  /** Icon background style */
  iconBg: string;
  /** Text color style */
  textColor: string;
  /** Hover background style */
  hoverBg: string;
  /** Border color style */
  borderColor: string;
  /** Gradient from style */
  gradientFrom: string;
  /** Gradient to style */
  gradientTo: string;
  /** Icon gradient style */
  iconGradient: string;
  /** Card index for animation timing */
  index: number;
  /** Whether card is marked as special */
  isSpecial?: boolean;
  /** Special label text if applicable */
  specialLabel?: string;
}

/**
 * FeaturedContent component props
 */
interface FeaturedContentProps {
  /** Optional className for custom styling */
  className?: string;
}

/**
 * FeaturedContent section component
 * Displays a grid of featured content cards for different expertise areas
 */
export function FeaturedContent({ className }: FeaturedContentProps): React.ReactElement {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Section text translations
  const ui = useMemo<UiContent>(() => ({
    sectionTitle: language === 'en' ? "Featured Content" : "Препоръчано съдържание",
    sectionDescription: language === 'en' 
      ? "Explore resources to help you on your journey towards well-being."
      : "Разгледайте ресурси за вашия път към благополучие."
  }), [language]);
  
  // Define the freeEbook object that was referenced but not defined
  const freeEbook = useMemo<FreeEbookContent>(() => ({
    title: language === 'en' ? "Get Your Free eBook" : "Получете безплатна електронна книга",
    description: language === 'en' 
      ? "\"5 Techniques for Stress Management\" - delivered to your inbox"
      : "\"5 Техники за Справяне със Стреса\" - директно във вашата поща",
    buttonText: language === 'en' ? "Subscribe Now" : "Абонирайте се сега"
  }), [language]);
  
  // Expertise areas (the cards)
  const expertiseAreas = useMemo<ExpertiseArea[]>(() => [
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
      iconGradient: "from-green-400 to-emerald-500",
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
      iconGradient: "from-blue-400 to-blue-600",
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
      iconGradient: "from-purple-400 to-purple-600",
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
      iconGradient: "from-amber-400 to-amber-600",
      isSpecial: true,
      specialLabel: language === 'en' ? "New Book" : "Нова Книга",
      index: 3
    }
  ], [language]);

  /**
   * Handle keyboard navigation for accessibility
   * @param e - Keyboard event
   * @param url - Destination URL
   */
  const handleCardKeyDown = (e: React.KeyboardEvent, url: string): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <section 
      className={cn("w-full py-8 md:py-12", className)}
      aria-labelledby="featured-content-title"
    >
      <div className="relative z-0">
        {/* Decorative background elements - optimized with will-change */}
        <div className="absolute right-[10%] top-[10%] w-[500px] h-[500px] bg-gradient-to-br from-green-300/30 via-emerald-200/30 to-teal-300/30 rounded-full blur-[96px] -z-10 will-change-transform will-change-opacity"></div>
        <div className="absolute left-[5%] bottom-[20%] w-[400px] h-[400px] bg-gradient-to-tr from-emerald-200/30 via-green-300/30 to-teal-200/30 rounded-full blur-[96px] -z-10 will-change-transform will-change-opacity"></div>
        
        {/* Main container */}
        <div className="w-full h-full flex flex-col rounded-2xl sm:rounded-3xl
            bg-gradient-to-br from-white/80 via-white/90 to-white/80 
            dark:from-gray-900/90 dark:via-gray-900/95 dark:to-gray-900/90
            border border-white/40 dark:border-white/10
            shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]
            dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
            overflow-hidden
            max-w-[1600px] mx-auto">
          
          {/* Inner container with enhanced gradients */}
          <div className="bg-gradient-to-br from-green-50/40 via-transparent to-emerald-50/40 
              dark:from-green-900/20 dark:via-transparent dark:to-emerald-900/20 
              px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-8 md:py-10 lg:py-12 relative flex-grow flex flex-col">
            
            {/* Accent gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none"></div>
            
            {/* Content Container */}
            <div className="relative z-10 w-full">
              {/* Section header with improved accessibility */}
              <div className="text-center mb-8 md:mb-10 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex flex-col items-center justify-center"
                  style={{
                    willChange: "opacity, transform",
                    transform: "translateZ(0)"
                  }}
                >
                  {/* Section badge/pill - improved with more premium styling */}
                  <div 
                    className="flex items-center gap-2 px-4 py-2.5 
                      bg-gradient-to-r from-green-100 to-green-50/90 dark:from-green-900/50 dark:to-green-900/30 
                      rounded-full mb-4 
                      border border-green-200/60 dark:border-green-800/40
                      shadow-md backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    <div className="rounded-full p-1 bg-gradient-to-br from-green-500 to-emerald-600 shadow-inner flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {language === 'en' ? "Bestsellers" : "Бестселъри"}
                    </span>
                  </div>
                  
                  {/* Main title - with proper ID for accessibility */}
                  <h2 
                    id="featured-content-title"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                      text-gray-900 dark:text-white"
                  >
                    {ui.sectionTitle}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
                    {ui.sectionDescription}
                  </p>
                </motion.div>
              </div>

              {/* Cards grid with improved accessibility and animation */}
              <motion.div 
                variants={ANIMATIONS.container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
                style={{
                  willChange: "opacity, transform",
                  transform: "translateZ(0)"
                }}
                aria-label={language === 'en' ? "Featured content categories" : "Категории с препоръчано съдържание"}
                role="list"
              >
                {/* Map through expertise areas */}
                {expertiseAreas.map((area, index) => {
                  // Extract static class string to avoid interpolation issues
                  const cardHoverBorder = area.color === "green" 
                    ? "group-hover:border-green-300/70 dark:group-hover:border-green-700/50"
                    : area.color === "blue"
                      ? "group-hover:border-blue-300/70 dark:group-hover:border-blue-700/50"
                      : "group-hover:border-purple-300/70 dark:group-hover:border-purple-700/50";
                      
                  const cardTopStrip = area.color === "green"
                    ? "h-1.5 w-[30%] bg-gradient-to-r from-green-400 to-green-500/80 dark:from-green-500 dark:to-green-600/80 transition-all duration-300 ease-out"
                    : area.color === "blue"
                      ? "h-1.5 w-[30%] bg-gradient-to-r from-blue-400 to-blue-500/80 dark:from-blue-500 dark:to-blue-600/80 transition-all duration-300 ease-out"
                      : "h-1.5 w-[30%] bg-gradient-to-r from-purple-400 to-purple-500/80 dark:from-purple-500 dark:to-purple-600/80 transition-all duration-300 ease-out";
                      
                  const cardDescBgHover = area.color === "green"
                    ? "group-hover:bg-green-50/50 dark:group-hover:bg-green-900/10"
                    : area.color === "blue"
                      ? "group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10"
                      : "group-hover:bg-purple-50/50 dark:group-hover:bg-purple-900/10";
                      
                  const exploreTagBg = area.color === "green"
                    ? "px-3 py-1.5 rounded-md bg-green-50 dark:bg-green-900/20 text-sm font-medium text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-800/30"
                    : area.color === "blue"
                      ? "px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-900/20 text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30"
                      : "px-3 py-1.5 rounded-md bg-purple-50 dark:bg-purple-900/20 text-sm font-medium text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/30";
                      
                  const exploreIconBg = area.color === "green"
                    ? "rounded-full w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900/40 transition-colors duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800/60 shadow-sm"
                    : area.color === "blue"
                      ? "rounded-full w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 transition-colors duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60 shadow-sm"
                      : "rounded-full w-8 h-8 flex items-center justify-center bg-purple-100 dark:bg-purple-900/40 transition-colors duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/60 shadow-sm";
                      
                  const gradientBg = area.color === "green"
                    ? "bg-gradient-to-br from-green-400/10 to-green-500/5"
                    : area.color === "blue"
                      ? "bg-gradient-to-br from-blue-400/10 to-blue-500/5"
                      : "bg-gradient-to-br from-purple-400/10 to-purple-500/5";
                      
                  const iconGradient = area.color === "green"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500"
                    : area.color === "blue"
                      ? "bg-gradient-to-r from-blue-400 to-blue-600"
                      : "bg-gradient-to-r from-purple-400 to-purple-600";
                      
                  const iconGradientBg = area.color === "green"
                    ? "bg-gradient-to-br from-green-400 to-emerald-500"
                    : area.color === "blue"
                      ? "bg-gradient-to-br from-blue-400 to-blue-600"
                      : "bg-gradient-to-br from-purple-400 to-purple-600";
                  
                  return (
                    <motion.div 
                      key={index}
                      variants={ANIMATIONS.item}
                      className="h-full group relative"
                      role="listitem"
                      style={{
                        willChange: "opacity, transform",
                        transform: "translateZ(0)"
                      }}
                    >
                      {/* Card with enhanced glass morphism styling and border effects */}
                      <div className={`relative rounded-xl overflow-hidden h-full
                        ${area.index === 3 ? 
                          "bg-white/40 dark:bg-gray-800/40" : 
                          "bg-white/40 dark:bg-gray-800/40"}
                        backdrop-blur-md
                        border border-white/30 dark:border-gray-700/50
                        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                        dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                        group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] 
                        dark:group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                        transition-all duration-300 ease-out
                        ${cardHoverBorder}`}>
                        
                        {/* Color accent strip at top with animated width */}
                        <div className="group-hover:[&>div:first-child]:w-full absolute top-0 left-0 right-0">
                          <div className={cardTopStrip}></div>
                        </div>
                        
                        {/* Link wrapper with improved accessibility */}
                        <Link 
                          href={area.url}
                          className="block h-full relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 rounded-xl"
                          onKeyDown={(e) => handleCardKeyDown(e, area.url)}
                          aria-label={`${area.title}: ${area.description}`}
                        >
                          {/* Subtle animated gradient background */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradientBg}`}>
                          </div>
                          
                          {/* Special badge for featured item with improved visibility */}
                          {area.isSpecial && (
                            <div className="absolute top-3 right-3 z-30">
                              <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold
                                bg-gradient-to-r from-amber-500 to-amber-600 text-white
                                rounded-full shadow-lg" 
                                aria-label={area.specialLabel}>
                                {area.specialLabel}
                              </span>
                            </div>
                          )}
                          
                          {/* Card content */}
                          <div className="flex flex-col items-center text-center h-full relative z-10 p-6 pt-7">
                            {/* Icon with simplified hover effect */}
                            <div className="relative mb-6 mt-2" aria-hidden="true">
                              {/* Glow effect that appears on hover */}
                              <div className={`absolute -inset-2 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 
                                blur-xl ${iconGradient}`}></div>
                              
                              {/* Icon container with glass morphism */}
                              <div className={`relative w-16 h-16 rounded-full flex items-center justify-center
                                ${iconGradientBg}
                                text-white
                                shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]
                                dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]
                                group-hover:shadow-md 
                                transition-all duration-500
                                will-change-transform will-change-shadow`}
                                style={{ transform: "translateZ(0)" }}>
                                <span className="text-3xl">{area.icon}</span>
                              </div>
                            </div>
                            
                            {/* Title with absolutely NO movement or transitions that could cause movement - centered and larger */}
                            <h3 className="text-[1.4rem] sm:text-[1.6rem] font-bold mb-3 text-gray-900 dark:text-white w-full text-center">
                              {area.title}
                            </h3>
                            
                            {/* Description with subtle background effect - no text movement */}
                            <div className={`bg-white/50 dark:bg-gray-800/20 rounded-lg p-3 mb-4 w-full
                              ${cardDescBgHover}
                              transition-colors duration-300`}>
                              <p className="text-gray-600 dark:text-gray-300 flex-grow text-left">
                                {area.description}
                              </p>
                            </div>
                            
                            {/* CTA Button - more visible with button-like appearance */}
                            <div className="mt-auto pt-3 border-t border-gray-200/70 dark:border-gray-700/30 w-full">
                              <div className="flex items-center justify-between">
                                <span className={exploreTagBg}>
                                  {language === 'en' ? 'Explore' : 'Разгледай'}
                                </span>
                                <div className={exploreIconBg}>
                                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
              
              {/* Newsletter signup section with glass morphism design */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-10 md:mt-12 max-w-4xl mx-auto"
                style={{
                  willChange: "opacity, transform",
                  transform: "translateZ(0)"
                }}
              >
                {/* Glass container */}
                <div className="rounded-xl overflow-hidden h-full
                  bg-white/30 dark:bg-gray-800/30
                  backdrop-blur-md
                  border border-white/30 dark:border-gray-700/50
                  shadow-[0_15px_35px_rgba(0,0,0,0.1)] 
                  dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
                  
                  {/* Content with gradient background */}
                  <div className="h-full relative p-6 md:p-8
                    bg-gradient-to-br from-green-50/50 via-white/30 to-white/30
                    dark:from-green-900/20 dark:via-gray-900/30 dark:to-gray-900/30">
                    
                    {/* Glow effect behind the book */}
                    <div 
                      className="absolute top-1/2 left-0 md:left-1/4 w-32 h-32 -translate-x-1/2 -translate-y-1/2
                      bg-green-400/20 dark:bg-green-500/20 rounded-full blur-3xl"
                      aria-hidden="true"
                    ></div>
                    
                    {/* Newsletter content */}
                    <div className="grid grid-cols-1 md:grid-cols-[0.7fr_2fr] gap-8 items-center relative z-10">
                      {/* Book Image Column */}
                      <div className="relative z-10 hidden md:block" aria-hidden="true">
                        <div className="relative mx-auto w-[140px] h-[210px] perspective" style={{ perspective: "1000px" }}>
                          {/* Book shadow */}
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-[15px] bg-black/30 dark:bg-black/50 blur-xl rounded-full"></div>
                          
                          {/* Book with enhanced 3D effect */}
                          <div 
                            className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transform-gpu will-change-transform
                            hover:rotate-y-[-8deg] transition-transform duration-700"
                            style={{ 
                              transformStyle: "preserve-3d", 
                              transform: "rotateY(-15deg) translateZ(0)" 
                            }}
                          >
                            <Image 
                              src="/images/books/osaznato-hranene.jpg" 
                              alt={language === 'en' ? "Free mindfulness ebook" : "Безплатна електронна книга за осъзнатост"}
                              fill
                              loading="lazy"
                              className="object-cover"
                            />
                            
                            {/* Book reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 dark:to-white/5"></div>
                            
                            {/* Book spine shadow */}
                            <div className="absolute top-0 right-[-1px] w-8 h-full bg-black/20 backdrop-blur-sm"></div>
                            
                            {/* Free badge with improved design */}
                            <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
                              {language === 'en' ? "FREE" : "БЕЗПЛАТНО"}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Newsletter Content Column with accessibility improvements */}
                      <div className="relative z-10">
                        <div className="space-y-3 mb-6">
                          {/* Title with icon */}
                          <div className="flex items-center gap-3 mb-2">
                            <div 
                              className="rounded-full p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md flex items-center justify-center"
                              aria-hidden="true"
                            >
                              <Gift className="h-5 w-5 text-white" />
                            </div>
                            <h3 id="newsletter-signup" className="text-2xl font-bold text-gray-900 dark:text-white">
                              {freeEbook.title}
                            </h3>
                          </div>
                          
                          <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                            {freeEbook.description}
                          </p>
                        </div>
                      
                        {/* Email signup form with glass morphism styling and proper accessibility */}
                        <form className="flex flex-col sm:flex-row gap-3" aria-labelledby="newsletter-signup">
                          <div className="relative flex-1">
                            <label htmlFor="email-input" className="sr-only">
                              {language === 'en' ? "Email address" : "Имейл адрес"}
                            </label>
                            <input 
                              id="email-input"
                              type="email" 
                              placeholder={language === 'en' ? "Your email address" : "Вашият имейл адрес"}
                              className="w-full px-5 py-3.5 rounded-xl 
                                bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                                border border-white/50 dark:border-gray-700/50 
                                text-gray-800 dark:text-gray-200 
                                placeholder-gray-500 dark:placeholder-gray-400 
                                focus:ring-2 focus:ring-green-500/50 dark:focus:ring-green-500/30 
                                focus:border-green-500/50 dark:focus:border-green-500/30
                                focus:outline-none shadow-sm
                                transition-all duration-300"
                              aria-required="true"
                            />
                          </div>
                          
                          {/* Subscribe button with enhanced design */}
                          <Button 
                            type="submit"
                            size="lg" 
                            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 
                              text-white shadow-md hover:shadow-lg hover:-translate-y-1
                              transition-all duration-300 ease-out
                              flex items-center gap-2 px-6 py-3.5 h-auto font-medium
                              will-change-transform"
                            style={{ transform: "translateZ(0)" }}
                          >
                            <span>{freeEbook.buttonText}</span>
                            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                          </Button>
                        </form>
                        
                        {/* Privacy note with improved styling */}
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          {language === 'en' 
                            ? "We respect your privacy. Unsubscribe at any time."
                            : "Уважаваме вашата поверителност. Отпишете се по всяко време."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 