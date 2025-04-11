import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';
import type { NextPage } from "next";
import { useLanguage } from "@/lib/LanguageContext";
import { CONTAINER_WIDTH_CLASSES } from "@/lib/constants";
import HomePage from "@/components/sections/home";
import Header from "@/components/layout/Header";
import { useEffect, useRef } from 'react';

const Home: NextPage = () => {
  const { language } = useLanguage();
  const translate = (bg: string, en: string) => language === 'bg' ? bg : en;
  const headerContainerRef = useRef<HTMLDivElement>(null);

  // Force header to be fixed at the top
  useEffect(() => {
    // First, make sure the header is fixed
    if (headerContainerRef.current) {
      headerContainerRef.current.style.position = 'fixed';
      headerContainerRef.current.style.top = '0';
      headerContainerRef.current.style.left = '0';
      headerContainerRef.current.style.right = '0';
      headerContainerRef.current.style.zIndex = '9999';
      
      // Add padding to body to account for the fixed header while maintaining desired spacing
      const headerHeight = headerContainerRef.current.offsetHeight;
      // We want 10px spacing under the header, not the full header height
      document.body.style.paddingTop = `${headerHeight}px`;
    }
    
    // Clean up on unmount
    return () => {
      document.body.style.paddingTop = '0';
    };
  }, []);

  return (
    <>
      <Head>
        <title>ELIS | Author, Psychologist & Inspirational Writer</title>
        <meta name="description" content="Official website of Elisa Ivanova - Author, Psychologist, and Inspirational Writer. Discover transformative books, therapy services, and resources for personal growth and self-discovery." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://elis-author.com" />
        
        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content="ELIS | Author, Psychologist & Inspirational Writer" />
        <meta property="og:description" content="Official website of Elisa Ivanova - Author, Psychologist, and Inspirational Writer. Discover transformative books, therapy services, and resources for personal growth and self-discovery." />
        <meta property="og:image" content="https://elis-author.com/images/author-og-image.jpg" />
        <meta property="og:image:alt" content="Elisa Ivanova - Author and Psychologist" />
        <meta property="og:url" content="https://elis-author.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ELIS Author Portfolio" />
        <meta property="og:locale" content={language === 'bg' ? 'bg_BG' : 'en_US'} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ELIS | Author, Psychologist & Inspirational Writer" />
        <meta name="twitter:description" content="Official website of Elisa Ivanova - Author, Psychologist, and Inspirational Writer. Discover transformative books, therapy services, and resources for personal growth." />
        <meta name="twitter:image" content="https://elis-author.com/images/author-og-image.jpg" />
        
        {/* Additional metadata */}
        <meta name="author" content="Elisa Ivanova" />
        <meta name="keywords" content="Elisa Ivanova, author, psychologist, books, personal development, self-help, therapy, workshops, psychology, writing" />
        <meta name="theme-color" content="#047857" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": "Elisa Ivanova",
                "alternateName": "ELIS",
                "description": "Author, Psychologist, and Inspirational Writer",
                "image": "https://elis-author.com/images/author-og-image.jpg",
                "url": "https://elis-author.com",
                "jobTitle": "Author and Psychologist",
                "worksFor": {
                  "@type": "Organization",
                  "name": "ELIS Psychological Services"
                },
                "offers": {
                  "@type": "Offer",
                  "itemOffered": [
                    {
                      "@type": "Service",
                      "name": "Psychological Counseling",
                      "description": "Professional therapy sessions for personal growth"
                    },
                    {
                      "@type": "Service",
                      "name": "Personal Development Workshops",
                      "description": "Group workshops for self-discovery and growth"
                    }
                  ]
                },
                "author": {
                  "@type": "Person",
                  "name": "Elisa Ivanova",
                  "url": "https://elis-author.com"
                }
              }
            })
          }}
        />
      </Head>
      
      <div className="flex flex-col">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Join Elis Pavlova's transformative journey through creative writing, personal development workshops, and professional consultations. Discover your creative potential today."
        />
        {/* Add custom styles for the homepage */}
        <style jsx global>{`
          body {
            overflow-x: hidden;
          }
          /* Force header to be fixed - more reliable than sticky */
          #home-header-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            z-index: 9999 !important;
          }
        `}</style>
        
        {/* Header container with fixed position - more reliable than sticky */}
        <div 
          id="home-header-container"
          ref={headerContainerRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 9999
          }}
        >
          <div className={CONTAINER_WIDTH_CLASSES}>
            <div className="w-full mb-0 rounded-xl bg-gradient-to-b from-white via-gray-50/95 to-gray-100/90 dark:from-gray-800/95 dark:via-gray-850/95 dark:to-gray-900/90 shadow-[0_4px_16px_rgba(0,0,0,0.1),0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200/80 dark:border-gray-700/60 backdrop-blur-md overflow-hidden">
              {/* Subtle inner shadow overlay */}
              <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.04)] pointer-events-none rounded-xl"></div>
              
              {/* Subtle pattern background */}
              <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] dark:bg-[url('/images/pattern-dark.svg')] opacity-[0.03] bg-repeat bg-[length:24px_24px] pointer-events-none rounded-lg"></div>
              
              {/* Subtle highlight at the top */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/80 dark:bg-white/15"></div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-radial from-transparent via-transparent to-gray-100/30 dark:to-primary/5 pointer-events-none"></div>
              
              <Header containedMode={false} />
            </div>
          </div>
        </div>
        
        {/* Main content area with proper spacing from header */}
        <main className="pt-10 mt-0 overflow-hidden"> {/* Changed to match consistent 10px spacing */}
          <div className={CONTAINER_WIDTH_CLASSES}>
            {/* Main content container with zero top padding */}
            <div className="rounded-xl shadow-lg bg-white dark:bg-gray-800 pt-0 px-4 pb-4 w-full">
              <HomePage includeFooter={true} noContainer={true} />
            </div>
          </div>
        </main>
        
        {/* Toast notifications */}
        <Toaster />
      </div>
    </>
  );
};

// Flag for _app.tsx to not render the header
Home.renderHeaderManually = true;

export default Home; 