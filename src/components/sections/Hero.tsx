"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  ArrowDown, 
  BookOpen, 
  ChevronRight, 
  Star, 
  Award, 
  Calendar, 
  BookText,
  ChevronLeft,
  TrendingUp, 
  Feather,
  Quote,
  ArrowRight,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { shopBooks } from "@/lib/shop-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

export default function Hero() {
  const { language } = useLanguage();
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Find the featured book (primary showcase)
  const featuredBook = shopBooks.find(book => book.featured) || shopBooks[0];
  
  // Find the newest book (as upcoming/new release)
  const newestBook = [...shopBooks].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )[0];
  
  // Check if a book is a new release (less than 3 months old)
  const isNewRelease = (publishDate: string) => {
    const bookDate = new Date(publishDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return bookDate > threeMonthsAgo;
  };

  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;
  
  // Books for floating display
  const visibleBooks = shopBooks.slice(0, 5);
  
  // Rotate through books for display
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentBookIndex((prevIndex) => 
          prevIndex === visibleBooks.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering, visibleBooks.length]);
  
  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Writer quotes for rotating display
  const authorQuotes = [
    {
      text: translate(
        "Писането е начин да споделиш своята душа със света.",
        "Writing is a way to share your soul with the world."
      ),
      source: translate("Моята философия", "My philosophy")
    },
    {
      text: translate(
        "Всяка книга е пътуване, което започва с една дума.",
        "Every book is a journey that starts with a single word."
      ),
      source: translate("За творчеството", "On creativity")
    },
    {
      text: translate(
        "Думите имат силата да променят светове – както вътрешни, така и външни.",
        "Words have the power to change worlds – both internal and external."
      ),
      source: translate("За силата на думите", "On the power of words")
    }
  ];
  
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // Rotate through quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => 
        prevIndex === authorQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [authorQuotes.length]);
  
  return (
    <section id="hero" className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-transparent dark:from-gray-900 dark:via-gray-800 dark:to-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Pattern background */}
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
        
        {/* Animated light beam effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute h-[300px] w-[30px] bg-gradient-to-b from-green-500/5 via-green-400/20 to-green-300/5 blur-2xl"
            style={{ 
              rotate: '15deg',
              top: '-10%',
              left: '20%',
              willChange: 'transform, opacity'
            }}
            animate={{
              left: ['20%', '80%', '20%'],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
        
        {/* Decorative blobs */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ 
            scale: [0.8, 1.1, 0.8],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-green-200/20 dark:bg-green-800/10 rounded-full blur-3xl"
          style={{ 
            translateY: scrollY * 0.05,
            translateX: scrollY * -0.02,
            willChange: 'transform'
          }}
        />
        
        <motion.div 
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute top-1/4 right-0 w-[50%] h-[50%] bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl"
          style={{ 
            translateY: scrollY * 0.04,
            translateX: scrollY * 0.02,
            willChange: 'transform'
          }}
        />
        
        {/* Animated circles - reduced number for better performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? 'bg-green-400/5' : 'bg-green-600/3'} dark:bg-green-500/5`}
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                willChange: 'transform, opacity'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.4, 0],
                y: [0, -80],
                x: [0, (Math.random() - 0.5) * 30]
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
            {/* Left Book */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className="justify-self-end relative z-10 w-[160px] h-[240px] sm:w-[180px] sm:h-[270px] lg:w-[220px] lg:h-[330px] cursor-pointer group hidden md:block"
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    style={{ 
                      perspective: 1000,
                      willChange: "transform" 
                    }}
                    initial={{ x: -50, opacity: 0, rotateY: -20 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3,
                      ease: "easeOut" 
                    }}
                  >
                    <motion.div
                      className="w-full h-full rounded-lg overflow-hidden shadow-xl border-2 border-white/20 dark:border-gray-700/50 transition-all duration-300 group-hover:border-green-300/50 dark:group-hover:border-green-600/50"
                      style={{ 
                        transformStyle: "preserve-3d",
                        willChange: "transform" 
                      }}
                      animate={{ 
                        rotateY: [0, 3, 0, -3, 0],
                        y: [0, -3, 0],
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear"
                      }}
                    >
                      <Image
                        src={visibleBooks[0].coverImage}
                        alt={visibleBooks[0].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <p className="text-white text-sm font-medium line-clamp-1">{visibleBooks[0].title}</p>
                      </div>
                    </motion.div>
                    
                    {isNewRelease(visibleBooks[0].publishDate) && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full px-2 py-1 shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {translate("Ново", "New")}
                        </Badge>
                      </div>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{visibleBooks[0].title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Center Content */}
            <div className="text-center relative">
              {/* Decorative element behind avatar */}
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/4 w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-green-100 to-green-300/30 dark:from-green-900/30 dark:to-green-700/20 blur-2xl opacity-70"></div>
            
              {/* Author Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 mx-auto relative"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-green-200 dark:border-green-700 shadow-lg hover:shadow-green-200/40 dark:hover:shadow-green-700/30 transition-shadow duration-300">
                  <Image 
                    src="/images/avatar/avatar.jpg" 
                    alt="Author ELIS" 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 128px, 160px"
                    priority
                  />
                  
                  {/* Simplified avatar glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-green-400/40 dark:border-green-500/40"
                    animate={{ 
                      scale: [1, 1.03, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{ willChange: 'transform, opacity' }}
                  />
                </div>
              </motion.div>

              <Badge 
                variant="outline" 
                className="mb-4 mx-auto px-4 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700/50 inline-flex items-center gap-2 w-fit text-sm shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Feather className="h-4 w-4" />
                <span>{translate("Автор | Философ | Вдъхновител", "Author | Philosopher | Inspirer")}</span>
              </Badge>
              
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight"
              >
                {translate("Истории, които", "Stories That")}
                <span className="relative inline-block mx-2">
                  <span className="relative z-10 text-green-600 dark:text-green-400">{translate("Трансформират", "Transform")}</span>
                  {/* Underline effect */}
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                    className="absolute bottom-1 left-0 w-full h-1.5 bg-green-200 dark:bg-green-800 origin-left z-0"
                  />
                </span>
              </motion.h1>
              
              {/* Rotating Quote with decorative elements */}
              <div className="relative h-24 mb-8 max-w-2xl mx-auto">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-30 text-green-700 dark:text-green-500">
                  <Quote className="w-6 h-6" />
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 scale-x-[-1] opacity-30 text-green-700 dark:text-green-500">
                  <Quote className="w-6 h-6" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.blockquote 
                    key={quoteIndex} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 flex flex-col justify-center px-8"
                  >
                    <p className="text-lg italic text-gray-600 dark:text-gray-300 mb-1">
                      &ldquo;{authorQuotes[quoteIndex].text}&rdquo;
                    </p>
                    <cite className="text-sm text-gray-500 dark:text-gray-400 not-italic">- {authorQuotes[quoteIndex].source}</cite>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-md px-6 shadow-md hover:shadow-lg transition-all duration-300">
                  {translate("Разгледай книгите", "Explore Books")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              
                <Button variant="outline" size="lg" className="rounded-md border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-colors duration-300">
                  {translate("За мен", "About Me")}
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            {/* Right Book */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className="justify-self-start relative z-10 w-[160px] h-[240px] sm:w-[180px] sm:h-[270px] lg:w-[220px] lg:h-[330px] cursor-pointer group hidden md:block"
                    whileHover={{ scale: 1.05, rotateY: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    style={{ 
                      perspective: 1000,
                      willChange: "transform" 
                    }}
                    initial={{ x: 50, opacity: 0, rotateY: 20 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.3,
                      ease: "easeOut" 
                    }}
                  >
                    <motion.div
                      className="w-full h-full rounded-lg overflow-hidden shadow-xl border-2 border-white/20 dark:border-gray-700/50 transition-all duration-300 group-hover:border-green-300/50 dark:group-hover:border-green-600/50"
                      style={{ 
                        transformStyle: "preserve-3d",
                        willChange: "transform" 
                      }}
                      animate={{ 
                        rotateY: [0, -3, 0, 3, 0],
                        y: [0, -3, 0],
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: 0.5
                      }}
                    >
                      <Image
                        src={visibleBooks[1].coverImage}
                        alt={visibleBooks[1].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 180px, 220px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <p className="text-white text-sm font-medium line-clamp-1">{visibleBooks[1].title}</p>
                      </div>
                    </motion.div>
                    
                    {isNewRelease(visibleBooks[1].publishDate) && (
                      <div className="absolute -top-3 -right-3 z-20">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full px-2 py-1 shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {translate("Ново", "New")}
                        </Badge>
                      </div>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{visibleBooks[1].title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Mobile Books Row (visible only on mobile) */}
          <div className="md:hidden flex justify-center gap-6 mt-10">
            {/* Mobile Left Book */}
            <motion.div
              className="relative z-10 w-[120px] h-[180px] cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                ease: "easeOut" 
              }}
            >
              <motion.div
                className="w-full h-full rounded-lg overflow-hidden shadow-xl border-2 border-white/20 dark:border-gray-700/50"
                style={{ willChange: "transform" }}
                animate={{ 
                  rotateY: [0, 3, 0, -3, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              >
                <Image
                  src={visibleBooks[0].coverImage}
                  alt={visibleBooks[0].title}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                  <p className="text-white text-xs font-medium line-clamp-1">{visibleBooks[0].title}</p>
                </div>
              </motion.div>
              
              {isNewRelease(visibleBooks[0].publishDate) && (
                <div className="absolute -top-2 -right-2 z-20">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full px-1.5 py-0.5 shadow-lg text-xs">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                    {translate("Ново", "New")}
                  </Badge>
                </div>
              )}
            </motion.div>

            {/* Mobile Right Book */}
            <motion.div
              className="relative z-10 w-[120px] h-[180px] cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                ease: "easeOut" 
              }}
            >
              <motion.div
                className="w-full h-full rounded-lg overflow-hidden shadow-xl border-2 border-white/20 dark:border-gray-700/50"
                style={{ willChange: "transform" }}
                animate={{ 
                  rotateY: [0, -3, 0, 3, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: 0.5
                }}
              >
                <Image
                  src={visibleBooks[1].coverImage}
                  alt={visibleBooks[1].title}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                  <p className="text-white text-xs font-medium line-clamp-1">{visibleBooks[1].title}</p>
                </div>
              </motion.div>
              
              {isNewRelease(visibleBooks[1].publishDate) && (
                <div className="absolute -top-2 -right-2 z-20">
                  <Badge className="bg-green-500 hover:bg-green-600 text-white rounded-full px-1.5 py-0.5 shadow-lg text-xs">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                    {translate("Ново", "New")}
                  </Badge>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Scroll Down Indicator */}
          <motion.div 
            className="mt-12 flex justify-center text-xs text-green-600 dark:text-green-400 font-medium items-center opacity-70 hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "easeInOut",
                repeatType: "loop" 
              }}
              style={{ willChange: 'transform' }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
            <span className="ml-1">{translate("Прелистете надолу", "Scroll down")}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 