"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import { ServicePreviewDialog } from "@/components/ui/service-preview-dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Import our components
import { Logo } from "./header/Logo";
import { LanguageSwitcher } from "./header/LanguageSwitcher";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { SocialLinks } from "./header/SocialLinks";
import { ShopButton } from "./header/ShopButton";

// Import types from local types file
import { BookType, ServiceType } from "./header/types";

// Books data
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

// Services data
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

export default function Header() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | string>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // Service preview states
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isServicePreviewOpen, setIsServicePreviewOpen] = useState(false);
  
  // Handle scroll effect with throttling for performance
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
  }, []); // Empty dependency array is correct here
  
  // Update header height for mobile menu positioning - only when component mounts
  useEffect(() => {
    if (!headerRef.current) return;
    
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };
    
    // Initial measurement
    updateHeight();
    
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    
    resizeObserver.observe(headerRef.current);
    return () => resizeObserver.disconnect();
  }, []); // Empty dependency array is correct here
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]); // Only when pathname changes
  
  // Handle book click to navigate to book page
  const handleBookClick = useCallback((book: BookType) => {
    router.push(book.href);
  }, [router]);
  
  // Handle service click for preview
  const handleServiceClick = useCallback((service: ServiceType, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedService(service);
    setIsServicePreviewOpen(true);
  }, []);
  
  return (
    <header 
      ref={headerRef}
      className={cn(
        "sticky inset-x-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/40 dark:bg-gray-950/40 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-center">
        {/* Nested container design */}
        <div className="relative w-full max-w-7xl mx-auto mb-3">
          {/* Nested container with glass effect */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg p-0.5 overflow-hidden">
            {/* Container inner gradient */}
            <div className="bg-gradient-to-br from-gray-100/60 via-white/60 to-gray-100/60 dark:from-gray-900/60 dark:via-gray-950/60 dark:to-gray-900/60 rounded-lg relative overflow-hidden">
              {/* Top decorative bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary/10 to-amber-500/40"></div>
              
              {/* Inner shadow effect */}
              <div className="absolute inset-1 bg-white/30 dark:bg-gray-900/30 rounded-lg shadow-inner pointer-events-none"></div>
              
              <div className={cn(
                "flex w-full items-center justify-between px-4 md:px-6 transition-all duration-200 relative z-10",
                isScrolled ? "h-14" : "h-16"
              )}>
                {/* Left section: Logo & Secondary Controls */}
                <div className="flex items-center gap-4">
                  <Logo isScrolled={isScrolled} />
                  <div className="hidden lg:flex items-center gap-1 border-l border-gray-200 dark:border-gray-700 pl-4 text-gray-700 dark:text-gray-300">
                    <ThemeToggle />
                    <LanguageSwitcher />
                  </div>
                </div>
                
                {/* Middle section: Desktop Navigation (Hidden on small screens) */}
                <div className="hidden lg:flex flex-1 justify-center">
                  <DesktopNavigation 
                    books={books} 
                    services={services} 
                    onBookClick={handleBookClick}
                    onServiceClick={handleServiceClick}
                  />
                </div>
                
                {/* Right section: Primary Controls & Mobile Trigger */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block text-gray-700 dark:text-gray-300">
                    <SocialLinks />
                  </div>
                  <ShopButton />
                  {/* Mobile Navigation Trigger (visible on small screens) */}
                  <MobileNavigation 
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    headerHeight={headerHeight}
                    books={books}
                    services={services}
                    onBookClick={handleBookClick}
                    onServiceClick={handleServiceClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Preview Dialog */}
      {selectedService && (
        <ServicePreviewDialog 
          service={selectedService}
          open={isServicePreviewOpen}
          onOpenChange={setIsServicePreviewOpen}
        />
      )}
    </header>
  );
} 