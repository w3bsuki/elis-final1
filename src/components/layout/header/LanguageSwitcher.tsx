"use client";

import React, { useState, useEffect } from "react";
import { LanguagesIcon } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Custom hook that safely uses language context
function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  const [setLanguageFunc, setSetLanguageFunc] = useState<((lang: string) => void) | null>(null);
  
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguage(context.language);
      setSetLanguageFunc(() => context.setLanguage);
    } catch (e) {
      console.warn("Language context not available in LanguageSwitcher", e);
      // Keep using default language
    }
  }, []);
  
  return { language, setLanguage: setLanguageFunc };
}

export default function LanguageSwitcher() {
  const { language, setLanguage } = useSafeLanguage();

  const toggleLanguage = (lang: string) => {
    if (setLanguage) {
      setLanguage(lang);
    }
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="bg-background hover:bg-muted text-foreground hover:text-foreground rounded-lg h-10 px-3 focus:ring-0 focus:outline-none focus:ring-offset-0"
          >
            <LanguagesIcon className="h-5 w-5" />
            <span className="ml-2 text-sm font-medium">
              {language === 'en' ? 'EN' : 'BG'}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-[150]">
          <DropdownMenuItem 
            onClick={() => toggleLanguage('en')}
            className={cn(
              "flex items-center",
              language === 'en' ? "font-medium" : "font-normal"
            )}
          >
            <span className="mr-2">🇬🇧</span>
            <span>English</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => toggleLanguage('bg')}
            className={cn(
              "flex items-center",
              language === 'bg' ? "font-medium" : "font-normal"
            )}
          >
            <span className="mr-2">🇧🇬</span>
            <span>Български</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 