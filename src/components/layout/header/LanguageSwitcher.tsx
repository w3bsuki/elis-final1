"use client";

import React from "react";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSafeLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useSafeLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bg' : 'en');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleLanguage}
        className={cn(
          "relative w-10 h-10 rounded-lg",
          "hover:bg-primary/10 dark:hover:bg-primary/20",
          "active:bg-primary/20 dark:active:bg-primary/30",
          "transition-colors duration-200"
        )}
        aria-label={language === 'en' ? 'Switch to Bulgarian' : 'Switch to English'}
      >
        <Languages className="h-5 w-5" />
        <span className="absolute -bottom-1 -right-1 text-[10px] font-medium bg-primary text-primary-foreground rounded-sm px-1">
          {language === 'en' ? 'EN' : 'BG'}
        </span>
      </Button>
    </motion.div>
  );
} 