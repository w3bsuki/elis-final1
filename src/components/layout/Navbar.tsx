"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  Home, 
  Heart,
  BookMarked,
  MessageSquare
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type NavItem = {
  label: string;
  labelEn: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
};

export function Navbar() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Translate function
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  
  // Navigation items
  const navItems: NavItem[] = [
    { 
      label: "Начало", 
      labelEn: "Home", 
      href: "/", 
      icon: Home,
      active: pathname === "/"
    },
    { 
      label: "Книги", 
      labelEn: "Books", 
      href: "/shop", 
      icon: BookOpen,
      active: pathname.startsWith("/shop")
    },
    { 
      label: "За автора", 
      labelEn: "About", 
      href: "/about", 
      icon: User,
      active: pathname === "/about"
    },
    { 
      label: "Блог", 
      labelEn: "Blog", 
      href: "/blog", 
      icon: MessageSquare,
      active: pathname.startsWith("/blog")
    },
    { 
      label: "Услуги", 
      labelEn: "Services", 
      href: "/services", 
      icon: Heart,
      active: pathname.startsWith("/services")
    }
  ];
  
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
      "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-2xl transition-all duration-300",
      isScrolled 
        ? "translate-y-0 opacity-100" 
        : "translate-y-2 opacity-90 hover:opacity-100"
    )}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border border-green-100 dark:border-green-800 rounded-xl shadow-lg">
        <div className="flex items-center space-x-1">
          <Link href="/" className="px-3 py-2 rounded-lg text-green-700 dark:text-green-400 font-medium flex items-center">
            <BookMarked className="mr-2 h-5 w-5" />
            <span className="font-playfair">{translate("Елис", "Elis")}</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors flex items-center",
                item.active 
                  ? "bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-400" 
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className="mr-1.5 h-4 w-4" />
              <span>{language === 'bg' ? item.label : item.labelEn}</span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Link href="/checkout" className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border border-green-100 dark:border-green-800 rounded-xl shadow-lg">
        <Link href="/" className="p-2 rounded-lg text-green-700 dark:text-green-400 font-medium flex items-center">
          <BookMarked className="h-5 w-5" />
          <span className="font-playfair ml-1">{translate("Елис", "Elis")}</span>
        </Link>
        
        <div className="flex space-x-1">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "p-2 rounded-lg transition-colors",
                item.active 
                  ? "bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-400" 
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          ))}
          
          <Link href="/checkout" className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            <ShoppingBag className="h-5 w-5" />
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-xl h-auto pt-6">
              <div className="grid grid-cols-3 gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center px-2 py-3 rounded-lg transition-colors text-center",
                      item.active 
                        ? "bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-400" 
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <item.icon className="h-5 w-5 mb-1" />
                    <span className="text-xs">{language === 'bg' ? item.label : item.labelEn}</span>
                  </Link>
                ))}
                
                <Link 
                  href="/checkout" 
                  className="flex flex-col items-center justify-center px-2 py-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <ShoppingBag className="h-5 w-5 mb-1" />
                  <span className="text-xs">{translate("Кошница", "Cart")}</span>
                </Link>
                
                <div className="flex flex-col items-center justify-center px-2 py-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                  <ThemeToggle />
                  <span className="text-xs mt-1">{translate("Тема", "Theme")}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
} 