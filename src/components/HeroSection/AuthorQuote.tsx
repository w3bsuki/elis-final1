"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

// Animation variants
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }
};

export function AuthorQuote() {
  const { language } = useLanguage();
  
  // Quote data
  const quote = useMemo(() => ({
    text: language === 'en' 
      ? "In a world of chaos, words offer sanctuary. Through stories, we find ourselves, recognize our shared humanity, and discover the courage to both dream and heal."
      : "В свят на хаос, думите предлагат убежище. Чрез историите ние откриваме себе си, разпознаваме споделената си човечност и намираме куража да мечтаем и да лекуваме.",
    attribution: language === 'en' ? "From 'Echoes of Solitude'" : "Из 'Ехо на самотата'",
    year: "2023"
  }), [language]);
  
  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Decorative elements */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-16 w-1 bg-gradient-to-b from-green-400/50 to-green-600/50 dark:from-green-500/50 dark:to-green-700/50 rounded-full"></div>
      
      <div className="px-4 md:px-8 py-6 backdrop-blur-sm">
        {/* Quote text */}
        <motion.blockquote 
          variants={ANIMATIONS.item}
          className="text-center mb-4"
        >
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-serif italic leading-relaxed">
            "{quote.text}"
          </p>
        </motion.blockquote>
        
        {/* Quote attribution */}
        <motion.div 
          variants={ANIMATIONS.item}
          className="text-center"
        >
          <cite className="text-sm text-gray-500 dark:text-gray-400 not-italic flex flex-col items-center">
            <span className="flex items-center">
              <span className="inline-block h-px w-4 bg-gray-300 dark:bg-gray-700 mr-2"></span>
              {quote.attribution}
              <span className="inline-block h-px w-4 bg-gray-300 dark:bg-gray-700 ml-2"></span>
            </span>
            <span className="text-xs mt-1">{quote.year}</span>
          </cite>
        </motion.div>
      </div>
    </motion.div>
  );
} 