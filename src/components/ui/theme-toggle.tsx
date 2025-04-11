"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSafeLanguage } from "@/hooks/useSafeLanguage";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { language } = useSafeLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full w-8 h-8 p-0 flex items-center justify-center relative overflow-hidden",
            "text-foreground",
            "bg-background/80 backdrop-blur-sm",
            "border border-border/30 dark:border-border/20",
            "shadow-sm hover:shadow",
            "transition-all duration-300 ease-in-out",
          )}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem] bg-background/95 backdrop-blur-sm">
        <DropdownMenuItem onClick={() => setTheme("light")} className="text-sm">
          {language === 'en' ? 'Light' : 'Светла'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="text-sm">
          {language === 'en' ? 'Dark' : 'Тъмна'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="text-sm">
          {language === 'en' ? 'System' : 'Системна'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 