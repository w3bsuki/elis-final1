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
import { Badge } from "@/components/ui/badge";

type NavItem = {
  label: string;
  labelEn: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
  isNew?: boolean;
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
      active: pathname.startsWith("/blog"),
      isNew: true
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
      <div className="hidden md:flex items-center justify-between px-6 py-3 bg-background/90 backdrop-blur-md border border-primary/10 rounded-xl shadow-lg">
        <div className="flex items-center space-x-1">
          <Link href="/" className="px-3 py-2 rounded-lg text-primary font-medium flex items-center hover:bg-primary/10 transition-colors">
            <BookMarked className="mr-2 h-5 w-5" />
            <span className="font-playfair text-shimmer">{translate("Елис", "Elis")}</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors flex items-center relative",
                item.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="mr-1.5 h-4 w-4" />
              <span>{language === 'bg' ? item.label : item.labelEn}</span>
              {item.isNew && (
                <Badge variant="premium" className="absolute -top-1 -right-1 px-1.5 py-0.5">
                  {translate("ново", "new")}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button 
            variant="accent" 
            size="sm" 
            rounded="full"
            asChild
          >
            <Link href="/checkout" className="flex items-center gap-1.5">
              <ShoppingBag className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">
                {translate("Кошница", "Cart")}
              </span>
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-background/90 backdrop-blur-md border border-primary/10 rounded-xl shadow-lg">
        <Link href="/" className="p-2 rounded-lg text-primary font-medium flex items-center hover:bg-primary/10 transition-colors">
          <BookMarked className="h-5 w-5" />
          <span className="font-playfair ml-1 text-shimmer">{translate("Елис", "Elis")}</span>
        </Link>
        
        <div className="flex space-x-1.5">
          {navItems.slice(0, 3).map((item) => (
            <Button
              key={item.href}
              variant={item.active ? "default" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-lg relative"
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                <span className="sr-only">{language === 'bg' ? item.label : item.labelEn}</span>
                {item.isNew && (
                  <Badge variant="premium" className="absolute -top-1 -right-1 px-1 py-0">
                    <span className="sr-only">{translate("ново", "new")}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                  </Badge>
                )}
              </Link>
            </Button>
          ))}
          
          <Button 
            variant="accent" 
            size="icon" 
            className="h-9 w-9 rounded-lg"
            asChild
          >
            <Link href="/checkout">
              <ShoppingBag className="h-4 w-4" />
              <span className="sr-only">{translate("Кошница", "Cart")}</span>
            </Link>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-xl h-auto pt-6">
              <div className="grid grid-cols-3 gap-4 paper-texture p-4 rounded-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center justify-center px-2 py-4 rounded-lg transition-colors text-center relative",
                      item.active 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-6 w-6 mb-2" />
                    <span className="text-xs font-medium">{language === 'bg' ? item.label : item.labelEn}</span>
                    {item.isNew && (
                      <Badge variant="premium" className="absolute -top-1 -right-1 px-1.5 py-0.5">
                        {translate("ново", "new")}
                      </Badge>
                    )}
                  </Link>
                ))}
                
                <Link 
                  href="/checkout" 
                  className="flex flex-col items-center justify-center px-2 py-4 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  <ShoppingBag className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-xs font-medium">{translate("Кошница", "Cart")}</span>
                </Link>
                
                <div className="flex flex-col items-center justify-center px-2 py-4 rounded-lg text-foreground hover:bg-muted transition-colors">
                  <div className="mb-2">
                    <ThemeToggle />
                  </div>
                  <span className="text-xs font-medium">{translate("Тема", "Theme")}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
} 