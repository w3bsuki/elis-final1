import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, ChevronLeft, ShoppingCart, Calendar, FileText, BookText, Download } from "lucide-react";
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Back to shop link */}
        <Button
          variant="ghost" 
          onClick={handleBack} 
          className="mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          {translate("Обратно към магазина", "Back to Shop")}
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Book Image */}
          <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-32 w-32 text-gray-400" />
              </div>
            )}
            {book.featured && (
              <Badge className="absolute top-4 right-4 z-10 bg-yellow-400 text-black px-2 py-1">
                {translate("Бестселър", "Bestseller")}
              </Badge>
            )}
          </div>
          
          {/* Right Column - Book Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold">{book.title}</h1>
            
            <div className="mt-4 text-lg font-bold text-green-600 dark:text-green-400">
              {book.price?.toFixed(2)} лв.
            </div>
            
            <Separator className="my-6" />
            
            <div className="prose dark:prose-invert max-w-none">
              <p>{book.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{translate("Издадена", "Published")}: {new Date(book.publishDate || "").toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FileText className="mr-2 h-4 w-4" />
                <span>{translate("Страници", "Pages")}: {book.pages}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <BookText className="mr-2 h-4 w-4" />
                <span>ISBN: {book.isbn}</span>
              </div>
              
              {book.digital && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Download className="mr-2 h-4 w-4" />
                  <span>{translate("Налична е и дигитална версия", "Digital version available")}</span>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                {translate("Добави в кошницата", "Add to Cart")}
              </Button>
              
              {book.digital && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => alert(translate("Дигиталната версия ще бъде налична скоро!", "Digital version coming soon!"))}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {translate("Купи дигитална версия", "Buy Digital Version")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 