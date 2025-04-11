"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import { ArrowRight, Book, Sparkles, FileText } from "lucide-react";
import { ExpertiseAreaData, FeatureCardProps, UiTranslations } from "./types";
import { useTranslation } from "@/lib/hooks";
import { useState } from "react";
import { FeatureCardList } from "./FeatureCardList";

// Animation variants
const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }
};

/**
 * FeatureCards - Component that renders the feature cards section in the hero section
 */
export function FeatureCards() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  
  // Expertise areas with improved icons
  const expertiseAreas = useMemo<ExpertiseAreaData[]>(() => [
    {
      icon: <Book className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: language === 'en' ? "Books" : "Книги",
      description: language === 'en' ? "Self-help & growth resources for mindful living and personal development." : "Ресурси за себепомощ и развитие за осъзнат живот и личностно развитие.",
      url: "/shop",
      color: "green"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: language === 'en' ? "Services" : "Услуги",
      description: language === 'en' ? "Professional therapy sessions tailored to your unique needs and goals." : "Професионални терапевтични сесии, съобразени с вашите нужди и цели.",
      url: "/services",
      color: "amber"
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: language === 'en' ? "Articles" : "Статии",
      description: language === 'en' ? "Insights & practical tips to help you navigate life's challenges with clarity." : "Прозрения и практични съвети, които ви помагат да се ориентирате в житейските предизвикателства.",
      url: "/blog", 
      color: "blue"
    }
  ], [language]);
  
  // UI text
  const ui = useMemo<UiTranslations>(() => ({
    featuredContent: language === 'en' ? "Explore Resources" : "Разгледайте ресурсите",
    learnMore: language === 'en' ? "Learn more" : "Научете повече",
  }), [language]);
  
  return (
    <div className="space-y-8">
      {/* Section header with improved spacing and styling */}
      <div className="text-center mb-2">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-50">
          {language === 'en' ? "Explore Resources" : "Разгледайте ресурсите"}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          {language === 'en' 
            ? "Discover valuable resources designed to enhance your personal and professional growth."
            : "Открийте ценни ресурси, създадени да подобрят вашето лично и професионално развитие."}
        </p>
      </div>

      {/* Animate feature cards entrance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          y: isVisible ? 0 : 20 
        }}
        transition={{ 
          duration: 0.5,
          delay: 0.2
        }}
        className="w-full"
      >
        {/* Feature cards with grid layout that adapts to all screen sizes */}
        <FeatureCardList />
      </motion.div>
    </div>
  );
}

// Feature Card component with enhanced design
interface EnhancedFeatureCardProps extends FeatureCardProps {
  color: string;
  index: number;
}

function FeatureCard({ icon, title, description, url, color, index }: EnhancedFeatureCardProps) {
  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = url;
    }
  };
  
  // Dynamically generate styles based on color
  const getColorStyles = () => {
    const colorMap = {
      green: {
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-green-200/60 dark:border-green-800/30',
        hover: 'hover:border-green-300 dark:hover:border-green-700',
        hoverBg: 'hover:bg-green-50/80 dark:hover:bg-green-900/20',
        underline: 'bg-green-500',
        text: 'text-green-600 dark:text-green-400'
      },
      amber: {
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        border: 'border-amber-200/60 dark:border-amber-800/30',
        hover: 'hover:border-amber-300 dark:hover:border-amber-700',
        hoverBg: 'hover:bg-amber-50/80 dark:hover:bg-amber-900/20',
        underline: 'bg-amber-500',
        text: 'text-amber-600 dark:text-amber-400'
      },
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-200/60 dark:border-blue-800/30',
        hover: 'hover:border-blue-300 dark:hover:border-blue-700',
        hoverBg: 'hover:bg-blue-50/80 dark:hover:bg-blue-900/20',
        underline: 'bg-blue-500',
        text: 'text-blue-600 dark:text-blue-400'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.green;
  };
  
  const styles = getColorStyles();
  
  return (
    <motion.div
      variants={ANIMATIONS.item}
      className="group"
      custom={index}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={url} className="block h-full">
        <div 
          className={`h-full ${styles.bg} backdrop-blur-md rounded-xl p-6 shadow-md border ${styles.border}
            ${styles.hover} ${styles.hoverBg} transition-all duration-300
            hover:shadow-lg transform hover:-translate-y-1`}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Icon with improved styling */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm inline-block mb-4">
            {icon}
          </div>
          
          {/* Title with animated underline */}
          <div className="mb-3 relative">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white inline-block">
              {title}
            </h3>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${styles.underline} transition-all duration-300 group-hover:w-16`}></span>
          </div>
          
          {/* Description with improved readability */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {description}
          </p>
          
          {/* Animated arrow with color-matched styling */}
          <div className={`${styles.text} font-medium text-sm flex items-center mt-auto`}>
            <span className="mr-1.5">{ui.learnMore}</span>
            <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 