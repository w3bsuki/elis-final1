"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ServicePreviewDialog } from "@/components/ui/service-preview-dialog";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";

// Header components
import { Logo } from "./header/Logo";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import LanguageSwitcher from "./header/LanguageSwitcher";
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
    href: "/services/coaching",
    price: 79.99,
    duration: "60 мин",
  },
  {
    id: "therapy",
    title: "Терапевтични Сесии",
    description: "Професионална подкрепа за емоционално благополучие",
    image: "/images/services/therapy.jpg",
    href: "/services/therapy",
    price: 89.99,
    duration: "90 мин",
  },
  {
    id: "workshop",
    title: "Групови Уъркшопи",
    description: "Интерактивни семинари за развитие на умения и самопознание",
    image: "/images/services/workshop.jpg",
    href: "/services/workshop",
    price: 49.99,
    duration: "120 мин",
  },
];

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
    } catch (e) {
      console.warn("Language context not available in Header", e);
      // Keep using default language
    }
  }, []);
  
  return { language };
}

export default function Header({ containedMode }: HeaderProps) {
  // Replace direct useLanguage with safe version
  const { language } = useSafeLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | string>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // Service preview states
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isServicePreviewOpen, setIsServicePreviewOpen] = useState(false);
  
  // Handle scroll effect with debouncing for performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
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
  
  // Framer-motion animation variants
  const headerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -5 }
  };
  
  return (
    <motion.div 
      id="header-wrapper" 
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'visible' }}
    >
      <header 
        ref={headerRef}
        className={cn(
          "w-full transition-all duration-300",
          !containedMode && isScrolled 
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent border-b border-transparent"
        )}
        style={{ overflow: 'visible' }}
      >
        <div className={cn(
          CONTAINER_WIDTH_CLASSES, 
          containedMode ? "px-2" : "px-8"
        )} style={{ overflow: 'visible' }}>
          <div className={cn(
            "flex w-full items-center justify-between relative gap-6",
            containedMode ? "py-3 px-3" : (isScrolled ? "py-3 px-4 h-14" : "py-3 px-4 h-16")
          )}
          style={{ overflow: 'visible' }}
          >
            {/* Left side */}
            <motion.div 
              className="flex items-center gap-3"
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
              style={{ overflow: 'visible' }}
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
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="hidden sm:flex items-center gap-3"> 
                <SocialLinks />
                <ShopButton />
              </div>
              <div className="sm:hidden"> 
                 <ShopButton /> 
              </div>
              <MobileNavigation 
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                headerHeight={headerHeight}
                books={books}
                services={services}
                onBookClick={handleBookClick}
                onServiceClick={handleServiceClick}
              />
            </motion.div>
          </div>
        </div>
      </header>
      
      {/* Service Preview Dialog */}
      <AnimatePresence>
        {selectedService && (
          <ServicePreviewDialog 
            service={selectedService}
            open={isServicePreviewOpen}
            onOpenChange={setIsServicePreviewOpen}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
} 