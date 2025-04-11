import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, MessageSquare, Search, BookText, Tag, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { articles } from '@/data/articles';
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";

const CATEGORIES = [
  { id: "all", labelBg: "Всички", labelEn: "All" },
  { id: "wellness", labelBg: "Благосъстояние", labelEn: "Wellness" },
  { id: "poetry", labelBg: "Поезия", labelEn: "Poetry" },
  { id: "mindfulness", labelBg: "Осъзнатост", labelEn: "Mindfulness" },
  { id: "personal-growth", labelBg: "Личностно развитие", labelEn: "Personal Growth" }
];

const getCategoryColor = (category: string) => {
  const colors = {
    wellness: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    poetry: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    mindfulness: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    'personal-growth': 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  };
  return colors[category as keyof typeof colors] || colors.default;
};

const getCategoryName = (category: string, isEnglish: boolean) => {
  const categories = {
    wellness: {
      bg: 'Благосъстояние',
      en: 'Wellness'
    },
    poetry: {
      bg: 'Поезия',
      en: 'Poetry'
    },
    mindfulness: {
      bg: 'Осъзнатост',
      en: 'Mindfulness'
    },
    'personal-growth': {
      bg: 'Личностно развитие',
      en: 'Personal Growth'
    }
  };
  return isEnglish 
    ? categories[category as keyof typeof categories]?.en || category
    : categories[category as keyof typeof categories]?.bg || category;
};

const BlogPage: NextPage = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const translate = (bg: string, en: string) => isEnglish ? en : bg;

  // Filter articles based on search query and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery.toLowerCase() === "" || 
      (isEnglish ? 
        article.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) :
        article.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Head>
        <title>{translate("Блог - Елис Павлова", "Blog - Elis Pavlova")}</title>
        <meta 
          name="description" 
          content={translate(
            "Блог за благосъстояние, осъзнатост и личностно развитие от Елис Павлова. Статии, съвети и прозрения за по-добър живот.", 
            "Blog about wellness, mindfulness, and personal development by Elis Pavlova. Articles, tips, and insights for a better life."
          )} 
        />
      </Head>

      <main className="pt-24 pb-8 flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
          
          {/* Animated circles - decorative elements */}
          <div className="absolute top-40 left-20 w-72 h-72 bg-blue-200/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-amber-200/5 dark:bg-amber-500/5 rounded-full blur-3xl animate-[pulse_9s_ease-in-out_infinite_1s]"></div>
        </div>

        {/* Container with max width and centered */}
        <div className={CONTAINER_WIDTH_CLASSES + " flex-1 flex flex-col"}>
          {/* Main container */}
          <div className="max-w-full mx-auto w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 p-5 sm:p-6 md:p-8 relative">
              {/* Glass panel effect with inner shadow */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* Main content wrapper */}
              <div className="relative z-0">
                {/* Header section */}
                <div className="text-center mb-8 relative z-10">
                  {/* Title with icon */}
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="rounded-full p-3
                      bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                      shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                      border border-gray-100/50 dark:border-gray-700/30 relative">
                      <BookText className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-black dark:text-white antialiased relative">
                      {translate("Блог за Благосъстояние и Осъзнатост", "Blog for Wellness and Mindfulness")}
                    </h1>
                  </div>
                  
                  <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-6"></div>
                  
                  <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-base">
                    {translate(
                      "Разгледайте статии за здраве, благосъстояние, осъзнатост и личностно развитие, написани от Елис",
                      "Browse articles about health, wellness, mindfulness, and personal development written by Elis"
                    )}
                  </p>
                </div>
                
                {/* Filters & Search Section */}
                <div className="mb-8 relative z-10">
                  <div className="p-6 rounded-xl
                    bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                    shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      {/* Search */}
                      <div className="w-full md:w-72">
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Search className="h-4 w-4" />
                          </div>
                          <Input
                            type="search"
                            placeholder={translate("Търси статии...", "Search articles...")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700"
                          />
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
                        <div className="rounded-full p-2 mr-2
                          bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]">
                          <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => setSelectedCategory(category.id)}
                              className={cn(
                                "px-3 py-1.5 text-sm font-medium rounded-full transition-all",
                                selectedCategory === category.id 
                                  ? "bg-blue-600 text-white dark:bg-blue-700 shadow-md" 
                                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                              )}
                            >
                              {isEnglish ? category.labelEn : category.labelBg}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Results count */}
                    <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-700/50 text-sm text-gray-500 dark:text-gray-400">
                      {translate(
                        `Намерени ${filteredArticles.length} статии`,
                        `Found ${filteredArticles.length} articles`
                      )}
                      {selectedCategory !== "all" && (
                        <span> {translate("в категория", "in category")} <span className="font-medium">{getCategoryName(selectedCategory, isEnglish)}</span></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Articles Grid */}
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="relative z-10"
                >
                  {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredArticles.map((article) => (
                        <motion.article
                          key={article.id}
                          variants={fadeInUp}
                          className="group rounded-xl overflow-hidden 
                            bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm
                            shadow-md hover:shadow-lg transition-all duration-300
                            border border-gray-200/70 dark:border-gray-700/70"
                        >
                          <Link href={`/blog/${article.id}`} className="block h-full">
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={article.image}
                                alt={isEnglish ? article.titleEn : article.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                              {/* Category Badge */}
                              <div className="absolute top-3 left-3 z-10">
                                <div className={cn("px-2.5 py-1 text-xs font-medium rounded-md", getCategoryColor(article.category))}>
                                  {getCategoryName(article.category, isEnglish)}
                                </div>
                              </div>
                            </div>

                            <div className="p-5 space-y-3">
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  <span>{isEnglish ? article.dateEn : article.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1" />
                                  <span>{isEnglish ? article.readTimeEn : article.readTime}</span>
                                </div>
                              </div>

                              <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {isEnglish ? article.titleEn : article.title}
                              </h2>

                              <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">
                                {isEnglish ? article.excerptEn : article.excerpt}
                              </p>

                              <div className="pt-2 flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                                  <span>{article.comments} {translate("коментара", "comments")}</span>
                                </div>
                                
                                <div className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
                                  {translate("Прочети", "Read")}
                                  <div className="ml-1 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <div className="w-2 h-2 border-t-2 border-r-2 border-blue-600 dark:border-blue-400 transform rotate-45"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center rounded-xl
                      bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                      shadow-inner border border-gray-100/50 dark:border-gray-800/50">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full 
                          bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/30 dark:to-gray-800
                          shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)]
                          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                          flex items-center justify-center mb-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                          {translate("Няма намерени статии", "No articles found")}
                        </h3>
                        
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                          {translate(
                            "Опитайте с различно търсене или променете избраната категория.",
                            "Try a different search or change the selected category."
                          )}
                        </p>
                        
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                          }}
                          className="px-4"
                        >
                          {translate("Изчисти филтрите", "Clear filters")}
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogPage; 