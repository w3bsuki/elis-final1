"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { shopBooks } from "@/lib/shop-data";
import { 
  BookOpen, 
  Star, 
  Award, 
  BookText, 
  TrendingUp, 
  Tag, 
  Sparkles,
  Filter,
  ArrowRight,
  Clock,
  Search,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { BookExcerptDialog } from "@/components/ui/book-excerpt-dialog";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types for book categories
type BookCategory = "all" | "health" | "inspiration" | "mindfulness" | "poetry";

export function FeaturedBooks() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // States for filtering and search
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState(shopBooks);
  
  // Get books by category for tabs
  const getCategoryBooks = (category: BookCategory): typeof shopBooks => {
    if (category === "all") return shopBooks;
    
    return shopBooks.filter(book => 
      bookCategories[book.id as keyof typeof bookCategories]?.includes(category)
    );
  };
  
  // Book excerpt dialog state
  const [openExcerpt, setOpenExcerpt] = useState(false);
  const [selectedBook, setSelectedBook] = useState<typeof shopBooks[0] | null>(null);
  
  // Categories with translations
  const categories: { id: BookCategory; label: string }[] = [
    { id: "all", label: translate("Всички", "All") },
    { id: "health", label: translate("Здраве", "Health") },
    { id: "inspiration", label: translate("Вдъхновение", "Inspiration") },
    { id: "mindfulness", label: translate("Осъзнатост", "Mindfulness") },
    { id: "poetry", label: translate("Поезия", "Poetry") }
  ];
  
  // Book tags mapping
  const bookCategories = {
    "osaznatohranene": ["health", "mindfulness"],
    "vdahnovenia-kniga-1": ["inspiration", "poetry"],
    "dnevnik-na-shtastieto": ["mindfulness", "inspiration"],
    "vdahnovenia-kniga-2": ["inspiration", "poetry"]
  };
  
  // Filter books based on category and search
  useEffect(() => {
    let result = [...shopBooks];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(book => 
        bookCategories[book.id as keyof typeof bookCategories]?.includes(selectedCategory)
      );
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredBooks(result);
  }, [selectedCategory, searchQuery]);
  
  // Function to open the excerpt dialog
  const handleOpenExcerpt = (book: typeof shopBooks[0]) => {
    setSelectedBook(book);
    setOpenExcerpt(true);
  };
  
  // Check if a book is a new release (less than 3 months old)
  const isNewRelease = (publishDate: string) => {
    const bookDate = new Date(publishDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return bookDate > threeMonthsAgo;
  };
  
  return (
    <section id="books" className="py-8 relative w-full">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px] pointer-events-none"></div>
      
      <div className="w-full px-2">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="outline" 
              className="mb-3 px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-700/50 inline-flex items-center gap-1.5"
            >
              <BookOpen className="h-4 w-4" />
              <span>{translate("Писателско Творчество", "Literary Works")}</span>
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              {translate("Открийте Моите Книги", "Discover My Books")}
            </h2>
            
            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {translate(
                "Колекция от моите публикувани произведения, всяко от които представя уникални идеи и истории, създадени да вдъхновяват и трансформират.",
                "A collection of my published works, each presenting unique ideas and stories designed to inspire and transform."
              )}
            </p>
          </motion.div>
          
          <div className="flex justify-between items-center mb-6">
            {/* Tab categories using shadcn Tabs */}
            <Tabs 
              defaultValue="all" 
              className="w-full"
              onValueChange={(value) => setSelectedCategory(value as BookCategory)}
            >
              <div className="flex flex-col items-center mb-4">
                <TabsList className="bg-gray-100 dark:bg-gray-800 w-auto min-w-[70%] h-12 px-1 mb-3">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-base px-5 py-2.5"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {/* Search toggle button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSearch(!showSearch)}
                  className={cn(
                    "rounded-full shrink-0 mt-2",
                    showSearch && "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  )}
                  aria-label={showSearch ? translate("Затвори търсенето", "Close search") : translate("Отвори търсенето", "Open search")}
                >
                  {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </Button>
              </div>
              
              {/* Search input */}
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="relative max-w-md mx-auto">
                      <Input
                        type="text"
                        placeholder={translate("Търсете по заглавие или ключови думи...", "Search by title or keywords...")}
                        className="pl-10 py-2 border-green-200 dark:border-green-800 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          aria-label={translate("Изчисти търсенето", "Clear search")}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Content for each tab */}
              <TabsContent value="all" className="mt-0">
                <BookGrid 
                  books={filteredBooks.length > 0 ? filteredBooks : getCategoryBooks("all")} 
                  handleOpenExcerpt={handleOpenExcerpt} 
                  isNewRelease={isNewRelease} 
                  bookCategories={bookCategories}
                  categories={categories}
                  translate={translate}
                />
              </TabsContent>
              <TabsContent value="health" className="mt-0">
                <BookGrid 
                  books={selectedCategory === "health" && filteredBooks.length > 0 
                    ? filteredBooks 
                    : getCategoryBooks("health")
                  } 
                  handleOpenExcerpt={handleOpenExcerpt} 
                  isNewRelease={isNewRelease} 
                  bookCategories={bookCategories}
                  categories={categories}
                  translate={translate}
                />
              </TabsContent>
              <TabsContent value="inspiration" className="mt-0">
                <BookGrid 
                  books={selectedCategory === "inspiration" && filteredBooks.length > 0 
                    ? filteredBooks 
                    : getCategoryBooks("inspiration")
                  } 
                  handleOpenExcerpt={handleOpenExcerpt} 
                  isNewRelease={isNewRelease} 
                  bookCategories={bookCategories}
                  categories={categories}
                  translate={translate}
                />
              </TabsContent>
              <TabsContent value="mindfulness" className="mt-0">
                <BookGrid 
                  books={selectedCategory === "mindfulness" && filteredBooks.length > 0 
                    ? filteredBooks 
                    : getCategoryBooks("mindfulness")
                  } 
                  handleOpenExcerpt={handleOpenExcerpt} 
                  isNewRelease={isNewRelease} 
                  bookCategories={bookCategories}
                  categories={categories}
                  translate={translate}
                />
              </TabsContent>
              <TabsContent value="poetry" className="mt-0">
                <BookGrid 
                  books={selectedCategory === "poetry" && filteredBooks.length > 0 
                    ? filteredBooks 
                    : getCategoryBooks("poetry")
                  } 
                  handleOpenExcerpt={handleOpenExcerpt} 
                  isNewRelease={isNewRelease} 
                  bookCategories={bookCategories}
                  categories={categories}
                  translate={translate}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* View All Button */}
        {filteredBooks.length > 0 && filteredBooks.length < shopBooks.length && selectedCategory === "all" && (
          <div className="text-center mt-8">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              {translate("Разгледайте всички книги", "Browse All Books")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Book excerpt dialog */}
      {selectedBook && (
        <BookExcerptDialog
          book={{
            id: selectedBook.id,
            title: selectedBook.title,
            coverImage: selectedBook.coverImage,
            excerpt: selectedBook.excerpt || translate(
              "В момента няма достъпен откъс от тази книга.",
              "No excerpt is currently available for this book."
            )
          }}
          open={openExcerpt}
          onOpenChange={setOpenExcerpt}
        />
      )}
    </section>
  );
}

// Separate BookGrid component for better organization
function BookGrid({ 
  books, 
  handleOpenExcerpt, 
  isNewRelease, 
  bookCategories,
  categories,
  translate
}: { 
  books: typeof shopBooks;
  handleOpenExcerpt: (book: typeof shopBooks[0]) => void;
  isNewRelease: (date: string) => boolean;
  bookCategories: Record<string, string[]>;
  categories: { id: BookCategory; label: string }[];
  translate: (bg: string, en: string) => string;
}) {
  return (
    <>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="w-full"
            >
              <div className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
                {/* Book Cover with Overlay */}
                <div className="relative aspect-[1/1] overflow-hidden">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Quick action buttons */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2 justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-md text-sm px-2.5 py-1.5 h-auto"
                        onClick={() => handleOpenExcerpt(book)}
                      >
                        <Clock className="mr-1.5 h-3.5 w-3.5" />
                        {translate("Преглед", "Preview")}
                      </Button>
                      
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white rounded-md text-sm px-2.5 py-1.5 h-auto"
                        size="sm"
                        asChild
                      >
                        <a href={`/shop/${book.id}`} className="flex items-center">
                          {translate("Детайли", "Details")}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {book.featured && (
                      <Badge className="bg-amber-500 text-white border-0 flex items-center gap-1 px-2 py-0.5 text-sm">
                        <Award className="h-3.5 w-3.5" />
                        {translate("Препоръчана", "Featured")}
                      </Badge>
                    )}
                    
                    {isNewRelease(book.publishDate) && (
                      <Badge className="bg-blue-500 text-white border-0 flex items-center gap-1 px-2 py-0.5 text-sm">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {translate("Нова", "New")}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Book Info */}
                <div className="flex-grow flex flex-col justify-between p-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2 font-playfair line-clamp-1">{book.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{new Date(book.publishDate).getFullYear()}</span>
                      <span>•</span>
                      <span>{book.pages} {translate("стр.", "pgs")}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {bookCategories[book.id as keyof typeof bookCategories]?.map(category => (
                        <span 
                          key={category} 
                          className="text-xs px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {categories.find(c => c.id === category)?.label || category}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                      {book.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                      {book.price.toFixed(2)} лв.
                    </span>
                    
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "h-4 w-4", 
                              i < Math.floor(Math.random() * 2) + 4 
                                ? "text-amber-500 fill-amber-500" 
                                : "text-gray-300 dark:text-gray-600"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <h3 className="text-lg font-semibold mb-2">
            {translate("Няма намерени книги", "No books found")}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {translate(
              "Опитайте с различни филтри или ключови думи",
              "Try different filters or search terms"
            )}
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              window.location.reload();
            }}
          >
            {translate("Покажи всички книги", "Show all books")}
          </Button>
        </div>
      )}
    </>
  );
} 