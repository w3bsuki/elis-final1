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
    <div ref={containerRef} className="relative z-0 py-12 md:py-20">
      {/* Improved decorative background elements */}
      <div className="absolute right-[10%] top-[10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-300/40 via-indigo-200/40 to-sky-300/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute left-[5%] bottom-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/40 via-blue-300/40 to-sky-200/40 rounded-full blur-[120px] -z-10 animate-pulse-slower"></div>
      
      {/* Main container with glass morphism */}
      <div className="w-full h-full flex flex-col rounded-none
          bg-gradient-to-br from-white/85 via-white/90 to-white/85 
          dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95
          border border-white/30 dark:border-white/10
          shadow-[0_10px_30px_rgba(0,0,0,0.15)]
          dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
          overflow-hidden">
        
        {/* Inner container with enhanced gradients */}
        <div className="bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 
            dark:from-blue-900/30 dark:via-transparent dark:to-indigo-900/30 
            px-8 py-12 md:py-16 relative flex-grow flex flex-col">
          
          {/* Accent gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%)] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.2),transparent_50%)] pointer-events-none"></div>
          
          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Section header */}
            <div className="text-center mb-14 md:mb-20 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex flex-col items-center justify-center"
              >
                {/* Section badge with improved styling */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-900/30 rounded-full mb-5 border border-blue-200/60 dark:border-blue-800/40 shadow-lg backdrop-blur-sm">
                  <MessageCircle className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {language === 'bg' ? "Отзиви" : "Testimonials"}
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 
                  bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400
                  bg-clip-text text-transparent drop-shadow-sm">
                  {translate("Какво казват читателите", "What Readers Say")}
                </h2>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {translate(
                    "Присъединете се към глобална мрежа от читатели, които вече са открили своя път към по-добър живот.",
                    "Join a global network of readers who have already discovered their path to a better life."
                  )}
                </p>
                
                {/* Enhanced rating badge */}
                <div className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md border border-blue-100/60 dark:border-blue-800/40">
                  <div className="flex gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {translate("Оценен с 5 звезди от 1000+ читатели", "Rated 5 stars by 1000+ readers")}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Testimonials Carousel */}
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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="h-full"
                      >
                        <Card className="h-[340px] overflow-hidden rounded-xl 
                          bg-white/50 dark:bg-gray-800/50
                          backdrop-blur-md
                          border border-white/40 dark:border-gray-700/60
                          shadow-[0_15px_30px_rgba(0,0,0,0.1)]
                          dark:shadow-[0_15px_30px_rgba(0,0,0,0.3)]
                          hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] 
                          dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                          hover:border-blue-300 dark:hover:border-blue-500
                          transition-all duration-500 ease-out relative"
                        >
                          <div className="h-full w-full flex flex-col p-5 relative overflow-hidden">
                            {/* Background accent */}
                            <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-blue-100/60 to-transparent dark:from-blue-900/30 rounded-bl-[100px] -z-1" />
                            
                            {/* Header with avatar and info */}
                            <div className="flex justify-between items-start mb-4 relative z-10">
                              <div className="flex gap-4 items-start">
                                <div className="relative">
                                  <Avatar className="size-16 rounded-full 
                                    border-2 border-blue-100/60 dark:border-blue-800/60
                                    shadow-[0_0_15px_rgba(59,130,246,0.25)]
                                    dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]
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
                                  <p className="font-bold text-lg text-gray-900 dark:text-white">{testimonial.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    {testimonial.role}
                                  </p>
                                  <div className="inline-flex gap-0.5 
                                    p-1 rounded-full 
                                    bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-950/10
                                    shadow-[0_1px_3px_rgba(0,0,0,0.05)]
                                    dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                                  >
                                    {Array(5).fill(0).map((_, i) => (
                                      <Star key={i} className="size-3 fill-amber-500 text-amber-500" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Comment section first */}
                            <div className="mb-3">
                              <div className="bg-white/70 dark:bg-gray-800/70
                                py-3 px-4 rounded-xl w-full overflow-hidden
                                shadow-[0_2px_10px_rgba(0,0,0,0.03)]
                                dark:shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                                backdrop-blur-sm
                                border border-white/40 dark:border-gray-700/40
                                relative"
                              >
                                <Quote className="absolute right-3 top-3 h-10 w-10 text-blue-100 dark:text-blue-900/30 opacity-60" />
                                <p className="text-gray-700 dark:text-gray-300 relative z-10 text-sm italic leading-relaxed line-clamp-4">
                                  "{testimonial.content}"
                                </p>
                              </div>
                            </div>
                            
                            {/* Book badge directly below comment */}
                            <div className="flex justify-center mt-auto mb-4">
                              <div className="inline-flex items-center gap-2 
                                px-5 py-2 rounded-full 
                                bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500
                                text-sm font-medium text-white
                                shadow-md hover:shadow-lg
                                transition-all duration-300
                                border border-blue-400/30 dark:border-blue-400/20
                                hover:border-blue-300/60 dark:hover:border-blue-300/40"
                              >
                                <BookOpen className="size-4" />
                                {testimonial.book}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            
            {/* View all testimonials button */}
            <div className="mt-14 text-center">
              <Link 
                href="/testimonials" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full 
                  bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 
                  hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800
                  text-white font-medium
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300
                  border border-blue-500/20 hover:border-blue-300/60"
              >
                {translate("Вижте всички отзиви", "View All Testimonials")}
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 