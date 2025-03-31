import { useState, useMemo } from "react";
import Head from "next/head";
import { ShopBanner } from "@/components/ui/shop-banner";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { ShopFilters } from "@/components/ui/shop-filters";
import { shopBooks } from "@/lib/shop-data";
import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ShoppingCart, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { Book, Service } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShopPage() {
  const { language, translations } = useLanguage();
  const { addToCart } = useCart();
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("newest");
  const [activeTab, setActiveTab] = useState("books");
  const [activeFilters, setActiveFilters] = useState({
    featured: false,
    newReleases: false,
    bestsellers: false,
    digital: false,
    individual: false,
    package: false
  });

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    // Start with all books
    let result = [...shopBooks];
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        book => book.title.toLowerCase().includes(lowerSearchTerm) || 
                book.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply category filters
    if (activeFilters.featured) {
      result = result.filter(book => book.featured);
    }
    
    if (activeFilters.newReleases) {
      // Filter books published in the last 3 months
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      result = result.filter(book => {
        const publishDate = new Date(book.publishDate || "");
        return publishDate > threeMonthsAgo;
      });
    }
    
    if (activeFilters.bestsellers) {
      result = result.filter(book => book.featured);
    }
    
    if (activeFilters.digital) {
      result = result.filter(book => book.digital);
    }
    
    // Apply sorting
    switch (activeSort) {
      case "newest":
        result.sort((a, b) => {
          const dateA = new Date(a.publishDate || "").getTime();
          const dateB = new Date(b.publishDate || "").getTime();
          return dateB - dateA;
        });
        break;
      case "oldest":
        result.sort((a, b) => {
          const dateA = new Date(a.publishDate || "").getTime();
          const dateB = new Date(b.publishDate || "").getTime();
          return dateA - dateB;
        });
        break;
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
    }
    
    return result;
  }, [shopBooks, searchTerm, activeSort, activeFilters]);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let result = [...services];
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        service => service.title.toLowerCase().includes(lowerSearchTerm) || 
                  service.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply category filters
    if (activeFilters.individual) {
      result = result.filter(service => service.category === 'individual');
    }
    
    if (activeFilters.package) {
      result = result.filter(service => service.category === 'package');
    }
    
    if (activeFilters.featured) {
      result = result.filter(service => service.featured);
    }
    
    // Apply sorting
    switch (activeSort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        // For other sorts, keep featured items first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    return result;
  }, [services, searchTerm, activeSort, activeFilters]);

  // Handle filter changes
  const handleFilterChange = (filter: string, value: boolean) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  // Handle sort changes
  const handleSortChange = (sort: string) => {
    setActiveSort(sort);
  };

  // Handle search changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <Head>
        <title>{translate("Магазин", "Shop")} | {translate("Елис Авторска Страница", "Elis Author Page")}</title>
        <meta name="description" content={translate("Разгледайте книги и услуги от Елис", "Browse books and services by Elis")} />
      </Head>
      
      <div className="container mx-auto px-4 py-8">
        {/* Shop Banner */}
        <ShopBanner />
        
        {/* Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="books" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-1.5 rounded-full border-2 border-black dark:border-gray-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                <TabsTrigger 
                  value="books" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {translate("Книги", "Books")}
                </TabsTrigger>
                <TabsTrigger 
                  value="services" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:data-[state=active]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] data-[state=active]:border-2 data-[state=active]:border-black dark:data-[state=active]:border-gray-700 transition-all duration-200 font-medium"
                >
                  <Package className="h-4 w-4 mr-2" />
                  {translate("Услуги", "Services")}
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Filters and Search */}
            <div className="mt-8">
              <ShopFilters
                onSearch={handleSearch}
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
                activeSort={activeSort}
                activeFilters={activeFilters}
                searchTerm={searchTerm}
                showServiceFilters={activeTab === "services"}
              />
            </div>

            {/* Books Content */}
            <TabsContent value="books">
              <div className="mt-8">
                {filteredBooks.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">{translate("Няма намерени книги", "No books found")}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {translate("Опитайте да промените критериите за търсене", "Try adjusting your search or filter criteria")}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                      <div key={book.id} className="group relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
                        {book.featured && (
                          <Badge className="absolute top-2 right-2 z-10 bg-yellow-400 text-black">
                            {translate("Бестселър", "Bestseller")}
                          </Badge>
                        )}
                        
                        <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                          {book.coverImage ? (
                            <Image
                              src={book.coverImage}
                              alt={book.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <BookOpen className="h-16 w-16 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-bold line-clamp-1">{book.title}</h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {book.description}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-bold text-green-600 dark:text-green-400">
                              {book.price?.toFixed(2)} лв.
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <Link href={`/shop/${book.id}`}>
                                  {translate("Детайли", "Details")}
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => addToCart({
                                  id: book.id,
                                  title: book.title,
                                  price: book.price || 0,
                                  image: book.coverImage || '',
                                  quantity: 1
                                })}
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                {translate("Купи", "Buy")}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Services Content */}
            <TabsContent value="services">
              <div className="mt-8">
                {filteredServices.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">{translate("Няма намерени услуги", "No services found")}</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {translate("Опитайте да промените критериите за търсене", "Try adjusting your search or filter criteria")}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredServices.map((service) => (
                      <div key={service.id} className="group relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
                        {service.featured && (
                          <Badge className="absolute top-2 right-2 z-10 bg-yellow-400 text-black">
                            {translate("Популярна", "Popular")}
                          </Badge>
                        )}
                        
                        <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                          {service.coverImage ? (
                            <Image
                              src={service.coverImage}
                              alt={service.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Package className="h-16 w-16 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">
                              {service.category === 'individual' 
                                ? translate("Индивидуална", "Individual")
                                : translate("Пакет", "Package")}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {service.duration}
                            </Badge>
                          </div>
                          
                          <h3 className="font-bold line-clamp-1">{service.title}</h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {service.description}
                          </p>
                          
                          {service.includes && (
                            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              {service.includes.slice(0, 2).map((item, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <span className="text-green-500">✓</span>
                                  <span className="line-clamp-1">{item}</span>
                                </li>
                              ))}
                              {service.includes.length > 2 && (
                                <li className="text-sm text-gray-500">
                                  +{service.includes.length - 2} {translate("още", "more")}
                                </li>
                              )}
                            </ul>
                          )}
                          
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-bold text-green-600 dark:text-green-400">
                              {service.price.toFixed(2)} лв.
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <Link href={`/shop/services/${service.id}`}>
                                  {translate("Детайли", "Details")}
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => addToCart({
                                  id: service.id,
                                  title: service.title,
                                  price: service.price,
                                  image: service.coverImage,
                                  quantity: 1,
                                  type: 'service'
                                })}
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                {translate("Купи", "Buy")}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
} 