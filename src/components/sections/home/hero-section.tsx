"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, BookOpen, Download, SendIcon, ChevronRight, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, useSafeLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/hooks";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import { Book } from "@/components/ui/book";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Image from "next/image";
import { FlipCard } from "@/components/ui/flip-card";

// Component props type - maintaining the same interface
export interface HeroSectionProps {
  className?: string;
  includeFooter?: boolean;
}

// Animations - memoized to avoid rerenders (keeping exactly as original)
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

// Book images with proper paths in public folder - Added for book carousel
const heroBooks = [
  {
    id: "1",
    title: "Осъзнато хранене",
    coverImage: "/images/books/osaznato-hranene.jpg"
  },
  {
    id: "2",
    title: "Вдъхновения - Книга 2",
    coverImage: "/images/books/vdahnovenia-kniga-2.png"
  },
  {
    id: "3",
    title: "Вдъхновения - Книга 1",
    coverImage: "/images/books/vdahnovenia-kniga-1.png"
  },
  {
    id: "4",
    title: "Дневник на успеха",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg"
  },
  {
    id: "5",
    title: "Дневник на щастието",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg"
  }
];

/**
 * This is a direct replacement for the original HeroSection/index.tsx
 * It maintains the exact same appearance and functionality
 * with better organized code
 */
export function HeroSection({ className, includeFooter = false }: HeroSectionProps) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t, locale } = useTranslation();
  
  // Add translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  // Memoized data objects - identical to original
  const profile = useMemo(() => ({
    imageSrc: "/images/avatar/avatar.jpg",
    name: language === 'en' ? "Elisa Ivanova" : "Елиса Иванова",
    title: language === 'en' ? "Psychologist & Author" : "Писател & Психолог",
    altText: language === 'en' ? "Profile photo of Elisa Ivanova" : "Профилна снимка на Елиса Иванова"
  }), [language]);
  
  const featuredBook = useMemo(() => ({
    id: "1",
    title: language === 'en' ? "Mindful Eating" : "Осъзнато хранене",
    description: language === 'en' 
      ? "Learn how to develop a healthier relationship with food and transform the way you eat."
      : "Научете как да развиете по-здравословна връзка с храната и да трансформирате начина, по който се храните.",
    price: "20.00",
    pages: 240,
    publishDate: "2023",
    buttonText: language === 'en' ? "Read excerpt" : "Прочети откъс",
    buyText: language === 'en' ? "Buy Now" : "Купи"
  }), [language]);
  
  // Additional highlighted books - identical to original
  const otherBooks = useMemo(() => [
    {
      id: "2",
      title: language === 'en' ? "The Art of Loving" : "Изкуството да обичаш",
      price: "18.00",
    },
    {
      id: "3",
      title: language === 'en' ? "Rediscover Yourself" : "Преоткрий себе си", 
      price: "22.00",
    }
  ], [language]);
  
  // Quick service previews - identical to original
  const quickServices = useMemo(() => [
    {
      id: "individual",
      title: language === 'en' ? "Individual Therapy" : "Индивидуална терапия",
      icon: "UserRound"
    },
    {
      id: "art",
      title: language === 'en' ? "Art Therapy" : "Арт терапия",
      icon: "Palette" 
    },
    {
      id: "couples",
      title: language === 'en' ? "Couples Therapy" : "Терапия за двойки",
      icon: "Heart"
    }
  ], [language]);
  
  // Expertise areas - identical to original
  const expertiseAreas = useMemo(() => [
    {
      icon: "📚",
      title: language === 'en' ? "Books" : "Книги",
      description: language === 'en' ? "Self-help & growth resources" : "Ресурси за себепомощ и развитие",
      url: "/shop"
    },
    {
      icon: "🎓",
      title: language === 'en' ? "Services" : "Услуги",
      description: language === 'en' ? "Professional therapy sessions" : "Професионални терапевтични сесии",
      url: "/services"
    },
    {
      icon: "📝",
      title: language === 'en' ? "Articles" : "Статии",
      description: language === 'en' ? "Insights & practical tips" : "Прозрения и практични съвети",
      url: "/blog"
    }
  ], [language]);
  
  // Free ebook - identical to original
  const freeEbook = useMemo(() => ({
    title: language === 'en' ? "Get Your Free eBook" : "Получете безплатна електронна книга",
    description: language === 'en' 
      ? "\"5 Techniques for Stress Management\" - delivered to your inbox"
      : "\"5 Техники за Справяне със Стреса\" - директно във вашата пощенска кутия",
    buttonText: language === 'en' ? "Subscribe Now" : "Абонирайте се сега"
  }), [language]);
  
  // UI text translations - identical to original
  const ui = useMemo(() => ({
    newBadge: language === 'en' ? "New" : "Ново",
    pages: language === 'en' ? "pages" : "стр.",
    published: language === 'en' ? "Published" : "Издадена",
    aboutAuthor: language === 'en' ? "About Author" : "За автора",
    featuredContent: language === 'en' ? "Featured Content" : "Препоръчано съдържание",
    welcomeMessage: language === 'en' ? "Welcome Message" : "Приветствено съобщение",
    booksHeader: language === 'en' ? "More Books by Author" : "Още книги от автора",
    servicesHeader: language === 'en' ? "Services Offered" : "Предлагани услуги", 
    consultationLabel: language === 'en' ? "Schedule Consultation" : "Запазете Консултация",
    transformHeading: language === 'en' ? "Transform Your Life" : "Трансформирай Живота Си",
    aboutText: language === 'en'
      ? "Certified psychologist and author helping you create a conscious, dream life filled with love and harmony."
      : "Дипломиран психолог и автор, помагащ ви да създадете осъзнат, мечтан живот, изпълнен с любов и хармония."
  }), [language]);
  
  // Dialog state - identical to original
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Handler for keyboard events on Card elements - identical to original
  const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = url;
    }
  };
  
  // Scroll to top functionality - identical to original
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Home') {
        window.scrollTo({
          top: 0,
          behavior: shouldReduceMotion ? 'auto' : 'smooth'
        });
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldReduceMotion]);
  
  // Add state for carousel API
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  
  // Add state for current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update current slide when carousel changes
  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);
  
  // Auto-advance the carousel
  useEffect(() => {
    if (!carouselApi) return;
    
    const autoPlay = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 3000);
    
    return () => {
      clearInterval(autoPlay);
    };
  }, [carouselApi]);
  
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Create a duplicate array of books for infinite scrolling
  const duplicatedBooks = [...heroBooks, ...heroBooks, ...heroBooks];
  
  // Add autoscroll carousel effect
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let animationId: number;
    
    // Initial animation setup
    const animate = () => {
      if (isPaused) return;
      
      // Get the current position of the carousel
      const currentX = x.get();
      
      // Get the width of a book item (assuming all books have same width)
      const bookItemWidth = 120; // Reduced width for better mobile display
      
      // Calculate the total width of all books
      const totalWidth = duplicatedBooks.length * bookItemWidth;
      
      // Reset position when reaching the end
      if (currentX <= -totalWidth / 3) {
        x.set(0);
      } else {
        // Move 0.25px per frame for slower scrolling (right to left direction)
        x.set(currentX - 0.25);
      }
      
      // Continue animation if not paused
      if (!isPaused) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    // Start animation if not paused
    if (!isPaused) {
      animationId = requestAnimationFrame(animate);
    }
    
    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, duplicatedBooks.length, x]);
  
  // The render JSX is kept identical to the original
  return (
    <div className={cn("relative w-full min-h-screen overflow-hidden", className)} ref={ref}>
      {/* Main container that fits viewport exactly */}
      <div className="absolute inset-0 top-[10px] flex items-start justify-center">
        <div className="w-[99.5%] max-w-none px-0 mx-auto">
          {/* Outer container with 3D nested look */}
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-green-200/40 to-emerald-100/40 dark:from-green-800/30 dark:to-emerald-900/30 shadow-xl">
            {/* Middle container */}
            <div className="p-1 rounded-lg bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-green-950/50 shadow-md">
              {/* Inner main container */}
              <div className="bg-gradient-to-br from-white/95 via-white/95 to-green-50/90 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-green-950/15 backdrop-blur-sm rounded-lg border border-green-100/50 dark:border-green-900/30 shadow-sm p-4 md:p-6 lg:p-8 mt-0">
                {/* Subtle pattern background */}
                <div 
                  className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"
                  aria-hidden="true"
                ></div>
                
                {/* Subtle accent orbs - reduced size and effect */}
                <div className="absolute top-1/3 right-10 h-40 w-40 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/3 left-10 h-40 w-40 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
                
                {/* Main Hero Content - larger sizes but still compact spacing */}
                <div className="flex flex-col items-center justify-center text-center relative z-10 space-y-5 lg:space-y-6">
                  {/* Profile Image - INCREASED SIZE FROM PREVIOUS EDIT */}
                  <motion.div 
                    variants={ANIMATIONS.item}
                    initial="hidden"
                    animate="visible"
                    className="relative group"
                  >
                    <Link href="/about">
                      <div className="relative">
                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 border-2 border-green-100 group-hover:border-green-300 dark:border-green-900 dark:group-hover:border-green-700 shadow-sm group-hover:shadow-md transition-all duration-300">
                          <AvatarImage
                            src="/images/avatar/avatar.jpg"
                            alt={language === 'en' ? "Profile photo of Elisa Ivanova" : "Профилна снимка на Елиса Иванова"}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <AvatarFallback>{language === 'en' ? "EI" : "ЕИ"}</AvatarFallback>
                          <AvatarBadge position="top-right" className="h-5 w-auto px-1.5 text-[10px] rounded-full">
                            {language === 'bg' ? 'Добре дошли' : 'Welcome'}
                          </AvatarBadge>
                        </Avatar>
                        
                        {/* Tooltip */}
                        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2.5 py-0.5 rounded-full text-xs text-green-700 dark:text-green-300 font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                          {language === 'bg' ? 'За мен' : 'About Me'}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 rotate-45"></div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                      
                  {/* Main heading - FIXED TO SINGLE ROW */}
                  {/* 
                    ALTERNATIVE HEADLINE STYLES - Choose one by uncommenting:
                    
                    Option 1: Gradient text 
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-playfair max-w-7xl whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 dark:from-emerald-300 dark:via-green-300 dark:to-green-200 tracking-tight"
                    
                    Option 2: Soft black/white text (active)
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-playfair max-w-7xl whitespace-nowrap text-[#171717] dark:text-white tracking-tight"
                    
                    Option 3: Solid green text
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-playfair max-w-7xl whitespace-nowrap text-green-700 dark:text-green-300 tracking-tight"
                  */}
                  <motion.h1 
                    variants={ANIMATIONS.item}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-playfair max-w-7xl whitespace-nowrap text-[#171717] dark:text-white tracking-tight"
                  >
                    {ui.transformHeading}
                  </motion.h1>
                      
                  {/* Author description - INCREASED SIZE FROM PREVIOUS EDIT */}
                  <motion.p 
                    variants={ANIMATIONS.item}
                    className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-200 max-w-3xl font-medium leading-relaxed"
                  >
                    {ui.aboutText}
                  </motion.p>
                      
                  {/* CTA Button - INCREASED SIZE FROM PREVIOUS EDIT */}
                  <motion.div variants={ANIMATIONS.item}>
                    <Button 
                      asChild 
                      size="lg" 
                      className="group rounded-full bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-600 hover:to-emerald-500 border-0 px-5 sm:px-6 md:px-7 py-2.5 sm:py-3.5 text-sm sm:text-base font-medium shadow-[0_4px_14px_rgba(0,128,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,128,0,0.35)] transition-all duration-300"
                    >
                      <Link href="/services#consultation" className="flex items-center">
                        <span className="relative z-10 flex items-center justify-center -ml-1 mr-2 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white/20 rounded-full">
                          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </span>
                        <span className="font-medium tracking-wide text-white">
                          {language === 'bg' ? 'Безплатна Консултация' : 'Free Consultation'}
                        </span>
                        <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 text-white/80 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                      
                  {/* Navigation - INCREASED SIZE FROM PREVIOUS EDIT */}
                  <motion.div 
                    variants={ANIMATIONS.item}
                    className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto"
                  >
                    {expertiseAreas.map((area, index) => (
                      <Link 
                        href={area.url}
                        key={area.title}
                        className={cn(
                          "group flex flex-col items-center p-[3px] rounded-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/70 hover:shadow-md duration-300 transition-all shadow-sm",
                          "overflow-hidden select-none",
                          // Outer border colors - transparent by default, visible on hover
                          "border-2",
                          index === 0 && "border-green-100/30 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-700",
                          index === 1 && "border-blue-100/30 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700",
                          index === 2 && "border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700"
                        )}
                      >
                        {/* Inner card with its own border */}
                        <div className={cn(
                          "flex flex-col items-center rounded-md p-2 sm:p-3 w-full h-full",
                          "bg-white/90 dark:bg-gray-900/90",
                          "shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]",
                          "dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]",
                          // Inner border - subtle by default
                          "border",
                          index === 0 && "border-green-100/30 dark:border-green-900/30 hover:border-green-300/50 dark:hover:border-green-700/50",
                          index === 1 && "border-blue-100/30 dark:border-blue-900/30 hover:border-blue-300/50 dark:hover:border-blue-700/50", 
                          index === 2 && "border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700/50"
                        )}>
                          {/* Corner decoration element */}
                          <div className={cn(
                            "absolute top-0 right-0 w-24 h-24 rounded-bl-3xl -z-1",
                            index === 0 && "bg-gradient-to-bl from-green-100/40 to-transparent dark:from-green-900/20",
                            index === 1 && "bg-gradient-to-bl from-blue-100/40 to-transparent dark:from-blue-900/20",
                            index === 2 && "bg-gradient-to-bl from-purple-100/40 to-transparent dark:from-purple-900/20"
                          )} />
                        
                          <div className={cn(
                            "p-1.5 rounded-full flex items-center justify-center mb-2 sm:mb-3",
                            index === 0 && "bg-gradient-to-br from-green-50 to-green-100/60 dark:from-green-900/30 dark:to-green-800/20",
                            index === 1 && "bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-900/30 dark:to-blue-800/20",
                            index === 2 && "bg-gradient-to-br from-purple-50 to-purple-100/60 dark:from-purple-900/30 dark:to-purple-800/20"
                          )}>
                            <span className="text-lg sm:text-xl w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center">{area.icon}</span>
                          </div>
                          <h3 className={cn(
                            "font-semibold text-sm sm:text-base text-gray-900 dark:text-white"
                          )}>{area.title}</h3>
                          <p className={cn(
                            "text-xs sm:text-sm line-clamp-1 text-gray-700 dark:text-gray-300"
                          )}>{area.description}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                      
                  {/* Book Carousel - REDUCED HEIGHT SLIGHTLY */}
                  <motion.div 
                    variants={ANIMATIONS.item}
                    className="w-full relative h-[140px] sm:h-[180px] md:h-[200px] lg:h-[240px]"
                  >
                    <div ref={containerRef} className="relative w-full h-full">
                      {/* Outer container */}
                      <div className="rounded-lg sm:rounded-xl p-[2px] h-full
                          bg-gradient-to-br from-green-100/80 via-white/90 to-green-50/80 
                          dark:from-green-900/20 dark:via-gray-900/90 dark:to-gray-800/80
                          shadow-md">
                          
                        {/* Inner container */}
                        <div className="bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-900/70 dark:via-gray-900/60 dark:to-green-950/10 p-3 sm:p-4 rounded-lg sm:rounded-xl relative h-full flex flex-col">
                          {/* Section header */}
                          <div className="flex justify-between items-center mb-2 sm:mb-3 relative z-10">
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2
                              rounded-full bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20
                              text-green-700 dark:text-green-400 font-medium
                              border border-green-100/50 dark:border-green-800/30">
                              <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-500" />
                              <h3 className="text-sm sm:text-base">
                                {ui.booksHeader}
                              </h3>
                            </div>
                            
                            <Link 
                              href="/shop" 
                              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-sm sm:text-base
                                bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400
                                text-white font-medium
                                transition-all duration-300
                                flex items-center gap-1.5 sm:gap-2"
                            >
                              {language === 'bg' ? 'Всички книги' : 'All Books'}
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Link>
                          </div>
                          
                          {/* Books carousel - INCREASED SIZE */}
                          <div className="relative overflow-hidden px-3 flex-1" ref={carouselRef}>
                            <motion.div
                              className="flex gap-3 sm:gap-4 h-full"
                              style={{ x }}
                            >
                              {duplicatedBooks.map((book, index) => (
                                <div
                                  key={`${book.id}-${index}`}
                                  className="flex-shrink-0 cursor-pointer transition-all duration-300 group h-full w-28 sm:w-36 md:w-44 lg:w-48"
                                  onMouseEnter={() => setIsPaused(true)}
                                  onMouseLeave={() => setIsPaused(false)}
                                >
                                  <Link href={`/shop/${book.id}`} className="h-full block">
                                    <div className="relative h-full shadow-md group-hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden aspect-[2/3]">
                                      <Image
                                        src={book.coverImage}
                                        alt={book.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 192px"
                                      />
                                      
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-3">
                                        <h3 className="font-medium text-xs sm:text-sm leading-tight text-white">{book.title}</h3>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </motion.div>
                          </div>

                          {/* Gradient fades */}
                          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-white/80 to-transparent dark:from-gray-900/80 dark:to-transparent z-10 pointer-events-none"></div>
                          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-white/80 to-transparent dark:from-gray-900/80 dark:to-transparent z-10 pointer-events-none"></div>

                          {/* Simple control */}
                          <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 flex items-center justify-center shadow-sm border border-green-100/50 dark:border-green-800/30 z-20"
                            aria-label={isPaused ? translate("Възобнови", "Resume") : translate("Пауза", "Pause")}
                          >
                            {isPaused ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection; 