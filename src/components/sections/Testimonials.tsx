"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { BookOpen, ChevronRight, Quote, Star, Zap, MessageCircle } from "lucide-react";
import { useRef, memo, useMemo } from "react";
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

// Character limit for truncating comments
const CHAR_LIMIT = 180;

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

// Memoized testimonial card component to reduce re-renders
const TestimonialCard = memo(({ testimonial, getSourceColor }) => {
  return (
    <Card className="h-[320px] p-[3px] select-none rounded-xl 
      bg-gradient-to-br from-white/90 via-blue-100/20 to-white/90 dark:from-gray-900/90 dark:via-blue-900/20 dark:to-gray-900/90
      backdrop-blur-sm 
      shadow-[-5px_-5px_15px_rgba(255,255,255,0.8),_5px_5px_15px_rgba(0,0,0,0.08)] 
      dark:shadow-[-5px_-5px_15px_rgba(20,20,30,0.1),_5px_5px_15px_rgba(0,0,0,0.2)]
      transition-all duration-300 
      hover:shadow-[-2px_-2px_10px_rgba(255,255,255,0.6),_2px_2px_10px_rgba(0,0,0,0.1),_0_8px_20px_rgba(0,0,0,0.05)] 
      dark:hover:shadow-[-2px_-2px_10px_rgba(20,20,30,0.15),_2px_2px_10px_rgba(0,0,0,0.3),_0_8px_20px_rgba(0,0,0,0.15)]
      hover:border-blue-300 dark:hover:border-blue-700
      relative overflow-hidden"
    >
      {/* Inner card with nested styling */}
      <div className="h-full w-full flex flex-col bg-white/90 dark:bg-gray-900/90 rounded-lg p-5 
        border border-blue-100/30 dark:border-blue-900/30
        hover:border-blue-300/50 dark:hover:border-blue-700/50
        shadow-[inset_1px_1px_2px_rgba(0,0,0,0.01),inset_-1px_-1px_2px_rgba(255,255,255,0.25)]
        dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
        
        {/* Add subtle decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/40 to-transparent dark:from-blue-900/20 rounded-bl-3xl -z-1" />
        
        <div className="flex justify-between items-start">
          <div className="mb-5 flex gap-4">
            <div className="relative">
              <Avatar className="size-16 rounded-full 
                border-2 border-primary/20 
                shadow-[0_0_10px_rgba(59,130,246,0.3)]
                p-0.5 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900"
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
                shadow-[0_2px_6px_rgba(0,0,0,0.1)]
                dark:shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
              >
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${getSourceColor(testimonial.source)}`}>
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
                bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-950/10
                shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05),_inset_-1px_-1px_2px_rgba(255,255,255,0.8)] 
                dark:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),_inset_-1px_-1px_2px_rgba(255,255,255,0.05)]"
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
          <div className="bg-gradient-to-br from-white/90 to-blue-50/30 dark:from-gray-800/90 dark:to-blue-950/20
            py-3 px-4 rounded-xl w-full overflow-hidden
            shadow-[inset_2px_2px_4px_rgba(0,0,0,0.02),_inset_-2px_-2px_4px_rgba(255,255,255,0.5)] 
            dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),_inset_-2px_-2px_4px_rgba(255,255,255,0.03)]
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
            bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-600
            text-sm font-medium text-white
            border border-blue-400/30 dark:border-blue-400/20
            shadow-lg hover:shadow-xl
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

export const Testimonials = () => {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
      stopOnInteraction: true,
      stopOnHover: true,
    }),
  );

  // Memoize source color function to prevent recalculations
  const getSourceColor = useMemo(() => (source: string) => {
    switch(source) {
      case "Instagram": return "bg-gradient-to-r from-pink-500 to-purple-500 text-white";
      case "LinkedIn": return "bg-blue-600 text-white";
      case "Ozone.bg": return "bg-amber-500 text-white";
      case "Facebook": return "bg-blue-700 text-white";
      case "Email": return "bg-green-600 text-white";
      case "Messenger": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  }, []);

  return (
    <div ref={containerRef} className="relative z-0 py-12">
      {/* Decorative background elements */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute -top-1/2 -right-1/4 w-1/2 h-1/2 rounded-full bg-blue-200/20 dark:bg-blue-900/10 blur-3xl -z-10"
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(59,130,246,0.08),transparent)] -z-10"
      />
      
      {/* Enhanced Testimonials Container with nested neumorphic styling - now includes header */}
      <div className="rounded-2xl p-[5px] mb-12
          bg-gradient-to-br from-gray-200/80 via-white/90 to-gray-100/80 
          dark:from-gray-800/80 dark:via-gray-900/90 dark:to-gray-800/80
          shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.9)]
          dark:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(30,30,30,0.2)]
          overflow-hidden">
        
        {/* Inner container with gradient and shadow effects */}
        <div className="bg-gradient-to-br from-blue-50/30 via-white/40 to-blue-50/30 dark:from-blue-900/20 dark:via-gray-900/20 dark:to-blue-900/20 p-8 rounded-xl relative">
          {/* Inner shadow effect */}
          <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
          
          {/* Section header with badge headline style */}
          <div className="text-center mb-10 relative z-10">
            {/* Enhanced header with special badge styling */}
            <div className="inline-flex flex-col items-center justify-center">
              {/* Main title with badge-like appearance */}
              <div className="relative inline-flex items-center justify-center mb-4">
                {/* Decorative gradient blob behind the title */}
                <div className="absolute -z-10 w-full h-full scale-150 bg-gradient-to-br from-blue-400/20 via-sky-300/10 to-indigo-400/5 dark:from-blue-400/10 dark:via-sky-300/5 dark:to-indigo-400/5 blur-2xl rounded-full"></div>
                
                {/* Badge container */}
                <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900
                  px-5 py-3 rounded-xl
                  shadow-[4px_4px_10px_rgba(0,0,0,0.1),-4px_-4px_10px_rgba(255,255,255,0.9),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                  dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(30,30,30,0.2),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                  flex items-center gap-3 border border-blue-200/50 dark:border-blue-800/30">
                  
                  {/* Left icon with enhanced styling - smaller */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-sky-300/20 blur-xl rounded-full"></div>
                    <div className="rounded-full p-2
                      bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                      border border-blue-100/50 dark:border-blue-800/30 relative">
                      <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                  </div>
                  
                  {/* Title with text color changed to black - smaller */}
                  <div className="flex flex-col items-start">
                    <h2 className="text-xl md:text-2xl font-bold font-serif antialiased relative
                      text-gray-900 dark:text-white
                      flex items-center gap-2">
                      {translate("Какво казват читателите", "What Readers Say")}
                      {/* Add second icon */}
                      <div className="rounded-full p-2
                        bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800
                        shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                        dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]
                        border border-blue-100/50 dark:border-blue-800/30 relative">
                        <Quote className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      </div>
                    </h2>
                    {/* Remove underline by commenting it out */}
                    {/* <div className="h-0.5 w-3/4 mx-auto bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-400 dark:to-gray-300 rounded-full mt-1"></div> */}
                  </div>
                </div>
              </div>
              
              {/* Description text */}
              <div className="max-w-2xl mx-auto mb-5">
                <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg antialiased leading-relaxed">
                  {translate(
                    "Присъединете се към глобална мрежа от читатели, които вече са открили своя път към по-добър живот.",
                    "Join a global network of readers who have already discovered their path to a better life."
                  )}
                </p>
              </div>
              
              {/* Enhanced instruction badge with glow effect */}
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-300/20 to-blue-400/20 dark:from-blue-400/10 dark:via-sky-300/10 dark:to-blue-400/10 blur-xl rounded-full -z-10"></div>
                <div className="inline-flex items-center gap-2 px-6 py-2.5
                  rounded-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900
                  text-base text-blue-700 dark:text-blue-400 
                  border border-blue-100/50 dark:border-blue-800/30 
                  shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8),inset_1px_1px_1px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_rgba(0,0,0,0.05)]
                  dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1),inset_1px_1px_1px_rgba(50,50,50,0.1),inset_-1px_-1px_1px_rgba(0,0,0,0.1)]">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  {translate("Оценен с 5 звезди от 1000+ читатели", "Rated 5 stars by 1000+ readers")}
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonials Grid */}
          <div className="relative z-10">
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[plugin.current]}
              onMouseLeave={() => plugin.current.play()}
              className="lg:-mx-4 relative before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-24 sm:before:w-36 before:bg-gradient-to-r before:from-white/90 dark:before:from-gray-900/90 before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-24 sm:after:w-36 after:bg-gradient-to-l after:from-white/90 dark:after:from-gray-900/90 after:to-transparent"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="basis-auto pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="transform transition-all duration-300"
                    >
                      <TestimonialCard 
                        testimonial={testimonial} 
                        getSourceColor={getSourceColor} 
                      />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          
          {/* Add header for view all testimonials with button */}
          <div className="mt-12 pt-6 border-t border-blue-200/30 dark:border-blue-800/30 relative z-10">
            <div className="flex justify-center">
              <Link 
                href="/testimonials" 
                className="inline-flex items-center gap-2 
                  px-6 py-2.5 rounded-full 
                  bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-600
                  text-white font-medium 
                  border border-blue-400/30 dark:border-blue-400/20
                  shadow-lg hover:shadow-xl
                  transition-all duration-300"
              >
                {translate("Вижте всички отзиви", "View All Testimonials")}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 