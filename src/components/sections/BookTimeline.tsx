"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  ArrowRight, 
  BookOpen, 
  BookMarked, 
  Star, 
  BookText, 
  Clock, 
  Sparkles, 
  Award, 
  TrendingUp, 
  Quote, 
  Tag,
  BookCopy
} from "lucide-react";
import { shopBooks } from "@/lib/shop-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import { useState } from "react";
import { BookExcerptDialog } from "@/components/ui/book-excerpt-dialog";

// Component for the diagonal pattern background
const DiagonalPattern = ({
  className,
  patternColor = "hsl(var(--foreground))",
  patternOpacity = 0.15,
}: {
  className?: string;
  patternColor?: string;
  patternOpacity?: number;
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={cn("h-full w-full border-2 border-dashed", className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  );
};

export function BookTimeline() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Add state for the excerpt dialog
  const [openExcerpt, setOpenExcerpt] = useState(false);
  const [selectedBook, setSelectedBook] = useState<typeof shopBooks[0] | null>(null);
  
  // Function to open the excerpt dialog
  const handleOpenExcerpt = (book: typeof shopBooks[0]) => {
    setSelectedBook(book);
    setOpenExcerpt(true);
  };
  
  // Function to check if a book is a new release (less than 3 months old)
  const isNewRelease = (publishDate: string) => {
    const bookDate = new Date(publishDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return bookDate > threeMonthsAgo;
  };
  
  // Add sample themes for books
  const bookThemes = {
    "osaznatohranene": ["Здравословно хранене", "Психология", "Самопомощ"],
    "vdahnovenia-kniga-1": ["Вдъхновение", "Мотивация", "Личностно развитие"],
    "dnevnik-na-shtastieto": ["Щастие", "Благодарност", "Осъзнатост"],
    "vdahnovenia-kniga-2": ["Личностно развитие", "Преодоляване", "Цели"]
  };
  
  // Add sample quotes for books
  const bookQuotes = {
    "osaznatohranene": {
      text: "Тази книга промени начина, по който мисля за храната. Не е просто диета, а нов начин на живот.",
      author: "Мария С."
    },
    "vdahnovenia-kniga-1": {
      text: "Вдъхновяваща книга, която ми помогна да намеря светлина в тъмнината. Четем по глава всяка сутрин!",
      author: "Димитър К."
    },
    "dnevnik-na-shtastieto": {
      text: "Този дневник ме научи да намирам радост във всеки ден. Трансформиращ опит!",
      author: "Ивана П."
    },
    "vdahnovenia-kniga-2": {
      text: "Втората книга е още по-дълбока от първата. Намерих отговори на въпроси, които дори не знаех, че имам.",
      author: "Стефан М."
    }
  };
  
  // Get books for timeline (limit to 4 for example)
  const timelineBooks = shopBooks.slice(0, 4).map(book => {
    // Find a related service for this book - prefer MVP service first, then popular, then any featured service
    let relatedService = services.find(service => 
      service.relatedBookId === book.id && service.mvp && service.featured
    );
    
    // If no MVP service found, try a popular one
    if (!relatedService) {
      relatedService = services.find(service => 
        service.relatedBookId === book.id && service.popular && service.featured
      );
    }
    
    // Fallback to any featured service
    if (!relatedService) {
      relatedService = services.find(service => 
        service.relatedBookId === book.id && service.featured
      );
    }
    
    // Last resort - any service for this book
    if (!relatedService) {
      relatedService = services.find(service => 
        service.relatedBookId === book.id
      );
    }
    
    // If we still don't have a service, create a default one
    if (!relatedService) {
      relatedService = {
        id: `default-service-${book.id}`,
        title: language === 'bg' ? 'Консултация с автора' : 'Author Consultation',
        description: language === 'bg' ? 'Персонална среща с автора за обсъждане на тази книга' : 'Personal meeting with the author to discuss this book',
        duration: '60 минути',
        price: 80.00,
        category: 'individual',
        coverImage: '/images/placeholder-service.jpg',
        featured: true,
        popular: true,
        relatedBookId: book.id,
        image: '/images/placeholder-service.jpg'
      };
    }
    
    return {
      title: book.title,
      description: book.description,
      icon: BookText,
      image: {
        src: book.coverImage || "https://shadcnblocks.com/images/block/placeholder-1.svg",
        alt: book.title,
        id: book.id,
        price: book.price,
        publishDate: book.publishDate,
        featured: book.featured,
        pages: book.pages
      },
      service: relatedService,
      reverse: false, // We'll set this programmatically below
      bookData: book, // Add the full book data for the excerpt dialog
      themes: bookThemes[book.id as keyof typeof bookThemes] || ["Лично развитие", "Вдъхновение", "Мъдрост"],
      quote: bookQuotes[book.id as keyof typeof bookQuotes]
    };
  });
  
  // Set alternating reverse property
  timelineBooks.forEach((book, index) => {
    book.reverse = index % 2 === 1;
  });

  return (
    <section id="books" className="py-32 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px] pointer-events-none"></div>
      
      {/* Connecting element from author timeline section */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-20 bg-gradient-to-b from-green-500/50 via-green-500/30 to-transparent"></div>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-green-500/50 rounded-full flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      
      {/* Books Header */}
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <BookOpen className="size-4 text-green-600" />
            <span className="text-green-600 dark:text-green-400">{translate("Моите Книги", "My Books")}</span>
          </Badge>
                  
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            {translate("Литературни Творби", "Literary Works")}
          </h2>
                  
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            {translate(
              "Всяка книга има своя история. Проследете моето писателско пътуване и как всяка творба може да докосне вашия живот.",
              "Each book has its own story. Trace my writing journey and how each work may touch your life."
            )}
          </p>
        </div>
      </div>
      
      {/* Excerpt dialog */}
      {selectedBook && (
        <BookExcerptDialog
          book={{
            id: selectedBook.id,
            title: selectedBook.title,
            coverImage: selectedBook.coverImage,
            excerpt: selectedBook.excerpt
          }}
          open={openExcerpt}
          onOpenChange={setOpenExcerpt}
        />
      )}

      <div className="container overflow-hidden border-x pb-40 lg:pt-20 [&>*:last-child]:pb-20 [&>div>div:first-child]:!pt-20">
        {/* Books timeline with Timeline4 style */}
        {timelineBooks.map((book, index) => (
          <div key={index} className="relative flex">
            <div
              className={`flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10 ${book?.reverse ? "lg:flex-row-reverse lg:text-start" : ""} `}
            >
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">{book.title}</h3>
                
                {/* Book Metadata */}
                <div className={cn("flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 my-2", book?.reverse ? "" : "justify-end")}>
                  <span>{translate("Публикувано", "Published")}: {book.image.publishDate}</span>
                  <span>•</span>
                  <span>{book.image.pages} {translate("страници", "pages")}</span>
                  <span>•</span>
                  <span>{book.image.price.toFixed(2)} лв.</span>
                </div>
                
                {/* Book themes/tags */}
                <div className={cn("flex flex-wrap gap-2 mb-3", book?.reverse ? "" : "justify-end")}>
                  {book.themes.map((theme, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full flex items-center">
                      <Tag className="h-3 w-3 mr-1.5" />
                      {theme}
                    </span>
                  ))}
                </div>
                
                <p
                  className={`mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground ${book?.reverse ? "" : "ml-auto"}`}
                >
                  {book.description}
                </p>
                
                {/* Book quote with subtle styling */}
                {book.quote && (
                  <div className={`mt-4 max-w-[300px] p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg relative shadow-sm ${book?.reverse ? "" : "ml-auto"}`}>
                    <Quote className="absolute text-green-500/30 dark:text-green-400/20 h-5 w-5 -top-2 -left-2 rotate-180" />
                    <p className="text-sm italic text-gray-700 dark:text-gray-300">"{book.quote.text}"</p>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">— {book.quote.author}</p>
                  </div>
                )}
                
                {/* Action buttons */}
                <div className={`mt-4 flex gap-3 ${book?.reverse ? "" : "justify-end"}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-md border-green-500 text-green-600 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-950/20"
                    onClick={() => handleOpenExcerpt(book.bookData)}
                  >
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    {translate("Кратко Четиво", "Short Read")}
                  </Button>
                  
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                    asChild
                  >
                    <a href={`/shop/${book.image.id}`} className="flex items-center gap-1.5">
                      {translate("Прочети повече", "Read More")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="z-[-1] size-fit -translate-y-5 bg-background p-4 max-lg:-translate-x-4">
                <div className="rounded-[10px] border bg-card p-[5px] shadow-md">
                  <div className="size-fit rounded-md border bg-muted p-1">
                    <book.icon className="size-4 shrink-0" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">{book.title}</h3>
                  
                  {/* Mobile metadata */}
                  <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600 dark:text-gray-400 my-2">
                    <span>{translate("Публикувано", "Published")}: {book.image.publishDate}</span>
                    <span>•</span>
                    <span>{book.image.pages} {translate("страници", "pages")}</span>
                    <span>•</span>
                    <span>{book.image.price.toFixed(2)} лв.</span>
                  </div>
                  
                  {/* Mobile themes */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {book.themes.slice(0, 2).map((theme, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full flex items-center">
                        <Tag className="h-3 w-3 mr-1.5" />
                        {theme}
                      </span>
                    ))}
                  </div>
                  
                  <p className="mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground">
                    {book.description.length > 150 ? book.description.substring(0, 150) + "..." : book.description}
                  </p>
                  
                  {/* Mobile actions */}
                  <div className="flex gap-3 mb-8">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md border-green-500 text-green-600 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-950/20"
                      onClick={() => handleOpenExcerpt(book.bookData)}
                    >
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      {translate("Кратко Четиво", "Short Read")}
                    </Button>
                    
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                      asChild
                    >
                      <a href={`/shop/${book.image.id}`} className="flex items-center gap-1.5">
                        {translate("Прочети повече", "Read More")}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start justify-start">
                  <div className={` ${book?.reverse ? "lg:ml-auto" : ""}`}>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" patternColor="22c55e" patternOpacity={0.1} />
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <DiagonalPattern className="h-full w-6 lg:w-10" patternColor="22c55e" patternOpacity={0.1} />
                      <div className="relative w-[280px] lg:w-[340px] aspect-[2/3]">
                        <Image
                          src={book.image.src}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 280px, 340px"
                        />
                        
                        {/* Featured indicator on the cover */}
                        {book.image.featured && (
                          <div className="absolute top-3 right-3 p-2 rounded-full bg-amber-500/80 shadow-lg transform rotate-12">
                            <Award className="h-5 w-5 text-white" />
                          </div>
                        )}
                        
                        {/* New release indicator on the cover */}
                        {isNewRelease(book.image.publishDate) && (
                          <div className="absolute top-3 left-3 p-2 rounded-full bg-blue-500/80 shadow-lg transform -rotate-12">
                            <Star className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      <DiagonalPattern className="w-6 lg:w-10" patternColor="22c55e" patternOpacity={0.1} />
                    </div>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" patternColor="22c55e" patternOpacity={0.1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2 ${index === timelineBooks.length - 1 ? "bg-gradient-to-b from-foreground/10 via-foreground/10 to-transparent" : "bg-foreground/10"}`}
            >
              {index == 0 && (
                <div className="h-4 w-[3px] -translate-y-full bg-gradient-to-b from-transparent to-foreground/10"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="container relative z-10 mb-10 mt-4 border-t border-dashed border-green-300/30 dark:border-green-700/30 pt-10">
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full border-2 border-green-300 dark:border-green-700 flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        
        <div className="flex justify-center">
          <Button
            className="relative overflow-hidden bg-green-600 text-white h-auto px-8 py-4 border-2 border-green-500 dark:border-green-500 font-medium rounded-xl shadow-md transition-all duration-300 group hover:border-white hover:bg-green-700 dark:hover:bg-green-800"
            asChild
          >
            <a href="/shop" className="flex items-center gap-2 z-10">
              <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 dark:from-green-800 dark:to-green-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              <BookMarked className="h-5 w-5 text-white relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <span className="relative z-10">{translate("Разгледайте всички книги", "Browse All Books")}</span>
              <ArrowRight className="h-5 w-5 text-white relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-100" />
            </a>
          </Button>
        </div>
      </div>

      {/* Visual continuation - connects to next section */}
      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
} 