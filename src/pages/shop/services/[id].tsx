import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ShoppingCart, Clock, FileText, Tag, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { services } from "@/data/services";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { Service } from "@/types";
import { shopBooks } from "@/lib/shop-data";

export default function ServicePage() {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBook, setRelatedBook] = useState<any | null>(null);
  
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;
  
  // Find the service with the matching ID
  useEffect(() => {
    if (id) {
      const foundService = services.find(service => service.id === id);
      setService(foundService || null);
      
      // If service has a related book, find it
      if (foundService?.relatedBookId) {
        const book = shopBooks.find(book => book.id === foundService.relatedBookId);
        setRelatedBook(book || null);
      }
      
      setLoading(false);
    }
  }, [id]);

  // Handle back button click
  const handleBack = () => {
    router.push('/shop');
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (service) {
      addToCart({
        id: service.id,
        title: service.title,
        price: service.price,
        image: service.coverImage || service.image,
        type: 'service',
        duration: service.duration,
        category: service.category
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Clock className="mx-auto h-12 w-12 animate-pulse text-gray-400" />
        <h2 className="mt-4 text-lg font-medium">{translate("Зареждане...", "Loading...")}</h2>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">{translate("Услугата не е намерена", "Service not found")}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {translate("Съжаляваме, но тази услуга не съществува или е премахната.", 
                    "Sorry, but this service doesn't exist or has been removed.")}
        </p>
        <Button onClick={handleBack} className="mt-6">
          {translate("Обратно към магазина", "Back to shop")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} | Elis Books</title>
        <meta name="description" content={service.description} />
      </Head>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            {translate("Всички услуги", "All Services")}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Image section */}
          <div className="flex flex-col">
            <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 relative">
              <Image
                src={service.coverImage || service.image || "/images/placeholder-service.jpg"}
                alt={service.title}
                fill
                className="object-cover"
              />
              
              {/* Category Badge */}
              <Badge className="absolute top-4 left-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-none">
                {service.category === 'individual' 
                  ? translate("Индивидуална Услуга", "Individual Service")
                  : translate("Пакетна Услуга", "Package Service")
                }
              </Badge>
              
              {/* Featured Badge */}
              {service.featured && (
                <div className="absolute bottom-4 right-4">
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 flex items-center gap-1 py-2">
                    <span className="sr-only">Featured</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {translate("Препоръчана Услуга", "Featured Service")}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Content section */}
          <div>
            <h1 className="text-3xl font-bold">{service.title}</h1>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center text-green-600 dark:text-green-400">
                <span className="text-2xl font-bold">{service.price.toFixed(2)} лв.</span>
              </div>
              
              {service.popular && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-none">
                  {translate("Популярна", "Popular")}
                </Badge>
              )}
              
              {service.mvp && (
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-none">
                  {translate("Топ Предложение", "Top Choice")}
                </Badge>
              )}
            </div>

            <div className="mt-6 flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="mr-2 h-5 w-5" />
              <span>{translate("Продължителност:", "Duration:")} {service.duration}</span>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">{translate("Описание", "Description")}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
            </div>

            {service.includes && service.includes.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold">{translate("Какво включва", "What's Included")}</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  {service.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {relatedBook && (
              <div className="mb-6 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50/50 dark:bg-green-900/10">
                <h3 className="mb-3 text-lg font-semibold flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  {translate("Свързана книга", "Related Book")}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-12 relative flex-shrink-0">
                    <Image 
                      src={relatedBook.coverImage || "/images/placeholder-book.jpg"}
                      alt={relatedBook.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{relatedBook.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{relatedBook.price?.toFixed(2)} лв.</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={`/shop/${relatedBook.id}`} className="flex items-center gap-1">
                      {translate("Виж", "View")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {translate("Добави в кошницата", "Add to Cart")}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
              >
                {translate("Продължи пазаруването", "Continue Shopping")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 