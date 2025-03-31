"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, TrendingUp, Eye, ArrowRight, Calendar, Package, User, BookOpen, Download, FileText, Laptop, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { shopBooks } from "@/lib/shop-data";
import { services } from "@/data/services";
import FlipCard from "@/components/animata/card/flip-card";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      className={`flex flex-col h-full min-h-[500px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(22,163,74,0.15),_0px_8px_24px_rgba(22,163,74,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)] ${tabType === 'digital' ? 'border-l-4 border-blue-500 dark:border-blue-600' : 'border-l-4 border-green-500 dark:border-green-600'}`}
    >
      {/* Bestseller badge - improved styling */}
      {(book.featured && showBestsellerBadge) && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3" />
            {language === 'en' ? 'Bestseller' : 'Бестселър'}
          </div>
        </div>
      )}
      
      {/* Digital badge - if applicable */}
      {(book.digital && showDigitalBadge) && (
        <div className={`absolute ${book.featured && showBestsellerBadge ? 'top-14' : 'top-4'} right-4 z-30`}>
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
            <Download className="h-3 w-3" />
            {language === 'en' ? 'Digital' : 'Дигитална'}
          </div>
        </div>
      )}
      
      {/* Category badge - top left */}
      <div className="absolute top-4 left-4 z-30">
        <div className={`bg-gradient-to-r ${getCategoryColor(book.category)} px-3 py-1.5 rounded-full shadow-lg font-medium text-xs`}>
          {formatCategory(book.category)}
        </div>
      </div>
      
      {/* Book cover with proper container for flip animation */}
      <div className={`relative p-6 pt-14 pb-2 h-[280px] flex items-center justify-center ${tabType === 'digital' ? 'bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20' : 'bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30'}`}>
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
        
        {/* Fixed sizing container for consistent flip behavior */}
        <div className="w-[150px] h-[220px] relative">
          <FlipCard
            image={book.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
            title={book.title}
            subtitle={formatCategory(book.category)}
            description={book.description}
            className="w-full h-full"
            onClick={handleClick}
          />
        </div>
        
        {/* Quick action button - redesigned */}
        <div className="absolute top-14 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <Button 
            size="icon" 
            variant="secondary" 
            className={`h-9 w-9 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm ${tabType === 'digital' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
            onClick={handleClick}
            title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Book details - redesigned with elegant styling */}
      <div className={`flex flex-col flex-grow p-5 backdrop-blur-sm rounded-b-xl ${tabType === 'digital' ? 'bg-gradient-to-b from-white to-blue-50 dark:from-gray-800/80 dark:to-blue-900/40' : 'bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80'}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">{getDisplayTitle(book)}</h3>
          <span className={`font-bold text-base ml-2 ${tabType === 'digital' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`}>{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs text-gray-600 dark:text-gray-300">{book.pages} {language === 'en' ? 'pages' : 'стр.'}</span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">
          {book.description}
        </p>
        
        {/* Action buttons - refined styling */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 h-9 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md",
              tabType === 'digital' 
                ? "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950/30" 
                : "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30"
            )}
            onClick={handleClick}
          >
            <Eye className="h-3 w-3 mr-1" />
            {language === 'en' ? 'Preview' : 'Преглед'}
          </Button>
          
          <Button 
            size="sm"
            className={cn(
              "flex-1 h-9 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md text-white",
              tabType === 'digital' 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-green-600 hover:bg-green-700"
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
      className="flex flex-col h-full min-h-[500px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(22,163,74,0.15),_0px_8px_24px_rgba(22,163,74,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)] border-r-4 border-green-500 dark:border-green-600"
    >
      {/* Featured badge - if applicable */}
      {service.featured && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
            <Star className="h-3 w-3" />
            {language === 'en' ? 'Featured' : 'Препоръчано'}
          </div>
        </div>
      )}
      
      {/* Service type badge - top left */}
      <div className="absolute top-4 left-4 z-30">
        <div className={`bg-gradient-to-r ${getServiceTypeColor(service.category)} px-3 py-1.5 rounded-full shadow-lg font-medium text-xs`}>
          {service.category === 'individual' ? (language === 'en' ? 'Individual' : 'Индивидуална') : (language === 'en' ? 'Package' : 'Пакет')}
        </div>
      </div>
      
      {/* Service image area */}
      <div className="relative p-6 pt-14 pb-2 h-[280px] flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30">
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
        
        <div className="w-full h-full relative rounded-lg overflow-hidden shadow-lg">
          {/* Placeholder colored gradient with service icon */}
          <div className={`absolute inset-0 ${getServicePlaceholderColor(service.category)} flex items-center justify-center`}>
            {service.category === 'individual' ? (
              <User className="h-16 w-16 text-white/80" />
            ) : (
              <Package className="h-16 w-16 text-white/80" />
            )}
          </div>
          
          {/* Fallback to author image with overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/avatar/avatar.jpg"
              alt={service.title}
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          {/* Service title overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10">
            <h3 className="text-xl font-bold">{service.title}</h3>
          </div>
        </div>
        
        {/* Quick action button */}
        <div className="absolute top-14 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-9 w-9 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm text-green-600 dark:text-green-400"
            asChild
          >
            <Link href={`/services/${service.id}`}>
              <Calendar className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Service details */}
      <div className="flex flex-col flex-grow p-5 backdrop-blur-sm rounded-b-xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">{service.title}</h3>
          <span className="font-bold text-base text-green-600 dark:text-green-400 ml-2">{service.price.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs text-gray-600 dark:text-gray-300">{service.duration}</span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">
          {service.description}
        </p>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          {service.relatedBookId && (
            <Button 
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 h-9 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md",
                "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30"
              )}
              asChild
            >
              <Link href={`/shop/book/${service.relatedBookId}`} className="flex items-center justify-center">
                <BookOpen className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Related Book' : 'Свързана Книга'}
              </Link>
            </Button>
          )}
          
          <Button 
            size="sm"
            className={cn(
              "flex-1 h-9 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md text-white",
              "bg-green-600 hover:bg-green-700"
            )}
            asChild
          >
            <Link href={`/services/${service.id}`} className="flex items-center justify-center">
              <Calendar className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Learn More' : 'Научи повече'}
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
              {language === 'en' ? 'Bestselling' : 'Бестселъри'}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-green-300 dark:bg-green-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
            </span>
            {language === 'en' ? ' Books & Services' : ''}
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
            <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-4 py-6 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
              <TabsTrigger 
                value="books" 
                className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Bestsellers' : 'Бестселъри'}
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
              >
                <Download className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Digital' : 'Дигитални'}
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="rounded-full px-10 py-3.5 mx-2 my-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium text-base"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {language === 'en' ? 'Services' : 'Услуги'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Books Content */}
          <TabsContent value="books" className="relative pt-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bestsellers.map((book) => (
                  <div key={book.id} className="fade-in-item">
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
            </div>
          </TabsContent>

          <TabsContent value="digital" className="relative pt-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {digitalBooks.map((book) => (
                  <div key={book.id} className="fade-in-item">
                    <BookCard
                      book={book}
                      onBookClick={handleBookClick}
                      formatCategory={formatCategory}
                      getDisplayTitle={getDisplayTitle}
                      language={language}
                      showDigitalBadge={true}
                      showBestsellerBadge={book.featured}
                      tabType="digital"
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="relative pt-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredServices.map((service) => (
                  <div key={service.id} className="fade-in-item">
                    <ServiceCard
                      service={service}
                      language={language}
                    />
                  </div>
                ))}
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