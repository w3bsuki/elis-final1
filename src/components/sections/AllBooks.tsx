"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Library, ChevronRight, Eye, BookText, FileText, ShoppingCart, TrendingUp, BookOpen, Heart, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { shopBooks } from "@/lib/shop-data";
import FlipCard from "@/components/animata/card/flip-card";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define a Book type to replace 'any'
interface Book {
  id: string;
  title: string;
  description: string;
  category?: string;
  price?: number;
  featured?: boolean;
  image?: string;
  coverImage?: string;
  pages?: number;
}

export default function AllBooks() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const { language } = useLanguage();
  
  // Filter books based on the active category
  const filteredBooks = useMemo(() => {
    if (activeCategory === 'all') {
      return shopBooks.slice(0, 6);
    }
    return shopBooks
      .filter(book => book.category === activeCategory)
      .slice(0, 6);
  }, [activeCategory]);
  
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsPreviewOpen(true);
  };
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  // Helper function to safely format category
  const formatCategory = (category?: string): string => {
    if (!category) return language === 'en' ? 'General' : 'Общи';
    
    if (language === 'bg') {
      return category === 'health' ? 'Здраве' 
        : category === 'poetry' ? 'Поезия' 
        : category === 'selfHelp' ? 'Самопомощ'
        : category;
    }
    
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Helper function to get the display title for each book
  const getDisplayTitle = (book: Book): string => {
    const shortTitles: Record<string, string> = {
      'Осъзнато хранене - яж и отслабвай с удоволствие': 'Осъзнато Хранене',
      'Вдъхновения: Когато не знаеш как да продължиш напред - книга 2': 'Вдъхновения 2',
      'Вдъхновения. Когато не знаеш как да продължиш напред - книга 1': 'Вдъхновения',
      'Дневник на щастието. Слънцето в мен': 'Дневник на щастието',
      'Дневник на Успеха: Аз мога': 'Дневник на Успеха',
      'С душа и сърце': 'С душа и сърце',
    };
    
    return shortTitles[book.title] || book.title;
  };
  
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
    <section className="py-24 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-green-200/20 dark:bg-green-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] bg-green-100/10 dark:bg-green-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 mb-4">
            <Library className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Complete Collection' : 'Пълна Колекция'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'Explore' : 'Всички'}
              <span className="absolute -bottom-2 left-0 w-full h-4 bg-green-300 dark:bg-green-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
            </span>{" "}
            {language === 'en' ? 'All Books' : 'Книги'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Browse our complete collection of books covering a wide range of topics from mindfulness to poetry.'
              : 'Разгледайте нашата пълна колекция от книги, обхващащи широк спектър от теми - от осъзнатост до поезия.'}
          </p>
        </div>
        
        {/* Category tabs */}
        <Tabs value={activeCategory} className="w-full mb-10" onValueChange={handleCategoryChange}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 px-4 py-4 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
              <TabsTrigger 
                value="all" 
                className="rounded-full px-6 py-2.5 mx-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
              >
                <BookOpen className="h-4 w-4 mr-1.5" />
                {language === 'en' ? 'All Books' : 'Всички Книги'}
              </TabsTrigger>
              <TabsTrigger 
                value="poetry" 
                className="rounded-full px-6 py-2.5 mx-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
              >
                <Star className="h-4 w-4 mr-1.5" />
                {language === 'en' ? 'Poetry' : 'Поезия'}
              </TabsTrigger>
              <TabsTrigger 
                value="health" 
                className="rounded-full px-6 py-2.5 mx-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
              >
                <Heart className="h-4 w-4 mr-1.5" />
                {language === 'en' ? 'Health' : 'Здраве'}
              </TabsTrigger>
              <TabsTrigger 
                value="selfHelp" 
                className="rounded-full px-6 py-2.5 mx-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
              >
                <BookText className="h-4 w-4 mr-1.5" />
                {language === 'en' ? 'Psychology' : 'Психология'}
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Books grid - with consistent sizing matching bestsellers */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book, index) => (
                <div 
                  key={book.id} 
                  className="fade-in-item flex flex-col h-full min-h-[500px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(22,163,74,0.15),_0px_8px_24px_rgba(22,163,74,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)] border-l-4 border-green-500 dark:border-green-600"
                >
                  {/* Bestseller badge - if applicable */}
                  {book.featured && (
                    <div className="absolute top-4 right-4 z-30">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
                        <TrendingUp className="h-3 w-3" />
                        {language === 'en' ? 'Bestseller' : 'Бестселър'}
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
                  <div className="relative p-6 pt-14 pb-2 h-[280px] flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30">
                    <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
                    
                    {/* Fixed sizing container for consistent flip behavior */}
                    <div className="w-[150px] h-[220px] relative">
                      <FlipCard
                        image={book.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
                        title={book.title}
                        subtitle={formatCategory(book.category)}
                        description={book.description}
                        className="w-full h-full"
                        onClick={() => handleBookClick(book)}
                      />
                    </div>
                    
                    {/* Quick action button - redesigned */}
                    <div className="absolute top-14 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="h-9 w-9 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm text-gray-700 dark:text-gray-300"
                        onClick={() => handleBookClick(book)}
                        title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Book details - redesigned with elegant styling */}
                  <div className="flex flex-col flex-grow p-5 backdrop-blur-sm rounded-b-xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">{getDisplayTitle(book)}</h3>
                      <span className="font-bold text-base text-green-600 dark:text-green-400 ml-2">{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
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
                          "border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-950/30"
                        )}
                        onClick={() => handleBookClick(book)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        {language === 'en' ? 'Preview' : 'Преглед'}
                      </Button>
                      
                      <Button 
                        size="sm"
                        className={cn(
                          "flex-1 h-9 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md text-white",
                          "bg-green-600 hover:bg-green-700"
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
              ))}
            </div>
          </div>
        </Tabs>
        
        {/* "View all" button */}
        <div className="flex justify-center mt-16">
          <Button 
            size="lg" 
            className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 text-lg rounded-xl h-14 px-10 hover:translate-y-[-2px]"
            asChild
          >
            <Link href="/shop" className="flex items-center gap-2">
              {language === 'en' ? 'View All Books' : 'Виж всички книги'}
              <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
      
      {selectedBook && (
        <BookPreviewDialog 
          book={{
            id: selectedBook.id,
            title: selectedBook.title,
            description: selectedBook.description,
            category: selectedBook.category,
            price: selectedBook.price,
            image: selectedBook.coverImage || "/images/books/vdahnovenia-kniga-1.png"
          }}
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
      
      {/* Add animation styles for cards */}
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