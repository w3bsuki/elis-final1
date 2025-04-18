import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Bookmark, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  const [translations, setTranslations] = useState<any>({
    bg: {}, // Default empty translations
    en: {}
  });
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
      setTranslations(context.translations);
    } catch (e) {
      console.warn("Language context not available in CategorySidebar", e);
      // Keep using default values
    }
  }, []);
  
  return { language, translations };
}

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const categories = [
  { id: 'all', name: 'All Books', icon: BookOpen },
  { id: 'health', name: 'Health & Nutrition', icon: Heart },
  { id: 'poetry', name: 'Poetry', icon: Bookmark },
  { id: 'selfHelp', name: 'Self-Help', icon: Sparkles },
];

export function CategorySidebar({
  activeCategory,
  onCategoryChange,
  className,
}: CategorySidebarProps) {
  const { language, translations } = useSafeLanguage();
  
  // Create a local translation function if t is not provided
  const getTranslation = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Animation variants for category buttons
  const buttonVariants = {
    idle: { scale: 1, x: 0 },
    hover: { scale: 1.02, x: 4, transition: { duration: 0.2 } }
  };
  
  // Animation variants for special offer section
  const offerVariants = {
    idle: { scale: 1, boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.02, 
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-1">
        <h3 className="font-semibold text-sm mb-3">{ensureString(getTranslation("shop.categories"))}</h3>
        <Separator className="my-4" />
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial="idle"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Button
                variant={activeCategory === category.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2 text-sm font-normal transition-all duration-200",
                  activeCategory === category.id && "bg-secondary font-medium"
                )}
                onClick={() => onCategoryChange(category.id)}
              >
                <motion.div
                  animate={{ rotate: activeCategory === category.id ? [0, 5, -5, 0] : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                {category.id === 'all' ? ensureString(getTranslation("categories.all")) :
                 category.id === 'health' ? ensureString(getTranslation("categories.health")) :
                 category.id === 'poetry' ? ensureString(getTranslation("categories.poetry")) :
                 category.id === 'selfHelp' ? ensureString(getTranslation("categories.selfHelp")) :
                 category.name}
              </Button>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-sm mb-3">{ensureString(getTranslation("shop.priceRange"))}</h3>
        <Separator className="my-4" />
        <div className="space-y-2">
          {['under', 'between', 'over'].map((range, index) => (
            <motion.div
              key={range}
              initial="idle"
              whileHover="hover"
              variants={buttonVariants}
            >
              <Button variant="ghost" className="w-full justify-start text-sm font-normal transition-all duration-200">
                {range === 'under' ? 
                  `${ensureString(getTranslation("shop.under"))} 25 лв.` : 
                  range === 'between' ? 
                  '25 - 30 лв.' : 
                  `${ensureString(getTranslation("shop.over"))} 30 лв.`}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="mt-8 rounded-lg bg-secondary p-4 overflow-hidden relative"
        initial="idle"
        whileHover="hover"
        variants={offerVariants}
      >
        <motion.div 
          className="absolute top-0 left-0 h-1 bg-green-500"
          initial={{ width: "30%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
        <h3 className="font-semibold">{ensureString(getTranslation("shop.specialOffer"))}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {ensureString(getTranslation("shop.offerDescription"))}
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300" size="sm">
            {ensureString(getTranslation("shop.viewOffer"))}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
} 