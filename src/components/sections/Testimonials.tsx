"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { BookOpen, ChevronRight, Quote, Star, Zap } from "lucide-react";
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
      "Много красива и нежна книга за истинско вдохновение и силата да докоснеш душата си! Подходяща, когато се чувстваш в криза и имаш нужда от подкрепа на ангелите.",
    source: "Instagram",
    book: "Ангелски послания"
  },
  {
    name: "Виктория Георгиева",
    role: "Психолог",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "От професионална гледна точка, подходът на ЕЛИС към осъзнатото хранене е солиден и базиран на доказателства, но представен по достъпен начин. Препоръчвам тази книга на всичките си клиенти, които се борят с хранителни навици.",
    source: "LinkedIn",
    book: "Осъзнато хранене"
  },
  {
    name: "Елена Тодорова",
    role: "Лекар",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Като лекар, оценявам дълбоко как ЕЛИС интегрира научни принципи с духовни практики в 'Осъзнато хранене'. Тази книга запълва важна празнина в литературата за здравословен начин на живот. Проникновена и променяща живота.",
    source: "Amazon Reviews",
    book: "Осъзнато хранене"
  },
  {
    name: "Ирен Ценова",
    role: "Коуч",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Оооо, прекрасно е, Елис. Много свеж дизайн, идеята е чудесна. На празните места мога да си дописвам моите усещания.",
    source: "Facebook",
    book: "Дневник на душата"
  },
  {
    name: "Р. М.",
    role: "Гримьор",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Много ми харесаха стиховете, докоснаха ме. Личи си, че си ги писала 'от сърце и душа'.",
    source: "Email",
    book: "Послания от душата"
  },
  {
    name: "Пламена Иванова",
    role: "Психолог",
    avatar: "/images/avatar/avatar.jpg",
    content:
      "Елис, здравей. Прочетох книгата. Много съм впечатлена! Поздравявам те! Наистина мисля, че ТРЯБВА да издадеш тази книга. Кога успяваш с две малки деца да пишеш книги?",
    source: "Messenger",
    book: "Пътят към себе си"
  },
];

// Memoized testimonial card component to reduce re-renders
const TestimonialCard = memo(({ testimonial, getSourceColor }) => {
  return (
    <Card className="h-[320px] p-6 select-none rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex h-full flex-col">
        <div className="flex justify-between items-start">
          <div className="mb-6 flex gap-4">
            <div className="relative">
              <Avatar className="size-16 rounded-full border-2 border-primary/20 shadow-md">
                <AvatarImage
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  loading="lazy"
                />
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 rounded-full p-0.5 shadow-sm">
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
              <div className="flex gap-1 mt-1">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative flex-1 flex items-start">
          <Quote className="text-primary/10 absolute -top-1 -left-1 size-8" />
          <p className="pl-4 text-gray-700 dark:text-gray-300 relative z-10 line-clamp-5">
            {testimonial.content}
          </p>
        </div>
        
        <div className="mt-2">
          <Badge variant="outline" className="text-xs gap-1 items-center inline-flex border-primary/20">
            <BookOpen className="size-3" />
            {testimonial.book}
          </Badge>
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

  // Function to truncate text
  const truncateText = (text: string) => {
    if (text.length <= CHAR_LIMIT) return text;
    return text.slice(0, CHAR_LIMIT) + "...";
  };

  // Memoize source color function to prevent recalculations
  const getSourceColor = useMemo(() => (source: string) => {
    switch(source) {
      case "Instagram": return "bg-gradient-to-r from-pink-500 to-purple-500 text-white";
      case "LinkedIn": return "bg-blue-600 text-white";
      case "Amazon Reviews": return "bg-amber-500 text-white";
      case "Facebook": return "bg-blue-700 text-white";
      case "Email": return "bg-green-600 text-white";
      case "Messenger": return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  }, []);

  return (
    <div className="relative">
      {/* Section header with badge headline style */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 
          bg-gradient-to-br from-white/80 to-blue-50/60 dark:from-gray-800/80 dark:to-blue-900/30
          border border-blue-200/50 dark:border-blue-800/30
          rounded-full 
          shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.1)] 
          dark:shadow-[-2px_-2px_5px_rgba(40,40,40,0.25),_2px_2px_5px_rgba(0,0,0,0.3)]
          backdrop-blur-sm
        ">
          <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <h2 className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white antialiased">
            {translate("Какво казват читателите", "What Readers Say")}
          </h2>
        </div>
        
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full mx-auto mb-4"></div>
        
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base antialiased">
          {translate(
            "Присъединете се към глобална мрежа от читатели, които вече са открили своя път към по-добър живот.",
            "Join a global network of readers who have already discovered their path to a better life."
          )}
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-sm font-semibold text-blue-600 dark:text-blue-400 mt-4 border border-blue-200/50 dark:border-blue-800/30 shadow-sm">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          {translate("Оценен с 5 звезди от 1000+ читатели", "Rated 5 stars by 1000+ readers")}
        </div>
      </div>
      
      {/* Testimonials Carousel */}
      <div className="mb-8">
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
                <TestimonialCard 
                  testimonial={testimonial} 
                  getSourceColor={getSourceColor} 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* View all testimonials button with neumorphic style */}
      <div className="flex justify-center mt-8 mb-4">
        <Link 
          href="/testimonials" 
          className={`
            px-6 py-3 rounded-full 
            flex items-center justify-center gap-2 
            text-blue-700 dark:text-blue-400 font-medium
            bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800
            shadow-[-5px_-5px_10px_rgba(255,255,255,0.8),_5px_5px_10px_rgba(0,0,0,0.15)] 
            dark:shadow-[-5px_-5px_10px_rgba(40,40,40,0.15),_5px_5px_10px_rgba(0,0,0,0.35)]
            border border-blue-200/50 dark:border-blue-800/30
            transition-all duration-300

            hover:shadow-[-1px_-1px_5px_rgba(255,255,255,0.6),_1px_1px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,1),inset_2px_2px_4px_rgba(0,0,0,0.15)]
            dark:hover:shadow-[-1px_-1px_5px_rgba(40,40,40,0.2),_1px_1px_5px_rgba(0,0,0,0.3),inset_-2px_-2px_5px_rgba(40,40,40,0.2),inset_2px_2px_4px_rgba(0,0,0,0.3)]
            hover:text-blue-600 dark:hover:text-blue-300
          `}
        >
          {translate("Вижте всички отзиви", "View All Testimonials")}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default Testimonials; 