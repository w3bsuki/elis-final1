"use client";

import { ArrowRight, BookOpen, Star, Bookmark, Quote, BookMarked, Library } from "lucide-react";
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
import { motion, useMotionValue, useTransform, useSpring, useScroll, useVelocity, useAnimationFrame } from "framer-motion";
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
    topics: ["Хранителни навици", "Психология", "Благополучие"],
    author: "Елена Петрова",
    quote: "Храната не е просто гориво, а връзка с природата и собственото ни тяло."
  },
  {
    id: "2",
    title: "Вдъхновения - 2",
    description: "Продължение на поредицата с поетични размисли и насоки за личностно развитие. Текстове, които ви помагат да намерите своя път към щастието.",
    coverImage: "/images/books/vdahnovenia-kniga-2.png",
    price: "26.00",
    pages: 184,
    publishDate: "2022",
    category: "Poetry",
    featured: false,
    topics: ["Поезия", "Мотивация", "Личностно развитие"],
    author: "Елена Петрова",
    quote: "Вдъхновението е мостът между мечтите и реалността."
  },
  {
    id: "3",
    title: "Вдъхновения - 1",
    description: "Сборник с вдъхновяващи мисли и поетични текстове. Идеален спътник в моменти на несигурност, предлагащ утеха и насърчение.",
    coverImage: "/images/books/vdahnovenia-kniga-1.png",
    price: "26.00",
    pages: 176,
    publishDate: "2021", 
    category: "Poetry",
    featured: false,
    topics: ["Поезия", "Вдъхновение", "Емоционално здраве"],
    author: "Елена Петрова",
    quote: "Всеки ден носи нови възможности за вдъхновение и растеж."
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
    topics: ["Психология", "Себепознание", "Трансформация"],
    author: "Елена Петрова",
    quote: "Истинският успех започва със себепознание и завършва с действие."
  },
  {
    id: "5",
    title: "Дневник щастие",
    description: "Изследване на аспектите на любовта и как да изградим здравословни взаимоотношения. Научете как да създавате удовлетворяващи връзки с другите.",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    price: "28.50",
    pages: 210,
    publishDate: "2023",
    category: "Relationships",
    featured: false,
    topics: ["Взаимоотношения", "Любов", "Комуникация"],
    author: "Елена Петрова",
    quote: "Щастието не е крайна цел, а качество на пътуването."
  }
];

// Define the featured books
const featuredBooks = [
  {
    id: "4",
    title: "Дневник на успеха",
    description: "Практическо ръководство за себепознание и личностно развитие с научни изследвания и практически упражнения.",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg",
    price: "32.00",
    pages: 280,
    publishDate: "2022",
    topics: ["Психология", "Себепознание", "Трансформация"],
    author: "Елена Петрова",
    quote: "Истинският успех започва със себепознание и завършва с действие.",
    badge: {
      text: { en: "Best Seller", bg: "Бестселър" },
      icon: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />,
      bgClass: "from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800",
      textClass: "text-amber-700 dark:text-amber-400",
      borderClass: "border-amber-100/50 dark:border-amber-800/30"
    }
  },
  {
    id: "1",
    title: "Осъзнато хранене",
    description: "Научете как да развиете по-здравословна връзка с храната и да създадете устойчиви здравословни навици.",
    coverImage: "/images/books/osaznato-hranene.jpg",
    price: "30.00",
    pages: 240,
    publishDate: "2023",
    topics: ["Хранителни навици", "Психология", "Благополучие"],
    author: "Елена Петрова",
    quote: "Храната не е просто гориво, а връзка с природата и собственото ни тяло.",
    badge: {
      text: { en: "Newest Book", bg: "Нова книга" },
      icon: <span className="text-lg text-green-500">🆕</span>,
      bgClass: "from-green-50 to-white dark:from-green-900/20 dark:to-gray-800",
      textClass: "text-green-700 dark:text-green-400",
      borderClass: "border-green-100/50 dark:border-green-800/30"
    }
  },
  {
    id: "5",
    title: "Дневник щастие",
    description: "Изследване на аспектите на любовта и как да изградим здравословни взаимоотношения и удовлетворяващи връзки с другите.",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    price: "28.50",
    pages: 210,
    publishDate: "2023",
    topics: ["Взаимоотношения", "Любов", "Комуникация"],
    author: "Елена Петрова",
    quote: "Щастието не е крайна цел, а качество на пътуването.",
    badge: {
      text: { en: "Digital Book", bg: "Електронна книга" },
      icon: <span className="text-lg text-blue-500">💻</span>,
      bgClass: "from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800",
      textClass: "text-blue-700 dark:text-blue-400",
      borderClass: "border-blue-100/50 dark:border-blue-800/30"
    }
  }
];

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
    <div className="h-full w-full flex flex-col bg-white dark:bg-gray-800 rounded-xl p-5 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-100/40 to-transparent dark:from-green-900/20 rounded-bl-3xl" />
      
      {/* Book title with accent */}
      <div className="relative">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 pr-8">
          {book.title}
        </h3>
        <div className="w-16 h-1 bg-green-500 rounded-full mb-5"></div>
      </div>
      
      {/* Description - primary focus */}
      <div className="flex-grow mb-5">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-6">
          {book.description}
        </p>
      </div>
      
      {/* Quote - if there's space */}
      {book.quote && (
        <div className="mb-6 pl-3 border-l-2 border-green-400 dark:border-green-600">
          <p className="text-sm italic text-gray-600 dark:text-gray-400 line-clamp-2">
            "{book.quote}"
          </p>
        </div>
      )}
      
      {/* Button */}
      <button
        onClick={onCtaClick}
        className="w-full py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors shadow-sm"
      >
        {translate("Прочети повече", "Read More")}
      </button>
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
      
      {/* Enhanced Books Container with nested neumorphic styling - now includes header */}
      <div className="rounded-2xl p-[5px] mb-12
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
          overflow-hidden">
        
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-green-50/30 via-white/40 to-green-50/30 dark:from-green-900/20 dark:via-gray-900/20 dark:to-green-900/20 p-8 rounded-xl relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          {/* Section header - now nested inside the main container */}
          <div className="text-center mb-8 relative z-10">
            {/* Enhanced header with special badge styling */}
            <div className="inline-flex flex-col items-center justify-center">
              {/* Main title with badge-like appearance */}
              <div className="relative inline-flex items-center justify-center mb-4">
                {/* Decorative gradient blob behind the title */}
                <div className="absolute -z-10 w-full h-full scale-150 bg-gradient-to-br from-green-400/20 via-teal-300/10 to-blue-400/5 dark:from-green-400/10 dark:via-teal-300/5 dark:to-blue-400/5 blur-2xl rounded-full"></div>
                
                {/* Badge container - reduced padding and size */}
                <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                  px-5 py-3 rounded-xl
                  shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                  dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                  flex items-center gap-3 border border-green-200/50 dark:border-green-800/30">
                  
                  {/* Left icon with enhanced styling - smaller */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-300/20 blur-xl rounded-full"></div>
                    <div className="rounded-full p-2
                      bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                      border border-green-100/50 dark:border-green-800/30 relative">
                      <BookMarked className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                    </div>
                  </div>
                  
                  {/* Title with text color changed to black - smaller */}
                  <div className="flex flex-col items-start">
                    <h2 className="text-xl md:text-2xl font-bold font-serif antialiased relative
                      text-gray-900 dark:text-white
                      flex items-center gap-2">
                      {translate("Моите книги", "My Books")}
                      {/* Fixed second icon to match original */}
                      <div className="rounded-full p-2
                        bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                        shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                        dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                        border border-green-100/50 dark:border-green-800/30 relative">
                        <BookMarked className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                      </div>
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* Description text */}
              <div className="max-w-2xl mx-auto mb-5">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg antialiased leading-relaxed">
                  {translate(
                    "Автор на поредица книги, посветени на личностното развитие",
                    "Author of books dedicated to personal development"
                  )}
                </p>
              </div>
            </div>
          </div>
      
          {/* Featured books section - Grid of 3 featured books with improved spacing and responsiveness */}
          <div className="mb-10 relative z-10">
            {/* Grid layout for three featured books with improved spacing and responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBooks.map((book, index) => (
                <div key={book.id} className="flex flex-col transform transition-all duration-300 hover:translate-y-[-8px]">
                  {/* Improved book container with sharper design and better shadows */}
                  <div className="rounded-xl p-[2px] flex flex-col h-full
                    bg-gradient-to-br from-gray-100 via-white to-gray-50 
                    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                    shadow-lg hover:shadow-xl transition-all duration-300">
                    
                    {/* Inner content with improved contrast and spacing */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-5 flex flex-col h-full border border-gray-100 dark:border-gray-800">
                      
                      {/* Badge repositioned to top center for better visual balance */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className={cn(
                          "flex items-center gap-1.5 px-4 py-2",
                          "rounded-full",
                          `bg-gradient-to-r ${book.badge.bgClass}`,
                          book.badge.textClass,
                          "border",
                          book.badge.borderClass,
                          "shadow-md",
                          "text-sm font-medium"
                        )}>
                          {book.badge.icon}
                          <span className="whitespace-nowrap">{translate(book.badge.text.bg, book.badge.text.en)}</span>
                        </div>
                      </div>
                      
                      {/* Nested card design with inner border */}
                      <div className="rounded-lg border-2 border-gray-100 dark:border-gray-800 p-4 mb-4 mt-5
                        bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/90
                        shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]
                        dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
                        
                        {/* Side-by-side layout for cover and info */}
                        <div className="flex gap-4">
                          {/* Book cover with improved proportions and shadows */}
                          <div className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg relative overflow-hidden 
                            shadow-md
                            w-1/3 min-w-[100px]">
                            <img 
                              src={book.coverImage} 
                              alt={book.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/300x400/f8f9fa/495057?text=Book+Cover";
                              }}
                            />
                          </div>
                          
                          {/* Book info with better typography and spacing */}
                          <div className="w-2/3">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                              {book.title}
                            </h3>
                            
                            {/* Description with better readability and more height */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-4 min-h-[4.8rem]">
                              {book.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Book metadata in an organized grid */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { label: translate("Страници", "Pages"), value: book.pages, icon: <BookOpen className="w-3.5 h-3.5 text-green-600/80" /> },
                          { label: translate("Година", "Year"), value: book.publishDate, icon: <span className="text-xs font-bold text-green-600/80">📅</span> },
                          { label: translate("Цена", "Price"), value: `${book.price} лв.`, icon: <span className="text-xs font-bold text-green-600/80">лв</span> }
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-gray-50/70 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-700/50">
                            <div className="w-6 h-6 rounded-full 
                              bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-gray-800
                              flex items-center justify-center 
                              shadow-sm mb-1
                              border border-green-100/50 dark:border-green-800/30">
                              {item.icon}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA buttons with improved design */}
                      <div className="flex gap-3 mt-auto rounded-lg border-2 border-gray-100 dark:border-gray-800 p-3
                        bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/90
                        shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]
                        dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
                        <Link 
                          href={`/shop/book/${book.id}`} 
                          className="flex-1 px-4 py-2.5 rounded-lg text-sm
                            bg-white dark:bg-gray-800
                            text-green-700 dark:text-green-400 font-medium
                            border border-green-200 dark:border-green-800/50 
                            shadow-sm hover:shadow-md transition-all duration-300 
                            flex items-center justify-center
                            hover:bg-gray-50 dark:hover:bg-gray-700/80"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          {translate("Детайли", "Details")}
                        </Link>
                        
                        <Link 
                          href={`/shop/book/${book.id}`} 
                          className="flex-1 px-4 py-2.5 rounded-lg text-sm
                            bg-gradient-to-r from-green-500 to-teal-500 
                            text-white font-medium
                            border border-green-400/50 dark:border-green-600/30 
                            shadow-sm hover:shadow-md transition-all duration-300
                            flex items-center justify-center
                            hover:from-green-600 hover:to-teal-600"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          {translate("Купи", "Buy")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Carousel Section */}
      <div ref={containerRef} className="relative overflow-hidden py-8 mb-10">
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
            <div className="flex justify-between items-center mb-2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5
                rounded-full bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
                text-green-700 dark:text-green-400 
                border border-green-100/50 dark:border-green-800/30 
                shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                <Bookmark className="w-4 h-4 text-green-500" />
                <h3 className="text-base font-medium antialiased">
                  {translate("Всички книги", "All Books")}
                </h3>
                {/* Added library icon */}
                <Library className="w-4 h-4 text-green-500 ml-1" />
              </div>
              
              {/* Centered instruction badge */}
              <div className="flex-1 flex justify-center mx-2">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-teal-300/20 to-green-400/20 dark:from-green-400/10 dark:via-teal-300/10 dark:to-green-400/10 blur-xl rounded-full -z-10"></div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5
                    rounded-full bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900
                    text-sm text-green-700 dark:text-green-400 
                    border border-green-100/50 dark:border-green-800/30 
                    shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                    dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    {translate(
                      "Задръжте или натиснете върху книга за повече информация",
                      "Hover or tap on a book for more information"
                    )}
                  </div>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-1.5">
                {/* Remove instruction badge from here */}
                
                <Link 
                  href="/shop?category=books" 
                  className="px-3 py-1.5 rounded-full 
                    bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
                    text-green-700 dark:text-green-400 font-medium text-base
                    border border-green-100/50 dark:border-green-800/30 
                    shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]
                    dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3),-2px_-2px_4px_rgba(30,30,30,0.15)]
                    hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]
                    dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(30,30,30,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(30,30,30,0.05)]
                    transition-all duration-300 flex items-center gap-1.5"
                >
                  {translate("Разгледай всички книги", "Browse All Books")}
                  <ChevronRight className="w-4 h-4" />
                </Link>
                
                <button 
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1.5 rounded-full
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Books carousel with enhanced neumorphic cards */}
            <div className="relative overflow-hidden px-2" ref={carouselRef}>
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
                    className="w-72 flex-shrink-0
                      rounded-xl 
                      transform transition-all duration-300 hover:translate-y-[-5px]
                      hover:shadow-xl
                      group"
                  >
                    <div className="p-1 rounded-xl border-2 border-gray-100 dark:border-gray-800 
                      bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800
                      group-hover:from-green-50 group-hover:to-white dark:group-hover:from-green-900/30 dark:group-hover:to-gray-800/90
                      transition-all duration-300">
                      {/* Return to using FlipCard with better styling */}
                      <FlipCard
                        frontImage={book.coverImage}
                        frontTitle={book.title}
                        frontSubtitle={`${book.pages} ${translate("стр.", "pages")} • ${book.publishDate}`}
                        frontIcon={<BookOpen className="h-4 w-4" />}
                        frontFooter={book.price + " лв."}
                        triggerMode="hover"
                        onCtaClick={() => window.location.href = `/shop/book/${book.id}`}
                        backComponent={
                          <EnhancedFlipCardBack
                            book={book}
                            translate={translate}
                            onCtaClick={() => window.location.href = `/shop/book/${book.id}`}
                          />
                        }
                        className="h-[380px] shadow-lg"
                        frontClassName="bg-white dark:bg-gray-800"
                        backClassName="bg-white dark:bg-gray-800"
                      />
                    </div>
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
    </div>
  );
} 