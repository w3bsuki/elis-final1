"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Animation constants
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  },
  float: {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      transition: { 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

export function FeaturedBook() {
  const { language } = useLanguage();
  
  // Book data
  const book = useMemo(() => ({
    title: language === 'en' ? "Path to Inner Peace" : "Път към вътрешен мир",
    description: language === 'en' 
      ? "A transformative journey blending psychology with mindfulness practices."
      : "Трансформиращо пътешествие, съчетаващо психология с практики за осъзнатост.",
    price: "24.99",
    currency: language === 'en' ? "$" : "лв",
    coverImage: "/images/books/featured-book.jpg",
    rating: 4.8,
    reviewCount: 142,
    link: "/shop/books/path-to-inner-peace",
    previewLink: "/books/preview/path-to-inner-peace",
    newBadge: language === 'en' ? "New Release" : "Нова книга",
    previewText: language === 'en' ? "Read Preview" : "Прочети откъс",
    buyText: language === 'en' ? "Buy Now" : "Купи сега",
  }), [language]);

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      <div className="relative flex flex-col items-center">
        {/* 3D Book with floating animation */}
        <motion.div 
          variants={ANIMATIONS.item}
          className="relative z-10 mb-6 perspective"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={ANIMATIONS.float}
            className="relative"
          >
            {/* Book shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/20 dark:bg-black/40 blur-xl rounded-full"></div>
            
            {/* 3D book effect with better hover flip animation */}
            <div 
              className="book-wrapper relative w-[240px] h-[360px] cursor-pointer transform-gpu transition-transform duration-700"
              style={{ 
                transformStyle: "preserve-3d",
                transform: `rotateY(-20deg)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `rotateY(-160deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotateY(-20deg)`;
              }}
            >
              {/* Front cover */}
              <div 
                className="absolute inset-0 rounded-lg shadow-2xl transition-all duration-700"
                style={{ 
                  transformStyle: "preserve-3d", 
                  backfaceVisibility: "hidden",
                  transform: "translateZ(2px)"
                }}
              >
                <div className="w-full h-full rounded-lg overflow-hidden border-[8px] border-white dark:border-gray-800">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${book.coverImage})` }}
                  ></div>
                </div>
                
                {/* Book spine */}
                <div 
                  className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-800/80 to-gray-600/80 dark:from-gray-900 dark:to-gray-700 transform -translate-x-full origin-right"
                  style={{ transformStyle: "preserve-3d", transform: "rotateY(90deg)" }}
                ></div>
              </div>
              
              {/* Book back cover */}
              <div 
                className="absolute inset-0 rounded-lg shadow-xl border-[8px] border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700"
                style={{ 
                  transformStyle: "preserve-3d", 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg) translateZ(2px)"
                }}
              >
                {/* Back cover content - simple pattern */}
                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                  {/* Simple pattern for the back */}
                  <div className="absolute inset-0 opacity-10 bg-repeat" style={{ backgroundImage: "url('/images/pattern-light.svg')" }}></div>
                  
                  {/* Book description on back */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
                    <h4 className="text-gray-800 dark:text-gray-200 font-bold mb-2 text-sm">{book.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs text-center italic">{book.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Book pages side - right */}
              <div 
                className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-white to-gray-200 dark:from-gray-800 dark:to-gray-700 transform translate-x-full origin-left"
                style={{ transformStyle: "preserve-3d", transform: "rotateY(90deg)" }}
              ></div>
            </div>
            
            {/* "New Release" badge */}
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md z-30">
              {book.newBadge}
            </div>
            
            {/* Price badge */}
            <div className="absolute bottom-4 right-4 bg-amber-500 text-white font-bold px-3 py-1.5 rounded-full shadow-lg z-30">
              {book.currency}{book.price}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Book info */}
        <motion.div variants={ANIMATIONS.item} className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
            {book.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center justify-center mb-5">
            <div className="flex items-center mr-2">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  size={16}
                  className={i < Math.floor(book.rating) 
                    ? "text-amber-400 fill-amber-400" 
                    : i < book.rating 
                      ? "text-amber-400 fill-amber-400 opacity-50" 
                      : "text-gray-300 dark:text-gray-600"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              {book.rating} <span className="text-gray-500 dark:text-gray-400 text-xs">({book.reviewCount})</span>
            </span>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Buy Button */}
            <Button asChild size="default" className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
              <Link href={book.link} className="flex items-center gap-1">
                <ShoppingCart className="h-4 w-4 mr-1" />
                <span>{book.buyText}</span>
              </Link>
            </Button>
            
            {/* Preview Button */}
            <Button asChild variant="outline" size="default" className="rounded-full border-2 border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 transition-all duration-300">
              <Link href={book.previewLink} className="flex items-center gap-1">
                <span>{book.previewText}</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 