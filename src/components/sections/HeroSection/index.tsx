"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight, BookOpen, Download, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { HeroSectionProps } from "./types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  
  // Memoized data objects to prevent rerenders
  const profile = useMemo(() => ({
    imageSrc: "/images/avatar.jpg",
    name: language === 'en' ? "Elisa Ivanova" : "Елиса Иванова",
    title: language === 'en' ? "Psychologist & Art Therapist" : "Психолог & Арт Терапевт"
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
      icon: "🧠",
      title: language === 'en' ? "Anxiety & Depression" : "Тревожност & Депресия",
      description: language === 'en' ? "Evidence-based approaches" : "Подходи, базирани на доказателства"
    },
    {
      icon: "🌱",
      title: language === 'en' ? "Personal Growth" : "Личностно развитие",
      description: language === 'en' ? "Self-discovery journey" : "Пътуване към себеоткриване"
    },
    {
      icon: "❤️",
      title: language === 'en' ? "Relationships" : "Взаимоотношения",
      description: language === 'en' ? "Building healthy connections" : "Изграждане на здрави връзки"
    }
  ], [language]);
  
  const freeEbook = useMemo(() => ({
    title: language === 'en' ? "Get Your Free eBook" : "Получете безплатна електронна книга",
    description: language === 'en' 
      ? "\"5 Techniques for Stress Management\" - delivered to your inbox"
      : "\"5 Техники за Справяне със Стреса\" - директно във вашата пощенска кутия",
    buttonText: language === 'en' ? "Subscribe Now" : "Абонирайте се сега"
  }), [language]);
  
  const ui = useMemo(() => ({
    newBadge: language === 'en' ? "New" : "Ново",
    pages: language === 'en' ? "pages" : "стр.",
    published: language === 'en' ? "Published" : "Издадена",
    aboutAuthor: language === 'en' ? "About Author" : "За автора",
    featuredContent: language === 'en' ? "Featured Content" : "Препоръчано съдържание"
  }), [language]);
  
  return (
    <div className="relative z-0">
      {/* Main Hero - Enhanced Neumorphic Style */}
      <div className="mb-16">
        {/* Outer Neumorphic Container */}
        <div className="max-w-3xl mx-auto rounded-2xl p-[3px]
            bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
            dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
            shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
            dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]">
          
          {/* Inner Neumorphic Container */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 relative
              shadow-inner border border-white/50 dark:border-gray-800/50 text-center">
            
            {/* Subtle pattern background */}
            <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
            
            {/* Avatar & Badge - centered layout */}
            <div className="flex flex-col items-center gap-3 mb-8 relative">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500 to-green-600 rounded-full blur opacity-70"></div>
                <Avatar className="h-20 w-20 border-2 border-white bg-white relative 
                  shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]" 
                  aria-label={profile.name}>
                  <AvatarImage src={profile.imageSrc} alt={profile.name} />
                  <AvatarFallback className="bg-green-50 text-green-600 font-medium">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Badge variant="outline" className="px-4 py-1.5 rounded-full border-green-200 bg-green-50/80 backdrop-blur-sm
                shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                <Heart className="w-4 h-4 mr-2 text-green-600" aria-hidden="true" />
                <span>{profile.title}</span>
              </Badge>
            </div>
          
            {/* Main content with animations */}
            <motion.div
              variants={ANIMATIONS.container}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h1 
                variants={ANIMATIONS.item}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif !leading-[1.2] text-gray-900 dark:text-white tracking-tight"
              >
                {language === 'en' 
                  ? "Transform Your Life"
                  : "Трансформирай Живота Си"
                }
              </motion.h1>
            
              <motion.p 
                variants={ANIMATIONS.item}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mx-auto"
              >
                {language === 'en'
                  ? "I specialize in providing personalized psychological support and creative approaches for personal growth. My books and workshops offer additional resources for transformation."
                  : "Специализирам в предоставянето на персонализирана психологическа подкрепа и творчески подходи за личностно развитие. Книгите и семинарите ми предлагат допълнителни ресурси за трансформация."
                }
              </motion.p>
            
              {/* Expertise Areas Cards - enhanced neumorphic style */}
              <motion.div 
                variants={ANIMATIONS.item}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8"
                aria-label={language === 'en' ? "Areas of expertise" : "Области на експертиза"}
              >
                {expertiseAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                      dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                      backdrop-blur-sm rounded-xl p-5 
                      shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(30,30,30,0.1)]
                      border border-gray-100 dark:border-gray-800 
                      hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                      dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                      transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl mb-2 
                        bg-white dark:bg-gray-800 rounded-full p-3
                        shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                        dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                        group-hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                        dark:group-hover:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(30,30,30,0.1)]
                        transition-all duration-300" 
                        aria-hidden="true">{area.icon}</span>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{area.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{area.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA button - enhanced neumorphic style */}
              <motion.div variants={ANIMATIONS.item} className="flex justify-center mt-8">
                <Link 
                  href="/contact?booking=true"
                  className={`
                    px-7 py-3 rounded-full 
                    flex items-center justify-center gap-3
                    text-gray-600 dark:text-gray-400 font-medium
                    bg-gray-50 dark:bg-gray-800
                    shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)] 
                    dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(30,30,30,0.15)]
                    text-base
                    transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2

                    hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                    dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                    hover:text-green-600 dark:hover:text-green-500
                  `}
                  aria-label={language === 'en' ? "Schedule a consultation appointment" : "Запазете час за консултация"}
                >
                  <SendIcon className="size-4" aria-hidden="true" />
                  <span>{language === 'en' ? "Schedule Consultation" : "Запазете Консултация"}</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Content Section - Enhanced Neumorphic Style */}
      <div className="mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">
            {ui.featuredContent}
          </h2>
          <div className="mt-2 w-24 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Book with enhanced neumorphic container */}
          <div className="rounded-2xl p-[3px] 
              bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
              dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
              shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
              dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
              overflow-hidden w-full">
            
            {/* Inner container with gradient and shadow effects */}
            <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-lg relative">
              {/* Inner shadow effect */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
            
              {/* New book badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-white shadow-sm">
                  {ui.newBadge}
                </Badge>
              </div>
            
              {/* Book presentation with relative positioning */}
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Book cover with neumorphic effect */}
                  <div className="w-full md:w-1/3 aspect-[3/4] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md flex items-center justify-center relative overflow-hidden flex-shrink-0" aria-label={`Book cover: ${featuredBook.title}`}>
                    {/* Inner shadow for depth */}
                    <div className="absolute inset-2 bg-gradient-to-tr from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 rounded-md shadow-inner"></div>
                    <BookOpen className="size-16 text-green-500/60 relative z-10" aria-hidden="true" />
                  </div>
                
                  {/* Book details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {featuredBook.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {featuredBook.description}
                      </p>
                    </div>
                  
                    {/* Book metadata with neumorphic elements */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2" aria-label={`${featuredBook.pages} ${ui.pages}`}>
                        <div className="size-8 flex items-center justify-center rounded-full 
                            bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                            border border-green-100/50 dark:border-green-800/30">
                          <span className="text-xs font-medium text-green-600 dark:text-green-400">{featuredBook.pages}</span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{ui.pages}</span>
                      </div>
                      <div className="flex items-center gap-2" aria-label={`${ui.published}: ${featuredBook.publishDate}`}>
                        <div className="px-2 py-1 rounded 
                            bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                            border border-amber-100/50 dark:border-amber-800/30">
                          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{featuredBook.publishDate}</span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">{ui.published}</span>
                      </div>
                    </div>
                  
                    {/* Price and buttons - integrated into the book section */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-lg font-bold text-green-600" aria-label={`${featuredBook.price} лв.`}>
                        {featuredBook.price} лв.
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full border-2 border-green-600 text-green-600 
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                            hover:bg-green-50 hover:text-green-700 
                            hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]
                            dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(30,30,30,0.05)]
                            transition-all duration-300 font-medium h-8 px-4 py-0 focus:ring-2 focus:ring-green-600 focus:ring-offset-2" 
                          asChild
                        >
                          <Link href={`/book-preview/${featuredBook.id}`}>
                            {featuredBook.buttonText}
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          className="rounded-full bg-green-600 hover:bg-green-700 
                            shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.1)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.05)]
                            hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1)]
                            dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.05),inset_1px_1px_2px_rgba(0,0,0,0.2)]
                            transition-all duration-300 font-medium h-8 px-4 py-0 focus:ring-2 focus:ring-green-600 focus:ring-offset-2" 
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
            
              {/* Other Books Section with enhanced neumorphic cards */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 relative z-10">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  {language === 'en' ? "More Books by Author" : "Още книги от автора"}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {otherBooks.map((book) => (
                    <div 
                      key={book.id} 
                      className="p-4 
                        bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                        dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                        backdrop-blur-sm rounded-xl
                        shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                        dark:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(30,30,30,0.1)]
                        border border-gray-100 dark:border-gray-800 
                        hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                        dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                        transition-all duration-300 cursor-pointer relative overflow-hidden"
                      aria-label={`${book.title} - ${book.price} лв.`}
                    >
                      {/* Inner shadow for neumorphic effect */}
                      <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded shadow-inner pointer-events-none"></div>
                    
                      <div className="flex justify-between items-start relative">
                        <div className="w-10 h-12 
                            bg-gradient-to-br from-green-100 to-white dark:from-green-900/30 dark:to-green-800/20 
                            rounded-lg flex items-center justify-center mr-3 flex-shrink-0 
                            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                            border border-green-100/50 dark:border-green-800/30">
                          <BookOpen className="size-5 text-green-600/70" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{book.title}</p>
                          <p className="text-xs text-green-600 font-medium mt-1">{book.price} лв.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side with Free eBook and Services */}
          <div className="space-y-6">
            {/* Free eBook section */}
            <div className="rounded-2xl p-[3px] 
                bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
                dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
                overflow-hidden w-full">
              <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-lg relative">
                {/* Inner shadow */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="p-4 bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                      dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                      backdrop-blur-sm rounded-xl
                      shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(30,30,30,0.1)]
                      border border-gray-100 dark:border-gray-800 
                      hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                      dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                      transition-all duration-300 relative overflow-hidden">
                    {/* Inner shadow */}
                    <div className="absolute inset-1 bg-gradient-to-br from-white/60 to-gray-100/60 dark:from-gray-800/30 dark:to-gray-900/30 rounded-lg shadow-inner pointer-events-none"></div>
                    
                    <div className="flex items-center gap-4 relative">
                      <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-full
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          flex-shrink-0">
                        <Download className="size-5 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-base">
                          {freeEbook.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {freeEbook.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 rounded-full 
                          shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.1)] 
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.05)]
                          px-4 py-2 h-auto transition-all 
                          hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1)] 
                          dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.05),inset_1px_1px_2px_rgba(0,0,0,0.2)]
                          focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                        asChild
                      >
                        <Link href="/subscribe" className="flex items-center gap-2 text-sm whitespace-nowrap">
                          {freeEbook.buttonText}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Services Preview - enhanced neumorphic cards */}
            <div className="rounded-2xl p-[3px] 
                bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
                dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
                overflow-hidden w-full">
              <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-lg relative">
                {/* Inner shadow */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                <div className="relative z-10">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4 text-lg">
                    {language === 'en' ? "Services Offered" : "Предлагани услуги"}
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-3" role="list">
                    {quickServices.map((service) => (
                      <div 
                        key={service.id}
                        className="flex flex-col items-center justify-center p-4
                          bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80 
                          backdrop-blur-sm rounded-xl
                          shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.8)]
                          dark:shadow-[4px_4px_8px_rgba(0,0,0,0.15),-4px_-4px_8px_rgba(30,30,30,0.1)]
                          border border-gray-100 dark:border-gray-800 
                          hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                          transition-all duration-300 cursor-pointer relative overflow-hidden"
                        role="listitem"
                        aria-label={service.title}
                      >
                        {/* Inner shadow effect */}
                        <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded shadow-inner pointer-events-none"></div>
                      
                        <div className="w-12 h-12 rounded-full 
                          bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                          flex items-center justify-center mb-3 
                          shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.8)]
                          dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]
                          border border-green-100/50 dark:border-green-800/30 relative
                          group-hover:shadow-[1px_1px_3px_rgba(0,0,0,0.05),-1px_-1px_3px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:group-hover:shadow-[1px_1px_3px_rgba(0,0,0,0.2),-1px_-1px_3px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
                          transition-all duration-300">
                          {service.icon === "Heart" && <Heart className="size-5 text-green-600" aria-hidden="true" />}
                          {service.icon === "UserRound" && <span className="size-5 text-green-600" aria-hidden="true">👤</span>}
                          {service.icon === "Palette" && <span className="size-5 text-green-600" aria-hidden="true">🎨</span>}
                        </div>
                        <span className="text-sm text-center font-medium text-gray-900 dark:text-gray-100 relative">{service.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 