"use client";

import { useLanguage } from '@/lib/LanguageContext';
import { getTranslation } from '@/lib/translations';

/**
 * Hook for accessing translations based on the current language
 * Returns:
 * - t: A function to get translations by key
 * - locale: The current language locale (en/bg)
 */
export function useTranslate() {
  const { language } = useLanguage();
  
  /**
   * Get a translation by key
   * @param key The translation key (can be dot-notated, e.g., 'shop.addToCart')
   * @param fallback Optional fallback if translation is not found
   * @returns The translated string
   */
  const t = (key: string, fallback?: string): string => {
    try {
      const translation = getTranslation(language, key);
      // If the translation is the same as the key, it means it wasn't found
      if (translation === key && fallback) {
        return fallback;
      }
      return translation;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  };

  return {
    t,
    locale: language
  };
} 