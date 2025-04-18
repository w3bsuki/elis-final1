"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { BookOpen, ChevronRight, Quote, Star, Zap, MessageCircle } from "lucide-react";
import { useRef, memo, useMemo, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Character limit for truncating comments
const CHAR_LIMIT = 180;

// Moved outside component to avoid recreation during renders
const testimonials = [
  {
    name: "Наталия Кобилкина",
    role: "Автор",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Много красива и нежна книга за истинско вдохновение и силата да докоснеш душата си! Подходяща, когато се чувстваш в криза и имаш нужда от подкрепа на ангелите. Препоръчвам я от сърце на всеки, който търси светлина в трудни моменти.",
    source: "Instagram",
    book: "Ангелски послания"
  },
  {
    name: "Виктория Георгиева",
    role: "Психолог",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "От професионална гледна точка, подходът на ЕЛИС към осъзнатото хранене е солиден и базиран на доказателства, но представен по достъпен начин. Препоръчвам тази книга на всичките си клиенти, които се борят с хранителни навици. Тя променя начина, по който мислим за храната и тялото.",
    source: "LinkedIn",
    book: "Осъзнато хранене"
  },
  {
    name: "Елена Тодорова",
    role: "Лекар",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Като лекар, оценявам дълбоко как ЕЛИС интегрира научни принципи с духовни практики в 'Осъзнато хранене'. Тази книга запълва важна празнина в литературата за здравословен начин на живот. Проникновена и променяща живота книга, която всеки мой пациент трябва да прочете.",
    source: "Ozone.bg",
    book: "Осъзнато хранене"
  },
  {
    name: "Ирен Ценова",
    role: "Коуч",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Оооо, прекрасно е, Елис. Много свеж дизайн, идеята е чудесна. На празните места мога да си дописвам моите усещания. Това е точно каквото търсех - книга, която ме вдъхновява и същевременно ми дава пространство за собствени мисли и желания.",
    source: "Facebook",
    book: "Дневник на душата"
  },
  {
    name: "Р. М.",
    role: "Гримьор",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Много ми харесаха стиховете, докоснаха ме. Личи си, че си ги писала 'от сърце и душа'. Всяка страница ме кара да се замисля за собствения ми живот и усещам как думите ти резонират с моите собствени търсения. Благодаря за тази красива книга!",
    source: "Email",
    book: "Послания от душата"
  },
  {
    name: "Пламена Иванова",
    role: "Психолог",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Елис, здравей. Прочетох книгата. Много съм впечатлена! Поздравявам те! Наистина мисля, че ТРЯБВА да издадеш тази книга. Кога успяваш с две малки деца да пишеш книги? Твоят подход към темата е толкова освежаващ и иновативен.",
    source: "Messenger",
    book: "Пътят към себе си"
  },
];

// Pre-computed source colors for better performance
const SOURCE_COLORS = {
  "Instagram": "bg-gradient-to-r from-pink-500 to-purple-500 text-white",
  "LinkedIn": "bg-green-600 text-white",
  "Ozone.bg": "bg-amber-500 text-white",
  "Facebook": "bg-green-700 text-white",
  "Email": "bg-green-600 text-white",
  "Messenger": "bg-gradient-to-r from-green-500 to-green-600 text-white"
};

// Optimized testimonial card component with simpler styling
const TestimonialCard = memo(({ testimonial }) => {
  // Access source color directly from the pre-computed object
  const sourceColor = SOURCE_COLORS[testimonial.source] || "bg-gray-500 text-white";
  
  return (
    <Card className="h-[320px] p-[3px] select-none rounded-xl 
      bg-white dark:bg-gray-900
      shadow-md dark:shadow-md
      hover:shadow-lg dark:hover:shadow-lg
      transition-all duration-300 
      border border-green-100/50 dark:border-green-900/30
      hover:border-green-300/70 dark:hover:border-green-700/50"
    >
      {/* Inner card with simplified styling */}
      <div className="h-full w-full flex flex-col bg-white/90 dark:bg-gray-900 rounded-lg p-5 
        border border-green-100/30 dark:border-green-900/30">
        
        {/* Simplified decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/30 dark:bg-green-900/20 rounded-bl-3xl -z-1" />
        
        <div className="flex justify-between items-start">
          <div className="mb-5 flex gap-4">
            <div className="relative">
              <Avatar className="size-16 rounded-full 
                border-2 border-primary/20 
                p-0.5 bg-white dark:bg-gray-800"
              >
                <AvatarImage
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </Avatar>
              <div className="absolute -bottom-1 -right-1 
                bg-white dark:bg-gray-900 
                rounded-full p-0.5 
                shadow-sm dark:shadow-md"
              >
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${sourceColor}`}>
                  {testimonial.source}
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-lg">{testimonial.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {testimonial.role}
              </p>
              <div className="inline-flex gap-1 mt-1 
                p-1 rounded-full 
                bg-amber-50 dark:bg-amber-900/20"
              >
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Use flex-1 and min-h-0 to ensure content doesn't push the badge out */}
        <div className="flex-1 min-h-0 flex items-start mb-3">
          <div className="bg-green-50/50 dark:bg-gray-800
            py-3 px-4 rounded-xl w-full overflow-hidden
            shadow-sm dark:shadow-md
            relative"
          >
            <p className="text-gray-700 dark:text-gray-300 relative z-10 text-sm italic leading-relaxed line-clamp-4">
              "{testimonial.content}"
            </p>
          </div>
        </div>
        
        {/* Fix badge position at bottom, completely independent of content */}
        <div className="flex justify-center mt-auto">
          <div className="inline-flex items-center gap-2 
            px-5 py-2 rounded-full 
            bg-green-600 dark:bg-green-700
            text-sm font-medium text-white
            shadow-md hover:shadow-lg
            transition-all duration-300"
          >
            <BookOpen className="size-4" />
            {testimonial.book}
          </div>
        </div>
      </div>
    </Card>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

// Fixed render settings for AutoScroll plugin
const AUTOSCROLL_SETTINGS = {
  startDelay: 800, // Longer delay for better performance
  speed: 0.4, // Slower speed for better performance
  stopOnInteraction: true,
  stopOnHover: true,
};

export const Testimonials = () => {
  const { language } = useLanguage();
  const translate = useCallback((bg, en) => language === 'bg' ? bg : en, [language]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const plugin = useRef(AutoScroll(AUTOSCROLL_SETTINGS));

  // Simplified scroll handling - removed parallax effect for better performance
  
  // Pre-rendered carousel items for better performance
  const carouselItems = useMemo(() => (
    testimonials.map((testimonial, index) => (
      <CarouselItem key={index} className="basis-auto pl-4 md:basis-1/2 lg:basis-1/3">
        <TestimonialCard testimonial={testimonial} />
      </CarouselItem>
    ))
  ), []);

  return (
    <div ref={containerRef} className="relative z-0 py-12 md:py-20">
      {/* Simplified background elements */}
      <div className="absolute right-[10%] top-[10%] w-[600px] h-[600px] bg-green-100/30 dark:bg-green-900/20 rounded-full -z-10"></div>
      <div className="absolute left-[5%] bottom-[20%] w-[500px] h-[500px] bg-emerald-100/30 dark:bg-emerald-900/20 rounded-full -z-10"></div>
      
      {/* Main container with simplified styling */}
      <div className="w-full h-full flex flex-col
          bg-white dark:bg-gray-900
          border border-white/30 dark:border-white/10
          shadow-md dark:shadow-lg
          overflow-hidden">
        
        {/* Inner container with simplified gradients */}
        <div className="bg-green-50/30 dark:bg-green-950/10
            px-8 py-12 md:py-16 relative flex-grow flex flex-col">
          
          {/* Content Container */}
          <div className="relative z-10 w-full">
            {/* Section header with simplified styling */}
            <div className="text-center mb-12 md:mb-16 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center justify-center"
              >
                {/* Section badge with simplified styling */}
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 rounded-full mb-5 border border-green-200/60 dark:border-green-800/40">
                  <MessageCircle className="h-4 w-4 text-green-700 dark:text-green-300" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    {language === 'bg' ? "Отзиви" : "Testimonials"}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6 
                  text-green-600 dark:text-green-400">
                  {translate("Какво казват читателите", "What Readers Say")}
                </h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                  {translate(
                    "Присъединете се към глобална мрежа от читатели, които вече са открили своя път към по-добър живот.",
                    "Join a global network of readers who have already discovered their path to a better life."
                  )}
                </p>
              </motion.div>
            </div>

            {/* Simplified Carousel */}
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[plugin.current]}
              onMouseLeave={() => plugin.current.play()}
              className="relative before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-24 before:bg-gradient-to-r before:from-white dark:before:from-gray-900 before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-24 after:bg-gradient-to-l after:from-white dark:after:from-gray-900 after:to-transparent"
            >
              <CarouselContent>
                {carouselItems}
              </CarouselContent>
            </Carousel>
            
            {/* Call to action - simplified */}
            <div className="flex justify-center mt-12">
              <Link href="/books">
                <Button
                  className="flex items-center gap-2 px-6 py-6 text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 rounded-full"
                >
                  <span>{translate("Разгледай книгите", "Browse Books")}</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 