import React, { useEffect, useState } from 'react';
import { ChevronDown, SlidersHorizontal, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/lib/LanguageContext';
import { Badge } from './badge';

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
      console.warn("Language context not available in ShopFilters", e);
      // Keep using default values
    }
  }, []);
  
  return { language, translations };
}

interface ShopFiltersProps {
  onSearch: (term: string) => void;
  onSortChange: (sort: string) => void;
  onFilterChange: (filter: string, value: boolean) => void;
  activeSort: string;
  activeFilters: Record<string, boolean>;
  searchTerm?: string;
  showServiceFilters?: boolean;
}

export function ShopFilters({
  onSearch,
  onSortChange,
  onFilterChange,
  activeSort,
  activeFilters,
  searchTerm = '',
  showServiceFilters = false,
}: ShopFiltersProps) {
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

  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm);
  
  // Update local search term when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };
  
  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
  };

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Input
            type="search"
            placeholder={ensureString(getTranslation("shop.searchPlaceholder"))}
            className="pr-10 rounded-lg border-gray-200/80 dark:border-gray-700/80 bg-white/90 dark:bg-gray-800/90 h-10
              shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]
              dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(60,60,60,0.1)]
              focus-visible:ring-gray-400/50 dark:focus-visible:ring-gray-500/50
              backdrop-blur-sm"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          {localSearchTerm ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-8 top-0 h-full px-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          ) : null}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <span className="sr-only">{ensureString(getTranslation("shop.search"))}</span>
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 gap-1 rounded-lg group
                bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                border-gray-200/70 dark:border-gray-700/70 font-medium
                shadow-[2px_2px_4px_rgba(0,0,0,0.06),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.7)]
                dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.15),-1px_-1px_2px_rgba(30,30,30,0.07)]
                transition-all duration-200"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 group-hover:scale-110 group-hover:rotate-[-10deg] transition-transform duration-200" />
              <span>{ensureString(getTranslation("shop.filter"))}</span>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-gray-200/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/80 shadow-[4px_4px_10px_rgba(0,0,0,0.1),-2px_-2px_10px_rgba(255,255,255,0.05)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-2px_-2px_10px_rgba(30,30,30,0.05)]">
            <DropdownMenuLabel className="text-gray-700 dark:text-gray-300 font-medium">{ensureString(getTranslation("shop.filterBy"))}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-700/50" />
            <DropdownMenuCheckboxItem
              checked={activeFilters.featured}
              onCheckedChange={(checked) => onFilterChange('featured', checked)}
              className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
            >
              {ensureString(getTranslation("shop.featured"))}
            </DropdownMenuCheckboxItem>
            {showServiceFilters ? (
              <>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.individual}
                  onCheckedChange={(checked) => onFilterChange('individual', checked)}
                  className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
                >
                  {ensureString(getTranslation("shop.individual"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.package}
                  onCheckedChange={(checked) => onFilterChange('package', checked)}
                  className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
                >
                  {ensureString(getTranslation("shop.package"))}
                </DropdownMenuCheckboxItem>
              </>
            ) : (
              <>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.newReleases}
                  onCheckedChange={(checked) => onFilterChange('newReleases', checked)}
                  className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
                >
                  {ensureString(getTranslation("shop.newReleases"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.bestsellers}
                  onCheckedChange={(checked) => onFilterChange('bestsellers', checked)}
                  className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
                >
                  {ensureString(getTranslation("shop.bestsellers"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.digital}
                  onCheckedChange={(checked) => onFilterChange('digital', checked)}
                  className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
                >
                  {ensureString(getTranslation("productDetail.digital"))}
                </DropdownMenuCheckboxItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="h-6 bg-gray-300/50 dark:bg-gray-600/50" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 gap-1 rounded-lg group
                bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
                border-gray-200/70 dark:border-gray-700/70 font-medium
                shadow-[2px_2px_4px_rgba(0,0,0,0.06),-2px_-2px_4px_rgba(255,255,255,0.8)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(30,30,30,0.1)]
                hover:shadow-[1px_1px_2px_rgba(0,0,0,0.05),-1px_-1px_2px_rgba(255,255,255,0.7)]
                dark:hover:shadow-[1px_1px_2px_rgba(0,0,0,0.15),-1px_-1px_2px_rgba(30,30,30,0.07)]
                transition-all duration-200"
            >
              <span>
                {activeSort === 'newest' ? ensureString(getTranslation("shop.newest")) :
                 activeSort === 'oldest' ? ensureString(getTranslation("shop.oldest")) :
                 activeSort === 'price-low' ? ensureString(getTranslation("shop.priceLowToHigh")) :
                 activeSort === 'price-high' ? ensureString(getTranslation("shop.priceHighToLow")) :
                 ensureString(getTranslation("shop.sort"))}
              </span>
              <ChevronDown className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200/80 dark:border-gray-700/80 shadow-[4px_4px_10px_rgba(0,0,0,0.1),-2px_-2px_10px_rgba(255,255,255,0.05)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-2px_-2px_10px_rgba(30,30,30,0.05)]">
            <DropdownMenuLabel className="text-gray-700 dark:text-gray-300 font-medium">{ensureString(getTranslation("shop.sortBy"))}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-700/50" />
            {!showServiceFilters && (
              <>
                <DropdownMenuCheckboxItem
                  checked={activeSort === 'newest'}
                  onCheckedChange={() => onSortChange('newest')}
                  className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
                >
                  {ensureString(getTranslation("shop.newest"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeSort === 'oldest'}
                  onCheckedChange={() => onSortChange('oldest')}
                  className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
                >
                  {ensureString(getTranslation("shop.oldest"))}
                </DropdownMenuCheckboxItem>
              </>
            )}
            <DropdownMenuCheckboxItem
              checked={activeSort === 'price-low'}
              onCheckedChange={() => onSortChange('price-low')}
              className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
            >
              {ensureString(getTranslation("shop.priceLowToHigh"))}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeSort === 'price-high'}
              onCheckedChange={() => onSortChange('price-high')}
              className="focus:bg-gray-100/70 dark:focus:bg-gray-700/70"
            >
              {ensureString(getTranslation("shop.priceHighToLow"))}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 