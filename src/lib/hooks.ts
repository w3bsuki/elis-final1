import { useLanguage } from "@/lib/LanguageContext";

// Custom hook for translations
export function useTranslation() {
  const { language } = useLanguage();
  
  // Simple translation function
  const t = (key: string, fallback?: string) => {
    // This can be expanded with a more robust translation system
    return fallback || key;
  };
  
  return {
    t,
    locale: language
  };
} 