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
import Header from "@/components/layout/Header";
// Import other sections
import BooksSection from "../BooksSection";
import ServicesSection from "../ServicesSection";
import Testimonials from "../Testimonials";
import { Contact } from "../Contact";
import { Footer } from "@/components/layout/Footer";
// Import Book component
import { Book } from "@/components/ui/book";

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

export function HeroSection({ className, includeFooter = false }: HeroSectionProps & { includeFooter?: boolean }) {
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
      ? "Certified psychologist and author helping you create a conscious, dream life filled with love and harmony."
      : "Дипломиран психолог и автор, помагащ ви да създадете осъзнат, мечтан живот, изпълнен с любов и хармония."
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
    <div className={cn("", className)}>
      {/* Main Hero content */}
      <div className="mb-6 sm:mb-8 max-w-[1440px] mx-auto">
        {/* Outer Neumorphic Container - Green accent */}
        <div className="w-full rounded-2xl p-[2px]
            bg-gradient-to-br from-green-100/80 via-white/90 to-green-50/80 
            dark:from-green-900/30 dark:via-gray-900/90 dark:to-gray-800/80
            shadow-[5px_5px_10px_rgba(0,0,0,0.08),-5px_-5px_10px_rgba(255,255,255,0.8)]
            dark:shadow-[5px_5px_10px_rgba(0,0,0,0.25),-5px_-5px_10px_rgba(40,40,40,0.15)]">
          
          {/* Inner Neumorphic Container with green accent */}
          <div className="bg-gradient-to-br from-white/90 via-white/80 to-green-50/50 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-green-900/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 relative min-h-[calc(60vh-80px)] sm:min-h-[calc(60vh-100px)] flex flex-col justify-start shadow-inner border border-green-100/50 dark:border-green-900/30 text-center pt-8">
            {/* Subtle pattern background */}
            <div 
              className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.02] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"
              aria-hidden="true"
            ></div>
            
            {/* Green accent orbs */}
            <div className="absolute top-1/3 right-10 h-40 w-40 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/3 left-10 h-40 w-40 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Main hero content - Restructured for better consistency */}
            <motion.div
              variants={ANIMATIONS.container}
              initial="hidden"
              animate="visible"
              className="space-y-6 sm:space-y-8 max-w-4xl mx-auto"
              aria-live="polite"
            >
              {/* Avatar */}
              <motion.div variants={shouldReduceMotion ? {} : ANIMATIONS.item} className="mb-4 sm:mb-6">
                <div className="relative w-max mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur opacity-70 animate-pulse-slow"></div>
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-white dark:border-gray-800 relative">
                    <AvatarImage src="/images/author-avatar.jpg" alt={profile.altText} />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </motion.div>
              
              {/* Badge */}
              <motion.div variants={shouldReduceMotion ? {} : ANIMATIONS.item} className="mb-5 sm:mb-7">
                <Badge variant="outline" className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border-green-200 dark:border-green-900/40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                  shadow-[0_2px_5px_rgba(22,163,74,0.15)] text-xs sm:text-sm">
                  <Heart className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400" aria-hidden="true" />
                  <span className="font-medium text-green-700 dark:text-green-300">{profile.title}</span>
                </Badge>
              </motion.div>
              
              {/* Heading */}
              <motion.h1 
                variants={shouldReduceMotion ? {} : ANIMATIONS.item}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif !leading-[1.15] text-gray-900 dark:text-white tracking-tight"
              >
                {ui.transformHeading}
              </motion.h1>
            
              {/* Subheading */}
              <motion.p 
                variants={shouldReduceMotion ? {} : ANIMATIONS.item}
                className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 mx-auto max-w-2xl 
                  px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 rounded-xl 
                  bg-gradient-to-br from-white via-white to-green-50/50 dark:from-gray-800/80 dark:via-gray-800/80 dark:to-green-900/20
                  backdrop-blur-sm 
                  shadow-inner border border-green-100/50 dark:border-green-900/30 
                  leading-relaxed"
              >
                {ui.aboutText}
              </motion.p>
            
              {/* Expertise Areas Cards - Green accents */}
              <motion.div 
                variants={shouldReduceMotion ? {} : ANIMATIONS.item}
                className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6" // Adjusted to always show 3 columns on sm+
                role="navigation"
                aria-label={language === 'en' ? "Areas of expertise" : "Области на експертиза"}
              >
                {expertiseAreas.map((area, index) => (
                  <Link 
                    key={index}
                    href={area.url}
                    className="bg-white/90 dark:bg-gray-800/90 
                      backdrop-blur-sm rounded-xl p-6 sm:p-7
                      shadow-[0_10px_30px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.01)]
                      dark:shadow-[0_10px_30px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]
                      border border-gray-100 dark:border-gray-800 
                      hover:bg-gradient-to-br hover:from-green-50 hover:to-white
                      dark:hover:from-gray-800 dark:hover:to-gray-700
                      hover:shadow-[0_14px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.02)]
                      dark:hover:shadow-[0_14px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.07)]
                      transition-all duration-300 group no-underline
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onKeyDown={(e) => handleCardKeyDown(e, area.url)}
                    aria-label={`${area.title}: ${area.description}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Much larger icon with green gradient styling */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-5 
                          bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20
                          rounded-full flex items-center justify-center
                          shadow-[0_6px_12px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)]
                          dark:shadow-[0_6px_12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]
                          group-hover:shadow-[0_8px_16px_rgba(22,163,74,0.15),0_0_0_1px_rgba(22,163,74,0.05)]
                          dark:group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.08)]
                          group-hover:scale-110 transition-all duration-300" 
                      >
                        <span className="text-3xl sm:text-4xl" aria-hidden="true">{area.icon}</span>
                      </div>
                      
                      {/* Larger text with improved contrast and green accent on hover */}
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-2 
                          group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{area.title}</h3>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{area.description}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            
              {/* Call to action button - Green gradient theme */}
              <motion.div variants={shouldReduceMotion ? {} : ANIMATIONS.item} className="flex justify-center">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className={cn(
                    "rounded-full",
                    "px-8 py-6", // Increased padding
                    "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700", // Green gradient background
                    "text-white font-bold text-base sm:text-lg", // Larger, bolder text
                    "flex items-center gap-3", // Increased gap
                    "transition-all duration-300",
                    // Enhanced shadow for depth
                    "shadow-[0_4px_14px_rgba(22,163,74,0.3),0_1px_3px_rgba(22,163,74,0.2)]",
                    "hover:shadow-[0_6px_20px_rgba(22,163,74,0.4),0_1px_3px_rgba(22,163,74,0.2)]",
                    "hover:translate-y-[-2px]", // Subtle rise effect on hover
                    "active:translate-y-[1px] active:shadow-[0_2px_10px_rgba(22,163,74,0.25)]" // Press effect
                  )}
                  asChild
                  aria-label={ui.consultationLabel}
                >
                  <Link 
                    href="/contact?booking=true"
                    className="flex items-center justify-center gap-2 sm:gap-3" 
                  >
                    <SendIcon className="size-5 sm:size-6" aria-hidden="true" />
                    <span>{ui.consultationLabel}</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create a separate FeaturedContent component outside of the HeroSection
export function FeaturedContent() {
  const { language } = useLanguage();
  
  // Reuse the same hooks and data from HeroSection
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
    featuredContent: language === 'en' ? "Featured Content" : "Препоръчано съдържание",
    servicesHeader: language === 'en' ? "Services Offered" : "Предлагани услуги",
  }), [language]);
  
  return (
    <section className="mt-16 mb-12 pt-8 pb-8">
      <div className={cn(CONTAINER_WIDTH_CLASSES, "px-4 mx-auto")}>
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium rounded-full mb-3">
            {language === 'en' ? "Explore" : "Разгледайте"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative inline-block">
            <span className="relative z-10">{ui.featuredContent}</span>
            <span className="absolute -bottom-1 left-0 right-0 h-3 bg-green-100/50 dark:bg-green-900/20 -rotate-1 z-0"></span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Book - Now using Book component */}
          <div className="rounded-2xl p-[3px] h-full
              bg-gradient-to-br from-green-100/80 via-white/90 to-green-50/80 
              dark:from-green-900/20 dark:via-gray-900/90 dark:to-gray-800/80 
              shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
              dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
              overflow-hidden">
            
            {/* Book content with improved layout */}
            <div className="bg-gradient-to-br from-white via-white to-green-50/70 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-green-900/10 p-6 sm:p-7 rounded-lg relative h-full flex flex-col">
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* New book badge - Green color */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-green-500 hover:bg-green-600 px-3 py-1.5 text-white shadow-sm text-sm font-medium">
                  {ui.newBadge}
                </Badge>
              </div>
              
              <div className="relative z-10 flex flex-col flex-1">
                {/* Display the Book component */}
                <div className="flex justify-center mb-6">
                  <Book color="#4ade80" texture={true} depth={6} width={220}>
                    <div className="p-4 text-center text-black dark:text-white">
                      <h4 className="font-bold">{featuredBook.title}</h4>
                    </div>
                  </Book>
                </div>
                
                {/* Book title - Larger and better spacing */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 
                    bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 
                    bg-clip-text text-transparent">
                  {featuredBook.title}
                </h3>
                
                {/* Book metadata - Added visual structure */}
                <div className="flex items-center mb-4 text-sm space-x-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <BookOpen className="h-4 w-4 mr-1.5 text-green-500 dark:text-green-400" />
                    <span>{featuredBook.pages} {ui.pages}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="text-xs">📅</span>
                    <span className="ml-1">{ui.published}: {featuredBook.publishDate}</span>
                  </div>
                </div>
                
                {/* Book description - Better typography */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed text-base">
                  {featuredBook.description}
                </p>
                
                {/* Action area - Better structured with clearer hierarchy */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">{featuredBook.price} лв.</span>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 shadow-sm transition-all duration-200"
                      asChild
                    >
                      <Link 
                        href={`/shop/book/${featuredBook.id}/preview`}
                        className="flex items-center" 
                      >
                        {featuredBook.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] active:brightness-95"
                      asChild
                    >
                      <Link href={`/shop/book/${featuredBook.id}`}>
                        {featuredBook.buyText}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Free eBook */}
          <div className="rounded-2xl p-[3px] h-full
              bg-gradient-to-br from-green-100/80 via-white/90 to-green-50/80 
              dark:from-green-900/20 dark:via-gray-900/90 dark:to-gray-800/80 
              shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
              dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
              overflow-hidden">
            <div className="bg-gradient-to-br from-white via-white to-green-50/70 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-green-900/10 p-6 rounded-lg relative h-full flex flex-col">
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">{freeEbook.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{freeEbook.description}</p>
                
                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 shadow-sm transition-all duration-200"
                    asChild
                  >
                    <Link 
                      href="/subscribe"
                      className="flex items-center" 
                    >
                      {freeEbook.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Service offers */}
          <div className="rounded-2xl p-[3px] h-full
              bg-gradient-to-br from-green-100/80 via-white/90 to-green-50/80 
              dark:from-green-900/20 dark:via-gray-900/90 dark:to-gray-800/80 
              shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
              dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
              overflow-hidden">
            <div className="bg-gradient-to-br from-white via-white to-green-50/70 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-green-900/10 p-6 rounded-lg relative h-full flex flex-col">
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">{ui.servicesHeader}</h3>
                <div className="space-y-3 flex-grow">
                  {quickServices.map(service => (
                    <Link 
                      key={service.id}
                      href={`/services#${service.id}`}
                      className="flex items-center p-3 bg-white dark:bg-gray-700/80 rounded-lg border border-green-100/50 dark:border-green-800/30
                        hover:bg-green-50/80 dark:hover:bg-green-900/10 transition-colors duration-200
                        group no-underline"
                    >
                      <div className="mr-3 p-2 bg-green-50 dark:bg-green-800/30 rounded-full
                        group-hover:bg-green-100 dark:group-hover:bg-green-800/50 transition-colors duration-200">
                        {/* Use green color for icons */}
                        {service.icon === 'Heart' && <Heart className="h-5 w-5 text-green-500 dark:text-green-400" />}
                        {service.icon === 'UserRound' && <span className="text-green-500 dark:text-green-400">👤</span>}
                        {service.icon === 'Palette' && <span className="text-green-500 dark:text-green-400">🎨</span>}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-200">{service.title}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-green-100/50 dark:border-green-900/30">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full rounded-full border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 shadow-sm transition-all duration-200"
                    asChild
                  >
                    <Link href="/services">
                      {language === 'en' ? "View All Services" : "Всички услуги"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 