"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Book, Sparkles, ArrowRight, Users } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileData, UiTranslations } from "./types";

// Animation constants - simplified
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
};

export function HeroProfile() {
  const { language } = useLanguage();
  
  // Profile data
  const profile = useMemo<ProfileData>(() => ({
    imageSrc: "/images/author-avatar.jpg",
    name: language === 'en' ? "Elisa Ivanova" : "Елиса Иванова",
    title: language === 'en' ? "Bestselling Author & Psychologist" : "Бестселър Автор & Психолог",
    altText: language === 'en' ? "Profile photo of Elisa Ivanova" : "Профилна снимка на Елиса Иванова"
  }), [language]);
  
  // UI text translations
  const ui = useMemo<UiTranslations>(() => ({
    transformHeading: language === 'en' 
      ? "Transforming Lives Through the Power of Words ❤️" 
      : "Трансформиране на живота чрез силата на думите ❤️",
    aboutText: language === 'en'
      ? "Award-winning author and certified psychologist, crafting stories and insights that empower readers to discover meaning and create lives filled with purpose."
      : "Отличен автор и сертифициран психолог, създаващ истории и прозрения, които дават възможност на читателите да открият смисъл и да създадат живот, изпълнен с цел.",
    additionalText: language === 'en'
      ? "With over 15 years of experience in psychology and 7 published books translated into multiple languages, my work bridges the gap between therapeutic insights and captivating storytelling."
      : "С над 15 години опит в психологията и 7 публикувани книги, преведени на няколко езика, моята работа изгражда мост между терапевтичните прозрения и завладяващото разказване на истории.",
    browseBooks: language === 'en' ? "Explore My Books" : "Разгледай моите книги",
    authorServices: language === 'en' ? "Author Services" : "Авторски услуги",
    genre: language === 'en' ? "Literary Fiction & Personal Development" : "Художествена литература & Личностно развитие"
  }), [language]);
  
  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      className="space-y-8 h-full flex flex-col justify-center"
    >
      {/* Author info with photo */}
      <motion.div variants={ANIMATIONS.item} className="flex items-center gap-8 mb-8">
        {/* Avatar with simplified styling */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-tr from-green-400/40 via-amber-300/30 to-green-400/40 rounded-full blur-sm"></div>
          <Avatar className="h-28 w-28 border-2 border-white dark:border-gray-800 relative z-10 shadow-xl">
            <AvatarImage src={profile.imageSrc} alt={profile.altText} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div>
          {/* Author name */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 dark:text-white mb-2">
            {profile.name}
          </h1>
          
          {/* Author title/profession */}
          <p className="text-base text-gray-600 dark:text-gray-400 flex items-center">
            <Heart className="w-4 h-4 mr-2 text-green-500" aria-hidden="true" />
            <span>{profile.title}</span>
          </p>
        </div>
      </motion.div>
      
      {/* Main heading - simplified styling */}
      <motion.h2 
        variants={ANIMATIONS.item}
        className="text-3xl md:text-4xl font-bold leading-tight 
          bg-gradient-to-r from-green-600 to-amber-500 dark:from-green-400 dark:to-amber-400
          bg-clip-text text-transparent mb-4"
      >
        {ui.transformHeading}
      </motion.h2>
      
      {/* Description text - larger for better readability */}
      <motion.p 
        variants={ANIMATIONS.item}
        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mb-4"
      >
        {ui.aboutText}
      </motion.p>
      
      {/* Additional description */}
      <motion.p 
        variants={ANIMATIONS.item}
        className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-8"
      >
        {ui.additionalText}
      </motion.p>
      
      {/* CTA Buttons - side by side */}
      <motion.div variants={ANIMATIONS.item} className="flex flex-wrap gap-4">
        {/* Books Button */}
        <Button asChild size="lg" className="rounded-full group shadow-lg hover:shadow-xl text-base px-8 py-7 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
          <Link href="/shop" className="flex items-center">
            <span>{ui.browseBooks}</span>
            <ArrowRight className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </Button>
        
        {/* Author Services Button */}
        <Button asChild size="lg" variant="outline" className="rounded-full group shadow-md hover:shadow-lg text-base px-8 py-7 border-2 border-green-500 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/20 transition-all duration-300">
          <Link href="/services" className="flex items-center">
            <Users className="w-5 h-5 mr-2.5" />
            <span>{ui.authorServices}</span>
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
} 