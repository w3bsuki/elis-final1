"use client";

import { ArrowRight, BookOpen, Star, Bookmark, Quote, BookMarked, Library, Book, Clock, FileText, DollarSign, ShoppingCart, Play, Pause, Gift } from "lucide-react";
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
import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, useSpring, useScroll, useVelocity, useAnimationFrame, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import React from "react";

// Custom hook for monitoring performance
const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    // Track render time only in development mode
    if (process.env.NODE_ENV !== 'development') return;
    
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Log if render takes too long (potential performance issue)
      if (renderTime > 16.67) { // 60fps threshold (16.67ms)
        console.warn(`[Performance] ${componentName} rendered slowly: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
};

// Lazy loading optimization helper
const useIsVisible = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
};

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
      icon: <Star className="w-4 h-4 text-black" />,
      bgClass: "from-amber-100 to-amber-50 dark:from-amber-800/40 dark:to-amber-900/20",
      textClass: "text-black dark:text-white",
      borderClass: "border-amber-200 dark:border-amber-700/50"
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
      icon: <span className="text-sm text-black dark:text-white font-bold">🆕</span>,
      bgClass: "from-green-100 to-green-50 dark:from-green-800/40 dark:to-green-900/20",
      textClass: "text-black dark:text-white",
      borderClass: "border-green-200 dark:border-green-700/50"
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
      icon: <span className="text-sm text-black dark:text-white font-bold">💻</span>,
      bgClass: "from-blue-100 to-blue-50 dark:from-blue-800/40 dark:to-blue-900/20",
      textClass: "text-black dark:text-white",
      borderClass: "border-blue-200 dark:border-blue-700/50"
    }
  },
  {
    id: "3",
    title: "Вдъхновения - 1",
    description: "Сборник с вдъхновяващи мисли и поетични текстове. Идеален спътник в моменти на несигурност, предлагащ утеха и насърчение.",
    coverImage: "/images/books/vdahnovenia-kniga-1.png",
    price: "0.00",
    pages: 176,
    publishDate: "2021", 
    topics: ["Поезия", "Вдъхновение", "Емоционално здраве"],
    author: "Елена Петрова",
    quote: "Всеки ден носи нови възможности за вдъхновение и растеж.",
    badge: {
      text: { en: "Free Book", bg: "Безплатна книга" },
      icon: <span className="text-sm text-black dark:text-white font-bold">🎁</span>,
      bgClass: "from-rose-100 to-rose-50 dark:from-rose-800/40 dark:to-rose-900/20",
      textClass: "text-black dark:text-white",
      borderClass: "border-rose-200 dark:border-rose-700/50"
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
    <div className="h-full w-full flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-5 relative overflow-hidden">
      {/* Decorative elements with enhanced gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-bl-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-tr-3xl" />
      
      {/* Book title with enhanced accent */}
      <div className="relative mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 pr-8 line-clamp-2">
          {book.title}
        </h3>
        <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-1"></div>
      </div>
      
      {/* Book metrics in a row with enhanced styling */}
      <div className="flex items-center justify-between mb-3 bg-green-50/80 dark:bg-green-900/40 rounded-lg p-2.5 border border-green-100/80 dark:border-green-800/50 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{book.pages} {translate("стр.", "pages")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{book.publishDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{book.price}</span>
        </div>
      </div>
      
      {/* Description with enhanced styling */}
      <div className="flex-grow mb-4 overflow-y-auto custom-scrollbar">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3">
          {book.description}
        </p>
        
        {/* Topics with enhanced badges */}
        {book.topics && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {book.topics.map((topic, index) => (
              <span key={index} className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-green-100/90 to-emerald-100/90 dark:from-green-900/60 dark:to-emerald-900/50 text-green-800 dark:text-green-300 rounded-full text-xs font-medium border border-green-200/90 dark:border-green-800/60 shadow-sm backdrop-blur-sm">
                {topic}
              </span>
            ))}
          </div>
        )}
        
        {/* Quote with enhanced styling */}
        {book.quote && (
          <div className="mb-3 pl-3 border-l-2 border-gradient-green">
            <p className="text-sm italic text-gray-600 dark:text-gray-400">
              "{book.quote}"
            </p>
            <p className="text-right mt-1 text-gray-700 dark:text-gray-300 text-xs">
              — {book.author}
            </p>
          </div>
        )}
      </div>
      
      {/* Buttons with enhanced styling */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={onCtaClick}
          className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
            hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium 
            transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transform hover:translate-y-[-1px]
            border border-green-400/20"
        >
          <span>{translate("Детайли", "Details")}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        
        <Link 
          href={`/shop/book/${book.id}`}
          className="flex-1 py-2 px-3 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
            text-gray-900 dark:text-white text-sm font-medium border border-white/70 dark:border-gray-700/70
            shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:bg-white dark:hover:bg-gray-800
            transition-all duration-300 transform hover:translate-y-[-1px]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{translate("Купи", "Buy")}</span>
        </Link>
      </div>
    </div>
  );
};

// Memoized BookDetailsDialog component to prevent re-renders
const BookDetailsDialog = memo(({ 
  book, 
  translate, 
  isOpen, 
  onClose 
}: { 
  book: typeof shopBooks[0] | null, 
  translate: (bg: string, en: string) => string,
  isOpen: boolean,
  onClose: () => void
}) => {
  // Don't render anything if no book is selected
  if (!book) return null;
  
  // Get a random excerpt for the book demonstration
  const excerpt = useMemo(() => ({
    title: `${translate("Глава 1:", "Chapter 1:")} ${translate("Въведение", "Introduction")}`,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis euismod nisi, at vestibulum est dictum vel. Phasellus bibendum consectetur libero, a finibus justo. Quisque vulputate turpis et felis tempus pulvinar. Donec gravida augue in velit faucibus, vel feugiat leo egestas. In hac habitasse platea dictumst.\n\nSuspendisse scelerisque, nulla in tempus finibus, est ex tristique libero, ac feugiat mauris sapien eget leo. Ut semper urna sed metus fermentum, a lobortis enim lacinia. Aenean facilisis eros vitae mauris lobortis, eu convallis est tempus."
  }), [translate]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full sm:rounded-xl overflow-hidden p-0 bg-white dark:bg-gray-900 border-none">
        <DialogHeader className="relative h-52 sm:h-64 md:h-72 overflow-hidden flex items-end bg-green-900 dark:bg-green-950">
          {/* Cover image */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-green-800 to-green-950 dark:from-green-900 dark:to-gray-950">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="opacity-50 dark:opacity-30 object-cover object-center blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          </div>
          
          {/* Book info overlay */}
          <div className="relative z-10 flex w-full p-6 text-white">
            <div className="mr-4 w-24 h-36 sm:w-32 sm:h-48 flex-shrink-0 rounded-md overflow-hidden shadow-lg border border-white/30">
              <Image
                src={book.coverImage}
                alt={book.title}
                width={128}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                {book.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 text-xs text-white/90 mb-3">
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <BookOpen className="h-3 w-3" />
                  <span>{book.pages} {translate("стр.", "pages")}</span>
                </div>
                
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{book.publishDate}</span>
                </div>
                
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <DollarSign className="h-3 w-3" />
                  <span>{book.price === "0.00" ? translate("Безплатно", "Free") : book.price + " лв."}</span>
                </div>
              </div>
              
              <p className="text-sm text-white/80 mb-4 line-clamp-3">
                {book.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {book.topics.map((topic, index) => (
                  <span key={index} className="inline-block px-2 py-0.5 bg-green-800/50 border border-green-600/30 backdrop-blur-sm text-green-50 rounded-full text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogHeader>
        
        {/* Book excerpt preview */}
        <div className="p-4 max-h-[50vh] overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-gray-900 rounded-lg p-4 mb-4 relative">
            {/* Quote mark */}
            <div className="absolute top-3 left-3 text-green-300/20 dark:text-green-700/20">
              <Quote className="h-12 w-12" />
            </div>
            
            <div className="relative pl-4">
              {/* Book quote */}
              <div className="pl-3 border-l-2 border-green-500 dark:border-green-600 mb-3">
                <p className="italic text-gray-700 dark:text-gray-300 text-sm">
                  "{book.quote}"
                </p>
                <p className="text-right mt-1 text-gray-700 dark:text-gray-300 text-xs">
                  — {book.author}
                </p>
              </div>
              
              {/* Chapter title */}
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {excerpt.title}
              </h3>
            </div>
          </div>
          
          {/* Book excerpt in a nice reading format with optimized rendering */}
          <div 
            className="relative rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3 bg-white dark:bg-gray-800 shadow-inner"
          >
            {/* Reading progress indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
              <div className="h-full w-[15%] bg-green-500 dark:bg-green-600 rounded-r-full"></div>
            </div>
            
            {/* Book content with content-visibility for performance */}
            <div className="prose dark:prose-invert prose-green max-w-none prose-sm">
              <p className="whitespace-pre-line leading-relaxed text-gray-800 dark:text-gray-200 text-xs">
                {excerpt.content}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center text-xs">
                {translate("Продължава на следващата страница...", "Continues on the next page...")}
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer with actions */}
        <DialogFooter className="flex border-t border-gray-100 dark:border-gray-800 p-2 bg-gray-50 dark:bg-gray-800/50">
          <DialogClose asChild>
            <Button variant="outline" size="sm" className="mr-auto h-8 text-xs">
              {translate("Затвори", "Close")}
            </Button>
          </DialogClose>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              {translate("Запази", "Save")}
            </Button>
            
            <Link
              href={`/shop/book/${book.id}`}
              className="inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium h-8
                bg-gradient-to-r from-green-500 to-teal-500 
                text-white
                border border-green-400/50 dark:border-green-600/30 
                shadow-md hover:shadow-lg transition-all duration-300
                hover:from-green-600 hover:to-teal-600"
            >
              <span>{translate("Купи сега", "Buy Now")}</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

BookDetailsDialog.displayName = "BookDetailsDialog";

// BookCard component completely reworked with direct inline CSS styles
const BookCard = memo(({ book }: { book: Book }) => {
  // Get the translate function from the parent component
  const { language } = useLanguage();
  const translate = useCallback((bg: string, en: string) => language === 'en' ? en : bg, [language]);
  
  // Manage book details dialog
  const handleBookDetails = () => {
    setSelectedBook(book);
    setBookDetailsOpen(true);
  };

  // Render badge based on book status
  const renderBadge = useMemo(() => {
    if (book.featured) {
      return (
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1",
          "rounded-full",
          "bg-gradient-to-r from-amber-500/90 to-yellow-500/90",
          "text-white",
          "border border-amber-300/80",
          "shadow-md text-xs font-semibold backdrop-blur-sm"
        )}>
          <Star className="h-3 w-3" />
          <span>{translate("Топ", "Featured")}</span>
        </div>
      );
    }

    if (book.price === "0.00") {
      return (
        <div className={cn(
          "flex items-center gap-1.5 px-2.5 py-1",
          "rounded-full",
          "bg-gradient-to-r from-green-500/90 to-emerald-500/90",
          "text-white",
          "border border-green-300/80",
          "shadow-md text-xs font-semibold backdrop-blur-sm"
        )}>
          <Gift className="h-3 w-3" />
          <span>{translate("Безплатно", "Free")}</span>
        </div>
      );
    }

    return null;
  }, [book.featured, book.price, translate]);

  const renderQuoteSection = () => (
    <div className="pl-3 border-l-2 border-green-500 mb-3 z-10">
      <p className="text-xs text-gray-600 dark:text-gray-300 italic">"{book.quote}"</p>
      <p className="text-right text-xs text-gray-700 dark:text-gray-200 mt-1">— {book.author}</p>
    </div>
  );

  // Track performance using the custom hook instead of direct perf call
  usePerformanceMonitor(`BookCard:${book.id}`);
  
  return (
    <div 
      className="rounded-lg overflow-hidden h-[320px] group
        bg-white/50 dark:bg-gray-800/50
        backdrop-blur-md
        border border-white/40 dark:border-gray-700/60
        shadow-[0_10px_20px_rgba(0,0,0,0.1)]
        dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)]
        group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] 
        dark:group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
        transition-all duration-500 ease-out relative"
    >
      {/* Badge positioned absolutely on top right */}
      {renderBadge && (
        <div className="absolute top-3 right-3 z-20">
          {renderBadge}
        </div>
      )}
      
      {/* Direct flip card implementation with inline styles */}
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        <div 
          className="group-hover:[transform:rotateY(180deg)] transition-all duration-500 relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s ease',
            willChange: 'transform',
          }}
        >
          {/* Front side */}
          <div 
            className="absolute w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src={book.coverImage || "/images/books/placeholder-book.jpg"}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                priority={book.featured}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Book details overlay */}
              <div className="absolute bottom-0 w-full p-4 space-y-2 bg-gradient-to-t from-white/90 via-white/60 to-transparent dark:from-gray-800/90 dark:via-gray-800/60">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{book.title}</h3>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{book.price === "0.00" ? translate("Безплатно", "Free") : book.price + " лв."}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{book.pages} {translate("стр.", "pages")}</div>
                </div>
                
                <div className="flex items-center text-xs mt-1">
                  <div className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                    <span className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">Flip</span>
                    {translate("за детайли", "for details")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back side */}
          <div 
            className="absolute w-full h-full [transform:rotateY(180deg)]"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="h-full w-full flex flex-col bg-white dark:bg-gray-800 rounded-lg p-4 overflow-hidden">
              {/* Decorative gradients */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-bl-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-tr-3xl" />
              
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 z-10">{book.title}</h3>
              
              {/* Book quote */}
              {renderQuoteSection()}
              
              {/* Description */}
              <div className="flex-grow overflow-y-auto pr-1" style={{ overflowY: 'auto' }}>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 z-10">
                  {book.description.substring(0, 150)}...
                </p>
                
                {/* Topics */}
                {book.topics && book.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 mb-2 z-10">
                    {book.topics.map((topic, idx) => (
                      <span key={idx} className="inline-block px-2 py-0.5 text-[9px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Action button */}
              <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center z-10">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {book.price === "0.00" ? translate("Безплатно", "Free") : book.price + " лв."}
                </span>
                
                <button
                  onClick={handleBookDetails}
                  className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
                    hover:from-green-600 hover:to-emerald-600 text-white text-xs font-medium 
                    transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {translate("Детайли", "Details")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

BookCard.displayName = 'BookCard';

// Fix the decorative background elements that are causing rendering issues
const BackgroundDecorations = () => (
  <>
    <div 
      className="absolute right-[10%] top-[10%] w-[400px] h-[400px] 
        bg-gradient-to-br from-green-300/40 via-emerald-200/40 to-teal-300/40 
        rounded-full blur-[120px] -z-10"
    />
    <div 
      className="absolute left-[5%] bottom-[20%] w-[300px] h-[300px] 
        bg-gradient-to-tr from-emerald-200/40 via-green-300/40 to-teal-200/40 
        rounded-full blur-[120px] -z-10"
    />
  </>
);

export default function BooksSection() {
  // Monitor performance
  usePerformanceMonitor('BooksSection');
  
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Visibility tracking for lazy loading
  const isVisible = useIsVisible(containerRef);
  
  // Add state for carousel and container widths - using useRef instead of state to avoid re-renders
  const containerWidth = useRef(0);
  const carouselWidth = useRef(0);
  
  // State for selected book and dialog
  const [selectedBook, setSelectedBook] = useState<typeof shopBooks[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Handle opening book details - memoized
  const handleBookDetails = useCallback((book: typeof shopBooks[0]) => {
    setSelectedBook(book);
    setDialogOpen(true);
  }, []);
  
  // Translate function - memoized
  const translate = useCallback((bg: string, en: string) => language === 'en' ? en : bg, [language]);
  
  // Create a more optimized set of duplicated books - 3 copies for smoother looping
  const duplicatedBooks = useMemo(() => {
    // Create 3 copies for a truly smooth infinite loop
    return [...shopBooks, ...shopBooks, ...shopBooks];
  }, []);
  
  // Preload critical book images
  useEffect(() => {
    // Priority image preloading only for visible section
    if (!isVisible) return;
    
    // Preload only the first set of book images to improve performance
    const imagesToPreload = shopBooks.map(book => book.coverImage);
    
    // Use Promise.all to wait for all images to load
    const preloadPromises = imagesToPreload.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    
    // Catch any errors with image loading
    Promise.all(preloadPromises).catch(() => {
      // Silent error handling - just continue if some images fail to preload
    });
  }, [isVisible, shopBooks]);
  
  // Measure carousel dimensions - optimized to avoid frequent re-renders
  useEffect(() => {
    if (!isVisible) return;
    
    const updateWidths = () => {
      if (containerRef.current && carouselRef.current) {
        containerWidth.current = containerRef.current.offsetWidth;
        carouselWidth.current = carouselRef.current.scrollWidth;
      }
    };
    
    // Use ResizeObserver instead of resize event for better performance
    const resizeObserver = new ResizeObserver(updateWidths);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    // Initial measurement
    updateWidths();
    
    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [isVisible]);
  
  // Use spring for smoother animation
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });
  
  // Optimized animation loop for carousel with spring physics
  useEffect(() => {
    if (!isVisible || !carouselRef.current) return;
    
    let animationId: number;
    let previousTimestamp = 0;
    const bookItemWidth = 280;
    const singleSetWidth = shopBooks.length * bookItemWidth;
    
    // Super smooth animation function with spring physics
    const animate = (timestamp: number) => {
      if (!previousTimestamp) previousTimestamp = timestamp;
      const deltaTime = timestamp - previousTimestamp;
      previousTimestamp = timestamp;
      
      if (isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate current position
      const currentX = x.get();
      
      // Smooth speed calculation with consistent speed regardless of frame rate
      const pixelsPerSecond = 40; // Adjust speed as needed
      const pixelsToMove = (pixelsPerSecond * deltaTime) / 1000;
      
      // Seamless infinite loop logic
      if (currentX <= -singleSetWidth) {
        // Instant reset to equivalent position in next set
        x.set(currentX + singleSetWidth);
      } else {
        // Normal smooth movement with hardware acceleration
        x.set(currentX - pixelsToMove);
      }
      
      // Continue animation
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation only when component is visible in viewport
    if (isVisible) {
      animationId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPaused, x, isVisible, shopBooks.length]);
  
  // Create a function to render featured books that doesn't change on render
  const renderFeaturedBooks = useCallback(() => {
    return featuredBooks.map((book, index) => (
      <motion.div 
        key={book.id}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { 
              type: "spring", 
              stiffness: 80, 
              damping: 12,
              mass: 0.5 
            }
          }
        }}
        className="h-full group"
      >
        {/* Card with glass morphism styling - improved height and aspect ratio */}
        <div className="rounded-lg overflow-hidden h-[380px]
          bg-white/50 dark:bg-gray-800/50
          backdrop-blur-md
          border border-white/40 dark:border-gray-700/60
          shadow-[0_10px_20px_rgba(0,0,0,0.1)]
          dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)]
          group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] 
          dark:group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
          transition-all duration-500 ease-out relative">
          
          {/* Badge positioned correctly inside the card */}
          <div className="absolute top-3 right-3 z-20">
            <div className={cn(
              "flex items-center gap-1.5 px-2.5 py-1",
              "rounded-full",
              `bg-gradient-to-r ${book.badge.bgClass}`,
              book.badge.textClass,
              "border",
              book.badge.borderClass,
              "shadow-md text-xs font-semibold backdrop-blur-sm"
            )}>
              {book.badge.icon}
              <span className="whitespace-nowrap">{translate(book.badge.text.bg, book.badge.text.en)}</span>
            </div>
          </div>
          
          {/* Using the direct flip card implementation with inline styles for consistency with carousel */}
          <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
            <div 
              className="group-hover:[transform:rotateY(180deg)] transition-all duration-500 relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.8s ease',
                willChange: 'transform',
              }}
            >
              {/* Front side */}
              <div 
                className="absolute w-full h-full"
                style={{ 
                  backfaceVisibility: 'hidden', 
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={book.coverImage || "/images/books/placeholder-book.jpg"}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    priority={book.featured}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Book details overlay */}
                  <div className="absolute bottom-0 w-full p-4 space-y-2 bg-gradient-to-t from-white/90 via-white/60 to-transparent dark:from-gray-800/90 dark:via-gray-800/60">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">{book.title}</h3>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{book.price === "0.00" ? translate("Безплатно", "Free") : book.price + " лв."}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{book.pages} {translate("стр.", "pages")}</div>
                    </div>
                    
                    <div className="flex items-center text-xs mt-1">
                      <div className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                        <span className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">Flip</span>
                        {translate("за детайли", "for details")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Back side */}
              <div 
                className="absolute w-full h-full [transform:rotateY(180deg)]"
                style={{ 
                  backfaceVisibility: 'hidden', 
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="h-full w-full flex flex-col bg-white dark:bg-gray-800 rounded-lg p-4 overflow-hidden">
                  {/* Decorative gradients */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-bl-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-tr-3xl" />
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 z-10">{book.title}</h3>
                  
                  {/* Book quote */}
                  <div className="pl-3 border-l-2 border-green-500 mb-3 z-10">
                    <p className="text-xs text-gray-600 dark:text-gray-300 italic">"{book.quote}"</p>
                    <p className="text-right text-xs text-gray-700 dark:text-gray-200 mt-1">— {book.author}</p>
                  </div>
                  
                  {/* Description */}
                  <div className="flex-grow overflow-y-auto pr-1" style={{ overflowY: 'auto' }}>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 z-10">
                      {book.description.substring(0, 150)}...
                    </p>
                    
                    {/* Topics */}
                    {book.topics && book.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 mb-2 z-10">
                        {book.topics.map((topic, idx) => (
                          <span key={idx} className="inline-block px-2 py-0.5 text-[9px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Action button */}
                  <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center z-10">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {book.price === "0.00" ? translate("Безплатно", "Free") : book.price + " лв."}
                    </span>
                    
                    <button
                      onClick={() => handleBookDetails(book)}
                      className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
                        hover:from-green-600 hover:to-emerald-600 text-white text-xs font-medium 
                        transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      {translate("Детайли", "Details")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    ));
  }, [featuredBooks, handleBookDetails, translate]);
  
  return (
    <div className="relative z-0 py-4 md:py-6">
      <AnimatePresence mode="wait">
        <BookDetailsDialog 
          book={selectedBook} 
          translate={translate} 
          isOpen={dialogOpen} 
          onClose={() => setDialogOpen(false)} 
        />
      </AnimatePresence>
      
      <BackgroundDecorations />

      {/* Main container */}
      <div className="w-full h-full flex flex-col rounded-xl sm:rounded-2xl
          bg-gradient-to-br from-white/80 via-white/90 to-white/80 
          dark:from-gray-900/80 dark:via-gray-900/85 dark:to-gray-900/80
          border border-white/40 dark:border-white/10
          shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)]
          dark:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]
          overflow-hidden
          max-w-[1600px] mx-auto">
        
        {/* Inner container with enhanced gradients - optimized for better performance */}
        <div className="bg-gradient-to-br from-green-50/40 via-transparent to-emerald-50/40 
            dark:from-green-900/20 dark:via-transparent dark:to-emerald-900/20 
            px-3 sm:px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-6 relative flex-grow flex flex-col">
          
          {/* Replace radial gradients with simpler accent boxes for better performance */}
          <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-green-300/10 dark:bg-green-900/10 blur-[80px] pointer-events-none"></div>
          <div className="absolute bottom-[30%] right-[20%] w-[250px] h-[250px] rounded-full bg-emerald-300/10 dark:bg-emerald-900/10 blur-[60px] pointer-events-none"></div>
          
          {/* Section header optimized for performance */}
          <div className="text-center mb-4 md:mb-5 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-col items-center justify-center"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Section badge with improved styling */}
              <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-900/30 rounded-full mb-3 border border-amber-200/60 dark:border-amber-800/40 shadow-md backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <BookMarked className="h-4.5 w-4.5 text-amber-700 dark:text-amber-300" />
                <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {language === 'en' ? "Books" : "Книги"}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 
                bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400
                bg-clip-text text-transparent drop-shadow-sm">
                {language === 'en' ? "Featured Books" : "Препоръчани Книги"}
              </h2>
              
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {language === 'en' 
                  ? "Explore our curated collection of transformative books that will elevate your personal growth journey." 
                  : "Разгледайте нашата селекция от трансформиращи книги, които ще издигнат вашето лично пътуване за развитие."}
              </p>
            </motion.div>
          </div>

          {/* Featured books section - optimized with reduced motion and better rendering */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { 
                  staggerChildren: 0.08, 
                  delayChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative z-10 mb-5 md:mb-6"
          >
            {renderFeaturedBooks()}
          </motion.div>
          
          {/* Book Carousel Section - optimized for performance */}
          <div ref={containerRef} className="relative overflow-hidden py-4 mb-4">
            <div className="rounded-lg overflow-hidden 
              bg-white/40 dark:bg-gray-800/40
              backdrop-blur-md
              border border-white/40 dark:border-gray-700/60
              shadow-[0_10px_25px_rgba(0,0,0,0.1)]
              dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
              relative">
              
              {/* Carousel header - more compact */}
              <div className="flex justify-between items-center mb-4 p-3 relative z-10 border-b border-white/40 dark:border-gray-700/60 bg-gradient-to-r from-white/70 to-white/20 dark:from-gray-800/70 dark:to-gray-800/20">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md">
                    <Library className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {translate("Всички книги", "All Books")}
                  </h3>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <BookOpen className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs">
                      {translate(
                        "Задръжте или натиснете върху книга за повече информация",
                        "Hover or tap on a book for more information"
                      )}
                    </span>
                  </div>
                  
                  {/* Pause/Play button - smaller */}
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="relative overflow-hidden rounded-full w-8 h-8 
                      flex items-center justify-center 
                      bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                      text-white 
                      focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2
                      transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg
                      after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 
                      after:bg-gradient-to-br after:from-white/20 after:to-transparent after:rounded-full"
                    aria-label={isPaused ? translate("Възобнови въртенето", "Resume rotation") : translate("Паузирай въртенето", "Pause rotation")}
                  >
                    {isPaused ? (
                      <Play className="h-3.5 w-3.5 relative z-10" />
                    ) : (
                      <Pause className="h-3.5 w-3.5 relative z-10" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Carousel with optimized drag functionality */}
              <div className="px-4 pb-4 relative overflow-hidden">
                <motion.div
                  ref={carouselRef}
                  className="flex gap-4 cursor-grab active:cursor-grabbing"
                  drag="x"
                  style={{ 
                    x,
                    willChange: 'transform',
                    transform: 'translate3d(0,0,0)', 
                  }}
                  dragConstraints={{ 
                    left: -Math.max(0, carouselWidth.current - containerWidth.current + 40), 
                    right: 0 
                  }}
                  dragTransition={{ 
                    bounceStiffness: 400, 
                    bounceDamping: 25,
                    power: 0.2,
                    timeConstant: 200
                  }}
                  dragElastic={0.1}
                  dragMomentum={true}
                  onDragStart={() => setIsPaused(true)}
                  onDragEnd={(e, info) => {
                    // Keep the velocity after dragging for natural feeling
                    const currentPosition = x.get();
                    const velocity = info.velocity.x;
                    
                    if (Math.abs(velocity) > 500) {
                      // If user flicked with high velocity, add momentum
                      const momentum = Math.sign(velocity) * Math.min(Math.abs(velocity) * 0.2, 500);
                      x.set(currentPosition + momentum);
                    }
                    
                    // Resume animation after a short delay (feels more natural)
                    setTimeout(() => setIsPaused(false), 1000);
                  }}
                  onHoverStart={() => setIsPaused(true)}
                  onHoverEnd={() => setIsPaused(false)}
                  // Remove layout for even better performance
                  layout={false}
                >
                  {duplicatedBooks.map((book, index) => (
                    <div 
                      key={`${book.id}-${index}`}
                      className="flex-shrink-0 w-[260px] transform-gpu"
                      style={{
                        willChange: 'transform', 
                        transform: 'translate3d(0,0,0)',
                        contain: 'paint layout style'
                      }}
                    >
                      <BookCard 
                        book={book}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
            
            {/* Gradient fade on the left - optimized */}
            <div className="absolute left-0 top-4 bottom-4 w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none opacity-90"></div>
            
            {/* Gradient fade on the right - optimized */}
            <div className="absolute right-0 top-4 bottom-4 w-20 bg-gradient-to-l from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none opacity-90"></div>
          </div>
          
          {/* View All CTA button */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex justify-center mt-4"
          >
            <Link 
              href="/shop/books"
              className="group relative px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium text-sm shadow-md 
                hover:shadow-lg transition-all duration-300 overflow-hidden flex items-center gap-2"
            >
              <span className="relative z-10">{translate("Вижте всички книги", "View all books")}</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 