"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, ChevronRight, Laptop, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { shopBooks } from "@/lib/shop-data";
import FlipCard from "@/components/animata/card/flip-card";
import { BookPreviewDialog } from "@/components/ui/book-preview-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
}

export default function DigitalBooks() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { language } = useLanguage();
  
  // For this example, we'll use the first 3 books as digital books
  const digitalBooks = shopBooks.slice(0, 3);
  
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsPreviewOpen(true);
  };
  
  // Helper function to safely format category
  const formatCategory = (category?: string): string => {
    if (!category) return '';
    
    if (language === 'en') {
      return category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      switch (category) {
        case 'health': return 'Здраве';
        case 'poetry': return 'Поезия';
        case 'selfHelp': return 'Самопомощ';
        default: return category;
      }
    }
  };
  
  // Helper function to get the display title for each book
  const getDisplayTitle = (book: Book): string => {
    // Map book IDs to their display titles
    switch (book.id) {
      case '1': return 'Осъзнато Хранене';
      case '2': 
      case '3': return 'Вдъхновения';
      case '6': return 'С душа и сърце';
      case '5': return 'Дневник на успеха';
      default: return book.title.split(' - ')[0];
    }
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px]"></div>
        
        {/* Enhanced background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-br-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 rounded-tl-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern heading with accent */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 mb-4">
            <Download className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'Instant Access' : 'Незабавен Достъп'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'Digital' : 'Дигитални'}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200 dark:bg-blue-700/50 -z-10 transform -rotate-1"></span>
            </span>{" "}
            {language === 'en' ? 'Books Collection' : 'Книги'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Download and start reading immediately with our collection of digital books, available in multiple formats.'
              : 'Изтеглете и започнете да четете веднага с нашата колекция от дигитални книги, налични в различни формати.'}
          </p>
        </div>
        
        {/* Books grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalBooks.map((book) => (
              <div 
                key={book.id} 
                className="flex flex-col h-full group relative overflow-hidden border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(59,130,246,0.5)] dark:hover:shadow-[8px_8px_0px_0px_rgba(59,130,246,0.3)]"
              >
                {/* Digital badge - top right */}
                <div className="absolute top-0 right-0 z-30">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-bl-lg border-l-2 border-b-2 border-black dark:border-gray-700 shadow-md transform rotate-0 font-medium text-xs flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {language === 'en' ? 'Digital' : 'Дигитална'}
                  </div>
                </div>
                
                {/* Category badge - top left */}
                <div className="absolute top-0 left-0 z-30">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-br-lg border-r-2 border-b-2 border-black dark:border-gray-700 shadow-md transform rotate-0 font-medium text-xs">
                    {formatCategory(book.category)}
                  </div>
                </div>
                
                {/* Book cover with hover effect */}
                <div className="relative p-5 pt-8 pb-0">
                  <div 
                    onClick={() => handleBookClick(book)} 
                    className="cursor-pointer transform transition-transform duration-300 group-hover:translate-y-[-5px] max-w-[200px] mx-auto"
                  >
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden" style={{ aspectRatio: '3/5' }}>
                      <FlipCard
                        image={book.coverImage || "/images/books/vdahnovenia-kniga-1.png"}
                        title={book.title}
                        subtitle={formatCategory(book.category)}
                        description={book.description}
                        category={book.category || 'default'}
                        className="mx-auto shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] w-full h-full"
                      />
                    </div>
                  </div>
                  
                  {/* Quick action button */}
                  <div className="absolute top-10 left-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-8 w-8 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
                      onClick={() => handleBookClick(book)}
                      title={language === 'en' ? 'Quick view' : 'Бърз преглед'}
                    >
                      <BookOpen className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </div>
                </div>
                
                {/* Book details with blue accent border */}
                <div className="flex flex-col flex-grow p-5 pt-4 border-t-2 border-blue-600/20 dark:border-blue-600/10 mt-3 bg-gray-50 dark:bg-gray-800/80">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{getDisplayTitle(book)}</h3>
                    <span className="font-bold text-base text-blue-600 dark:text-blue-400">{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
                  </div>
                  
                  <div className="mb-2 flex gap-2">
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 text-xs flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      PDF
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 text-xs flex items-center">
                      <Laptop className="h-3 w-3 mr-1" />
                      EPUB
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                    {book.description}
                  </p>
                  
                  {/* Action buttons in a unified container */}
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950/30 flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm"
                      onClick={() => handleBookClick(book)}
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      {language === 'en' ? 'Preview' : 'Преглед'}
                    </Button>
                    
                    <Button 
                      size="sm"
                      className={cn(
                        "bg-blue-600 hover:bg-blue-700 text-white flex-1 h-8 text-xs border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-sm",
                        "transition-transform duration-200 hover:scale-105"
                      )}
                      asChild
                    >
                      <Link href={`/shop/${book.id}`}>
                        <Download className="h-3 w-3 mr-1" />
                        {language === 'en' ? 'Download' : 'Изтегли'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="flex justify-center mt-16">
          <Button 
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950/30 group border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 px-6 py-5 h-auto rounded-md"
            asChild
          >
            <Link href="/digital" className="flex items-center">
              {language === 'en' ? 'Browse Digital Library' : 'Разгледайте Дигиталната Библиотека'}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
    </section>
  );
} 