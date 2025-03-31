"use client";

import Image from "next/image";
import { BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from "@/lib/LanguageContext";

interface BookPreviewDialogProps {
  book: {
    id: string;
    title: string;
    description: string;
    category?: string;
    price?: number;
    image?: string;
    coverImage?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookPreviewDialog({ book, open, onOpenChange }: BookPreviewDialogProps) {
  const { language } = useLanguage();
  
  if (!book) {
    return null;
  }
  
  // Ensure all book properties have fallbacks
  const safeBook = {
    id: book.id || '',
    title: book.title || 'Book Title',
    description: book.description || 'No description available',
    category: book.category || '',
    price: book.price || 0,
    // Use coverImage as fallback for image, or default to fallback image
    image: book.image || book.coverImage || "/images/books/vdahnovenia-kniga-1.png",
  };
  
  // Translate category if needed
  const getCategory = () => {
    if (!safeBook.category) return "";
    
    if (language === 'bg') {
      return safeBook.category === 'health' ? 'Здраве' 
        : safeBook.category === 'poetry' ? 'Поезия' 
        : safeBook.category === 'selfHelp' ? 'Самопомощ'
        : safeBook.category;
    }
    
    return safeBook.category.charAt(0).toUpperCase() + safeBook.category.slice(1);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-green-600 dark:border-green-700 p-0 overflow-hidden rounded-lg shadow-lg">
        <div className="relative">
          <AspectRatio ratio={16/9} className="w-full">
            <div className="relative h-full w-full">
              <Image
                src={safeBook.image}
                alt={safeBook.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <button 
                onClick={() => onOpenChange(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
              {safeBook.category && (
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-md">
                  {getCategory()}
                </div>
              )}
            </div>
          </AspectRatio>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">{safeBook.title}</DialogTitle>
            <DialogDescription className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              {safeBook.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 flex justify-between items-center">
            {safeBook.price > 0 && (
              <div className="font-bold text-lg text-green-700 dark:text-green-400">
                {language === 'bg' ? `${safeBook.price.toFixed(2)} лв.` : `$${safeBook.price.toFixed(2)}`}
              </div>
            )}
            <Button className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200 rounded-md hover:translate-y-[-2px]">
              <BookOpen className="mr-2 h-4 w-4" />
              {language === 'bg' ? 'Прочетете повече' : 'Read More'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 