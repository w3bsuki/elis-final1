"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, BookOpen, Download, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { HeroSectionProps } from "./types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/hooks";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";

// Animations - memoized to avoid rerenders
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

export function HeroSection({ className }: HeroSectionProps) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { t, locale } = useTranslation();
  
  // Memoized data objects to prevent rerenders
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
  
  // Additional highlighted books
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
  
  // Quick service previews
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
  
  // Replace the old CTA button data with expertise areas
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
  
  const freeEbook = useMemo(() => ({
    title: language === 'en' ? "Get Your Free eBook" : "Получете безплатна електронна книга",
    description: language === 'en' 
      ? "\"5 Techniques for Stress Management\" - delivered to your inbox"
      : "\"5 Техники за Справяне със Стреса\" - директно във вашата пощенска кутия",
    buttonText: language === 'en' ? "Subscribe Now" : "Абонирайте се сега"
  }), [language]);
  
  // UI text translations
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
      ? "I am Elis - a certified psychologist and author of books, articles, and stories for children and adults. With multiple certifications from various fields, I am a specialist with rich professional experience. Over the years, I have successfully overcome many challenges. These difficulties made me stronger and more conscious, and now I am ready to help anyone seeking support and guidance to change their life for the better."
      : "Аз съм Елис - дипломиран психолог и автор на книги, статии, приказки за деца и възрастни. С множество сертификати от различни сфери, аз съм специалист с богат професионален опит. През годините съм преборила успешно множество предизвикателства. Тези трудности ме направиха по-силна и по-осъзната, и сега съм готова да помогна на всеки, който търси подкрепа и насоки, за да промени живота си към по-добро."
  }), [language]);
  
  // Handle dialog accessibility and keyboard navigation
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Handler for keyboard events on Card elements
  const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = url;
    }
  };
  
  // Improve scroll to top functionality for keyboard users
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
    <div className="relative bg-gradient-to-br from-white to-gray-100 py-10 sm:py-12">
      {/* Main container - using optimal width from constants */}
      <div className={CONTAINER_WIDTH_CLASSES}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-100 p-4 sm:p-5 md:p-6 shadow-[inset_-12px_-12px_20px_rgba(255,255,255,0.9),inset_12px_12px_20px_rgba(0,0,0,0.08),_8px_8px_20px_rgba(0,0,0,0.07)]">
          {/* Main Hero - Enhanced Neumorphic Style with improved accessibility */}
          <div className="mb-6 sm:mb-8 max-w-[1440px] mx-auto">
            {/* Outer Neumorphic Container */}
            <div className="w-full rounded-2xl p-[2px]
                bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
                dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]">
              
              {/* Inner Neumorphic Container */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 relative min-h-[calc(100vh-200px)] sm:min-h-[calc(100vh-220px)] flex flex-col justify-center shadow-inner border border-white/50 dark:border-gray-800/50 text-center">
                
                {/* Subtle pattern background */}
                <div 
                  className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.02] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"
                  aria-hidden="true"
                ></div>
                
                {/* Avatar & Badge - centered layout with improved accessibility */}
                <div className="flex flex-col items-center gap-2 mb-4 sm:mb-5 relative">
                  <div className="relative">
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger 
                        className="cursor-pointer relative z-10 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full group"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setDialogOpen(true);
                          }
                        }}
                        aria-label={ui.welcomeMessage}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-br from-gray-200/20 to-gray-100/10 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        <Avatar 
                          className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 border-2 border-white dark:border-gray-700 bg-white dark:bg-gray-800 relative 
                            shadow-[0_4px_8px_rgba(0,0,0,0.1)]" 
                        >
                          <AvatarImage src={profile.imageSrc} alt={profile.altText} />
                          <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-lg sm:text-xl lg:text-2xl">
                            {profile.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </DialogTrigger>
                      <DialogContent 
                        className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-green-200/60 dark:border-green-800/30 shadow-xl"
                        onEscapeKeyDown={() => setDialogOpen(false)}
                      >
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 font-serif text-xl">
                            <div className="rounded-full p-1.5 bg-gray-100 dark:bg-gray-800" aria-hidden="true">
                              <Heart className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            {ui.welcomeMessage}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-3 border-b pb-4 mb-4 border-gray-200 dark:border-gray-700/30">
                          <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-700">
                            <AvatarImage src={profile.imageSrc} alt={profile.altText} />
                          </Avatar>
                          <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-700">
                            <AvatarImage src={profile.imageSrc} alt={profile.altText} />
                            <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                              {profile.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 font-serif text-xl">
                            <div className="rounded-full p-1.5 bg-gray-100 dark:bg-gray-800" aria-hidden="true">
                              <Heart className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            {ui.welcomeMessage}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center gap-3 border-b pb-4 mb-4 border-gray-200 dark:border-gray-700/30">
                          <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-700 shadow-sm">
                            <AvatarImage src={profile.imageSrc} alt={profile.altText} />
                            <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                              {profile.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <p className="font-bold">{profile.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{profile.title}</p>
                          </div>
                        </div>
                        <DialogDescription className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 text-left">
                          {language === 'en' ? (
                            <>
                              <p>Welcome to my online space for creating your reality of dreams, happiness and love! I welcome you with love and I'm glad you found me! I am Elis Dzhelilova and I am here to help and support you in overcoming your difficulties in creating a conscious, dreamy life filled with love and harmony. I feel that being part of this process is happiness and calling for me. Here you will be heard, understood and supported.</p>
                              <p>For me, love is the meaning of everything I do! I believe that each of us deserves and can create their dream life! And I will be happy to be part of this process.</p>
                            </>
                          ) : (
                            <>
                              <p>Добре дошли в моето онлайн пространство за сътворяване на своята реалност на своите мечти, щастие и любов! Приветствам те с любов и се радвам, че ме откри! Аз съм Елис Джелилова и съм тук, за да ти помогна и подкрепя в преодоляването на твоите трудности сътворяването на осъзнат, мечтан живот, изпълнен с любов и хармония. Усещам, че да бъда част, от този процес за мен е щастие и призвание. Тук ще бъдеш изслушан, разбран и подкрепен.</p>
                              <p>За мен любовта е смисълът на всичко, което правя! Вярвам, че всеки един от нас заслужава и може да създаде своя живот мечта! А аз ще се радвам да бъда част от този процес.</p>
                            </>
                          )}
                        </DialogDescription>
                        <div className="flex justify-end mt-2">
                          <Button 
                            onClick={() => setDialogOpen(false)}
                            className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-white"
                          >
                            {language === 'en' ? "Close" : "Затвори"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Badge variant="outline" className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                    shadow-[0_2px_5px_rgba(0,0,0,0.08)] text-xs sm:text-sm">
                    <Heart className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                    <span className="font-medium">{profile.title}</span>
                  </Badge>
                </div>
              
                {/* Main content with animations - improved accessibility */}
                <motion.div
                  variants={ANIMATIONS.container}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5 sm:space-y-6 md:space-y-8 max-w-5xl mx-auto"
                  aria-live="polite"
                >
                  <motion.h1 
                    variants={shouldReduceMotion ? {} : ANIMATIONS.item}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif !leading-[1.15] text-gray-900 dark:text-white tracking-tight mb-3"
                  >
                    {ui.transformHeading}
                  </motion.h1>
                
                  <motion.p 
                    variants={shouldReduceMotion ? {} : ANIMATIONS.item}
                    className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-2xl 
                      px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 rounded-xl 
                      bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm 
                      shadow-inner border border-gray-100/50 dark:border-gray-700/30 
                      leading-relaxed"
                  >
                    {ui.aboutText}
                  </motion.p>
                
                  {/* Expertise Areas Cards */}
                  <motion.div 
                    variants={shouldReduceMotion ? {} : ANIMATIONS.item}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6"
                    role="navigation"
                    aria-label={language === 'en' ? "Areas of expertise" : "Области на експертиза"}
                  >
                    {expertiseAreas.map((area, index) => (
                      <Link 
                        key={index}
                        href={area.url}
                        className="bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                          backdrop-blur-sm rounded-xl p-4 sm:p-5 
                          shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                          dark:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(30,30,30,0.1)]
                          border border-gray-100 dark:border-gray-800 
                          hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                          transition-all duration-300 group no-underline
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        onKeyDown={(e) => handleCardKeyDown(e, area.url)}
                        aria-label={`${area.title}: ${area.description}`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 
                            bg-white dark:bg-gray-800 rounded-full p-3 sm:p-4
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                            group-hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:group-hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                            transition-all duration-300" 
                            aria-hidden="true">{area.icon}</span>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm md:text-base group-hover:underline group-hover:decoration-1 group-hover:underline-offset-2 transition-all">{area.title}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">{area.description}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                
                  {/* Call to action button */}
                  <motion.div variants={shouldReduceMotion ? {} : ANIMATIONS.item} className="flex justify-center mt-4 sm:mt-6">
                    <Link 
                      href="/contact?booking=true"
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full 
                        flex items-center justify-center gap-1.5 sm:gap-2
                        text-gray-700 dark:text-gray-300 font-medium
                        bg-gray-50 dark:bg-gray-800
                        shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] 
                        dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(30,30,30,0.15)]
                        text-sm sm:text-base
                        transition-all duration-300
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                        hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                        dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                        hover:text-gray-900 dark:hover:text-gray-100"
                      aria-label={ui.consultationLabel}
                    >
                      <SendIcon className="size-4 sm:size-5" aria-hidden="true" />
                      <span>{ui.consultationLabel}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Content Section - also using consistent width */}
      <div className={CONTAINER_WIDTH_CLASSES}>
        <div className="mt-16 mb-12 max-w-[1440px] mx-auto">
          <h2 className="text-2xl font-bold text-center mb-5">{ui.featuredContent}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-violet-500 mx-auto rounded-full mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Book with enhanced neumorphic container */}
            <div className="rounded-2xl p-[3px] 
                bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
                dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
                overflow-hidden w-full">
              
              {/* Book content */}
              <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-lg relative">
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                {/* New book badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-white shadow-sm">
                    {ui.newBadge}
                  </Badge>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {featuredBook.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {featuredBook.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{featuredBook.price} лв.</span>
                    <Link 
                      href={`/shop/book/${featuredBook.id}`}
                      className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      {featuredBook.buyText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Free eBook and other items */}
            <div className="space-y-4">
              <div className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">{freeEbook.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{freeEbook.description}</p>
                <Link href="/subscribe" className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  {freeEbook.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Service offers */}
            <div className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{ui.servicesHeader}</h3>
              <div className="space-y-3">
                {quickServices.map(service => (
                  <div key={service.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="mr-3 p-2 bg-gray-100 dark:bg-gray-600 rounded-full">
                      {service.icon === 'Heart' && <Heart className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                      {service.icon === 'UserRound' && <span className="text-gray-600 dark:text-gray-300">👤</span>}
                      {service.icon === 'Palette' && <span className="text-gray-600 dark:text-gray-300">🎨</span>}
                    </div>
                    <span>{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 