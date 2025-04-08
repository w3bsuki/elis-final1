"use client";

import React from "react";
import { LanguagesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSafeLanguage } from "@/hooks/useSafeLanguage";

const nestedGlassStyle = cn(
  "border border-border/70", 
  "shadow-inner", 
  "bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/75", 
  "text-foreground", 
  "transition-all duration-200 ease-in-out", 
  "hover:bg-background/85 hover:shadow-sm hover:border-border", 
  "active:bg-background/95 active:scale-[0.98] active:shadow-inner",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 dark:focus-visible:ring-offset-background"
);

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
            className={cn(nestedGlassStyle, "rounded-lg px-2 h-10 w-10", "flex items-center justify-center")}
          >
            <LanguagesIcon className="h-5 w-5" />
            <span className="sr-only">Change language</span>
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