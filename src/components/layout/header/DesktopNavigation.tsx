"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, UserRound, Sparkles, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationProps } from "./types";
import { NavItem } from './NavItem';
import { useSafeLanguage } from "@/lib/LanguageContext";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";

// Define the shared style here as well (or import if moved to shared utils)
const nestedGlassStyleBase = cn(
  "rounded-full px-4 py-2 text-sm",
  "transition-all duration-300",
  "hover:bg-primary/5 dark:hover:bg-primary/10",
  "hover:shadow-sm",
  "border border-border/20 dark:border-border/10",
  "bg-background/60 backdrop-blur-sm",
  "text-foreground"
);

export function DesktopNavigation({ books, services, onBookClick, onServiceClick }: NavigationProps) {
  const { language } = useSafeLanguage();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [dropdownPositions, setDropdownPositions] = useState<Record<string, { top: number, left: number }>>({});
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  const navTranslations = {
    about: language === 'bg' ? 'За мен' : 'About',
    books: language === 'bg' ? 'Книги' : 'Books',
    services: language === 'bg' ? 'Услуги' : 'Services',
    blog: language === 'bg' ? 'Блог' : 'Blog',
    contact: language === 'bg' ? 'Контакти' : 'Contact'
  };

  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.03
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.1
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  // Define desktop-specific NavItem styles using the nested look
  const desktopBaseStyles = cn(
    nestedGlassStyleBase,
    "flex items-center text-sm font-medium",
    "transition-all duration-300"
  );
  
  // For NavItems, active state has slightly more opaque background
  const desktopActiveStyles = cn(
    "bg-background/80",
    "text-primary dark:text-primary-foreground",
    "font-medium",
    "border-primary/30 dark:border-primary/20",
    "shadow-sm"
  );

  const handleDropdownClick = (dropdown: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Update dropdown positions when they become active
  useEffect(() => {
    if (activeDropdown && dropdownRefs.current.has(activeDropdown)) {
      const navItem = dropdownRefs.current.get(activeDropdown);
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setDropdownPositions({
          ...dropdownPositions,
          [activeDropdown]: {
            top: rect.bottom + window.scrollY,
            left: rect.left
          }
        });
      }
    }
  }, [activeDropdown]);

  // Close dropdowns on scroll to prevent positioning issues
  useEffect(() => {
    const handleScroll = () => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDropdown]);

  return (
    <nav 
      aria-label="Main Navigation"
      className={cn(
        "hidden lg:flex items-center justify-center z-40 w-full",
        "relative"
      )}
      style={{ overflow: 'visible' }}
      ref={navRef}
    >
      <motion.ul 
        className="flex items-center justify-center gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {[
          { href: "/about", label: navTranslations.about, icon: UserRound },
          { href: "#", label: navTranslations.books, icon: BookOpen, dropdown: "books" },
          { href: "#", label: navTranslations.services, icon: Sparkles, dropdown: "services" },
          { href: "/blog", label: navTranslations.blog, icon: Mail },
          { href: "/contact", label: navTranslations.contact, icon: Mail }
        ].map((item, index) => (
          <motion.li 
            key={item.href + item.label}
            variants={itemVariants}
            custom={index}
            className="relative"
            ref={node => {
              if (node && item.dropdown) {
                dropdownRefs.current.set(item.dropdown, node);
              }
            }}
          >
            <NavItem 
              href={item.dropdown ? undefined : item.href}
              onClick={item.dropdown ? (e) => handleDropdownClick(item.dropdown!, e) : undefined}
              label={item.label}
              icon={item.icon}
              variant="ghost"
              size="default"
              className={cn(
                desktopBaseStyles,
                (item.dropdown && activeDropdown === item.dropdown) && desktopActiveStyles,
                (!item.dropdown && pathname === item.href) && desktopActiveStyles
              )}
            >
              {item.dropdown && (
                <ChevronDown 
                  className={cn(
                    "h-3.5 w-3.5 ml-1 text-foreground/60 transition-transform duration-200",
                    activeDropdown === item.dropdown && "rotate-180"
                  )} 
                />
              )}
            </NavItem>
            
            {/* Books Dropdown - Now using portal to render outside of constraints */}
            {item.dropdown === 'books' && createPortal(
              <AnimatePresence>
                {activeDropdown === 'books' && dropdownPositions['books'] && (
                  <motion.div
                    className="fixed p-4 w-64 bg-background/95 backdrop-blur-md shadow-lg 
                      rounded-xl border border-border/20 dark:border-border/10 z-50 overflow-hidden"
                    style={{
                      top: `${dropdownPositions['books'].top + 8}px`,
                      left: `${dropdownPositions['books'].left}px`,
                      backgroundImage: isDarkMode
                        ? 'linear-gradient(to bottom, rgba(20, 83, 45, 0.10), rgba(20, 83, 45, 0.05))'
                        : 'linear-gradient(to bottom, rgba(240, 253, 244, 0.95), rgba(240, 253, 244, 0.85))'
                    }}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h3 className="mb-3 pl-2 text-sm font-medium text-foreground/80 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-primary/80" />
                      {translate("Популярни книги", "Popular Books")}
                    </h3>
                    
                    <div className="space-y-2">
                      {books.map(book => (
                        <motion.a
                          key={book.id}
                          href={book.href}
                          className="block px-3 py-2.5 hover:bg-primary/5 rounded-lg transition-all duration-300 group flex items-center"
                          onClick={(e) => onBookClick && onBookClick(book, e)}
                          variants={itemVariants}
                        >
                          <div className="flex-shrink-0 w-10 h-12 mr-3 relative rounded-md overflow-hidden border border-border/10 shadow-sm group-hover:shadow transition-all duration-300">
                            <Image
                              src={book.image || '/images/placeholder-book.jpg'}
                              alt={book.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium">{book.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{book.description}</p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border/10">
                      <Link 
                        href="/shop" 
                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 group"
                      >
                        <span>{translate("Разгледай всички книги", "View all books")}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}
            
            {/* Services Dropdown - Now using portal to render outside of constraints */}
            {item.dropdown === 'services' && createPortal(
              <AnimatePresence>
                {activeDropdown === 'services' && dropdownPositions['services'] && (
                  <motion.div
                    className="fixed p-4 w-64 bg-background/95 backdrop-blur-md shadow-lg 
                      rounded-xl border border-border/20 dark:border-border/10 z-50 overflow-hidden"
                    style={{
                      top: `${dropdownPositions['services'].top + 8}px`,
                      left: `${dropdownPositions['services'].left}px`,
                      backgroundImage: isDarkMode
                        ? 'linear-gradient(to bottom, rgba(20, 83, 45, 0.10), rgba(20, 83, 45, 0.05))'
                        : 'linear-gradient(to bottom, rgba(240, 253, 244, 0.95), rgba(240, 253, 244, 0.85))'
                    }}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h3 className="mb-3 pl-2 text-sm font-medium text-foreground/80 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-primary/80" />
                      {translate("Предлагани услуги", "Available Services")}
                    </h3>
                    
                    <div className="space-y-2">
                      {services.map(service => (
                        <motion.a
                          key={service.id}
                          href={service.href}
                          className="block px-3 py-2.5 hover:bg-primary/5 rounded-lg transition-all duration-300 group flex items-center"
                          onClick={(e) => onServiceClick && onServiceClick(service, e)}
                          variants={itemVariants}
                        >
                          <div className="flex-shrink-0 w-10 h-12 mr-3 relative rounded-md overflow-hidden border border-border/10 shadow-sm group-hover:shadow transition-all duration-300">
                            <Image
                              src={service.image || '/images/placeholder-service.jpg'}
                              alt={service.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="40px"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium">{service.title}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{service.duration}</span>
                              <span className="mx-1">•</span>
                              <span>{service.price} лв.</span>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border/10">
                      <Link 
                        href="/shop/services" 
                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 group"
                      >
                        <span>{translate("Всички услуги", "All services")}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>,
              document.body
            )}
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
} 