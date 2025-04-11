"use client";

import React from "react";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSafeLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useSafeLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bg' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "rounded-full w-8 h-8 p-0 flex items-center justify-center relative overflow-hidden",
        "text-foreground",
        "bg-background/80 backdrop-blur-sm",
        "border border-border/30 dark:border-border/20",
        "shadow-sm hover:shadow",
        "transition-all duration-300 ease-in-out"
      )}
      aria-label={language === 'en' ? 'Switch to Bulgarian' : 'Switch to English'}
    >
      <Languages className="h-4 w-4" />
      <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-3.5 h-3.5 text-[8px] font-bold bg-primary text-primary-foreground rounded-full">
        {language === 'en' ? 'EN' : 'BG'}
      </span>
    </Button>
  );
} 