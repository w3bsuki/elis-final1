import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ShoppingCart, Calendar, FileText, BookText, Download, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { shopBooks } from "@/lib/shop-data";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { Book } from "@/types";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;
  
  // Find the book with the matching ID
  useEffect(() => {
    if (id) {
      const foundBook = shopBooks.find(book => book.id === id);
      setBook(foundBook || null);
      setLoading(false);
    }
  }, [id]);

  // Handle back button click
  const handleBack = () => {
    router.push('/shop');
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (book) {
      addToCart({
        id: book.id,
        title: book.title,
        price: book.price || 0,
        image: book.coverImage || '',
        quantity: 1
      });
    }
  };
  
  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <BookOpen className="mx-auto h-12 w-12 animate-pulse text-gray-400" />
        <h2 className="mt-4 text-lg font-medium">{translate("Зареждане...", "Loading...")}</h2>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="mt-4 text-xl font-medium">{translate("Книгата не е намерена", "Book not found")}</h2>
        <p className="mt-2 text-gray-500">
          {translate("Книгата, която търсите, не съществува.", "The book you're looking for doesn't exist.")}
        </p>
        <Button className="mt-8" onClick={handleBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          {translate("Обратно към магазина", "Back to Shop")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{book.title} | {translate("Елис Авторска Страница", "Elis Author Page")}</title>
        <meta name="description" content={book.description} />
      </Head>
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Back to shop link */}
          <Button
            variant="ghost" 
            onClick={handleBack} 
            className="mb-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 group"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            {translate("Обратно към магазина", "Back to Shop")}
          </Button>
          
          {/* Main neumorphic container */}
          <div className="p-1 rounded-xl
            bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
            dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
            shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.9)]
            dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
            overflow-hidden">
            
            {/* Inner container with gradient and shadow effects */}
            <div className="bg-gradient-to-br from-gray-50/30 via-white/40 to-gray-50/30 dark:from-gray-900/20 dark:via-gray-900/20 dark:to-gray-900/20 p-6 md:p-8 rounded-xl relative">
              {/* Inner shadow effect */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column - Book Image */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden
                    bg-gradient-to-br from-gray-50 via-white to-gray-50 
                    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                    shadow-[4px_4px_8px_rgba(0,0,0,0.06),-4px_-4px_8px_rgba(255,255,255,0.8)]
                    dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(30,30,30,0.1)]
                    border border-gray-100/50 dark:border-gray-700/50">
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <BookOpen className="h-32 w-32 text-gray-400" />
                      </div>
                    )}
                    {book.featured && (
                      <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 shadow-lg">
                        {translate("Бестселър", "Bestseller")}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Right Column - Book Details */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">(16)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={toggleWishlist}
                      >
                        <Heart className={`h-5 w-5 transition-colors duration-300 ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
                        <span className="sr-only">{translate("Добави в любими", "Add to wishlist")}</span>
                      </Button>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{book.title}</h1>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {book.price?.toFixed(2)} лв.
                      </span>
                      {book.originalPrice && book.originalPrice > (book.price || 0) && (
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                          {book.originalPrice.toFixed(2)} лв.
                        </span>
                      )}
                      {book.originalPrice && book.originalPrice > (book.price || 0) && (
                        <Badge className="bg-green-500 text-white ml-2">
                          -{Math.round(((book.originalPrice - (book.price || 0)) / book.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                    
                    <Separator className="my-6 bg-gray-200/70 dark:bg-gray-700/70" />
                    
                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                      <p>{book.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700 dark:text-gray-300">
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{translate("Издадена", "Published")}: {new Date(book.publishDate || "").toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <FileText className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{translate("Страници", "Pages")}: {book.pages}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <BookText className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>ISBN: {book.isbn}</span>
                      </div>
                      
                      {book.digital && (
                        <div className="flex items-center text-sm">
                          <Download className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span>{translate("Налична е и дигитална версия", "Digital version available")}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        onClick={handleAddToCart} 
                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black
                          rounded-xl text-white py-6 h-auto shadow-[3px_3px_6px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.1)]
                          dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3),-2px_-2px_5px_rgba(60,60,60,0.1)]
                          transition-all duration-300 hover:shadow-[1px_1px_3px_rgba(0,0,0,0.2),-1px_-1px_2px_rgba(255,255,255,0.1)] group"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                        {translate("Добави в кошницата", "Add to Cart")}
                      </Button>
                      
                      {book.digital && (
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="flex-1 rounded-xl py-6 h-auto border-gray-300 dark:border-gray-700
                            bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                            shadow-[3px_3px_6px_rgba(0,0,0,0.05),-2px_-2px_5px_rgba(255,255,255,0.7)]
                            dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(30,30,30,0.1)]
                            transition-all duration-300 hover:shadow-[1px_1px_3px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.6)] group"
                          onClick={() => alert(translate("Дигиталната версия ще бъде налична скоро!", "Digital version coming soon!"))}
                        >
                          <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                          {translate("Купи дигитална версия", "Buy Digital Version")}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 