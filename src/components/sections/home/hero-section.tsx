"use client";

import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight, SendIcon, ChevronRight, HeartHandshake, Book as BookIcon, Sparkles, Lightbulb, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/hooks";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Image from "next/image";
import { CarouselApi } from "@/components/ui/carousel";

// Component props type
export interface HeroSectionProps {
  className?: string;
  includeFooter?: boolean;
}

// Optimized animations - reduced complexity for better performance
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1, duration: 0.3 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }
};

// Book images
const heroBooks = [
  {
    id: "1",
    title: "Осъзнато хранене",
    coverImage: "/images/books/osaznato-hranene.jpg",
    badge: "new"
  },
  {
    id: "2",
    title: "Вдъхновения - Книга 2",
    coverImage: "/images/books/vdahnovenia-kniga-2.png",
    badge: "ebook"
  },
  {
    id: "3",
    title: "Вдъхновения - Книга 1",
    coverImage: "/images/books/vdahnovenia-kniga-1.png",
    badge: "bestseller"
  },
  {
    id: "4",
    title: "Дневник на успеха",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg",
    badge: null
  },
  {
    id: "5",
    title: "Дневник на щастието",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    badge: "ebook"
  },
  {
    id: "6",
    title: "Житейски Уроци",
    coverImage: "/images/books/osaznato-hranene.jpg",
    badge: "bestseller"
  }
];

export function HeroSection({ className, includeFooter = false }: HeroSectionProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isBookInView = useInView(bookRef, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeBookIndex, setActiveBookIndex] = useState(0);
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  // Memoize the profile data to avoid unnecessary re-renders
  const profile = useMemo(() => {
    return language === 'en' ? {
      name: 'Elisa Ivanova',
      title: 'Psychologist & Author',
      imageSrc: '',
      altText: 'Elisa Ivanova profile picture',
    } : {
      name: 'Елиса Иванова',
      title: 'Психолог & Автор',
      imageSrc: '',
      altText: 'Елиса Иванова профилна снимка',
    };
  }, [language]);
  
  // Memoize the UI content based on language
  const ui = useMemo(() => {
    return {
      transformHeading: language === 'en' 
        ? 'Transform Your Life Through Self-Discovery' 
        : 'Трансформирайте живота си',
      aboutText: language === 'en'
        ? 'I help people navigate life\'s challenges and discover their true potential through therapy, workshops, and my books on personal growth and mindfulness.'
        : 'Помагам на хората да се справят с житейските предизвикателства и да открият истинския си потенциал чрез терапия, семинари и книгите ми за личностно развитие и осъзнатост.',
      exploreBooks: language === 'en' ? 'Explore My Books' : 'Разгледайте книгите ми',
      services: language === 'en' ? 'My Services' : 'Моите услуги',
      viewDetails: language === 'en' ? 'View Details' : 'Вижте детайли',
      readTheBook: language === 'en' ? 'Read The Book' : 'Прочетете книгата',
    };
  }, [language]);
  
  // Book data
  const data = useMemo(() => {
    return {
      book: {
        title: language === 'en' ? 'Mindful Eating' : 'Осъзнато хранене',
        description: language === 'en' 
          ? 'Transform your relationship with food through mindfulness techniques and practical exercises.'
          : 'Трансформирайте връзката си с храната чрез техники за осъзнатост и практически упражнения.',
        coverImage: '/images/books/osaznato-hranene.jpg',
        link: '/books/mindful-eating',
      }
    };
  }, [language]);
  
  // Enhanced books data with badge translations
  const enhancedBooks = useMemo(() => {
    return heroBooks.map(book => {
      let badgeText = null;
      let badgeColor = "";
      
      if (book.badge) {
        if (book.badge === "bestseller") {
          badgeText = language === 'en' ? 'Bestseller' : 'Бестселър';
          badgeColor = "from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-400";
        } else if (book.badge === "new") {
          badgeText = language === 'en' ? 'New' : 'Ново';
          badgeColor = "from-green-500 to-green-600 dark:from-green-500 dark:to-green-400";
        } else if (book.badge === "ebook") {
          badgeText = language === 'en' ? 'E-book' : 'Е-книга';
          badgeColor = "from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-400";
        }
      }
      
      return {
        ...book,
        badgeText,
        badgeColor
      };
    });
  }, [language]);

  // Auto-rotation for carousel
  useEffect(() => {
    if (!carouselApi) return;
    
    // Update active book index when carousel changes
    const onSelect = () => {
      setActiveBookIndex(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", onSelect);
    
    // Auto-rotation timer
    let timer: NodeJS.Timeout;
    
    if (!dialogOpen) {
      timer = setInterval(() => {
        carouselApi.scrollNext();
      }, 3000);
    }
    
    // Cleanup
    return () => {
      carouselApi.off("select", onSelect);
      if (timer) clearInterval(timer);
    };
  }, [carouselApi, dialogOpen]);
  
  // Manual button handlers for reliable navigation
  const handleNextBook = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  }, [carouselApi]);
  
  const handlePrevBook = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  }, [carouselApi]);
  
  // Scroll to top functionality
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

  return (
    <div 
      className="relative z-0 min-h-[100vh] mt-[-4rem] sm:mt-[-6rem] md:mt-[-8rem] lg:mt-[-10rem] !pt-0 flex items-center justify-center overflow-hidden"
      ref={ref}
    >
      {/* Enhanced decorative background elements with animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/90 via-blue-50/20 to-white/90 dark:from-gray-950/90 dark:via-blue-950/10 dark:to-gray-950/90"></div>
      <div className="absolute -top-[10%] left-[5%] w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-blue-200/30 via-sky-200/30 to-indigo-200/30 dark:from-blue-900/20 dark:via-sky-900/20 dark:to-indigo-900/20 rounded-full blur-[100px] sm:blur-[150px] -z-10 animate-pulse-slow"></div>
      <div className="absolute -bottom-[20%] right-[5%] w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-green-200/30 via-emerald-200/30 to-teal-200/30 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-full blur-[100px] sm:blur-[150px] -z-10 animate-pulse-slower"></div>
      
      {/* Atmospheric accent patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_45%)] pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_45%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_45%)] pointer-events-none -z-10"></div>
      
      {/* Main container - enhanced glass card with improved styling */}
      <div className="w-full h-full py-4 sm:py-6 md:py-8 lg:py-10 flex items-center justify-center px-0 sm:px-0 md:px-0">
        {/* Hero card with enhanced glass morphism */}
        <div 
          className="relative w-full max-w-[1600px] mx-auto rounded-2xl sm:rounded-3xl 
            bg-gradient-to-br from-white/80 via-white/90 to-white/80 
            dark:from-gray-900/80 dark:via-gray-900/85 dark:to-gray-900/80
            backdrop-blur-md 
            border border-white/40 dark:border-white/10
            shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] 
            dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
            p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col items-center"
        >
          {/* Inner decorative accents */}
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-blue-100/30 to-transparent dark:from-blue-900/20 rounded-bl-[300px] -z-1 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-green-100/30 to-transparent dark:from-green-900/20 rounded-tr-[300px] -z-1 pointer-events-none"></div>
          
          {/* Profile/Avatar with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center mb-2 sm:mb-3 md:mb-4"
          >
            {/* Avatar Circle with enhanced styling */}
            <div
              onClick={() => setDialogOpen(true)}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 sm:mb-3 rounded-full 
                bg-gradient-to-br from-blue-500 to-emerald-500 
                border-4 border-white dark:border-gray-800 
                shadow-[0_15px_35px_rgba(16,185,129,0.2)]
                dark:shadow-[0_15px_35px_rgba(16,185,129,0.15)]
                cursor-pointer flex items-center justify-center relative
                transform transition-all duration-300 hover:scale-105"
            >
              <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">EI</span>
              <div className="absolute -right-1 -bottom-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 
                bg-gradient-to-br from-blue-500 to-emerald-400 dark:from-blue-400 dark:to-emerald-300 
                rounded-full border-3 border-white dark:border-gray-800 
                shadow-lg flex items-center justify-center
                animate-pulse-slow"
              >
                <SendIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
              </div>
            </div>
            
            {/* Name and title with improved typography */}
            <div className="text-center mb-0.5 sm:mb-1">
              <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-white">{profile.name}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">{profile.title}</p>
            </div>
          </motion.div>

          {/* Main Content: Headline, description, CTAs with enhanced styling */}
          <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[1.8rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] 
                font-extrabold tracking-tight leading-[1.05] text-center 
                bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400
                bg-clip-text text-transparent drop-shadow-sm
                mb-1 sm:mb-2 md:mb-3 max-w-[96%] mx-auto"
            >
              {ui.transformHeading}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center max-w-4xl mb-2 sm:mb-3 md:mb-4"
            >
              {ui.aboutText}
            </motion.p>
            
            {/* CTA Buttons with enhanced styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-3 sm:mb-4 md:mb-6"
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-full shadow-lg hover:shadow-xl 
                  bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700
                  hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800
                  text-white font-medium h-9 sm:h-10 md:h-12 px-4 sm:px-5 md:px-6 
                  border border-blue-500/20 hover:border-blue-300/60
                  transition-all duration-300 transform hover:-translate-y-0.5
                  text-xs sm:text-sm md:text-base"
              >
                <Link href="/books" className="flex items-center gap-1 sm:gap-1.5">
                  <BookIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span>{ui.exploreBooks}</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-full h-9 sm:h-10 md:h-12 px-4 sm:px-5 md:px-6
                  border-2 border-blue-400/30 dark:border-blue-400/20 
                  text-blue-700 dark:text-blue-400 
                  hover:bg-blue-50/80 dark:hover:bg-blue-900/20
                  hover:border-blue-400/50 dark:hover:border-blue-400/30
                  shadow-md hover:shadow-lg
                  transition-all duration-300 transform hover:-translate-y-0.5
                  text-xs sm:text-sm md:text-base"
              >
                <Link href="/services" className="flex items-center gap-1 sm:gap-1.5">
                  <HeartHandshake className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span>{ui.services}</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Book carousel with modern styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full mt-1 sm:mt-2"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold 
                bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400
                bg-clip-text text-transparent"
              >
                {language === 'en' ? 'My Books' : 'Моите Книги'}
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Button 
                  onClick={handlePrevBook}
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full 
                    text-gray-700 dark:text-gray-300 
                    hover:text-blue-600 dark:hover:text-blue-400 
                    hover:bg-blue-50/80 dark:hover:bg-blue-900/20 
                    border border-transparent hover:border-blue-200/60 dark:hover:border-blue-800/40
                    shadow-sm hover:shadow-md
                    transition-all duration-300"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rotate-180" />
                  <span className="sr-only">{language === 'en' ? 'Previous book' : 'Предишна книга'}</span>
                </Button>
                <Button 
                  onClick={handleNextBook}
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full 
                    text-gray-700 dark:text-gray-300 
                    hover:text-blue-600 dark:hover:text-blue-400 
                    hover:bg-blue-50/80 dark:hover:bg-blue-900/20 
                    border border-transparent hover:border-blue-200/60 dark:hover:border-blue-800/40
                    shadow-sm hover:shadow-md
                    transition-all duration-300"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  <span className="sr-only">{language === 'en' ? 'Next book' : 'Следваща книга'}</span>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl 
              bg-white/60 dark:bg-gray-800/60 
              backdrop-blur-sm
              border border-white/40 dark:border-white/10
              shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] 
              dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]
              py-3 sm:py-4"
            >
              <Carousel
                setApi={setCarouselApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-3 sm:-ml-4 md:-ml-5">
                  {enhancedBooks.map((book, index) => (
                    <CarouselItem key={book.id} className="pl-3 sm:pl-4 md:pl-5 basis-1/3 sm:basis-1/4 md:basis-1/5 xl:basis-1/6">
                      <div className="relative h-full p-1 sm:p-1.5 max-w-[110px] sm:max-w-[130px] md:max-w-[150px] mx-auto">
                        {/* Book cover with enhanced styling */}
                        <div 
                          className={cn(
                            "relative aspect-[3/4] rounded-lg overflow-hidden transition-all duration-500",
                            "shadow-[0_15px_30px_-8px_rgba(0,0,0,0.25)] dark:shadow-[0_15px_30px_-8px_rgba(0,0,0,0.4)]",
                            "hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.2)]",
                            "transform hover:scale-[1.03] hover:-translate-y-1"
                          )}
                        >
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill={true}
                            className="object-cover"
                            sizes="(max-width: 768px) 33vw, 25vw"
                          />
                          {/* Enhanced overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 hover:opacity-80 transition-opacity duration-300"></div>
                          {/* Badge with enhanced styling */}
                          {book.badgeText && (
                            <div className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium text-white shadow-lg bg-gradient-to-r ${book.badgeColor}`}>
                              {book.badgeText}
                            </div>
                          )}
                          {/* Book title overlay with enhanced styling */}
                          <div className="absolute inset-0 flex items-end p-2 sm:p-3 opacity-0 hover:opacity-100 transition-opacity duration-500">
                            <div className="w-full text-center">
                              <h4 className="text-white font-bold text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 drop-shadow-md">{book.title}</h4>
                              <Button 
                                asChild
                                size="sm" 
                                className="rounded-full px-2 sm:px-3 py-1 sm:py-1.5
                                  bg-white/90 text-gray-900 
                                  hover:bg-white/100 
                                  shadow-md hover:shadow-lg
                                  transition-all duration-300
                                  backdrop-blur-sm
                                  text-[10px] sm:text-xs"
                              >
                                <Link href={`/books/${book.id}`}>
                                  <span>{ui.viewDetails}</span>
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* Book title with enhanced styling */}
                        <h4 className="mt-2 text-center text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{book.title}</h4>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Add subtle gradient fades to carousel edges */}
              <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-white/90 dark:from-gray-800/90 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-10 md:w-12 bg-gradient-to-l from-white/90 dark:from-gray-800/90 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Dialog - Enhanced with modern styling */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-md rounded-xl 
              bg-white/95 dark:bg-gray-900/95 
              backdrop-blur-md
              border border-blue-200/50 dark:border-blue-900/50 
              shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]">
              <DialogHeader>
                <DialogTitle className="text-xl text-blue-800 dark:text-blue-300 font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? 'Welcome to My Website' : 'Добре дошли в моя уебсайт'}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  {language === 'en' 
                    ? 'A personal note from Elisa Ivanova' 
                    : 'Лично съобщение от Елиса Иванова'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="bg-blue-50/80 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-100 dark:border-blue-900 text-gray-700 dark:text-gray-300">
                  <p className="text-sm leading-relaxed">
                    {language === 'en' 
                      ? 'Thank you for visiting my website. I believe that personal growth and self-discovery are lifelong journeys, and I\'m here to support you every step of the way. Whether through my books, therapy sessions, or workshops, my goal is to help you find balance and purpose in your life.' 
                      : 'Добре дошли в моето онлайн пространство! Приветствам те с любов и се радвам, че ме откри! Аз съм Елиса Иванова и съм тук, за да ти помогна и подкрепя в преодоляването на твоите трудности и сътворяването на осъзнат, мечтан живот, изпълнен с любов и хармония.'}
                  </p>
                  {language === 'bg' && (
                    <>
                      <p className="text-sm leading-relaxed mt-3">
                        За мен любовта е смисълът на всичко, което правя! Вярвам, че всеки един от нас заслужава и може да създаде своя живот мечта! А аз ще се радвам да бъда част от този процес.
                      </p>
                      <p className="text-sm leading-relaxed mt-3">
                        Консултациите и семинарите които организирам са насочени към това да изградим здрава връзка със себе си, във връзките и взаимоотношенията си и със заобикалящия ни свят; личностно развитие, преодоляване на лоши навици и придобиване на нови, които ни служат за наше благо, здравословен начин на живот, хармония и щастие.
                      </p>
                      <p className="text-sm leading-relaxed mt-3">
                        Вярвам, че в живота няма случайни неща и щом си попаднал тук, то със сигурност има нещо полезно за теб!
                      </p>
                    </>
                  )}
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button 
                    variant="outline" 
                    onClick={() => setDialogOpen(false)}
                    className="rounded-full px-3 sm:px-4 h-8 sm:h-9
                      border-blue-200 dark:border-blue-900 
                      text-blue-700 dark:text-blue-400 
                      hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    {language === 'en' ? 'Close' : 'Затвори'}
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={() => {
                      setDialogOpen(false);
                      window.location.href = "/about";
                    }}
                    className="rounded-full px-3 sm:px-4 h-8 sm:h-9
                      bg-gradient-to-r from-blue-600 to-blue-500 
                      hover:from-blue-500 hover:to-blue-400 
                      text-white font-medium
                      shadow-md hover:shadow-lg 
                      transition-all duration-300"
                  >
                    {language === 'en' ? 'Learn More' : 'Научете повече'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Include footer component if specified with enhanced styling */}
      {includeFooter && (
        <div className="mt-4 sm:mt-5 md:mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm py-1.5 sm:py-2 px-3 sm:px-4 rounded-full mx-auto w-fit shadow-sm">
          {t('hero.footerText')} 
        </div>
      )}
    </div>
  );
}

export default HeroSection; 