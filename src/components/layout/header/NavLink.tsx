"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export function NavLink({ href, children, className, activeClassName }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center text-sm font-medium transition-colors duration-200",
        "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
        "px-4 py-2 rounded-md", // Default padding and rounded corners
        className, // Allow overriding base styles
        isActive && cn("bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100", activeClassName) // Active styles
      )}
    >
      {children}
    </Link>
  );
} 