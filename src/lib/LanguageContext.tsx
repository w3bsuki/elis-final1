"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations as translationsData } from './translations';

// Define a more flexible type for translations
type TranslationValue = string | Record<string, any>;
type TranslationsType = {
  [language: string]: Record<string, TranslationValue>;
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: TranslationsType;
}

// Make sure we have a valid default value with type-safe translations
const defaultValue: LanguageContextType = {
  language: 'bg',
  setLanguage: () => {},
  translations: translationsData as TranslationsType,
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  // Use React's useState to create a fallback when context is not available
  const [fallbackLanguage, setFallbackLanguage] = useState('bg');
  
  // Try to use the context
  const context = useContext(LanguageContext);
  
  // If context is available, return it
  if (context) {
    return context;
  }
  
  // If context is not available, return a fallback
  console.warn('useLanguage used outside of LanguageProvider, using fallback');
  return {
    language: fallbackLanguage,
    setLanguage: setFallbackLanguage,
    translations: translationsData as TranslationsType
  };
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('bg');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations: translationsData as TranslationsType
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook that safely uses language context
export function useSafeLanguage() {
  const [language, setLanguage] = useState('bg'); // Default to Bulgarian
  const [setLanguageFunc, setSetLanguageFunc] = useState<((lang: string) => void) | null>(null);

  useEffect(() => {
    let isMounted = true;
    try {
      const context = useLanguage();
      if (isMounted) {
        setLanguage(context.language);
        setSetLanguageFunc(() => context.setLanguage);
      }
    } catch (e) {
      console.warn("Language context not available, using default.", e);
      if (isMounted && !setLanguageFunc) {
        setSetLanguageFunc(() => (newLang: string) => {
          if (isMounted) setLanguage(newLang);
        });
      }
    }
    return () => { isMounted = false; };
  }, []);

  return { language, setLanguage: setLanguageFunc || ((lang: string) => setLanguage(lang)) };
} 