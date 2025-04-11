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
      const bookItemWidth = 320; // Updated width to match wider cards
      
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
    <div className={cn("py-2 px-4 md:py-4 md:px-6", className)} ref={ref}>
      <div className="bg-gradient-to-br from-white/90 via-white/80 to-green-50/50 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-green-900/10 backdrop-blur-sm rounded-xl p-4 relative min-h-[calc(60vh-80px)] flex flex-col justify-start shadow-inner border border-green-100/50 dark:border-green-900/30">
        {/* Subtle pattern background */}
        <div 
          className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.02] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"
          aria-hidden="true"
        ></div>
        
        {/* Green accent orbs */}
        <div className="absolute top-1/3 right-10 h-40 w-40 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/3 left-10 h-40 w-40 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Main Hero Content - Centered layout */}
        <div className="flex flex-col items-center justify-center text-center relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Profile Image with Avatar Badge */}
          <motion.div 
            variants={ANIMATIONS.item}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <Avatar className="h-20 w-20 border-4 border-green-100 dark:border-green-900">
              <AvatarImage
                src="/images/avatar/avatar.jpg"
                alt={language === 'en' ? "Profile photo of Elisa Ivanova" : "Профилна снимка на Елиса Иванова"}
                className="object-cover"
              />
              <AvatarFallback>{language === 'en' ? "EI" : "ЕИ"}</AvatarFallback>
              <AvatarBadge position="top-right" className="h-7 w-auto px-2 text-xs rounded-full">
                {language === 'bg' ? 'Добре дошли' : 'Welcome'}
              </AvatarBadge>
            </Avatar>
          </motion.div>
          
          {/* Main heading - Improved styling */}
          <motion.h1 
            variants={ANIMATIONS.item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white font-playfair mb-4 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 dark:from-white dark:via-gray-200 dark:to-gray-100"
          >
            {ui.transformHeading}
          </motion.h1>
          
          {/* Author description - Enhanced */}
          <motion.p 
            variants={ANIMATIONS.item}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl font-medium"
          >
            {ui.aboutText}
          </motion.p>
          
          {/* CTA Buttons - Improved styling */}
          <motion.div 
            variants={ANIMATIONS.item} 
            className="flex flex-col sm:flex-row gap-4 mb-8 justify-center"
          >
            <Button asChild size="lg" className="group rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 border-0">
              <Link href="/shop">
                <BookOpen className="mr-2 h-5 w-5" />
                {language === 'bg' ? 'Разгледай книгите' : 'Browse Books'}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="group rounded-full shadow-sm hover:shadow-md border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20">
              <Link href="/services">
                {language === 'bg' ? 'Запази Консултация' : 'Book Consultation'}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          
          {/* Enhanced Navigation - Three key areas with improved styling */}
          <motion.div 
            variants={ANIMATIONS.item}
            className="grid grid-cols-3 gap-4 w-full max-w-3xl mx-auto mb-10"
          >
            {expertiseAreas.map((area) => (
              <Link 
                href={area.url}
                key={area.title}
                className="group flex flex-col items-center p-4 rounded-xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 hover:bg-green-50/80 dark:hover:bg-green-900/30 transition-all shadow-sm hover:shadow-md duration-300 transform hover:-translate-y-1"
              >
                <span className="text-2xl bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/30 h-12 w-12 rounded-full flex items-center justify-center mb-3 shadow-inner">{area.icon}</span>
                <h3 className="font-medium text-base text-gray-900 dark:text-white mb-1">{area.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{area.description}</p>
              </Link>
            ))}
          </motion.div>
          
          {/* Book Carousel Section - At the bottom of hero */}
          <motion.div 
            variants={ANIMATIONS.item}
            className="w-full mt-4 relative"
          >
            <div ref={containerRef} className="relative overflow-hidden w-full">
              {/* Outer neumorphic container */}
              <div className="rounded-2xl p-[3px]
                  bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                  dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                  shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
                  dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
                  overflow-hidden">
                
                {/* Inner container with gradient and shadow effects */}
                <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-4 rounded-xl relative">
                  {/* Inner shadow effect */}
                  <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                  
                  {/* Subtle section header with neumorphic style */}
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1
                      rounded-full bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
                      text-green-700 dark:text-green-400 
                      border border-green-100/50 dark:border-green-800/30 
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                      <Bookmark className="w-3.5 h-3.5 text-green-500" />
                      <h3 className="text-sm font-medium antialiased">
                        {ui.booksHeader}
                      </h3>
                    </div>
                    
                    <div className="inline-flex items-center gap-1.5">
                      <Link 
                        href="/shop" 
                        className="px-2.5 py-1 rounded-full text-sm
                          bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
                          text-green-700 dark:text-green-400 font-medium
                          border border-green-100/50 dark:border-green-800/30 
                          shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(30,30,30,0.15)]
                          hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1),inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(30,30,30,0.1)]
                          transition-all duration-300 flex items-center gap-1"
                      >
                        {language === 'bg' ? 'Всички' : 'All'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      
                      <button 
                        type="button"
                        onClick={() => setIsPaused(!isPaused)}
                        className="p-1 rounded-full
                          bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
                          text-green-700 dark:text-green-400 
                          border border-green-100/50 dark:border-green-800/30 
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1),inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(30,30,30,0.1)]
                          transition-all duration-300 flex items-center gap-2"
                        aria-label={isPaused ? translate("Възобнови", "Resume") : translate("Пауза", "Pause")}
                      >
                        {isPaused ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Books carousel with enhanced neumorphic cards */}
                  <div className="relative overflow-hidden px-2" ref={carouselRef}>
                    <motion.div
                      className="flex gap-3"
                      style={{ x }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragStart={() => setIsPaused(true)}
                      dragElastic={0.2}
                    >
                      {duplicatedBooks.map((book, index) => (
                        <div 
                          key={`${book.id}-${index}`} 
                          className="w-32 md:w-40 flex-shrink-0
                            rounded-xl p-[2px]
                            bg-gradient-to-br from-gray-200/60 via-white/70 to-gray-100/60 
                            dark:from-gray-800/60 dark:via-gray-900/70 dark:to-gray-800/60
                            shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(30,30,30,0.15)]
                            hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)]
                            dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.3),-1px_-1px_2px_rgba(30,30,30,0.15)]
                            transition-shadow duration-300"
                        >
                          <FlipCard
                            frontImage={book.coverImage}
                            frontTitle={book.title}
                            frontSubtitle={language === 'en' ? "Elisa Ivanova" : "Елиса Иванова"}
                            frontIcon={<BookOpen className="h-3.5 h-3.5" />}
                            frontFooter={"20.00 лв."}
                            triggerMode="hover"
                            onCtaClick={() => window.location.href = `/shop/${book.id}`}
                            backTitle={book.title}
                            backDescription={language === 'en' 
                              ? "Learn how to develop a healthier relationship with food and transform the way you eat." 
                              : "Научете как да развиете по-здравословна връзка с храната и да трансформирате начина, по който се храните."}
                            backQuote={language === 'en' 
                              ? "Discover the wisdom within these pages." 
                              : "Открийте мъдростта в тези страници."}
                            backFeatures={["Психология", "Себепознание", "Развитие"]}
                            backCta={language === 'en' ? "Buy Now" : "Купи сега"}
                            className="h-[200px]"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Gradient fade on the left */}
              <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none"></div>
              
              {/* Gradient fade on the right */}
              <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Author profile section - Moved to the bottom */}
        {includeFooter && (
          <div className="mt-auto pt-6 border-t border-gray-200/60 dark:border-gray-700/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Author info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-md">
                  <AvatarImage src={profile.imageSrc} alt={profile.altText} />
                  <AvatarFallback>EI</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{profile.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{profile.title}</p>
                </div>
              </div>
              
              {/* Quick contact/about button */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {ui.aboutAuthor}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{ui.welcomeMessage}</DialogTitle>
                    <DialogDescription>
                      {language === 'en' 
                        ? "Hello, I'm Elisa - psychologist and author dedicated to helping you transform your life through self-awareness and conscious living."
                        : "Здравейте, аз съм Елиса - психолог и автор, посветен да ви помогне да трансформирате живота си чрез самоосъзнаване и осъзнат живот."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-md">
                        <AvatarImage src={profile.imageSrc} alt={profile.altText} />
                        <AvatarFallback>EI</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{profile.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{profile.title}</p>
                        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">{language === 'en' 
                          ? "With over 10 years of experience in psychology and self-development, I'm here to guide you toward living your best life."
                          : "С над 10 години опит в психологията и себеразвитието, аз съм тук, за да ви насоча към живеенето на най-добрия ви живот."}</p>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href="/about">
                        {language === 'en' ? "Learn More About Me" : "Научете Повече За Мен"}
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection; 