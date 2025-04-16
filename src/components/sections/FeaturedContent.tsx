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
      : "\"5 Техники за Справяне със Стреса\" - директно във вашата поща",
    buttonText: language === 'en' ? "Subscribe Now" : "Абонирайте се сега"
  }), [language]);
  
  // expertise areas (the cards)
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

  // Handle keyboard navigation for cards
  const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <section className={cn("w-full py-8 md:py-12", className)}>
      <div className="relative z-0">
        {/* Decorative background elements */}
        <div className="absolute right-[10%] top-[10%] w-[500px] h-[500px] bg-gradient-to-br from-green-300/30 via-emerald-200/30 to-teal-300/30 rounded-full blur-[96px] -z-10"></div>
        <div className="absolute left-[5%] bottom-[20%] w-[400px] h-[400px] bg-gradient-to-tr from-emerald-200/30 via-green-300/30 to-teal-200/30 rounded-full blur-[96px] -z-10"></div>
        
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
              {/* Section header */}
              <div className="text-center mb-8 md:mb-10 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex flex-col items-center justify-center"
                >
                  {/* Section badge/pill - improved for better readability */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-900/20 rounded-full mb-4 border border-green-200/50 dark:border-green-800/30 shadow-md backdrop-blur-sm">
                    <Sparkles className="h-4 w-4 text-black dark:text-white" />
                    <span className="text-sm font-medium text-black dark:text-white">
                      {language === 'en' ? "Explore" : "Разгледайте"}
                    </span>
                  </div>
                  
                  {/* Main title */}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                    bg-gradient-to-r from-green-700 to-teal-600 dark:from-green-400 dark:to-teal-400
                    bg-clip-text text-transparent">
                    {ui.sectionTitle}
                  </h2>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
                    {ui.sectionDescription}
                  </p>
                </motion.div>
              </div>

              {/* Cards grid */}
              <motion.div 
                variants={ANIMATIONS.container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
              >
                {/* Map through expertise areas */}
                {expertiseAreas.map((area, index) => (
                  <motion.div 
                    key={index}
                    variants={ANIMATIONS.item}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    className="h-full group"
                  >
                    {/* Card with enhanced glass morphism styling */}
                    <div className={`rounded-xl overflow-hidden h-full
                      ${area.index === 3 ? 
                        "bg-white/40 dark:bg-gray-800/40" : 
                        "bg-white/40 dark:bg-gray-800/40"}
                      backdrop-blur-md
                      border border-white/30 dark:border-gray-700/50
                      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                      group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] 
                      dark:group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)]
                      transition-all duration-500 ease-out`}>
                      
                      {/* Link wrapper */}
                      <Link 
                        href={area.url}
                        className="block h-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onKeyDown={(e) => handleCardKeyDown(e, area.url)}
                      >
                        {/* Subtle animated gradient background */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                          bg-gradient-to-br ${area.gradientFrom} ${area.gradientTo}`}>
                        </div>
                        
                        {/* Special badge for featured item with improved visibility */}
                        {area.isSpecial && (
                          <div className="absolute top-3 right-3 z-30">
                            <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold
                              bg-gradient-to-r from-amber-500 to-amber-600 text-white
                              rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                              {area.specialLabel}
                            </span>
                          </div>
                        )}
                        
                        {/* Card content */}
                        <div className="flex flex-col items-center text-center h-full relative z-10 p-6">
                          {/* Icon with enhanced styling */}
                          <div className="relative mb-6 mt-2">
                            {/* Glow effect that appears on hover */}
                            <div className={`absolute -inset-2 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500 
                              blur-xl bg-gradient-to-r ${area.iconGradient}`}></div>
                            
                            {/* Icon container with glass morphism */}
                            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center
                              bg-gradient-to-br ${area.iconGradient}
                              text-white
                              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]
                              dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]
                              group-hover:shadow-lg 
                              transform group-hover:scale-110 transition-all duration-500`}>
                              <span className="text-3xl transform group-hover:rotate-[5deg] transition-transform duration-300">{area.icon}</span>
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white
                            transform transition-transform duration-300 group-hover:translate-y-[-2px]">
                            {area.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                            {area.description}
                          </p>
                          
                          {/* CTA Button - with proper glass morphism styling */}
                          <div className="mt-auto">
                            <span className={`inline-flex items-center justify-center rounded-full
                              ${area.textColor} 
                              bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                              px-5 py-2 text-sm font-medium
                              border border-white/50 dark:border-gray-700/50
                              shadow-sm group-hover:shadow-md 
                              transform group-hover:translate-y-[-2px]
                              transition-all duration-300`}>
                              <span>{language === 'en' ? 'Explore' : 'Разгледай'}</span>
                              <ChevronRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Newsletter signup section with glass morphism design */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 md:mt-12 max-w-4xl mx-auto"
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
                    <div className="absolute top-1/2 left-0 md:left-1/4 w-32 h-32 -translate-x-1/2 -translate-y-1/2
                      bg-green-400/20 dark:bg-green-500/20 rounded-full blur-3xl"></div>
                    
                    {/* Newsletter content */}
                    <div className="grid grid-cols-1 md:grid-cols-[0.7fr_2fr] gap-8 items-center relative z-10">
                      {/* Book Image Column */}
                      <div className="relative z-10 hidden md:block">
                        <div className="relative mx-auto w-[140px] h-[210px] perspective" style={{ perspective: "1000px" }}>
                          {/* Book shadow */}
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-[15px] bg-black/30 dark:bg-black/50 blur-xl rounded-full"></div>
                          
                          {/* Book with enhanced 3D effect */}
                          <div 
                            className="relative w-full h-full rounded-lg overflow-hidden shadow-xl transform-gpu
                            hover:rotate-y-[-8deg] transition-transform duration-700"
                            style={{ transformStyle: "preserve-3d", transform: "rotateY(-15deg)" }}
                          >
                            <Image 
                              src="/images/books/osaznato-hranene.jpg" 
                              alt={language === 'en' ? "Free mindfulness ebook" : "Безплатна електронна книга за осъзнатост"}
                              fill
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
                      
                      {/* Newsletter Content Column */}
                      <div className="relative z-10">
                        <div className="space-y-3 mb-6">
                          {/* Title with icon */}
                          <div className="flex items-center gap-3 mb-2">
                            <div className="rounded-full p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md flex items-center justify-center">
                              <Gift className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {freeEbook.title}
                            </h3>
                          </div>
                          
                          <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                            {freeEbook.description}
                          </p>
                        </div>
                      
                        {/* Email signup form with glass morphism styling */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <input 
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
                            />
                          </div>
                          
                          {/* Subscribe button with enhanced design */}
                          <Button 
                            size="lg" 
                            className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 
                              text-white shadow-md hover:shadow-lg hover:-translate-y-1
                              transition-all duration-300 ease-out
                              flex items-center gap-2 px-6 py-3.5 h-auto font-medium"
                          >
                            <span>{freeEbook.buttonText}</span>
                            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                        
                        {/* Privacy note with improved styling */}
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
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