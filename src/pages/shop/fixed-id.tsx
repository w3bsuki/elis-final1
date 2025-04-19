import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ShoppingCart, Calendar, FileText, BookText, Download, Star, Heart, Sparkles, User, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { shopBooks } from "@/lib/shop-data";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { Book } from "@/types";
import { motion } from "framer-motion";

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
      
      <main className="pt-12 pb-6 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen relative">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
          
          {/* Decorative blobs */}
          <div className="absolute top-40 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 via-purple-300/5 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-0 w-72 h-72 bg-gradient-to-tr from-green-400/10 via-blue-300/5 to-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back to shop link */}
          <Button
            variant="ghost" 
            onClick={handleBack} 
            className="mb-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 group"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            {translate("Обратно към магазина", "Back to Shop")}
          </Button>
          
          {/* Book details content would go here */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p>{book.description}</p>
            <Button className="mt-4" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {translate("Добави в кошницата", "Add to Cart")}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
} 