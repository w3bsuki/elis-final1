import { useState, useMemo } from "react";
import Head from "next/head";
import { ShopBanner } from "@/components/ui/shop-banner";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { ShopFilters } from "@/components/ui/shop-filters";
import { shopBooks } from "@/lib/shop-data";
import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ShoppingCart, Clock, Package, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { Book, Service } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";

export default function ShopPage() {
  const { language, translations } = useLanguage();
  const { addToCart } = useCart();
  const translate = (bg: string, en: string) => language === "bg" ? bg : en;
  const currentYear = new Date().getFullYear();
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
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
      
      <main className="flex flex-col min-h-screen pt-24 pb-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
        </div>
        
        <div className={`${CONTAINER_WIDTH_CLASSES} flex-1 flex flex-col`}>
          {/* Main content area */}
          <div className="flex-1">
            {/* Main neumorphic container with shadow and gradient effects */}
            <div className="p-1 rounded-xl
              bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-50/80 
              dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
              shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
              dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
              overflow-hidden">
              
              {/* Inner container with gradient and shadow effects */}
              <div className="bg-gradient-to-br from-gray-50/30 via-white/40 to-gray-50/30 dark:from-gray-900/20 dark:via-gray-900/20 dark:to-gray-900/20 p-5 rounded-xl relative
                max-h-[calc(100vh-180px)] overflow-y-auto">
                {/* Inner shadow effect */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Shop Banner */}
                  <ShopBanner />
                  
                  {/* Tabs */}
                  <div className="mt-6">
                    <Tabs defaultValue="books" className="w-full" onValueChange={setActiveTab}>
                      <div className="flex justify-center mb-8">
                        <TabsList className="bg-gradient-to-r from-gray-50/80 via-white/90 to-gray-50/80 
                          dark:from-gray-800/50 dark:via-gray-900/60 dark:to-gray-800/50 
                          p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/40 
                          shadow-[3px_3px_6px_rgba(0,0,0,0.06),-3px_-3px_6px_rgba(255,255,255,0.8)] 
                          dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]">
                          <TabsTrigger 
                            value="books" 
                            className="relative rounded-full px-5 py-2.5 
                              data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 
                              data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                              dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                              transition-all duration-300 font-medium group"
                          >
                            {/* Creating the animation glow effect for active tab */}
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                            
                            <span className="relative flex items-center justify-center gap-2">
                              <BookOpen className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                              {translate("Книги", "Books")}
                            </span>
                          </TabsTrigger>
                          <TabsTrigger 
                            value="services" 
                            className="relative rounded-full px-5 py-2.5 
                              data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 
                              data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                              dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                              transition-all duration-300 font-medium group"
                          >
                            {/* Creating the animation glow effect for active tab */}
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                            
                            <span className="relative flex items-center justify-center gap-2">
                              <Package className="h-4 w-4 transition-transform duration-300 group-data-[state=active]:scale-110" />
                              {translate("Услуги", "Services")}
                            </span>
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      
                      {/* Filters and Search */}
                      <div className="mt-4">
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
                        <div className="mt-6">
                          {filteredBooks.length === 0 ? (
                            <div className="text-center py-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-inner">
                              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-4 text-lg font-medium">{translate("Няма намерени книги", "No books found")}</h3>
                              <p className="mt-2 text-sm text-gray-500">
                                {translate("Опитайте да промените критериите за търсене", "Try adjusting your search or filter criteria")}
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {filteredBooks.map((book) => (
                                <div 
                                  key={book.id} 
                                  className="group relative flex flex-col h-full rounded-xl overflow-hidden 
                                    bg-gradient-to-br from-gray-50 via-white to-gray-50 
                                    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                                    border border-gray-100/70 dark:border-gray-700/70
                                    shadow-[5px_5px_10px_rgba(0,0,0,0.06),-5px_-5px_10px_rgba(255,255,255,0.8)]
                                    dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(30,30,30,0.2)]
                                    transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.7)]
                                    dark:hover:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]"
                                >
                                  {/* Inner glow effect */}
                                  <div className="absolute inset-1 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-inner pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  
                                  {book.featured && (
                                    <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-white border-amber-300 shadow-md transition-transform duration-300 group-hover:transform group-hover:scale-110 group-hover:-rotate-3">
                                      {translate("Бестселър", "Bestseller")}
                                    </Badge>
                                  )}
                                  
                                  <div className="relative h-52 overflow-hidden">
                                    {book.coverImage ? (
                                      <div className="absolute inset-0">
                                        <Image
                                          src={book.coverImage}
                                          alt={book.title}
                                          fill
                                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                        {/* Image overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      </div>
                                    ) : (
                                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                        <BookOpen className="h-16 w-16 text-gray-400 transition-transform duration-300 group-hover:scale-110" />
                                      </div>
                                    )}
                                    {/* Soft inner shadow overlay */}
                                    <div className="absolute inset-0 shadow-[inset_0px_-3px_7px_rgba(0,0,0,0.1)] dark:shadow-[inset_0px_-3px_7px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                                  </div>
                                  
                                  <div className="relative flex flex-col flex-grow p-5 z-10">
                                    {book.digital && (
                                      <Badge variant="outline" className="self-start mb-2 text-xs bg-gray-50/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-300/50 dark:border-gray-600/50">
                                        {translate("Дигитално", "Digital")}
                                      </Badge>
                                    )}
                                    
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">{book.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                                      {book.description}
                                    </p>
                                    
                                    <div className="mt-auto pt-3 border-t border-gray-200/70 dark:border-gray-700/70 flex items-center justify-between">
                                      <span className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                                        {book.price?.toFixed(2)} лв.
                                      </span>
                                      <div className="flex space-x-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="rounded-lg h-9 text-xs shadow-sm hover:shadow-inner group/btn transition-all duration-200"
                                          asChild
                                        >
                                          <Link href={`/shop/${book.id}`}>
                                            <span className="relative">{translate("Детайли", "Details")}</span>
                                          </Link>
                                        </Button>
                                        <Button
                                          size="sm"
                                          className="rounded-lg h-9 text-xs 
                                            bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 
                                            border-gray-600 transition-all duration-200
                                            shadow-[2px_2px_4px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.05)]
                                            hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1)]"
                                          onClick={() => addToCart({
                                            id: book.id,
                                            title: book.title,
                                            price: book.price || 0,
                                            image: book.coverImage || '',
                                            quantity: 1
                                          })}
                                        >
                                          <ShoppingCart className="h-3.5 w-3.5 mr-1.5 transition-transform duration-200 group-hover:scale-110" />
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
                        <div className="mt-6">
                          {filteredServices.length === 0 ? (
                            <div className="text-center py-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-inner">
                              <Package className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-4 text-lg font-medium">{translate("Няма намерени услуги", "No services found")}</h3>
                              <p className="mt-2 text-sm text-gray-500">
                                {translate("Опитайте да промените критериите за търсене", "Try adjusting your search or filter criteria")}
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {filteredServices.map((service) => (
                                <div 
                                  key={service.id} 
                                  className="group relative flex flex-col h-full rounded-xl overflow-hidden 
                                    bg-gradient-to-br from-gray-50 via-white to-gray-50 
                                    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                                    border border-gray-100/70 dark:border-gray-700/70
                                    shadow-[5px_5px_10px_rgba(0,0,0,0.06),-5px_-5px_10px_rgba(255,255,255,0.8)]
                                    dark:shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(30,30,30,0.2)]
                                    transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[3px_3px_6px_rgba(0,0,0,0.05),-3px_-3px_6px_rgba(255,255,255,0.7)]
                                    dark:hover:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]"
                                >
                                  {/* Inner glow effect */}
                                  <div className="absolute inset-1 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-inner pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                  
                                  {service.featured && (
                                    <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-white border-amber-300 shadow-md transition-transform duration-300 group-hover:transform group-hover:scale-110 group-hover:-rotate-3">
                                      {translate("Популярна", "Popular")}
                                    </Badge>
                                  )}
                                  
                                  <div className="relative h-52 overflow-hidden">
                                    {service.coverImage ? (
                                      <div className="absolute inset-0">
                                        <Image
                                          src={service.coverImage}
                                          alt={service.title}
                                          fill
                                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                        {/* Image overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                      </div>
                                    ) : (
                                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                                        <Package className="h-16 w-16 text-gray-400 transition-transform duration-300 group-hover:scale-110" />
                                      </div>
                                    )}
                                    {/* Soft inner shadow overlay */}
                                    <div className="absolute inset-0 shadow-[inset_0px_-3px_7px_rgba(0,0,0,0.1)] dark:shadow-[inset_0px_-3px_7px_rgba(0,0,0,0.2)] pointer-events-none"></div>
                                  </div>
                                  
                                  <div className="relative flex flex-col flex-grow p-5 z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Badge variant="secondary" className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-xs py-0">
                                        {service.category === 'individual' 
                                          ? translate("Индивидуална", "Individual")
                                          : translate("Пакет", "Package")}
                                      </Badge>
                                      <Badge variant="outline" className="flex items-center gap-1 text-xs py-0">
                                        <Clock className="h-2.5 w-2.5" />
                                        {service.duration}
                                      </Badge>
                                    </div>
                                    
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">{service.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
                                      {service.description}
                                    </p>
                                    
                                    {service.includes && (
                                      <ul className="mt-auto mb-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                                        {service.includes.slice(0, 2).map((item, index) => (
                                          <li key={index} className="flex items-center gap-1.5">
                                            <span className="text-gray-500 dark:text-gray-400 text-xs">✓</span>
                                            <span className="line-clamp-1">{item}</span>
                                          </li>
                                        ))}
                                        {service.includes.length > 2 && (
                                          <li className="text-xs text-gray-500 pl-4">
                                            +{service.includes.length - 2} {translate("още", "more")}
                                          </li>
                                        )}
                                      </ul>
                                    )}
                                    
                                    <div className="mt-auto pt-3 border-t border-gray-200/70 dark:border-gray-700/70 flex items-center justify-between">
                                      <span className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                                        {service.price.toFixed(2)} лв.
                                      </span>
                                      <div className="flex space-x-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="rounded-lg h-9 text-xs shadow-sm hover:shadow-inner group/btn transition-all duration-200"
                                          asChild
                                        >
                                          <Link href={`/shop/services/${service.id}`}>
                                            <span className="relative">{translate("Детайли", "Details")}</span>
                                          </Link>
                                        </Button>
                                        <Button
                                          size="sm"
                                          className="rounded-lg h-9 text-xs
                                            bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 
                                            border-gray-600 transition-all duration-200
                                            shadow-[2px_2px_4px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(255,255,255,0.05)]
                                            hover:shadow-[1px_1px_2px_rgba(0,0,0,0.1)]"
                                          onClick={() => addToCart({
                                            id: service.id,
                                            title: service.title,
                                            price: service.price,
                                            image: service.coverImage,
                                            quantity: 1,
                                            type: 'service'
                                          })}
                                        >
                                          <ShoppingCart className="h-3.5 w-3.5 mr-1.5 transition-transform duration-200 group-hover:scale-110" />
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
              </div>
            </div>
          </div>
          
          {/* Footer - using same styling as main page */}
          <div className="mt-6 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
            
            {/* Main footer content with neumorphic design */}
            <div className="relative bg-gray-50/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-200/30 dark:border-gray-700/30 shadow-inner p-4">
              {/* Footer bottom section */}
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-3 sm:mb-0">
                  © {currentYear} ELIS. {translate("Всички права запазени.", "All rights reserved.")}
                </div>
                
                <div className="flex gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <a href="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {translate("Условия", "Terms")}
                  </a>
                  <a href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {translate("Поверителност", "Privacy")}
                  </a>
                  <a href="/cookies" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {translate("Бисквитки", "Cookies")}
                  </a>
                </div>
              </div>
              
              {/* Scroll to top button */}
              <button 
                onClick={scrollToTop}
                className="absolute -top-12 right-4 h-8 w-8 rounded-full bg-gray-500 text-white shadow-md flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 