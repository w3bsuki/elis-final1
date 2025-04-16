"use client";

import { ArrowRight, BookOpen, Star, Bookmark, Quote, BookMarked, Library, Book, Clock, FileText, DollarSign, ShoppingCart, Play, Pause } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselApi, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { FlipCard } from "@/components/ui/flip-card";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, useSpring, useScroll, useVelocity, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import React from "react";

// Book images with proper paths in public folder
const shopBooks = [
  {
    id: "1",
    title: "Осъзнато хранене",
    description: "Научете как да развиете по-здравословна връзка с храната. Тази книга предлага практични съвети за осъзнато хранене и създаване на устойчиви здравословни навици.",
    coverImage: "/images/books/osaznato-hranene.jpg",
    price: "30.00",
    pages: 240,
    publishDate: "2023",
    category: "Health",
    featured: true,
    topics: ["Хранителни навици", "Психология", "Благополучие"],
    author: "Елена Петрова",
    quote: "Храната не е просто гориво, а връзка с природата и собственото ни тяло."
  },
  {
    id: "2",
    title: "Вдъхновения - 2",
    description: "Продължение на поредицата с поетични размисли и насоки за личностно развитие. Текстове, които ви помагат да намерите своя път към щастието.",
    coverImage: "/images/books/vdahnovenia-kniga-2.png",
    price: "26.00",
    pages: 184,
    publishDate: "2022",
    category: "Poetry",
    featured: false,
    topics: ["Поезия", "Мотивация", "Личностно развитие"],
    author: "Елена Петрова",
    quote: "Вдъхновението е мостът между мечтите и реалността."
  },
  {
    id: "3",
    title: "Вдъхновения - 1",
    description: "Сборник с вдъхновяващи мисли и поетични текстове. Идеален спътник в моменти на несигурност, предлагащ утеха и насърчение.",
    coverImage: "/images/books/vdahnovenia-kniga-1.png",
    price: "26.00",
    pages: 176,
    publishDate: "2021", 
    category: "Poetry",
    featured: false,
    topics: ["Поезия", "Вдъхновение", "Емоционално здраве"],
    author: "Елена Петрова",
    quote: "Всеки ден носи нови възможности за вдъхновение и растеж."
  },
  {
    id: "4",
    title: "Дневник на успеха",
    description: "Практическо ръководство за себепознание и личностно развитие. Книгата комбинира научни изследвания с практически упражнения за разгръщане на потенциала.",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg",
    price: "32.00",
    pages: 280,
    publishDate: "2022",
    category: "Self-help",
    featured: true,
    topics: ["Психология", "Себепознание", "Трансформация"],
    author: "Елена Петрова",
    quote: "Истинският успех започва със себепознание и завършва с действие."
  },
  {
    id: "5",
    title: "Дневник щастие",
    description: "Изследване на аспектите на любовта и как да изградим здравословни взаимоотношения. Научете как да създавате удовлетворяващи връзки с другите.",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    price: "28.50",
    pages: 210,
    publishDate: "2023",
    category: "Relationships",
    featured: false,
    topics: ["Взаимоотношения", "Любов", "Комуникация"],
    author: "Елена Петрова",
    quote: "Щастието не е крайна цел, а качество на пътуването."
  }
];

// Define the featured books
const featuredBooks = [
  {
    id: "4",
    title: "Дневник на успеха",
    description: "Практическо ръководство за себепознание и личностно развитие с научни изследвания и практически упражнения.",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg",
    price: "32.00",
    pages: 280,
    publishDate: "2022",
    topics: ["Психология", "Себепознание", "Трансформация"],
    author: "Елена Петрова",
    quote: "Истинският успех започва със себепознание и завършва с действие.",
    badge: {
      text: { en: "Best Seller", bg: "Бестселър" },
      icon: <Star className="w-4 h-4 text-black" />,
      bgClass: "from-amber-100 to-amber-50 dark:from-amber-800/40 dark:to-amber-900/20",
      textClass: "text-black dark:text-white",
      borderClass: "border-amber-200 dark:border-amber-700/50"
    }
  },
  {
    id: "1",
    title: "Осъзнато хранене",
    description: "Научете как да развиете по-здравословна връзка с храната и да създадете устойчиви здравословни навици.",
    coverImage: "/images/books/osaznato-hranene.jpg",
    price: "30.00",
    pages: 240,
    publishDate: "2023",
    topics: ["Хранителни навици", "Психология", "Благополучие"],
    author: "Елена Петрова",
    quote: "Храната не е просто гориво, а връзка с природата и собственото ни тяло.",
    badge: {
      text: { en: "Newest Book", bg: "Нова книга" },
      icon: <span className="text-sm text-black dark:text-white font-bold">🆕</span>,
      bgClass: "from-green-100 to-green-50 dark:from-green-800/40 dark:to-green-900/20",
      textClass: "text-black dark:text-white",
      borderClass: "border-green-200 dark:border-green-700/50"
    }
  },
  {
    id: "5",
    title: "Дневник щастие",
    description: "Изследване на аспектите на любовта и как да изградим здравословни взаимоотношения и удовлетворяващи връзки с другите.",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    price: "28.50",
    pages: 210,
    publishDate: "2023",
    topics: ["Взаимоотношения", "Любов", "Комуникация"],
    author: "Елена Петрова",
    quote: "Щастието не е крайна цел, а качество на пътуването.",
    badge: {
      text: { en: "Digital Book", bg: "Електронна книга" },
      icon: <span className="text-sm text-black dark:text-white font-bold">💻</span>,
      bgClass: "from-blue-100 to-blue-50 dark:from-blue-800/40 dark:to-blue-900/20",
      textClass: "text-black dark:text-white",
      borderClass: "border-blue-200 dark:border-blue-700/50"
    }
  }
];

// Custom FlipCard back component to enhance the information display
const EnhancedFlipCardBack = ({ 
  book, 
  translate, 
  onCtaClick 
}: { 
  book: typeof shopBooks[0], 
  translate: (bg: string, en: string) => string,
  onCtaClick: () => void
}) => {
  return (
    <div className="h-full w-full flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-5 relative overflow-hidden">
      {/* Decorative elements with enhanced gradients */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-bl-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-300/40 via-emerald-200/30 to-transparent dark:from-green-700/40 dark:via-emerald-800/30 rounded-tr-3xl" />
      
      {/* Book title with enhanced accent */}
      <div className="relative mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 pr-8 line-clamp-2">
          {book.title}
        </h3>
        <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mb-1"></div>
      </div>
      
      {/* Book metrics in a row with enhanced styling */}
      <div className="flex items-center justify-between mb-3 bg-green-50/80 dark:bg-green-900/40 rounded-lg p-2.5 border border-green-100/80 dark:border-green-800/50 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{book.pages} {translate("стр.", "pages")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{book.publishDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
          <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{book.price}</span>
        </div>
      </div>
      
      {/* Description with enhanced styling */}
      <div className="flex-grow mb-4 overflow-y-auto custom-scrollbar">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3">
          {book.description}
        </p>
        
        {/* Topics with enhanced badges */}
        {book.topics && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {book.topics.map((topic, index) => (
              <span key={index} className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-green-100/90 to-emerald-100/90 dark:from-green-900/60 dark:to-emerald-900/50 text-green-800 dark:text-green-300 rounded-full text-xs font-medium border border-green-200/90 dark:border-green-800/60 shadow-sm backdrop-blur-sm">
                {topic}
              </span>
            ))}
          </div>
        )}
        
        {/* Quote with enhanced styling */}
        {book.quote && (
          <div className="mb-3 pl-3 border-l-2 border-gradient-green">
            <p className="text-sm italic text-gray-600 dark:text-gray-400">
              "{book.quote}"
            </p>
            <p className="text-right mt-1 text-gray-700 dark:text-gray-300 text-xs">
              — {book.author}
            </p>
          </div>
        )}
      </div>
      
      {/* Buttons with enhanced styling */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={onCtaClick}
          className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
            hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium 
            transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transform hover:translate-y-[-1px]
            border border-green-400/20"
        >
          <span>{translate("Детайли", "Details")}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        
        <Link 
          href={`/shop/book/${book.id}`}
          className="flex-1 py-2 px-3 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
            text-gray-900 dark:text-white text-sm font-medium border border-white/70 dark:border-gray-700/70
            shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 hover:bg-white dark:hover:bg-gray-800
            transition-all duration-300 transform hover:translate-y-[-1px]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>{translate("Купи", "Buy")}</span>
        </Link>
      </div>
    </div>
  );
};

// Book Details Dialog component
const BookDetailsDialog = React.memo(({ 
  book, 
  translate, 
  isOpen, 
  onClose 
}: { 
  book: typeof shopBooks[0] | null, 
  translate: (bg: string, en: string) => string,
  isOpen: boolean,
  onClose: () => void
}) => {
  // Return null early if book is not provided
  if (!book) return null;
  
  // Content for book excerpts
  const bookExcerpts = React.useMemo(() => ({
    "1": {
      title: "Въведение в осъзнатото хранене",
      content: "Храненето е основен аспект на нашето ежедневие, но колко често наистина присъстваме в момента, докато се храним? В забързаното ежедневие често поглъщаме храната механично, без да обръщаме внимание на вкусовете, текстурите и аромата.\n\nOсъзнатото хранене е практика, която ни връща към настоящия момент. Това означава да обръщаме пълно внимание на храната - как изглежда, мирише, вкусва се, и как тялото ни реагира на нея.\n\nКогато се храним осъзнато, ние:\n• Забелязваме цветовете, аромата и текстурата на храната\n• Дъвчем бавно и усещаме пълния вкус\n• Разпознаваме без осъждане сигналите на тялото за глад и ситост\n• Оценяваме източника на храната и усилията за приготвянето й"
    },
    "2": {
      title: "От автора на Вдъхновения",
      content: "След успеха на първата книга от поредицата, много читатели споделиха как тези простички послания са променили перспективата им в трудни моменти. Това ме вдъхнови да продължа да споделям размисли, които ни напомнят за вечните истини.\n\nТази втора книга е събирала своите послания в продължение на три години - някои от тях са записани в ранни утрини, други в късни вечери. Всички обаче носят същата цел - да ви помогнат да намерите своя път към хармонията и щастието.\n\nНе е нужно да четете страниците последователно. Можете да отваряте книгата на произволно място и да позволите на съдбата да ви покаже точно това послание, от което се нуждаете в конкретния момент. Нека тези думи бъдат вашият тих спътник в дните, когато се нуждаете от малко повече яснота и вдъхновение."
    },
    "3": {
      title: "Силата на думите",
      content: "Думите имат огромна сила. Те могат да издигнат духа ни към неподозирани висоти или да ни потопят в мрак. Понякога дори една-единствена дума може да промени целия ни ден, а може би и целия ни живот.\n\nВ тази колекция от вдъхновяващи мисли и поетични послания, ще откриете думи, които резонират с вашия вътрешен свят. Думи, които може би ще ви помогнат да видите ситуациите от различен ъгъл или да намерите утеха в моменти на колебание и несигурност.\n\nВдъхновения не е просто книга. Това е спътник, който ви напомня, че не сте сами в търсенето на смисъл и радост, че всеки от нас преминава през подобни емоционални пътешествия, и че понякога най-голямата мъдрост се крие в най-простите истини."
    },
    "4": {
      title: "Първа стъпка към успеха",
      content: "Всяко пътуване към личностен растеж и успех започва с един прост, но решителен акт – себепознанието. Преди да можем да определим накъде искаме да вървим, трябва да разберем къде точно се намираме сега.\n\nТози дневник е създаден, за да ви помогне в това пътуване навътре към себе си. Той не е просто сборник от страници, а внимателно структурирано ръководство, съчетаващо съвременните научни изследвания в областта на позитивната психология с практически упражнения за ежедневно приложение.\n\nВ следващите страници ще откриете упражнения, които ще ви помогнат да идентифицирате вашите истински ценности, да преосмислите ограничаващите убеждения и да очертаете ясна визия за бъдещето, което желаете да създадете.\n\nПомнете, че истинският успех не е крайна дестинация, а пътуване. Нека този дневник бъде вашият верен спътник в това пътуване към по-осъзнат и изпълнен с цел живот."
    },
    "5": {
      title: "Формулата на щастието",
      content: "Ако попитате сто души какво означава щастие за тях, вероятно ще получите сто различни отговора. И все пак, в сърцевината на всички тези отговори можем да открием общи нишки, които свързват човешкия опит.\n\nЩастието не е просто положителна емоция или временно състояние на еуфория. То е по-скоро начин на съществуване, който включва пълноценни взаимоотношения, смислени преживявания и способност да оценяваме малките радости в ежедневието.\n\nВ тази книга ще изследваме научно обоснованите аспекти на щастието, но също така и древната мъдрост, която ни учи как да намерим удовлетворение независимо от външните обстоятелства.\n\nДневникът на щастието ви предлага не само теоретични знания, но и практически инструменти за създаване на по-дълбоки връзки с другите, за развиване на благодарност и за намиране на смисъл във всеки ден."
    }
  }), []);

  // Get the excerpt for this book - memoize to prevent unnecessary recalculations
  const excerpt = React.useMemo(() => {
    if (!book || !book.id) return {
      title: translate("Откъс от книгата", "Book Sample"),
      content: translate(
        "Представете си свят, в който вашите действия са в съответствие с вашите ценности. Представете си живот, в който всяко решение ви приближава към по-добрата версия на себе си. Тази книга е вашето ръководство към този нов свят, нов начин на мислене и действие...",
        "Imagine a world where your actions align with your values. Imagine a life where each decision brings you closer to the best version of yourself. This book is your guide to that new world, a new way of thinking and acting..."
      )
    };
    
    return bookExcerpts[book.id as keyof typeof bookExcerpts] || {
      title: translate("Откъс от книгата", "Book Sample"),
      content: translate(
        "Представете си свят, в който вашите действия са в съответствие с вашите ценности. Представете си живот, в който всяко решение ви приближава към по-добрата версия на себе си. Тази книга е вашето ръководство към този нов свят, нов начин на мислене и действие...",
        "Imagine a world where your actions align with your values. Imagine a life where each decision brings you closer to the best version of yourself. This book is your guide to that new world, a new way of thinking and acting..."
      )
    };
  }, [book, bookExcerpts, translate]);
  
  // Handle dialog close
  const handleOpenChange = React.useCallback((open: boolean) => {
    if (!open) onClose();
  }, [onClose]);
  
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl w-[80vw] max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl p-0 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 pt-8 pb-2">
          {/* Header section with book info and topics */}
          <DialogHeader className="px-1">
            <div className="flex items-start justify-between mb-2">
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white pr-4 flex items-center">
                {book.title}
                <span className="ml-3 text-green-600 dark:text-green-400 text-base font-bold">
                  {book.price} лв.
                </span>
              </DialogTitle>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1 items-center text-gray-600 dark:text-gray-400 text-xs">
                <BookOpen className="w-3 h-3" />
                <span>{book.pages} {translate("стр.", "pages")}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {book.topics?.map((topic, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50 text-xs px-1.5 py-0"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogHeader>
          
          {/* Main reading section with book cover and excerpt */}
          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-3 mb-3">
            {/* Book cover - smaller in this layout */}
            <div className="relative aspect-[3/4] w-full max-w-[120px] mx-auto md:mx-0 rounded-lg overflow-hidden shadow-md border border-white dark:border-gray-800">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Reading section */}
            <div className="flex flex-col">
              {/* Author quote as an introduction */}
              {book.quote && (
                <div className="mb-2 p-2 border-l-2 border-green-500 bg-green-50/50 dark:bg-green-900/20 rounded-r-md">
                  <p className="italic text-gray-600 dark:text-gray-400 text-xs">
                    "{book.quote}"
                  </p>
                  <p className="text-right mt-1 text-gray-700 dark:text-gray-300 text-xs">
                    — {book.author}
                  </p>
                </div>
              )}
              
              {/* Chapter title */}
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {excerpt.title}
              </h3>
            </div>
          </div>
          
          {/* Book excerpt in a nice reading format */}
          <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-3 bg-white dark:bg-gray-800 shadow-inner">
            {/* Reading progress indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
              <div className="h-full w-[15%] bg-green-500 dark:bg-green-600 rounded-r-full"></div>
            </div>
            
            {/* Book content */}
            <div className="prose dark:prose-invert prose-green max-w-none prose-sm">
              <p className="whitespace-pre-line leading-relaxed text-gray-800 dark:text-gray-200 text-xs">
                {excerpt.content}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-center text-xs">
                {translate("Продължава на следващата страница...", "Continues on the next page...")}
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer with actions */}
        <DialogFooter className="flex border-t border-gray-100 dark:border-gray-800 p-2 bg-gray-50 dark:bg-gray-800/50">
          <DialogClose asChild>
            <Button variant="outline" size="sm" className="mr-auto h-8 text-xs">
              {translate("Затвори", "Close")}
            </Button>
          </DialogClose>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              {translate("Запази", "Save")}
            </Button>
            
            <Link
              href={`/shop/book/${book.id}`}
              className="inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-medium h-8
                bg-gradient-to-r from-green-500 to-teal-500 
                text-white
                border border-green-400/50 dark:border-green-600/30 
                shadow-md hover:shadow-lg transition-all duration-300
                hover:from-green-600 hover:to-teal-600"
            >
              <span>{translate("Купи сега", "Buy Now")}</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

BookDetailsDialog.displayName = "BookDetailsDialog";

export default function BooksSection() {
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Add state for carousel and container widths
  const [containerWidth, setContainerWidth] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  
  // State for selected book and dialog
  const [selectedBook, setSelectedBook] = useState<typeof shopBooks[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Handle opening book details
  const handleBookDetails = (book: typeof shopBooks[0]) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  // Create a duplicate array of books for infinite scrolling
  const duplicatedBooks = [...shopBooks, ...shopBooks, ...shopBooks];
  
  // Add effect to measure carousel and container widths
  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current && carouselRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setCarouselWidth(carouselRef.current.scrollWidth);
      }
    };
    
    // Initial measurement
    updateWidths();
    
    // Measure on resize
    window.addEventListener('resize', updateWidths);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateWidths);
  }, []);
  
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    let animationId: number;
    
    // Initial animation setup
    const animate = () => {
      if (isPaused) return;
      
      // Get the current position of the carousel
      const currentX = x.get();
      
      // Get the width of a book item (assuming all books have same width)
      const bookItemWidth = 250; // Reduced width for more compact cards
      
      // Calculate the total width of all books
      const totalWidth = duplicatedBooks.length * bookItemWidth;
      
      // Reset position when reaching the end
      if (currentX <= -totalWidth / 3) {
        x.set(0);
      } else {
        // Move 0.25px per frame for slower scrolling (right to left direction)
        x.set(currentX - 0.25);
      }
      
      // Continue animation if not paused
      if (!isPaused) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    // Start animation if not paused
    if (!isPaused) {
      animationId = requestAnimationFrame(animate);
    }
    
    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, duplicatedBooks.length, x, carouselWidth, containerWidth]);
  
  return (
    <div className="relative z-0 py-4 md:py-6">
      {/* Book details dialog */}
      <BookDetailsDialog 
        book={selectedBook} 
        translate={translate} 
        isOpen={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
      />
      
      {/* Decorative background elements */}
      <div className="absolute right-[10%] top-[10%] w-[400px] h-[400px] bg-gradient-to-br from-green-300/40 via-emerald-200/40 to-teal-300/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute left-[5%] bottom-[20%] w-[300px] h-[300px] bg-gradient-to-tr from-emerald-200/40 via-green-300/40 to-teal-200/40 rounded-full blur-[120px] -z-10 animate-pulse-slower"></div>
      
      {/* Main container */}
      <div className="w-full h-full flex flex-col rounded-xl sm:rounded-2xl
          bg-gradient-to-br from-white/80 via-white/90 to-white/80 
          dark:from-gray-900/80 dark:via-gray-900/85 dark:to-gray-900/80
          border border-white/40 dark:border-white/10
          shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)]
          dark:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)]
          overflow-hidden
          max-w-[1600px] mx-auto">
        
        {/* Inner container with enhanced gradients */}
        <div className="bg-gradient-to-br from-green-50/40 via-transparent to-emerald-50/40 
            dark:from-green-900/20 dark:via-transparent dark:to-emerald-900/20 
            px-3 sm:px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-6 relative flex-grow flex flex-col">
          
          {/* Accent gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.2),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.2),transparent_50%)] pointer-events-none"></div>
          
          {/* Content Container */}
          <div className="relative z-10 w-full">
            {/* Section header - more compact */}
            <div className="text-center mb-4 md:mb-5 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center justify-center"
              >
                {/* Section badge with improved styling */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/50 dark:to-amber-900/30 rounded-full mb-3 border border-amber-200/60 dark:border-amber-800/40 shadow-md backdrop-blur-sm">
                  <Book className="h-3.5 w-3.5 text-amber-700 dark:text-amber-300" />
                  <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                    {language === 'en' ? "Resources" : "Ресурси"}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 
                  bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400
                  bg-clip-text text-transparent drop-shadow-sm">
                  {language === 'en' ? "Featured Books" : "Препоръчани Книги"}
                </h2>
                
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {language === 'en' 
                    ? "Explore our curated collection of transformative books that will elevate your personal growth journey." 
                    : "Разгледайте нашата селекция от трансформиращи книги, които ще издигнат вашето лично пътуване за развитие."}
                </p>
              </motion.div>
            </div>

            {/* Featured books section - Grid of 3 featured books with more compact cards */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { 
                    staggerChildren: 0.12,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 relative z-10 mb-5 md:mb-6"
            >
              {featuredBooks.map((book, index) => (
                <motion.div 
                  key={book.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { 
                        type: "spring", 
                        stiffness: 80, 
                        damping: 12,
                        mass: 0.5 
                      }
                    }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="h-full group"
                >
                  {/* Card with glass morphism styling - reduced height */}
                  <div className="rounded-lg overflow-hidden h-[320px]
                    bg-white/50 dark:bg-gray-800/50
                    backdrop-blur-md
                    border border-white/40 dark:border-gray-700/60
                    shadow-[0_10px_20px_rgba(0,0,0,0.1)]
                    dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)]
                    group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] 
                    dark:group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                    transition-all duration-500 ease-out relative">
                    
                    {/* Using FlipCard for the book */}
                    <FlipCard
                      frontImage={book.coverImage}
                      frontTitle={book.title}
                      frontSubtitle=""
                      frontIcon={<BookOpen className="h-3.5 w-3.5" />}
                      frontFooter={book.price + " лв."}
                      triggerMode="hover"
                      onCtaClick={() => handleBookDetails(book)}
                      backComponent={
                        <EnhancedFlipCardBack
                          book={book}
                          translate={translate}
                          onCtaClick={() => handleBookDetails(book)}
                        />
                      }
                      className="h-full"
                      frontClassName="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                      backClassName="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                    />
                    
                    {/* Badge positioned on top of the card - smaller badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1",
                        "rounded-full",
                        `bg-gradient-to-r ${book.badge.bgClass}`,
                        book.badge.textClass,
                        "border",
                        book.badge.borderClass,
                        "shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300",
                        "text-xs font-semibold backdrop-blur-sm"
                      )}>
                        {book.badge.icon}
                        <span className="whitespace-nowrap">{translate(book.badge.text.bg, book.badge.text.en)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Book Carousel Section with enhanced glass morphism - more compact */}
            <div ref={containerRef} className="relative overflow-hidden py-4 mb-4">
              <div className="rounded-lg overflow-hidden 
                bg-white/40 dark:bg-gray-800/40
                backdrop-blur-md
                border border-white/40 dark:border-gray-700/60
                shadow-[0_10px_25px_rgba(0,0,0,0.1)]
                dark:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
                relative">
                
                {/* Carousel header - more compact */}
                <div className="flex justify-between items-center mb-4 p-3 relative z-10 border-b border-white/40 dark:border-gray-700/60 bg-gradient-to-r from-white/70 to-white/20 dark:from-gray-800/70 dark:to-gray-800/20">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full p-1.5 bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md">
                      <Library className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                      {translate("Всички книги", "All Books")}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                      <BookOpen className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-xs">
                        {translate(
                          "Задръжте или натиснете върху книга за повече информация",
                          "Hover or tap on a book for more information"
                        )}
                      </span>
                    </div>
                    
                    {/* Pause/Play button - smaller */}
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="relative overflow-hidden rounded-full w-8 h-8 
                        flex items-center justify-center 
                        bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700
                        text-white 
                        focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2
                        transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg
                        after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 
                        after:bg-gradient-to-br after:from-white/20 after:to-transparent after:rounded-full"
                      aria-label={isPaused ? translate("Възобнови въртенето", "Resume rotation") : translate("Паузирай въртенето", "Pause rotation")}
                    >
                      {isPaused ? (
                        <Play className="h-3.5 w-3.5 relative z-10" />
                      ) : (
                        <Pause className="h-3.5 w-3.5 relative z-10" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Carousel with drag functionality - more compact */}
                <div className="px-4 pb-4 relative overflow-hidden">
                  <motion.div
                    ref={carouselRef}
                    className="flex gap-4 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ 
                      left: -Math.max(0, carouselWidth - containerWidth + 40), 
                      right: 0 
                    }}
                    style={{ x }}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                    onDragStart={() => setIsPaused(true)}
                  >
                    {duplicatedBooks.map((book, index) => (
                      <div 
                        key={`${book.id}-${index}`}
                        className="w-60 flex-shrink-0 group"
                      >
                        <div className="h-[280px] rounded-lg overflow-hidden
                          bg-white/50 dark:bg-gray-800/50
                          backdrop-blur-md
                          border border-white/40 dark:border-gray-700/60
                          shadow-[0_10px_20px_rgba(0,0,0,0.1)]
                          dark:shadow-[0_10px_20px_rgba(0,0,0,0.3)]
                          group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] 
                          dark:group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                          transition-all duration-500 ease-out
                          transform group-hover:translate-y-[-5px]">
                          {/* Using FlipCard with better styling */}
                          <FlipCard
                            frontImage={book.coverImage}
                            frontTitle={book.title}
                            frontSubtitle=""
                            frontIcon={<BookOpen className="h-3.5 w-3.5" />}
                            frontFooter={book.price + " лв."}
                            triggerMode="hover"
                            onCtaClick={() => handleBookDetails(book)}
                            backComponent={
                              <EnhancedFlipCardBack
                                book={book}
                                translate={translate}
                                onCtaClick={() => handleBookDetails(book)}
                              />
                            }
                            className="h-full"
                            frontClassName="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                            backClassName="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              {/* Gradient fade on the left - enhanced */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none"></div>
              
              {/* Gradient fade on the right - enhanced */}
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent dark:from-gray-950 dark:to-transparent z-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 