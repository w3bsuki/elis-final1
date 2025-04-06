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
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
  
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
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden" ref={containerRef} id="testimonials">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
          style={{ y: y2 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-amber-500/5 blur-2xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        />
        
        {/* Large quote mark for decoration */}
        <div className="absolute left-1/2 top-40 transform -translate-x-1/2 opacity-5">
          <Quote className="h-40 w-40 text-primary" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern nested container */}
        <div className="max-w-7xl mx-auto relative">
          {/* Top decorative badge */}
          <div className="absolute -top-6 left-0 right-0 flex justify-center z-10">
            <motion.div
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-800 shadow-lg px-5 py-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="size-1.5 rounded-full bg-blue-500"></div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {translate("Гласът на читателите", "Readers' voices")}
                </div>
                <div className="size-1.5 rounded-full bg-blue-500"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Main content container with nested card design */}
          <motion.div
            className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xl p-0.5 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative top border - gradient line */}
            <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            {/* Container inner gradient */}
            <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 rounded-lg p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
              {/* Glass panel effect with inner shadow */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Section header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    <Zap className="h-4 w-auto fill-blue-500" />
                    {translate("Оценен с 5 звезди от 1000+ читатели", "Rated 5 stars by 1000+ readers")}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
                    {translate("Какво казват нашите читатели", "What our readers say")}
                  </h2>
                  
                  <div className="w-16 h-1 bg-blue-500/40 rounded-full mx-auto mb-3"></div>
                  
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                    {translate(
                      "Присъединете се към глобална мрежа от читатели, които вече са открили своя път към по-добър живот",
                      "Join a global network of readers who have already discovered their path to a better life"
                    )}
                  </p>
                </div>
                
                {/* Testimonials Carousel */}
                <div className="mb-8 mt-12">
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
                
                {/* View all testimonials button */}
                <div className="flex justify-center mt-10">
                  <Button 
                    variant="outline" 
                    rounded="full" 
                    className="border-2 border-blue-200/50 dark:border-gray-700 shadow-md"
                    size="lg"
                  >
                    {translate("Вижте всички отзиви", "View all testimonials")}
                    <ChevronRight className="ml-1 h-4 w-auto" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 