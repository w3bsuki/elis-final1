"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Book } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, ShoppingCart, Heart, Download, Sparkles, Eye, BookOpen, Bookmark, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCart } from '@/lib/CartContext';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

interface BookCardProps {
  book: Book;
  className?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  onClick?: (book: Book) => void;
}

export function BookCard({ book, className, isBookmarked = false, onBookmarkToggle, onClick }: BookCardProps) {
  const { language, translations } = useLanguage();
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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

  // Fallback image
  const fallbackImage = "/images/books/placeholder-book.jpg";
  
  // Format the price with currency
  const formattedPrice = `${book.price?.toFixed(0)} ${language === 'en' ? 'BGN' : 'лв.'}`;
  
  // Handle add to cart button click
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      addToCart(book, 1);
      setIsAddingToCart(false);
      
      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }, 500);
  };
  
  // Handle card click
  const handleCardClick = () => {
    if (onClick) {
      onClick(book);
    }
  };
  
  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmarkToggle) {
      onBookmarkToggle();
    }
  };
  
  // Generate stars for rating display
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-3 w-3",
              star <= rating 
                ? "fill-amber-400 text-amber-400" 
                : "text-gray-300 dark:text-gray-600"
            )}
          />
        ))}
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col h-full rounded-lg overflow-hidden bg-white dark:bg-gray-900",
        "border border-gray-200 dark:border-gray-800 transition-all duration-300",
        "hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-400",
        "hover:translate-y-[-3px]",
        "cursor-pointer",
        className
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Green shadow glow effect */}
      <div className="absolute inset-0 opacity-0 bg-emerald-500/10 rounded-lg group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Book image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={book.coverImage || fallbackImage}
          alt={book.title}
          fill
          className={cn(
            "object-cover transition-transform duration-300 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0",
            imageError ? "hidden" : "block"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          priority={book.featured}
        />
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
            <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600" />
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        {/* Bookmark button - only shown when hovered or active */}
        <button
          className={cn(
            "absolute top-2 right-2 z-10 h-6 w-6 rounded-full flex items-center justify-center",
            "bg-white/80 backdrop-blur-sm dark:bg-gray-800/80",
            "border border-gray-200 dark:border-gray-700",
            "text-gray-600 dark:text-gray-300",
            "hover:text-amber-500 dark:hover:text-amber-400",
            isHovered || isBookmarked ? "opacity-100" : "opacity-0",
            isBookmarked && "text-amber-500 dark:text-amber-400",
            "transition-opacity duration-200"
          )}
          onClick={handleBookmarkToggle}
          aria-label={isBookmarked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="h-3 w-3" />
        </button>
        
        {/* Digital badge */}
        {book.digital && (
          <div className="absolute bottom-1 right-1">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 rounded-sm px-1 py-0 text-[8px] font-medium flex items-center gap-0.5">
              <Download className="h-2 w-2" />
              {language === 'en' ? 'Digital' : 'Дигитална'}
            </Badge>
          </div>
        )}
        
        {/* Category badge */}
        {book.category && (
          <div className="absolute top-1 left-1">
            <Badge className="border-0 rounded-sm px-1 py-0 text-[8px] font-medium bg-emerald-600 hover:bg-emerald-700 text-white">
              {book.category}
            </Badge>
          </div>
        )}
        
        {/* Featured badge */}
        {book.featured && (
          <div className="absolute top-1 right-1">
            <Badge className="bg-amber-400 text-amber-950 border-0 hover:bg-amber-500 rounded-sm px-1 py-0 text-[8px] font-medium flex items-center gap-0.5">
              <Sparkles className="h-2 w-2" />
              {language === 'en' ? 'Featured' : 'Препоръчана'}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Book details */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-0.5 line-clamp-2 tracking-tight leading-snug">
          {book.title}
        </h3>
        
        {/* Author */}
        {book.author && (
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">
            {language === 'en' ? 'By ' : 'От '} 
            <span className="font-medium">{book.author}</span>
          </p>
        )}
        
        {/* Price and rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm text-emerald-700 dark:text-emerald-400">
            {formattedPrice}
          </span>
          
          {book.rating && (
            <div className="text-right">
              {renderStars(book.rating)}
            </div>
          )}
        </div>
        
        {/* Book description */}
        <p className="text-[10px] text-gray-600 dark:text-gray-400 mb-1 line-clamp-2 flex-grow">
          {book.description}
        </p>
        
        {/* Format and pages info */}
        {(book.format || book.pages) && (
          <div className="flex items-center justify-between text-[8px] text-gray-500 dark:text-gray-400 mb-1">
            {book.format && (
              <span>{book.format}</span>
            )}
            {book.pages && (
              <span>{book.pages} {language === 'en' ? 'pages' : 'страници'}</span>
            )}
          </div>
        )}
        
        {/* Action buttons */}
        <div className="mt-auto flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-6 text-[10px] rounded-md border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 dark:border-emerald-900 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
            asChild
          >
            <Link href={`/books/${book.id}`}>
              <span className="flex items-center gap-1">
                {language === 'en' ? 'Details' : 'Детайли'}
                <ArrowUpRight className="h-2.5 w-2.5" />
              </span>
            </Link>
          </Button>
          
          <Button
            size="sm"
            className="flex-1 h-6 text-[10px] rounded-md bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-1 h-2.5 w-2.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {language === 'en' ? 'Adding...' : 'Добавяне...'}
              </span>
            ) : (
              <>
                {showSuccess ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                    {language === 'en' ? 'Added' : 'Добавено'}
                  </span>
                ) : (
                  <>
                    <ShoppingCart className="h-2.5 w-2.5 mr-1" />
                    {language === 'en' ? 'Buy' : 'Купи'}
                  </>
                )}
              </>
            )}
          </Button>
        </div>
        
        {/* Preview button (if digital) */}
        {book.digital && book.previewUrl && (
          <div className="mt-1.5">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-6 text-xs text-gray-600 dark:text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20"
              asChild
            >
              <Link href={book.previewUrl}>
                <Eye className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Preview Book' : 'Преглед на книгата'}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 