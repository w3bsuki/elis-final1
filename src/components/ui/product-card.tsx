"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Heart, Sparkles, Eye, Download, Share2, FileText, BookOpen } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/lib/CartContext';
import { motion } from "framer-motion";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

interface ProductCardProps {
  book: Book;
  className?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

// Helper function to get color scheme based on category
const getCategoryColor = (category: string | undefined) => {
  switch (category) {
    case 'poetry':
      return 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300';
    case 'health':
      return 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300';
    case 'selfHelp':
      return 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 text-amber-800 dark:text-amber-300';
    case 'psychology':
      return 'from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30 text-rose-800 dark:text-rose-300';
    default:
      return 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300';
  }
};

export function ProductCard({ book, className, isBookmarked = false, onBookmarkToggle }: ProductCardProps) {
  const { language, translations } = useLanguage();
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Create a local translation function if t is not provided
  const getTranslation = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Define spine color based on category
  const getSpineColor = () => {
    switch (book.category) {
      case 'health':
        return "bg-green-600";
      case 'poetry':
        return "bg-blue-600";
      case 'selfHelp':
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  // Fallback image
  const fallbackImage = "/images/books/vdahnovenia-kniga-1.png";
  
  // Handle add to cart button click
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      addToCart(book, 1);
      setIsAddingToCart(false);
    }, 300);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col h-full min-h-[500px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-background/95 paper-texture border-l-4 border-primary card-shadow-hover",
        className
      )}
    >
      {/* Bestseller badge */}
      {book.featured && (
        <div className="absolute top-4 right-4 z-30">
          <Badge 
            variant="premium"
            className="px-3 py-1.5 text-xs flex items-center gap-1.5 shadow-lg"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {language === 'en' ? 'Bestseller' : 'Бестселър'}
          </Badge>
        </div>
      )}
      
      {/* Digital badge */}
      {book.digital && (
        <div className={`absolute ${book.featured ? 'top-14' : 'top-4'} right-4 z-30`}>
          <Badge 
            variant="accent" 
            className="px-3 py-1.5 text-xs flex items-center gap-1.5 shadow-lg"
          >
            <Download className="h-3.5 w-3.5" />
            {language === 'en' ? 'Digital' : 'Дигитална'}
          </Badge>
        </div>
      )}
      
      {/* Category badge */}
      {book.category && (
        <div className="absolute top-4 left-4 z-30">
          <Badge variant="outline" className="px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
            {book.category === 'health' ? ensureString(getTranslation("categories.health")) : 
             book.category === 'poetry' ? ensureString(getTranslation("categories.poetry")) : 
             book.category === 'selfHelp' ? ensureString(getTranslation("categories.selfHelp")) : 
             book.category}
          </Badge>
        </div>
      )}
      
      {/* Book cover with hover effect */}
      <div className="relative p-6 pt-14 pb-2 h-[280px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
        
        {/* Fixed sizing container for consistent flip behavior */}
        <div className="w-[150px] h-[220px] relative book-tilt perspective-1000">
          <div className="w-full h-full transform transition-all duration-500 shadow-lg rounded-md overflow-hidden">
            <Image
              src={book.coverImage || fallbackImage}
              alt={book.title}
              fill
              className={cn(
                "object-cover transition-all",
                imageLoaded ? "opacity-100" : "opacity-0",
                imageError ? "hidden" : "block"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
            {imageError && (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
            )}
          </div>
        </div>
        
        {/* Quick action button */}
        <div className="absolute top-14 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
           <Button 
             size="icon" 
             variant="accent" 
             rounded="full"
             className="h-9 w-9 shadow-lg backdrop-blur-sm"
             onClick={() => onBookmarkToggle?.()}
             title={language === 'en' ? 'Add to wishlist' : 'Добави в любими'}
           >
             <Heart className={cn(
               "h-4 w-4",
               isBookmarked ? "text-red-500 fill-red-500" : "text-accent-foreground"
             )} />
           </Button>
         </div>
      </div>
      
      {/* Book details */}
      <div className="flex flex-col flex-grow p-5 rounded-b-xl">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-foreground text-base">{book.title}</h3>
          <span className="font-bold text-base ml-2 text-primary">{book.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{book.pages} {language === 'en' ? 'pages' : 'стр.'}</span>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-grow">
          {book.description}
        </p>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="dotted"
            size="sm"
            className="flex-1 h-10"
            asChild
          >
            <Link href={`/shop/${book.id}`}>
              <Eye className="h-4 w-4 mr-1.5" />
              {language === 'en' ? 'Preview' : 'Преглед'}
            </Link>
          </Button>
          
          <Button 
            variant={book.digital ? "accent" : "premium"}
            animation={book.featured ? "glow" : "ripple"}
            size="sm"
            className="flex-1 h-10"
            onClick={handleAddToCart}
            loading={isAddingToCart}
            icon={book.digital ? <Download className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          >
            {book.digital ? 
              (language === 'en' ? 'Download' : 'Изтегли') : 
              (language === 'en' ? 'Add to cart' : 'Добави в кошницата')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 