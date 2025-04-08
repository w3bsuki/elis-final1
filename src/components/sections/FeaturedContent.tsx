import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// Animations for staggered reveal
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
};

interface FeaturedContentProps {
  className?: string;
}

export function FeaturedContent({ className }: FeaturedContentProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  // Section text translations
  const ui = useMemo(() => ({
    sectionTitle: language === 'en' ? "Featured Content" : "Препоръчано съдържание",
    sectionDescription: language === 'en' 
      ? "Explore resources to help you on your journey towards well-being and self-discovery."
      : "Разгледайте ресурси, които ще ви помогнат в пътя към благополучие и себеоткриване."
  }), [language]);
  
  // expertise areas (the three cards)
  const expertiseAreas = useMemo(() => [
    {
      icon: "📚",
      title: language === 'en' ? "Books" : "Книги",
      description: language === 'en' ? "Self-help & growth resources" : "Ресурси за себепомощ и развитие",
      url: "/shop",
      color: "green",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-700 dark:text-green-300",
      hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/10",
      borderColor: "border-green-100 dark:border-green-800/30"
    },
    {
      icon: "🎓",
      title: language === 'en' ? "Services" : "Услуги",
      description: language === 'en' ? "Professional therapy sessions" : "Професионални терапевтични сесии",
      url: "/services",
      color: "blue",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-700 dark:text-blue-300",
      hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/10",
      borderColor: "border-blue-100 dark:border-blue-800/30"
    },
    {
      icon: "📝",
      title: language === 'en' ? "Articles" : "Статии",
      description: language === 'en' ? "Insights & practical tips" : "Прозрения и практични съвети",
      url: "/blog",
      color: "purple",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-700 dark:text-purple-300",
      hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/10", 
      borderColor: "border-purple-100 dark:border-purple-800/30"
    }
  ], [language]);

  // Handle keyboard navigation for cards
  const handleCardKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <section className={cn("py-16 bg-gray-50 dark:bg-gray-900/50", className)}>
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {ui.sectionTitle}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-green-400 to-green-500 mx-auto rounded-full mb-5"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {ui.sectionDescription}
          </p>
        </div>
        
        {/* Cards grid */}
        <motion.div 
          variants={ANIMATIONS.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div 
              key={index}
              variants={ANIMATIONS.item}
              custom={index}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card 
                className={cn(
                  "h-full backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300",
                  "bg-white/90 dark:bg-gray-800/90",
                  "shadow-[0_10px_30px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.01)]",
                  "dark:shadow-[0_10px_30px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]",
                  "border border-gray-100 dark:border-gray-800",
                  area.hoverBg,
                  "hover:shadow-[0_14px_40px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.02)]",
                  "dark:hover:shadow-[0_14px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.07)]",
                  "focus:outline-none"
                )}
                onClick={() => window.location.href = area.url}
                onKeyDown={(e) => handleCardKeyDown(e, area.url)}
                tabIndex={0}
                role="button"
                aria-label={`${area.title}: ${area.description}`}
              >
                <CardHeader className="p-0 pb-5">
                  <div className="flex flex-col items-center text-center">
                    {/* Large icon with contextual styling */}
                    <div className={cn(
                      "w-20 h-20 mb-6 rounded-full flex items-center justify-center",
                      "shadow-[0_6px_12px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)]",
                      "dark:shadow-[0_6px_12px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]",
                      "transform transition-all duration-300 group-hover:scale-110",
                      area.iconBg
                    )}>
                      <span className="text-4xl" aria-hidden="true">{area.icon}</span>
                    </div>
                    
                    <CardTitle className={cn(
                      "text-xl font-bold mb-2 transition-colors",
                      area.textColor
                    )}>
                      {area.title}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {area.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 pt-4 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "font-medium", 
                      area.textColor,
                      "hover:text-white dark:hover:text-white",
                      `hover:bg-${area.color}-600 dark:hover:bg-${area.color}-700`
                    )}
                    asChild
                  >
                    <Link href={area.url} className="flex items-center justify-center">
                      <span>{language === 'en' ? "Explore" : "Разгледай"}</span>
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 