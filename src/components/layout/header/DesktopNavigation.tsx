"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, UserRound, Sparkles, Mail, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationProps } from "./types";
import { NavItem } from './NavItem';
import { useSafeLanguage } from "@/hooks/useSafeLanguage";

// Define the shared style here as well (or import if moved to shared utils)
const nestedGlassStyleBase = cn(
  "border border-border/70", 
  "shadow-inner", 
  "bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/75", 
  "text-foreground", 
  "transition-all duration-200 ease-in-out", 
  "hover:bg-background/85 hover:shadow-sm hover:border-border", 
  "active:bg-background/95 active:scale-[0.98] active:shadow-inner",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 dark:focus-visible:ring-offset-background"
);

export function DesktopNavigation({ books, services, onBookClick, onServiceClick }: NavigationProps) {
  const { language } = useSafeLanguage();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  
  const navTranslations = {
    about: language === 'en' ? 'About' : 'За Мен',
    books: language === 'en' ? 'Books' : 'Книги',
    blog: language === 'en' ? 'Blog' : 'Блог',
    services: language === 'en' ? 'Services' : 'Услуги',
    contact: language === 'en' ? 'Contact' : 'Контакти',
  };

  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Define desktop-specific NavItem styles using the nested look
  // Apply the base nested style but potentially adjust padding/active state for nav links
  const desktopBaseStyles = cn(nestedGlassStyleBase, "flex items-center text-sm font-medium rounded-lg px-4 py-2");
  // For NavItems, maybe the active state is just slightly more opaque background?
  const desktopActiveStyles = "bg-background/90 shadow-inner font-semibold border-primary/20"; 
  // Inactive inherits from base + hover state defined in nestedGlassStyleBase
  const desktopInactiveStyles = ""; // No override needed, hover/active taken care of by base

  const handleDropdownClick = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(prev => prev === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <nav 
      aria-label="Main Navigation"
      className="hidden lg:flex items-center justify-center z-[9999] w-full" 
      style={{ overflow: 'visible' }}
    >
      <ul className="flex items-center justify-center gap-4" ref={navRef}>
        {/* About Link using NavItem with nested style */}
        <li>
          <NavItem 
            href="/about" 
            label={navTranslations.about}
            icon={UserRound}
            baseClassName={desktopBaseStyles}
            activeClassName={desktopActiveStyles}
          />
        </li>

        {/* Books Dropdown using NavItem with nested style */}
        <li className="relative">
          <NavItem
            label={navTranslations.books}
            icon={BookOpen}
            onClick={(e) => handleDropdownClick('books', e)}
            isActive={(pathname && pathname.startsWith("/shop")) || activeDropdown === 'books'}
            baseClassName={desktopBaseStyles}
            activeClassName={desktopActiveStyles}
          />
          
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
                    className="w-full justify-center rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary active:bg-primary/20"
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

        {/* Services Dropdown using NavItem with nested style */}
        <li className="relative">
          <NavItem
            label={navTranslations.services}
            icon={Sparkles}
            onClick={(e) => handleDropdownClick('services', e)}
            isActive={(pathname && pathname.startsWith("/services")) || activeDropdown === 'services'}
            baseClassName={desktopBaseStyles}
            activeClassName={desktopActiveStyles}
          />
          
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
                    className="w-full justify-center rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary active:bg-primary/20"
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

        {/* Blog Link using NavItem with nested style */}
        <li>
          <NavItem 
            href="/blog" 
            label={navTranslations.blog}
            icon={Mail}
            baseClassName={desktopBaseStyles}
            activeClassName={desktopActiveStyles}
          />
        </li>

        {/* Contact Link using NavItem with nested style */}
        <li>
          <NavItem 
            href="/contact" 
            label={navTranslations.contact}
            icon={Mail}
            baseClassName={desktopBaseStyles}
            activeClassName={desktopActiveStyles}
          />
        </li>
      </ul>
    </nav>
  );
} 