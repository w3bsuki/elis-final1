"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ServicePreviewDialog } from "@/components/ui/service-preview-dialog";
import { cn } from "@/lib/utils";
import { useLanguage, useSafeLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import { useTheme } from "next-themes";

// Header components
import { Logo } from "./header/Logo";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "./header/LanguageSwitcher";
import { SocialLinks } from "./header/SocialLinks";
import { ShopButton } from "./header/ShopButton";
import { BookType, ServiceType } from "./header/types";

// Header props interface
interface HeaderProps {
  containedMode?: boolean;
}

// Sample data - would typically come from API or CMS
const books: BookType[] = [
  {
    id: "1",
    title: "Осъзнато хранене",
    description: "Яж и отслабвай с удоволствие - здравословно хранене",
    image: "/images/books/osaznato-hranene.jpg",
    category: "Health",
    href: "/shop/1",
    price: 30.00,
  },
  {
    id: "2",
    title: "Вдъхновения",
    description: "Когато не знаеш как да продължиш напред - книга 2",
    image: "/images/books/vdahnovenia-kniga-2.png",
    category: "Poetry",
    href: "/shop/2",
    price: 26.00,
  },
  {
    id: "3",
    title: "Вдъхновения",
    description: "Когато не знаеш как да продължиш напред - книга 1",
    image: "/images/books/vdahnovenia-kniga-1.png",
    category: "Poetry",
    href: "/shop/3",
    price: 26.00,
  },
];

const services: ServiceType[] = [
  {
    id: "coaching",
    title: "Личен Коучинг",
    description: "Индивидуални сесии за личностно развитие и постигане на цели",
    image: "/images/services/coaching.jpg",
    href: "/shop/services/coaching",
    price: 79.99,
    duration: "60 мин",
  },
  {
    id: "therapy",
    title: "Терапевтични Сесии",
    description: "Професионална подкрепа за емоционално благополучие",
    image: "/images/services/therapy.jpg",
    href: "/shop/services/therapy",
    price: 89.99,
    duration: "90 мин",
  },
  {
    id: "workshop",
    title: "Групови Уъркшопи",
    description: "Интерактивни семинари за развитие на умения и самопознание",
    image: "/images/services/workshop.jpg",
    href: "/shop/services/workshop",
    price: 49.99,
    duration: "120 мин",
  },
];

export default function Header({ containedMode }: HeaderProps) {
  const { language } = useSafeLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | string>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // Track scroll progress
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  
  // Service preview states
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isServicePreviewOpen, setIsServicePreviewOpen] = useState(false);
  
  // Handle scroll effect with debouncing for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate scroll progress percentage (0-15)
          const scrollY = window.scrollY;
          const progress = Math.min(scrollY / 100, 15);
          
          setIsScrolled(scrollY > 10);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Update header height for mobile menu positioning
  useEffect(() => {
    if (!headerRef.current) return;
    
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    
    // Initial measurement
    updateHeight();
    
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(headerRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // Handle book click to navigate to book page
  const handleBookClick = useCallback((book: BookType, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(book.href);
  }, [router]);
  
  // Handle service click for preview
  const handleServiceClick = useCallback((service: ServiceType, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedService(service);
    setIsServicePreviewOpen(true);
  }, []);
  
  // Force close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);
  
  // Calculate background opacity based on scroll position
  const bgOpacity = scrollProgress / 15;
  
  return (
    <motion.header
      ref={headerRef}
      id="header-wrapper"
      className={cn(
        "w-full",
        "z-50",
        "transition-all duration-200",
        isScrolled ? "backdrop-blur-md" : "backdrop-blur-none",
        isScrolled && !containedMode ? (isDarkMode ? "border-b border-green-950/30" : "border-b border-green-200/70") : "",
        containedMode ? "bg-background/5" : "",
        "sticky top-0 left-0 right-0"
      )}
      aria-label="Site header"
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      style={{
        // Dynamic background with smooth opacity transition based on scroll and subtle green gradient
        backgroundColor: !containedMode && isScrolled 
          ? `rgba(var(--background-rgb), ${bgOpacity})` 
          : '',
        backgroundImage: !containedMode && isDarkMode
          ? 'linear-gradient(to bottom, rgba(20, 83, 45, 0.15), rgba(20, 83, 45, 0.05))'
          : !containedMode ? 'linear-gradient(to bottom, rgba(240, 253, 244, 0.9), rgba(240, 253, 244, 0.7))' : '',
        boxShadow: !containedMode && isScrolled 
          ? isDarkMode
             ? `0 1px 3px rgba(0,0,0,${bgOpacity * 0.2}), 0 1px 2px rgba(20, 83, 45, 0.1)` 
             : `0 1px 3px rgba(0,0,0,${bgOpacity * 0.1}), 0 1px 2px rgba(20, 83, 45, 0.05)` 
          : 'none',
        position: 'sticky', // Enforce sticky across all browsers
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50
      }}
    >
      <div className={cn(
        CONTAINER_WIDTH_CLASSES, 
        "px-4 sm:px-6 lg:px-8 mx-auto",
        "pt-2"
      )}>
        <div className={cn(
          "flex w-full items-center justify-between relative gap-4 sm:gap-6",
          containedMode ? "py-3 px-3" : (isScrolled ? "py-2 px-3 h-14" : "py-3 px-4 h-16"),
          "transition-all duration-200"
        )}>
          {/* Left side */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Logo isScrolled={isScrolled} />
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </motion.div>

          {/* Middle */}
          <motion.div 
            className="hidden lg:flex flex-1 justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            role="navigation"
            aria-label="Main navigation"
          >
            <DesktopNavigation 
              books={books} 
              services={services} 
              onBookClick={handleBookClick}
              onServiceClick={handleServiceClick}
            />
          </motion.div>

          {/* Right side */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
            
            <div className="lg:hidden">
              <LanguageSwitcher />
            </div>
            
            <ShopButton />
            
            {/* Mobile menu button - improved accessibility */}
            <motion.button
              type="button"
              className={cn(
                "lg:hidden p-2 rounded-lg",
                "text-gray-700 dark:text-gray-300",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
              )}
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation - Improved accessibility */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="lg:hidden absolute left-0 right-0 top-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ 
              zIndex: 40,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
            }}
          >
            <div className={cn(
              "bg-white dark:bg-gray-900 px-4 py-3",
              "border-b border-gray-200 dark:border-gray-800"
            )}>
              <MobileNavigation 
                books={books} 
                services={services}
                onBookClick={(book, e) => {
                  handleBookClick(book, e);
                  setIsMenuOpen(false); // Ensure menu closes after navigation
                }}
                onServiceClick={(service, e) => {
                  handleServiceClick(service, e);
                  setIsMenuOpen(false); // Ensure menu closes after navigation
                }}
                onLinkClick={() => setIsMenuOpen(false)} // Close menu when any link is clicked
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Preview Dialog */}
      {selectedService && (
        <ServicePreviewDialog
          service={selectedService}
          open={isServicePreviewOpen}
          onOpenChange={setIsServicePreviewOpen}
        />
      )}
    </motion.header>
  );
} 