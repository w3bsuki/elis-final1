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
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
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