import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

// Define the books to be featured as bestsellers
const bestsellers = [
  {
    id: "4",
    title: "Дневник на успеха",
    description: "Практическо ръководство за себепознание и личностно развитие с научни изследвания и практически упражнения.",
    coverImage: "/images/books/dnevnik-na-uspeha.jpg",
    price: "32.00",
    category: "selfHelp",
    badge: { text: { en: "Best Seller", bg: "Бестселър" } },
    slug: "dnevnik-na-uspeha"
  },
  {
    id: "1",
    title: "Осъзнато хранене",
    description: "Научете как да развиете по-здравословна връзка с храната и да създадете устойчиви здравословни навици.",
    coverImage: "/images/books/osaznato-hranene.jpg",
    price: "30.00",
    category: "health",
    badge: { text: { en: "Newest Book", bg: "Нова книга" } },
    slug: "osaznato-hranene"
  },
  {
    id: "5",
    title: "Дневник щастие",
    description: "Изследване на аспектите на любовта и как да изградим здравословни взаимоотношения и удовлетворяващи връзки с другите.",
    coverImage: "/images/books/dnevnik-na-shtastieto.jpg",
    price: "28.50",
    category: "selfHelp",
    badge: { text: { en: "Digital Book", bg: "Електронна книга" } },
    slug: "dnevnik-na-shtastieto"
  }
];

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

// Define the category color schemes
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'poetry':
      return 'from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-800 dark:text-purple-300';
    case 'health':
      return 'from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-800 dark:text-blue-300';
    case 'selfHelp':
      return 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 text-amber-800 dark:text-amber-300';
    default:
      return 'from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300';
  }
};

interface BestsellersProps {
  className?: string;
}

export function Bestsellers({ className }: BestsellersProps) {
  const { language, translations } = useLanguage();
  
  // Create a local translation function
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

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={cn("bg-secondary/30 rounded-xl p-6 mb-8", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {ensureString(getTranslation("shop.bestsellers"))}
          </h2>
          <p className="text-muted-foreground">
            {ensureString(getTranslation("shop.mostPopular"))}
          </p>
        </div>
        
        <Link href="/shop?category=featured" className="mt-2 sm:mt-0">
          <Button variant="outline" className="group">
            {ensureString(getTranslation("shop.viewAll"))}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {bestsellers.map((book) => (
          <motion.div 
            key={book.id}
            variants={item}
            className="relative overflow-hidden rounded-lg bg-background shadow-md group transition-all duration-300 hover:shadow-xl"
          >
            <Link href={`/shop/book/${book.slug}`} className="block h-full">
              <div className="flex h-full">
                {/* Book cover */}
                <div className="relative w-1/3 min-h-[180px]">
                  <div className="absolute inset-0 z-10">
                    <Image 
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r opacity-20 ${getCategoryColor(book.category)}`}></div>
                </div>
                
                {/* Book info */}
                <div className="w-2/3 p-4 flex flex-col">
                  {book.badge && (
                    <Badge className="self-start mb-2 px-2 py-1 text-xs">
                      {ensureString(book.badge.text[language as keyof typeof book.badge.text])}
                    </Badge>
                  )}
                  
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2 flex-grow">
                    {book.description}
                  </p>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-semibold text-lg">
                      {book.price} лв.
                    </span>
                    
                    <motion.span
                      whileHover={{ scale: 1.05 }} 
                      className="text-primary text-sm font-medium"
                    >
                      {ensureString(getTranslation("shop.viewDetails"))} →
                    </motion.span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 