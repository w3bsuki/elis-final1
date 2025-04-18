"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Service } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Sparkles, Eye, Clock, Package, CheckCircle2, ArrowRight, MessageSquare, ArrowUpRight, Bookmark, CheckCircle, ClockIcon, Flower, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useTranslate } from '@/hooks/use-translate';

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
  onClick?: (service: Service) => void;
  hideActions?: boolean;
}

// Helper function to get color scheme based on category
const getCategoryColor = (category: string | undefined) => {
  switch (category) {
    case 'individual':
      return {
        badge: 'bg-violet-500 hover:bg-violet-600 text-white',
        outline: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800',
        border: 'border-violet-400 dark:border-violet-600',
        hover: 'hover:border-violet-500 dark:hover:border-violet-400',
        glow: 'bg-violet-500/10',
        text: 'text-violet-700 dark:text-violet-400',
        button: 'bg-violet-600 hover:bg-violet-700',
        outlineButton: 'border-violet-200 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-300 dark:border-violet-900 dark:hover:bg-violet-900/20 dark:hover:text-violet-400'
      };
    case 'package':
      return {
        badge: 'bg-purple-500 hover:bg-purple-600 text-white',
        outline: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
        border: 'border-purple-400 dark:border-purple-600',
        hover: 'hover:border-purple-500 dark:hover:border-purple-400',
        glow: 'bg-purple-500/10',
        text: 'text-purple-700 dark:text-purple-400',
        button: 'bg-purple-600 hover:bg-purple-700',
        outlineButton: 'border-purple-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 dark:border-purple-900 dark:hover:bg-purple-900/20 dark:hover:text-purple-400'
      };
    default:
      return {
        badge: 'bg-green-500 hover:bg-green-600 text-white',
        outline: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
        border: 'border-green-400 dark:border-green-600',
        hover: 'hover:border-green-500 dark:hover:border-green-400',
        glow: 'bg-green-500/10',
        text: 'text-green-700 dark:text-green-400',
        button: 'bg-green-600 hover:bg-green-700',
        outlineButton: 'border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:border-green-900 dark:hover:bg-green-900/20 dark:hover:text-green-400'
      };
  }
};

export function ServiceCard({ service, className, isBookmarked = false, onBookmarkToggle, onClick, hideActions = false }: ServiceCardProps) {
  const { language, translations } = useLanguage();
  const { addToCart, items } = useCart();
  const { t, locale } = useTranslate();
  const { toast } = useToast();
  const pathname = usePathname();
  const { addBookmark, removeBookmark, bookmarks } = useBookmarks();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get category colors
  const colors = getCategoryColor(service.category);
  
  // Fallback image
  const fallbackImage = "/images/services/coaching.jpg";
  
  // Format the price with currency based on language
  const formattedPrice = service.price ? `${service.price.toFixed(0)} ${language === 'en' ? 'BGN' : 'лв.'}` : '';
  
  // Check if the service is bookmarked
  const isInBookmarks = bookmarks?.some((bookmark) => bookmark.id === service.id) || isBookmarked;

  // Check if the service is in the cart
  const isInCart = items?.some((item) => item.id === service.id) || false;
  
  // Handle add to cart button click
  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      addToCart(service, 1);
      toast({
        title: t("addedToCart"),
        description: service.title,
      });
    } catch (error) {
      toast({
        title: t("errorAddingToCart"),
        description: t("tryAgainLater"),
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  // Handle card click
  const handleCardClick = () => {
    if (onClick) {
      onClick(service);
    }
  };
  
  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    if (isInBookmarks) {
      removeBookmark(service.id);
      toast({
        title: t("removedFromBookmarks"),
        description: service.title,
      });
    } else {
      addBookmark(service);
      toast({
        title: t("addedToBookmarks"),
        description: service.title,
      });
    }
  };
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col h-full rounded-lg overflow-hidden bg-white dark:bg-gray-900",
        "border border-gray-200 dark:border-gray-800 transition-all duration-300",
        `hover:shadow-lg hover:border-${service.category ? service.category.toLowerCase() : 'emerald'}-500 dark:hover:border-${service.category ? service.category.toLowerCase() : 'emerald'}-400`,
        "hover:translate-y-[-3px]",
        "cursor-pointer",
        className
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Custom glow effect based on category */}
      <div className={cn(
        "absolute inset-0 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-300",
        colors.glow
      )}></div>
      
      {/* Service image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={service.coverImage || fallbackImage}
          alt={service.title}
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
          priority={service.featured}
        />
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
            <MessageSquare className="h-10 w-10 text-gray-300 dark:text-gray-600" />
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <MessageSquare className="h-10 w-10 text-gray-400" />
          </div>
        )}
        
        {/* Bookmark button */}
        <button
          className={cn(
            "absolute top-1 right-1 z-10 h-5 w-5 rounded-full flex items-center justify-center",
            "bg-white/80 backdrop-blur-sm dark:bg-gray-800/80",
            "border border-gray-200 dark:border-gray-700",
            "text-gray-600 dark:text-gray-300",
            "hover:text-amber-500 dark:hover:text-amber-400",
            "transition-opacity duration-200",
            isHovered || isInBookmarks ? "opacity-100" : "opacity-0",
            isInBookmarks && "text-amber-500 dark:text-amber-400"
          )}
          onClick={handleBookmarkToggle}
          aria-label={isInBookmarks ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="h-2.5 w-2.5" />
        </button>
        
        {/* Category badge */}
        {service.category && (
          <div className="absolute top-1 left-1">
            <Badge className={cn(
              "border-0 rounded-sm px-1 py-0 text-[8px] font-medium flex items-center gap-0.5",
              colors.badge
            )}>
              {service.category === 'individual' ? (
                <>
                  <Clock className="h-2 w-2 mr-0.5" />
                  {language === 'en' ? 'Individual' : 'Индивидуална'}
                </>
              ) : (
                <>
                  <Package className="h-2 w-2 mr-0.5" />
                  {language === 'en' ? 'Package' : 'Пакет'}
                </>
              )}
            </Badge>
          </div>
        )}
        
        {/* Featured badge */}
        {service.featured && (
          <div className="absolute bottom-1 left-1">
            <Badge className="bg-amber-400 text-amber-950 border-0 hover:bg-amber-500 rounded-sm px-1 py-0 text-[8px] font-medium flex items-center gap-0.5">
              <Sparkles className="h-2 w-2 mr-0.5" />
              {language === 'en' ? 'Featured' : 'Препоръчана'}
            </Badge>
          </div>
        )}
        
        {/* Duration badge */}
        <div className="absolute bottom-1 right-1">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 rounded-sm px-1 py-0 text-[8px] font-medium flex items-center gap-0.5">
            <Clock className="h-2 w-2 mr-0.5" />
            {service.duration}
          </Badge>
        </div>
      </div>
      
      {/* Service details */}
      <div className="p-2 flex flex-col flex-grow">
        {/* Title */}
        <h3 className={cn(
          "font-semibold text-sm text-gray-900 dark:text-white mb-0.5 line-clamp-2 tracking-tight leading-snug transition-colors", 
          "group-hover:" + colors.text
        )}>
          {service.title}
        </h3>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-baseline gap-1">
            <span className={cn("font-medium text-sm", colors.text)}>
              {formattedPrice}
            </span>
            {service.originalPrice && service.originalPrice > service.price && (
              <span className="text-[8px] line-through text-gray-500 dark:text-gray-400">
                {service.originalPrice.toFixed(0)} {language === 'en' ? 'BGN' : 'лв.'}
              </span>
            )}
          </div>
        </div>
        
        {/* Service description */}
        <p className="text-[10px] text-gray-600 dark:text-gray-400 mb-1 line-clamp-2 flex-grow">
          {service.description}
        </p>
        
        {/* For packages, show included items */}
        {service.category === 'package' && service.includes && service.includes.length > 0 && (
          <div className="mb-1 bg-gray-50 dark:bg-gray-800/50 rounded-md p-1">
            <p className="text-[8px] font-medium text-gray-700 dark:text-gray-300 mb-0.5">
              {language === 'en' ? 'Includes:' : 'Включва:'}
            </p>
            <ul className="text-[8px] text-gray-600 dark:text-gray-400 list-disc pl-3 space-y-0.5">
              {service.includes.slice(0, 2).map((item, index) => (
                <li key={index} className="line-clamp-1">{item}</li>
              ))}
              {service.includes.length > 2 && (
                <li className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:underline cursor-pointer">
                  {language === 'en' ? `+${service.includes.length - 2} more` : `+${service.includes.length - 2} още`}
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Action buttons */}
        {!hideActions && (
          <div className="mt-auto flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className={`flex-1 h-6 text-[10px] rounded-md border-${service.category ? service.category.toLowerCase() : 'emerald'}-200 hover:bg-${service.category ? service.category.toLowerCase() : 'emerald'}-50 hover:text-${service.category ? service.category.toLowerCase() : 'emerald'}-700 hover:border-${service.category ? service.category.toLowerCase() : 'emerald'}-300 dark:border-${service.category ? service.category.toLowerCase() : 'emerald'}-900 dark:hover:bg-${service.category ? service.category.toLowerCase() : 'emerald'}-900/20 dark:hover:text-${service.category ? service.category.toLowerCase() : 'emerald'}-400`}
              asChild
            >
              <Link href={`/services/${service.id}`}>
                <span className="flex items-center gap-1">
                  {language === 'en' ? 'Details' : 'Детайли'}
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </span>
              </Link>
            </Button>
            
            {/* Preview button */}
            {service.previewUrl && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 h-6 text-[10px] text-gray-600 dark:text-gray-400",
                  colors.hoverBg,
                  colors.hoverText
                )}
                asChild
              >
                <Link href={service.previewUrl} target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center justify-center">
                    <Eye className="h-2.5 w-2.5 mr-1" />
                    {language === 'en' ? 'Preview' : 'Преглед'}
                  </span>
                </Link>
              </Button>
            )}

            <Button
              size="sm"
              className={`flex-1 h-6 text-[10px] rounded-md ${colors.bg} ${colors.hover} text-white`}
              onClick={handleAddToCart}
              disabled={isInCart || isAddingToCart}
            >
              {isAddingToCart ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-1 h-2.5 w-2.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'en' ? 'Adding...' : 'Добавяне...'}
                </span>
              ) : isInCart ? (
                <>
                  <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                  {language === 'en' ? 'In Cart' : 'В кошницата'}
                </>
              ) : (
                <>
                  <ShoppingCart className="h-2.5 w-2.5 mr-1" />
                  {language === 'en' ? 'Book Now' : 'Запази'}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 