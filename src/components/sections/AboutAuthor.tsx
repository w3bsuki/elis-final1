"use client";

import React, { useState } from 'react';
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, User, Award, GraduationCap, Sparkles, Heart, Clock, Star, Quote, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ConsultationFormDialog } from "@/components/ui/consultation-form-dialog";

export default function AboutAuthor() {
  const { language } = useLanguage();
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: { 
      y: [-5, 5, -5],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section id="about" className="w-full py-24 bg-gradient-to-b from-green-50 via-gray-50 to-white dark:from-green-950/30 dark:via-gray-900 dark:to-gray-900 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pattern background */}
        <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
        
        {/* Top/Bottom decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
        
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-0 w-[40%] h-[40%] bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl opacity-60 transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-green-200/30 dark:bg-green-800/20 rounded-full blur-3xl opacity-50"></div>
        
        {/* Animated circles */}
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-[5%] w-64 h-64 border border-green-200/40 dark:border-green-800/30 rounded-full"
        />
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-[5%] w-48 h-48 border border-green-200/30 dark:border-green-800/20 rounded-full"
        />
        
        {/* Small decorative shapes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-1/4 left-[10%] w-6 h-6 bg-yellow-400/50 dark:bg-yellow-600/20 rotate-45"
        />
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-1/4 right-[20%] w-8 h-8 bg-green-400/40 dark:bg-green-600/20 rounded-full"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title with badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="inline-flex items-center px-4 py-1.5 bg-green-100/70 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 mb-4 backdrop-blur-sm">
            <User className="h-3.5 w-3.5 mr-2" />
            {language === 'en' ? 'Meet The Writer' : 'Запознайте се с автора'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 text-gray-900 dark:text-white">
            <span className="relative inline-block">
              {language === 'en' ? 'About' : 'За'}
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-green-300 dark:bg-green-600/60 -z-10 transform -rotate-1 rounded-sm"></span>
            </span>
            {' '}
            <span className="text-green-600 dark:text-green-400">
              {language === 'en' ? 'Elis' : 'Елис'}
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? "Psychologist, teacher, and author of books, articles, and tales for children and adults"
              : "Дипломиран психолог, учител и автор на книги, статии, приказки за деца и възрастни"
            }
          </p>
        </motion.div>
        
        {/* Three-column layout: Info Left - Image Center - Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Left column with content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-6 order-2 lg:order-1"
          >
            {/* Biography section */}
            <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 h-[180px] overflow-hidden">
              <div className="inline-flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <User className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Personal Journey' : 'Личен път'}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'en' 
                  ? "As a psychologist, teacher, and author of books, articles, and tales for both children and adults, I've overcome numerous life challenges that have shaped who I am today."
                  : "Като дипломиран психолог, учител и автор на книги, статии и приказки за деца и възрастни, преодолях множество житейски предизвикателства, които формираха това, което съм днес."}
              </p>
            </div>
            
            {/* Floating quote */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 h-[104px] flex flex-col justify-center"
            >
              <Quote className="h-5 w-5 text-green-500 mb-2" />
              <p className="text-sm italic text-gray-700 dark:text-gray-300">
                {language === 'en' 
                  ? "My books - words and thoughts that fill your soul with faith, hope and love!" 
                  : "Книгите ми - Думи, мисли, които изпълват душата ти с вяра надежда и любов!"}
              </p>
            </motion.div>
            
            {/* Stats boxes */}
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 h-[104px] flex flex-col items-center justify-center text-center group hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full mb-2 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{language === 'en' ? 'MA' : 'Магистър'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Psychology & Education' : 'Психология и Образование'}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 h-[104px] flex flex-col items-center justify-center text-center group hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full mb-2 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white">6+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Books Published' : 'Публикувани книги'}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Center column with image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 relative order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-[280px]">
              {/* Main image with frame */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-black dark:border-gray-700 shadow-[12px_12px_0px_0px_rgba(34,197,94,0.4)] dark:shadow-[12px_12px_0px_0px_rgba(22,163,74,0.3)] z-20">
                <Image 
                  src="/images/avatar/avatar.jpg"
                  alt={language === 'en' ? "Elis - Author" : "Елис - Автор"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-28 h-28 border-t-2 border-l-2 border-black dark:border-gray-700 z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 border-b-2 border-r-2 border-black dark:border-gray-700 z-10"></div>
              
              {/* Floating badge - achievements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="absolute -right-8 top-8 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-green-200 dark:border-green-800 z-30"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 dark:bg-green-900/50 p-1.5 rounded-full">
                    <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-xs">
                      {language === 'en' ? 'Award 2022' : 'Награда 2022'}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Reader testimonial */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="absolute -left-8 bottom-16 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-green-200 dark:border-green-800 max-w-[150px] z-30"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-green-500">
                    <Image 
                      src="/images/avatar/avatar.jpg" 
                      alt="Reader"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-2.5 w-2.5 text-yellow-500" fill="#eab308" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                  {language === 'en' 
                    ? "Changed my perspective!" 
                    : "Промени моята перспектива!"}
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column with content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 space-y-6 order-3"
          >
            {/* Biography section (right side) */}
            <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 h-[180px] overflow-hidden">
              <div className="inline-flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <BookOpen className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Literary Vision' : 'Литературна визия'}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'en' 
                  ? "If I am a tree, my fruits are my books. I came to this earth to share my fruits. Whether I have success, family, career, or status in society - it all doesn't matter, because I am here to create, whatever happens in my life."
                  : "Ако аз съм дърво, моите плодове са моите книги. Аз съм дошла тук на земята, за да раздавам от своите плодове. Това дали ще имам успех, дали ще имам семейство, кариера, статус в обществото - всичко е без значение, защото аз съм тук за да творя, каквото и да се случва в живота ми."}
              </p>
            </div>
            
            {/* Recognition and featured in */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 overflow-hidden">
              <div className="inline-flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Heart className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Personal Life' : 'Личен живот'}
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'en' 
                  ? "I'm a mother of three wonderful boys, have a master's degree in primary education innovations, and numerous certifications in various fields, allowing me to be flexible and adaptive in both personal and professional life."
                  : "Освен че съм майка на три прекрасни момчета, аз съм също така магистър по иновации в началното образование и притежавам множество сертификати в различни области. Това ми позволява да бъда гъвкава и адаптивна, както в личен, така и в професионален план."}
              </p>
            </div>
            
            {/* Stats boxes (right side) */}
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 h-[104px] flex flex-col items-center justify-center text-center group hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full mb-2 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white">50+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Workshops' : 'Уъркшопи'}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-green-200 dark:border-green-800 h-[104px] flex flex-col items-center justify-center text-center group hover:border-green-300 dark:hover:border-green-700 transition-all duration-300">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full mb-2 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="font-bold text-gray-900 dark:text-white">5000+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'en' ? 'Readers' : 'Читатели'}</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* CTA Buttons - centered at the bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center pt-12 mt-4"
        >
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[7px_7px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 text-base rounded-md h-12 px-8 hover:translate-y-[-2px]"
            asChild
          >
            <Link href="/about" className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              {language === 'en' ? 'Read My Story' : 'Прочетете моята история'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Consultation dialog */}
      <ConsultationFormDialog
        open={isConsultationDialogOpen}
        onOpenChange={setIsConsultationDialogOpen}
      />
    </section>
  );
} 