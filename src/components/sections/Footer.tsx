"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Code, BookOpen, Heart, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

// Helper function to ensure translation returns a string
const ensureString = (value: string | Record<string, unknown> | undefined): string => {
  if (typeof value === 'string') {
    return value;
  }
  return String(value || '') || '';
};

const Footer = () => {
  const { language, translations } = useLanguage();
  
  // Helper function to get translations
  const getTranslation = (key: string): string => {
    if (!translations || !language || !translations[language]) {
      return key; // Fallback to key if translations not available
    }
    
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to the key if translation not found
      }
    }
    
    return String(result || key);
  };
  
  const navigation = {
    categories: [
      {
        id: "main",
        sections: [
          {
            id: "about",
            name: ensureString(getTranslation("footer.about")),
            items: [
              { name: ensureString(getTranslation("footer.aboutMe")), href: "/about" },
              { name: ensureString(getTranslation("footer.blog")), href: "/blog" },
            ],
          },
          {
            id: "features",
            name: ensureString(getTranslation("footer.features")),
            items: [
              { name: ensureString(getTranslation("footer.books")), href: "/shop" },
              { name: ensureString(getTranslation("footer.dashboard")), href: "/dashboard" },
            ],
          },
          {
            id: "legal",
            name: ensureString(getTranslation("footer.legal")),
            items: [
              { name: ensureString(getTranslation("footer.termsOfService")), href: "/terms" },
              { name: ensureString(getTranslation("footer.privacyPolicy")), href: "/privacy" },
            ],
          },
        ],
      },
    ],
  };
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t-2 border-gray-100 dark:border-gray-800">
      {/* Newsletter Section */}
      <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-800/40 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400 mb-4">
                <Mail className="h-4 w-4" />
                {language === 'en' ? 'Stay Connected' : 'Останете свързани'}
              </div>
              <h3 className="text-2xl font-bold mb-2 font-playfair text-gray-900 dark:text-white">
                {language === 'en' ? 'Join Our Newsletter' : 'Абонирайте се за нашия бюлетин'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? 'Stay updated with our latest releases, author interviews, and exclusive offers.'
                  : 'Бъдете в течение с нашите най-нови издания, интервюта с автори и ексклузивни оферти.'}
              </p>
            </div>
            <div className="w-full md:w-auto flex-1 max-w-md">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={language === 'en' ? 'Your email address' : 'Вашият имейл адрес'} 
                  className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-600 rounded-none focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Button className="bg-green-600 hover:bg-green-700 text-white border-2 border-black dark:border-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 rounded-none h-14 px-6">
                  {language === 'en' ? 'Subscribe' : 'Абонирай се'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-green-600 dark:text-green-500" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">BookHaven</span>
              </div>
            </Link>
            <p className="text-gray-900 dark:text-gray-300 mb-6">
              {language === 'en' 
                ? 'Discover a world of stories, knowledge, and inspiration through our carefully curated collection of books.'
                : 'Открийте свят на истории, знания и вдъхновение чрез нашата внимателно подбрана колекция от книги.'}
            </p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-3 gap-8">
            {navigation.categories[0].sections.map((section) => (
              <div key={section.id}>
                <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{section.name}</h4>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-gray-900 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {language === 'en' ? 'Contact Us' : 'Свържете се с нас'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                <span className="text-gray-900 dark:text-gray-300">
                  123 Book Street, Literary District<br />
                  Sofia, Bulgaria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-500" />
                <a href="mailto:contact@bookhaven.com" className="text-gray-900 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                  contact@bookhaven.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link 
                href="https://facebook.com" 
                className="h-10 w-10 flex items-center justify-center rounded-none bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:bg-green-100 dark:hover:bg-green-900/20 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-900 dark:text-white" />
              </Link>
              <Link 
                href="https://instagram.com" 
                className="h-10 w-10 flex items-center justify-center rounded-none bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:bg-green-100 dark:hover:bg-green-900/20 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-900 dark:text-white" />
              </Link>
              <Link 
                href="https://twitter.com" 
                className="h-10 w-10 flex items-center justify-center rounded-none bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:bg-green-100 dark:hover:bg-green-900/20 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-900 dark:text-white" />
              </Link>
              <Link 
                href="https://github.com" 
                className="h-10 w-10 flex items-center justify-center rounded-none bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:bg-green-100 dark:hover:bg-green-900/20 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300"
                aria-label="GitHub"
              >
                <Code className="h-5 w-5 text-gray-900 dark:text-white" />
              </Link>
            </div>
            <div className="flex items-center gap-1 text-gray-900 dark:text-gray-300">
              <span>©</span>
              <span>{new Date().getFullYear()}</span>
              <span>BookHaven. {ensureString(getTranslation("footer.allRightsReserved"))}</span>
            </div>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-8 text-gray-900 dark:text-gray-300 text-sm flex items-center justify-center gap-1">
          <span>{language === 'en' ? 'Made with' : 'Направено с'}</span>
          <Heart className="h-4 w-4 text-red-500 inline" />
          <span>{language === 'en' ? 'for book lovers everywhere' : 'за любителите на книги навсякъде'}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 