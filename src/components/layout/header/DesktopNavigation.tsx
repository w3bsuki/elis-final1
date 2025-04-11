"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, UserRound, Sparkles, Mail, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavigationProps } from "./types";
import { NavItem } from './NavItem';
import { useSafeLanguage } from "@/lib/LanguageContext";

// Define the shared style here as well (or import if moved to shared utils)
const nestedGlassStyleBase = cn(
  "rounded-lg",
  "transition-all duration-200",
  "hover:bg-primary/10 dark:hover:bg-primary/20",
  "active:bg-primary/20",
  "border border-border/70", 
  "shadow-inner", 
  "bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/75", 
  "text-foreground"
);

export function DesktopNavigation({ books, services, onBookClick, onServiceClick }: NavigationProps) {
  const { language } = useSafeLanguage();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  
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
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.1
      }
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  // Define desktop-specific NavItem styles using the nested look
  const desktopBaseStyles = cn(
    nestedGlassStyleBase,
    "flex items-center text-sm font-medium px-4 py-2",
    "hover:scale-[1.02] active:scale-[0.98]",
    "transition-all duration-200"
  );
  
  // For NavItems, active state has slightly more opaque background
  const desktopActiveStyles = cn(
    "bg-background/90",
    "shadow-inner",
    "font-semibold",
    "border-primary/20"
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

  return (
    <nav 
      aria-label="Main Navigation"
      className={cn(
        "hidden lg:flex items-center justify-center z-[9999] w-full",
        "relative"
      )}
      style={{ overflow: 'visible' }}
      ref={navRef}
    >
      <motion.ul 
        className="flex items-center justify-center gap-4"
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
          { href: "/shop", label: navTranslations.books, icon: BookOpen },
          { href: "/blog", label: navTranslations.blog, icon: Mail },
          { href: "/contact", label: navTranslations.contact, icon: Mail }
        ].map((item, index) => (
          <motion.li 
            key={item.href}
            variants={itemVariants}
            custom={index}
          >
            <NavItem 
              href={item.href} 
              label={item.label}
              icon={item.icon}
              variant="ghost"
              size="default"
              className={cn(
                desktopBaseStyles,
                pathname === item.href && desktopActiveStyles
              )}
            />
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
} 