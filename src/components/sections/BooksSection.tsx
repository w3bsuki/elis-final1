"use client";

import { ArrowRight, BookOpen, Star, Bookmark, Quote, BookMarked, Library, Book, Clock, FileText, DollarSign, ShoppingCart, Play, Pause, Gift, X, Tag } from "lucide-react";
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
import { useState, useEffect, useRef, memo, useCallback, useMemo, useContext, createContext } from "react";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Create a context for BooksSection
export const BooksSectionContext = createContext<{
  handleBookDetails: (book: any) => void;
  translate: (bg: string, en: string) => string;
  language: string;
}>({
  handleBookDetails: () => {},
  translate: (bg, en) => en,
  language: 'en'
});

// Define Book type for better type safety
type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: string | number;
  pages?: number;
  publishDate?: string;
  category?: string;
  featured?: boolean;
  topics?: string[];
  author?: string;
  quote?: string;
  badge?: {
    text: { en: string; bg: string };
    icon?: React.ReactNode;
    bgClass?: string;
    textClass?: string;
    borderClass?: string;
  };
  shortDescription?: string;
};

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
        <Link
          href={`/shop/${book.id}`}
          className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
            hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium 
            transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transform hover:translate-y-[-1px]
            border border-green-400/20"
        >
          <span>{translate("Детайли", "Details")}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        
        <button 
          onClick={() => {
            // Show an alert for adding to cart instead of navigating to a non-existent page
            alert(translate("Книгата е добавена в кошницата!", "Book added to cart!"));
          }}
          className="flex-1 py-2 px-3 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
            text-gray-900 dark:text-white text-sm font-medium border border-white/70 dark:border-gray-700/70
            shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:bg-white dark:hover:bg-gray-800
            transition-all duration-300 transform hover:translate-y-[-1px]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{translate("Купи", "Buy")}</span>
        </button>
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
        <DialogHeader className="relative h-52 sm:h-64 overflow-hidden flex items-end bg-green-900 dark:bg-green-950">
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
            <Button variant="outline" size="sm" className="mr-auto h-7 text-xs">
              {translate("Затвори", "Close")}
            </Button>
          </DialogClose>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              {translate("Запази", "Save")}
            </Button>
            
            <Link
              href={`/shop/${book.id}`}
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
const BookCard = memo(({ book, onClick }: { book: Book; onClick?: (book: Book) => void }) => {
  // Get the translate function from context
  const { language, translate } = useContext(BooksSectionContext);
  
  // Function to handle book details
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(book);
    }
  }, [book, onClick]);

  // Render badge based on book status
  const renderBadge = useMemo(() => {
    if (book.featured) {
      return (
        <Badge className="absolute top-2 right-2 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          {translate("Топ", "Featured")}
        </Badge>
      );
    }
    if (book.price && book.originalPrice && book.price < book.originalPrice) {
      const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
      return (
        <Badge className="absolute top-2 right-2 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          {discount}% {translate("Отстъпка", "OFF")}
        </Badge>
      );
    }
    return null;
  }, [book.featured, book.price, book.originalPrice, translate]);

  // Function to render book quote section
  const renderQuoteSection = useMemo(() => {
    if (!book.quote) return null;
    return (
      <div className="flex flex-col space-y-2 p-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 italic">"{book.quote}"</p>
        {book.author && <p className="text-xs text-gray-500 dark:text-gray-500">— {book.author}</p>}
      </div>
    );
  }, [book.quote, book.author]);

  return (
    <div className="h-full w-full">
      <div className="flip-card-container hover-trigger h-full">
        <div className="flip-card h-full w-full">
          <div className="flip-card-inner">
            {/* Front of card */}
            <div className="flip-card-front rounded-xl overflow-hidden shadow-lg dark:shadow-gray-800/20 bg-white dark:bg-gray-800 flex flex-col">
              <div className="relative h-48 w-full flex-shrink-0">
                <Image
                  src={book.coverImage || '/images/books/placeholder-book.jpg'}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
                {renderBadge}
              </div>
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-white">{book.title}</h3>
                <div className="flex items-center mt-1 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-4 w-4",
                          star <= (book.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({book.reviews || 0})</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2 flex-grow">{book.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {book.price === "0.00" ? translate("Безплатно", "Free") : book.price + " лв."}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{book.pages} {translate("стр.", "pages")}</span>
                </div>
              </div>
            </div>
            
            {/* Back of card */}
            <div className="flip-card-back rounded-xl overflow-hidden shadow-lg dark:shadow-gray-800/20 bg-white dark:bg-gray-800 flex flex-col">
              <div className="relative h-full w-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900/90 z-10"></div>
                <Image
                  src={book.coverImage || '/images/books/placeholder-book.jpg'}
                  alt={book.title}
                  fill
                  className="object-cover z-0 opacity-60"
                />
                <div className="relative z-20 flex flex-col justify-between h-full p-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{book.title}</h3>
                    {book.author && <p className="text-sm text-gray-300 mb-4">by {book.author}</p>}
                    {renderQuoteSection}
                    <div className="space-y-2 mb-4">
                      {book.topics && book.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {book.topics.slice(0, 3).map((topic, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-800/50 text-gray-200 border-gray-700 text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <Button 
                      onClick={handleClick} 
                      className="w-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border-white/20"
                      variant="outline"
                    >
                      {translate("Детайли", "View Details")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

// Book carousel specifically for horizontal scrolling with infinite books
const BookCarousel = ({ books, translate, language, onBookClick }: { 
  books: Book[], 
  translate: (text: string) => string, 
  language: string,
  onBookClick: (book: Book) => void 
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Use basic interval for scrolling - simpler is better
  useEffect(() => {
    if (!carouselRef.current || !isPlaying) return;
    
    const scrollAmount = 1; // 1px per interval - smooth and performant
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      
      carouselRef.current.scrollLeft += scrollAmount;
      
      // Reset to start when reaching the end
      if (carouselRef.current.scrollLeft >= (carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10)) {
        carouselRef.current.scrollLeft = 0;
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  return (
    <div className="relative w-full">
      {/* Simple play/pause button */}
      <button 
        onClick={() => setIsPlaying(prev => !prev)}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 
          bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent dark:from-gray-900 dark:to-transparent z-10"></div>
      
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent dark:from-gray-900 dark:to-transparent z-10"></div>
      
      {/* Simple scrolling container - plain HTML is fastest */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-2 px-4 scrollbar-hide"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Triple the books for infinite scrolling effect */}
        {[...books, ...books, ...books].map((book, index) => (
          <div 
            key={`${book.id}-${index}`} 
            className="flex-shrink-0 w-[250px] h-[360px] rounded-lg shadow-md border border-gray-100 dark:border-gray-800 
              overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg
              bg-white dark:bg-gray-800 cursor-pointer group"
            style={{ contain: 'paint layout' }} // Performance optimization
            onClick={() => onBookClick(book)}
          >
            <div className="relative h-full">
              {/* Image with overlay gradient */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={book.coverImage} 
                  alt={book.title}
                  fill
                  sizes="250px"
                  className="object-cover"
                  loading={index < 10 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              {/* Badge */}
              {book.badge && (
                <div className="absolute top-2 right-2 z-20 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  {translate(book.badge)}
                </div>
              )}
              
              {/* Content at bottom */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
                <h3 className="text-lg font-bold line-clamp-1">{book.title}</h3>
                <p className="text-sm opacity-90">{book.author}</p>
                <div className="flex items-center mt-2 justify-between">
                  <span className="font-medium">${typeof book.price === 'number' ? book.price.toFixed(2) : book.price}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} 
                        className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Quick View button - fixed position, always visible */}
              <div className="absolute top-0 right-0 z-20 p-2">
                <button 
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-2.5 py-1 rounded shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookClick(book);
                  }}
                >
                  {language === 'en' ? 'Quick View' : 'Преглед'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BookPreviewDialogProps {
  book: typeof shopBooks[0] | null;
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export function BookPreviewDialog({ book, isOpen, onClose, language }: BookPreviewDialogProps) {
  if (!book) return null;

  // Translate function to handle both languages
  const getTranslation = (bg: string, en: string) => language === 'en' ? en : bg;

  // Format price properly
  const formattedPrice = typeof book.price === 'number'
    ? (language === 'bg' ? `${book.price.toFixed(2)} лв.` : `$${book.price.toFixed(2)}`)
    : book.price === "0.00" 
      ? getTranslation("Безплатно", "Free") 
      : book.price;
      
  // Handle redirection to book details page
  const handleBookDetails = () => {
    // Close the dialog
    onClose();
    
    // Redirect to correct product page
    if (book && book.id) {
      window.location.href = `/shop/${book.id}`;
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Close the dialog
    onClose();
    
    // In a real app, this would add the book to a cart
    // For now, show a toast message
    alert(getTranslation("Книгата е добавена в кошницата!", "Book added to cart!"));
    // Alternatively, redirect to the cart page
    // window.location.href = '/cart';
  };
      
  // Demo content - to be replaced with actual content later
  const demoContent = {
    synopsis: getTranslation(
      "Тази книга предлага дълбок поглед върху темата за личностното развитие и трансформацията. Авторът споделя своя опит и изследвания, за да помогне на читателите да разкрият своя потенциал.",
      "This book offers a deep dive into personal development and transformation. The author shares experience and research to help readers unlock their potential."
    ),
    keyPoints: [
      getTranslation("Практически съвети за ежедневието", "Practical daily advice"),
      getTranslation("Техники за справяне със стреса", "Stress management techniques"),
      getTranslation("Методи за подобряване на комуникацията", "Methods to improve communication"),
    ],
    readersComment: getTranslation(
      "Тази книга промени начина, по който гледам на живота си. Методите са практични и лесни за прилагане!",
      "This book changed the way I look at my life. The methods are practical and easy to apply!"
    ),
    commentAuthor: "Maria S.",
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg w-full sm:rounded-xl overflow-hidden p-0 bg-white dark:bg-gray-900 border-none">
        <DialogHeader className="relative h-40 sm:h-52 overflow-hidden flex items-end bg-green-900 dark:bg-green-950">
          {/* Cover image */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-green-800 to-green-950 dark:from-green-900 dark:to-gray-950">
            <Image
              src={book.coverImage || "/images/books/default-book.jpg"}
              alt={book.title}
              fill
              className="opacity-50 dark:opacity-30 object-cover object-center blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          </div>
          
          {/* Book info overlay */}
          <div className="relative z-10 flex w-full p-4 text-white">
            <div className="mr-3 w-20 h-28 sm:w-24 sm:h-36 flex-shrink-0 rounded-md overflow-hidden shadow-lg border border-white/30">
              <Image
                src={book.coverImage || "/images/books/default-book.jpg"}
                alt={book.title}
                width={96}
                height={144}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 overflow-hidden">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 leading-tight line-clamp-2">
                {book.title}
              </h2>
              
              <div className="flex flex-wrap gap-1 text-xs text-white/90 mb-2">
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <BookOpen className="h-3 w-3" />
                  <span>{book.pages} {getTranslation("стр.", "p")}</span>
                </div>
                
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{book.publishDate || getTranslation("Нова", "New")}</span>
                </div>
                
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <DollarSign className="h-3 w-3" />
                  <span>{formattedPrice}</span>
                </div>
              </div>
              
              <p className="text-xs text-white/80 mb-2 line-clamp-2">
                {book.description}
              </p>
              
              {book.topics && book.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {book.topics.slice(0, 2).map((topic, index) => (
                    <span key={index} className="inline-block px-1.5 py-0.5 bg-green-800/50 border border-green-600/30 backdrop-blur-sm text-green-50 rounded-full text-[10px]">
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogHeader>
        
        {/* Book content preview - more compact */}
        <div className="p-3 overflow-y-auto max-h-[40vh]" style={{ overscrollBehavior: 'contain' }}>
          {/* Combined synopsis and key points */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {getTranslation("За книгата", "About the Book")}
              </h3>
              {book.author && (
                <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                  {getTranslation("Автор", "By")}: {book.author}
                </span>
              )}
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed mb-2">
              {demoContent.synopsis}
            </p>
            
            {/* Key points - inline */}
            <div className="flex flex-wrap gap-1 mb-2">
              {demoContent.keyPoints.map((point, index) => (
                <span key={index} className="px-2 py-0.5 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full border border-green-100 dark:border-green-800/50">
                  {point}
                </span>
              ))}
            </div>
          </div>
          
          {/* Split content into 2 columns for better space usage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Quote section */}
            {book.quote && (
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-gray-900 rounded-lg p-3 relative">
                {/* Quote mark */}
                <div className="absolute top-2 left-2 text-green-300/20 dark:text-green-700/20">
                  <Quote className="h-8 w-8" />
                </div>
                
                <div className="pl-3">
                  {/* Book quote */}
                  <div className="pl-2 border-l-2 border-green-500 dark:border-green-600">
                    <p className="italic text-gray-700 dark:text-gray-300 text-sm">
                      "{book.quote}"
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reader's comment section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                  {demoContent.commentAuthor.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200 text-xs">{demoContent.commentAuthor}</p>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="h-2 w-2 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-xs italic line-clamp-3">
                "{demoContent.readersComment}"
              </p>
            </div>
          </div>
          
          {/* Preview section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {getTranslation("Прочетете откъс", "Preview")}
              </h3>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">
                {getTranslation("Глава 1", "Chapter 1")}
              </span>
            </div>
            
            <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800 shadow-inner">
              {/* Reading progress indicator */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
                <div className="h-full w-[15%] bg-green-500 dark:bg-green-600 rounded-r-full"></div>
              </div>
              
              <div className="prose dark:prose-invert prose-green max-w-none prose-sm mt-2">
                <p className="whitespace-pre-line leading-relaxed text-gray-800 dark:text-gray-200 text-xs line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis euismod nisi, at vestibulum est dictum vel. Phasellus bibendum consectetur libero, a finibus justo...
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-center text-[10px]">
                  {getTranslation("Продължава в книгата...", "Continues in the book...")}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with actions */}
        <DialogFooter className="flex border-t border-gray-100 dark:border-gray-800 p-2 bg-gray-50 dark:bg-gray-800/50">
          <DialogClose asChild>
            <Button variant="outline" size="sm" className="mr-auto h-7 text-xs px-2">
              {getTranslation("Затвори", "Close")}
            </Button>
          </DialogClose>
          
          <div className="flex gap-1.5">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 h-7 text-xs px-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3" />
              {getTranslation("В кошницата", "Add to Cart")}
            </Button>
            
            <Link
              href={`/shop/${book.id}`}
              className="inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium h-8
                bg-gradient-to-r from-green-500 to-teal-500 
                text-white
                border border-green-400/50 dark:border-green-600/30 
                shadow-md hover:shadow-lg transition-all duration-300
                hover:from-green-600 hover:to-teal-600"
            >
              <span>{getTranslation("Купи", "Buy")}</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Super simple CSS-only flip card that performs well on all devices
const SimpleFlipCard = ({ book, onClick, language }: { 
  book: typeof featuredBooks[0], 
  onClick: () => void,
  language: string 
}) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          {/* Cover image */}
          <div className="relative h-3/5 w-full">
            <Image 
              src={book.coverImage} 
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Badge */}
            <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-amber-500 to-amber-600 
              text-white text-xs px-2 py-1 rounded-full shadow-sm">
              {book.badge.text[language === 'en' ? 'en' : 'bg']}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold line-clamp-1 text-gray-900 dark:text-white">{book.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{book.author}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-green-600 dark:text-green-400 font-medium">
                {book.price === "0.00" ? "Free" : book.price + " лв."}
              </span>
              <span className="text-sm text-gray-500">
                {book.pages} pages
              </span>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="flip-card-back">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{book.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{book.author}</p>
          
          <p className="text-sm text-gray-800 dark:text-gray-200 mb-2 line-clamp-3">
            {book.description}
          </p>
          
          {/* Topics */}
          <div className="flex flex-wrap gap-1 mb-3">
            {book.topics.slice(0, 3).map((topic, i) => (
              <span key={i} className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 
                text-green-800 dark:text-green-300 text-xs rounded-full">
                {topic}
              </span>
            ))}
          </div>
          
          {/* Quote */}
          {book.quote && (
            <div className="text-sm italic text-gray-700 dark:text-gray-300 mb-3 border-l-2 border-green-500 pl-2">
              "{book.quote}"
            </div>
          )}
          
          <button 
            onClick={onClick}
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white 
              rounded-md transition-colors text-sm mt-auto"
          >
            {language === 'bg' ? 'Детайли' : 'Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this to your global CSS or directly in your app
const flipCardCss = `
/* Flip card container - relative to enable absolute positioning inside */
.flip-card {
  width: 100%;
  height: 100%;
  perspective: 1000px; /* Creates 3D perspective */
}

/* Flip card inner container - this is what rotates */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

/* Add the flip effect on hover */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(229, 231, 235, 1);
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .flip-card-front, .flip-card-back {
    border-color: rgba(55, 65, 81, 1);
  }
}

/* Style the front side */
.flip-card-front {
  background-color: white;
  display: flex;
  flex-direction: column;
}

/* Style the back side */
.flip-card-back {
  background-color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

/* Dark mode for front/back */
@media (prefers-color-scheme: dark) {
  .flip-card-front, .flip-card-back {
    background-color: rgb(31, 41, 55);
    color: white;
  }
}
`;

export default function BooksSection() {
  // Monitor performance
  usePerformanceMonitor('BooksSection');
  
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Add translate function
  const translate = useCallback((bg: string, en: string) => language === 'en' ? en : bg, [language]);
  
  // State for selected book and dialog
  const [selectedBook, setSelectedBook] = useState<typeof shopBooks[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Book preview dialog state
  const [previewBook, setPreviewBook] = useState<typeof shopBooks[0] | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // Handle opening book details - memoized
  const handleBookDetails = useCallback((book: typeof shopBooks[0]) => {
    setSelectedBook(book);
    setDialogOpen(true);
  }, []);
  
  // Handle quick view - ensure it's properly setting state
  const handleQuickView = useCallback((book: typeof shopBooks[0]) => {
    console.log('Quick view clicked for book:', book.title);
    setPreviewBook(book);
    setPreviewOpen(true);
  }, []);
  
  // Create context value
  const contextValue = useMemo(() => ({
    handleBookDetails,
    translate,
    language
  }), [handleBookDetails, translate, language]);
  
  // Add the necessary CSS to the document
  useEffect(() => {
    // Only add the styles if they don't already exist
    if (!document.getElementById('flip-card-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'flip-card-styles';
      styleElement.textContent = flipCardCss;
      document.head.appendChild(styleElement);
      
      return () => {
        // Clean up by removing the style element when the component unmounts
        const element = document.getElementById('flip-card-styles');
        if (element) document.head.removeChild(element);
      };
    }
  }, []);

  // Close preview on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewOpen) {
        setPreviewOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewOpen]);

  console.log('Preview dialog state:', { isOpen: previewOpen, bookTitle: previewBook?.title });

  return (
    <BooksSectionContext.Provider value={contextValue}>
      <div className="relative z-0 py-4 md:py-6">
        <AnimatePresence mode="wait">
          <BookDetailsDialog 
            book={selectedBook} 
            translate={translate} 
            isOpen={dialogOpen} 
            onClose={() => setDialogOpen(false)} 
          />
        </AnimatePresence>
        
        {/* Book Preview Dialog */}
        <BookPreviewDialog
          book={previewBook}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          language={language}
        />
        
        <BackgroundDecorations />

        {/* Main container */}
        <div className="w-full h-full flex flex-col rounded-xl sm:rounded-2xl
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            shadow-xl
            overflow-hidden
            max-w-[1600px] mx-auto">
          
          {/* Inner container */}
          <div className="px-4 py-6 relative">
            
            {/* Section header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 
                border border-amber-200 dark:border-amber-700/50 shadow-sm mb-3">
                <BookMarked className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === 'en' ? "Books" : "Книги"}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                {language === 'en' ? "Featured Books" : "Препоръчани Книги"}
              </h2>
              
              <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {language === 'en' 
                  ? "Explore our curated collection of transformative books that will elevate your personal growth journey." 
                  : "Разгледайте нашата селекция от трансформиращи книги, които ще издигнат вашето лично пътуване за развитие."}
              </p>
            </div>

            {/* Featured books section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {featuredBooks.map((book) => (
                <div key={book.id} className="h-[380px]">
                  <SimpleFlipCard
                    book={book}
                    onClick={() => handleQuickView(book)}
                    language={language}
                  />
                </div>
              ))}
            </div>
            
            {/* Books carousel section */}
            <div ref={containerRef} className="mb-8">
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full p-1.5 bg-green-500 text-white">
                      <Library className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {translate("Всички книги", "All Books")}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {translate("Разгледайте нашите книги", "Browse our books")}
                    </span>
                  </div>
                </div>
                
                {/* Carousel */}
                <BookCarousel 
                  books={shopBooks} 
                  translate={(text) => translate(text, text)} 
                  language={language}
                  onBookClick={handleQuickView}
                />
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center">
              <Link 
                href="/shop/books"
                className="px-5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 
                  text-white font-medium text-sm shadow-md transition-colors
                  flex items-center gap-2"
              >
                <span>{translate("Вижте всички книги", "View all books")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BooksSectionContext.Provider>
  );
} 