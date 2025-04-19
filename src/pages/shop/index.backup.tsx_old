import { useState, useMemo } from "react";
import Head from "next/head";
import { ShopBanner } from "@/components/ui/shop-banner";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { ShopFilters } from "@/components/ui/shop-filters";
import { shopBooks } from "@/lib/shop-data";
import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ShoppingCart, Clock, Package, ArrowUp, Sparkles, Download, FileText, Eye, Star, User, ArrowRight, CheckCircle, CalendarDays, Users, Flower, ArrowDown, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { Book, Service } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

export default function ShopPage() {
  const router = useRouter();
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
  
  // Handle book click - navigate to book details page
  const handleBookClick = (book: Book) => {
    router.push(`/shop/${book.id}`);
  };
  
  // Handle service click - navigate to service details page
  const handleServiceClick = (service: Service) => {
    router.push(`/services/${service.id}`);
  };
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("newest");
  const [activeTab, setActiveTab] = useState('all');
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <Head>
        <title>{translate("Магазин", "Shop")} | {translate("Елис Авторска Страница", "Elis Author Page")}</title>
        <meta name="description" content={translate("Разгледайте книги и услуги от Елис", "Browse books and services by Elis")} />
      </Head>
      
      <main className="flex flex-col min-h-screen pt-10 pb-12 relative overflow-x-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
          
          {/* Decorative blobs */}
          <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-green-400/10 via-blue-300/5 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-0 w-72 h-72 bg-gradient-to-tr from-blue-400/10 via-purple-300/5 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className={CONTAINER_WIDTH_CLASSES}>
          {/* Main content area with enhanced neumorphic styling */}
          <div className="flex flex-col">
            {/* Main neumorphic container with shadow and gradient effects */}
            <div className="rounded-2xl p-[3px] w-full bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
                dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
                shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
                dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
                overflow-hidden">
              
              {/* Inner container with gradient and shadow effects */}
              <div className="bg-gradient-to-br from-gray-50/30 via-white/40 to-gray-50/30 dark:from-gray-900/20 dark:via-gray-900/20 dark:to-gray-900/20 p-6 md:p-8 rounded-xl relative">
                {/* Inner shadow effect */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Shop Banner */}
                  <ShopBanner />
                  
                  {/* Tabs */}
                  <div className="mt-8">
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                      <div className="flex justify-center mb-8 relative">
                        {/* Arrow indicator pointing to tabs */}
                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            {translate("Изберете категория", "Select category")}
                          </span>
                          <ArrowDown className="h-6 w-6 text-green-500 dark:text-green-400" />
                        </div>
                        
                        <TabsList className="bg-gradient-to-r from-gray-100/80 via-white/90 to-gray-100/80 
                          dark:from-gray-800/50 dark:via-gray-900/60 dark:to-gray-800/50 
                          p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/40 
                          shadow-[3px_3px_6px_rgba(0,0,0,0.06),-3px_-3px_6px_rgba(255,255,255,0.8)] 
                          dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]">
                          <TabsTrigger 
                            value="all" 
                            className="relative rounded-full px-7 py-3.5 text-base
                              data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                              dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                              transition-all duration-300 font-medium group
                              data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500
                              data-[state=active]:text-white"
                          >
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 dark:from-purple-500/20 dark:via-pink-500/20 dark:to-orange-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                            
                            <span className="relative flex items-center justify-center gap-2">
                              <Layers className="h-5 w-5 transition-transform duration-300 group-data-[state=active]:scale-110" />
                              {translate("Всички", "All")}
                            </span>
                          </TabsTrigger>
                          
                          <TabsTrigger 
                            value="books" 
                            className="relative rounded-full px-7 py-3.5 text-base
                              data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                              dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                              transition-all duration-300 font-medium group
                              data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600
                              data-[state=active]:text-white"
                          >
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                            
                            <span className="relative flex items-center justify-center gap-2">
                              <BookOpen className="h-5 w-5 transition-transform duration-300 group-data-[state=active]:scale-110" />
                              {translate("Книги", "Books")}
                            </span>
                          </TabsTrigger>
                          
                          <TabsTrigger 
                            value="services" 
                            className="relative rounded-full px-7 py-3.5 text-base
                              data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] 
                              dark:data-[state=active]:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)] 
                              transition-all duration-300 font-medium group
                              data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600
                              data-[state=active]:text-white"
                          >
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:via-blue-500/20 dark:to-indigo-500/20 opacity-0 data-[state=active]:opacity-100 blur-md transition-opacity duration-500"></span>
                            
                            <span className="relative flex items-center justify-center gap-2">
                              <Package className="h-5 w-5 transition-transform duration-300 group-data-[state=active]:scale-110" />
                              {translate("Услуги", "Services")}
                            </span>
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      
                      {/* Filters and Search */}
                      <div className="mt-6">
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

                      {/* All Content - Books and Services Combined */}
                      <TabsContent value="all">
                        <div className="mt-8">
                          {filteredBooks.length === 0 && filteredServices.length === 0 ? (
                            <div className="text-center py-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-inner">
                              <Layers className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-4 text-lg font-medium">{translate("Няма намерени резултати", "No results found")}</h3>
                              <p className="mt-2 text-sm text-gray-500">
                                {translate("Опитайте да промените критериите за търсене", "Try adjusting your search or filter criteria")}
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-12">
                              {/* Books section */}
                              {filteredBooks.length > 0 && (
                                <div>
                                  <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                      <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
                                      {translate("Книги", "Books")}
                                    </h2>
                                    <Badge 
                                      className="rounded-full px-3 py-1.5 text-sm font-medium 
                                        bg-green-100 dark:bg-green-900/50 
                                        text-green-800 dark:text-green-300 
                                        border border-green-200 dark:border-green-800/50"
                                    >
                                      {filteredBooks.length}
                                    </Badge>
                                  </div>
                                  
                                  <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                                  >
                                    {filteredBooks.slice(0, 4).map((book) => (
                                      <motion.div 
                                        key={book.id}
                                        variants={itemVariants}
                                        className="group relative flex flex-col h-full"
                                        onClick={() => handleBookClick(book)}
                                      >
                                        {/* Card with double border hover effect - matching the style of featured content cards */}
                                        <div className={cn(
                                          "h-full p-[3px] select-none rounded-xl",
                                          "bg-gradient-to-br from-white/90 via-green-100/20 to-white/90 dark:from-gray-900/90 dark:via-green-900/20 dark:to-gray-900/90",
                                          "backdrop-blur-sm",
                                          "shadow-[-5px_-5px_15px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.08)]", 
                                          "dark:shadow-[-5px_-5px_15px_rgba(20,20,30,0.1),_5px_5px_15px_rgba(0,0,0,0.2)]",
                                          "transition-all duration-300", 
                                          "hover:shadow-[-2px_-2px_10px_rgba(255,255,255,0.6),_2px_2px_10px_rgba(0,0,0,0.1),_0_8px_20px_rgba(0,0,0,0.05)]", 
                                          "dark:hover:shadow-[-2px_-2px_10px_rgba(20,20,30,0.15),_2px_2px_10px_rgba(0,0,0,0.3),_0_8px_20px_rgba(0,0,0,0.15)]",
                                          "border-2 border-green-100/30 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-700",
                                          "relative overflow-hidden cursor-pointer"
                                        )}>
                                          {/* Inner container with its own border - creates nested effect */}
                                          <div className={cn(
                                            "h-full w-full flex flex-col bg-white/90 dark:bg-gray-900/90 rounded-lg",
                                            "border border-green-100/30 dark:border-green-900/30 hover:border-green-300/50 dark:hover:border-green-700/50",
                                            "shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]",
                                            "dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
                                          )}>
                                            {/* Corner decoration element with enhanced styling */}
                                            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-3xl -z-1 
                                              bg-gradient-to-bl from-green-100/40 to-transparent dark:from-green-900/20
                                              group-hover:from-green-200/60 dark:group-hover:from-green-800/40
                                              transition-colors duration-300" />
                                            
                                            {/* Book cover image with enhanced styling */}
                                            <div className="relative w-full h-52 overflow-hidden rounded-t-lg">
                                              {book.coverImage ? (
                                                <div className="absolute inset-0">
                                                  <Image
                                                    src={book.coverImage}
                                                    alt={book.title}
                                                    fill
                                                    className="object-cover transition-all duration-300"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                  />
                                                  
                                                  {/* Subtle image overlay effect */}
                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                  
                                                  {/* Enhanced vignette */}
                                                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                                                </div>
                                              ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
                                                  <Flower className="h-20 w-20 text-green-500/40" />
                                                </div>
                                              )}
                                            </div>
                                            
                                            {/* Book details with refined styling */}
                                            <div className="p-5 lg:p-6 flex flex-col flex-grow">
                                              {/* Category badge */}
                                              {book.category && (
                                                <span className="inline-flex items-center mb-2.5 text-sm font-medium mr-2 px-3 py-1 rounded-full
                                                  bg-gradient-to-r from-green-500 to-emerald-600 text-white
                                                  border border-green-400/20 shadow-md">
                                                    {book.category === 'health' ? (language === 'bg' ? 'Здраве' : 'Health') : 
                                                    book.category === 'poetry' ? (language === 'bg' ? 'Поезия' : 'Poetry') : 
                                                    book.category === 'selfHelp' ? (language === 'bg' ? 'Самопомощ' : 'Self Help') : 
                                                    book.category}
                                                </span>
                                              )}
                                              
                                              {/* Book title with clean typography - no color transitions */}
                                              <h3 className="font-bold text-xl leading-6 text-[#171717] dark:text-white mb-2 
                                                tracking-tight line-clamp-2">
                                                {book.title}
                                              </h3>
                                              
                                              {/* Price display under headline */}
                                              <div className="flex items-center mb-3">
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                  {book.price?.toFixed(2)} лв.
                                                </span>
                                              </div>
                                              
                                              {/* Enhanced book details with badges */}
                                              <div className="flex items-center gap-1.5 mb-3.5 w-full">
                                                <div className="inline-flex items-center shrink-0 px-2.5 py-1 rounded-md 
                                                  bg-gray-100/80 dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300">
                                                  <FileText className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                                                  <span>{book.pages} {language === 'bg' ? 'стр.' : 'pg'}</span>
                                                </div>
                                                
                                                {/* Publication date */}
                                                {book.publishDate && (
                                                  <div className="inline-flex items-center shrink-0 px-2.5 py-1 rounded-md 
                                                    bg-gray-100/80 dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300">
                                                    <CalendarDays className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                                                    <span>{new Date(book.publishDate).getFullYear()}</span>
                                                  </div>
                                                )}
                                                
                                                {/* Digital badge if available */}
                                                {book.digital && (
                                                  <div className="inline-flex items-center shrink-0 px-2.5 py-1 rounded-md 
                                                    bg-blue-50/80 dark:bg-blue-900/30 text-sm text-blue-700 dark:text-blue-400 
                                                    border border-blue-200/50 dark:border-blue-800/40">
                                                    <Download className="h-3.5 w-3.5 mr-1" />
                                                    <span>{language === 'bg' ? 'PDF' : 'PDF'}</span>
                                                  </div>
                                                )}
                                              </div>
                                              
                                              {/* Book description with clean typography - no color transitions */}
                                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow leading-relaxed">
                                                {book.description}
                                              </p>
                                              
                                              {/* Rating and reviews */}
                                              <div className="flex items-center mb-4">
                                                <div className="flex text-yellow-400 mr-2">
                                                  <Star className="h-4 w-4 fill-current" />
                                                  <Star className="h-4 w-4 fill-current" />
                                                  <Star className="h-4 w-4 fill-current" />
                                                  <Star className="h-4 w-4 fill-current" />
                                                  <Star className="h-4 w-4 fill-current text-gray-300 dark:text-gray-600" />
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                  (4.0) · {Math.floor(Math.random() * 50) + 10} {translate("ревюта", "reviews")}
                                                </span>
                                              </div>
                                              
                                              {/* Buttons at the bottom */}
                                              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/30 flex justify-between items-center">
                                                {/* View button with refined styling */}
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  className="rounded-full h-10 w-[45%]
                                                    bg-white dark:bg-gray-800 
                                                    border-gray-200 dark:border-gray-700
                                                    text-gray-700 dark:text-gray-300
                                                    group-hover:bg-green-50 dark:group-hover:bg-green-900/20
                                                    group-hover:border-green-300 dark:group-hover:border-green-700
                                                    transition-all duration-300"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleBookClick(book);
                                                  }}
                                                >
                                                  <Eye className="h-4 w-4 mr-2" />
                                                  {translate("Преглед", "Preview")}
                                                </Button>
                                                
                                                {/* Buy button with gradient styling */}
                                                <Button
                                                  size="sm"
                                                  className="rounded-full h-10 w-[50%]
                                                    bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                                                    text-white hover:shadow-sm transition-all duration-300"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    addToCart({
                                                      id: book.id,
                                                      title: book.title,
                                                      price: book.price || 0,
                                                      image: book.coverImage || book.image || '',
                                                      quantity: 1
                                                    });
                                                  }}
                                                >
                                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                                  {translate("Купи", "Buy")}
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                  
                                  {filteredBooks.length > 4 && (
                                    <div className="flex justify-center mt-6">
                                      <Button 
                                        variant="outline" 
                                        onClick={() => setActiveTab('books')}
                                        className="rounded-full border border-green-200 dark:border-green-800/50 
                                          bg-green-50/50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30
                                          text-green-700 dark:text-green-300 gap-2
                                          hover:shadow-sm transition-all duration-300"
                                      >
                                        {translate("Покажи всички книги", "View all books")}
                                        <ArrowRight className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              {/* Services section */}
                              {filteredServices.length > 0 && (
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                                      <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                      {translate("Услуги", "Services")}
                                    </h2>
                                    <Badge 
                                      className="rounded-full px-2 py-1 text-xs font-medium
                                        bg-blue-100 dark:bg-blue-900/50 
                                        text-blue-800 dark:text-blue-300 
                                        border border-blue-200 dark:border-blue-800/50"
                                    >
                                      {filteredServices.length}
                                    </Badge>
                                  </div>
                                  
                                  <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
                                  >
                                    {filteredServices.slice(0, 4).map((service) => (
                                      <motion.div 
                                        key={service.id}
                                        variants={itemVariants}
                                        className="group relative flex flex-col h-full"
                                        onClick={() => handleServiceClick(service)}
                                      >
                                        {/* Card with double border hover effect - matching the style of featured content cards */}
                                        <div className={cn(
                                          "h-full p-[3px] select-none rounded-xl",
                                          "bg-gradient-to-br from-white/90 via-purple-100/20 to-white/90 dark:from-gray-900/90 dark:via-purple-900/20 dark:to-gray-900/90",
                                          "backdrop-blur-sm",
                                          "shadow-[-5px_-5px_15px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.08)]", 
                                          "dark:shadow-[-5px_-5px_15px_rgba(20,20,30,0.1),_5px_5px_15px_rgba(0,0,0,0.2)]",
                                          "transition-all duration-300", 
                                          "hover:shadow-[-2px_-2px_10px_rgba(255,255,255,0.6),_2px_2px_10px_rgba(0,0,0,0.1),_0_8px_20px_rgba(0,0,0,0.05)]", 
                                          "dark:hover:shadow-[-2px_-2px_10px_rgba(20,20,30,0.15),_2px_2px_10px_rgba(0,0,0,0.3),_0_8px_20px_rgba(0,0,0,0.15)]",
                                          "border-2 border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700",
                                          "relative overflow-hidden cursor-pointer"
                                        )}>
                                          {/* Inner container with its own border - creates nested effect */}
                                          <div className={cn(
                                            "h-full w-full flex flex-col bg-white/90 dark:bg-gray-900/90 rounded-lg",
                                            "border border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300/50 dark:hover:border-purple-700/50",
                                            "shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]",
                                            "dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
                                          )}>
                                            {/* Corner decoration element with enhanced styling */}
                                            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-3xl -z-1 
                                              bg-gradient-to-bl from-purple-100/40 to-transparent dark:from-purple-900/20
                                              group-hover:from-purple-200/60 dark:group-hover:from-purple-800/40
                                              transition-colors duration-300" />
                                            
                                            {/* Service image with enhanced styling */}
                                            <div className="relative w-full h-44 overflow-hidden rounded-t-lg">
                                              {service.image ? (
                                                <div className="absolute inset-0">
                                                  <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                  />
                                                  
                                                  {/* Improved image overlay effect */}
                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                                  
                                                  {/* Enhanced vignette */}
                                                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                                                </div>
                                              ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
                                                  <Flower className="h-20 w-20 text-purple-500/40 group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                              )}
                                            </div>
                                            
                                            {/* Service details with refined styling */}
                                            <div className="p-4 flex flex-col flex-grow">
                                              {/* Category badge for package vs individual */}
                                              <span className="inline-flex items-center mb-2 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full
                                                bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-400/20 dark:border-purple-800/40">
                                                {service.category === 'package' ? (language === 'bg' ? 'Пакет' : 'Package') : 
                                                 service.category === 'individual' ? (language === 'bg' ? 'Индивидуална' : 'Individual') : 
                                                 service.category}
                                              </span>
                                              
                                              {/* Featured badge if applicable */}
                                              {service.featured && (
                                                <span className="inline-flex items-center mb-2 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full
                                                  bg-amber-100/80 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-400/20 dark:border-amber-800/40">
                                                  <Sparkles className="h-3 w-3 mr-1" />
                                                  {language === 'bg' ? 'Препоръчана' : 'Featured'}
                                                </span>
                                              )}
                                              
                                              {/* Service title with clean typography - no color transitions */}
                                              <h3 className="font-bold text-base leading-5 text-[#171717] dark:text-white mb-1 
                                                tracking-tight line-clamp-2">
                                                {service.title}
                                              </h3>
                                              
                                              {/* Price display under headline */}
                                              <div className="flex items-center mb-1.5">
                                                <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                                                  {service.price?.toFixed(2)} лв.
                                                </span>
                                              </div>
                                              
                                              {/* Service details with badges */}
                                              <div className="flex items-center flex-wrap gap-1 mb-2 w-full">
                                                <div className="inline-flex items-center shrink-0 px-2 py-0.5 rounded-md 
                                                  bg-gray-100/80 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-300">
                                                  <Clock className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                                                  <span>{service.duration}</span>
                                                </div>
                                                
                                                {/* Popular badge if applicable */}
                                                {service.popular && (
                                                  <div className="inline-flex items-center shrink-0 px-2 py-0.5 rounded-md 
                                                    bg-red-50/80 dark:bg-red-900/30 text-xs text-red-700 dark:text-red-400 
                                                    border border-red-200/50 dark:border-red-800/40">
                                                    <Flower className="h-3 w-3 mr-1" />
                                                    <span>{language === 'bg' ? 'Популярна' : 'Popular'}</span>
                                                  </div>
                                                )}
                                                
                                                {/* MVP badge if applicable */}
                                                {service.mvp && (
                                                  <div className="inline-flex items-center shrink-0 px-2 py-0.5 rounded-md 
                                                    bg-blue-50/80 dark:bg-blue-900/30 text-xs text-blue-700 dark:text-blue-400 
                                                    border border-blue-200/50 dark:border-blue-800/40">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    <span>{language === 'bg' ? 'Топ Избор' : 'Top Pick'}</span>
                                                  </div>
                                                )}
                                              </div>
                                              
                                              {/* Service description with clean typography - no color transitions */}
                                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-grow leading-normal">
                                                {service.description}
                                              </p>
                                              
                                              {/* Service features for packages - simplified styling */}
                                              {service.includes && service.includes.length > 0 && (
                                                <div className="mb-3 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg p-2 border border-purple-100/50 dark:border-purple-800/20">
                                                    <p className="text-xs uppercase tracking-wider font-medium text-purple-600 dark:text-purple-400 mb-1">
                                                      {translate("Включва", "Includes")}:
                                                    </p>
                                                    <ul className="space-y-0.5">
                                                      {service.includes.slice(0, 3).map((feature, idx) => (
                                                        <li key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                                                          <CheckCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0 text-purple-500 dark:text-purple-400" />
                                                          <span className="line-clamp-1">{feature}</span>
                                                        </li>
                                                      ))}
                                                      {service.includes.length > 3 && (
                                                        <li className="text-xs text-gray-500 dark:text-gray-400 pl-4 italic">
                                                          +{service.includes.length - 3} {translate("още", "more")}
                                                        </li>
                                                      )}
                                                    </ul>
                                                  </div>
                                              )}
                                              
                                              {/* Buttons at the bottom */}
                                              <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/30 flex justify-between items-center">
                                                {/* Details button with refined styling */}
                                                <Button
                                                  variant="outline"
                                                  size="sm"
                                                  className="rounded-full h-8 w-[45%]
                                                    bg-white dark:bg-gray-800 
                                                    border-gray-200 dark:border-gray-700
                                                    text-gray-700 dark:text-gray-300
                                                    group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20
                                                    group-hover:border-purple-300 dark:group-hover:border-purple-700
                                                    transition-all duration-300 text-xs"
                                                  asChild
                                                >
                                                  <Link href={`/services/${service.id}`} className="flex items-center justify-center">
                                                    <Eye className="h-3 w-3 mr-1.5" />
                                                    <span>{translate("Детайли", "Details")}</span>
                                                  </Link>
                                                </Button>
                                                
                                                {/* Book button with simplified styling */}
                                                <Button
                                                  size="sm"
                                                  className="rounded-full h-8 w-[50%] text-xs
                                                    bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 
                                                    text-white hover:shadow-sm transition-all duration-300"
                                                  onClick={() => addToCart({
                                                    id: service.id,
                                                    title: service.title,
                                                    price: service.price,
                                                    image: service.image,
                                                    quantity: 1,
                                                    type: 'service'
                                                  })}
                                                >
                                                  <ShoppingCart className="h-3 w-3 mr-1.5" />
                                                  {translate("Резервирай", "Book")}
                                                </Button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                  
                                  {filteredServices.length > 4 && (
                                    <div className="flex justify-center mt-6">
                                      <Button 
                                        variant="outline"
                                        onClick={() => setActiveTab('services')}
                                        className="rounded-full border border-purple-200 dark:border-purple-800/50 
                                          bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30
                                          text-purple-700 dark:text-purple-300 gap-2
                                          hover:shadow-sm transition-all duration-300"
                                      >
                                        {translate("Покажи всички услуги", "View all services")}
                                        <ArrowRight className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Books Content */}
                      <TabsContent value="books">
                        <div className="mt-8">
                          {filteredBooks.length === 0 ? (
                            <div className="text-center py-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-inner">
                              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-4 text-lg font-medium">{translate("Няма намерени книги", "No books found")}</h3>
                              <p className="mt-2 text-sm text-gray-500">
                                {translate("Опитайте да промените критериите за търсене", "Try adjusting your search or filter criteria")}
                              </p>
                            </div>
                          ) : (
                            <motion.div 
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                            >
                              {filteredBooks.map((book) => (
                                <motion.div 
                                  key={book.id}
                                  variants={itemVariants}
                                  className="group relative flex flex-col h-full"
                                  onClick={() => handleBookClick(book)}
                                >
                                  {/* Card with double border hover effect - matching the style of featured content cards */}
                                  <div className={cn(
                                    "h-full p-[3px] select-none rounded-xl",
                                    "bg-gradient-to-br from-white/90 via-green-100/20 to-white/90 dark:from-gray-900/90 dark:via-green-900/20 dark:to-gray-900/90",
                                    "backdrop-blur-sm",
                                    "shadow-[-5px_-5px_15px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.08)]", 
                                    "dark:shadow-[-5px_-5px_15px_rgba(20,20,30,0.1),_5px_5px_15px_rgba(0,0,0,0.2)]",
                                    "transition-all duration-300", 
                                    "hover:shadow-[-2px_-2px_10px_rgba(255,255,255,0.6),_2px_2px_10px_rgba(0,0,0,0.1),_0_8px_20px_rgba(0,0,0,0.05)]", 
                                    "dark:hover:shadow-[-2px_-2px_10px_rgba(20,20,30,0.15),_2px_2px_10px_rgba(0,0,0,0.3),_0_8px_20px_rgba(0,0,0,0.15)]",
                                    "border-2 border-green-100/30 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-700",
                                    "relative overflow-hidden cursor-pointer"
                                  )}>
                                    {/* Inner container with its own border - creates nested effect */}
                                    <div className={cn(
                                      "h-full w-full flex flex-col bg-white/90 dark:bg-gray-900/90 rounded-lg",
                                      "border border-green-100/30 dark:border-green-900/30 hover:border-green-300/50 dark:hover:border-green-700/50",
                                      "shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]",
                                      "dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
                                    )}>
                                      {/* Corner decoration element with enhanced styling */}
                                      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-3xl -z-1 
                                        bg-gradient-to-bl from-green-100/40 to-transparent dark:from-green-900/20
                                        group-hover:from-green-200/60 dark:group-hover:from-green-800/40
                                        transition-colors duration-300" />
                                      
                                      {/* Book cover image with enhanced styling */}
                                      <div className="relative w-full h-52 overflow-hidden rounded-t-lg">
                                        {book.coverImage ? (
                                          <div className="absolute inset-0">
                                            <Image
                                              src={book.coverImage}
                                              alt={book.title}
                                              fill
                                              className="object-cover transition-all duration-300"
                                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                            
                                            {/* Subtle image overlay effect */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Enhanced vignette */}
                                            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                                          </div>
                                        ) : (
                                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
                                            <Flower className="h-20 w-20 text-green-500/40" />
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Book details with refined styling */}
                                      <div className="p-5 lg:p-6 flex flex-col flex-grow">
                                        {/* Category badge */}
                                        {book.category && (
                                          <span className="inline-flex items-center mb-2.5 text-sm font-medium mr-2 px-3 py-1 rounded-full
                                            bg-gradient-to-r from-green-500 to-emerald-600 text-white
                                            border border-green-400/20 shadow-md">
                                                {book.category === 'health' ? (language === 'bg' ? 'Здраве' : 'Health') : 
                                                book.category === 'poetry' ? (language === 'bg' ? 'Поезия' : 'Poetry') : 
                                                book.category === 'selfHelp' ? (language === 'bg' ? 'Самопомощ' : 'Self Help') : 
                                                book.category}
                                            </span>
                                        )}
                                        
                                        {/* Book title with clean typography - no color transitions */}
                                        <h3 className="font-bold text-xl leading-6 text-[#171717] dark:text-white mb-2 
                                          tracking-tight line-clamp-2">
                                          {book.title}
                                        </h3>
                                        
                                        {/* Price display under headline */}
                                        <div className="flex items-center mb-3">
                                          <span className="font-semibold text-gray-700 dark:text-gray-300">
                                            {book.price?.toFixed(2)} лв.
                                          </span>
                                        </div>
                                        
                                        {/* Enhanced book details with badges */}
                                        <div className="flex items-center gap-1.5 mb-3.5 w-full">
                                          <div className="inline-flex items-center shrink-0 px-2.5 py-1 rounded-md 
                                            bg-gray-100/80 dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300">
                                            <FileText className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                                            <span>{book.pages} {language === 'bg' ? 'стр.' : 'pg'}</span>
                                          </div>
                                          
                                          {/* Publication date */}
                                          {book.publishDate && (
                                            <div className="inline-flex items-center shrink-0 px-2.5 py-1 rounded-md 
                                              bg-gray-100/80 dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300">
                                              <CalendarDays className="h-3.5 w-3.5 mr-1 text-gray-500 dark:text-gray-400" />
                                              <span>{new Date(book.publishDate).getFullYear()}</span>
                                            </div>
                                          )}
                                          
                                          {/* Digital badge if available */}
                                          {book.digital && (
                                            <div className="inline-flex items-center shrink-0 px-2.5 py-1 rounded-md 
                                              bg-blue-50/80 dark:bg-blue-900/30 text-sm text-blue-700 dark:text-blue-400 
                                              border border-blue-200/50 dark:border-blue-800/40">
                                              <Download className="h-3.5 w-3.5 mr-1" />
                                              <span>{language === 'bg' ? 'PDF' : 'PDF'}</span>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Book description with clean typography - no color transitions */}
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow leading-relaxed">
                                          {book.description}
                                        </p>
                                        
                                        {/* Rating and reviews */}
                                        <div className="flex items-center mb-4">
                                          <div className="flex text-yellow-400 mr-2">
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current" />
                                            <Star className="h-4 w-4 fill-current text-gray-300 dark:text-gray-600" />
                                          </div>
                                          <span className="text-xs text-gray-500 dark:text-gray-400">
                                            (4.0) · {Math.floor(Math.random() * 50) + 10} {translate("ревюта", "reviews")}
                                          </span>
                                        </div>
                                        
                                        {/* Buttons at the bottom */}
                                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/30 flex justify-between items-center">
                                          {/* View button with refined styling */}
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full h-10 w-[45%]
                                              bg-white dark:bg-gray-800 
                                              border-gray-200 dark:border-gray-700
                                              text-gray-700 dark:text-gray-300
                                              group-hover:bg-green-50 dark:group-hover:bg-green-900/20
                                              group-hover:border-green-300 dark:group-hover:border-green-700
                                              transition-all duration-300"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleBookClick(book);
                                            }}
                                          >
                                            <Eye className="h-4 w-4 mr-2" />
                                            {translate("Преглед", "Preview")}
                                          </Button>
                                          
                                          {/* Buy button with gradient styling */}
                                          <Button
                                            size="sm"
                                            className="rounded-full h-10 w-[50%]
                                              bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                                              text-white hover:shadow-sm transition-all duration-300"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              addToCart({
                                                id: book.id,
                                                title: book.title,
                                                price: book.price || 0,
                                                image: book.coverImage || book.image || '',
                                                quantity: 1
                                              });
                                            }}
                                          >
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            {translate("Купи", "Buy")}
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Services Content */}
                      <TabsContent value="services">
                        <div className="mt-8">
                          {filteredServices.length === 0 ? (
                            <div className="text-center py-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-inner">
                              <Package className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-4 text-lg font-medium">{translate("Няма намерени услуги", "No services found")}</h3>
                              <p className="mt-2 text-sm text-gray-500">
                                {translate("Опитайте да промените критериите за търсене", "Try adjusting your search or filter criteria")}
                              </p>
                            </div>
                          ) : (
                            <motion.div 
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                            >
                              {filteredServices.map((service) => (
                                <motion.div 
                                  key={service.id}
                                  variants={itemVariants}
                                  className="group relative flex flex-col h-full"
                                >
                                  {/* Card with double border hover effect - matching the style of featured content cards */}
                                  <div className={cn(
                                    "h-full p-[3px] select-none rounded-xl",
                                    "bg-gradient-to-br from-white/90 via-purple-100/20 to-white/90 dark:from-gray-900/90 dark:via-purple-900/20 dark:to-gray-900/90",
                                    "backdrop-blur-sm",
                                    "shadow-[-5px_-5px_15px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.08)]", 
                                    "dark:shadow-[-5px_-5px_15px_rgba(20,20,30,0.1),_5px_5px_15px_rgba(0,0,0,0.2)]",
                                    "transition-all duration-300", 
                                    "hover:shadow-[-2px_-2px_10px_rgba(255,255,255,0.6),_2px_2px_10px_rgba(0,0,0,0.1),_0_8px_20px_rgba(0,0,0,0.05)]", 
                                    "dark:hover:shadow-[-2px_-2px_10px_rgba(20,20,30,0.15),_2px_2px_10px_rgba(0,0,0,0.3),_0_8px_20px_rgba(0,0,0,0.15)]",
                                    "border-2 border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700",
                                    "relative overflow-hidden cursor-pointer"
                                  )}>
                                    
                                    {/* Inner container with its own border - creates nested effect */}
                                    <div className={cn(
                                      "h-full w-full flex flex-col bg-white/90 dark:bg-gray-900/90 rounded-lg",
                                      "border border-purple-100/30 dark:border-purple-900/30 hover:border-purple-300/50 dark:hover:border-purple-700/50",
                                      "shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]",
                                      "dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
                                    )}>
                                      {/* Corner decoration element with enhanced styling */}
                                      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-3xl -z-1 
                                        bg-gradient-to-bl from-purple-100/40 to-transparent dark:from-purple-900/20
                                        group-hover:from-purple-200/60 dark:group-hover:from-purple-800/40
                                        transition-colors duration-300" />
                                      
                                      {/* Service image with enhanced styling */}
                                      <div className="relative w-full h-44 overflow-hidden rounded-t-lg">
                                        {service.image ? (
                                          <div className="absolute inset-0">
                                            <Image
                                              src={service.image}
                                              alt={service.title}
                                              fill
                                              className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
                                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                            
                                            {/* Improved image overlay effect */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                            
                                            {/* Enhanced vignette */}
                                            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] pointer-events-none"></div>
                                          </div>
                                        ) : (
                                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
                                            <Flower className="h-20 w-20 text-purple-500/40 group-hover:scale-110 transition-transform duration-300" />
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Service details with refined styling */}
                                      <div className="p-4 flex flex-col flex-grow">
                                        {/* Category badge for package vs individual */}
                                        <span className="inline-flex items-center mb-2 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full
                                          bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 border border-purple-400/20 dark:border-purple-800/40">
                                          {service.category === 'package' ? (language === 'bg' ? 'Пакет' : 'Package') : 
                                           service.category === 'individual' ? (language === 'bg' ? 'Индивидуална' : 'Individual') : 
                                           service.category}
                                        </span>
                                        
                                        {/* Featured badge if applicable */}
                                        {service.featured && (
                                          <span className="inline-flex items-center mb-2 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full
                                            bg-amber-100/80 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-400/20 dark:border-amber-800/40">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            {language === 'bg' ? 'Препоръчана' : 'Featured'}
                                          </span>
                                        )}
                                        
                                        {/* Service title with clean typography - no color transitions */}
                                        <h3 className="font-bold text-base leading-5 text-[#171717] dark:text-white mb-1 
                                          tracking-tight line-clamp-2">
                                          {service.title}
                                        </h3>
                                        
                                        {/* Price display under headline */}
                                        <div className="flex items-center mb-1.5">
                                          <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                                            {service.price?.toFixed(2)} лв.
                                          </span>
                                        </div>
                                        
                                        {/* Service details with badges */}
                                        <div className="flex items-center flex-wrap gap-1 mb-2 w-full">
                                          <div className="inline-flex items-center shrink-0 px-2 py-0.5 rounded-md 
                                            bg-gray-100/80 dark:bg-gray-700/50 text-xs text-gray-700 dark:text-gray-300">
                                            <Clock className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                                            <span>{service.duration}</span>
                                          </div>
                                          
                                          {/* Popular badge if applicable */}
                                          {service.popular && (
                                            <div className="inline-flex items-center shrink-0 px-2 py-0.5 rounded-md 
                                              bg-red-50/80 dark:bg-red-900/30 text-xs text-red-700 dark:text-red-400 
                                              border border-red-200/50 dark:border-red-800/40">
                                              <Flower className="h-3 w-3 mr-1" />
                                              <span>{language === 'bg' ? 'Популярна' : 'Popular'}</span>
                                            </div>
                                          )}
                                          
                                          {/* MVP badge if applicable */}
                                          {service.mvp && (
                                            <div className="inline-flex items-center shrink-0 px-2 py-0.5 rounded-md 
                                              bg-blue-50/80 dark:bg-blue-900/30 text-xs text-blue-700 dark:text-blue-400 
                                              border border-blue-200/50 dark:border-blue-800/40">
                                              <Star className="h-3 w-3 mr-1" />
                                              <span>{language === 'bg' ? 'Топ Избор' : 'Top Pick'}</span>
                                            </div>
                                          )}
                                        </div>
                                        
                                        {/* Service description with clean typography - no color transitions */}
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 flex-grow leading-normal">
                                          {service.description}
                                        </p>
                                        
                                        {/* Service features for packages - simplified styling */}
                                        {service.includes && service.includes.length > 0 && (
                                          <div className="mb-3 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg p-2 border border-purple-100/50 dark:border-purple-800/20">
                                              <p className="text-xs uppercase tracking-wider font-medium text-purple-600 dark:text-purple-400 mb-1">
                                                {translate("Включва", "Includes")}:
                                              </p>
                                              <ul className="space-y-0.5">
                                                {service.includes.slice(0, 3).map((feature, idx) => (
                                                  <li key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                                                    <CheckCircle className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0 text-purple-500 dark:text-purple-400" />
                                                    <span className="line-clamp-1">{feature}</span>
                                                  </li>
                                                ))}
                                                {service.includes.length > 3 && (
                                                  <li className="text-xs text-gray-500 dark:text-gray-400 pl-4 italic">
                                                    +{service.includes.length - 3} {translate("още", "more")}
                                                  </li>
                                                )}
                                              </ul>
                                            </div>
                                        )}
                                        
                                        {/* Buttons at the bottom */}
                                        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700/30 flex justify-between items-center">
                                          {/* Details button with refined styling */}
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full h-8 w-[45%]
                                              bg-white dark:bg-gray-800 
                                              border-gray-200 dark:border-gray-700
                                              text-gray-700 dark:text-gray-300
                                              group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20
                                              group-hover:border-purple-300 dark:group-hover:border-purple-700
                                              transition-all duration-300 text-xs"
                                              asChild
                                            >
                                              <Link href={`/services/${service.id}`} className="flex items-center justify-center">
                                                <Eye className="h-3 w-3 mr-1.5" />
                                                <span>{translate("Детайли", "Details")}</span>
                                              </Link>
                                            </Button>
                                            
                                            {/* Book button with simplified styling */}
                                            <Button
                                              size="sm"
                                              className="rounded-full h-8 w-[50%] text-xs
                                                bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 
                                                text-white hover:shadow-sm transition-all duration-300"
                                              onClick={() => addToCart({
                                                id: service.id,
                                                title: service.title,
                                                price: service.price,
                                                image: service.image,
                                                quantity: 1,
                                                type: 'service'
                                              })}
                                            >
                                              <ShoppingCart className="h-3 w-3 mr-1.5" />
                                              {translate("Резервирай", "Book")}
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Footer - using neumorphic styling */}
          <div className="mt-12 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
            
            {/* Main footer content with neumorphic design */}
            <div className="rounded-2xl p-[3px]
              bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
              dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
              shadow-[4px_4px_8px_rgba(0,0,0,0.05),-4px_-4px_8px_rgba(255,255,255,0.7)]
              dark:shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(30,30,30,0.1)]
              relative">
              
              {/* Inner container with gradient and shadow effects */}
              <div className="bg-gradient-to-br from-gray-50/30 via-white/40 to-gray-50/30 dark:from-gray-900/20 dark:via-gray-900/20 dark:to-gray-900/20 p-5 rounded-xl relative">
                {/* Inner shadow effect */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                {/* Footer content */}
                <div className="relative z-10">
                  {/* Footer bottom section */}
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 sm:mb-0">
                      © {currentYear} ELIS. {translate("Всички права запазени.", "All rights reserved.")}
                    </div>
                    
                    <div className="flex gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <a href="/terms" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
                        {translate("Условия", "Terms")}
                      </a>
                      <a href="/privacy" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
                        {translate("Поверителност", "Privacy")}
                      </a>
                      <a href="/cookies" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
                        {translate("Бисквитки", "Cookies")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Scroll to top button with neumorphic styling */}
              <button 
                onClick={scrollToTop}
                className="absolute -top-4 right-4 h-10 w-10 rounded-full 
                  bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                  border border-gray-200/70 dark:border-gray-700/70
                  shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]
                  dark:shadow-[3px_3px_6px_rgba(0,0,0,0.2),-3px_-3px_6px_rgba(30,30,30,0.1)]
                  hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.7)]
                  dark:hover:shadow-[2px_2px_4px_rgba(0,0,0,0.15),-2px_-2px_4px_rgba(30,30,30,0.07)]
                  flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110
                  group"
                aria-label="Scroll to top"
              >
                <div className="absolute inset-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ArrowUp className="h-4 w-4 text-gray-700 dark:text-gray-300 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 