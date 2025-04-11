"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Globe, 
  BookOpen, 
  UserRound, 
  Sparkles, 
  Mail,
  Home,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NavigationProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SocialLinks } from "./SocialLinks";
import { NavItem } from './NavItem';
import { useSafeLanguage } from "@/lib/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface MobileNavigationProps extends NavigationProps {
  isMenuOpen: boolean | string;
  setIsMenuOpen: (value: boolean | string) => void;
  headerHeight: number;
}

export function MobileNavigation({ 
  isMenuOpen, 
  setIsMenuOpen, 
  headerHeight,
  books,
  services,
  onBookClick,
  onServiceClick 
}: MobileNavigationProps) {
  const { language } = useSafeLanguage();
  const pathname = usePathname();

  // Navigation translations
  const navTranslations = {
    about: language === 'bg' ? 'За мен' : 'About',
    books: language === 'bg' ? 'Книги' : 'Books',
    services: language === 'bg' ? 'Услуги' : 'Services',
    blog: language === 'bg' ? 'Блог' : 'Blog',
    contact: language === 'bg' ? 'Контакти' : 'Contact'
  };

  // Animation variants - optimized for smoother transitions
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -5, // More subtle movement
      transition: {
        duration: 0.15, // Faster transition
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.03, // Faster staggering
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.03, // Faster staggering
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      x: -5, // More subtle movement
      transition: { duration: 0.1, ease: "easeIn" }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.15, ease: "easeOut" }
    }
  };

  // Close the menu when path changes
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname, setIsMenuOpen, isMenuOpen]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "lg:hidden",
          "relative",
          "hover:bg-primary/5 dark:hover:bg-primary/10", // More subtle hover
          "active:scale-[0.97] transition-transform duration-150", // Smoother animation
          "rounded-full" // Rounded button for better touch target
        )}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              "fixed inset-x-0 top-[var(--header-height)]",
              "bg-background/90 backdrop-blur-md", // Lighter blur
              "border-b border-border/30", // Lighter border
              "shadow-sm", // Lighter shadow
              "lg:hidden z-50",
              "overflow-auto", // Allow scrolling for tall menus
              "max-h-[calc(100vh-var(--header-height))]" // Constrain height
            )}
            style={{ '--header-height': `${headerHeight}px` } as any}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="mx-auto max-w-md w-full">
                <motion.ul 
                  className="space-y-1" // Tighter spacing
                  variants={menuVariants}
                >
                  {[
                    { href: "/about", label: navTranslations.about, icon: UserRound },
                    { href: "/shop", label: navTranslations.books, icon: BookOpen },
                    { href: "/blog", label: navTranslations.blog, icon: Mail },
                    { href: "/contact", label: navTranslations.contact, icon: Mail }
                  ].map((item) => (
                    <motion.li 
                      key={item.href}
                      variants={itemVariants}
                      className="overflow-hidden" // Prevents layout shifts during animation
                    >
                      <NavItem
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        className="w-full justify-start px-4 py-3 rounded-md"
                      />
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.div 
                  variants={itemVariants}
                  className={cn(
                    "mt-6 flex items-center gap-4 justify-center", // Better spacing
                    "border-t border-border/30 pt-4 mt-4", // Lighter border
                    "bg-gradient-to-b from-transparent to-background/30" // Subtle gradient
                  )}
                >
                  <ThemeToggle />
                  <LanguageSwitcher />
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 