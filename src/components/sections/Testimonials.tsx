"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Quote, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  MessageSquare,
  User,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define testimonial data structure
interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  content: string;
  bookTitle?: string;
}

export function Testimonials() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: translate("Михаела Петрова", "Mihaela Petrova"),
      avatar: "/images/avatar/avatar.jpg",
      role: translate("Учител", "Teacher"),
      rating: 5,
      content: translate(
        "Книгите на ЕЛИС имат специално място на рафта ми. 'Дневник на щастието' ме научи как да откривам радост във всеки ден. Начинът, по който авторът пише, те кара да се чувстваш сякаш разговаряш с близък приятел.",
        "ELIS's books have a special place on my shelf. 'Happiness Journal' taught me how to find joy in each day. The way the author writes makes you feel like you're conversing with a close friend."
      ),
      bookTitle: translate("Дневник на щастието", "Happiness Journal")
    },
    {
      id: 2,
      name: translate("Александър Иванов", "Alexander Ivanov"),
      avatar: "/images/avatar/avatar.jpg",
      role: translate("Предприемач", "Entrepreneur"),
      rating: 5,
      content: translate(
        "Като човек с натоварен график, 'Вдъхновения' ми даде точно това, от което имах нужда - кратки, но дълбоки прозрения, които мога да чета на малки порции и да размишлявам през деня. Поезията е истинско откровение.",
        "As someone with a busy schedule, 'Inspirations' gave me exactly what I needed - short but profound insights that I can read in small portions and reflect on throughout the day. The poetry is truly revelatory."
      ),
      bookTitle: translate("Вдъхновения", "Inspirations")
    },
    {
      id: 3,
      name: translate("Виктория Георгиева", "Victoria Georgieva"),
      avatar: "/images/avatar/avatar.jpg",
      role: translate("Психолог", "Psychologist"),
      rating: 4,
      content: translate(
        "От професионална гледна точка, подходът на ЕЛИС към осъзнатото хранене е солиден и базиран на доказателства, но представен по достъпен начин. Препоръчвам тази книга на всичките си клиенти, които се борят с хранителни навици.",
        "From a professional standpoint, ELIS's approach to mindful eating is solid and evidence-based, yet presented in an accessible way. I recommend this book to all my clients struggling with eating habits."
      ),
      bookTitle: translate("Осъзнато хранене", "Mindful Eating")
    },
    {
      id: 4,
      name: translate("Николай Димитров", "Nikolay Dimitrov"),
      avatar: "/images/avatar/avatar.jpg",
      role: translate("Студент", "Student"),
      rating: 5,
      content: translate(
        "Никога не съм бил голям читател, но след като приятел ми препоръча творчеството на ЕЛИС, се промених. Начинът, по който авторът съчетава практична мъдрост с красиво разказване, е неповторим. Не мога да спра да чета!",
        "I was never much of a reader, but after a friend recommended ELIS's work, I changed. The way the author combines practical wisdom with beautiful storytelling is unmatched. I can't stop reading!"
      )
    },
    {
      id: 5,
      name: translate("Елена Тодорова", "Elena Todorova"),
      avatar: "/images/avatar/avatar.jpg",
      role: translate("Лекар", "Doctor"),
      rating: 5,
      content: translate(
        "Като лекар, оценявам дълбоко как ЕЛИС интегрира научни принципи с духовни практики в 'Осъзнато хранене'. Тази книга запълва важна празнина в литературата за здравословен начин на живот. Проникновена и променяща живота.",
        "As a doctor, I deeply appreciate how ELIS integrates scientific principles with spiritual practices in 'Mindful Eating'. This book fills an important gap in wellness literature. Insightful and life-changing."
      ),
      bookTitle: translate("Осъзнато хранене", "Mindful Eating")
    }
  ];
  
  // State for current testimonial in focus view
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState<'list' | 'focus'>('list');
  const [autoplay, setAutoplay] = useState(true);
  
  // Autoplay for focus mode
  useEffect(() => {
    if (!autoplay || displayMode !== 'focus') return;
    
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoplay, displayMode, testimonials.length]);
  
  // Pause autoplay on hover or manual navigation
  const pauseAutoplay = () => setAutoplay(false);
  const resumeAutoplay = () => setAutoplay(true);
  
  // Navigate through testimonials in focus mode
  const goToNextTestimonial = () => {
    pauseAutoplay();
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const goToPreviousTestimonial = () => {
    pauseAutoplay();
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Toggle between list and focus views
  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'list' ? 'focus' : 'list');
  };
  
  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating
            ? "text-amber-500 fill-amber-500"
            : "text-gray-300 dark:text-gray-600"
        )}
      />
    ));
  };
  
  return (
    <section id="testimonials" className="py-24 relative bg-gray-50 dark:bg-gray-900/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl opacity-70"></div>
        
        {/* Large quote marks */}
        <Quote className="absolute top-20 left-10 h-24 w-24 text-green-200 dark:text-green-900/40 transform -rotate-180 opacity-50" />
        <Quote className="absolute bottom-20 right-10 h-24 w-24 text-green-200 dark:text-green-900/40 opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge 
              variant="outline" 
              className="mb-4 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700/50 inline-flex items-center gap-1.5"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{translate("Отзиви от Читатели", "Reader Testimonials")}</span>
            </Badge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-6">
              {translate("Какво казват читателите", "What Readers Are Saying")}
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {translate(
                "Открийте как моите книги вдъхновяват и трансформират живота на читатели от различни области.",
                "Discover how my books are inspiring and transforming the lives of readers from various fields."
              )}
            </p>
            
            {/* Display mode toggle button */}
            <Button
              variant="outline"
              onClick={toggleDisplayMode}
              className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              {displayMode === 'list' 
                ? translate("Преглед като слайдшоу", "View as slideshow") 
                : translate("Преглед като списък", "View as list")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
        
        {/* Testimonials Display */}
        <AnimatePresence mode="wait">
          {displayMode === 'list' ? (
            // Grid List View
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", 
                    transition: { duration: 0.2 } 
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                >
                  {/* Testimonial card header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-green-100 dark:border-green-800">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex">{renderStars(testimonial.rating)}</div>
                  </div>
                  
                  {/* Quote content */}
                  <div className="relative flex-grow">
                    <Quote className="absolute top-0 left-0 h-6 w-6 text-green-300 dark:text-green-700 transform -translate-x-2 -translate-y-2 -rotate-180" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4 pt-3">
                      "{testimonial.content}"
                    </p>
                    <Quote className="absolute bottom-0 right-0 h-6 w-6 text-green-300 dark:text-green-700 transform translate-x-2 translate-y-2" />
                  </div>
                  
                  {/* Book attribution if available */}
                  {testimonial.bookTitle && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center">
                      <Badge className="gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-0">
                        <Heart className="h-3 w-3" />
                        {translate("За книгата", "About")} "{testimonial.bookTitle}"
                      </Badge>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Focus View (Carousel)
            <motion.div
              key="focus-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
            >
              <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
                
                {/* Large decorative quotes */}
                <Quote className="absolute top-6 left-6 h-16 w-16 text-green-200 dark:text-green-900/30 transform -rotate-180 opacity-70" />
                <Quote className="absolute bottom-6 right-6 h-16 w-16 text-green-200 dark:text-green-900/30 opacity-70" />
                
                {/* Testimonial content */}
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonialIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      {/* Profile and rating */}
                      <div className="mb-8 flex flex-col items-center">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-green-100 dark:border-green-800 shadow-md mb-3">
                          <Image
                            src={testimonials[currentTestimonialIndex].avatar}
                            alt={testimonials[currentTestimonialIndex].name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {testimonials[currentTestimonialIndex].name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {testimonials[currentTestimonialIndex].role}
                        </p>
                        <div className="flex gap-1">{renderStars(testimonials[currentTestimonialIndex].rating)}</div>
                      </div>
                      
                      {/* Quote content */}
                      <blockquote className="text-xl md:text-2xl text-center text-gray-700 dark:text-gray-200 font-playfair italic leading-relaxed mb-8">
                        "{testimonials[currentTestimonialIndex].content}"
                      </blockquote>
                      
                      {/* Book attribution if available */}
                      {testimonials[currentTestimonialIndex].bookTitle && (
                        <Badge className="text-sm gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-0 px-3 py-1.5">
                          <Heart className="h-4 w-4" />
                          {translate("За книгата", "About")} "{testimonials[currentTestimonialIndex].bookTitle}"
                        </Badge>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Navigation controls */}
              <div className="flex justify-center mt-8 gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousTestimonial}
                  className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 border-green-200 dark:border-green-800"
                >
                  <ChevronLeft className="h-5 w-5 text-green-700 dark:text-green-400" />
                </Button>
                
                {/* Pagination indicators */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        currentTestimonialIndex === i
                          ? "bg-green-600 dark:bg-green-400 scale-125"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      )}
                      onClick={() => {
                        pauseAutoplay();
                        setCurrentTestimonialIndex(i);
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextTestimonial}
                  className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 border-green-200 dark:border-green-800"
                >
                  <ChevronRight className="h-5 w-5 text-green-700 dark:text-green-400" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 