import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

// Centralized hook to safely use language context
export function useSafeLanguage() {
  // Determine initial language preference (e.g., from localStorage or browser settings)
  // For now, defaulting to 'bg' for consistency with previous implementation
  const [language, setLanguage] = useState('bg'); 
  const [setLanguageFunc, setSetLanguageFunc] = useState<((lang: string) => void) | null>(null);

  useEffect(() => {
    let isMounted = true;
    try {
      // Attempt to get context
      const context = useLanguage(); 
      if (isMounted) {
          setLanguage(context.language);
          // Ensure the function reference is stable
          setSetLanguageFunc(() => context.setLanguage);
      }
    } catch (e) {
      // Context might not be available (e.g., during SSR or if provider is missing)
      console.warn("Language context not available, using default.", e);
      // Provide a default setter if context is not found
      if (isMounted && !setLanguageFunc) { 
          setSetLanguageFunc(() => (newLang: string) => {
            // Basic setter for environments without context
            if (isMounted) setLanguage(newLang);
          });
      }
    }
    return () => { isMounted = false; };
  }, []); // Dependency array is empty, context availability check runs once

  // Return the current language and a stable setter function
  return { language, setLanguage: setLanguageFunc };
} 