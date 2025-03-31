import React, { useEffect } from 'react';
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
            className="pr-10"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
          {localSearchTerm ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-8 top-0 h-full px-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          ) : null}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
          >
            <span className="sr-only">{ensureString(getTranslation("shop.search"))}</span>
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{ensureString(getTranslation("shop.filter"))}</span>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{ensureString(getTranslation("shop.filterBy"))}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={activeFilters.featured}
              onCheckedChange={(checked) => onFilterChange('featured', checked)}
            >
              {ensureString(getTranslation("shop.featured"))}
            </DropdownMenuCheckboxItem>
            {showServiceFilters ? (
              <>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.individual}
                  onCheckedChange={(checked) => onFilterChange('individual', checked)}
                >
                  {ensureString(getTranslation("shop.individual"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.package}
                  onCheckedChange={(checked) => onFilterChange('package', checked)}
                >
                  {ensureString(getTranslation("shop.package"))}
                </DropdownMenuCheckboxItem>
              </>
            ) : (
              <>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.newReleases}
                  onCheckedChange={(checked) => onFilterChange('newReleases', checked)}
                >
                  {ensureString(getTranslation("shop.newReleases"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.bestsellers}
                  onCheckedChange={(checked) => onFilterChange('bestsellers', checked)}
                >
                  {ensureString(getTranslation("shop.bestsellers"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.digital}
                  onCheckedChange={(checked) => onFilterChange('digital', checked)}
                >
                  {ensureString(getTranslation("productDetail.digital"))}
                </DropdownMenuCheckboxItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <span>
                {activeSort === 'newest' ? ensureString(getTranslation("shop.newest")) :
                 activeSort === 'oldest' ? ensureString(getTranslation("shop.oldest")) :
                 activeSort === 'price-low' ? ensureString(getTranslation("shop.priceLowToHigh")) :
                 activeSort === 'price-high' ? ensureString(getTranslation("shop.priceHighToLow")) :
                 ensureString(getTranslation("shop.sort"))}
              </span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{ensureString(getTranslation("shop.sortBy"))}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!showServiceFilters && (
              <>
                <DropdownMenuCheckboxItem
                  checked={activeSort === 'newest'}
                  onCheckedChange={() => onSortChange('newest')}
                >
                  {ensureString(getTranslation("shop.newest"))}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeSort === 'oldest'}
                  onCheckedChange={() => onSortChange('oldest')}
                >
                  {ensureString(getTranslation("shop.oldest"))}
                </DropdownMenuCheckboxItem>
              </>
            )}
            <DropdownMenuCheckboxItem
              checked={activeSort === 'price-low'}
              onCheckedChange={() => onSortChange('price-low')}
            >
              {ensureString(getTranslation("shop.priceLowToHigh"))}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeSort === 'price-high'}
              onCheckedChange={() => onSortChange('price-high')}
            >
              {ensureString(getTranslation("shop.priceHighToLow"))}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
} 