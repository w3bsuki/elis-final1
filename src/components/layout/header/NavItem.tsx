'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
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
    "rounded-full",
    "transition-all duration-300",
    "relative",
    "hover:bg-primary/5 dark:hover:bg-primary/10",
    "hover:shadow-sm",
    "active:bg-primary/10",
    "font-medium"
  ),
  activeClassName = cn(
    "bg-background/80 dark:bg-background/60",
    "text-primary dark:text-primary",
    "font-medium",
    "shadow-sm",
    "border-primary/20 dark:border-primary/20"
  ),
  inactiveClassName = cn(
    "text-foreground/80 dark:text-foreground/80",
    "hover:text-primary dark:hover:text-primary",
    "hover:border-primary/20 dark:hover:border-primary/20"
  ),
  'aria-current': ariaCurrent,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = isActiveProp ?? (href ? pathname === href || (href !== '/' && pathname.startsWith(href)) : false);

  const combinedClassName = cn(
    baseClassName,
    isActive ? activeClassName : inactiveClassName,
    className
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick) {
        onClick(e as unknown as React.MouseEvent);
      }
    }
  };

  const content = (
    <div className="flex items-center gap-2 w-full">
      {Icon && (
        <div className={cn(
          "transition-transform duration-300",
          isActive && "scale-105"
        )} aria-hidden="true">
          <Icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isActive ? "text-primary" : "text-foreground/70"
          )} />
        </div>
      )}
      <span className="flex-1 whitespace-nowrap">{label}</span>
      {children}
    </div>
  );

  // Determine aria-current value
  const ariaCurrentValue = ariaCurrent !== undefined 
    ? ariaCurrent 
    : isActive ? 'page' : undefined;

  if (href) {
    return (
      <Link 
        href={href} 
        className={cn(
          combinedClassName,
          "no-underline hover:no-underline focus:no-underline",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        )}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-current={ariaCurrentValue}
        role="menuitem"
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
      onKeyDown={handleKeyDown}
      aria-current={ariaCurrentValue}
      role="menuitem"
    >
      {content}
    </Button>
  );
} 