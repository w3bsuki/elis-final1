"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, UserRound, Sparkles, Mail, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { NavLink } from "./NavLink";
import { NavigationProps } from "./types";

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
    } catch (e) {
      console.warn("Language context not available in DesktopNavigation", e);
      // Keep using default language
    }
  }, []);
  
  return { language };
}

export function DesktopNavigation({ books, services, onBookClick, onServiceClick }: NavigationProps) {
  const { language } = useSafeLanguage();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Translations for navigation items
  const navTranslations = {
    about: language === 'en' ? 'About' : 'За Мен',
    books: language === 'en' ? 'Books' : 'Книги',
    blog: language === 'en' ? 'Blog' : 'Блог',
    services: language === 'en' ? 'Services' : 'Услуги',
    contact: language === 'en' ? 'Contact' : 'Контакти',
  };

  // Function to translate based on language
  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;

  // Framer-motion animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Common navigation link styles 
  const navLinkStyles = "flex items-center text-sm font-medium transition-all duration-200 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800 dark:hover:text-primary-foreground px-4 py-2";
  const activeStyles = "bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary-foreground";

  // Toggle dropdown visibility
  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  // Create a click handler to stop propagation
  const handleButtonClick = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  return (
    <nav className="hidden lg:flex items-center justify-center z-[9999]" style={{ overflow: 'visible' }}>
      <ul className="flex items-center gap-1">
        {/* About Link */}
        <li>
          <NavLink 
            href="/about" 
            className={navLinkStyles}
            activeClassName={activeStyles}
          >
            <UserRound className="mr-1.5 h-4 w-4" />
            {navTranslations.about}
          </NavLink>
        </li>

        {/* Books Dropdown */}
        <li className="relative">
          <button
            onClick={(e) => handleButtonClick('books', e)}
            className={cn(
              navLinkStyles, 
              pathname.startsWith("/shop") && activeStyles,
              activeDropdown === 'books' && "bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary-foreground"
            )}
          >
            <BookOpen className="mr-1.5 h-4 w-4" />
            {navTranslations.books}
          </button>
          
          {activeDropdown === 'books' && (
            <div 
              className="fixed left-0 right-0 top-[70px] flex justify-center z-[9999]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-[600px] rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {books.map((book) => (
                    <motion.div 
                      key={book.id}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <Link
                        href={book.href}
                        onClick={(e) => onBookClick(book, e)}
                        className="group flex flex-col h-full rounded-lg overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200"
                      >
                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 33vw, 200px"
                          />
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                          <h4 className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors line-clamp-1">
                            {book.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 flex-grow mb-2">
                            {book.description}
                          </p>
                          <div className="flex justify-between items-center mt-auto">
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
                              {book.price.toFixed(2)} лв
                            </Badge>
                            <span className="text-xs text-primary dark:text-primary-foreground group-hover:underline underline-offset-2">
                              {translate('Виж', 'View')}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-center h-8" 
                    asChild
                  >
                    <Link href="/shop">
                      {translate('Разгледай всички книги', 'Browse all books')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </li>

        {/* Services Dropdown */}
        <li className="relative">
          <button
            onClick={(e) => handleButtonClick('services', e)}
            className={cn(
              navLinkStyles, 
              pathname.startsWith("/services") && activeStyles,
              activeDropdown === 'services' && "bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary-foreground"
            )}
          >
            <Sparkles className="mr-1.5 h-4 w-4" />
            {navTranslations.services}
          </button>
          
          {activeDropdown === 'services' && (
            <div 
              className="fixed left-0 right-0 top-[70px] flex justify-center z-[9999]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-[450px] rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-800">
                  {services.map((service, idx) => (
                    <motion.div 
                      key={service.id}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      transition={{ duration: 0.2, delay: 0.05 * idx }}
                    >
                      <button
                        onClick={(e) => onServiceClick(service, e)}
                        className="group flex w-full items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 text-left"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                            {service.description}
                          </p>
                          <span className="text-xs text-primary dark:text-primary-foreground group-hover:underline underline-offset-2">
                            {translate('Научи повече', 'Learn More')}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 text-gray-700 dark:text-gray-300 self-start">
                          {service.duration}
                        </Badge>
                      </button>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-center h-8" 
                    asChild
                  >
                    <Link href="/services">
                      {translate('Виж всички услуги', 'View all services')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </li>

        {/* Blog Link */}
        <li>
          <NavLink 
            href="/blog" 
            className={navLinkStyles}
            activeClassName={activeStyles}
          >
            <Mail className="mr-1.5 h-4 w-4" /> 
            {navTranslations.blog}
          </NavLink>
        </li>

        {/* Contact Link */}
        <li>
          <NavLink 
            href="/contact" 
            className={navLinkStyles}
            activeClassName={activeStyles}
          >
            <Mail className="mr-1.5 h-4 w-4" />
            {navTranslations.contact}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
} 