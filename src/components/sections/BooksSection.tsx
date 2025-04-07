"use client";

import { ArrowRight, BookOpen, Star, Bookmark, Quote, BookMarked } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselApi, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { FlipCard } from "@/components/ui/flip-card";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

// Book images with proper paths in public folder
const shopBooks = [
  {
    id: "1",
    title: "Осъзнато хранене",
    description: "Научете как да развиете по-здравословна връзка с храната. Тази книга предлага практични съвети за осъзнато хранене и създаване на устойчиви здравословни навици.",
    coverImage: "/images/books/osaznato-hranene.jpg",
    price: "30.00",
    pages: 240,
    publishDate: "2023",
    category: "Health",
    featured: true,
    topics: ["Хранителни навици", "Психология", "Благополучие"]
  },
  {
    id: "2",
    title: "Вдъхновения - Книга 2",
    description: "Продължение на поредицата с поетични размисли и насоки за личностно развитие. Текстове, които ви помагат да намерите своя път към щастието.",
    coverImage: "/images/books/vdahnovenia-kniga-2.png",
    price: "26.00",
    pages: 184,
    publishDate: "2022",
    category: "Poetry",
    featured: false,
    topics: ["Поезия", "Мотивация", "Личностно развитие"]
  },
  {
    id: "3",
    title: "Вдъхновения - Книга 1",
    description: "Сборник с вдъхновяващи мисли и поетични текстове. Идеален спътник в моменти на несигурност, предлагащ утеха и насърчение.",
    coverImage: "/images/books/vdahnovenia-kniga-1.png",
    price: "26.00",
    pages: 176,
    publishDate: "2021", 
    category: "Poetry",
    featured: false,
    topics: ["Поезия", "Вдъхновение", "Емоционално здраве"]
  },
  {
    id: "4",
    title: "Дневник на успеха",
    description: "Практическо ръководство за себепознание и личностно развитие. Книгата комбинира научни изследвания с практически упражнения за разгръщане на потенциала.",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg",
    price: "32.00",
    pages: 280,
    publishDate: "2022",
    category: "Self-help",
    featured: true,
    topics: ["Психология", "Себепознание", "Трансформация"]
  },
  {
    id: "5",
    title: "Дневник на щастието",
    description: "Изследване на аспектите на любовта и как да изградим здравословни взаимоотношения. Научете как да създавате удовлетворяващи връзки с другите.",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    price: "28.50",
    pages: 210,
    publishDate: "2023",
    category: "Relationships",
    featured: false,
    topics: ["Взаимоотношения", "Любов", "Комуникация"]
  }
];

// Define the featured book
const featuredBook = {
  id: "4",
  title: "Дневник на успеха",
  description: "Това практическо ръководство предлага техники за по-дълбоко опознаване на себе си. Базирано на съвременни психологически подходи, помага да идентифицирате силните си страни.",
  coverImage: "/images/books/dnevnik-na-uspeha.jpg",
  price: "32.00",
  pages: 280,
  publishDate: "2022",
  topics: ["Психология", "Себепознание", "Трансформация"]
};

// Custom FlipCard back component to enhance the information display
const EnhancedFlipCardBack = ({ 
  book, 
  translate, 
  onCtaClick 
}: { 
  book: typeof shopBooks[0], 
  translate: (bg: string, en: string) => string,
  onCtaClick: () => void
}) => {
  return (
    <div className="h-full w-full p-4 flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
      {/* Book title */}
      <div className="mb-auto">
        <h3 className="font-bold text-base text-black dark:text-white mb-1.5 antialiased">
          {book.title}
        </h3>
        
        {/* Category badge */}
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white mb-2 antialiased font-medium">
          {book.category}
        </span>
        
        {/* Description - without scroll, using multiple rows */}
        <div className="mb-3">
          <p className="text-sm text-black dark:text-white whitespace-normal antialiased">
            {book.description}
          </p>
        </div>
        
        {/* Topics */}
        <div className="mb-1">
          <p className="text-xs font-medium text-black dark:text-white mb-1 antialiased">{translate("Теми", "Topics")}:</p>
          <div className="flex flex-wrap gap-1">
            {book.topics.map((topic, i) => (
              <span 
                key={i}
                className="inline-block px-2 py-0.5 text-[11px] rounded-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-gray-200 dark:border-gray-600 antialiased"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Book details and CTA */}
      <div className="mt-auto">
        {/* Book details */}
        <div className="grid grid-cols-2 gap-1.5 text-xs text-black dark:text-white mb-2 border-t border-gray-200 dark:border-gray-700 pt-2 antialiased">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <BookOpen className="w-2.5 h-2.5 text-gray-600 dark:text-gray-300" />
            </span>
            <span>{translate("Страници", "Pages")}: {book.pages}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-[8px] font-bold text-gray-600 dark:text-gray-300">лв</span>
            </span>
            <span>{translate("Цена", "Price")}: {book.price} лв.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-[8px] font-bold text-gray-600 dark:text-gray-300">📅</span>
            </span>
            <span>{translate("Издадена", "Published")}: {book.publishDate}</span>
          </div>
        </div>
        
        {/* CTA button */}
        <button
          onClick={onCtaClick}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium hover:from-green-600 hover:to-teal-600 transition-colors flex items-center justify-center gap-1 antialiased"
        >
          {translate("Купи сега", "Buy Now")}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default function BooksSection() {
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  // Create a duplicate array of books for infinite scrolling
  const duplicatedBooks = [...shopBooks, ...shopBooks, ...shopBooks];
  
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
  
  return (
    <div className="relative z-0">
      {/* Green-tinted decorative background element */}
      <div className="absolute right-0 top-8 w-48 h-48 bg-gradient-to-br from-green-400/10 to-teal-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-0 bottom-8 w-48 h-48 bg-gradient-to-tr from-green-500/10 to-emerald-400/5 rounded-full blur-3xl -z-10"></div>
      
      {/* Section header with enhanced nested neumorphic design */}
      <div className="text-center mb-10">
        {/* Outer neumorphic container for headline */}
        <div className="inline-block rounded-2xl p-[3px]
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]
          dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(30,30,30,0.2)]
          mb-6">
          
          {/* Inner container for headline */}
          <div className="inline-flex items-center gap-3 px-6 py-3
            bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl 
            border border-green-100/50 dark:border-green-800/50
            shadow-inner relative">
            
            {/* Subtle pattern background */}
            <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
            
            {/* Icon with neumorphic style */}
            <div className="rounded-full p-2
              bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
              shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
              border border-green-100/50 dark:border-green-800/30 relative">
              <BookMarked className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white antialiased relative">
              {translate("Моите книги", "My Books")}
            </h2>
          </div>
        </div>
        
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-full mx-auto mb-5"></div>
        
        {/* Description text in neumorphic container */}
        <div className="max-w-2xl mx-auto rounded-xl p-[2px]
            bg-gradient-to-br from-gray-200/60 via-white/70 to-gray-100/60 
            dark:from-gray-800/60 dark:via-gray-900/70 dark:to-gray-800/60
            shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.6)]
            dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]
            mb-4">
          
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg p-4 relative
              shadow-inner border border-white/50 dark:border-gray-800/50">
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base antialiased">
              {translate(
                "Автор на поредица книги, посветени на личностното развитие, психологията и творческото мислене.",
                "Author of a series of books dedicated to personal development, psychology, and creative thinking."
              )}
            </p>
          </div>
        </div>
        
        {/* Enhanced instruction text with neumorphic badge */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 
            rounded-full bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
            text-sm text-green-700 dark:text-green-400 
            border border-green-100/50 dark:border-green-800/30 
            shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
            <BookOpen className="w-3.5 h-3.5 text-green-500" />
            {translate(
              "Задръжте или натиснете върху книга за повече информация",
              "Hover or tap on a book for more information"
            )}
          </div>
        </div>
      </div>
      
      {/* Featured book section with nested neumorphic container */}
      <div className="mb-12 rounded-2xl p-[3px]
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
          overflow-hidden">
        
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-xl relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Featured tag with enhanced neumorphic style */}
            <div className="mb-5 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 
                rounded-full bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800
                text-sm text-amber-700 dark:text-amber-400 
                border border-amber-100/50 dark:border-amber-800/30 
                shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {translate("Препоръчана книга", "Featured Book")}
              </div>
            </div>
            
            {/* Featured book content with nested neumorphic elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Book cover with enhanced neumorphic frame */}
              <div className="rounded-xl p-[3px]
                bg-gradient-to-br from-gray-200/60 via-white/70 to-gray-100/60 
                dark:from-gray-800/60 dark:via-gray-900/70 dark:to-gray-800/60
                shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)]
                dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,30,30,0.15)]
                mx-auto md:mx-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={featuredBook.coverImage} 
                      alt={featuredBook.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x400/f8f9fa/495057?text=Book+Cover";
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Book details */}
              <div className="md:col-span-2 flex flex-col space-y-4">
                {/* Title and description in subtle container */}
                <div className="p-5 rounded-xl
                  bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                  shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 antialiased">
                    {featuredBook.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm antialiased">
                    {featuredBook.description}
                  </p>
                </div>
                
                {/* Book metadata with neumorphic elements */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: translate("Страници", "Pages"), value: featuredBook.pages, icon: <BookOpen className="w-3.5 h-3.5 text-green-600/80" /> },
                    { label: translate("Година", "Year"), value: featuredBook.publishDate, icon: <span className="text-xs font-bold text-green-600/80">📅</span> },
                    { label: translate("Цена", "Price"), value: `${featuredBook.price} лв.`, icon: <span className="text-xs font-bold text-green-600/80">лв</span> }
                  ].map((item, index) => (
                    <div key={index} className="rounded-lg p-[2px]
                      bg-gradient-to-br from-gray-200/60 via-white/70 to-gray-100/60 
                      dark:from-gray-800/60 dark:via-gray-900/70 dark:to-gray-800/60
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.6)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3
                        shadow-inner border border-white/50 dark:border-gray-700/50
                        flex flex-col items-center justify-center text-center">
                        <div className="w-8 h-8 rounded-full 
                          bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                          flex items-center justify-center mb-1 
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          border border-green-100/50 dark:border-green-800/30">
                          {item.icon}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* CTA buttons with enhanced neumorphic styling */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
                  <Link 
                    href={`/book/${featuredBook.id}`} 
                    className="px-6 py-3 rounded-full 
                      bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
                      text-green-700 dark:text-green-400 font-medium
                      border border-green-100/50 dark:border-green-800/30 
                      shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]
                      dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(30,30,30,0.15)]
                      hover:shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.8),inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.8)]
                      dark:hover:shadow-[1px_1px_3px_rgba(0,0,0,0.3),-1px_-1px_3px_rgba(30,30,30,0.15),inset_1px_1px_3px_rgba(0,0,0,0.3),inset_-1px_-1px_3px_rgba(30,30,30,0.15)]
                      transition-all duration-300 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    {translate("Прочети повече", "Read More")}
                  </Link>
                  
                  <Link 
                    href={`/shop/book/${featuredBook.id}`} 
                    className="px-6 py-3 rounded-full 
                      bg-gradient-to-r from-green-500 to-teal-500 
                      text-white font-medium
                      border border-green-400/50 dark:border-green-600/30 
                      shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.1)]
                      dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-3px_-3px_6px_rgba(30,30,30,0.1)]
                      hover:shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.1),inset_1px_1px_3px_rgba(0,0,0,0.1)]
                      dark:hover:shadow-[1px_1px_3px_rgba(0,0,0,0.3),-1px_-1px_3px_rgba(30,30,30,0.1),inset_1px_1px_3px_rgba(0,0,0,0.3)]
                      transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {translate("Купи сега", "Buy Now")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book carousel section with enhanced neumorphic container */}
      <div ref={containerRef} className="relative mb-10">
        {/* Outer neumorphic container */}
        <div className="rounded-2xl p-[3px]
            bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
            dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
            shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
            dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
            overflow-hidden">
          
          {/* Inner container with gradient and shadow effects */}
          <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-6 rounded-xl relative">
            {/* Inner shadow effect */}
            <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
            
            {/* Subtle section header with neumorphic style */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5
                rounded-full bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
                text-green-700 dark:text-green-400 
                border border-green-100/50 dark:border-green-800/30 
                shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                <Bookmark className="w-3.5 h-3.5 text-green-500" />
                <h3 className="text-sm font-medium antialiased">
                  {translate("Всички книги", "All Books")}
                </h3>
              </div>
              
              <div className="inline-flex items-center">
                <button 
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 rounded-full
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Books carousel with enhanced neumorphic cards */}
            <div className="relative overflow-hidden" ref={carouselRef}>
              <motion.div
                className="flex gap-6"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={() => setIsPaused(true)}
                dragElastic={0.2}
              >
                {duplicatedBooks.map((book, index) => (
                  <div 
                    key={`${book.id}-${index}`} 
                    className="w-80 flex-shrink-0
                      rounded-xl p-[3px]
                      bg-gradient-to-br from-gray-200/60 via-white/70 to-gray-100/60 
                      dark:from-gray-800/60 dark:via-gray-900/70 dark:to-gray-800/60
                      shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)]
                      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(30,30,30,0.15)]
                      hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]
                      dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(30,30,30,0.15)]
                      transition-shadow duration-300"
                  >
                    <FlipCard
                      frontImage={book.coverImage}
                      frontTitle={book.title}
                      frontSubtitle={book.price + " лв."}
                      frontIcon={<BookOpen className="h-4 w-4" />}
                      triggerMode="hover"
                      onCtaClick={() => window.location.href = `/shop/book/${book.id}`}
                      backTitle={book.title}
                      backDescription={book.description}
                      backFeatures={book.topics || []}
                      backCta={translate("Купи сега", "Buy Now")}
                      className="h-[420px]"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Gradient fade on the left */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none"></div>
        
        {/* Gradient fade on the right */}
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none"></div>
      </div>
      
      {/* View all books CTA with enhanced neumorphic button */}
      <div className="flex justify-center mb-4">
        <Link 
          href="/books" 
          className="px-6 py-3 rounded-full 
            bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
            text-green-700 dark:text-green-400 font-medium
            border border-green-100/50 dark:border-green-800/30 
            shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]
            dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(30,30,30,0.15)]
            hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
            dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(30,30,30,0.05)]
            transition-all duration-300 flex items-center gap-2"
        >
          {translate("Разгледай всички книги", "Browse All Books")}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
} 