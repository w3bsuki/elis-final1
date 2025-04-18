"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Service } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Sparkles, Clock, Package, CheckCircle2, ArrowRight, MessageSquare, Bookmark, CalendarClock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { ServiceDetailsDialog } from '@/components/ui/service-details-dialog';

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
      return {
        badge: 'from-violet-500/90 to-purple-500/90',
        border: 'border-violet-300/80',
        text: 'text-violet-700 dark:text-violet-400',
        button: 'from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600',
      };
    case 'package':
      return {
        badge: 'from-indigo-500/90 to-blue-500/90',
        border: 'border-indigo-300/80',
        text: 'text-indigo-700 dark:text-indigo-400',
        button: 'from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600',
      };
    default:
      return {
        badge: 'from-green-500/90 to-emerald-500/90',
        border: 'border-green-300/80',
        text: 'text-green-700 dark:text-green-400',
        button: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      };
  }
};

export function ServiceCard({ service, className, isBookmarked = false, onBookmarkToggle }: ServiceCardProps) {
  const { language } = useLanguage();
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  const { addBookmark, removeBookmark, bookmarks } = useBookmarks();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  
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
  
  // Translation helper
  const translate = useCallback((bg: string, en: string) => language === 'en' ? en : bg, [language]);
  
  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isInBookmarks) {
      removeBookmark(service.id);
      toast({
        title: translate("Премахнато от отметки", "Removed from bookmarks"),
        description: service.title,
      });
    } else {
      addBookmark(service);
      toast({
        title: translate("Добавено в отметки", "Added to bookmarks"),
        description: service.title,
      });
    }
    
    if (onBookmarkToggle) {
      onBookmarkToggle();
    }
  };
  
  // Handle opening service details dialog
  const handleServiceDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDialogOpen(true);
  };
  
  // Render category badge
  const renderBadge = () => {
    if (service.category === 'individual') {
      return (
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5",
          "rounded-full",
          `bg-gradient-to-r ${colors.badge}`,
          "text-white",
          colors.border,
          "shadow-sm text-[10px] font-semibold"
        )}>
          <Clock className="h-2.5 w-2.5" />
          <span>{translate("Индивидуална", "Individual")}</span>
        </div>
      );
    }
    
    if (service.category === 'package') {
      return (
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5",
          "rounded-full",
          `bg-gradient-to-r ${colors.badge}`,
          "text-white",
          colors.border,
          "shadow-sm text-[10px] font-semibold"
        )}>
          <Package className="h-2.5 w-2.5" />
          <span>{translate("Пакет", "Package")}</span>
        </div>
      );
    }
    
    if (service.featured) {
      return (
        <div className={cn(
          "flex items-center gap-1 px-2 py-0.5",
          "rounded-full",
          "bg-gradient-to-r from-amber-500/90 to-yellow-500/90",
          "text-white",
          "border border-amber-300/80",
          "shadow-sm text-[10px] font-semibold"
        )}>
          <Sparkles className="h-2.5 w-2.5" />
          <span>{translate("Популярна", "Featured")}</span>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <>
      <div 
        className={cn(
          "relative h-full rounded-lg overflow-hidden group",
          "bg-white dark:bg-gray-800",
          "border border-gray-200 dark:border-gray-700",
          "shadow-md hover:shadow-lg",
          "transition-all duration-300 hover:-translate-y-1",
          "cursor-pointer",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleServiceDetails}
      >
        {/* Image section */}
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={service.coverImage || fallbackImage}
            alt={service.title}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            priority={service.featured}
          />
          
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
              <MessageSquare className="h-10 w-10 text-gray-300 dark:text-gray-600" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          {/* Bookmark button */}
          <button
            className={cn(
              "absolute top-2 right-2 z-20 h-7 w-7 rounded-full flex items-center justify-center",
              "bg-white/80 backdrop-blur-sm dark:bg-gray-800/80",
              "border border-gray-200 dark:border-gray-700",
              "text-gray-600 dark:text-gray-300",
              "hover:text-amber-500 dark:hover:text-amber-400",
              "transition-opacity duration-200",
              isHovered || isInBookmarks ? "opacity-100" : "opacity-0",
              isInBookmarks && "text-amber-500 dark:text-amber-400"
            )}
            onClick={handleBookmarkToggle}
            aria-label={isInBookmarks ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <Bookmark className="h-3.5 w-3.5" />
          </button>
          
          {/* Category badge */}
          <div className="absolute top-2 left-2 z-10">
            {renderBadge()}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{service.title}</h3>
          
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {formattedPrice || translate("По заявка", "On request")}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <CalendarClock className="h-3.5 w-3.5" />
              <span>{service.duration || "60"} {translate("мин.", "min")}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {service.description}
          </p>
          
          {/* Service benefits preview */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="mb-4">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {service.benefits[0]}
                </span>
              </div>
              {service.benefits.length > 1 && (
                <div className="flex items-start gap-1.5 mt-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {service.benefits[1]}
                  </span>
                </div>
              )}
            </div>
          )}
          
          {/* Details button */}
          <button
            onClick={handleServiceDetails}
            className={cn(
              "w-full mt-auto py-2 px-3 rounded-md bg-gradient-to-r",
              `${colors.button}`,
              "text-white text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md",
              "flex items-center justify-center gap-1.5"
            )}
          >
            <span>{translate("Детайли", "Details")}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Service details dialog */}
      <ServiceDetailsDialog
        service={service}
        translate={translate}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
} 