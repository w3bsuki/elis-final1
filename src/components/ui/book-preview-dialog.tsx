"use client";

import Image from "next/image";
import { Info, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

interface BookPreviewDialogProps {
  book: {
    id?: string;
    title?: string;
    author?: string;
    description?: string;
    category?: string;
    price?: number;
    image?: string;
  } | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BookPreviewDialog({ book, open, onOpenChange }: BookPreviewDialogProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    // Close the dialog
    onOpenChange?.(false);
    
    // If book exists and has ID, add to cart
    if (book && book.id) {
      // Add the book to cart using the CartContext
      addToCart(book);
    }
  };

  const handleBookDetails = () => {
    // Close the dialog
    onOpenChange?.(false);
    
    // Navigate to the product page if the book has an ID
    if (book && book.id) {
      router.push(`/shop/${book.id}`);
    }
  };
  
  if (!book) {
    return null;
  }

  // Map category to language-specific display
  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, { en: string; bg: string }> = {
      "fiction": { en: "Fiction", bg: "Художествена литература" },
      "non-fiction": { en: "Non-Fiction", bg: "Научна литература" },
      "self-help": { en: "Self-Help", bg: "Самопомощ" },
      "biography": { en: "Biography", bg: "Биография" },
      "children": { en: "Children", bg: "Детска литература" },
      "history": { en: "History", bg: "История" },
      "business": { en: "Business", bg: "Бизнес" },
      "science": { en: "Science", bg: "Наука" },
      "cooking": { en: "Cooking", bg: "Готварство" },
      "art": { en: "Art", bg: "Изкуство" },
      "poetry": { en: "Poetry", bg: "Поезия" },
      // Add more categories as needed
    };

    const mappedCategory = categoryMap[category?.toLowerCase()];
    return mappedCategory ? mappedCategory[language] : category;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-xl border-2 border-yellow-500/60 dark:border-yellow-700/60">
        <div className="relative">
          <div className="relative h-[200px] w-full">
            <Image
              src={book.image || "/images/books/default-book.jpg"}
              alt={book.title || "Book cover"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <button 
              onClick={() => onOpenChange?.(false)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
            {book.price && (
              <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                {language === 'bg' ? `${book.price.toFixed(2)} лв.` : `$${book.price.toFixed(2)}`}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <DialogHeader className="space-y-1 mb-2">
            <DialogTitle className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
              {book.title || "Unknown Title"}
            </DialogTitle>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              <span>{book.author || "Unknown Author"}</span>
              {book.category && (
                <>
                  <span className="mx-1.5">•</span>
                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400">
                    {getCategoryLabel(book.category)}
                  </Badge>
                </>
              )}
            </div>
          </DialogHeader>
          
          <DialogDescription className="text-xs mt-2 text-gray-700 dark:text-gray-300 line-clamp-4">
            {book.description || "No description available."}
          </DialogDescription>
          
          <div className="mt-4 flex justify-between gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs h-7 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={handleBookDetails}
            >
              <Info className="mr-1.5 h-3 w-3" />
              {language === 'bg' ? 'Детайли' : 'Details'}
            </Button>
            <Button
              size="sm"
              className="flex-1 text-xs h-7 bg-yellow-500 hover:bg-yellow-600 text-black"
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