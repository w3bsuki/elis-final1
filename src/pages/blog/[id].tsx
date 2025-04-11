import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useLanguage } from "@/lib/LanguageContext";
import { Article, articles } from "@/data/articles";
import { motion } from "framer-motion";
import { BookText, Calendar, Clock, MessageSquare, Share2, ArrowLeft, Tag } from "lucide-react";
import { format } from "date-fns";
import { bg } from "date-fns/locale";
import Link from "next/link";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BlogPostProps {
  article: Article;
}

const getCategoryColor = (category: string) => {
  const colors = {
    wellness: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    poetry: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    mindfulness: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    'personal-growth': "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  };
  return colors[category as keyof typeof colors] || colors.default;
};

const getCategoryName = (category: string, isEnglish: boolean) => {
  const categories = {
    wellness: {
      bg: "Благосъстояние",
      en: "Wellness"
    },
    poetry: {
      bg: "Поезия",
      en: "Poetry"
    },
    mindfulness: {
      bg: "Осъзнатост",
      en: "Mindfulness"
    },
    'personal-growth': {
      bg: "Личностно развитие",
      en: "Personal Growth"
    }
  };
  return isEnglish 
    ? categories[category as keyof typeof categories]?.en || category
    : categories[category as keyof typeof categories]?.bg || category;
};

const BlogPost: NextPage<BlogPostProps> = ({ article }) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const title = isEnglish ? article.titleEn : article.title;
  const content = isEnglish ? article.contentEn : article.content;
  const date = isEnglish ? article.dateEn : article.date;
  const readTime = isEnglish ? article.readTimeEn : article.readTime;
  const excerpt = isEnglish ? article.excerptEn : article.excerpt;
  
  const translate = (bg: string, en: string) => isEnglish ? en : bg;

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      });
    }
  };

  return (
    <>
      <Head>
        <title>{title} | {translate("Блог - Елис", "Blog - Elis")}</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={article.image} />
      </Head>

      <main className="pt-24 pb-8 flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Pattern background */}
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px]"></div>
          
          {/* Animated circles - decorative elements */}
          <div className="absolute top-40 left-20 w-72 h-72 bg-blue-200/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
        </div>

        {/* Container with max width and centered */}
        <div className={CONTAINER_WIDTH_CLASSES + " flex-1 flex flex-col"}>
          {/* Main container */}
          <div className="max-w-full mx-auto w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-br from-gray-100/50 via-white/50 to-gray-100/50 dark:from-gray-900/50 dark:via-gray-950/50 dark:to-gray-900/50 p-5 sm:p-6 md:p-8 relative">
              {/* Glass panel effect with inner shadow */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-inner pointer-events-none"></div>
              
              {/* Main content wrapper */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-0"
              >
                {/* Back to blog */}
                <div className="mb-6">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {translate("Назад към блога", "Back to blog")}
                  </Link>
                </div>
                
                {/* Featured image */}
                <div className="w-full relative h-64 sm:h-80 md:h-96 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src={article.image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Category */}
                  <div className="absolute top-5 left-5 z-10">
                    <div className={cn(
                      "px-3 py-1.5 rounded-md text-sm font-medium flex items-center",
                      getCategoryColor(article.category)
                    )}>
                      <Tag className="w-3.5 h-3.5 mr-1.5" />
                      {getCategoryName(article.category, isEnglish)}
                    </div>
                  </div>
                  
                  {/* Share button */}
                  <button 
                    onClick={shareArticle}
                    className="absolute top-5 right-5 p-2.5 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors backdrop-blur-sm"
                    aria-label={isEnglish ? "Share article" : "Сподели статията"}
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Article header */}
                <header className="max-w-3xl mx-auto mb-8">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                  >
                    {title}
                  </motion.h1>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-4"
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{readTime}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>{article.comments} {translate("коментара", "comments")}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="my-6 p-5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 text-gray-700 dark:text-gray-300 italic"
                  >
                    {excerpt}
                  </motion.div>
                </header>

                {/* Article content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="max-w-3xl mx-auto">
                    <div 
                      className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: content }} 
                    />
                  </div>
                  
                  {/* Article footer */}
                  <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                      <Link 
                        href="/blog" 
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {translate("Назад към блога", "Back to blog")}
                      </Link>
                      
                      <button 
                        onClick={shareArticle}
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 transition-colors"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {translate("Сподели", "Share")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articles.map(article => ({
    params: { id: article.id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = articles.find(a => a.id === params?.id);

  if (!article) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      article
    }
  };
};

export default BlogPost; 