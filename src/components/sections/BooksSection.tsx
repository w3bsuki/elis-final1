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
      
      {/* Section header with badge implemented like Testimonials */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 
          bg-gradient-to-br from-white/80 to-green-50/60 dark:from-gray-800/80 dark:to-green-900/30
          border border-green-200/50 dark:border-green-800/30
          rounded-full 
          shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.1)] 
          dark:shadow-[-2px_-2px_5px_rgba(40,40,40,0.25),_2px_2px_5px_rgba(0,0,0,0.3)]
          backdrop-blur-sm
        ">
          <BookMarked className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
          <h2 className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white antialiased">
            {translate("Моите Книги", "My Books")}
          </h2>
        </div>
        
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-400 rounded-full mx-auto mb-4"></div>
        
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base antialiased">
          {translate(
            "Разгледайте моята колекция от книги за личностно развитие и емоционално благополучие.",
            "Browse my collection of books on personal development and emotional well-being."
          )}
        </p>
        
        {/* Info message with neumorphic badge */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 text-sm text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/30 shadow-sm">
            <Quote className="w-3.5 h-3.5 text-green-500" />
            {translate(
              "Задръжте върху книга, за да видите повече информация",
              "Hover on a book to see more information"
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced Book Carousel with nested container styling */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden mb-8">
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-gray-50/50 via-white/50 to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900/30 dark:to-gray-900/50 p-4 rounded-lg relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          {/* Carousel Container - inside the nested design */}
          <div 
            ref={containerRef}
            className="relative z-10 overflow-hidden cursor-grab active:cursor-grabbing rounded-xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white/90 via-white/70 to-transparent dark:from-gray-900/90 dark:via-gray-900/70 dark:to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white/90 via-white/70 to-transparent dark:from-gray-900/90 dark:via-gray-900/70 dark:to-transparent pointer-events-none"></div>
            
            <motion.div 
              ref={carouselRef}
              className="flex min-w-full whitespace-nowrap"
              style={{ x }}
              drag="x"
            >
              {duplicatedBooks.map((book, index) => (
                <div
                  key={`${book.id}-${index}`}
                  className="min-w-[320px] md:min-w-[280px] h-[380px] px-2 inline-block"
                >
                  <div className="flip-card-container relative h-full w-full perspective-1000 flip-on-hover">
                    <div className="flip-card relative w-full h-full transition-transform duration-700 transform-style-3d">
                      {/* Front Side - Enhanced with neumorphic styling */}
                      <div className="flip-card-front absolute w-full h-full backface-hidden">
                        <div className="relative h-full rounded-xl overflow-hidden border border-green-200/50 dark:border-green-800/30 bg-white/95 dark:bg-gray-800/95 shadow-lg hover:shadow-xl transition-shadow">
                          {/* Image */}
                          <div className="relative h-2/3 w-full overflow-hidden">
                            <Image
                              src={book.coverImage}
                              alt={book.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          </div>
                          
                          {/* Enhanced Popular Badge with neumorphic style */}
                          {book.featured && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                              Popular
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="absolute bottom-0 w-full p-6 space-y-2">
                            {/* Icon container with enhanced neumorphic styling */}
                            {book.featured ? 
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/30 dark:to-amber-800/20 border border-amber-200/50 dark:border-amber-800/30 shadow-sm mb-2">
                                <Star className="w-4 h-4 fill-amber-500" />
                              </div>
                              : 
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-50 to-white dark:from-green-900/30 dark:to-green-800/20 border border-green-200/50 dark:border-green-800/30 shadow-sm mb-2">
                                <BookOpen className="w-4 h-4 text-green-500" />
                              </div>
                            }
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{book.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{book.price} лв.</p>
                            
                            <div className="pt-2 text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                              {translate("Научи повече", "Learn more")} <ChevronRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back Side - with enhanced container */}
                      <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180">
                        <EnhancedFlipCardBack 
                          book={book}
                          translate={translate}
                          onCtaClick={() => window.location.href = `/book/${book.id}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Book categories and quick links - new nested section */}
          <div className="mt-6 pt-4 border-t border-green-200/30 dark:border-green-800/30 relative z-10">
            <div className="flex flex-wrap justify-center gap-2">
              {["All", "Self-help", "Poetry", "Health", "Relationships"].map((category) => (
                <div 
                  key={category}
                  className="px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 border border-green-200/50 dark:border-green-800/30 shadow-sm hover:shadow text-sm text-gray-700 dark:text-gray-300 cursor-pointer transition-all hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* View All Books CTA with enhanced neumorphic styling */}
      <div className="flex justify-center mb-4">
        <Link 
          href="/books" 
          className={`
            px-6 py-3 rounded-full 
            flex items-center justify-center gap-2 
            text-green-700 dark:text-green-400 font-medium
            bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800
            shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.15)] 
            dark:shadow-[-5px_-5px_10px_rgba(40,40,40,0.15),_5px_5px_10px_rgba(0,0,0,0.35)]
            border border-green-200/50 dark:border-green-800/30
            transition-all duration-300

            hover:shadow-[-1px_-1px_5px_rgba(255,255,255,0.6),_1px_1px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_4px_rgba(0,0,0,0.15)]
            dark:hover:shadow-[-1px_-1px_5px_rgba(40,40,40,0.2),_1px_1px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(40,40,40,0.2),inset_2px_2px_4px_rgba(0,0,0,0.3)]
            hover:text-green-600 dark:hover:text-green-300
          `}
        >
          {translate("Разгледай всички книги", "Browse All Books")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
} 