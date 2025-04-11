import { ReactNode } from 'react';

/**
 * HeroSection props
 */
export interface HeroSectionProps {
  className?: string;
  includeFooter?: boolean;
}

/**
 * Book data structure
 */
export interface BookData {
  id: string;
  title: string;
  description: string;
  price: string;
  pages: number;
  publishDate: string;
  coverImage: string;
  buttonText: string;
  buyText: string;
  previewText?: string;
  previewLink?: string;
  rating?: number;
  ratingCount?: number;
}

/**
 * Profile data structure
 */
export interface ProfileData {
  imageSrc: string;
  name: string;
  title: string;
  altText: string;
}

/**
 * Expertise area data structure
 */
export interface ExpertiseAreaData {
  icon: ReactNode;
  title: string;
  description: string;
  url: string;
  color: string;
}

/**
 * Feature card props
 */
export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  url: string;
  index?: number;
}

/**
 * UI text translations
 */
export interface UiTranslations {
  newBadge?: string;
  pages?: string;
  published?: string;
  aboutAuthor?: string;
  featuredContent?: string;
  welcomeMessage?: string;
  booksHeader?: string;
  servicesHeader?: string;
  consultationLabel?: string;
  transformHeading: string;
  aboutText: string;
  additionalText: string;
  browseBooks: string;
  welcome: string;
  learnMore?: string;
  genre: string;
  bestseller?: string;
  reviews?: string;
  authorServices: string;
} 