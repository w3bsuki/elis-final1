import React from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/lib/LanguageContext';
import { Badge } from './badge';
import { Input } from './input';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown> | undefined): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value || '');
};

interface ShopFiltersProps {
  filters?: {
    featured?: boolean;
    newReleases?: boolean;
    bestsellers?: boolean;
    digital?: boolean;
    individual?: boolean;
    package?: boolean;
  };
  onChange?: (filter: string, value: boolean) => void;
  isBooksTab?: boolean;
  
  activeFilters?: {
    featured?: boolean;
    newReleases?: boolean;
    bestsellers?: boolean;
    digital?: boolean;
    individual?: boolean;
    package?: boolean;
  };
  onFilterChange?: (filter: string, value: boolean) => void;
  searchTerm?: string;
  onSearch?: (value: string) => void;
  activeSort?: string;
  onSortChange?: (sort: string) => void;
  showServiceFilters?: boolean;
}

export function ShopFilters({
  filters,
  onChange,
  isBooksTab = true,
  activeFilters,
  onFilterChange,
  searchTerm = "",
  onSearch,
  activeSort = "newest",
  onSortChange,
  showServiceFilters = false
}: ShopFiltersProps) {
  const { language, translations } = useLanguage();
  
  const actualFilters = activeFilters || filters || {};
  
  const handleFilterChange = onFilterChange || onChange || (() => {});
  
  const getTranslation = (key: string): string => {
    try {
      const keys = key.split('.');
      let result: any = translations[language];
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          return key;
        }
      }
      
      return ensureString(result);
    } catch (e) {
      console.warn(`Error getting translation for key: ${key}`, e);
      return key;
    }
  };
  
  const translate = (bg: string, en: string): string => {
    return language === 'bg' ? bg : en;
  };

  const getFilterOptions = () => {
    const isBookFilter = showServiceFilters === undefined ? isBooksTab : !showServiceFilters;
    
    if (isBookFilter) {
      return [
        { 
          id: 'featured', 
          name: translate('Избрани', 'Featured'),
          active: actualFilters.featured || false
        },
        { 
          id: 'newReleases', 
          name: translate('Нови издания', 'New Releases'),
          active: actualFilters.newReleases || false
        },
        { 
          id: 'bestsellers', 
          name: translate('Бестселъри', 'Bestsellers'),
          active: actualFilters.bestsellers || false
        },
        { 
          id: 'digital', 
          name: translate('Дигитални', 'Digital'),
          active: actualFilters.digital || false
        },
      ];
    } else {
      return [
        { 
          id: 'featured', 
          name: translate('Избрани', 'Featured'),
          active: actualFilters.featured || false
        },
        { 
          id: 'individual', 
          name: translate('Индивидуални', 'Individual'),
          active: actualFilters.individual || false
        },
        { 
          id: 'package', 
          name: translate('Пакети', 'Packages'),
          active: actualFilters.package || false
        },
      ];
    }
  };

  const filterOptions = getFilterOptions();
  const activeFiltersCount = filterOptions.filter(filter => filter.active).length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onSortChange) {
      onSortChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between items-start">
      {onSearch && (
        <div className="w-full md:w-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder={translate("Търси...", "Search...")}
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-10 pl-10 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500/40"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}
      
      <div className="flex gap-2 w-full md:w-auto justify-end">
        {onSortChange && (
          <div className="flex items-center gap-2">
            <select
              value={activeSort}
              onChange={handleSortChange}
              className="h-10 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500/40 bg-white dark:bg-gray-800 px-3 text-sm"
              aria-label={translate("Сортирай по", "Sort by")}
            >
              <option value="newest">{translate("Най-нови", "Newest")}</option>
              <option value="oldest">{translate("Най-стари", "Oldest")}</option>
              <option value="price-low">{translate("Цена: ниска-висока", "Price: low-high")}</option>
              <option value="price-high">{translate("Цена: висока-ниска", "Price: high-low")}</option>
            </select>
          </div>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="h-10 px-3 flex items-center gap-1 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{translate('Филтри', 'Filters')}</span>
              {activeFiltersCount > 0 && (
                <Badge 
                  className="ml-1 bg-green-500/90 text-white hover:bg-green-600 transition-colors"
                  variant="secondary"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 overflow-hidden rounded-xl border-gray-200 dark:border-gray-800 shadow-lg"
          >
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>{translate('Филтрирай по', 'Filter by')}</span>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => {
                    filterOptions.forEach(filter => {
                      if (filter.active) {
                        handleFilterChange(filter.id, false);
                      }
                    });
                  }}
                >
                  <X className="h-3 w-3 mr-1" />
                  {translate('Изчисти всички', 'Clear all')}
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filterOptions.map(filter => (
              <DropdownMenuCheckboxItem
                key={filter.id}
                checked={filter.active}
                onCheckedChange={checked => handleFilterChange(filter.id, checked as boolean)}
                className="cursor-pointer"
              >
                {filter.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 