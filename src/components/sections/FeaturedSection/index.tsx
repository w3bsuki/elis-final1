import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Book, Clock, FileText, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface FeaturedSectionProps {
  className?: string;
}

export function FeaturedSection({ className }: FeaturedSectionProps) {
  const { language } = useLanguage();
  
  // Translation content
  const ui = React.useMemo(() => {
    return {
      title: language === 'en' ? 'Featured Resources' : 'Избрани ресурси',
      titleAccent: language === 'en' ? 'Discover' : 'Открийте',
      description: language === 'en' 
        ? 'Explore our collection of books, services, and articles tailored to help you on your journey.'
        : 'Разгледайте нашата колекция от книги, услуги и статии, създадени да ви помогнат по вашия път.',
      books: {
        title: language === 'en' ? 'Books' : 'Книги',
        description: language === 'en' 
          ? 'Browse our collection of books covering various topics in psychology and self-improvement.'
          : 'Разгледайте нашата колекция от книги, обхващащи различни теми в психологията и самоусъвършенстването.',
        count: language === 'en' ? '12+ Books' : '12+ Книги',
        action: language === 'en' ? 'Browse Books' : 'Разгледай книгите'
      },
      services: {
        title: language === 'en' ? 'Services' : 'Услуги',
        description: language === 'en'
          ? 'Discover our range of professional services designed to support your personal growth.'
          : 'Открийте нашата гама от професионални услуги, създадени да подкрепят вашето лично израстване.',
        count: language === 'en' ? '5+ Services' : '5+ Услуги',
        action: language === 'en' ? 'Explore Services' : 'Разгледай услугите'
      },
      articles: {
        title: language === 'en' ? 'Articles' : 'Статии',
        description: language === 'en'
          ? 'Read our latest articles and insights on psychology, wellness, and mental health.'
          : 'Прочетете нашите най-нови статии и прозрения за психологията, благосъстоянието и психичното здраве.',
        count: language === 'en' ? '20+ Articles' : '20+ Статии',
        action: language === 'en' ? 'Read Articles' : 'Прочети статиите'
      }
    };
  }, [language]);

  // Featured items data
  const featuredItems = [
    {
      title: ui.books.title,
      description: ui.books.description,
      count: ui.books.count,
      action: ui.books.action,
      icon: Book,
      href: "/books",
      color: "blue",
      lightColor: "bg-blue-100 text-blue-900 border-blue-200",
      darkColor: "dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-800/50",
      iconBg: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
    },
    {
      title: ui.services.title,
      description: ui.services.description,
      count: ui.services.count,
      action: ui.services.action,
      icon: Clock,
      href: "/services",
      color: "purple",
      lightColor: "bg-purple-100 text-purple-900 border-purple-200",
      darkColor: "dark:bg-purple-900/20 dark:text-purple-100 dark:border-purple-800/50",
      iconBg: "bg-purple-500/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400",
    },
    {
      title: ui.articles.title,
      description: ui.articles.description,
      count: ui.articles.count,
      action: ui.articles.action,
      icon: FileText,
      href: "/articles",
      color: "green",
      lightColor: "bg-green-100 text-green-900 border-green-200",
      darkColor: "dark:bg-green-900/20 dark:text-green-100 dark:border-green-800/50",
      iconBg: "bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-400",
    }
  ];

  return (
    <section className={cn("py-16 md:py-24 overflow-hidden relative", className)}>
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.02] bg-repeat bg-[length:24px_24px] pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-100/30 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Badge 
              className="bg-gradient-to-r from-blue-500 to-green-500 border-0 px-4 py-1.5 text-white shadow-md" 
              variant="outline"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {ui.titleAccent}
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {ui.title}
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {ui.description}
          </motion.p>
        </div>
        
        <div className="space-y-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <div className={cn(
                "rounded-2xl overflow-hidden backdrop-blur-sm border", 
                item.lightColor, 
                item.darkColor,
                "transition-all duration-300 hover:shadow-lg"
              )}>
                <div className="flex flex-col md:flex-row">
                  {/* Left side with icon */}
                  <div className="p-6 md:p-10 md:w-1/4 md:border-r border-black/5 dark:border-white/5 flex justify-center md:justify-start items-center">
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center",
                      item.iconBg
                    )}>
                      <item.icon className="w-8 h-8" />
                    </div>
                  </div>
                  
                  {/* Right side with content */}
                  <div className="p-6 md:p-10 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                          <Badge variant="outline" className="border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                            {item.count}
                          </Badge>
                        </div>
                        <p className="mt-2">{item.description}</p>
                      </div>
                      
                      <div className="mt-4 md:mt-0">
                        <Button
                          asChild
                          className={cn(
                            "group border-black/80 dark:border-white/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300",
                            `bg-${item.color}-600 hover:bg-${item.color}-700 text-white border`
                          )}
                        >
                          <Link href={item.href} className="flex items-center">
                            {item.action}
                            <ChevronRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Timeline dots decoration */}
                    <div className="flex items-center gap-2">
                      {Array.from({length: 5}).map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-2 h-2 rounded-full",
                            i === 0 ? `bg-${item.color}-500 dark:bg-${item.color}-400` : "bg-gray-300 dark:bg-gray-700"
                          )}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 