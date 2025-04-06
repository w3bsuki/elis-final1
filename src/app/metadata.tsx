import { Metadata } from 'next';

export const sharedMetadata: Metadata = {
  title: {
    template: '%s | Elisa Ivanova - Psychologist & Art Therapist',
    default: 'Elisa Ivanova - Psychologist & Art Therapist',
  },
  description: 'Professional psychological support and creative approaches for personal growth. Books, workshops, and therapy sessions for transformation.',
  
  // Open Graph
  openGraph: {
    title: 'Elisa Ivanova - Psychologist & Art Therapist',
    description: 'Professional psychological support and creative approaches for personal growth. Books, workshops, and therapy sessions for transformation.',
    url: 'https://elisaivanova.com',
    siteName: 'Elisa Ivanova',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elisa Ivanova - Psychologist & Art Therapist',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Elisa Ivanova - Psychologist & Art Therapist',
    description: 'Professional psychological support and creative approaches for personal growth. Books, workshops, and therapy sessions for transformation.',
    creator: '@authorELIS',
    images: ['/images/og-image.jpg'],
  },
  
  // Other metadata
  keywords: [
    'Psychologist', 
    'Art Therapist', 
    'Mental Health', 
    'Therapy', 
    'Personal Growth', 
    'Elisa Ivanova',
    'Psychology Books',
    'Workshops',
    'Counseling'
  ],
  authors: [
    { name: 'Elisa Ivanova', url: 'https://elisaivanova.com' },
  ],
  creator: 'Elisa Ivanova',
  publisher: 'Elisa Ivanova',
};

// Generate JSON-LD structured data for the psychologist
export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Elisa Ivanova',
    'jobTitle': 'Psychologist & Art Therapist',
    'description': 'Professional psychological support and creative approaches for personal growth.',
    'image': 'https://elisaivanova.com/images/hero.jpg',
    'url': 'https://elisaivanova.com',
    'sameAs': [
      'https://facebook.com/authorELIS',
      'https://instagram.com/authorELIS',
      'https://twitter.com/authorELIS'
    ],
    'knowsAbout': [
      'Psychology',
      'Art Therapy',
      'Mental Health',
      'Personal Development'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Individual Therapy',
            'description': 'Personalized sessions focused on your specific needs and goals.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Art Therapy',
            'description': 'Creative approach for self-expression and exploring emotions through art forms.'
          }
        }
      ]
    }
  };
} 