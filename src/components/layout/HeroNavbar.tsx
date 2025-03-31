"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { BookOpen, User, ShoppingBag, BookMarked, MessageSquare, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/header/LanguageSwitcher";
import { ShopButton } from "@/components/layout/header/ShopButton";
import { Button } from "@/components/ui/button";

export function HeroNavbar() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className={cn(
      "w-full transition-all duration-300 border-b",
      isScrolled 
        ? "py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-green-100 dark:border-green-900/50 shadow-sm" 
        : "py-3 bg-transparent border-transparent"
    )}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookMarked className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className={cn(
                "font-playfair font-medium transition-all duration-300",
                isScrolled
                  ? "text-gray-900 dark:text-white text-xl"
                  : "text-gray-900 dark:text-white text-2xl"
              )}>
                {translate("Елис", "Elis")}
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors",
                pathname === "/" 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
              )}
            >
              {translate("Начало", "Home")}
            </Link>
            <Link
              href="/about"
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors",
                pathname === "/about" 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
              )}
            >
              {translate("За автора", "About")}
            </Link>
            <Link
              href="/shop"
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors",
                pathname.startsWith("/shop") 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
              )}
            >
              {translate("Книги", "Books")}
            </Link>
            <Link
              href="/services"
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors",
                pathname.startsWith("/services") 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
              )}
            >
              {translate("Услуги", "Services")}
            </Link>
            <Link
              href="/blog"
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors",
                pathname.startsWith("/blog") 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400"
              )}
            >
              {translate("Блог", "Blog")}
            </Link>
          </nav>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <ShopButton />
          </div>
        </div>
      </div>
    </div>
  );
} 