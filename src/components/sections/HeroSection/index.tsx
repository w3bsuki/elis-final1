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
  
  const ctaButtons = useMemo(() => ({
    primary: {
      label: language === 'en' ? "Book a Session" : "Запазете Час",
      href: "/contact?booking=true"
    },
    secondary: {
      label: language === 'en' ? "View Services" : "Вижте Услугите", 
      href: "#services"
    }
  }), [language]);
  
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
    aboutAuthor: language === 'en' ? "About Author" : "За автора"
  }), [language]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-0.5 overflow-hidden"
    >
      <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
        {/* Glass panel effect with inner shadow */}
        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-0">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            
            {/* Left column - Text content */}
            <div className="space-y-6">
              {/* Avatar & Badge - centered layout */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500 to-green-600 rounded-full blur opacity-70"></div>
                  <Avatar className="h-20 w-20 border-2 border-white bg-white relative">
                    <AvatarImage src={profile.imageSrc} alt={profile.name} />
                    <AvatarFallback className="bg-green-50 text-green-600 font-medium">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Badge variant="outline" className="px-4 py-1.5 rounded-full border-green-200 bg-green-50/80 backdrop-blur-sm">
                  <Heart className="w-4 h-4 mr-2 text-green-600" />
                  {profile.title}
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
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif !leading-[1.2] text-gray-900 dark:text-white"
                >
                  {language === 'en' 
                    ? "Transform Your Life"
                    : "Трансформирай Живота Си"
                  }
                </motion.h1>
              
                <motion.p 
                  variants={ANIMATIONS.item}
                  className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl"
                >
                  {language === 'en'
                    ? "I specialize in providing personalized psychological support and creative approaches for personal growth. My books and workshops offer additional resources for transformation."
                    : "Специализирам в предоставянето на персонализирана психологическа подкрепа и творчески подходи за личностно развитие. Книгите и семинарите ми предлагат допълнителни ресурси за трансформация."
                  }
                </motion.p>
              
                {/* CTA Buttons */}
                <motion.div variants={ANIMATIONS.item} className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-6 h-auto shadow-lg shadow-green-600/20 transition-all hover:scale-105 hover:shadow-xl"
                    asChild
                  >
                    <Link href={ctaButtons.primary.href}>
                      {ctaButtons.primary.label}
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-full border-2 border-green-600 text-green-600 font-medium px-8 py-6 h-auto hover:bg-green-50 hover:text-green-700 transition-all hover:scale-105"
                    asChild
                  >
                    <Link href={ctaButtons.secondary.href}>
                      {ctaButtons.secondary.label}
                    </Link>
                  </Button>
                </motion.div>

                {/* Free eBook section - With neumorphism styling */}
                <motion.div
                  variants={ANIMATIONS.item}
                  className="mt-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md relative overflow-hidden"
                >
                  {/* Inner shadow for neumorphism effect */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/60 to-gray-100/60 dark:from-gray-800/30 dark:to-gray-900/30 rounded-lg shadow-inner pointer-events-none"></div>
                
                  {/* Decorative glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
                
                  <div className="flex items-start gap-4 relative">
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl shadow-sm flex-shrink-0 backdrop-blur-sm">
                      <Download className="size-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-lg">
                        {freeEbook.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {freeEbook.description}
                      </p>
                      <Button 
                        size="sm" 
                        className="mt-3 bg-green-600 hover:bg-green-700 rounded-full shadow-md px-4 transition-all hover:shadow-lg hover:translate-y-[-2px]" 
                        asChild
                      >
                        <Link href="/subscribe" className="flex items-center gap-1">
                          {freeEbook.buttonText}
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Right column - Image / Featured book */}
            <div className="lg:h-full flex flex-col justify-center items-center">
              {/* Right column - Featured Book with neumorphic container */}
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden h-full">
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
                      <div className="w-full md:w-1/3 aspect-[3/4] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md flex items-center justify-center relative overflow-hidden flex-shrink-0">
                        {/* Inner shadow for depth */}
                        <div className="absolute inset-2 bg-gradient-to-tr from-gray-100 to-white dark:from-gray-800 dark:to-gray-700 rounded-md shadow-inner"></div>
                        <BookOpen className="size-16 text-green-500/60 relative z-10" />
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
                          <div className="flex items-center gap-2">
                            <div className="size-8 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 shadow-inner border border-gray-200 dark:border-gray-700/50">
                              <span className="text-xs font-medium text-green-600 dark:text-green-400">{featuredBook.pages}</span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">{ui.pages}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/20 shadow-inner border border-gray-200 dark:border-gray-700/50">
                              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{featuredBook.publishDate}</span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">{ui.published}</span>
                          </div>
                        </div>
                      
                        {/* Price and buttons - integrated into the book section */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-lg font-bold text-green-600">
                            {featuredBook.price} лв.
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-full border-2 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors font-medium h-8 px-4 py-0" 
                              asChild
                            >
                              <Link href={`/book-preview/${featuredBook.id}`}>
                                {featuredBook.buttonText}
                              </Link>
                            </Button>
                            <Button 
                              size="sm" 
                              className="rounded-full bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md transition-all font-medium h-8 px-4 py-0" 
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
                
                  {/* Other Books Section with neumorphic cards */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 relative z-10">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      {language === 'en' ? "More Books by Author" : "Още книги от автора"}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {otherBooks.map((book) => (
                        <div 
                          key={book.id} 
                          className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                        >
                          {/* Inner shadow for neumorphic effect */}
                          <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded shadow-inner pointer-events-none"></div>
                        
                          <div className="flex justify-between items-start relative">
                            <div className="w-8 h-10 bg-gradient-to-br from-green-100 to-white dark:from-green-900/30 dark:to-green-800/20 rounded flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                              <BookOpen className="size-4 text-green-600/70" />
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

                  {/* Quick Services Preview - neural style cards */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 relative z-10">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      {language === 'en' ? "Services Offered" : "Предлагани услуги"}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {quickServices.map((service) => (
                        <div 
                          key={service.id}
                          className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                        >
                          {/* Inner shadow effect */}
                          <div className="absolute inset-1 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded shadow-inner pointer-events-none"></div>
                        
                          <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-2 shadow-inner border border-gray-200 dark:border-gray-700/50 relative">
                            {service.icon === "Heart" && <Heart className="size-4 text-green-600" />}
                            {service.icon === "UserRound" && <span className="size-4 text-green-600">👤</span>}
                            {service.icon === "Palette" && <span className="size-4 text-green-600">🎨</span>}
                          </div>
                          <span className="text-xs text-center font-medium text-gray-900 dark:text-gray-100 relative">{service.title}</span>
                        </div>
                      ))}
                    </div>
                  
                    {/* Replace the two buttons with a single neumorphic consultation button */}
                    <div className="mt-5 flex justify-center">
                      <Link 
                        href="/contact?booking=true"
                        className={`
                          px-6 py-3 rounded-full 
                          flex items-center justify-center gap-2 
                          text-gray-600 dark:text-gray-400 font-medium
                          bg-gray-50 dark:bg-gray-800
                          shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.15)] 
                          dark:shadow-[-5px_-5px_10px_rgba(40,40,40,0.15),_5px_5px_10px_rgba(0,0,0,0.35)]
                        
                          transition-all duration-300

                          hover:shadow-[-1px_-1px_5px_rgba(255,255,255,0.6),_1px_1px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_4px_rgba(0,0,0,0.15)]
                          dark:hover:shadow-[-1px_-1px_5px_rgba(40,40,40,0.2),_1px_1px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(40,40,40,0.2),inset_2px_2px_4px_rgba(0,0,0,0.3)]
                          hover:text-green-600 dark:hover:text-green-500
                        `}
                      >
                        <SendIcon className="size-4" />
                        <span>{language === 'en' ? "Book Consultation" : "Запазете Консултация"}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 