import React from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
  className = '',
}: CategoryFilterProps) {
  const { t } = useLanguage();

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="font-semibold text-lg">{t.shop.categories}</h3>
      <div className="flex flex-wrap gap-2">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant={selectedCategories.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => {
              // Clear all categories if any are selected
              if (selectedCategories.length > 0) {
                categories.forEach((category) => {
                  if (selectedCategories.includes(category.id)) {
                    onCategoryChange(category.id);
                  }
                });
              }
            }}
            className="rounded-full h-8"
          >
            {t.shop.all}
            {selectedCategories.length === 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 bg-primary-foreground text-primary"
              >
                {categories.length}
              </Badge>
            )}
          </Button>
        </motion.div>

        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Button
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="rounded-full h-8"
            >
              {category.name}
              {selectedCategories.includes(category.id) && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-primary-foreground text-primary"
                >
                  ✓
                </Badge>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 