// Hero section type definitions

/**
 * HeroSection props
 */
export interface HeroSectionProps {
  className?: string;
}

/**
 * StatisticItem props
 */
export interface StatisticItemProps {
  value: string;
  label: string;
  className?: string;
}

/**
 * ProfileCard props
 */
export interface ProfileCardProps {
  name: {
    en: string;
    bg: string;
  };
  title: {
    en: string;
    bg: string;
  };
  yearsOfExperience: number;
  imageSrc: string;
  className?: string;
}

/**
 * Extended profile information for the dialog
 */
export interface ProfileExtendedInfo {
  education: Array<{
    degree: {
      en: string;
      bg: string;
    };
    institution: {
      en: string;
      bg: string;
    };
    year: string;
  }>;
  specialties: Array<{
    en: string;
    bg: string;
  }>;
  certifications: Array<{
    title: {
      en: string;
      bg: string;
    };
    issuer: {
      en: string;
      bg: string;
    };
    year: string;
  }>;
  bio: {
    en: string;
    bg: string;
  };
}

/**
 * Button props for CTAs
 */
export interface CtaButtonsProps {
  primaryLabel: {
    en: string;
    bg: string;
  };
  primaryHref: string;
  secondaryLabel: {
    en: string;
    bg: string;
  };
  secondaryHref: string;
  className?: string;
} 