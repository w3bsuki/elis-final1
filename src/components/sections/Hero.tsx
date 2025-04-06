"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { 
  ArrowRight, 
  ChevronRight,
  Sparkle, 
  Star,
  Medal,
  Mail,
  BookOpen,
  Clock,
  Trophy,
  Users,
  BookMarked,
  Download,
  Sparkles,
  Check,
  CornerDownRight,
  Feather,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Briefcase,
  Eye,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { shopBooks } from "@/lib/shop-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FlipCard } from "@/components/ui/flip-card";
import { services as allServices } from "@/data/services";
import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";

export default function Hero() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Get featured book
  const featuredBook = shopBooks.find(book => book.featured) || shopBooks[0];
  
  // Features list
  const authorFeatures = [
    {
      icon: BookMarked,
      text: translate("Автор на 12+ книги", "Author of 12+ books")
    },
    {
      icon: Trophy,
      text: translate("3 национални награди", "3 national awards")
    },
    {
      icon: Users,
      text: translate("50,000+ читатели", "50,000+ readers")
    }
  ];

  return (
    <>
      <style jsx global>{`
        .perspective {
          perspective: 2000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transform-origin: center left;
        }
        .carousel-book-container {
          display: inline-block;
          perspective: 1200px;
        }
        .carousel-book {
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .carousel-book:hover {
          transform: rotateY(-30deg);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover-rotate-y-30 {
          transform: rotateY(-30deg);
        }
      `}</style>
      
      <section className="relative min-h-[85vh] flex flex-col justify-start overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-2 pb-8">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full border-2 border-dashed border-primary/20 opacity-60 animate-spin-slow"></div>
          <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full border-2 border-dashed border-amber-500/20 opacity-60 animate-spin-slow"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 rotate-12 opacity-20 dark:opacity-10">
            <Feather className="h-12 w-12 text-primary" />
          </div>
          <div className="absolute bottom-20 right-10 -rotate-12 opacity-20 dark:opacity-10">
            <Sparkle className="h-12 w-12 text-amber-500" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          {/* Modern nested container */}
          <div className="max-w-7xl mx-auto relative">
            {/* Main content container with nested card design */}
            <motion.div
              className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl p-0.5 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main content inner container with gradient outline */}
              <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
                {/* Glass panel effect with inner shadow */}
                <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-10 items-center">
                    {/* Left side - Author Presentation */}
                    <motion.div 
                      className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Author badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-5"
                      >
                        <Badge variant="outline" className="px-4 py-1.5 text-xs font-medium rounded-full border-primary/30 bg-background/50 backdrop-blur-sm shadow-sm">
                          <Star className="w-3.5 h-3.5 mr-1.5 text-amber-500 fill-amber-500" />
                          {translate("Отличен автор", "Award-winning author")}
                        </Badge>
                      </motion.div>
                      
                      {/* Author name and title */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <div className="flex lg:items-start items-center flex-col">
                          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 font-serif bg-gradient-to-r from-gray-900 via-gray-700 to-gray-950 dark:from-gray-100 dark:via-gray-300 dark:to-gray-200 bg-clip-text text-transparent">
                            {translate("Елис Павлова", "Elis Pavlova")}
                          </h1>
                          <div className="w-20 h-1.5 bg-primary rounded-full mb-3"></div>
                          <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium">
                            {translate("Автор • Психолог • Коуч", "Author • Psychologist • Coach")}
                          </h2>
                        </div>
                      </motion.div>
                      
                      {/* Author features */}
                      <motion.div 
                        className="flex flex-col space-y-2 mt-6 max-w-md"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {authorFeatures.map((feature, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                              <feature.icon className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      {/* Author bio preview */}
                      <motion.p 
                        className="mt-5 text-gray-600 dark:text-gray-400 max-w-xl text-sm sm:text-base"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        {translate(
                          "Вдъхновяващи книги и експертни насоки за личностно израстване, емоционално благополучие и трансформация на съзнанието.",
                          "Inspiring books and expert guidance for personal growth, emotional well-being, and transformation of the mind."
                        )}
                      </motion.p>
                      
                      {/* CTA buttons */}
                      <motion.div 
                        className="flex flex-wrap gap-4 mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="premium"
                              size="lg"
                              rounded="full"
                              className="shadow-lg group relative"
                            >
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                              <span className="relative flex items-center gap-2">
                                <div className="size-2 rounded-full bg-white"></div>
                                {translate("За мен", "About Me")}
                              </span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <div className="flex items-center gap-4">
                                <Avatar className="size-16 border-2 border-primary/20 shadow-lg">
                                  <AvatarImage
                                    src="/images/author/elis-avatar.jpg"
                                    alt="Elis Pavlova"
                                    width={64}
                                    height={64}
                                    loading="eager"
                                  />
                                  <AvatarFallback>EP</AvatarFallback>
                                </Avatar>
                                <div>
                                  <DialogTitle className="text-2xl font-serif">
                                    {translate("Елис Павлова", "Elis Pavlova")}
                                  </DialogTitle>
                                  <DialogDescription className="text-lg font-medium">
                                    {translate("Автор • Психолог • Коуч", "Author • Psychologist • Coach")}
                                  </DialogDescription>
                                </div>
                              </div>
                            </DialogHeader>
                            <div className="space-y-4 mt-6">
                              <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left text-gray-700 dark:text-gray-300">
                                {translate(
                                  "Елис е утвърден автор с над 10 години опит в областта на психологията и личностното развитие. Нейните книги съчетават научни знания с практически подходи за подобряване на емоционалното благополучие и качеството на живот.",
                                  "Elis is an established author with over 10 years of experience in psychology and personal development. Her books combine scientific knowledge with practical approaches to improving emotional well-being and quality of life."
                                )}
                              </p>
                              <p className="text-gray-700 dark:text-gray-300">
                                {translate(
                                  "Чрез своите книги, курсове и консултации, тя помага на хиляди хора да открият своя потенциал и да живеят по-пълноценно.",
                                  "Through her books, courses, and consultations, she has helped thousands of people discover their potential and live more fulfilling lives."
                                )}
                              </p>
                              <p className="text-gray-700 dark:text-gray-300">
                                {translate(
                                  "Елис е завършила психология и има магистърска степен по когнитивна наука. Тя е сертифициран коуч и редовно провежда семинари и работилници по въпросите на личностното развитие и емоционалната интелигентност.",
                                  "Elis has a degree in psychology and a master's degree in cognitive science. She is a certified coach and regularly conducts seminars and workshops on personal development and emotional intelligence."
                                )}
                              </p>
                              <div className="flex flex-wrap gap-4 mt-6">
                                <Button
                                  variant="default"
                                  size="lg"
                                  onClick={() => window.location.href = '/books'}
                                >
                                  {translate("Моите книги", "My Books")}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="lg"
                                  onClick={() => window.location.href = '/contact'}
                                >
                                  {translate("Свържете се", "Contact Me")}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="outline"
                          size="lg"
                          rounded="full"
                          className="border-2 shadow-md"
                          onClick={() => window.location.href = '/books'}
                        >
                          <BookOpen className="w-5 h-5 mr-2" />
                          {translate("Разгледай книгите", "Browse Books")}
                        </Button>
                      </motion.div>
                    </motion.div>
                    
                    {/* Right side - Featured Book Showcase */}
                    <motion.div 
                      className="w-full lg:w-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="relative">
                        {/* Background decoration */}
                        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/5 to-amber-500/5 blur-lg"></div>
                        
                        {/* Book card container */}
                        <motion.div
                          className="relative bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 shadow-xl overflow-hidden"
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          {/* Decorative elements */}
                          <div className="absolute top-0 right-0 -mt-4 -mr-4 size-20 bg-primary/10 rounded-full blur-xl"></div>
                          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 size-20 bg-amber-500/10 rounded-full blur-xl"></div>
                          
                          {/* New release badge */}
                          <div className="absolute -right-12 top-6 bg-amber-500 text-white py-1 px-12 shadow-md transform rotate-45 text-sm font-semibold">
                            {translate("Ново", "New")}
                          </div>
                          
                          <div className="relative z-10">
                            <div className="flex flex-col md:flex-row gap-6">
                              {/* FlipCard component size adjusted */}
                              <div className="relative mx-auto md:mx-0 h-[320px] w-[200px]">
                                <FlipCard 
                                  frontImage={featuredBook.coverImage}
                                  frontTitle={featuredBook.title}
                                  frontSubtitle={translate("Премиум издание", "Premium Edition")}
                                  frontIcon={<BookOpen className="w-5 h-5" />}
                                  backTitle={featuredBook.title}
                                  backDescription={featuredBook.description}
                                  backFeatures={[
                                    translate("Издадена", "Published") + ": " + featuredBook.publishDate,
                                    translate("Страници", "Pages") + ": " + featuredBook.pages,
                                    translate("Цена", "Price") + ": " + featuredBook.price + " лв."
                                  ]}
                                  backCta={translate("Купи сега", "Buy Now")}
                                  onCtaClick={() => window.location.href = `/book/${featuredBook.id}`}
                                  triggerMode="hover"
                                  popular={featuredBook.featured}
                                  className="h-full"
                                />
                              </div>
                              
                              {/* Book details - slightly more compact */}
                              <div className="flex-1 flex flex-col">
                                <Badge variant="premium" className="w-fit mb-3 py-1 px-3">
                                  <Sparkles className="w-4 h-4 mr-1.5" />
                                  {translate("Най-нова книга", "Latest Release")}
                                </Badge>
                                
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                  {featuredBook.title}
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">
                                  {featuredBook.description}
                                </p>
                                
                                {/* Book features */}
                                <div className="space-y-1.5 mb-4 text-sm">
                                  {[
                                    { text: translate("Издадена", "Published") + ": " + featuredBook.publishDate },
                                    { text: translate("Страници", "Pages") + ": " + featuredBook.pages },
                                    { text: translate("Цена", "Price") + ": " + featuredBook.price + " лв." }
                                  ].map((item, idx) => (
                                    <div key={idx} className="flex items-center text-gray-600 dark:text-gray-400">
                                      <CornerDownRight className="w-4 h-4 mr-2 text-primary" />
                                      <span>{item.text}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                {/* Action buttons */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                  <Button
                                    variant="premium"
                                    size="lg"
                                    className="flex-1"
                                    onClick={() => window.location.href = `/book/${featuredBook.id}`}
                                  >
                                    {translate("Купи сега", "Buy Now")}
                                  </Button>
                                  
                                  <Button
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                    onClick={() => window.location.href = `/preview/${featuredBook.id}`}
                                  >
                                    {translate("Преглед", "Preview")}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Newsletter signup with nested design */}
                  <motion.div 
                    className="max-w-2xl mx-auto mt-10 relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    {/* Background glow */}
                    <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-amber-500/10 blur-xl"></div>
                    
                    {/* Newsletter container with layered design */}
                    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
                      {/* Layered header */}
                      <div className="bg-gradient-to-r from-primary/20 to-amber-500/20 h-2 w-full"></div>
                      
                      {/* Main newsletter content */}
                      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 relative">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-amber-500/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 size-40 bg-primary/10 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                          <NewsletterSignup 
                            variant="premium"
                            showFreeOffer={true}
                            showIcon={true}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Book Carousel in dedicated nested container */}
                  <div className="relative mt-10 mb-6">
                    {/* Visual connector between containers */}
                    <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary/40 to-primary/10"></div>
                    
                    <motion.div
                      className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl p-0.5 overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {/* Container inner gradient */}
                      <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
                        {/* Glass panel effect with inner shadow */}
                        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
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
                              className="w-full"
                              plugins={[
                                AutoScroll({
                                  speed: 1,
                                  direction: "forward",
                                  stopOnInteraction: false,
                                  stopOnMouseEnter: true
                                }),
                              ]}
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
                              rounded="full"
                              className="shadow-md border-2 border-primary/30 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90"
                              onClick={() => window.location.href = '/books'}
                            >
                              <span className="flex items-center">
                                {translate("Разгледай всички книги", "Browse All Books")}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Services Section - Directly inside main Hero container, not nested in Books container */}
                  <div className="relative mt-10 mb-6">
                    {/* Visual connector between sections */}
                    <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-primary/40 to-purple-500/30"></div>
                    
                    {/* Services inner container with nested card design */}
                    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-0.5 overflow-hidden">
                      {/* Container inner gradient */}
                      <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
                        {/* Glass panel effect with inner shadow */}
                        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-20 left-20 size-60 bg-purple-500/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-20 size-60 bg-primary/5 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                          <div className="text-center mb-14">
                            <Badge variant="outline" className="mb-3 px-4 py-1.5 text-sm rounded-full border-purple-400/40 bg-purple-500/5">
                              <Briefcase className="w-4 h-4 mr-2 text-purple-500" />
                              {translate("Професионални услуги", "Professional services")}
                            </Badge>
                            
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif">
                              {translate("Как Мога Да Помогна", "How I Can Help")}
                            </h2>
                            
                            <div className="w-16 h-1 bg-purple-500/40 rounded-full mx-auto mb-3"></div>
                            
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                              {translate(
                                "Предлагам разнообразни услуги, фокусирани върху личностно развитие, творческо писане и професионални умения.",
                                "I offer a variety of services focused on personal development, creative writing, and professional skills."
                              )}
                            </p>
                          </div>
                          
                          {/* Instruction text */}
                          <div className="flex justify-center mb-10">
                            <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full py-2 px-4 shadow-sm flex items-center gap-2">
                              <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                {translate("Разгледайте всеки раздел за повече информация", "Hover over each card to see more details")}
                              </span>
                            </div>
                          </div>
                          
                          {/* Services Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                            {allServices.slice(0, 4).map((service, index) => (
                              <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-[360px]"
                                whileHover={{ 
                                  y: -5,
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {/* Service Card */}
                                <div className="h-full relative group">
                                  {/* Group hover glow effect */}
                                  <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400/0 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 group-hover:from-purple-400/20 group-hover:to-primary/20 blur-md transition-all duration-500"></div>
                                  
                                  {/* Inner container with glass effect */}
                                  <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg p-0.5 h-full relative overflow-hidden">
                                    {/* Glass panel effect */}
                                    <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                                    
                                    <FlipCard
                                      frontImage={service.coverImage}
                                      frontTitle={service.title}
                                      frontSubtitle={service.description.split('.')[0] + '.'}
                                      frontIcon={<Package className="h-4 w-4" />}
                                      backTitle={service.title}
                                      backDescription={service.description}
                                      backFeatures={service.includes || []}
                                      backCta={translate("Научи повече", "Learn More")}
                                      onCtaClick={() => window.location.href = `/services/${service.id}`}
                                      popular={(service as any).popular}
                                      className="h-full relative z-10"
                                      triggerMode="hover"
                                    />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* View All Services CTA */}
                          <div className="flex justify-center mt-6">
                            <Button
                              variant="outline"
                              size="default"
                              rounded="full"
                              className="shadow-md border-2 border-purple-200/50 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90"
                              onClick={() => window.location.href = '/services'}
                            >
                              <span className="flex items-center">
                                {translate("Разгледай всички услуги", "View All Services")}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonials Section - Directly inside main Hero container */}
                  <div className="relative mt-10 mb-6">
                    {/* Visual connector between sections */}
                    <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-purple-500/30 to-blue-500/30"></div>
                    
                    {/* Place Testimonials directly here without extra container wrappers */}
                    <Testimonials />
                  </div>
                  
                  {/* Contact Section - Directly inside main Hero container */}
                  <div className="relative mt-10 mb-6">
                    {/* Visual connector between sections */}
                    <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-blue-500/30 to-green-500/30"></div>
                    
                    {/* Contact inner container with nested card design */}
                    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-0.5 overflow-hidden">
                      {/* Container inner gradient */}
                      <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 relative overflow-hidden">
                        {/* Glass panel effect with inner shadow */}
                        <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>
                        
                        {/* Contact component integrated into Hero */}
                        <Contact />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Bottom navigation indicators */}
            <motion.div
              className="flex justify-center mt-6 gap-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              {[0, 1, 2].map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "size-2.5 rounded-full transition-all",
                    idx === 0 
                      ? "bg-primary scale-125" 
                      : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
                  )}
                ></div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Background wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-950 overflow-hidden pointer-events-none">
          <svg className="absolute bottom-0 w-full h-48" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-white dark:fill-gray-950" d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,80C840,85,960,75,1080,64C1200,53,1320,43,1380,37.3L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
} 