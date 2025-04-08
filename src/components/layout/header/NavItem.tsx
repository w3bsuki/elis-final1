'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href?: string;
  label: string;
  icon?: React.ElementType;
  onClick?: (event: React.MouseEvent) => void;
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  baseClassName?: string; // Base styles for reuse
  activeClassName?: string; // Active styles for reuse
  inactiveClassName?: string; // Inactive styles for reuse
}

export function NavItem({
  href,
  label,
  icon: Icon,
  onClick,
  isActive: isActiveProp,
  children,
  className,
  baseClassName = "flex w-full items-center gap-3 px-4 py-3 text-left text-base font-medium transition-all duration-200 rounded-lg", // Default mobile style base
  activeClassName = "bg-primary/10 text-primary", // Default active style
  inactiveClassName = "text-foreground hover:bg-primary/10 hover:text-primary", // Default inactive style
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = isActiveProp ?? (href ? pathname === href || (href !== '/' && pathname.startsWith(href)) : false);

  const combinedClassName = cn(
    baseClassName,
    isActive ? activeClassName : inactiveClassName,
    className
  );

  const content = (
    <>
      {Icon && <Icon className="h-5 w-5 flex-shrink-0 mr-2" />}
      <span className="flex-1 whitespace-nowrap">{label}</span>
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName} onClick={onClick}>
        {content}
      </Link>
    );
  } else {
    return (
      <button type="button" className={combinedClassName} onClick={onClick}>
        {content}
      </button>
    );
  }
} 