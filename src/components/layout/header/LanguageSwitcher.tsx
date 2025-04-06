"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  const [setLanguageFunction, setSetLanguageFunction] = useState<(lang: string) => void>(() => {
    // Default implementation that just updates local state
    return (lang: string) => setLanguage(lang);
  });
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
      setSetLanguageFunction(() => context.setLanguage);
    } catch (e) {
      console.warn("Language context not available in LanguageSwitcher", e);
      // Keep using default values
    }
  }, []);
  
  return { language, setLanguage: setLanguageFunction };
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useSafeLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg h-10 px-3"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[150]">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={cn(
            "cursor-pointer flex items-center",
            language === "en" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
          )}
        >
          <span className="mr-2 text-base">🇬🇧</span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('bg')} 
          className={cn(
            "cursor-pointer flex items-center",
            language === "bg" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
          )}
        >
          <span className="mr-2 text-base">🇧🇬</span> Български
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 