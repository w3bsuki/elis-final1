import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const SocialLink = ({ href, icon, label, className }: SocialLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "h-10 w-10 rounded-full bg-gray-200/70 dark:bg-gray-700/70 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors",
        className
      )}
      aria-label={label}
    >
      {icon}
    </Link>
  );
};

export default SocialLink; 