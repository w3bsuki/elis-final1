"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { FlipCard } from "@/components/ui/flip-card";
import Image from "next/image";
import { useManualAutoScroll } from "@/components/ui/auto-scroll";
import { useState, useEffect } from "react";

// Sample book data - would come from API or CMS
const shopBooks = [
  {
    id: "1",
    title: "Осъзнато хранене",
    description: "Научете как да развиете по-здравословна връзка с храната и да трансформирате начина, по който се храните.",
    coverImage: "/images/books/osaznato-hranene.jpg",
    price: "30.00",
    pages: 240,
    publishDate: "2023",
    category: "Health",
    featured: true
  },
  {
    id: "2",
    title: "Вдъхновения - Книга 2",
    description: "Продължение на поредицата с поетични размисли и насоки за личностно развитие в трудни моменти.",
    coverImage: "/images/books/vdahnovenia-kniga-2.png",
    price: "26.00",
    pages: 184,
    publishDate: "2022",
    category: "Poetry",
    featured: false
  },
  {
    id: "3",
    title: "Вдъхновения - Книга 1",
    description: "Сборник с вдъхновяващи мисли и поетични текстове за преодоляване на житейски трудности.",
    coverImage: "/images/books/vdahnovenia-kniga-1.png",
    price: "26.00",
    pages: 176,
    publishDate: "2021",
    category: "Poetry",
    featured: false
  },
  {
    id: "4",
    title: "Преоткрий Себе Си",
    description: "Практическо ръководство за себепознание и личностно развитие чрез психологически подходи.",
    coverImage: "/images/books/preotkrij-sebe-si.jpg",
    price: "32.00",
    pages: 280,
    publishDate: "2022",
    category: "Self-help",
    featured: true
  },
  {
    id: "5",
    title: "Изкуството да обичаш",
    description: "Изследване на различните аспекти на любовта и как да изградим здравословни взаимоотношения.",
    coverImage: "/images/books/izkustvoto-da-obichash.jpg",
    price: "28.50",
    pages: 210,
    publishDate: "2023",
    category: "Relationships",
    featured: false
  }
];

// Define the featured book
const featuredBook = {
  id: "4",
  title: "Преоткрий Себе Си",
  description: "Това практическо ръководство ви предлага набор от упражнения, размисли и техники за по-дълбоко опознаване на себе си. Базирано на съвременни психологически подходи, книгата ви помага да идентифицирате вашите силни страни, ценности и цели, и да ги използвате като основа за по-автентичен и удовлетворяващ живот.",
  coverImage: "/images/books/preotkrij-sebe-si.jpg",
  price: "32.00",
  pages: 280,
  publishDate: "2022"
};

export default function BooksSection() {
  const { language } = useLanguage();
  const [carouselApi, setCarouselApi] = useState<any>(null);
  
  // Use the manual auto-scroll hook
  useManualAutoScroll(carouselApi, {
    enabled: true,
    speed: 1,
    direction: "forward",
    stopOnInteraction: true
  });
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'en' ? en : bg;
  
  return (
    <div className="relative z-0">
      {/* Section header */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-3 px-4 py-1.5 text-sm rounded-full border-primary/40 bg-primary/5">
          <BookOpen className="w-4 h-4 mr-2 text-primary" />
          {translate("Избрана колекция", "Featured Collection")}
        </Badge>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
          {translate("Моите Книги", "My Books")}
        </h2>
        
        <div className="w-16 h-1 bg-primary/40 rounded-full mx-auto mb-3"></div>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          {translate(
            "Разгледайте моята колекция от книги за личностно развитие и емоционално благополучие.",
            "Browse my collection of books on personal development and emotional well-being."
          )}
        </p>
      </div>
      
      {/* Book Carousel */}
      <div className="mb-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setCarouselApi}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {shopBooks.map((book, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="h-[380px]">
                  <FlipCard 
                    frontImage={book.coverImage}
                    frontTitle={book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title}
                    frontSubtitle={`${book.price} лв.`}
                    frontIcon={book.featured ? <Star className="w-4 h-4 fill-amber-500" /> : <BookOpen className="w-4 h-4" />}
                    backTitle={book.title.length > 20 ? book.title.substring(0, 20) + '...' : book.title}
                    backDescription={book.description.substring(0, 80) + '...'}
                    backFeatures={[
                      translate("Издадена", "Published") + ": " + book.publishDate,
                      translate("Страници", "Pages") + ": " + book.pages
                    ]}
                    backCta={translate("Купи сега", "Buy Now")}
                    onCtaClick={() => window.location.href = `/book/${book.id}`}
                    triggerMode="hover"
                    popular={book.featured}
                    className="h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700" />
            <CarouselNext className="right-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700" />
          </div>
        </Carousel>
      </div>
      
      {/* View All Books CTA */}
      <div className="flex justify-center mt-6 mb-16">
        <Button
          variant="outline"
          size="default"
          className="rounded-full shadow-md border-2 border-primary/30 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90"
          onClick={() => window.location.href = '/books'}
        >
          <span className="flex items-center">
            {translate("Разгледай всички книги", "Browse All Books")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </span>
        </Button>
      </div>
    </div>
  );
} 