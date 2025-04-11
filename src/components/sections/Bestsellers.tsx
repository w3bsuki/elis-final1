"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, TrendingUp, Eye, ArrowRight, Calendar, Package, User, BookOpen, Download, FileText, Laptop, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { shopBooks } from "@/lib/shop-data";
import { services } from "@/data/services";
import { BookExcerptDialog } from "@/components/ui/book-excerpt-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlipCard } from "@/components/ui/flip-card";

// Add keyframes for animations
const fadeInUpAnimation = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Define types
interface Book {
  id: string;
  title: string;
  description: string;
  category?: string;
  price?: number;
  featured?: boolean;
  image?: string;
  coverImage?: string;
  digital?: boolean;
  pages?: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  coverImage: string;
  featured?: boolean;
  includes?: string[];
  relatedBookId?: string;
}

// BookCard component to improve performance through memoization
const BookCard = ({ book, onBookClick, formatCategory, getDisplayTitle, language, showDigitalBadge = true, showBestsellerBadge = true, tabType = "books" }: {
  book: Book;
  onBookClick: (book: Book) => void;
  formatCategory: (category?: string) => string;
  getDisplayTitle: (book: Book) => string;
  language: string;
  showDigitalBadge?: boolean;
  showBestsellerBadge?: boolean;
  tabType?: 'books' | 'digital' | 'services';
}) => {
  const handleClick = useCallback(() => {
    // Use requestAnimationFrame for smoother interactions
    window.requestAnimationFrame(() => onBookClick(book));
  }, [book, onBookClick]);

  // Get category color based on book category
  const getCategoryColor = (category?: string) => {
    if (!category) return "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300";
    
    switch(category) {
      case 'poetry':
        return "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300";
      case 'health':
        return "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300";
      case 'selfHelp':
        return "from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-800 dark:text-yellow-300";
      default:
        return "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300";
    }
  };

  return (
    <div 
      key={book.id} 
      className={`flex flex-col h-full min-h-[480px] group relative overflow-hidden rounded-xl transition-all duration-300 
        bg-white dark:bg-gray-800/50 
        shadow-[0px_4px_16px_rgba(17,17,26,0.08),_0px_8px_24px_rgba(17,17,26,0.08)] 
        hover:shadow-[0px_8px_24px_rgba(22,163,74,0.18),_0px_16px_56px_rgba(22,163,74,0.15)] 
        transform hover:-translate-y-1 
        ${tabType === 'digital' 
          ? 'border-l-4 border-blue-500 dark:border-blue-600' 
          : 'border-l-4 border-green-500 dark:border-green-600'}`}
    >
      {/* Bestseller badge - improved styling */}
      {(book.featured && showBestsellerBadge) && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black px-3 py-1.5 rounded-full shadow-md font-medium text-xs flex items-center gap-1.5 backdrop-blur-sm">
            <TrendingUp className="h-3 w-3" />
            {language === 'en' ? 'Bestseller' : 'Бестселър'}
          </div>
        </div>
      )}
      
      {/* Digital badge - if applicable */}
      {(book.digital && showDigitalBadge) && (
        <div className={`absolute ${book.featured && showBestsellerBadge ? 'top-14' : 'top-4'} right-4 z-30`}>
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1.5 rounded-full shadow-md font-medium text-xs flex items-center gap-1.5 backdrop-blur-sm">
            <Download className="h-3 w-3" />
            {language === 'en' ? 'Digital' : 'Дигитална'}
          </div>
        </div>
      )}
      
      {/* Category badge - top left */}
      <div className="absolute top-4 left-4 z-30">
        <div className={`bg-gradient-to-r ${getCategoryColor(book.category)} px-3 py-1.5 rounded-full shadow-md font-medium text-xs backdrop-blur-sm`}>
          {formatCategory(book.category)}
        </div>
      </div>
      
      {/* Book cover with proper container for flip animation */}
      <div className={`relative p-6 pt-14 pb-2 h-[260px] flex items-center justify-center ${tabType === 'digital' 
        ? 'bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20' 
        : 'bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30'}`}>
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
        
        {/* Fixed sizing container for consistent flip behavior */}
        <div className="w-[140px] h-[200px] relative">
          <FlipCard
            image={book.coverImage || "/images/books/placeholder-cover.png"}
            title={book.title}
            subtitle={formatCategory(book.category)}
            description={book.description}
            className="w-full h-full"
            onClick={handleClick}
            simpleMode={true}
          />
        </div>
        
        {/* Quick action button - redesigned */}
        <div className="absolute top-14 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <Button 
            size="icon" 
            variant="secondary" 
            className={`h-9 w-9 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] 
              hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm 
              ${tabType === 'digital' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
            onClick={handleClick}
            title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Book details - redesigned with elegant styling */}
      <div className={`flex flex-col flex-grow p-5 backdrop-blur-sm rounded-b-xl ${tabType === 'digital' 
        ? 'bg-gradient-to-b from-white to-blue-50 dark:from-gray-800/80 dark:to-blue-900/40' 
        : 'bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80'}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-2">{getDisplayTitle(book)}</h3>
          <span className={`font-bold text-base ml-2 ${tabType === 'digital' 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-green-600 dark:text-green-400'}`}>{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-700/30">
            <FileText className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
            <span className="text-xs text-gray-600 dark:text-gray-300">{book.pages} {language === 'en' ? 'pages' : 'стр.'}</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
          {book.description}
        </p>
        
        {/* Action buttons - refined styling */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 h-9 text-xs font-medium rounded-lg transition-all duration-300",
              tabType === 'digital' 
                ? "border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-100 hover:border-blue-300 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30" 
                : "border-green-200 bg-green-50/50 text-green-600 hover:bg-green-100 hover:border-green-300 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30"
            )}
            onClick={handleClick}
          >
            <Eye className="h-3 w-3 mr-1" />
            {language === 'en' ? 'Preview' : 'Преглед'}
          </Button>
          
          <Button 
            size="sm"
            className={cn(
              "flex-1 h-9 text-xs font-medium rounded-lg transition-all duration-300 text-white",
              tabType === 'digital' 
                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-sm" 
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-sm"
            )}
            asChild
          >
            <Link href={`/shop/book/${book.id}`} className="flex items-center justify-center">
              <ShoppingCart className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Buy' : 'Купи'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// ServiceCard component similar to BookCard but for services
const ServiceCard = ({ service, language }: {
  service: Service;
  language: string;
}) => {
  // Get service type color
  const getServiceTypeColor = (type: string) => {
    switch(type) {
      case 'individual':
        return "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300";
      case 'package':
        return "from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-800 dark:text-yellow-300";
      default:
        return "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300";
    }
  };

  // Generate placeholder image based on service type
  const getServicePlaceholderColor = (type: string) => {
    return type === 'individual' ? 
      'bg-gradient-to-br from-purple-200 to-purple-400 dark:from-purple-800 dark:to-purple-600' : 
      'bg-gradient-to-br from-yellow-200 to-yellow-400 dark:from-yellow-800 dark:to-yellow-600';
  };

  return (
    <div 
      key={service.id} 
      className="flex flex-col h-full min-h-[480px] group relative overflow-hidden rounded-xl transition-all duration-300 
        bg-white dark:bg-gray-800/50 
        shadow-[0px_4px_16px_rgba(17,17,26,0.08),_0px_8px_24px_rgba(17,17,26,0.08)] 
        hover:shadow-[0px_8px_24px_rgba(147,51,234,0.18),_0px_16px_56px_rgba(147,51,234,0.15)] 
        transform hover:-translate-y-1  
        border-r-4 border-purple-500 dark:border-purple-600"
    >
      {/* Featured badge - if applicable */}
      {service.featured && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1.5 rounded-full shadow-md font-medium text-xs flex items-center gap-1.5 backdrop-blur-sm">
            <Star className="h-3 w-3" />
            {language === 'en' ? 'Featured' : 'Препоръчано'}
          </div>
        </div>
      )}
      
      {/* Service type badge - top left */}
      <div className="absolute top-4 left-4 z-30">
        <div className={`bg-gradient-to-r ${getServiceTypeColor(service.category)} px-3 py-1.5 rounded-full shadow-md font-medium text-xs backdrop-blur-sm`}>
          {service.category === 'individual' ? (language === 'en' ? 'Individual' : 'Индивидуална') : (language === 'en' ? 'Package' : 'Пакет')}
        </div>
      </div>
      
      {/* Service image area */}
      <div className="relative p-6 pt-14 pb-2 h-[240px] flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30">
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
        
        <div className="w-full h-full relative rounded-lg overflow-hidden shadow-md">
          {/* Placeholder colored gradient with service icon */}
          <div className={`absolute inset-0 ${getServicePlaceholderColor(service.category)} flex items-center justify-center`}>
            {service.category === 'individual' ? (
              <User className="h-16 w-16 text-white/80" />
            ) : (
              <Package className="h-16 w-16 text-white/80" />
            )}
          </div>
          
          {/* Service image */}
          {service.coverImage && (
            <Image
              src={service.coverImage}
              alt={service.title}
              fill
              className="object-cover mix-blend-overlay opacity-60"
            />
          )}
          
          {/* Overlay with service title */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <h3 className="text-lg font-bold mb-2 leading-tight">{service.title}</h3>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-3.5 w-3.5 opacity-80" />
              <span className="text-xs font-medium opacity-90">{service.duration}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service details */}
      <div className="flex flex-col flex-grow p-5 backdrop-blur-sm rounded-b-xl bg-gradient-to-b from-white to-purple-50/50 dark:from-gray-800/80 dark:to-purple-900/20">
        {/* Price display */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-purple-100/80 dark:bg-purple-900/30">
            <Clock className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">{service.duration}</span>
          </div>
          <span className="font-bold text-base text-purple-600 dark:text-purple-400">{service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {service.description}
        </p>
        
        {/* Includes list - if available */}
        {service.includes && service.includes.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
              {language === 'en' ? 'Includes:' : 'Включва:'}
            </h4>
            <ul className="space-y-1.5">
              {service.includes.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-4 w-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <ArrowRight className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 line-clamp-1">{item}</span>
                </li>
              ))}
              {service.includes.length > 3 && (
                <li className="text-xs text-purple-600 dark:text-purple-400 font-medium ml-6">
                  {language === 'en' ? `+ ${service.includes.length - 3} more` : `+ още ${service.includes.length - 3}`}
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-xs font-medium rounded-lg transition-all duration-300
              border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100 hover:border-purple-300
              dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30"
            asChild
          >
            <Link href={`/shop/service/${service.id}`} className="flex items-center justify-center">
              <Eye className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Details' : 'Детайли'}
            </Link>
          </Button>
          
          <Button 
            size="sm"
            className="flex-1 h-9 text-xs font-medium rounded-lg transition-all duration-300 text-white
              bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-sm"
            asChild
          >
            <Link href={`/shop/service/${service.id}#buy`} className="flex items-center justify-center">
              <ShoppingCart className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Buy' : 'Купи'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Bestsellers() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'books' | 'digital' | 'services'>('books');
  const { language } = useLanguage();
  
  // Insert the animation styles into the DOM
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = fadeInUpAnimation;
    document.head.appendChild(styleElement);
    
    // Clean up when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  // Memoize filtered data to avoid unnecessary recalculations
  const bestsellers = useMemo(() => 
    shopBooks.filter(book => book.featured).slice(0, 3),
    []
  );
  
  // Filter digital books - memoized
  const digitalBooks = useMemo(() => 
    shopBooks.filter(book => book.digital).slice(0, 3),
    []
  );
  
  // Filter featured services - memoized
  const featuredServices = useMemo(() => 
    services.filter(service => service.featured).slice(0, 3),
    []
  );
  
  // Memoize event handlers
  const handleBookClick = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsPreviewOpen(true);
  }, []);

  // Simplified tab change handler
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as 'books' | 'digital' | 'services');
  }, []);
  
  // Helper function to safely format category - memoized
  const formatCategory = useCallback((category?: string): string => {
    if (!category) return language === 'en' ? 'General' : 'Общи';
    
    if (language === 'bg') {
      return category === 'health' ? 'Здраве' 
        : category === 'poetry' ? 'Поезия' 
        : category === 'selfHelp' ? 'Самопомощ'
        : category;
    }
    
    return category.charAt(0).toUpperCase() + category.slice(1);
  }, [language]);
  
  // Helper function to get correct title based on language - memoized
  const getDisplayTitle = useCallback((book: Book): string => {
    const shortTitles: Record<string, string> = {
      'Осъзнато хранене - яж и отслабвай с удоволствие': 'Осъзнато Хранене',
      'Вдъхновения: Когато не знаеш как да продължиш напред - книга 2': 'Вдъхновения 2',
      'Вдъхновения. Когато не знаеш как да продължиш напред - книга 1': 'Вдъхновения',
      'Дневник на щастието. Слънцето в мен': 'Дневник на щастието',
      'Дневник на Успеха: Аз мога': 'Дневник на Успеха',
      'С душа и сърце': 'С душа и сърце',
    };
    
    return shortTitles[book.title] || book.title;
  }, []);
  
  return (
    <section 
      id="books" 
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-yellow-200/20 dark:bg-yellow-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] bg-blue-200/10 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <Star className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Reader Favorites' : 'Читателски Фаворити'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'Bestselling' : 'Най-продавани'}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-green-300 dark:bg-green-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
            </span>
            {language === 'en' ? ' Books & Services' : ' Книги и Услуги'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Discover our most popular books and services that have touched the hearts and minds of readers around the world.'
              : 'Открийте нашите най-популярни книги и услуги, които докоснаха сърцата и умовете на читателите по целия свят.'}
          </p>
        </div>

        {/* Tabs for switching between books and services */}
        <Tabs defaultValue="books" className="w-full" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gradient-to-r from-gray-50/90 via-white/95 to-gray-50/90 
              dark:from-gray-800/50 dark:via-gray-900/60 dark:to-gray-800/50 
              p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/40 
              shadow-[3px_3px_6px_rgba(0,0,0,0.06),-3px_-3px_6px_rgba(255,255,255,0.8)] 
              dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]">
              <TabsTrigger 
                value="books" 
                className="relative rounded-full px-8 py-3 
                  data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 
                  data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                  dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                  transition-all duration-300 font-medium text-sm group"
              >
                {/* Creating the animation glow effect for active tab */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 via-green-500/10 to-green-500/10 dark:from-green-500/20 dark:via-green-500/20 dark:to-green-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                <BookOpen className="h-4 w-4 mr-2 transition-transform duration-300 group-data-[state=active]:scale-110" />
                {language === 'en' ? 'Bestsellers' : 'Бестселъри'}
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="relative rounded-full px-8 py-3 
                  data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 
                  data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                  dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                  transition-all duration-300 font-medium text-sm group"
              >
                {/* Creating the animation glow effect for active tab */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-blue-500/10 dark:from-blue-500/20 dark:via-blue-500/20 dark:to-blue-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                <Download className="h-4 w-4 mr-2 transition-transform duration-300 group-data-[state=active]:scale-110" />
                {language === 'en' ? 'Digital' : 'Дигитални'}
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="relative rounded-full px-8 py-3 
                  data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 
                  data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                  dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                  transition-all duration-300 font-medium text-sm group"
              >
                {/* Creating the animation glow effect for active tab */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-purple-500/10 to-purple-500/10 dark:from-purple-500/20 dark:via-purple-500/20 dark:to-purple-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                <Calendar className="h-4 w-4 mr-2 transition-transform duration-300 group-data-[state=active]:scale-110" />
                {language === 'en' ? 'Services' : 'Услуги'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Books Content */}
          <TabsContent value="books" className="relative pt-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {bestsellers.map((book, index) => (
                  <div key={book.id} 
                    className="fade-in-item transition-all duration-500"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      transform: "translateY(20px)",
                      opacity: 0,
                      animation: `fadeInUp 600ms ease-out ${index * 150}ms forwards`
                    }}
                  >
                    <BookCard
                      book={book}
                      onBookClick={handleBookClick}
                      formatCategory={formatCategory}
                      getDisplayTitle={getDisplayTitle}
                      language={language}
                      showDigitalBadge={false}
                      showBestsellerBadge={true}
                      tabType="books"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button 
                  asChild
                  variant="outline" 
                  className="px-6 py-2 h-auto rounded-full bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 shadow-sm"
                >
                  <Link href="/shop">
                    {language === 'en' ? 'View All Books' : 'Вижте Всички Книги'} 
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="digital" className="relative pt-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {digitalBooks.map((book, index) => (
                  <div key={book.id} 
                    className="fade-in-item transition-all duration-500"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      transform: "translateY(20px)",
                      opacity: 0,
                      animation: `fadeInUp 600ms ease-out ${index * 150}ms forwards`
                    }}
                  >
                    <BookCard
                      book={book}
                      onBookClick={handleBookClick}
                      formatCategory={formatCategory}
                      getDisplayTitle={getDisplayTitle}
                      language={language}
                      showDigitalBadge={true}
                      showBestsellerBadge={false}
                      tabType="digital"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button 
                  asChild
                  variant="outline" 
                  className="px-6 py-2 h-auto rounded-full bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 shadow-sm"
                >
                  <Link href="/shop?filter=digital">
                    {language === 'en' ? 'View All Digital Books' : 'Вижте Всички Дигитални Книги'} 
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="relative pt-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {featuredServices.map((service, index) => (
                  <div key={service.id} 
                    className="fade-in-item transition-all duration-500"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      transform: "translateY(20px)",
                      opacity: 0,
                      animation: `fadeInUp 600ms ease-out ${index * 150}ms forwards`
                    }}
                  >
                    <ServiceCard 
                      service={service}
                      language={language}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button 
                  asChild
                  variant="outline" 
                  className="px-6 py-2 h-auto rounded-full bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 shadow-sm"
                >
                  <Link href="/services">
                    {language === 'en' ? 'View All Services' : 'Вижте Всички Услуги'} 
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* "View all" button */}
        <div className="flex justify-center mt-16">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 text-lg rounded-xl h-14 px-10 hover:translate-y-[-2px]"
            asChild
          >
            <Link href={activeTab === 'services' ? "/services" : "/shop"} className="flex items-center gap-2">
              {language === 'en' ? 'View All' : 'Виж всички'}
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        {/* Book Preview Dialog */}
        {selectedBook && (
          <BookPreviewDialog
            book={selectedBook}
            open={isPreviewOpen}
            onOpenChange={setIsPreviewOpen}
          />
        )}
      </div>
      
      {/* Add simple CSS animation for items */}
      <style jsx global>{`
        .fade-in-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Add staggered delay for items */
        .fade-in-item:nth-child(1) { animation-delay: 0.1s; }
        .fade-in-item:nth-child(2) { animation-delay: 0.2s; }
        .fade-in-item:nth-child(3) { animation-delay: 0.3s; }
        .fade-in-item:nth-child(4) { animation-delay: 0.4s; }
        .fade-in-item:nth-child(5) { animation-delay: 0.5s; }
        .fade-in-item:nth-child(6) { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
} 