import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, Search, User, BookOpen, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export function Header() {
  const { language, translations } = useLanguage();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.pathname]);

  const navigationItems = [
    { name: getTranslation('nav.home'), href: '/' },
    { name: getTranslation('nav.about'), href: '/about' },
    { name: getTranslation('nav.shop'), href: '/shop' },
    { name: getTranslation('nav.blog'), href: '/blog' },
    { name: getTranslation('nav.contact'), href: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/80 shadow-sm backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">Elis</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary",
                  router.pathname === item.href ? "text-primary" : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="icon" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {getTranslation('nav.cart')}
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 bg-background/95 backdrop-blur-lg border-t">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-base font-medium py-2 transition-colors hover:text-primary",
                      router.pathname === item.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-6 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/search">
                    <Search className="h-4 w-4 mr-2" />
                    {getTranslation('nav.search')}
                  </Link>
                </Button>
                
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/wishlist">
                    <Heart className="h-4 w-4 mr-2" />
                    {getTranslation('nav.wishlist')}
                  </Link>
                </Button>
                
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/account">
                    <User className="h-4 w-4 mr-2" />
                    {getTranslation('nav.account')}
                  </Link>
                </Button>
                
                <Button size="sm" className="justify-start" asChild>
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {getTranslation('nav.cart')}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 