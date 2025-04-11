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

// Animations for staggered reveal
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
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
        
        {/* Enhanced Container with nested neumorphic styling - matching HeroSection */}
        <div className="rounded-2xl p-[3px] w-full
            bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
            dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
            shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
            dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
            overflow-hidden">
          
          {/* Inner container with gradient and shadow effects */}
          <div className="bg-gradient-to-br from-green-50/30 via-white/40 to-green-50/30 dark:from-green-900/20 dark:via-gray-900/20 dark:to-green-900/20 px-8 py-12 rounded-xl relative">
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
                      <div className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-400 dark:to-gray-300 rounded-full mt-1"></div>
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

            {/* Cards grid - with neumorphic styling */}
            <motion.div 
              variants={ANIMATIONS.container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10"
            >
              {expertiseAreas.map((area, index) => (
                <motion.div 
                  key={index}
                  variants={ANIMATIONS.item}
                  custom={index}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Card with neumorphic styling */}
                  <div 
                    className={cn(
                      "rounded-2xl p-[3px] h-full cursor-pointer transition-all duration-300",
                      "bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80",
                      "dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80",
                      "shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.7)]",
                      "dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(30,30,30,0.1)]",
                      "focus:outline-none",
                      area.isSpecial && "ring-2 ring-amber-300 dark:ring-amber-500/40"
                    )}
                    onClick={() => window.location.href = area.url}
                    onKeyDown={(e) => handleCardKeyDown(e, area.url)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${area.title}: ${area.description}`}
                  >
                    {/* Inner card content */}
                    <div className={cn(
                      "bg-gradient-to-br from-white/50 via-white/80 to-white/50",
                      "dark:from-gray-900/50 dark:via-gray-800/60 dark:to-gray-900/50",
                      "p-6 rounded-xl h-full relative",
                      area.isSpecial && "bg-gradient-to-br from-amber-50 via-white/90 to-amber-50/60 dark:from-amber-900/20 dark:via-gray-800/60 dark:to-amber-900/20"
                    )}>
                      {/* Inner shadow effect */}
                      <div className="absolute inset-1 bg-white/50 dark:bg-gray-900/50 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                      
                      {/* Decorative gradient blob */}
                      <div className={cn(
                        "absolute right-0 top-0 w-32 h-32 bg-gradient-to-br rounded-full blur-3xl opacity-20 -z-10",
                        area.gradientFrom,
                        area.gradientTo
                      )}></div>
                      
                      <div className="flex flex-col items-center text-center relative z-10">
                        {/* Special badge for shop card */}
                        {area.isSpecial && (
                          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform rotate-12">
                            {area.specialLabel}
                          </div>
                        )}
                        
                        {/* Icon with contextual styling */}
                        <div className={cn(
                          "w-20 h-20 mb-6 rounded-full flex items-center justify-center",
                          "shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]",
                          "dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]",
                          "transition-all duration-300 hover:scale-110",
                          area.iconBg,
                          area.isSpecial && "bg-gradient-to-r from-amber-200 to-amber-100 dark:from-amber-800/40 dark:to-amber-700/30"
                        )}>
                          <span className="text-4xl" aria-hidden="true">{area.icon}</span>
                        </div>
                        
                        <h3 className={cn(
                          "text-xl font-bold mb-3 transition-colors",
                          area.textColor
                        )}>
                          {area.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          {area.description}
                        </p>
                        
                        <Button 
                          variant={area.isSpecial ? "default" : "ghost"}
                          size="sm" 
                          className={cn(
                            "mt-auto font-medium rounded-full",
                            !area.isSpecial && area.textColor,
                            !area.isSpecial && "hover:text-white dark:hover:text-white",
                            !area.isSpecial && `hover:bg-${area.color}-600 dark:hover:bg-${area.color}-700`,
                            area.isSpecial && "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-md"
                          )}
                          asChild
                        >
                          <Link href={area.url} className="flex items-center justify-center">
                            <span>{
                              area.isSpecial 
                                ? (language === 'en' ? "Shop Now" : "Пазарувай Сега") 
                                : (language === 'en' ? "Explore" : "Разгледай")
                            }</span>
                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Newsletter Signup Section - More Compact Version */}
            <motion.div
              variants={ANIMATIONS.item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 max-w-4xl mx-auto"
            >
              <div className="rounded-xl p-[2px] w-full
                bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9)]
                dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2)]
                overflow-hidden">
                
                <div className="bg-gradient-to-br from-blue-50/30 via-white/40 to-blue-50/30 dark:from-blue-900/20 dark:via-gray-900/20 dark:to-blue-900/20 px-5 py-5 rounded-xl relative">
                  <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr] gap-4 items-center">
                    {/* Book Image Column */}
                    <div className="relative z-10 hidden md:block">
                      <div className="relative mx-auto w-[140px] h-[180px] transform -rotate-6 transition-transform hover:rotate-0 duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-green-500/20 rounded-lg blur-xl opacity-60"></div>
                        <div className="relative bg-white dark:bg-gray-800 p-1 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-gray-200 dark:border-gray-700">
                          <AspectRatio ratio={3/4} className="bg-white dark:bg-gray-800 rounded overflow-hidden">
                            <Image 
                              src="/images/books/osaznato-hranene.jpg" 
                              alt={language === 'en' ? "Free mindfulness ebook" : "Безплатна електронна книга за осъзнатост"}
                              fill
                              className="object-cover rounded"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {language === 'en' ? "FREE EBOOK" : "БЕЗПЛАТНА Е-КНИГА"}
                              </span>
                            </div>
                          </AspectRatio>
                        </div>
                      </div>
                    </div>
                    
                    {/* Newsletter Content Column */}
                    <div className="relative z-10">
                      <div className="space-y-2 mb-3">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                          {language === 'en' ? "Subscribe to our Newsletter" : "Абонирайте се за нашия бюлетин"}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                          {language === 'en' 
                            ? "Get the latest updates and receive a free mindfulness ebook."
                            : "Получавайте последните актуализации и безплатна книга за осъзнатост."}
                        </p>
                      </div>
                      
                      {/* ShadCN Newsletter Signup Component */}
                      <NewsletterSignup 
                        variant="minimal"
                        showIcon={true}
                        showFreeOffer={false}
                        buttonText={language === 'en' ? "Subscribe" : "Абонирай се"}
                        placeholder={language === 'en' ? "Your email address" : "Вашият имейл адрес"}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 