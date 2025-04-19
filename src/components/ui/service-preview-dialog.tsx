"use client";

import Image from "next/image";
import { Calendar, Clock, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";

interface ServicePreviewDialogProps {
  service: {
    id: string;
    title: string;
    description: string;
    duration?: string;
    price?: number;
    image?: string;
  } | null;
  isOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function ServicePreviewDialog({ service, isOpen, open, onClose, onOpenChange }: ServicePreviewDialogProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  
  // Handle both isOpen/onClose and open/onOpenChange prop patterns
  const isDialogOpen = isOpen !== undefined ? isOpen : open;
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else if (onClose && !newOpen) {
      onClose();
    }
  };

  // Handle booking appointment
  const handleBookAppointment = () => {
    // Close the dialog
    handleOpenChange(false);
    
    // If service exists, redirect to booking page with service ID
    if (service) {
      // Redirect to service booking page
      window.location.href = `/booking?service=${service.id}`;
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    // Close the dialog
    handleOpenChange(false);
    
    // If service exists, add to cart
    if (service) {
      // Add the service to cart using the CartContext
      addToCart(service);
    }
  };
  
  // If service is null, render nothing or a placeholder
  if (!service) {
    return (
      <Dialog open={!!isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-sm border-2 border-purple-600 dark:border-purple-700 p-0 overflow-hidden rounded-lg shadow-lg">
          <div className="p-6 bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {language === 'bg' ? 'Услуга не е избрана' : 'No service selected'}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 flex justify-end">
              <Button size="sm" onClick={() => handleOpenChange(false)}>
                {language === 'bg' ? 'Затвори' : 'Close'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={!!isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm border-2 border-purple-600 dark:border-purple-700 p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <AspectRatio ratio={16/9} className="w-full">
            <div className="relative h-full w-full">
              <Image
                src={service.image || "/images/services/default-service.jpg"}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button 
                onClick={() => handleOpenChange(false)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
              {service.price && (
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-medium px-2 py-0.5 rounded-md shadow-md">
                  {language === 'bg' ? `${service.price.toFixed(2)} лв.` : `$${service.price.toFixed(2)}`}
                </div>
              )}
            </div>
          </AspectRatio>
        </div>
        
        <div className="p-3 bg-white dark:bg-gray-900">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-base font-bold text-gray-900 dark:text-white">{service.title}</DialogTitle>
            <DialogDescription className="text-xs mt-1 text-gray-600 dark:text-gray-300 line-clamp-3">
              {service.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-2 flex items-center gap-2">
            {service.duration && (
              <Badge variant="outline" className="flex items-center gap-1 py-0 h-5 border-purple-200 text-purple-800 dark:border-purple-800 dark:text-purple-300">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{service.duration}</span>
              </Badge>
            )}
          </div>
          
          <div className="mt-3 flex justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs h-7 border-purple-400/70 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950/50"
              onClick={handleBookAppointment}
            >
              <Calendar className="mr-1.5 h-3 w-3" />
              {language === 'bg' ? 'Запази час' : 'Book'}
            </Button>
            <Button
              size="sm"
              className="flex-1 text-xs h-7 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-1.5 h-3 w-3" />
              {language === 'bg' ? 'Купи' : 'Buy'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 