import { Button } from "@/components/ui/button";
import { useLanguage, useSafeLanguage } from "@/lib/LanguageContext";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Remove duplicate hook definition and use the imported one
export function LanguageSwitcher() {
  const { language, setLanguage } = useSafeLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent/50"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px] bg-background/95 backdrop-blur-sm">
        <DropdownMenuItem
          className={`flex items-center justify-between ${
            language === "bg" ? "bg-accent/50" : ""
          }`}
          onClick={() => setLanguage("bg")}
        >
          <span>Български</span>
          {language === "bg" && <span className="text-xs">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex items-center justify-between ${
            language === "en" ? "bg-accent/50" : ""
          }`}
          onClick={() => setLanguage("en")}
        >
          <span>English</span>
          {language === "en" && <span className="text-xs">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 