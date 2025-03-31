"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowRight, Calendar, Clock, BookOpen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Component for the diagonal pattern background
const DiagonalPattern = ({
  className,
  patternColor = "hsl(var(--foreground))",
  patternOpacity = 0.15,
}: {
  className?: string;
  patternColor?: string;
  patternOpacity?: number;
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={cn("h-full w-full border-2 border-dashed", className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  );
};

// Placeholder data for blog posts
const FEATURED_ARTICLES = [
  {
    id: "mindful-eating-guide",
    title: "Осъзнато хранене: Пълно ръководство за начинаещи",
    titleEn: "Mindful Eating: A Complete Beginner's Guide",
    excerpt: "Научете как да промените връзката си с храната и да създадете по-здравословни навици чрез практиките на осъзнатото хранене.",
    excerptEn: "Learn how to transform your relationship with food and create healthier habits through mindful eating practices.",
    date: "12 Май 2023",
    dateEn: "May 12, 2023",
    readTime: "8 мин",
    readTimeEn: "8 min",
    image: "/images/books/osaznato-hranene.jpg",
    category: "wellness",
    comments: 14
  },
  {
    id: "poetry-healing",
    title: "Силата на поезията в емоционалното излекуване",
    titleEn: "The Power of Poetry in Emotional Healing",
    excerpt: "Открийте как поезията може да бъде терапевтичен инструмент за преработка на емоции и трансформиране на негативния опит.",
    excerptEn: "Discover how poetry can be a therapeutic tool for processing emotions and transforming negative experiences.",
    date: "28 Юни 2023",
    dateEn: "June 28, 2023",
    readTime: "6 мин",
    readTimeEn: "6 min",
    image: "/images/books/vdahnovenia-kniga-1.png",
    category: "poetry",
    comments: 9
  },
  {
    id: "morning-routines",
    title: "5 Сутрешни ритуала за повече енергия и фокус",
    titleEn: "5 Morning Rituals for More Energy and Focus",
    excerpt: "Тези лесни за изпълнение сутрешни практики могат да трансформират целия ви ден и да повишат продуктивността и благосъстоянието.",
    excerptEn: "These easy-to-implement morning practices can transform your entire day and boost productivity and well-being.",
    date: "3 Август 2023",
    dateEn: "August 3, 2023",
    readTime: "5 мин",
    readTimeEn: "5 min",
    image: "/images/books/vdahnovenia-kniga-2.png",
    category: "lifestyle",
    comments: 21
  }
];

// Helper function to get category badge color
const getCategoryColor = (category: string) => {
  switch(category) {
    case 'poetry':
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300";
    case 'wellness':
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
    case 'lifestyle':
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
    default:
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
  }
};

// Helper function to get category name
const getCategoryName = (category: string, language: string) => {
  if (language === 'en') {
    switch(category) {
      case 'poetry': return 'Poetry';
      case 'wellness': return 'Wellness';
      case 'lifestyle': return 'Lifestyle';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  } else {
    switch(category) {
      case 'poetry': return 'Поезия';
      case 'wellness': return 'Благосъстояние';
      case 'lifestyle': return 'Начин на живот';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }
};

// Animation variants - simplified for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

export function ArticlesPreview() {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-5 bg-repeat bg-[length:20px_20px] pointer-events-none"></div>
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-green-100/50 to-green-200/30 dark:from-green-900/20 dark:to-green-800/10 rounded-br-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-green-100/50 to-green-200/30 dark:from-green-900/20 dark:to-green-800/10 rounded-tl-full opacity-30 blur-3xl"></div>
      
      {/* Header section with border */}
      <div className="border-y relative z-10">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Badge
              variant="outline"
              className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
            >
              <BookOpen className="size-4 text-green-600" />
              <span className="text-green-600 dark:text-green-400">{translate("Блог и Статии", "Blog & Articles")}</span>
            </Badge>
          </motion.div>
          
          <div className="flex flex-col items-center text-center mx-auto">
            <motion.div className="space-y-2 md:space-y-4 mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl font-bold font-playfair text-center"
              >
                {translate("Последни Публикации", "Latest Articles")}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-[600px] tracking-[-0.32px] text-muted-foreground text-center mx-auto"
              >
                {translate(
                  "Открийте вдъхновяващи статии, съвети и дълбоки прозрения за литературата, осъзнатостта и творческото писане.",
                  "Discover inspiring articles, tips, and deep insights about literature, mindfulness, and creative writing."
                )}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="container relative border-x pb-16 overflow-hidden relative z-10 mt-8">
        {/* Add diagonal pattern background for the articles section */}
        <div className="absolute inset-0 z-0">
          <DiagonalPattern 
            className="border-green-300/60 dark:border-green-600/40 rounded-lg" 
            patternColor="22c55e" 
            patternOpacity={0.07}
          />
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEATURED_ARTICLES.map((article, index) => (
            <motion.div 
              key={article.id} 
              className="h-full flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 group"
              variants={itemVariants}
            >
              {/* Article Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={language === 'bg' ? article.title : article.titleEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  priority
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <div className={`px-2.5 py-1 font-medium text-xs rounded-md ${getCategoryColor(article.category)}`}>
                    {getCategoryName(article.category, language)}
                  </div>
                </div>
                
                {/* Date overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-2 px-3">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1 opacity-80" />
                      <span>{language === 'bg' ? article.date : article.dateEn}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 opacity-80" />
                      <span>{language === 'bg' ? article.readTime : article.readTimeEn}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Article Content */}
              <div className="flex-1 flex flex-col p-4 pt-3 bg-white dark:bg-gray-800 border-t border-green-100 dark:border-green-900/30">
                {/* Title */}
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {language === 'bg' ? article.title : article.titleEn}
                </h3>
                
                {/* Excerpt */}
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 flex-grow">
                  {language === 'bg' ? article.excerpt : article.excerptEn}
                </p>
                
                {/* Comments and CTA */}
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    <span>{article.comments} {translate("коментара", "comments")}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${article.id}`} 
                    className="flex items-center text-green-600 dark:text-green-400 font-medium text-xs hover:underline group"
                  >
                    {translate("Прочети повече", "Read more")}
                    <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-16 relative z-10">
        <div className="container h-full w-full border-x flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              className="relative overflow-hidden bg-green-600 text-white h-auto px-6 py-2.5 border-2 border-green-500 dark:border-green-500 font-medium rounded-xl shadow-md transition-all duration-300 group hover:border-white hover:bg-green-700 dark:hover:bg-green-800"
              asChild
            >
              <Link href="/blog" className="flex items-center gap-2 z-10">
                <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 dark:from-green-800 dark:to-green-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                <BookOpen className="h-4 w-4 text-white relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <span className="relative z-10">{translate("Всички Статии", "All Articles")}</span>
                <ArrowRight className="h-4 w-4 text-white relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-100" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 