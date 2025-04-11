"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  UserRound, 
  BookOpen, 
  Sparkles, 
  Mail,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { NavItem } from './NavItem';
import { useSafeLanguage } from "@/lib/LanguageContext";
import { useTheme } from "next-themes";
import { BookType, ServiceType } from "./types";

interface MobileNavigationProps {
  books: BookType[];
  services: ServiceType[];
  onBookClick: (book: BookType, e: React.MouseEvent) => void;
  onServiceClick: (service: ServiceType, e: React.MouseEvent) => void;
  onLinkClick?: () => void;
}

export function MobileNavigation({ 
  books,
  services,
  onBookClick,
  onServiceClick,
  onLinkClick
}: MobileNavigationProps) {
  const { language } = useSafeLanguage();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  // Navigation translations
  const navTranslations = {
    home: language === 'bg' ? 'Начало' : 'Home',
    about: language === 'bg' ? 'За мен' : 'About',
    books: language === 'bg' ? 'Книги' : 'Books',
    services: language === 'bg' ? 'Услуги' : 'Services',
    blog: language === 'bg' ? 'Блог' : 'Blog',
    contact: language === 'bg' ? 'Контакти' : 'Contact'
  };

  // Animation variants - optimized for smoother transitions
  const itemVariants = {
    closed: { 
      opacity: 0, 
      x: -5,
      transition: { duration: 0.1, ease: "easeIn" }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.15, ease: "easeOut" }
    }
  };

  const handleNavItemClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className="mx-auto w-full" role="navigation" aria-label="Mobile navigation">
      <ul className="space-y-1">
        {[
          { href: "/", label: navTranslations.home, icon: Home },
          { href: "/about", label: navTranslations.about, icon: UserRound },
          { href: "/shop", label: navTranslations.books, icon: BookOpen },
          { href: "/services", label: navTranslations.services, icon: Sparkles },
          { href: "/blog", label: navTranslations.blog, icon: Mail },
          { href: "/contact", label: navTranslations.contact, icon: Mail }
        ].map((item) => (
          <motion.li 
            key={item.href}
            variants={itemVariants}
            className="overflow-hidden"
          >
            <NavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              className="w-full justify-start px-4 py-3 rounded-md"
              onClick={handleNavItemClick}
              aria-current={pathname === item.href ? 'page' : undefined}
            />
          </motion.li>
        ))}
      </ul>
    </nav>
  );
} 