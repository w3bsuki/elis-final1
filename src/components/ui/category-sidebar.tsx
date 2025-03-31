import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Bookmark, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

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
  const { language, translations } = useLanguage();
  
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

  return (
    <div className={cn("w-full", className)}>
      <div className="space-y-1">
        <h3 className="font-semibold text-sm mb-3">{ensureString(getTranslation("shop.categories"))}</h3>
        <Separator className="my-4" />
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 text-sm font-normal",
                activeCategory === category.id && "bg-secondary font-medium"
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="h-4 w-4" />
              {category.id === 'all' ? ensureString(getTranslation("categories.all")) :
               category.id === 'health' ? ensureString(getTranslation("categories.health")) :
               category.id === 'poetry' ? ensureString(getTranslation("categories.poetry")) :
               category.id === 'selfHelp' ? ensureString(getTranslation("categories.selfHelp")) :
               category.name}
            </Button>
          );
        })}
      </div>
      
      <div className="mt-8">
        <h3 className="font-semibold text-sm mb-3">{ensureString(getTranslation("shop.priceRange"))}</h3>
        <Separator className="my-4" />
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
            {ensureString(getTranslation("shop.under"))} 25 лв.
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
            25 - 30 лв.
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm font-normal">
            {ensureString(getTranslation("shop.over"))} 30 лв.
          </Button>
        </div>
      </div>
      
      <div className="mt-8 rounded-lg bg-secondary p-4">
        <h3 className="font-semibold">{ensureString(getTranslation("shop.specialOffer"))}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {ensureString(getTranslation("shop.offerDescription"))}
        </p>
        <Button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white" size="sm">
          {ensureString(getTranslation("shop.viewOffer"))}
        </Button>
      </div>
    </div>
  );
} 