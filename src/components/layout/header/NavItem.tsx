'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  href?: string;
  label: string;
  icon?: React.ElementType;
  onClick?: (event: React.MouseEvent) => void;
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  baseClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function NavItem({
  href,
  label,
  icon: Icon,
  onClick,
  isActive: isActiveProp,
  children,
  className,
  variant = 'ghost',
  size = 'default',
  baseClassName = cn(
    "flex items-center gap-2",
    "rounded-lg",
    "transition-all duration-150",
    "relative",
    "hover:bg-primary/5 dark:hover:bg-primary/10",
    "hover:scale-[1.01] active:scale-[0.99]",
    "active:bg-primary/10",
    "font-medium"
  ),
  activeClassName = cn(
    "bg-background dark:bg-background",
    "text-primary dark:text-primary",
    "font-semibold",
    "shadow-sm",
    "border-b-2 border-primary",
    "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-t",
    "after:animate-fadeIn after:opacity-100"
  ),
  inactiveClassName = cn(
    "text-foreground/80 dark:text-foreground/80",
    "hover:text-primary dark:hover:text-primary",
    "after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-0.5 after:bg-primary after:rounded-t",
    "hover:after:left-0 hover:after:right-0 after:transition-all after:duration-200"
  ),
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = isActiveProp ?? (href ? pathname === href || (href !== '/' && pathname.startsWith(href)) : false);

  const combinedClassName = cn(
    baseClassName,
    isActive ? activeClassName : inactiveClassName,
    className
  );

  const content = (
    <motion.div
      className="flex items-center gap-2 w-full"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ 
        duration: 0.15,
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
    >
      {Icon && (
        <motion.div
          initial={false}
          animate={{ 
            rotate: isActive ? 0 : 0,
            scale: isActive ? 1.05 : 1
          }}
          transition={{ 
            duration: 0.2, 
            ease: "easeInOut"
          }}
        >
          <Icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isActive ? "text-primary" : "text-foreground/70"
          )} />
        </motion.div>
      )}
      <span className="flex-1 whitespace-nowrap">{label}</span>
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={cn(
          combinedClassName,
          "no-underline hover:no-underline focus:no-underline"
        )}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={combinedClassName}
      onClick={onClick}
    >
      {content}
    </Button>
  );
} 