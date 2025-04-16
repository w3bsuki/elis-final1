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
import { BookExcerptDialog } from "./BookExcerptDialog";

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
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: 0.1, 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  },
  carousel: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  },
  bookItem: {
    whileHover: { 
      scale: 1.03, 
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }
};

// Book images
const heroBooks = [
  {
    id: "1",
    title: "Осъзнато хранене",
    coverImage: "/images/books/osaznato-hranene.jpg",
    badge: "new",
    excerpt: "Храната е най-голямото удоволствие за повечето от нас. Всеки човек има различни вкусови предпочитания и начин на хранене. Храната е навик, култура, биохимични и психологически процеси.\n\nОсъзнатото хранене е начин, по който разбирате по-добре своите хранителни навици и развивате дългосрочни положителни хранителни навици. Това е метод, който ви помага да установите връзка между храната и тялото си, като се фокусирате върху физическите усещания, които храната ви дава.\n\nВ тази книга ще намерите съвети как да преодолеете навиците си и да изградите по-здравословен начин на живот, който ще ви помогне да отслабнете и да се чувствате по-добре."
  },
  {
    id: "2",
    title: "Вдъхновения - Книга 2",
    coverImage: "/images/books/vdahnovenia-kniga-2.png",
    badge: "ebook",
    excerpt: "Понякога не знаеш как да продължиш напред. Въртиш се в кръг. Чувстваш се сам, объркан и не виждаш изход. Питаш се защо точно на теб се случва всичко това. Чувстваш се отчаян.\n\nТази книга е създадена специално за такива моменти. Когато се чувстваш загубен, просто я отвори на произволна страница. Думите, които ще прочетеш, ще те вдъхновят и ще ти дадат насока как да продължиш напред.\n\n\"Остави миналото зад гърба си. То вече е отминало. Погледни напред с надежда. Само ти имаш силата да промениш живота си.\""
  },
  {
    id: "3",
    title: "Вдъхновения - Книга 1",
    coverImage: "/images/books/vdahnovenia-kniga-1.png",
    badge: "bestseller",
    excerpt: "Първата книга от поредицата \"Вдъхновения\" е създадена, за да ти помага във всеки труден момент, когато имаш нужда от насока, съвет или просто малко мъдрост.\n\nЖивотът ни поставя пред трудни изпитания. Изгубваш се в собствените си мисли, не знаеш какво да направиш и накъде да поемеш.\n\nОтвори тази книга на произволна страница и прочети думите, които се появят пред очите ти. Те ще ти дадат точно това, от което имаш нужда в момента.\n\n\"Спри да се страхуваш от това, което може да се случи. Повярвай в себе си и в своите способности. Ти си по-силен, отколкото мислиш.\""
  },
  {
    id: "4",
    title: "Дневник на успеха",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg",
    badge: null,
    excerpt: "Успехът не е случайност - той е резултат от ясна визия, конкретни цели и последователни действия. Този дневник е създаден, за да ви помогне да организирате мислите си, да поставите цели и да следите своя напредък.\n\nВсеки ден е нова възможност да направите крачка напред към своите мечти. Започнете с това да запишете какво искате да постигнете и защо това е важно за вас.\n\nПомнете, че неуспехите не са провали, а ценни уроци по пътя към успеха. Научете се да приемате предизвикателствата и да продължавате напред, независимо от трудностите. Вярвайте в себе си и в своите способности - вие можете!"
  },
  {
    id: "5",
    title: "Дневник на щастието",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    badge: "ebook",
    excerpt: "Щастието е състояние на ума, което можем да култивираме всеки ден. Този дневник ще ви помогне да откриете малките радости в ежедневието и да изградите позитивен манталитет.\n\nЗапочвайки деня си с благодарност и завършвайки го с размисъл върху постиженията, постепенно ще промените начина, по който възприемате света около вас.\n\nВсеки ден има свои предизвикателства, но също така и своите благословии. Научете се да забелязвате доброто и да се радвате на малките неща. Щастието е във вас - трябва само да го откриете и да му позволите да разцъфне."
  },
  {
    id: "6",
    title: "Житейски Уроци",
    coverImage: "/images/books/osaznato-hranene.jpg",
    badge: "bestseller",
    excerpt: "Животът е изпълнен с безценни уроци, които чакат да бъдат открити. В тази книга ще намерите мъдрост, която ще ви помогне да погледнете на своите изпитания от нова перспектива.\n\nПонякога най-трудните моменти ни носят най-важните уроци. Научете се да виждате възможността за растеж във всяко предизвикателство.\n\n\"Животът не е за това колко пъти падаш, а колко пъти се изправяш. Всеки нов ден е възможност за ново начало.\""
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
  const [selectedBook, setSelectedBook] = useState<typeof heroBooks[0] | null>(null);
  
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
      readTheBook: language === 'en' ? 'Read Preview' : 'Прочетете откъс',
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

  // Handle book selection
  const handleBookSelect = (book: typeof heroBooks[0]) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };
  
  // Handle dialog close
  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Reset selected book after animation completes
      setTimeout(() => setSelectedBook(null), 300);
    }
  };

  return (
    <div 
      className="relative z-0 min-h-[100vh] h-screen mt-[-4rem] sm:mt-[-6rem] md:mt-[-8rem] lg:mt-[-10rem] !pt-0 flex items-center justify-center overflow-hidden"
      ref={ref}
    >
      {/* Enhanced decorative background elements with animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/90 via-green-50/20 to-white/90 dark:from-gray-950/90 dark:via-green-950/10 dark:to-gray-950/90"></div>
      <div className="absolute -top-[10%] left-[5%] w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-green-200/30 via-emerald-200/30 to-teal-200/30 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-full blur-[100px] sm:blur-[150px] -z-10 animate-pulse-slow"></div>
      <div className="absolute -bottom-[20%] right-[5%] w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-tr from-teal-200/30 via-green-200/30 to-emerald-200/30 dark:from-teal-900/20 dark:via-green-900/20 dark:to-emerald-900/20 rounded-full blur-[100px] sm:blur-[150px] -z-10 animate-pulse-slower"></div>
      
      {/* Atmospheric accent patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_45%)] pointer-events-none -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.1),transparent_45%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.05),transparent_45%)] pointer-events-none -z-10"></div>
      
      {/* Main container - enhanced glass card with improved styling */}
      <div className="w-full h-full max-h-screen py-4 sm:py-6 md:py-8 lg:py-10 flex items-center justify-center px-0 sm:px-0 md:px-0 overflow-auto">
        {/* Hero card with enhanced glass morphism */}
        <div 
          className="relative w-full max-w-[1600px] mx-auto rounded-2xl sm:rounded-3xl 
            bg-gradient-to-br from-white/80 via-white/90 to-white/80 
            dark:from-gray-900/80 dark:via-gray-900/85 dark:to-gray-900/80
            backdrop-blur-md 
            border border-white/40 dark:border-white/10
            shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] 
            dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
            p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col items-center
            max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          {/* Inner decorative accents */}
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gradient-to-bl from-green-100/30 to-transparent dark:from-green-900/20 rounded-bl-[300px] -z-1 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-emerald-100/30 to-transparent dark:from-emerald-900/20 rounded-tr-[300px] -z-1 pointer-events-none"></div>
          
          {/* Profile/Avatar with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center mb-1 sm:mb-2 md:mb-3"
          >
            {/* Avatar Circle with enhanced styling */}
            <div
              onClick={() => setDialogOpen(true)}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-1 sm:mb-2 rounded-full 
                bg-gradient-to-br from-green-500 to-emerald-500 
                border-4 border-white dark:border-gray-800 
                shadow-[0_15px_35px_rgba(16,185,129,0.2)]
                dark:shadow-[0_15px_35px_rgba(16,185,129,0.15)]
                cursor-pointer flex items-center justify-center relative
                transform transition-all duration-300 hover:scale-105"
            >
              <span className="text-white text-base sm:text-lg md:text-xl font-bold">EI</span>
              <div className="absolute -right-1 -bottom-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                bg-gradient-to-br from-teal-500 to-emerald-400 dark:from-teal-400 dark:to-emerald-300 
                rounded-full border-3 border-white dark:border-gray-800 
                shadow-lg flex items-center justify-center
                animate-pulse-slow"
              >
                <SendIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-white" />
              </div>
            </div>
            
            {/* Name and title with improved typography */}
            <div className="text-center mb-0">
              <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 dark:text-white">{profile.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{profile.title}</p>
            </div>
          </motion.div>

          {/* Main Content: Headline, description, CTAs with enhanced styling */}
          <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3 w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] 
                font-extrabold tracking-tight leading-[1.05] text-center 
                bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400
                bg-clip-text text-transparent drop-shadow-sm
                mb-1 sm:mb-1 md:mb-2 max-w-[96%] mx-auto"
            >
              {ui.transformHeading}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 text-center max-w-4xl mb-1 sm:mb-2 md:mb-3"
            >
              {ui.aboutText}
            </motion.p>
            
            {/* CTA Buttons with enhanced styling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center mb-2 sm:mb-3 md:mb-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="rounded-full shadow-lg hover:shadow-xl 
                  bg-gradient-to-r from-green-600 via-emerald-600 to-green-700
                  hover:from-green-700 hover:via-emerald-700 hover:to-green-800
                  text-white font-medium h-8 sm:h-9 md:h-10 px-3 sm:px-4 md:px-5 
                  border border-green-500/20 hover:border-green-300/60
                  transition-all duration-300 transform hover:-translate-y-0.5
                  text-[10px] sm:text-xs md:text-sm"
              >
                <Link href="/books" className="flex items-center gap-1 sm:gap-1.5">
                  <BookIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                  <span>{ui.exploreBooks}</span>
                  <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="rounded-full h-8 sm:h-9 md:h-10 px-3 sm:px-4 md:px-5
                  border-2 border-green-400/30 dark:border-green-400/20 
                  text-green-700 dark:text-green-400 
                  hover:bg-green-50/80 dark:hover:bg-green-900/20
                  hover:border-green-400/50 dark:hover:border-green-400/30
                  shadow-md hover:shadow-lg
                  transition-all duration-300 transform hover:-translate-y-0.5
                  text-[10px] sm:text-xs md:text-sm"
              >
                <Link href="/services" className="flex items-center gap-1 sm:gap-1.5">
                  <HeartHandshake className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                  <span>{ui.services}</span>
                  <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Book carousel with modern styling */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={ANIMATIONS.carousel}
            className="w-full mt-1 sm:mt-2"
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <h3 className="text-base sm:text-lg md:text-xl font-bold 
                bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400
                bg-clip-text text-transparent"
              >
                {language === 'en' ? 'My Books' : 'Моите Книги'}
              </h3>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Button 
                  onClick={handlePrevBook}
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full 
                    text-gray-700 dark:text-gray-300 
                    hover:text-green-600 dark:hover:text-green-400 
                    hover:bg-green-50/80 dark:hover:bg-green-900/20 
                    border border-transparent hover:border-green-200/60 dark:hover:border-green-800/40
                    shadow-sm hover:shadow-md
                    transition-all duration-300"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 rotate-180" />
                  <span className="sr-only">{language === 'en' ? 'Previous book' : 'Предишна книга'}</span>
                </Button>
                <Button 
                  onClick={handleNextBook}
                  size="icon" 
                  variant="ghost" 
                  className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full 
                    text-gray-700 dark:text-gray-300 
                    hover:text-green-600 dark:hover:text-green-400 
                    hover:bg-green-50/80 dark:hover:bg-green-900/20 
                    border border-transparent hover:border-green-200/60 dark:hover:border-green-800/40
                    shadow-sm hover:shadow-md
                    transition-all duration-300"
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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
              py-2 sm:py-3"
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
                      <motion.div
                        whileHover={ANIMATIONS.bookItem.whileHover}
                        className={cn(
                          "relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer",
                          "shadow-[0_15px_30px_-8px_rgba(0,0,0,0.25)] dark:shadow-[0_15px_30px_-8px_rgba(0,0,0,0.4)]"
                        )}
                        onClick={() => handleBookSelect(book)}
                      >
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill={true}
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 25vw"
                          loading={index < 4 ? "eager" : "lazy"}
                          priority={index < 4}
                        />
                        {/* Enhanced overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 hover:opacity-80 transition-opacity duration-300"></div>
                        {/* Badge with enhanced styling */}
                        {book.badgeText && (
                          <div className={`absolute top-1 right-1 sm:top-1.5 sm:right-1.5 px-1 sm:px-1.5 py-0.5 rounded-full text-[8px] sm:text-xs font-medium text-white shadow-lg bg-gradient-to-r ${book.badgeColor}`}>
                            {book.badgeText}
                          </div>
                        )}
                        {/* Book title overlay with enhanced styling */}
                        <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2 text-white flex flex-col items-center justify-end">
                          <h4 className="text-white font-bold text-[10px] sm:text-xs md:text-sm mb-1 drop-shadow-md text-center line-clamp-2">{book.title}</h4>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              className="h-6 rounded-full px-1.5 sm:px-2 py-0 sm:py-0.5
                                bg-white/90 text-gray-900 
                                hover:bg-white/100 
                                shadow-md 
                                text-[8px] sm:text-[10px]"
                            >
                              <span>{ui.readTheBook}</span>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Book title with enhanced styling */}
                      <h4 className="mt-1 text-center text-[10px] sm:text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{book.title}</h4>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Add subtle gradient fades to carousel edges */}
              <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 md:w-10 bg-gradient-to-r from-white/90 dark:from-gray-800/90 to-transparent pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 md:w-10 bg-gradient-to-l from-white/90 dark:from-gray-800/90 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Book excerpt dialog */}
          {selectedBook && (
            <BookExcerptDialog
              book={selectedBook}
              open={dialogOpen}
              onOpenChange={handleDialogOpenChange}
            />
          )}
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