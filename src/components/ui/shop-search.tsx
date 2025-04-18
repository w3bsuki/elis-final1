import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ShopSearchProps {
  onSearch: (query: string) => void;
  className?: string;
}

export function ShopSearch({ onSearch, className = '' }: ShopSearchProps) {
  const { language, translations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Helper function to safely get translations
  const getTranslationSafe = (key: string, fallback: string): string => {
    try {
      const keys = key.split('.');
      let result: any = translations?.[language] || {};
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          return fallback;
        }
      }
      
      return typeof result === 'string' ? result : fallback;
    } catch (e) {
      console.warn(`Error getting translation for key: ${key}`, e);
      return fallback;
    }
  };
  
  // Create translation object with fallbacks
  const t = {
    shop: {
      searchPlaceholder: getTranslationSafe('shop.searchPlaceholder', 'Search books and services...'),
      clear: getTranslationSafe('shop.clear', 'Clear'),
      search: getTranslationSafe('shop.search', 'Search')
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  // Debounce search query to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update search results when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center ${className}`}
    >
      <div className="relative w-full">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" 
        />
        <Input
          type="text"
          placeholder={t.shop.searchPlaceholder}
          value={searchQuery}
          onChange={handleChange}
          className="pl-10 pr-24 h-12 rounded-full w-full focus-visible:ring-primary"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 h-7 px-2 text-sm"
          >
            {t.shop.clear}
          </Button>
        )}
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 rounded-full"
        >
          {t.shop.search}
        </Button>
      </div>
    </form>
  );
} 