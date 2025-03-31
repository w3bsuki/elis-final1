"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Service } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Heart, Sparkles, Eye, Download, Share2, Clock, Package } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/lib/CartContext';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

interface ServiceCardProps {
  service: Service;
  className?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

// Helper function to get color scheme based on category
const getCategoryColor = (category: string | undefined) => {
  switch (category) {
    case 'individual':
      return 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300';
    case 'package':
      return 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300';
    default:
      return 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300';
  }
};

export function ServiceCard({ service, className, isBookmarked = false, onBookmarkToggle }: ServiceCardProps) {
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

  // Fallback image
  const fallbackImage = "/images/services/coaching.jpg";
  
  // Handle add to cart button click
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Add a small delay to show the loading state
    setTimeout(() => {
      addToCart(service, 1);
      setIsAddingToCart(false);
    }, 300);
  };
  
  return (
    <div className="flex flex-col h-full min-h-[500px] group relative overflow-hidden rounded-xl transition-all duration-300 bg-white dark:bg-gray-800/50 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1)] hover:shadow-[0px_4px_16px_rgba(22,163,74,0.15),_0px_8px_24px_rgba(22,163,74,0.15)] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2)] border-l-4 border-blue-500 dark:border-blue-600">
      {/* Featured badge */}
      {service.featured && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            {language === 'en' ? 'Featured' : 'Избрано'}
          </div>
        </div>
      )}
      
      {/* Category badge */}
      {service.category && (
        <div className="absolute top-4 left-4 z-30">
          <div className={`bg-gradient-to-r ${getCategoryColor(service.category)} px-3 py-1.5 rounded-full shadow-lg font-medium text-xs flex items-center gap-1.5`}>
            {service.category === 'individual' ? (
              <>
                <Clock className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Individual' : 'Индивидуална'}
              </>
            ) : (
              <>
                <Package className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Package' : 'Пакет'}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Service image */}
      <div className="relative p-6 pt-14 pb-2 h-[280px] flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-900/30">
        <div className="absolute inset-0 opacity-50 pointer-events-none"></div>
        
        {/* Fixed sizing container for consistent behavior */}
        <div className="w-[200px] h-[160px] relative">
          <div className="w-full h-full transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:rotate-1 shadow-[0px_10px_20px_rgba(0,0,0,0.2)] rounded-md overflow-hidden">
            <Image
              src={service.coverImage || fallbackImage}
              alt={service.title}
              fill
              className={cn(
                "object-cover transition-opacity",
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
              <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            )}
          </div>
        </div>
        
        {/* Quick action button */}
        <div className="absolute top-14 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
           <Button 
             size="icon" 
             variant="secondary" 
             className="h-9 w-9 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0px_8px_16px_rgba(0,0,0,0.1)] hover:bg-white dark:hover:bg-gray-800 backdrop-blur-sm text-gray-700 dark:text-gray-300"
             onClick={() => onBookmarkToggle?.()}
             title={language === 'en' ? 'Add to wishlist' : 'Добави в любими'}
           >
             <Heart className={cn(
               "h-4 w-4",
               isBookmarked ? "text-red-500 fill-red-500" : "text-gray-700 dark:text-gray-300"
             )} />
           </Button>
         </div>
      </div>
      
      {/* Service details */}
      <div className="flex flex-col flex-grow p-5 backdrop-blur-sm rounded-b-xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-800/80 dark:to-gray-900/80">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">{service.title}</h3>
          <span className="font-bold text-base ml-2 text-blue-600 dark:text-blue-400">{service.price?.toFixed(0)}{language === 'en' ? ' BGN' : 'лв'}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs text-gray-600 dark:text-gray-300">{service.duration}</span>
        </div>
        
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">
          {service.description}
        </p>
        
        {/* For packages, show included items */}
        {service.category === 'package' && service.includes && service.includes.length > 0 && (
          <div className="mt-2 mb-3">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
              {language === 'en' ? 'Includes:' : 'Включва:'}
            </p>
            <ul className="text-xs text-gray-600 dark:text-gray-300 list-disc pl-4 space-y-1">
              {service.includes.slice(0, 2).map((item, index) => (
                <li key={index} className="line-clamp-1">{item}</li>
              ))}
              {service.includes.length > 2 && (
                <li className="text-blue-600 dark:text-blue-400">
                  {language === 'en' ? `+${service.includes.length - 2} more` : `+${service.includes.length - 2} още`}
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-xs border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950/30 border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md"
            asChild
          >
            <Link href={`/services/${service.id}`}>
              <Eye className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Details' : 'Детайли'}
            </Link>
          </Button>
          
          <Button 
            size="sm"
            className="flex-1 h-9 text-xs bg-blue-600 hover:bg-blue-700 text-white border border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 rounded-md"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {language === 'en' ? 'Adding...' : 'Добавяне...'}
              </span>
            ) : (
              <>
                <ShoppingCart className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Book Now' : 'Запази сега'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 