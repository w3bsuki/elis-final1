"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function NavLink({ 
  href, 
  children, 
  className, 
  activeClassName,
  onClick 
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || 
                  (href !== "/" && pathname.startsWith(href));

  // Animation variants                
  const linkVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };
  
  // Optional hover animation for active state
  const activeHoverVariants = {
    hover: { scale: 1.01 }
  };
  
  return (
    <motion.div
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      variants={isActive ? activeHoverVariants : linkVariants}
      transition={{ 
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1] // Custom easing for more natural feel
      }}
    >
      <Link 
        href={href} 
        onClick={onClick}
        className={cn(
          "flex items-center text-sm font-medium",
          "transition-all duration-200",
          "text-gray-700 dark:text-gray-300",
          "hover:text-primary hover:bg-primary/10 dark:hover:text-primary-foreground dark:hover:bg-primary/20",
          "px-4 py-2 rounded-lg", // Consistent with rounded-lg from our plan
          className, // Allow overriding base styles
          isActive && cn(
            "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground",
            activeClassName
          ) // Active styles
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
} 