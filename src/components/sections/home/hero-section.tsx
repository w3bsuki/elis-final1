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
  
  // The render JSX is kept identical to the original
  return (
    <div className={cn("relative w-full min-h-screen overflow-hidden", className)} ref={ref}>
      {/* Main container that fits viewport exactly */}
      <div className="absolute inset-0 top-[10px] flex items-start justify-center">
        <div className="w-[99.5%] max-w-none px-0 mx-auto">
          {/* Outer container with 3D nested look */}
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-green-200/60 to-emerald-100/50 dark:from-green-700/40 dark:to-emerald-800/30 shadow-xl shadow-green-100/30 dark:shadow-green-900/30">
            {/* Middle container */}
            <div className="p-1 rounded-lg bg-gradient-to-br from-white/90 via-white/80 to-green-50/70 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-green-950/50 shadow-md">
              {/* Inner main container */}
              <div className="bg-gradient-to-br from-white/95 via-white/95 to-green-50/90 dark:from-gray-900/95 dark:via-gray-900/95 dark:to-green-950/15 backdrop-blur-sm rounded-lg border border-green-200/80 dark:border-green-800/50 shadow-sm p-4 md:p-6 lg:p-8 mt-0">
                {/* Subtle pattern background */}
                <div 
                  className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"
                  aria-hidden="true"
                ></div>
                
                {/* Subtle accent orbs - enhanced */}
                <div className="absolute top-1/4 right-1/6 h-64 w-64 bg-green-200/20 dark:bg-green-900/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/3 left-1/6 h-56 w-56 bg-green-100/20 dark:bg-green-900/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-2/3 left-1/3 h-40 w-40 bg-blue-100/10 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
                
                {/* Main Hero Content - centered design */}
                <div className="flex flex-col items-center justify-center text-center relative z-10 min-h-[calc(100vh-150px)]">
                  {/* Profile Image - with enhanced styling */}
                  <motion.div 
                    variants={ANIMATIONS.item}
                    initial="hidden"
                    animate="visible"
                    className="relative z-20 mb-6"
                  >
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <div className="relative cursor-pointer transform hover:scale-[1.03] transition-all duration-300 group" aria-label={language === 'bg' ? 'Отвори приветствено съобщение' : 'Open welcome message'}>
                          {/* Decorative rings around avatar */}
                          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-green-300/20 dark:border-green-700/20 animate-spin-slow"></div>
                          <div className="absolute -inset-6 rounded-full border border-green-200/10 dark:border-green-800/10"></div>
                          
                          {/* Outer glow */}
                          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-300/20 dark:from-emerald-500/20 dark:to-teal-400/15 blur-md transform scale-110 animate-pulse-slow"></div>
                          
                          {/* The actual avatar container */}
                          <div className="p-1.5 rounded-full bg-gradient-to-br from-green-200 to-emerald-100 dark:from-green-700 dark:to-emerald-800 relative z-10 shadow-xl">
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 border-2 border-white dark:border-gray-900 shadow-md group-hover:shadow-lg transition-all duration-300 relative">
                              <AvatarImage
                                src="/images/avatar/avatar.jpg"
                                alt={language === 'en' ? "Profile photo of Elisa Ivanova" : "Профилна снимка на Елиса Иванова"}
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                              <AvatarFallback>{language === 'en' ? "EI" : "ЕИ"}</AvatarFallback>
                            </Avatar>
                          </div>
                          
                          {/* Enhanced message indicator */}
                          <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-400 dark:from-green-400 dark:to-emerald-300 rounded-full border-2 border-white dark:border-gray-800 shadow-md flex items-center justify-center animate-pulse z-20">
                            <SendIcon className="h-2.5 w-2.5 text-white" />
                          </div>
                          
                          {/* Improved floating message hint */}
                          <div className="absolute -right-2 top-1/2 transform translate-x-full -translate-y-1/2 px-3 py-1.5 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-green-100 dark:border-green-900/50 text-sm font-medium text-green-700 dark:text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-white dark:bg-gray-900 border-l border-t border-green-100 dark:border-green-900/50"></div>
                            {language === 'en' ? 'Click for message' : 'Кликнете за съобщение'}
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md rounded-lg border-green-200/50 dark:border-green-900/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                        <DialogHeader>
                          <DialogTitle className="text-xl text-green-800 dark:text-green-300 font-semibold">
                            {language === 'en' ? 'Welcome to My Website' : 'Добре дошли в моя уебсайт'}
                          </DialogTitle>
                          <DialogDescription className="text-gray-600 dark:text-gray-400">
                            {language === 'en' 
                              ? 'A personal note from Elisa Ivanova' 
                              : 'Лично съобщение от Елиса Иванова'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                          <div className="bg-green-50/80 dark:bg-green-900/20 p-4 rounded-md border border-green-100 dark:border-green-900 text-gray-700 dark:text-gray-300">
                            <p className="text-sm leading-relaxed">
                              {language === 'en' 
                                ? 'Thank you for visiting my website. I believe that personal growth and self-discovery are lifelong journeys, and I\'m here to support you every step of the way. Whether through my books, therapy sessions, or workshops, my goal is to help you find balance and purpose in your life.' 
                                : 'Добре дошли в моето онлайн пространство за сътворяване на своята реалност на своите мечти, щастие и любов! Приветствам те с любов и се радвам, че ме откри! Аз съм Елис Джелилова и съм тук, за да ти помогна и подкрепя в преодоляването на твоите трудности сътворяването на осъзнат, мечтан живот, изпълнен с любов и хармония. Усещам, че да бъда част, от този процес за мен е щастие и призвание. Тук ще бъдеш изслушан, разбран и подкрепен.\nЗа мен любовта е смисълът на всичко, което правя! Вярвам, че всеки един от нас заслужава и може да създаде своя живот мечта! А аз ще се радвам да бъда част от този процес.\nКонсултациите и семинарите които организирам са насочени към това да изградим здрава връзка със себе си, във връзките и взаимоотношенията си и със заобикалящия ни свят; личностно развитие, преодоляване на лоши навици и придобиване на нови, които ни служат за наше благо, здравословен начин на живот, хармония и щастие.\nВярвам, че в живота няма случайни неща и щом си попаднал тук, то със сигурност има нещо полезно за теб!'}
                            </p>
                          </div>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setDialogOpen(false)}
                              className="rounded-full px-4 border-green-200 dark:border-green-900 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                            >
                              {language === 'en' ? 'Close' : 'Затвори'}
                            </Button>
                            <Button 
                              variant="default" 
                              onClick={() => {
                                setDialogOpen(false);
                                window.location.href = "/about";
                              }}
                              className="rounded-full px-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-medium"
                            >
                              {language === 'en' ? 'Learn More' : 'Научете повече'}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                  
                  {/* Author intro badge */}
                  <motion.div 
                    variants={ANIMATIONS.item}
                    className="px-3 py-1.5 rounded-full bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-medium text-sm mb-4 inline-flex items-center border border-green-200/50 dark:border-green-800/30"
                  >
                    <span className="mr-1.5">✦</span> {language === 'en' ? 'Author • Psychologist • Life Coach' : 'Автор • Психолог • Лайф Коуч'}
                  </motion.div>
                  
                  {/* Main heading - single line with improved styling */}
                  <motion.div
                    variants={ANIMATIONS.item}
                    className="relative overflow-hidden mb-4 max-w-4xl"
                  >
                    <h1 className="text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] lg:text-[4.2rem] font-bold font-playfair leading-[1.1] tracking-tight whitespace-nowrap">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-800 via-emerald-700 to-green-800 dark:from-green-300 dark:via-emerald-200 dark:to-green-300 animate-text-shimmer bg-[length:200%_auto]">
                        {language === 'en' ? 'Transform Your Life' : 'Трансформирай Твоя Живот'}
                      </span>
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500/80 via-green-400/50 to-transparent dark:from-green-400/80 dark:via-green-500/50 dark:to-transparent rounded-full"></div>
                    </h1>
                    {/* Subtle decorative elements */}
                    <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-green-300/20 dark:border-green-700/30 rounded-tl-lg"></div>
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-green-300/20 dark:border-green-700/30 rounded-br-lg"></div>
                  </motion.div>
                    
                  {/* Author description - fixed to display in exactly 2 rows total */}
                  <motion.p 
                    variants={ANIMATIONS.item}
                    className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl font-medium leading-relaxed mb-6"
                  >
                    {language === 'en' 
                      ? <span>Join me on a journey of <span className="text-emerald-700 dark:text-emerald-400 font-semibold">self-discovery</span> and personal growth. {" "}
                        As a certified psychologist and author, I help people create <span className="text-emerald-700 dark:text-emerald-400 font-semibold">conscious, meaningful lives</span>.</span>
                      : <span>Присъединете се към мен в пътуването към <span className="text-emerald-700 dark:text-emerald-400 font-semibold">себепознание</span> и личностно израстване. {" "}
                        Като дипломиран психолог и автор, помагам на хората да създадат <span className="text-emerald-700 dark:text-emerald-400 font-semibold">осъзнат, мечтан живот</span>.</span>}
                  </motion.p>
                  
                  {/* CTA Buttons - with improved styling */}
                  <motion.div 
                    variants={ANIMATIONS.item}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-8"
                  >
                    <Button 
                      asChild 
                      size="lg" 
                      className="group rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 border-0 px-6 py-3 sm:px-7 sm:py-3.5 text-base font-medium shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] transition-all duration-300 relative overflow-hidden"
                    >
                      <Link href="/services#consultation" className="flex items-center justify-center">
                        {/* Subtle button animation */}
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10 flex items-center justify-center -ml-1 mr-2 w-8 h-8 bg-white/20 rounded-full">
                          <BookOpen className="h-4 w-4 text-white" />
                        </span>
                        <span className="font-medium tracking-wide text-white">
                          {language === 'bg' ? 'Безплатна Консултация' : 'Free Consultation'}
                        </span>
                        <ArrowRight className="ml-2 h-5 w-5 text-white/80 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild 
                      variant="outline" 
                      size="lg" 
                      className="group rounded-full bg-white/80 dark:bg-gray-900/50 border border-green-200 dark:border-green-800/50 px-6 py-3 sm:px-7 sm:py-3.5 text-base font-medium text-green-700 dark:text-green-400 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/10"
                    >
                      <Link href="/shop" className="flex items-center justify-center">
                        <span className="font-medium">
                          {language === 'bg' ? 'Разгледай Книгите' : 'Browse Books'}
                        </span>
                        <ChevronRight className="ml-1 h-5 w-5 text-green-600/80 dark:text-green-500/80 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </motion.div>
                  
                  {/* Framer Motion Infinite Scrolling Book Carousel */}
                  <motion.div 
                    variants={ANIMATIONS.item}
                    className="w-full max-w-5xl relative mt-4"
                  >
                    {/* Premium nested container */}
                    <div className="p-2 rounded-2xl bg-gradient-to-br from-green-200/30 to-emerald-100/20 dark:from-green-700/30 dark:to-emerald-800/20 shadow-lg">
                      <div className="p-0.5 rounded-xl bg-gradient-to-br from-white/80 via-white/60 to-green-50/60 dark:from-gray-800/80 dark:via-gray-900/60 dark:to-green-950/40">
                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg border border-green-100/80 dark:border-green-800/30 shadow-inner">
                          
                          {/* Pure Framer Motion carousel with infinite scrolling */}
                          <div className="py-2 px-3 h-[220px] sm:h-[240px] md:h-[260px] relative overflow-hidden">
                            {/* Edge fade gradients */}
                            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/90 dark:from-gray-900/90 to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/90 dark:from-gray-900/90 to-transparent z-10 pointer-events-none"></div>
                            
                            {/* Framer motion scrolling track */}
                            <motion.div
                              className="flex space-x-6 absolute top-0 bottom-0 py-4"
                              initial={{ x: 0 }}
                              animate={{ 
                                x: [0, -heroBooks.length * 150], 
                              }}
                              transition={{
                                x: {
                                  duration: 20,
                                  repeat: Infinity,
                                  ease: "linear"
                                }
                              }}
                            >
                              {/* First set of books */}
                              {heroBooks.map((book, index) => (
                                <Link 
                                  key={`book-${book.id}`} 
                                  href={`/shop/${book.id}`} 
                                  className="group flex-none"
                                >
                                  <div className="relative h-[180px] sm:h-[200px] md:h-[220px] w-[130px] sm:w-[140px] md:w-[150px] transition-all duration-300 rounded-lg shadow-md group-hover:shadow-xl overflow-hidden">
                                    <Image
                                      src={book.coverImage}
                                      alt={book.title}
                                      fill
                                      className="object-cover rounded-lg border border-white/50 dark:border-gray-800/50 transition-all duration-300 group-hover:brightness-[0.85] group-hover:scale-[1.05]"
                                      sizes="(max-width: 640px) 130px, (max-width: 768px) 140px, 150px"
                                    />
                                    
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                                      {/* View icon in the middle */}
                                      <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                          <circle cx="12" cy="12" r="3" />
                                        </svg>
                                      </div>
                                      
                                      {/* Book title on hover */}
                                      <div className="text-white text-center text-sm font-medium mx-2 mb-1.5">{book.title}</div>
                                      
                                      {/* Click for info text */}
                                      <div className="bg-black/60 backdrop-blur-sm text-white text-xs py-1 px-2.5 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 shadow-lg flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                                          <circle cx="12" cy="12" r="10" />
                                          <path d="M12 16v-4" />
                                          <path d="M12 8h.01" />
                                        </svg>
                                        {language === 'en' ? 'Click for info' : 'Кликни за инфо'}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                              
                              {/* Duplicate set for infinite scrolling */}
                              {heroBooks.map((book, index) => (
                                <Link 
                                  key={`book-dup-${book.id}`} 
                                  href={`/shop/${book.id}`} 
                                  className="group flex-none"
                                >
                                  <div className="relative h-[180px] sm:h-[200px] md:h-[220px] w-[130px] sm:w-[140px] md:w-[150px] transition-all duration-300 rounded-lg shadow-md group-hover:shadow-xl overflow-hidden">
                                    <Image
                                      src={book.coverImage}
                                      alt={book.title}
                                      fill
                                      className="object-cover rounded-lg border border-white/50 dark:border-gray-800/50 transition-all duration-300 group-hover:brightness-[0.85] group-hover:scale-[1.05]"
                                      sizes="(max-width: 640px) 130px, (max-width: 768px) 140px, 150px"
                                    />
                                    
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                                      {/* View icon in the middle */}
                                      <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-full transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                          <circle cx="12" cy="12" r="3" />
                                        </svg>
                                      </div>
                                      
                                      {/* Book title on hover */}
                                      <div className="text-white text-center text-sm font-medium mx-2 mb-1.5">{book.title}</div>
                                      
                                      {/* Click for info text */}
                                      <div className="bg-black/60 backdrop-blur-sm text-white text-xs py-1 px-2.5 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 shadow-lg flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                                          <circle cx="12" cy="12" r="10" />
                                          <path d="M12 16v-4" />
                                          <path d="M12 8h.01" />
                                        </svg>
                                        {language === 'en' ? 'Click for info' : 'Кликни за инфо'}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* "View all books" link */}
                    <div className="mt-5 text-center">
                      <Link 
                        href="/shop" 
                        className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-white/90 to-green-50/90 dark:from-gray-900/90 dark:to-green-950/80 border border-green-200/60 dark:border-green-800/40 text-sm font-medium text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'View all books' : 'Виж всички книги'}
                        <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
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