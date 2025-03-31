"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, BookOpen, UserRound, Sparkles, Mail, ArrowRight } from "lucide-react";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { NavLink } from "./NavLink";

// Import types from local types file
import { NavigationProps } from "./types";
import { motion } from "framer-motion";

export function DesktopNavigation({ books, services, onBookClick, onServiceClick }: NavigationProps) {
  const { language } = useLanguage();
  const pathname = usePathname();
  
  // Simplified navigation translations
  const navTranslations = {
    about: language === 'en' ? 'About' : 'За Мен',
    books: language === 'en' ? 'Books' : 'Книги',
    blog: language === 'en' ? 'Blog' : 'Блог',
    shop: language === 'en' ? 'Shop' : 'Магазин',
    services: language === 'en' ? 'Services' : 'Услуги',
    contact: language === 'en' ? 'Contact' : 'Контакти',
  };

  // Common navigation trigger styles
  const navTriggerStyles = "text-sm font-medium transition-colors !bg-transparent !text-gray-700 dark:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-800 hover:!text-gray-900 dark:hover:!text-gray-100 px-4 py-2 rounded-md";
  const activeTriggerStyles = "!bg-gray-100 dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100";
  
  // Function to translate based on language
  const translate = (bgText: string, enText: string) => language === 'en' ? enText : bgText;
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {/* About Link */}
        <NavigationMenuItem>
          <NavLink 
            href="/about" 
            className={cn(navTriggerStyles, pathname === "/about" && activeTriggerStyles)}
          >
            <UserRound className="mr-1.5 h-4 w-4" />
            {navTranslations.about}
          </NavLink>
        </NavigationMenuItem>

        {/* Books Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(navTriggerStyles, pathname.startsWith("/shop") && activeTriggerStyles)}
          >
            <BookOpen className="mr-1.5 h-4 w-4" />
            {navTranslations.books}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="!bg-white dark:!bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <motion.div 
              className="w-[600px] grid grid-cols-3 gap-4 p-4"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {books.map((book) => (
                <motion.div key={book.id} variants={itemVariants}>
                  <Link
                    href={book.href}
                    onClick={() => onBookClick(book)}
                    className="group flex flex-col h-full rounded-md overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 33vw, 200px"
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-grow">
                      <h4 className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 flex-grow mb-2">
                        {book.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20">
                          {book.price.toFixed(2)} лв
                        </Badge>
                        <span className="text-xs text-green-600 dark:text-green-400 group-hover:underline underline-offset-2">
                          {translate('Виж', 'View')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
              <Button variant="ghost" size="sm" className="w-full justify-center h-8 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30" asChild>
                <Link href="/shop">
                  {translate('Разгледай всички книги', 'Browse all books')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(navTriggerStyles, pathname.startsWith("/services") && activeTriggerStyles)}
          >
            <Sparkles className="mr-1.5 h-4 w-4" />
            {navTranslations.services}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            className="!bg-white dark:!bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <motion.div 
              className="w-[450px] grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-800"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {services.map((service) => (
                <motion.div key={service.id} variants={itemVariants}>
                  <button
                    onClick={(e) => onServiceClick(service, e)}
                    className="group flex w-full items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200 text-left"
                  >
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-semibold mb-1 text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-1">
                        {service.description}
                      </p>
                      <span className="text-xs text-green-600 dark:text-green-400 group-hover:underline underline-offset-2">
                        {translate('Научи повече', 'Learn More')}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 self-start">
                      {service.duration}
                    </Badge>
                  </button>
                </motion.div>
              ))}
            </motion.div>
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-800">
              <Button variant="ghost" size="sm" className="w-full justify-center h-8 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30" asChild>
                <Link href="/services">
                  {translate('Виж всички услуги', 'View all services')}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Blog Link */}
        <NavigationMenuItem>
          <NavLink 
            href="/blog" 
            className={cn(navTriggerStyles, pathname.startsWith("/blog") && activeTriggerStyles)}
          >
            <Mail className="mr-1.5 h-4 w-4" /> 
            {navTranslations.blog}
          </NavLink>
        </NavigationMenuItem>

        {/* Contact Link */}
        <NavigationMenuItem>
          <NavLink 
            href="/contact" 
            className={cn(navTriggerStyles, pathname === "/contact" && activeTriggerStyles)}
          >
            <Mail className="mr-1.5 h-4 w-4" />
            {navTranslations.contact}
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
} 