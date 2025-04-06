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
              className="mb-3 px-3 py-1 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary border-primary/20 dark:border-primary/30 inline-flex items-center gap-1.5 shadow-sm"
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
                <TabsList className="bg-primary/5 dark:bg-primary/10 w-auto min-w-[70%] h-12 px-1 mb-3">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-base px-5 py-2.5"
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
                        className="pl-10 py-2 border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary dark:focus:ring-primary/70"
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
  // Animation for the grid container
  const containerVariants = {
    hidden: { opacity: 1 }, // Start visible to avoid flash
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation of children
      },
    },
  };

  // Animation for each book card
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Get category label
  const getCategoryLabel = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.label || categoryId;
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-6 px-2 md:px-4"
    >
      {books.map((book, index) => (
        <motion.div 
          key={`${book.id}-${index}`} 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-primary/10 dark:border-primary/20 flex flex-col"
        >
          {/* Book cover image */}
          <div className="relative w-full aspect-[3/4] group">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay for actions */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => handleOpenExcerpt(book)}
                className="bg-white/90 text-gray-900 hover:bg-white dark:bg-gray-900/90 dark:text-white dark:hover:bg-gray-900"
              >
                <BookText className="mr-2 h-4 w-4" />
                {translate("Виж Детайли", "See Book Details")}
              </Button>
            </div>
            {/* New Release / Bestseller Badge */}
            {(isNewRelease(book.publishDate) || book.tags?.includes("bestseller")) && (
              <Badge 
                variant="default" 
                className={cn(
                  "absolute top-3 right-3 px-2 py-1 text-xs font-semibold shadow",
                  isNewRelease(book.publishDate) ? 
                    "bg-primary/90 text-primary-foreground border border-primary/20" : 
                    "bg-amber-500 text-white border border-amber-600"
                )}
              >
                {isNewRelease(book.publishDate) ? translate("Нова", "New") : translate("Бестселър", "Bestseller")}
              </Badge>
            )}
          </div>

          {/* Book details */}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold font-playfair mb-1 text-gray-900 dark:text-white line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {translate("Публикувана:", "Published:")} {new Date(book.publishDate).toLocaleDateString(language === 'bg' ? 'bg-BG' : 'en-US')}
            </p>
            
            {/* Categories/Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(bookCategories[book.id as keyof typeof bookCategories] || []).map(catId => (
                <Badge key={catId} variant="outline" className="px-2 py-0.5 text-xs border-primary/20 text-primary bg-primary/5 dark:bg-primary/10 dark:text-primary">
                  {getCategoryLabel(catId)}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
              {book.description}
            </p>

            {/* Price and Rating */}
            <div className="flex justify-between items-center mt-auto pt-3 border-t border-primary/10 dark:border-primary/20">
              <p className="text-lg font-bold text-primary dark:text-primary">
                {book.price.toFixed(2)} {translate("лв.", "BGN")}
              </p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" fill="#eab308" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {book.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Placeholder for empty state */}
      {books.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
          <Search className="mx-auto h-12 w-12 mb-4 text-primary/50" />
          <p className="text-lg font-medium">
            {translate("Няма намерени книги", "No books found")}
          </p>
          <p className="text-sm">
            {translate("Опитайте да промените филтрите или търсенето.", "Try adjusting your filters or search.")}
          </p>
        </div>
      )}
    </motion.div>
  );
} 