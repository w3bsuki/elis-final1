import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import { Instagram, Facebook, Twitter, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown>): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value) || '';
};

export function Footer() {
  const { language, translations } = useLanguage();
  
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

  const footerLinks = [
    {
      title: getTranslation('footer.about'),
      links: [
        { label: getTranslation('footer.aboutUs'), href: '/about' },
        { label: getTranslation('footer.mission'), href: '/mission' },
        { label: getTranslation('footer.team'), href: '/team' },
        { label: getTranslation('footer.contact'), href: '/contact' },
      ],
    },
    {
      title: getTranslation('footer.shop'),
      links: [
        { label: getTranslation('footer.books'), href: '/shop?category=all' },
        { label: getTranslation('footer.bestsellers'), href: '/shop?category=featured' },
        { label: getTranslation('footer.newReleases'), href: '/shop?sort=newest' },
        { label: getTranslation('footer.services'), href: '/services' },
      ],
    },
    {
      title: getTranslation('footer.resources'),
      links: [
        { label: getTranslation('footer.blog'), href: '/blog' },
        { label: getTranslation('footer.events'), href: '/events' },
        { label: getTranslation('footer.workshops'), href: '/workshops' },
        { label: getTranslation('footer.faq'), href: '/faq' },
      ],
    },
    {
      title: getTranslation('footer.legal'),
      links: [
        { label: getTranslation('footer.termsOfService'), href: '/terms' },
        { label: getTranslation('footer.privacyPolicy'), href: '/privacy' },
        { label: getTranslation('footer.shipping'), href: '/shipping' },
        { label: getTranslation('footer.returns'), href: '/returns' },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:info@elis.com', label: 'Email' },
  ];

  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {footerLinks.map((section, i) => (
            <div key={i} className="space-y-3">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 md:flex-row">
          <div className="mb-4 md:mb-0">
            <Link 
              href="/"
              className="text-xl font-bold tracking-tight"
            >
              Elis
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              &copy; {currentYear} Elis. {getTranslation('footer.allRightsReserved')}
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <Link 
                  key={i}
                  href={link.href}
                  aria-label={link.label}
                  className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-center mt-8 text-sm text-muted-foreground">
          <p className="flex items-center">
            {getTranslation('footer.madeWith')} <Heart className="h-4 w-4 mx-1 text-red-500" /> {getTranslation('footer.inBulgaria')}
          </p>
        </div>
      </div>
    </footer>
  );
} 